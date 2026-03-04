"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Film,
  Images,
  Loader2,
  GripVertical,
  X,
  Upload,
} from "lucide-react";

type PublishStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "success"
  | "error";

type TabType = "reel" | "carousel";

const REEL_MAX_DURATION_SEC = 90;
const CAROUSEL_VIDEO_MAX_SEC = 60;
const CAROUSEL_MIN_ITEMS = 2;
const CAROUSEL_MAX_ITEMS = 10;
const IMAGE_MIN_WIDTH = 600;

export function PublishClient() {
  const [tab, setTab] = useState<TabType>("reel");
  const [connected, setConnected] = useState<boolean | null>(null);
  const [reelFile, setReelFile] = useState<File | null>(null);
  const [reelDuration, setReelDuration] = useState<number | null>(null);
  const [reelError, setReelError] = useState<string | null>(null);
  const [carouselFiles, setCarouselFiles] = useState<{ file: File; type: "image" | "video"; duration?: number; width?: number }[]>([]);
  const [carouselError, setCarouselError] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState<PublishStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const reelInputRef = useRef<HTMLInputElement>(null);
  const carouselInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/auth/instagram/status")
      .then((r) => r.json())
      .then((d: { connected?: boolean }) => setConnected(!!d.connected))
      .catch(() => setConnected(false));
  }, []);

  const checkReelVideo = (file: File): Promise<{ duration: number; error?: string }> => {
    return new Promise((resolve) => {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext !== "mp4" && ext !== "mov") {
        resolve({ duration: 0, error: "Use MP4 or MOV format." });
        return;
      }
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        if (duration > REEL_MAX_DURATION_SEC) {
          resolve({ duration, error: `Video must be ${REEL_MAX_DURATION_SEC} seconds or less.` });
        } else {
          resolve({ duration });
        }
      };
      video.onerror = () => resolve({ duration: 0, error: "Could not read video." });
      video.src = URL.createObjectURL(file);
    });
  };

  const handleReelFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setReelError(null);
    setReelDuration(null);
    setReelFile(null);
    if (!file) return;
    const { duration, error } = await checkReelVideo(file);
    if (error) {
      setReelError(error);
      return;
    }
    setReelDuration(duration);
    setReelFile(file);
  };

  const handleCarouselFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setCarouselError(null);
    const newItems: { file: File; type: "image" | "video"; duration?: number; width?: number }[] = [];
    for (const file of files) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if (!isImage && !isVideo) continue;
      if (isImage) {
        const width = await new Promise<number>((res) => {
          const img = new Image();
          img.onload = () => {
            res(img.naturalWidth);
            URL.revokeObjectURL(img.src);
          };
          img.onerror = () => res(0);
          img.src = URL.createObjectURL(file);
        });
        if (width > 0 && width < IMAGE_MIN_WIDTH) {
          setCarouselError(`Image "${file.name}" must be at least ${IMAGE_MIN_WIDTH}px wide.`);
          return;
        }
        newItems.push({ file, type: "image", width });
      } else {
        const duration = await new Promise<number>((res) => {
          const video = document.createElement("video");
          video.preload = "metadata";
          video.onloadedmetadata = () => {
            res(video.duration);
            URL.revokeObjectURL(video.src);
          };
          video.onerror = () => res(0);
          video.src = URL.createObjectURL(file);
        });
        if (duration > CAROUSEL_VIDEO_MAX_SEC) {
          setCarouselError(`Video "${file.name}" must be ${CAROUSEL_VIDEO_MAX_SEC} seconds or less.`);
          return;
        }
        newItems.push({ file, type: "video", duration });
      }
    }
    const total = carouselFiles.length + newItems.length;
    if (total > CAROUSEL_MAX_ITEMS) {
      setCarouselError(`Maximum ${CAROUSEL_MAX_ITEMS} items.`);
      return;
    }
    setCarouselFiles((prev) => [...prev, ...newItems].slice(0, CAROUSEL_MAX_ITEMS));
    if (e.target) e.target.value = "";
  };

  const removeCarouselItem = (index: number) => {
    setCarouselFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveCarouselItem = (from: number, to: number) => {
    if (to < 0 || to >= carouselFiles.length) return;
    setCarouselFiles((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item!);
      return next;
    });
  };

  const publishReel = async () => {
    if (!reelFile) return;
    setStatus("uploading");
    setStatusMessage("Uploading video…");
    setReelError(null);
    try {
      const form = new FormData();
      form.append("file", reelFile);
      const uploadRes = await fetch("/api/blou/upload", {
        method: "POST",
        body: form,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        setStatus("error");
        setStatusMessage(uploadData.error || "Upload failed");
        return;
      }
      const videoUrl = uploadData.url;
      setStatus("processing");
      setStatusMessage("Publishing to Instagram…");
      const publishRes = await fetch("/api/blou/publish/reel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl, caption }),
      });
      const publishData = await publishRes.json();
      if (!publishRes.ok) {
        if (publishRes.status === 401) {
          setStatusMessage("Reconnect Instagram from the Connect page.");
        } else {
          setStatusMessage(publishData.error || "Publish failed");
        }
        setStatus("error");
        return;
      }
      setStatus("success");
      setStatusMessage("Reel published.");
      setReelFile(null);
      setReelDuration(null);
      setCaption("");
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Try again.");
    }
  };

  const publishCarousel = async () => {
    if (carouselFiles.length < CAROUSEL_MIN_ITEMS) {
      setCarouselError(`Add at least ${CAROUSEL_MIN_ITEMS} items.`);
      return;
    }
    setStatus("uploading");
    setStatusMessage("Uploading files…");
    setCarouselError(null);
    try {
      const urls: { url: string; type: "image" | "video" }[] = [];
      for (const item of carouselFiles) {
        const form = new FormData();
        form.append("file", item.file);
        const uploadRes = await fetch("/api/blou/upload", {
          method: "POST",
          body: form,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          setStatus("error");
          setStatusMessage(uploadData.error || "Upload failed");
          return;
        }
        urls.push({ url: uploadData.url, type: item.type });
      }
      setStatus("processing");
      setStatusMessage("Publishing carousel…");
      const publishRes = await fetch("/api/blou/publish/carousel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaUrls: urls, caption }),
      });
      const publishData = await publishRes.json();
      if (!publishRes.ok) {
        if (publishRes.status === 401) {
          setStatusMessage("Reconnect Instagram from the Connect page.");
        } else {
          setStatusMessage(publishData.error || "Publish failed");
        }
        setStatus("error");
        return;
      }
      setStatus("success");
      setStatusMessage("Carousel published.");
      setCarouselFiles([]);
      setCaption("");
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Try again.");
    }
  };

  const canPublish =
    status === "idle" ||
    status === "success" ||
    status === "error";
  const isReelValid = reelFile && !reelError;
  const isCarouselValid =
    carouselFiles.length >= CAROUSEL_MIN_ITEMS &&
    carouselFiles.length <= CAROUSEL_MAX_ITEMS &&
    !carouselError;

  if (connected === null) {
    return (
      <Card className="border-teal-100 bg-white shadow-sm">
        <CardContent className="pt-6 flex items-center gap-2 text-stone-600">
          <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
          <span>Checking Instagram connection…</span>
        </CardContent>
      </Card>
    );
  }

  if (connected === false) {
    return (
      <Card className="border-teal-100 bg-white shadow-sm">
        <CardContent className="pt-6">
          <p className="text-stone-600 mb-4">
            Connect your Instagram Business account first to publish content.
          </p>
          <Button asChild className="bg-teal-600 hover:bg-teal-700">
            <Link href="/blou/manager">Connect Instagram</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex gap-2 border-b border-teal-200 mb-6">
        <button
          type="button"
          onClick={() => setTab("reel")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            tab === "reel"
              ? "bg-teal-100 text-teal-800 border border-b-0 border-teal-200 -mb-px"
              : "text-stone-600 hover:text-teal-600"
          }`}
        >
          <Film className="inline h-4 w-4 mr-2" />
          Reel
        </button>
        <button
          type="button"
          onClick={() => setTab("carousel")}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            tab === "carousel"
              ? "bg-teal-100 text-teal-800 border border-b-0 border-teal-200 -mb-px"
              : "text-stone-600 hover:text-teal-600"
          }`}
        >
          <Images className="inline h-4 w-4 mr-2" />
          Carousel
        </button>
      </div>

      <Card className="border-teal-100 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-teal-800">
            {tab === "reel" ? "Publish a Reel" : "Publish a Carousel"}
          </CardTitle>
          <CardDescription>
            {tab === "reel"
              ? "Upload a video (MP4/MOV, max 90 sec, 9:16 recommended) and add a caption."
              : `Upload 2–10 images or videos (JPEG min 600px wide; videos max 60 sec). First item sets crop.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status !== "idle" && status !== "success" && status !== "error" && (
            <p className="text-sm text-teal-700 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {statusMessage}
            </p>
          )}
          {(status === "error" || status === "success") && statusMessage && (
            <p
              className={`text-sm p-3 rounded-lg ${
                status === "success"
                  ? "text-teal-800 bg-teal-50"
                  : "text-red-600 bg-red-50"
              }`}
            >
              {statusMessage}
            </p>
          )}
          {status === "success" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatus("idle")}
              className="border-teal-200"
            >
              Publish another
            </Button>
          )}

          {tab === "reel" && (
            <>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Video
                </label>
                <input
                  ref={reelInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime,.mp4,.mov"
                  onChange={handleReelFileChange}
                  className="block w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-50 file:text-teal-700"
                />
                {reelFile && (
                  <p className="mt-1 text-sm text-stone-500">
                    {reelFile.name}
                    {reelDuration != null && ` · ${reelDuration.toFixed(1)}s`}
                  </p>
                )}
                {reelError && (
                  <p className="mt-1 text-sm text-red-600">{reelError}</p>
                )}
              </div>
            </>
          )}

          {tab === "carousel" && (
            <>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Items (2–10)
                </label>
                <input
                  ref={carouselInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,video/mp4,video/quicktime"
                  multiple
                  onChange={handleCarouselFilesChange}
                  className="block w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-50 file:text-teal-700"
                />
                {carouselError && (
                  <p className="mt-1 text-sm text-red-600">{carouselError}</p>
                )}
                <ul className="mt-2 space-y-2">
                  {carouselFiles.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 p-2 bg-stone-50 rounded-lg"
                    >
                      <button
                        type="button"
                        className="text-stone-400 hover:text-stone-600"
                        onClick={() => moveCarouselItem(i, i - 1)}
                        disabled={i === 0}
                        aria-label="Move up"
                      >
                        <GripVertical className="h-4 w-4" />
                      </button>
                      <span className="flex-1 truncate text-sm text-stone-700">
                        {item.file.name}
                        {item.type === "video" && item.duration != null && (
                          <span className="text-stone-500"> · {item.duration.toFixed(0)}s</span>
                        )}
                      </span>
                      <button
                        type="button"
                        className="text-stone-400 hover:text-red-600"
                        onClick={() => removeCarouselItem(i)}
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                {carouselFiles.length > 0 && (
                  <p className="text-xs text-stone-500 mt-1">
                    First item sets aspect ratio. Drag to reorder.
                  </p>
                )}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Write a caption…"
            />
          </div>

          <div className="flex gap-3 pt-2">
            {tab === "reel" && (
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                disabled={!canPublish || !isReelValid}
                onClick={publishReel}
              >
                {status === "uploading" || status === "processing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Publish Reel
                  </>
                )}
              </Button>
            )}
            {tab === "carousel" && (
              <Button
                className="bg-teal-600 hover:bg-teal-700"
                disabled={!canPublish || !isCarouselValid}
                onClick={publishCarousel}
              >
                {status === "uploading" || status === "processing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Publish Carousel
                  </>
                )}
              </Button>
            )}
            <Button variant="outline" asChild className="border-teal-200">
              <Link href="/blou/manager">Back to Connect</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
