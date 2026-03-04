export interface CarouselJob {
  id: string;
  status:
    | "preparing"
    | "uploading"
    | "creating_children"
    | "polling_children"
    | "creating_parent"
    | "publishing"
    | "complete"
    | "failed";
  caption: string;
  blobUrls: string[];
  childContainerIds: string[];
  parentContainerId?: string;
  mediaId?: string;
  error?: string;
  step: string;
  childrenReady: number;
  totalChildren: number;
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

export function createJob(caption: string, totalChildren: number): CarouselJob {
  cleanup();
  const id = crypto.randomUUID();
  const job: CarouselJob = {
    id,
    status: "preparing",
    caption,
    blobUrls: [],
    childContainerIds: [],
    childrenReady: 0,
    totalChildren,
    step: "Uploading images",
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
