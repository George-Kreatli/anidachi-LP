import { NextRequest, NextResponse } from "next/server";
import { setCredentials } from "@/lib/instagram/storage";

export const dynamic = "force-dynamic";

const GRAPH_BASE = "https://graph.facebook.com/v21.0";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;
  const redirectUri =
    process.env.INSTAGRAM_OAUTH_REDIRECT_URI ||
    `${request.nextUrl.origin}/api/auth/instagram/callback`;

  if (!appId || !appSecret) {
    return NextResponse.redirect(
      new URL("/blou/manager?error=config", request.url)
    );
  }

  if (error) {
    return NextResponse.redirect(
      new URL(`/blou/manager?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/blou/manager?error=missing_code", request.url)
    );
  }

  try {
    // Exchange code for short-lived user access token
    const tokenUrl = new URL(`${GRAPH_BASE}/oauth/access_token`);
    tokenUrl.searchParams.set("client_id", appId);
    tokenUrl.searchParams.set("client_secret", appSecret);
    tokenUrl.searchParams.set("redirect_uri", redirectUri);
    tokenUrl.searchParams.set("code", code);

    const tokenRes = await fetch(tokenUrl.toString());
    const tokenData = (await tokenRes.json()) as {
      access_token?: string;
      error?: { message: string };
    };

    if (!tokenData.access_token) {
      const msg = tokenData.error?.message || "Token exchange failed";
      return NextResponse.redirect(
        new URL(`/blou/manager?error=${encodeURIComponent(msg)}`, request.url)
      );
    }

    const shortLivedToken = tokenData.access_token;

    // Exchange for long-lived token (60 days)
    const longLivedUrl = new URL(`${GRAPH_BASE}/oauth/access_token`);
    longLivedUrl.searchParams.set("grant_type", "fb_exchange_token");
    longLivedUrl.searchParams.set("client_id", appId);
    longLivedUrl.searchParams.set("client_secret", appSecret);
    longLivedUrl.searchParams.set("fb_exchange_token", shortLivedToken);

    const longLivedRes = await fetch(longLivedUrl.toString());
    const longLivedData = (await longLivedRes.json()) as {
      access_token?: string;
      expires_in?: number;
      error?: { message: string };
    };

    if (!longLivedData.access_token) {
      const msg = longLivedData.error?.message || "Long-lived token exchange failed";
      return NextResponse.redirect(
        new URL(`/blou/manager?error=${encodeURIComponent(msg)}`, request.url)
      );
    }

    const userToken = longLivedData.access_token;
    const expiresIn = longLivedData.expires_in ?? 60 * 24 * 60 * 60; // 60 days in seconds
    const tokenExpiry = Date.now() + expiresIn * 1000;

    // Get user's Facebook Pages
    const accountsRes = await fetch(
      `${GRAPH_BASE}/me/accounts?access_token=${encodeURIComponent(userToken)}`
    );
    const accountsData = (await accountsRes.json()) as {
      data?: { id: string; access_token: string }[];
      error?: { message: string };
    };

    if (!accountsData.data?.length) {
      return NextResponse.redirect(
        new URL(
          "/blou/manager?error=no_pages",
          request.url
        )
      );
    }

    // Use first page to get Instagram Business Account
    const pageId = accountsData.data[0].id;
    const pageRes = await fetch(
      `${GRAPH_BASE}/${pageId}?fields=instagram_business_account&access_token=${encodeURIComponent(userToken)}`
    );
    const pageData = (await pageRes.json()) as {
      instagram_business_account?: { id: string };
      error?: { message: string };
    };

    const igUserId = pageData.instagram_business_account?.id;
    if (!igUserId) {
      return NextResponse.redirect(
        new URL(
          "/blou/manager?error=no_instagram_account",
          request.url
        )
      );
    }

    // Get Instagram username
    const igUserRes = await fetch(
      `${GRAPH_BASE}/${igUserId}?fields=username&access_token=${encodeURIComponent(userToken)}`
    );
    const igUserData = (await igUserRes.json()) as {
      username?: string;
      error?: { message: string };
    };
    const igUsername = igUserData.username ?? "unknown";

    await setCredentials({
      accessToken: userToken,
      tokenExpiry,
      igUserId,
      igUsername,
    });

    return NextResponse.redirect(new URL("/blou/manager?connected=1", request.url));
  } catch (err) {
    console.error("Instagram callback error:", err);
    return NextResponse.redirect(
      new URL(
        "/blou/manager?error=server_error",
        request.url
      )
    );
  }
}
