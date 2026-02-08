import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  NEXT_PUBLIC_SITE_NAME: z.string().default("FlexLoud"),
  NEXT_PUBLIC_SITE_TAGLINE: z
    .string()
    .default("Cloud • Data • CRM — engineered for outcomes"),

  // Observability / ops
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  BUILD_SHA: z.string().optional(),

  // Lead webhook delivery
  LEADS_WEBHOOK_URL: z.string().url().optional(),
  WEBHOOK_TIMEOUT_MS: z.coerce.number().int().min(500).max(30000).default(5000),

  // Rate limiting (best effort in-memory; use Cloud Armor for true enforcement)
  RATE_LIMIT_ENABLED: z.coerce.boolean().default(true),
  RATE_LIMIT_RPM: z.coerce.number().int().min(1).max(600).default(30),

  PORT: z.coerce.number().optional(),
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  NEXT_PUBLIC_SITE_TAGLINE: process.env.NEXT_PUBLIC_SITE_TAGLINE,
  LOG_LEVEL: process.env.LOG_LEVEL,
  BUILD_SHA: process.env.BUILD_SHA,
  LEADS_WEBHOOK_URL: process.env.LEADS_WEBHOOK_URL,
  WEBHOOK_TIMEOUT_MS: process.env.WEBHOOK_TIMEOUT_MS,
  RATE_LIMIT_ENABLED: process.env.RATE_LIMIT_ENABLED,
  RATE_LIMIT_RPM: process.env.RATE_LIMIT_RPM,
  PORT: process.env.PORT,
});
