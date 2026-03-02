import { NextRequest, NextResponse } from "next/server";

// Ensure env is read at request time (not at build time)
export const dynamic = "force-dynamic";

// Instagram API with *Facebook* Login (facebook.com/dialog/oauth) uses these scopes.
// Do NOT use instagram_business_* — those are for "Instagram API with Instagram Login" only.
const SCOPES = [
  "pages_show_list",
  "pages_read_engagement",
  "instagram_basic",
  "instagram_content_publish",
].join(",");

export async function GET(request: NextRequest) {
  const appId = process.env.META_APP_ID;
  const redirectUri = process.env.INSTAGRAM_OAUTH_REDIRECT_URI;
  const origin = request.nextUrl.origin;

  if (!appId) {
    return NextResponse.json(
      { error: "META_APP_ID is not configured" },
      { status: 500 }
    );
  }

  const callbackUrl =
    redirectUri || `${origin}/api/auth/instagram/callback`;
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: callbackUrl,
    scope: SCOPES,
    state,
    response_type: "code",
  });

  const url = `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;
  return NextResponse.json({ url });
}
