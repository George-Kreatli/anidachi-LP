import { NextRequest, NextResponse } from "next/server";

// Ensure env is read at request time (not at build time)
export const dynamic = "force-dynamic";

// Instagram API with *Facebook* Login (facebook.com/dialog/oauth).
// All requested scopes must be added in Meta: Use cases → your login use case → Customize → add each permission.
const DEFAULT_SCOPES = [
  "pages_show_list",
  "pages_read_engagement",
  "instagram_basic",
  "instagram_content_publish",
];

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

  // If you get "Invalid Scopes", set INSTAGRAM_MINIMAL_SCOPES=1 and add only pages_show_list + instagram_basic in Meta first
  const scopes =
    process.env.INSTAGRAM_MINIMAL_SCOPES === "1"
      ? ["pages_show_list", "instagram_basic"].join(",")
      : DEFAULT_SCOPES.join(",");

  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: callbackUrl,
    scope: scopes,
    state,
    response_type: "code",
  });

  const url = `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;
  return NextResponse.json({ url });
}
