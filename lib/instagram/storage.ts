/**
 * Instagram credentials storage.
 *
 * - In production (e.g. Vercel), uses Vercel Blob via BLOB_READ_WRITE_TOKEN.
 * - In local dev (or when no Blob token), falls back to a JSON file in .data/.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { get as blobGet, put as blobPut, list as blobList, del as blobDel } from "@vercel/blob";

const CREDENTIALS_FILE = ".data/instagram-credentials.json";
const BLOB_PATH = "instagram/credentials.json";

export interface InstagramCredentials {
  accessToken: string;
  tokenExpiry: number; // Unix timestamp (ms)
  igUserId: string;
  igUsername: string;
}

async function getCredentialsPath(): Promise<string> {
  return join(process.cwd(), CREDENTIALS_FILE);
}

async function getFromBlob(): Promise<InstagramCredentials | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;

  try {
    const result = await blobGet(BLOB_PATH, { access: "private", token });
    if (!result || result.statusCode !== 200) return null;

    const text = await new Response(result.stream).text();
    const parsed = JSON.parse(text) as InstagramCredentials;
    if (!parsed.accessToken || !parsed.igUserId) return null;
    if (parsed.tokenExpiry && Date.now() >= parsed.tokenExpiry) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function saveToBlob(creds: InstagramCredentials): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return;

  await blobPut(BLOB_PATH, JSON.stringify(creds, null, 2), {
    access: "private",
    token,
    addRandomSuffix: false,
  });
}

async function clearBlob(): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return;

  const { blobs } = await blobList({ prefix: BLOB_PATH, token });
  if (!blobs.length) return;

  await blobDel(
    blobs.map((b) => b.url),
    { token }
  );
}

export async function getCredentials(): Promise<InstagramCredentials | null> {
  // Prefer Blob in environments where it is configured (e.g. Vercel).
  const blobCreds = await getFromBlob();
  if (blobCreds) return blobCreds;

  // Fallback: local filesystem (useful for localhost dev).
  try {
    const path = await getCredentialsPath();
    const data = await readFile(path, "utf-8");
    const parsed = JSON.parse(data) as InstagramCredentials;
    if (!parsed.accessToken || !parsed.igUserId) return null;
    if (parsed.tokenExpiry && Date.now() >= parsed.tokenExpiry) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function setCredentials(creds: InstagramCredentials): Promise<void> {
  // Try Blob first; if not configured, fall back to filesystem.
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await saveToBlob(creds);
    return;
  }

  const dir = join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  const path = await getCredentialsPath();
  await writeFile(path, JSON.stringify(creds, null, 2), "utf-8");
}

export async function clearCredentials(): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await clearBlob();
    return;
  }

  try {
    const path = await getCredentialsPath();
    const { unlink } = await import("fs/promises");
    await unlink(path);
  } catch {
    // ignore if file doesn't exist
  }
}
