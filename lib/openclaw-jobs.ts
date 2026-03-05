export interface AccountProgress {
  platform: "instagram" | "tiktok";
  accountId: string;   // igUserId or openId
  username: string;
  childContainerIds: string[];  // Instagram only
  childrenReady: number;        // Instagram only
  parentContainerId?: string;   // Instagram only
  publishId?: string;           // TikTok only
  mediaId?: string;
  status:
    | "polling_children"
    | "creating_parent"
    | "publishing"
    | "sent_to_inbox"
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
  proxyUrls: string[];  // Domain-verified URLs for TikTok
  totalChildren: number;
  accounts: AccountProgress[];
  createdAt: number;
  updatedAt: number;
}

const jobs = new Map<string, CarouselJob>();

const JOB_TTL_MS = 30 * 60 * 1000;

function cleanup() {
  const cutoff = Date.now() - JOB_TTL_MS;
  for (const [id, job] of jobs) {
    if (job.createdAt < cutoff) jobs.delete(id);
  }
}

export function createJob(
  caption: string,
  totalChildren: number,
  accounts: { platform: "instagram" | "tiktok"; accountId: string; username: string }[],
): CarouselJob {
  cleanup();
  const id = crypto.randomUUID();
  const job: CarouselJob = {
    id,
    overallStatus: "preparing",
    caption,
    blobUrls: [],
    proxyUrls: [],
    totalChildren,
    accounts: accounts.map((a) => ({
      platform: a.platform,
      accountId: a.accountId,
      username: a.username,
      childContainerIds: [],
      childrenReady: 0,
      status: a.platform === "instagram" ? "polling_children" : "publishing",
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
  accountId: string,
  updates: Partial<AccountProgress>,
) {
  const job = jobs.get(jobId);
  if (!job) return;
  const account = job.accounts.find((a) => a.accountId === accountId);
  if (account) {
    Object.assign(account, updates);
    job.updatedAt = Date.now();
  }
}

/** Derive overall job status from per-account statuses. */
export function deriveOverallStatus(job: CarouselJob): CarouselJob["overallStatus"] {
  const statuses = job.accounts.map((a) => a.status);
  const terminal = ["complete", "failed", "sent_to_inbox"];
  if (statuses.every((s) => terminal.includes(s))) {
    if (statuses.every((s) => s === "failed")) return "failed";
    return "complete";
  }
  return "processing";
}
