import { NextRequest, NextResponse } from "next/server";
import {
  ensureCredentials,
  createCarouselChildImage,
  createCarouselChildVideo,
  createCarouselParent,
  pollContainerUntilFinished,
  publishContainer,
} from "@/lib/instagram/graph";

const MIN_ITEMS = 2;
const MAX_ITEMS = 10;

export async function POST(request: NextRequest) {
  try {
    await ensureCredentials();
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

  try {
    const childIds: string[] = [];
    for (const item of mediaUrls) {
      const id =
        item.type === "image"
          ? await createCarouselChildImage(item.url)
          : await createCarouselChildVideo(item.url);
      childIds.push(id);
    }

    for (const id of childIds) {
      await pollContainerUntilFinished(id);
    }

    const parentId = await createCarouselParent(childIds, caption ?? "");
    await pollContainerUntilFinished(parentId);
    const result = await publishContainer(parentId);
    return NextResponse.json({ success: true, mediaId: result.id });
  } catch (err) {
    const e = err as Error & { status?: number };
    if (e.status === 401) {
      return NextResponse.json(
        { error: "Reconnect Instagram", code: "RECONNECT" },
        { status: 401 }
      );
    }
    console.error("Carousel publish error:", e);
    return NextResponse.json(
      { error: e.message || "Failed to publish carousel" },
      { status: 500 }
    );
  }
}
