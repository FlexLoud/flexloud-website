import { env } from "./env";

type Bucket = { tokens: number; lastRefillMs: number; expiresAtMs: number };

const buckets = new Map<string, Bucket>();

function now() {
  return Date.now();
}

/**
 * Best-effort in-memory token bucket.
 * In Cloud Run, multiple instances won't share memory; for strict enforcement use Cloud Armor.
 */
export function rateLimitAllow(key: string) {
  if (!env.RATE_LIMIT_ENABLED) return { allowed: true, retryAfterSec: 0 };

  const rpm = env.RATE_LIMIT_RPM;
  const capacity = rpm; // tokens per minute
  const refillPerMs = capacity / 60000;

  const t = now();
  const existing = buckets.get(key);

  // Cleanup occasionally
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.expiresAtMs < t) buckets.delete(k);
  }

  if (!existing || existing.expiresAtMs < t) {
    buckets.set(key, {
      tokens: capacity - 1,
      lastRefillMs: t,
      expiresAtMs: t + 10 * 60000
    });
    return { allowed: true, retryAfterSec: 0 };
  }

  const elapsed = t - existing.lastRefillMs;
  const refill = elapsed * refillPerMs;

  existing.tokens = Math.min(capacity, existing.tokens + refill);
  existing.lastRefillMs = t;

  if (existing.tokens < 1) {
    const deficit = 1 - existing.tokens;
    const msToNext = deficit / refillPerMs;
    return { allowed: false, retryAfterSec: Math.ceil(msToNext / 1000) };
  }

  existing.tokens -= 1;
  return { allowed: true, retryAfterSec: 0 };
}
