import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const REQUIRED = ["META_APP_ID", "META_APP_SECRET"] as const;
const OPTIONAL = ["INSTAGRAM_OAUTH_REDIRECT_URI"] as const;

/**
 * GET /api/auth/instagram/config-check
 * Returns which env vars are set (names only). Use to verify production config.
 * Remove or restrict in production once done debugging.
 */
export async function GET() {
  const missing = REQUIRED.filter((key) => !process.env[key]?.trim());
  const optionalSet = OPTIONAL.filter((key) => process.env[key]?.trim());
  const ok = missing.length === 0;

  return NextResponse.json({
    ok,
    missing,
    optionalSet,
    hint: ok
      ? "All required Instagram env vars are set."
      : `In Vercel: Settings → Environment Variables → add for Production: ${missing.join(", ")}. Then redeploy.`,
  });
}
