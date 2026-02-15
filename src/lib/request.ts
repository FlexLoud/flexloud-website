import { headers } from "next/headers";

export async function getRequestId(): Promise<string> {
  const h = headers();
  return (await h).get("x-request-id") ?? crypto.randomUUID();
}

export async function getClientMeta() {
  const h = headers();
  return {
    userAgent: (await h).get("user-agent") ?? undefined,
    // Cloud Run commonly sets X-Forwarded-For; may include multiple IPs.
    forwardedFor: (await h).get("x-forwarded-for") ?? undefined,
  };
}
