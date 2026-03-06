import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TIKTOK_SCOPES = "user.info.basic,user.info.profile,video.upload,video.publish";

export async function GET(request: NextRequest) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY || "";
  const redirectUri =
    process.env.TIKTOK_REDIRECT_URI ||
    `${request.nextUrl.origin}/api/auth/tiktok/callback`;

  if (!clientKey) {
    return NextResponse.json(
      { error: "TIKTOK_CLIENT_KEY is not configured" },
      { status: 500 },
    );
  }

  const state = crypto.randomUUID();
  const csrfToken = crypto.randomUUID();

  const params = new URLSearchParams({
    client_key: clientKey,
    redirect_uri: redirectUri,
    scope: TIKTOK_SCOPES,
    state,
    response_type: "code",
  });

  const url = `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
  const isSecure = request.nextUrl.origin.startsWith("https://");
  const response = NextResponse.json({ url });

  response.cookies.set("tiktok_oauth_state", state, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    maxAge: 10 * 60,
    path: "/",
  });
  response.cookies.set("tiktok_csrf_token", csrfToken, {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax",
    maxAge: 10 * 60,
    path: "/",
  });

  return response;
}
