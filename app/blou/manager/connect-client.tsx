"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Instagram, Loader2 } from "lucide-react";

interface Status {
  connected: boolean;
  username?: string;
  igUserId?: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  no_pages: "No Facebook Page found. Link a Page to your account.",
  no_instagram_account: "No Instagram Business account linked to your Page.",
  config: "Server configuration error (META_APP_ID / META_APP_SECRET).",
  missing_code: "OAuth callback missing code.",
  server_error: "Server error. Try again.",
};

export function ConnectClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urlError = searchParams.get("error");

  useEffect(() => {
    fetch("/api/auth/instagram/status")
      .then((res) => res.json())
      .then((data: Status) => {
        setStatus(data);
        setError(null);
      })
      .catch(() => setStatus({ connected: false }))
      .finally(() => setLoading(false));
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/instagram/connect");
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error || "Could not get OAuth URL");
    } catch {
      setError("Network error");
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    setDisconnecting(true);
    setError(null);
    try {
      await fetch("/api/auth/instagram/disconnect", { method: "POST" });
      setStatus({ connected: false });
    } catch {
      setError("Failed to disconnect");
    } finally {
      setDisconnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-teal-100 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-800">
            <Instagram className="h-5 w-5" />
            Instagram Connection
          </CardTitle>
          <CardDescription>
            Connect your Instagram Business account to publish reels and carousels.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(urlError || error) && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error ?? (urlError ? (ERROR_MESSAGES[urlError] ?? urlError.replace(/_/g, " ")) : "Connection failed.")}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{error}</p>
          )}
          {status?.connected ? (
            <div className="space-y-4">
              <p className="text-sm text-stone-600">
                Connected as <strong className="text-teal-700">@{status.username}</strong>
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-teal-200 text-teal-700 hover:bg-teal-50"
                  onClick={handleDisconnect}
                  disabled={disconnecting}
                >
                  {disconnecting ? "Disconnecting…" : "Disconnect"}
                </Button>
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/blou/manager/publish">Go to Publish</Link>
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="w-full bg-teal-600 hover:bg-teal-700"
              onClick={handleConnect}
              disabled={connecting}
            >
              {connecting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <Instagram className="h-4 w-4" />
                  Connect Instagram
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
