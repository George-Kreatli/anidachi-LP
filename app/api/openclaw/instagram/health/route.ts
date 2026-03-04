import { NextRequest, NextResponse } from "next/server";
import {
  validateOpenClawSecret,
  unauthorizedResponse,
} from "@/lib/openclaw-auth";
import { ensureCredentials } from "@/lib/instagram/graph";

const GRAPH_BASE = "https://graph.instagram.com/v21.0";

export async function GET(request: NextRequest) {
  if (!validateOpenClawSecret(request)) {
    return unauthorizedResponse();
  }

  try {
    const creds = await ensureCredentials();

    const url = new URL(`${GRAPH_BASE}/${creds.igUserId}`);
    url.searchParams.set("fields", "id");
    url.searchParams.set("access_token", creds.accessToken);

    const res = await fetch(url.toString());
    if (!res.ok) {
      return NextResponse.json({ healthy: false, reason: "graph_api_error" });
    }

    return NextResponse.json({ healthy: true });
  } catch {
    return NextResponse.json({ healthy: false, reason: "token_expired" });
  }
}
