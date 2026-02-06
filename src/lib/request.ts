import { headers } from "next/headers";

export function getRequestId(): string {
  const h = headers();
  return h.get("x-request-id") ?? crypto.randomUUID();
}

export function getClientMeta() {
  const h = headers();
  return {
    userAgent: h.get("user-agent") ?? undefined,
    // Cloud Run commonly sets X-Forwarded-For; may include multiple IPs.
    forwardedFor: h.get("x-forwarded-for") ?? undefined
  };
}
