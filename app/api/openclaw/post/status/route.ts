import { NextRequest, NextResponse } from "next/server";
import {
  validateOpenClawSecret,
  unauthorizedResponse,
} from "@/lib/openclaw-auth";
import {
  getJob,
  updateJob,
  updateAccountProgress,
  deriveOverallStatus,
} from "@/lib/openclaw-jobs";
import type { AccountProgress } from "@/lib/openclaw-jobs";
import {
  getContainerStatus,
  createCarouselParent,
  publishContainer,
} from "@/lib/instagram/graph";
import type { InstagramCredentials } from "@/lib/instagram/graph";
import { getCredentialsById as getIgCredsById } from "@/lib/instagram/storage";
import { getCredentialsById as getTtCredsById } from "@/lib/tiktok/storage";
import { fetchPublishStatus, refreshIfNeeded } from "@/lib/tiktok/api";
import type { TikTokCredentials } from "@/lib/tiktok/api";

const JOB_TIMEOUT_MS = 10 * 60 * 1000;

export async function GET(request: NextRequest) {
  if (!validateOpenClawSecret(request)) {
    return unauthorizedResponse();
  }

  const jobId = request.nextUrl.searchParams.get("jobId");
  if (!jobId) {
    return NextResponse.json(
      { success: false, error: "jobId query parameter required", code: "INVALID_INPUT" },
      { status: 400 },
    );
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json(
      { success: false, error: "Job not found", code: "JOB_NOT_FOUND" },
      { status: 404 },
    );
  }

  const formatResponse = () => ({
    success: true,
    jobId: job.id,
    status: job.overallStatus,
    accounts: job.accounts.map((a) => ({
      platform: a.platform,
      accountId: a.accountId,
      username: a.username,
      status: a.status,
      step: a.step,
      mediaId: a.mediaId,
      error: a.error,
    })),
  });

  if (job.overallStatus === "complete" || job.overallStatus === "failed") {
    return NextResponse.json(formatResponse());
  }

  if (Date.now() - job.createdAt > JOB_TIMEOUT_MS) {
    for (const acct of job.accounts) {
      if (!["complete", "failed", "sent_to_inbox"].includes(acct.status)) {
        updateAccountProgress(job.id, acct.accountId, {
          status: "failed",
          error: "Job timed out after 10 minutes",
          step: "Timed out",
        });
      }
    }
    updateJob(job.id, { overallStatus: "failed" });
    return NextResponse.json(formatResponse());
  }

  const activeAccounts = job.accounts.filter(
    (a) => !["complete", "failed", "sent_to_inbox"].includes(a.status),
  );

  await Promise.all(
    activeAccounts.map(async (acct) => {
      try {
        if (acct.platform === "instagram") {
          await processInstagramAccount(job.id, acct);
        } else if (acct.platform === "tiktok") {
          await processTikTokAccount(job.id, acct);
        }
      } catch (err) {
        const e = err as Error & { status?: number };
        console.error(`OpenClaw status error for @${acct.username} (${acct.platform}):`, e);
        updateAccountProgress(job.id, acct.accountId, {
          status: "failed",
          error: e.status === 401 ? "Token expired" : (e.message || "Processing failed"),
          step: "Failed",
        });
      }
    }),
  );

  const overall = deriveOverallStatus(job);
  updateJob(job.id, { overallStatus: overall });

  return NextResponse.json(formatResponse());
}

// ---------------------------------------------------------------------------
// Instagram processing (same as before)
// ---------------------------------------------------------------------------

async function processInstagramAccount(jobId: string, acct: AccountProgress) {
  const creds = await getIgCredsById(acct.accountId) as InstagramCredentials | null;
  if (!creds) {
    updateAccountProgress(jobId, acct.accountId, {
      status: "failed", error: "Account disconnected", step: "Account disconnected",
    });
    return;
  }

  if (acct.status === "polling_children") {
    for (let i = 0; i < acct.childContainerIds.length; i++) {
      if (i < acct.childrenReady) continue;

      const { status_code, error_message } = await getContainerStatus(creds, acct.childContainerIds[i]);

      if (status_code === "FINISHED" || status_code === "PUBLISHED") {
        const newReady = acct.childrenReady + 1;
        updateAccountProgress(jobId, acct.accountId, {
          childrenReady: newReady,
          step: `${newReady}/${acct.childContainerIds.length} children ready`,
        });
        acct.childrenReady = newReady;

        if (newReady === acct.childContainerIds.length) {
          const parentId = await createCarouselParent(creds, acct.childContainerIds, getJob(jobId)!.caption);
          updateAccountProgress(jobId, acct.accountId, {
            status: "creating_parent",
            parentContainerId: parentId,
            step: "Parent container created, waiting for processing",
          });
          acct.status = "creating_parent";
          acct.parentContainerId = parentId;
        }
        return;
      }

      if (status_code === "ERROR") {
        updateAccountProgress(jobId, acct.accountId, {
          status: "failed",
          error: error_message || `Child container ${i + 1} failed`,
          step: `Child ${i + 1} failed`,
        });
        return;
      }

      updateAccountProgress(jobId, acct.accountId, {
        step: `${acct.childrenReady}/${acct.childContainerIds.length} children ready (waiting on ${i + 1})`,
      });
      return;
    }
  }

  if (acct.status === "creating_parent" && acct.parentContainerId) {
    const { status_code, error_message } = await getContainerStatus(creds, acct.parentContainerId);

    if (status_code === "FINISHED" || status_code === "PUBLISHED") {
      updateAccountProgress(jobId, acct.accountId, { status: "publishing", step: "Publishing carousel" });
      const result = await publishContainer(creds, acct.parentContainerId);
      updateAccountProgress(jobId, acct.accountId, {
        status: "complete", mediaId: result.id, step: "Published",
      });
      return;
    }

    if (status_code === "ERROR") {
      updateAccountProgress(jobId, acct.accountId, {
        status: "failed", error: error_message || "Parent container failed", step: "Parent container failed",
      });
      return;
    }

    updateAccountProgress(jobId, acct.accountId, {
      step: "Waiting for parent container to finish processing",
    });
  }
}

// ---------------------------------------------------------------------------
// TikTok processing
// ---------------------------------------------------------------------------

async function processTikTokAccount(jobId: string, acct: AccountProgress) {
  if (!acct.publishId) {
    updateAccountProgress(jobId, acct.accountId, {
      status: "failed", error: "No publish ID", step: "Failed",
    });
    return;
  }

  const rawCreds = await getTtCredsById(acct.accountId) as TikTokCredentials | null;
  if (!rawCreds) {
    updateAccountProgress(jobId, acct.accountId, {
      status: "failed", error: "Account disconnected", step: "Account disconnected",
    });
    return;
  }

  const creds = await refreshIfNeeded(rawCreds);
  const { status, failReason } = await fetchPublishStatus(creds, acct.publishId);

  if (status === "SEND_TO_USER_INBOX") {
    updateAccountProgress(jobId, acct.accountId, {
      status: "sent_to_inbox",
      step: "Sent to TikTok inbox — open TikTok to review and publish",
    });
    return;
  }

  if (status === "PUBLISH_COMPLETE") {
    updateAccountProgress(jobId, acct.accountId, {
      status: "complete",
      step: "Published on TikTok",
    });
    return;
  }

  if (status === "FAILED") {
    updateAccountProgress(jobId, acct.accountId, {
      status: "failed",
      error: failReason || "TikTok upload failed",
      step: "TikTok upload failed",
    });
    return;
  }

  // Still processing
  updateAccountProgress(jobId, acct.accountId, {
    step: `TikTok processing (${status.toLowerCase().replace(/_/g, " ")})`,
  });
}
