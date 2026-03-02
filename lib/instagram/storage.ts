/**
 * Instagram credentials storage.
 * Uses a JSON file in .data/ for persistence (works locally and on any host with writable disk).
 * For production at scale, replace with Redis/Upstash or similar.
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const CREDENTIALS_FILE = ".data/instagram-credentials.json";

export interface InstagramCredentials {
  accessToken: string;
  tokenExpiry: number; // Unix timestamp (ms)
  igUserId: string;
  igUsername: string;
}

async function getCredentialsPath(): Promise<string> {
  return join(process.cwd(), CREDENTIALS_FILE);
}

export async function getCredentials(): Promise<InstagramCredentials | null> {
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
  const dir = join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  const path = await getCredentialsPath();
  await writeFile(path, JSON.stringify(creds, null, 2), "utf-8");
}

export async function clearCredentials(): Promise<void> {
  try {
    const path = await getCredentialsPath();
    const { unlink } = await import("fs/promises");
    await unlink(path);
  } catch {
    // ignore if file doesn't exist
  }
}
