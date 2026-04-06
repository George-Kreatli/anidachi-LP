import fs from "fs/promises";
import path from "path";
import type { Contact, Touch } from "./types";

export function getCrmDataDir(): string {
  if (process.env.CRM_DATA_DIR) {
    return path.resolve(process.env.CRM_DATA_DIR);
  }
  return path.join(process.cwd(), "crm-data");
}

function paths() {
  const dir = getCrmDataDir();
  return {
    dir,
    contacts: path.join(dir, "contacts.json"),
    touches: path.join(dir, "touches.jsonl"),
    meta: path.join(dir, "meta.json"),
  };
}

export type CrmMeta = {
  schema_version: number;
  updated_at: string | null;
};

async function ensureDir() {
  await fs.mkdir(paths().dir, { recursive: true });
}

export async function readMeta(): Promise<CrmMeta> {
  await ensureDir();
  const { meta } = paths();
  try {
    const raw = await fs.readFile(meta, "utf8");
    const data = JSON.parse(raw) as CrmMeta;
    return {
      schema_version: typeof data.schema_version === "number" ? data.schema_version : 1,
      updated_at: data.updated_at ?? null,
    };
  } catch {
    return { schema_version: 1, updated_at: null };
  }
}

export async function writeMeta(partial: Partial<CrmMeta>): Promise<void> {
  await ensureDir();
  const cur = await readMeta();
  const next: CrmMeta = {
    schema_version: partial.schema_version ?? cur.schema_version,
    updated_at: partial.updated_at ?? cur.updated_at,
  };
  await fs.writeFile(paths().meta, JSON.stringify(next, null, 2), "utf8");
}

export async function readContacts(): Promise<Contact[]> {
  await ensureDir();
  const { contacts } = paths();
  try {
    const raw = await fs.readFile(contacts, "utf8");
    const data = JSON.parse(raw) as unknown;
    return Array.isArray(data) ? (data as Contact[]) : [];
  } catch {
    return [];
  }
}

export async function writeContacts(contacts: Contact[]): Promise<void> {
  await ensureDir();
  await fs.writeFile(paths().contacts, JSON.stringify(contacts, null, 2), "utf8");
  await writeMeta({ updated_at: new Date().toISOString() });
}

export async function readTouches(): Promise<Touch[]> {
  await ensureDir();
  const { touches } = paths();
  try {
    const raw = await fs.readFile(touches, "utf8");
    const lines = raw.split("\n").filter((l) => l.trim());
    return lines.map((line) => JSON.parse(line) as Touch);
  } catch {
    return [];
  }
}

export async function appendTouch(touch: Touch): Promise<void> {
  await ensureDir();
  const line = `${JSON.stringify(touch)}\n`;
  await fs.appendFile(paths().touches, line, "utf8");
}

export function crmDataDir(): string {
  return paths().dir;
}

export function contactsFilePath(): string {
  return paths().contacts;
}

export function touchesFilePath(): string {
  return paths().touches;
}
