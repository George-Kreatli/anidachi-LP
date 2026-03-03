import { NextRequest, NextResponse } from "next/server";

// Ensure env is read at request time (not at build time)
export const dynamic = "force-dynamic";

// Instagram API with *Instagram* Login (no Facebook Page required).
// We request the minimum scopes needed for reading profile info and publishing content.
const INSTAGRAM_SCOPES = [
  "instagram_business_basic",
  "instagram_business_content_publish",
].join(",");

export async function GET(request: NextRequest) {
  // Prefer dedicated Instagram app credentials; fall back to META_* if the user reused the same values.
  const appId =
    process.env.INSTAGRAM_APP_ID || process.env.META_APP_ID || "";
  const redirectEnv = process.env.INSTAGRAM_OAUTH_REDIRECT_URI;
  const origin = request.nextUrl.origin;

  if (!appId) {
    return NextResponse.json(
      { error: "META_APP_ID is not configured" },
      { status: 500 }
    );
  }

  const callbackUrl =
    redirectEnv || `${origin}/api/auth/instagram/callback`;
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: callbackUrl,
    scope: INSTAGRAM_SCOPES,
    state,
    response_type: "code",
  });

  // Business Login for Instagram uses the instagram.com OAuth endpoint.
  const url = `https://www.instagram.com/oauth/authorize?${params.toString()}`;
  return NextResponse.json({ url });
}
