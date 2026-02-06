import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { getRequestId } from "@/lib/request";

export async function GET() {
  const requestId = getRequestId();
  const start = Date.now();

  const payload = {
    status: "ok",
    service: "flexloud-web",
    buildSha: env.BUILD_SHA ?? null,
    nodeEnv: env.NODE_ENV,
    uptimeSec: Math.floor(process.uptime())
  };

  logger.info(
    { requestId, path: "/api/health", durationMs: Date.now() - start },
    "Health check"
  );

  return Response.json(payload, {
    status: 200,
    headers: { "x-request-id": requestId }
  });
}
