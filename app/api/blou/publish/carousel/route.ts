import { NextRequest, NextResponse } from "next/server";
import {
  ensureAllCredentials,
  createCarouselChildImage,
  createCarouselChildVideo,
  createCarouselParent,
  pollContainerUntilFinished,
  publishContainer,
} from "@/lib/instagram/graph";
import type { InstagramCredentials } from "@/lib/instagram/graph";

const MIN_ITEMS = 2;
const MAX_ITEMS = 10;

async function publishToAccount(
  creds: InstagramCredentials,
  mediaUrls: { url: string; type: "image" | "video" }[],
  caption: string,
) {
  const childIds: string[] = [];
  for (const item of mediaUrls) {
    const id =
      item.type === "image"
        ? await createCarouselChildImage(creds, item.url)
        : await createCarouselChildVideo(creds, item.url);
    childIds.push(id);
  }

  for (const id of childIds) {
    await pollContainerUntilFinished(creds, id);
  }

  const parentId = await createCarouselParent(creds, childIds, caption);
  await pollContainerUntilFinished(creds, parentId);
  const result = await publishContainer(creds, parentId);
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

  let body: { mediaUrls: { url: string; type: "image" | "video" }[]; caption: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { mediaUrls, caption } = body;
  if (!Array.isArray(mediaUrls) || mediaUrls.length < MIN_ITEMS || mediaUrls.length > MAX_ITEMS) {
    return NextResponse.json(
      { error: `Between ${MIN_ITEMS} and ${MAX_ITEMS} items required` },
      { status: 400 }
    );
  }

  for (const item of mediaUrls) {
    if (!item.url || (item.type !== "image" && item.type !== "video")) {
      return NextResponse.json(
        { error: "Each item must have url and type (image or video)" },
        { status: 400 }
      );
    }
  }

  const results = await Promise.allSettled(
    allCreds.map((creds) => publishToAccount(creds, mediaUrls, caption ?? ""))
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
      error: e.message || "Failed to publish carousel",
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
      { error: "Failed to publish carousel to all accounts", results: accountResults },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    results: accountResults,
    // Backwards-compat: return the first successful mediaId at the top level
    mediaId: accountResults.find((r) => r.success)?.mediaId,
  });
}
