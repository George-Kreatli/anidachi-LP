import { NextResponse } from "next/server";
import { clearCredentials } from "@/lib/instagram/storage";

export async function POST() {
  await clearCredentials();
  return NextResponse.json({ ok: true });
}
