import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import {
  get as blobGet,
  put as blobPut,
} from "@vercel/blob";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const JOB_TTL_MS = 30 * 60 * 1000;
const BLOB_PREFIX = "openclaw/jobs";
const LOCAL_DIR = ".data/openclaw-jobs";
const BLOB_ACCESS = (process.env.BLOB_ACCESS ?? "private") as "public" | "private";

function blobPath(jobId: string): string {
  return `${BLOB_PREFIX}/${jobId}.json`;
}

function localPath(jobId: string): string {
  return join(process.cwd(), LOCAL_DIR, `${jobId}.json`);
}

// ---------------------------------------------------------------------------
// Blob helpers
// ---------------------------------------------------------------------------

async function readFromBlob(jobId: string): Promise<CarouselJob | undefined> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return undefined;

  try {
    const result = await blobGet(blobPath(jobId), { access: BLOB_ACCESS, token });
    if (!result || result.statusCode !== 200) return undefined;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as CarouselJob;
  } catch {
    return undefined;
  }
}

async function writeToBlob(job: CarouselJob): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return;

  await blobPut(blobPath(job.id), JSON.stringify(job), {
    access: BLOB_ACCESS,
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

// ---------------------------------------------------------------------------
// Local filesystem helpers (dev fallback)
// ---------------------------------------------------------------------------

async function readFromFile(jobId: string): Promise<CarouselJob | undefined> {
  try {
    const data = await readFile(localPath(jobId), "utf-8");
    return JSON.parse(data) as CarouselJob;
  } catch {
    return undefined;
  }
}

async function writeToFile(job: CarouselJob): Promise<void> {
  const dir = join(process.cwd(), LOCAL_DIR);
  await mkdir(dir, { recursive: true });
  await writeFile(localPath(job.id), JSON.stringify(job, null, 2), "utf-8");
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Create a new job, persist it, and return the job object. */
export async function createJob(
  caption: string,
  totalChildren: number,
  accounts: { platform: "instagram" | "tiktok"; accountId: string; username: string }[],
): Promise<CarouselJob> {
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

  await saveJob(job);
  return job;
}

/** Load a job by ID. Returns undefined if not found or expired. */
export async function getJob(id: string): Promise<CarouselJob | undefined> {
  const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
  const job = useBlob ? await readFromBlob(id) : await readFromFile(id);
  if (!job) return undefined;

  if (Date.now() - job.createdAt > JOB_TTL_MS) return undefined;
  return job;
}

/** Persist the full job object (call once at end of request). */
export async function saveJob(job: CarouselJob): Promise<void> {
  job.updatedAt = Date.now();
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeToBlob(job);
  } else {
    await writeToFile(job);
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
