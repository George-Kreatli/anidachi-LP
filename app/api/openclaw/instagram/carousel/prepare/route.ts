import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import {
  validateOpenClawSecret,
  unauthorizedResponse,
} from "@/lib/openclaw-auth";
import { createJob, updateJob } from "@/lib/openclaw-jobs";
import {
  ensureCredentials,
  createCarouselChildImage,
} from "@/lib/instagram/graph";

const MIN_PHOTOS = 2;
const MAX_PHOTOS = 10;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export async function POST(request: NextRequest) {
  if (!validateOpenClawSecret(request)) {
    return unauthorizedResponse();
  }

  try {
    await ensureCredentials();
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Instagram token expired — reconnect in Blou manager",
        code: "RECONNECT",
      },
      { status: 401 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid multipart body", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const caption = formData.get("caption");
  if (!caption || typeof caption !== "string" || !caption.trim()) {
    return NextResponse.json(
      { success: false, error: "Caption is required", code: "INVALID_INPUT" },
      { status: 400 }
    );
  }

  const photos = formData.getAll("photos[]") as File[];
  if (photos.length < MIN_PHOTOS || photos.length > MAX_PHOTOS) {
    return NextResponse.json(
      {
        success: false,
        error: `Expected ${MIN_PHOTOS}-${MAX_PHOTOS} photos, got ${photos.length}`,
        code: "INVALID_INPUT",
      },
      { status: 400 }
    );
  }

  for (const photo of photos) {
    if (!(photo instanceof File) || !ALLOWED_TYPES.includes(photo.type)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file type: ${photo.type || "unknown"}. Use PNG or JPEG.`,
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }
  }

  try {
    const job = createJob(caption.trim(), photos.length);

    // Upload to Vercel Blob
    const date = new Date().toISOString().slice(0, 10);
    const blobUrls: string[] = [];

    for (const photo of photos) {
      const ext = photo.type === "image/png" ? "png" : "jpg";
      const pathname = `openclaw/${date}/${crypto.randomUUID()}.${ext}`;
      const blob = await put(pathname, photo, {
        access: "public",
        addRandomSuffix: false,
        contentType: photo.type,
      });
      blobUrls.push(blob.url);
    }

    updateJob(job.id, {
      status: "creating_children",
      blobUrls,
      step: "Creating containers",
    });

    // Create child containers (fast API calls, no waiting for processing)
    const childContainerIds: string[] = [];
    for (const url of blobUrls) {
      const containerId = await createCarouselChildImage(url);
      childContainerIds.push(containerId);
    }

    updateJob(job.id, {
      status: "polling_children",
      childContainerIds,
      step: `0/${photos.length} children ready`,
    });

    return NextResponse.json(
      {
        success: true,
        jobId: job.id,
        status: "polling_children",
        step: `0/${photos.length} children ready`,
      },
      { status: 202 }
    );
  } catch (err) {
    const e = err as Error & { status?: number };
    if (e.status === 401) {
      return NextResponse.json(
        {
          success: false,
          error: "Instagram token expired — reconnect in Blou manager",
          code: "RECONNECT",
        },
        { status: 401 }
      );
    }
    console.error("OpenClaw carousel prepare error:", e);
    return NextResponse.json(
      { success: false, error: "Failed to prepare carousel", code: "PREPARE_FAILED" },
      { status: 500 }
    );
  }
}
