import { headers } from "next/headers";

export async function getRequestId(): Promise<string> {
  const h = await headers();
  return h.get("x-request-id") ?? crypto.randomUUID();
}

export async function getClientMeta() {
  const h = await headers();
  return {
    userAgent: h.get("user-agent") ?? undefined,
    forwardedFor: h.get("x-forwarded-for") ?? undefined,
  };
}
