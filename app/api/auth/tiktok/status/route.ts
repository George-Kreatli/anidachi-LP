import { NextResponse } from "next/server";
import { getAllCredentials } from "@/lib/tiktok/storage";

export async function GET() {
  const accounts = await getAllCredentials();

  if (accounts.length === 0) {
    return NextResponse.json({ connected: false, accounts: [] });
  }

  return NextResponse.json({
    connected: true,
    accounts: accounts.map((a) => ({
      openId: a.openId,
      username: a.username,
      avatarUrl: a.avatarUrl,
      connected: true,
    })),
  });
}
