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
import { getCredentialsById } from "@/lib/instagram/storage";
import type { InstagramCredentials } from "@/lib/instagram/graph";

const JOB_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes

export async function GET(request: NextRequest) {
  if (!validateOpenClawSecret(request)) {
    return unauthorizedResponse();
  }

  const jobId = request.nextUrl.searchParams.get("jobId");
  if (!jobId) {
    return NextResponse.json(
      { success: false, error: "jobId query parameter required", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const job = getJob(jobId);
  if (!job) {
    return NextResponse.json(
      { success: false, error: "Job not found", code: "JOB_NOT_FOUND" },
      { status: 404 }
    );
  }

  const formatResponse = () => ({
    success: true,
    jobId: job.id,
    status: job.overallStatus,
    accounts: job.accounts.map((a) => ({
      igUserId: a.igUserId,
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
      if (acct.status !== "complete" && acct.status !== "failed") {
        updateAccountProgress(job.id, acct.igUserId, {
          status: "failed",
          error: "Job timed out after 10 minutes",
          step: "Timed out",
        });
      }
    }
    updateJob(job.id, { overallStatus: "failed" });
    return NextResponse.json(formatResponse());
  }

  // Process each account that still needs work
  const activeAccounts = job.accounts.filter(
    (a) => a.status !== "complete" && a.status !== "failed",
  );

  await Promise.all(
    activeAccounts.map(async (acct) => {
      const creds = await getCredentialsById(acct.igUserId);
      if (!creds) {
        updateAccountProgress(job.id, acct.igUserId, {
          status: "failed",
          error: "Account disconnected",
          step: "Account disconnected",
        });
        return;
      }

      try {
        if (acct.status === "polling_children") {
          await processChildren(job.id, acct, creds);
        } else if (acct.status === "creating_parent") {
          await processParent(job.id, acct, creds);
        }
      } catch (err) {
        const e = err as Error & { status?: number };
        console.error(`OpenClaw status error for @${acct.username}:`, e);
        updateAccountProgress(job.id, acct.igUserId, {
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

async function processChildren(
  jobId: string,
  acct: AccountProgress,
  creds: InstagramCredentials,
) {
  for (let i = 0; i < acct.childContainerIds.length; i++) {
    if (i < acct.childrenReady) continue;

    const containerId = acct.childContainerIds[i];
    const { status_code, error_message } = await getContainerStatus(creds, containerId);

    if (status_code === "FINISHED" || status_code === "PUBLISHED") {
      const newReady = acct.childrenReady + 1;
      updateAccountProgress(jobId, acct.igUserId, {
        childrenReady: newReady,
        step: `${newReady}/${acct.childContainerIds.length} children ready`,
      });
      // Refresh the local reference
      acct.childrenReady = newReady;

      if (newReady === acct.childContainerIds.length) {
        const parentId = await createCarouselParent(
          creds,
          acct.childContainerIds,
          getJob(jobId)!.caption,
        );
        updateAccountProgress(jobId, acct.igUserId, {
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
      updateAccountProgress(jobId, acct.igUserId, {
        status: "failed",
        error: error_message || `Child container ${i + 1} failed`,
        step: `Child ${i + 1} failed`,
      });
      return;
    }

    // Still IN_PROGRESS
    updateAccountProgress(jobId, acct.igUserId, {
      step: `${acct.childrenReady}/${acct.childContainerIds.length} children ready (waiting on ${i + 1})`,
    });
    return;
  }
}

async function processParent(
  jobId: string,
  acct: AccountProgress,
  creds: InstagramCredentials,
) {
  if (!acct.parentContainerId) return;

  const { status_code, error_message } = await getContainerStatus(
    creds,
    acct.parentContainerId,
  );

  if (status_code === "FINISHED" || status_code === "PUBLISHED") {
    updateAccountProgress(jobId, acct.igUserId, {
      status: "publishing",
      step: "Publishing carousel",
    });

    const result = await publishContainer(creds, acct.parentContainerId);
    updateAccountProgress(jobId, acct.igUserId, {
      status: "complete",
      mediaId: result.id,
      step: "Published",
    });
    return;
  }

  if (status_code === "ERROR") {
    updateAccountProgress(jobId, acct.igUserId, {
      status: "failed",
      error: error_message || "Parent container failed",
      step: "Parent container failed",
    });
    return;
  }

  updateAccountProgress(jobId, acct.igUserId, {
    step: "Waiting for parent container to finish processing",
  });
}
