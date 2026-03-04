export interface AccountProgress {
  igUserId: string;
  username: string;
  childContainerIds: string[];
  childrenReady: number;
  parentContainerId?: string;
  mediaId?: string;
  status:
    | "polling_children"
    | "creating_parent"
    | "publishing"
    | "complete"
    | "failed";
  error?: string;
  step: string;
}

export interface CarouselJob {
  id: string;
  overallStatus:
    | "preparing"
    | "uploading"
    | "creating_children"
    | "processing"
    | "complete"
    | "failed";
  caption: string;
  blobUrls: string[];
  totalChildren: number;
  accounts: AccountProgress[];
  createdAt: number;
  updatedAt: number;
}

const jobs = new Map<string, CarouselJob>();

const JOB_TTL_MS = 30 * 60 * 1000; // 30 minutes

function cleanup() {
  const cutoff = Date.now() - JOB_TTL_MS;
  for (const [id, job] of jobs) {
    if (job.createdAt < cutoff) jobs.delete(id);
  }
}

export function createJob(
  caption: string,
  totalChildren: number,
  accounts: { igUserId: string; username: string }[],
): CarouselJob {
  cleanup();
  const id = crypto.randomUUID();
  const job: CarouselJob = {
    id,
    overallStatus: "preparing",
    caption,
    blobUrls: [],
    totalChildren,
    accounts: accounts.map((a) => ({
      igUserId: a.igUserId,
      username: a.username,
      childContainerIds: [],
      childrenReady: 0,
      status: "polling_children",
      step: "Waiting",
    })),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  jobs.set(id, job);
  return job;
}

export function getJob(id: string): CarouselJob | undefined {
  return jobs.get(id);
}

export function updateJob(id: string, updates: Partial<CarouselJob>) {
  const job = jobs.get(id);
  if (job) {
    Object.assign(job, updates, { updatedAt: Date.now() });
  }
}

export function updateAccountProgress(
  jobId: string,
  igUserId: string,
  updates: Partial<AccountProgress>,
) {
  const job = jobs.get(jobId);
  if (!job) return;
  const account = job.accounts.find((a) => a.igUserId === igUserId);
  if (account) {
    Object.assign(account, updates);
    job.updatedAt = Date.now();
  }
}

/** Derive overall job status from per-account statuses. */
export function deriveOverallStatus(job: CarouselJob): CarouselJob["overallStatus"] {
  const statuses = job.accounts.map((a) => a.status);
  if (statuses.every((s) => s === "complete")) return "complete";
  if (statuses.every((s) => s === "failed")) return "failed";
  // If some are complete/failed and others still working, still "processing"
  if (statuses.every((s) => s === "complete" || s === "failed")) return "complete";
  return "processing";
}
