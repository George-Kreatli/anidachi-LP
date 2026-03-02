import { NextResponse } from "next/server";
import { getCredentials } from "@/lib/instagram/storage";

export async function GET() {
  const creds = await getCredentials();
  if (!creds) {
    return NextResponse.json({
      connected: false,
    });
  }
  return NextResponse.json({
    connected: true,
    username: creds.igUsername,
    igUserId: creds.igUserId,
  });
}
