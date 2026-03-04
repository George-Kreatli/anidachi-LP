import { getCredentials, clearCredentials } from "./storage";

/**
 * Instagram Graph API helpers (v21.0).
 * Host URL for Instagram Login: https://graph.instagram.com/v21.0
 */
const GRAPH_BASE = "https://graph.instagram.com/v21.0";
const POLL_INTERVAL_MS = 5000;
const POLL_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export async function getStoredCredentials() {
  const creds = await getCredentials();
  if (!creds) return null;
  return creds;
}

export async function ensureCredentials() {
  const creds = await getStoredCredentials();
  if (!creds) {
    const err = new Error("Reconnect Instagram") as Error & { status?: number };
    err.status = 401;
    throw err;
  }
  return creds;
}

async function graphGet<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const creds = await ensureCredentials();
  const url = new URL(`${GRAPH_BASE}${path}`);
  url.searchParams.set("access_token", creds.accessToken);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  const data = (await res.json()) as T & { error?: { message: string; code?: number } };
  if (data.error) {
    const err = new Error(data.error.message) as Error & { status?: number };
    const msg = (data.error.message || "").toLowerCase();
    const isInvalidToken =
      msg.includes("invalid oauth access token") ||
      msg.includes("cannot parse access token") ||
      (msg.includes("access token") && (msg.includes("invalid") || msg.includes("expired")));
    if (isInvalidToken) {
      await clearCredentials();
    }
    err.status = isInvalidToken ? 401 : res.status;
    throw err;
  }
  return data;
}

async function graphPost(
  path: string,
  body: Record<string, string>
): Promise<{ id?: string; error?: { message: string } }> {
  const creds = await ensureCredentials();
  const url = new URL(`${GRAPH_BASE}${path}`);
  const formBody = new URLSearchParams({ ...body, access_token: creds.accessToken });
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formBody.toString(),
  });
  const data = (await res.json()) as { id?: string; error?: { message: string } };
  if (data.error) {
    const err = new Error(data.error.message) as Error & { status?: number };
    const msg = (data.error.message || "").toLowerCase();
    const isInvalidToken =
      msg.includes("invalid oauth access token") ||
      msg.includes("cannot parse access token") ||
      (msg.includes("access token") && (msg.includes("invalid") || msg.includes("expired")));
    if (isInvalidToken) {
      await clearCredentials();
    }
    err.status = isInvalidToken ? 401 : res.status;
    throw err;
  }
  return data;
}

/** Create a Reels container. Returns container id. */
export async function createReelContainer(videoUrl: string, caption: string): Promise<string> {
  const creds = await ensureCredentials();
  const res = await graphPost(`/${creds.igUserId}/media`, {
    media_type: "REELS",
    video_url: videoUrl,
    caption,
    share_to_feed: "true",
  });
  if (!res.id) throw new Error("No container id returned");
  return res.id;
}

/** Create carousel child (image). */
export async function createCarouselChildImage(imageUrl: string): Promise<string> {
  const creds = await ensureCredentials();
  const res = await graphPost(`/${creds.igUserId}/media`, {
    image_url: imageUrl,
    is_carousel_item: "true",
  });
  if (!res.id) throw new Error("No container id returned");
  return res.id;
}

/** Create carousel child (video). */
export async function createCarouselChildVideo(videoUrl: string): Promise<string> {
  const creds = await ensureCredentials();
  const res = await graphPost(`/${creds.igUserId}/media`, {
    video_url: videoUrl,
    media_type: "VIDEO",
    is_carousel_item: "true",
  });
  if (!res.id) throw new Error("No container id returned");
  return res.id;
}

/** Create carousel parent container. */
export async function createCarouselParent(
  childrenIds: string[],
  caption: string
): Promise<string> {
  const creds = await ensureCredentials();
  const res = await graphPost(`/${creds.igUserId}/media`, {
    media_type: "CAROUSEL",
    children: childrenIds.join(","),
    caption,
  });
  if (!res.id) throw new Error("No container id returned");
  return res.id;
}

export type ContainerStatus = "EXPIRED" | "ERROR" | "FINISHED" | "IN_PROGRESS" | "PUBLISHED";

/** Get container status. */
export async function getContainerStatus(
  containerId: string
): Promise<{ status_code: ContainerStatus; error_message?: string }> {
  const data = await graphGet<{ status_code: ContainerStatus; error_message?: string }>(
    `/${containerId}`,
    { fields: "status_code,error_message" }
  );
  return data;
}

/** Poll container until FINISHED or ERROR or timeout. */
export async function pollContainerUntilFinished(containerId: string): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < POLL_TIMEOUT_MS) {
    const { status_code, error_message } = await getContainerStatus(containerId);
    if (status_code === "FINISHED" || status_code === "PUBLISHED") return;
    if (status_code === "ERROR") {
      throw new Error(error_message || "Container processing failed");
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  throw new Error("Timeout waiting for container to finish processing");
}

/** Publish a container (creation_id). */
export async function publishContainer(creationId: string): Promise<{ id: string }> {
  const creds = await ensureCredentials();
  const res = await graphPost(`/${creds.igUserId}/media_publish`, {
    creation_id: creationId,
  });
  if (!res.id) throw new Error("Publish failed");
  return { id: res.id };
}
