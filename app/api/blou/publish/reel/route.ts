import { NextRequest, NextResponse } from "next/server";
import {
  ensureCredentials,
  createReelContainer,
  pollContainerUntilFinished,
  publishContainer,
} from "@/lib/instagram/graph";

export async function POST(request: NextRequest) {
  try {
    await ensureCredentials();
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

  try {
    const containerId = await createReelContainer(videoUrl, caption ?? "");
    await pollContainerUntilFinished(containerId);
    const result = await publishContainer(containerId);
    return NextResponse.json({ success: true, mediaId: result.id });
  } catch (err) {
    const error = err as Error & { status?: number };
    if (error.status === 401) {
      return NextResponse.json(
        { error: "Reconnect Instagram", code: "RECONNECT" },
        { status: 401 }
      );
    }
    console.error("Reel publish error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to publish reel" },
      { status: 500 }
    );
  }
}
