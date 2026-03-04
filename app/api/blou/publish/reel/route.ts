import { NextRequest, NextResponse } from "next/server";
import {
  ensureAllCredentials,
  createReelContainer,
  pollContainerUntilFinished,
  publishContainer,
} from "@/lib/instagram/graph";
import type { InstagramCredentials } from "@/lib/instagram/graph";

async function publishToAccount(
  creds: InstagramCredentials,
  videoUrl: string,
  caption: string,
) {
  const containerId = await createReelContainer(creds, videoUrl, caption);
  await pollContainerUntilFinished(creds, containerId);
  const result = await publishContainer(creds, containerId);
  return result.id;
}

export async function POST(request: NextRequest) {
  let allCreds: InstagramCredentials[];
  try {
    allCreds = await ensureAllCredentials();
  } catch {
    return NextResponse.json(
      { error: "Reconnect Instagram", code: "RECONNECT" },
      { status: 401 }
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

  const results = await Promise.allSettled(
    allCreds.map((creds) => publishToAccount(creds, videoUrl, caption ?? ""))
  );

  const accountResults = allCreds.map((creds, i) => {
    const result = results[i];
    if (result.status === "fulfilled") {
      return {
        igUserId: creds.igUserId,
        username: creds.igUsername,
        success: true,
        mediaId: result.value,
      };
    }
    const e = result.reason as Error & { status?: number };
    return {
      igUserId: creds.igUserId,
      username: creds.igUsername,
      success: false,
      error: e.message || "Failed to publish reel",
      needsReconnect: e.status === 401,
    };
  });

  const allFailed = accountResults.every((r) => !r.success);
  const anyNeedsReconnect = accountResults.some((r) => r.needsReconnect);

  if (allFailed && anyNeedsReconnect) {
    return NextResponse.json(
      { error: "Reconnect Instagram", code: "RECONNECT", results: accountResults },
      { status: 401 }
    );
  }

  if (allFailed) {
    return NextResponse.json(
      { error: "Failed to publish reel to all accounts", results: accountResults },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    results: accountResults,
    mediaId: accountResults.find((r) => r.success)?.mediaId,
  });
}
