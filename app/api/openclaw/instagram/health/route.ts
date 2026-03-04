import { NextRequest, NextResponse } from "next/server";
import {
  validateOpenClawSecret,
  unauthorizedResponse,
} from "@/lib/openclaw-auth";
import { getAllCredentials } from "@/lib/instagram/storage";

const GRAPH_BASE = "https://graph.instagram.com/v21.0";

export async function GET(request: NextRequest) {
  if (!validateOpenClawSecret(request)) {
    return unauthorizedResponse();
  }

  const accounts = await getAllCredentials();

  if (accounts.length === 0) {
    return NextResponse.json({
      healthy: false,
      reason: "no_accounts_connected",
      accounts: [],
    });
  }

  const results = await Promise.all(
    accounts.map(async (creds) => {
      try {
        const url = new URL(`${GRAPH_BASE}/${creds.igUserId}`);
        url.searchParams.set("fields", "id");
        url.searchParams.set("access_token", creds.accessToken);

        const res = await fetch(url.toString());
        return {
          igUserId: creds.igUserId,
          username: creds.igUsername,
          healthy: res.ok,
          reason: res.ok ? undefined : "graph_api_error",
        };
      } catch {
        return {
          igUserId: creds.igUserId,
          username: creds.igUsername,
          healthy: false,
          reason: "request_failed",
        };
      }
    }),
  );

  const allHealthy = results.every((r) => r.healthy);

  return NextResponse.json({
    healthy: allHealthy,
    accounts: results,
  });
}
