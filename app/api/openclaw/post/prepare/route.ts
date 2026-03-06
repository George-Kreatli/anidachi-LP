import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { put } from "@vercel/blob";
import {
  validateOpenClawSecret,
  unauthorizedResponse,
} from "@/lib/openclaw-auth";
import { createJob, updateJob } from "@/lib/openclaw-jobs";
import {
  ensureAllCredentials as ensureAllIg,
  createCarouselChildImage,
} from "@/lib/instagram/graph";
import type { InstagramCredentials } from "@/lib/instagram/graph";
import {
  ensureAllCredentials as ensureAllTt,
  initInboxPhotoPost,
} from "@/lib/tiktok/api";
import type { TikTokCredentials } from "@/lib/tiktok/api";
import { getAllCredentials as getAllIgCredentials } from "@/lib/instagram/storage";
import { getAllCredentials as getAllTtCredentials } from "@/lib/tiktok/storage";

const MIN_PHOTOS = 2;
const MAX_PHOTOS = 10;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export async function POST(request: NextRequest) {
  if (!validateOpenClawSecret(request)) {
    return unauthorizedResponse();
  }

  // Gather all connected accounts across platforms
  let igCreds: InstagramCredentials[] = [];
  let ttCreds: TikTokCredentials[] = [];

  try { igCreds = await getAllIgCredentials(); } catch { /* none connected */ }
  try { ttCreds = await getAllTtCredentials(); } catch { /* none connected */ }

  // Auto-refresh TikTok tokens
  if (ttCreds.length > 0) {
    try { ttCreds = await ensureAllTt(); } catch { ttCreds = []; }
  }

  if (igCreds.length === 0 && ttCreds.length === 0) {
    return NextResponse.json(
      { success: false, error: "No accounts connected", code: "RECONNECT" },
      { status: 401 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid multipart body", code: "INVALID_INPUT" },
      { status: 400 },
    );
  }

  const caption = formData.get("caption");
  if (!caption || typeof caption !== "string" || !caption.trim()) {
    return NextResponse.json(
      { success: false, error: "Caption is required", code: "INVALID_INPUT" },
      { status: 400 },
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
      { status: 400 },
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
        { status: 400 },
      );
    }
  }

  try {
    const allAccounts = [
      ...igCreds.map((c) => ({ platform: "instagram" as const, accountId: c.igUserId, username: c.igUsername })),
      ...ttCreds.map((c) => ({ platform: "tiktok" as const, accountId: c.openId, username: c.username })),
    ];

    const job = createJob(caption.trim(), photos.length, allAccounts);

    // Upload to Vercel Blob (shared across all platforms)
    const date = new Date().toISOString().slice(0, 10);
    const blobUrls: string[] = [];
    const blobPaths: string[] = [];

    for (const photo of photos) {
      const ext = photo.type === "image/png" ? "png" : "jpg";
      const pathname = `openclaw/${date}/${crypto.randomUUID()}.${ext}`;
      const blob = await put(pathname, photo, {
        access: "public",
        addRandomSuffix: false,
        contentType: photo.type,
      });
      blobUrls.push(blob.url);
      blobPaths.push(pathname);
    }

    // Build proxy URLs for TikTok (domain-verified)
    const origin = request.headers.get("x-forwarded-host")
      ? `${request.headers.get("x-forwarded-proto") || "https"}://${request.headers.get("x-forwarded-host")}`
      : request.nextUrl.origin;

    // TikTok only accepts JPEG/WebP — convert any PNGs to JPEG
    const ttBlobPaths: string[] = [];
    if (ttCreds.length > 0) {
      for (let i = 0; i < blobUrls.length; i++) {
        if (/\.png$/i.test(blobPaths[i])) {
          const res = await fetch(blobUrls[i]);
          const buffer = Buffer.from(await res.arrayBuffer());
          const jpegBuffer = await sharp(buffer)
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .jpeg({ quality: 92 })
            .toBuffer();
          const jpegPath = `openclaw/tiktok-jpg/${date}/${crypto.randomUUID()}.jpg`;
          await put(jpegPath, jpegBuffer, {
            access: "public",
            addRandomSuffix: false,
            contentType: "image/jpeg",
          });
          ttBlobPaths.push(jpegPath);
        } else {
          ttBlobPaths.push(blobPaths[i]);
        }
      }
    }
    const proxyUrls = (ttCreds.length > 0 ? ttBlobPaths : blobPaths).map(
      (p) => `${origin}/api/media/${p}`,
    );

    updateJob(job.id, {
      overallStatus: "creating_children",
      blobUrls,
      proxyUrls,
    });

    // Instagram: create child containers for each account
    await Promise.all(
      igCreds.map(async (creds) => {
        try {
          const acct = job.accounts.find(
            (a) => a.platform === "instagram" && a.accountId === creds.igUserId,
          )!;
          const childIds: string[] = [];
          for (const url of blobUrls) {
            const containerId = await createCarouselChildImage(creds, url);
            childIds.push(containerId);
          }
          acct.childContainerIds = childIds;
          acct.status = "polling_children";
          acct.step = `0/${photos.length} children ready`;
        } catch (err) {
          const e = err as Error & { status?: number };
          const acct = job.accounts.find(
            (a) => a.platform === "instagram" && a.accountId === creds.igUserId,
          )!;
          acct.status = "failed";
          acct.error = e.status === 401 ? "Token expired" : e.message;
          acct.step = "Failed";
        }
      }),
    );

    // TikTok: init inbox photo upload for each account
    await Promise.all(
      ttCreds.map(async (creds) => {
        try {
          const publishId = await initInboxPhotoPost(creds, proxyUrls, caption.trim());
          const acct = job.accounts.find(
            (a) => a.platform === "tiktok" && a.accountId === creds.openId,
          )!;
          acct.publishId = publishId;
          acct.status = "publishing";
          acct.step = "Uploading to TikTok inbox";
        } catch (err) {
          const e = err as Error & { status?: number };
          const acct = job.accounts.find(
            (a) => a.platform === "tiktok" && a.accountId === creds.openId,
          )!;
          acct.status = "failed";
          acct.error = e.status === 401 ? "Token expired" : e.message;
          acct.step = "Failed";
        }
      }),
    );

    updateJob(job.id, { overallStatus: "processing" });

    return NextResponse.json(
      {
        success: true,
        jobId: job.id,
        status: "processing",
        accounts: job.accounts.map((a) => ({
          platform: a.platform,
          accountId: a.accountId,
          username: a.username,
          status: a.status,
          step: a.step,
        })),
      },
      { status: 202 },
    );
  } catch (err) {
    const e = err as Error & { status?: number };
    console.error("OpenClaw post prepare error:", e);
    if (e.status === 401) {
      return NextResponse.json(
        { success: false, error: "Token expired — reconnect accounts", code: "RECONNECT" },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Failed to prepare post", code: "PREPARE_FAILED" },
      { status: 500 },
    );
  }
}
