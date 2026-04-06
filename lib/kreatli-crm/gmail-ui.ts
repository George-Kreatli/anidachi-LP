import { isGmailConfigured } from "./gmail";
import { isGmailConnected, readGmailTokens } from "./gmail-tokens";

export type GmailUiStatus = {
  configured: boolean;
  connected: boolean;
  email?: string;
};

export async function getGmailUiStatus(): Promise<GmailUiStatus> {
  const configured = isGmailConfigured();
  const tokens = await readGmailTokens();
  return {
    configured,
    connected: isGmailConnected(tokens),
    email: tokens?.email,
  };
}
