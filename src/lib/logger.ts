import pino from "pino";
import { env } from "./env";

export const logger = pino({
  level: env.LOG_LEVEL,
  base: {
    service: "flexloud-web",
    buildSha: env.BUILD_SHA
  },
  redact: {
    paths: [
      "req.headers.authorization",
      "*.authorization",
      "*.token",
      "*.password"
    ],
    remove: true
  }
});

export function logError(err: unknown) {
  if (err instanceof Error) {
    logger.error(
      {
        type: "error",
        name: err.name,
        message: err.message,
        stack: err.stack
      },
      "Unhandled error"
    );
    return;
  }
  logger.error({ type: "unknown_error", err }, "Unhandled non-Error throw");
}
