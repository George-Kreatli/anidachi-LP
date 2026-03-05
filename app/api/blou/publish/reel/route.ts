import { NextRequest, NextResponse } from "next/server";
import {
  ensureAllCredentials as ensureAllIg,
  createReelContainer,
  pollContainerUntilFinished,
  publishContainer,
} from "@/lib/instagram/graph";
import type { InstagramCredentials } from "@/lib/instagram/graph";
import { getAllCredentials as getAllTtCredentials } from "@/lib/tiktok/storage";
import {
  initInboxVideoPost,
  refreshIfNeeded,
  fetchPublishStatus,
} from "@/lib/tiktok/api";
import type { TikTokCredentials } from "@/lib/tiktok/api";

const TT_POLL_INTERVAL_MS = 3000;
const TT_POLL_TIMEOUT_MS = 2 * 60 * 1000;

interface AccountResult {
  platform: "instagram" | "tiktok";
  accountId: string;
  username: string;
  success: boolean;
  mediaId?: string;
  status?: string;
  error?: string;
  needsReconnect?: boolean;
}

async function publishToIgAccount(
  creds: InstagramCredentials,
  videoUrl: string,
  caption: string,
): Promise<AccountResult> {
  try {
    const containerId = await createReelContainer(creds, videoUrl, caption);
    await pollContainerUntilFinished(creds, containerId);
    const result = await publishContainer(creds, containerId);
    return {
      platform: "instagram",
      accountId: creds.igUserId,
      username: creds.igUsername,
      success: true,
      mediaId: result.id,
      status: "published",
    };
  } catch (err) {
    const e = err as Error & { status?: number };
    return {
      platform: "instagram",
      accountId: creds.igUserId,
      username: creds.igUsername,
      success: false,
      error: e.message || "Failed to publish reel",
      needsReconnect: e.status === 401,
    };
  }
}

async function publishToTtAccount(
  creds: TikTokCredentials,
  proxyUrl: string,
  caption: string,
): Promise<AccountResult> {
  try {
    const fresh = await refreshIfNeeded(creds);
    const publishId = await initInboxVideoPost(fresh, proxyUrl, caption);

    const start = Date.now();
    while (Date.now() - start < TT_POLL_TIMEOUT_MS) {
      await new Promise((r) => setTimeout(r, TT_POLL_INTERVAL_MS));
      const { status, failReason } = await fetchPublishStatus(fresh, publishId);

      if (status === "SEND_TO_USER_INBOX") {
        return {
          platform: "tiktok",
          accountId: creds.openId,
          username: creds.username,
          success: true,
          status: "sent_to_inbox",
        };
      }
      if (status === "PUBLISH_COMPLETE") {
        return {
          platform: "tiktok",
          accountId: creds.openId,
          username: creds.username,
          success: true,
          status: "published",
        };
      }
      if (status === "FAILED") {
        return {
          platform: "tiktok",
          accountId: creds.openId,
          username: creds.username,
          success: false,
          error: failReason || "TikTok upload failed",
        };
      }
    }

    return {
      platform: "tiktok",
      accountId: creds.openId,
      username: creds.username,
      success: false,
      error: "TikTok processing timed out",
    };
  } catch (err) {
    const e = err as Error & { status?: number };
    return {
      platform: "tiktok",
      accountId: creds.openId,
      username: creds.username,
      success: false,
      error: e.message || "Failed to send to TikTok",
      needsReconnect: e.status === 401,
    };
  }
}

function blobUrlToProxyUrl(blobUrl: string, origin: string): string {
  try {
    const parsed = new URL(blobUrl);
    const blobPath = parsed.pathname.slice(1);
    return `${origin}/api/media/${blobPath}`;
  } catch {
    return blobUrl;
  }
}

export async function POST(request: NextRequest) {
  let igCreds: InstagramCredentials[] = [];
  let ttCreds: TikTokCredentials[] = [];

  try { igCreds = await ensureAllIg(); } catch { /* none */ }
  try { ttCreds = await getAllTtCredentials(); } catch { /* none */ }

  if (igCreds.length === 0 && ttCreds.length === 0) {
    return NextResponse.json(
      { error: "No accounts connected", code: "RECONNECT" },
      { status: 401 },
    );
  }

  let body: { videoUrl: string; caption: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { videoUrl, caption } = body;
  if (!videoUrl || typeof caption !== "string") {
    return NextResponse.json(
      { error: "videoUrl and caption are required" },
      { status: 400 }
    );
  }

  const origin = request.headers.get("x-forwarded-host")
    ? `${request.headers.get("x-forwarded-proto") || "https"}://${request.headers.get("x-forwarded-host")}`
    : request.nextUrl.origin;

  const proxyUrl = blobUrlToProxyUrl(videoUrl, origin);

  const allResults = await Promise.all([
    ...igCreds.map((creds) => publishToIgAccount(creds, videoUrl, caption ?? "")),
    ...ttCreds.map((creds) => publishToTtAccount(creds, proxyUrl, caption ?? "")),
  ]);

  const allFailed = allResults.every((r) => !r.success);
  const anyNeedsReconnect = allResults.some((r) => r.needsReconnect);

  if (allFailed && anyNeedsReconnect) {
    return NextResponse.json(
      { error: "Reconnect accounts", code: "RECONNECT", results: allResults },
      { status: 401 },
    );
  }

  if (allFailed) {
    return NextResponse.json(
      { error: "Failed to publish to all accounts", results: allResults },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    results: allResults,
    mediaId: allResults.find((r) => r.success && r.mediaId)?.mediaId,
  });
}
