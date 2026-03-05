import { NextRequest, NextResponse } from "next/server";
import { clearCredentials } from "@/lib/tiktok/storage";

export async function POST(request: NextRequest) {
  let openId: string | undefined;
  try {
    const body = await request.json();
    openId = body.openId;
  } catch {
    // No body — disconnect all
  }

  await clearCredentials(openId);
  return NextResponse.json({ ok: true });
}
