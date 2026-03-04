import { NextRequest, NextResponse } from "next/server";
import {
  validateOpenClawSecret,
  unauthorizedResponse,
} from "@/lib/openclaw-auth";
import { getJob, updateJob } from "@/lib/openclaw-jobs";
import {
  getContainerStatus,
  createCarouselParent,
  publishContainer,
} from "@/lib/instagram/graph";

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

  if (job.status === "complete" || job.status === "failed") {
    return NextResponse.json({
      success: true,
      jobId: job.id,
      status: job.status,
      step: job.step,
      mediaId: job.mediaId,
      error: job.error,
    });
  }

  // Overall timeout — if the job has been running for too long, mark it failed
  if (Date.now() - job.createdAt > JOB_TIMEOUT_MS) {
    updateJob(job.id, {
      status: "failed",
      error: "Job timed out after 10 minutes",
      step: "Timed out",
    });
    return NextResponse.json({
      success: true,
      jobId: job.id,
      status: "failed",
      step: "Timed out",
      error: "Job timed out after 10 minutes",
    });
  }

  try {
    if (job.status === "polling_children") {
      await processChildren(job.id);
    } else if (job.status === "creating_parent") {
      await processParent(job.id);
    }

    const updated = getJob(job.id)!;
    return NextResponse.json({
      success: true,
      jobId: updated.id,
      status: updated.status,
      step: updated.step,
      mediaId: updated.mediaId,
    });
  } catch (err) {
    const e = err as Error & { status?: number };
    if (e.status === 401) {
      return NextResponse.json(
        {
          success: false,
          error: "Instagram token expired — reconnect in Blou manager",
          code: "RECONNECT",
        },
        { status: 401 }
      );
    }
    console.error("OpenClaw carousel status error:", e);
    updateJob(job.id, {
      status: "failed",
      error: e.message || "Processing failed",
      step: "Failed",
    });
    return NextResponse.json({
      success: true,
      jobId: job.id,
      status: "failed",
      step: "Failed",
      error: "Processing failed",
    });
  }
}

async function processChildren(jobId: string) {
  const job = getJob(jobId)!;

  // Find the next child that hasn't been confirmed ready
  for (let i = 0; i < job.childContainerIds.length; i++) {
    if (i < job.childrenReady) continue;

    const containerId = job.childContainerIds[i];
    const { status_code, error_message } = await getContainerStatus(containerId);

    if (status_code === "FINISHED" || status_code === "PUBLISHED") {
      const newReady = job.childrenReady + 1;
      updateJob(jobId, {
        childrenReady: newReady,
        step: `${newReady}/${job.totalChildren} children ready`,
      });

      if (newReady === job.totalChildren) {
        const parentId = await createCarouselParent(
          job.childContainerIds,
          job.caption
        );
        updateJob(jobId, {
          status: "creating_parent",
          parentContainerId: parentId,
          step: "Parent container created, waiting for processing",
        });
      }
      return;
    }

    if (status_code === "ERROR") {
      updateJob(jobId, {
        status: "failed",
        error: error_message || `Child container ${i + 1} failed`,
        step: `Child ${i + 1} failed`,
      });
      return;
    }

    // Still IN_PROGRESS — update step and return, next poll will check again
    updateJob(jobId, {
      step: `${job.childrenReady}/${job.totalChildren} children ready (waiting on ${i + 1})`,
    });
    return;
  }
}

async function processParent(jobId: string) {
  const job = getJob(jobId)!;
  if (!job.parentContainerId) return;

  const { status_code, error_message } = await getContainerStatus(
    job.parentContainerId
  );

  if (status_code === "FINISHED" || status_code === "PUBLISHED") {
    updateJob(jobId, { status: "publishing", step: "Publishing carousel" });

    const result = await publishContainer(job.parentContainerId);
    updateJob(jobId, {
      status: "complete",
      mediaId: result.id,
      step: "Published",
    });
    return;
  }

  if (status_code === "ERROR") {
    updateJob(jobId, {
      status: "failed",
      error: error_message || "Parent container failed",
      step: "Parent container failed",
    });
    return;
  }

  updateJob(jobId, {
    step: "Waiting for parent container to finish processing",
  });
}
