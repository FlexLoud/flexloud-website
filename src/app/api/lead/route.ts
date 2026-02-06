import { z } from "zod";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { getClientMeta, getRequestId } from "@/lib/request";
import { rateLimitAllow } from "@/lib/rate-limit";

const LeadSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  company: z.string().min(2).max(120).optional(),
  message: z.string().min(10).max(2000)
});

function safeEmail(email: string) {
  // Log-safe representation (prevents leaking full PII in logs)
  const [u, d] = email.split("@");
  if (!u || !d) return "invalid";
  return `${u.slice(0, 2)}***@${d}`;
}

export async function POST(req: Request) {
  const requestId = getRequestId();
  const start = Date.now();
  const meta = getClientMeta();

  // Rate limit key: best-effort using forwarded IP (first IP)
  const ip = (meta.forwardedFor ?? "unknown").split(",")[0].trim() || "unknown";
  const rl = rateLimitAllow(`lead:${ip}`);
  if (!rl.allowed) {
    logger.warn(
      { requestId, ip, retryAfterSec: rl.retryAfterSec },
      "Rate limit exceeded"
    );
    return Response.json(
      { ok: false, error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "x-request-id": requestId,
          "retry-after": String(rl.retryAfterSec)
        }
      }
    );
  }

  try {
    const body = await req.json();
    const lead = LeadSchema.parse(body);

    logger.info(
      {
        requestId,
        ip,
        userAgent: meta.userAgent,
        lead: { name: lead.name, email: safeEmail(lead.email), company: lead.company ?? null }
      },
      "Lead received"
    );

    if (env.LEADS_WEBHOOK_URL) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), env.WEBHOOK_TIMEOUT_MS);

      try {
        const res = await fetch(env.LEADS_WEBHOOK_URL, {
          method: "POST",
          headers: { "content-type": "application/json", "x-request-id": requestId },
          body: JSON.stringify({
            source: "flexloud-web",
            ...lead,
            createdAt: new Date().toISOString(),
            requestId
          }),
          signal: controller.signal
        });

        if (!res.ok) {
          logger.error(
            { requestId, status: res.status, durationMs: Date.now() - start },
            "Webhook delivery failed"
          );
          return Response.json(
            { ok: false, error: "Lead delivery failed. Please retry." },
            { status: 502, headers: { "x-request-id": requestId } }
          );
        }

        logger.info(
          { requestId, status: res.status, durationMs: Date.now() - start },
          "Webhook delivered"
        );
      } catch (err: any) {
        const isTimeout = err?.name === "AbortError";
        logger.error(
          { requestId, isTimeout, durationMs: Date.now() - start, err: err?.message ?? String(err) },
          "Webhook request error"
        );
        return Response.json(
          { ok: false, error: isTimeout ? "Lead delivery timed out. Please retry." : "Lead delivery failed." },
          { status: 502, headers: { "x-request-id": requestId } }
        );
      } finally {
        clearTimeout(timeout);
      }
    }

    logger.info(
      { requestId, durationMs: Date.now() - start },
      "Lead processed"
    );

    return Response.json(
      { ok: true },
      { status: 200, headers: { "x-request-id": requestId } }
    );
  } catch (e: any) {
    logger.warn(
      {
        requestId,
        durationMs: Date.now() - start,
        error: e?.message ?? "Invalid request"
      },
      "Lead validation failed"
    );
    return Response.json(
      { ok: false, error: e?.message ?? "Invalid request" },
      { status: 400, headers: { "x-request-id": requestId } }
    );
  }
}
