import { NextRequest, NextResponse } from "next/server";
import { clearCredentials } from "@/lib/instagram/storage";

export async function POST(request: NextRequest) {
  let igUserId: string | undefined;
  try {
    const body = await request.json();
    igUserId = body.igUserId;
  } catch {
    // No body or invalid JSON — disconnect all (backwards-compat)
  }

  await clearCredentials(igUserId);
  return NextResponse.json({ ok: true });
}
