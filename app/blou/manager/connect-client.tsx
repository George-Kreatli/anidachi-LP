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

interface Account {
  igUserId: string;
  username: string;
  connected: boolean;
}

interface Status {
  connected: boolean;
  accounts: Account[];
}

const MAX_ACCOUNTS = 2;

const ERROR_MESSAGES: Record<string, string> = {
  no_pages: "No Facebook Page found. Link a Page to your account.",
  no_instagram_account: "No Instagram Business account linked to your Page.",
  config: "Server configuration error (INSTAGRAM_APP_ID / INSTAGRAM_APP_SECRET).",
  missing_code: "OAuth callback missing code.",
  missing_or_invalid_state: "OAuth session expired or was tampered with. Please try again.",
  server_error: "Server error. Try again.",
};

export function ConnectClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [disconnectingId, setDisconnectingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const urlError = searchParams.get("error");

  useEffect(() => {
    fetch("/api/auth/instagram/status")
      .then((res) => res.json())
      .then((data: Status) => {
        setStatus(data);
        setError(null);
      })
      .catch(() => setStatus({ connected: false, accounts: [] }))
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

  const handleDisconnect = async (igUserId: string) => {
    setDisconnectingId(igUserId);
    setError(null);
    try {
      await fetch("/api/auth/instagram/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ igUserId }),
      });
      setStatus((prev) => {
        if (!prev) return prev;
        const accounts = prev.accounts.filter((a) => a.igUserId !== igUserId);
        return { connected: accounts.length > 0, accounts };
      });
    } catch {
      setError("Failed to disconnect");
    } finally {
      setDisconnectingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  const accounts = status?.accounts ?? [];
  const canAddMore = accounts.length < MAX_ACCOUNTS;

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-teal-100 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-800">
            <Instagram className="h-5 w-5" />
            Instagram Connections
          </CardTitle>
          <CardDescription>
            Connect up to {MAX_ACCOUNTS} Instagram Business accounts. Posts will
            be published to all connected accounts simultaneously.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(urlError || error) && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error ?? (urlError ? (ERROR_MESSAGES[urlError] ?? urlError.replace(/_/g, " ")) : "Connection failed.")}
            </p>
          )}

          {accounts.length > 0 && (
            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.igUserId}
                  className="flex items-center justify-between p-3 rounded-lg bg-teal-50/50 border border-teal-100"
                >
                  <p className="text-sm text-stone-600">
                    <strong className="text-teal-700">@{account.username}</strong>
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-teal-200 text-teal-700 hover:bg-teal-50"
                    onClick={() => handleDisconnect(account.igUserId)}
                    disabled={disconnectingId === account.igUserId}
                  >
                    {disconnectingId === account.igUserId
                      ? "Disconnecting\u2026"
                      : "Disconnect"}
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3">
            {canAddMore && (
              <Button
                className="flex-1 bg-teal-600 hover:bg-teal-700"
                onClick={handleConnect}
                disabled={connecting}
              >
                {connecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connecting&hellip;
                  </>
                ) : (
                  <>
                    <Instagram className="h-4 w-4" />
                    {accounts.length === 0
                      ? "Connect Instagram"
                      : "Connect Another Account"}
                  </>
                )}
              </Button>
            )}
            {accounts.length > 0 && (
              <Button asChild className="flex-1 bg-teal-600 hover:bg-teal-700">
                <Link href="/blou/manager/publish">Go to Publish</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
