import { env } from "@/lib/env";

export function Hero() {
  return (
    <section className="py-12 md:py-18">
      <div className="container max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-medium text-zinc-600">Modern delivery, enterprise hygiene</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              {env.NEXT_PUBLIC_SITE_TAGLINE}
            </h1>
            <p className="mt-4 text-zinc-600">
              A clean, conversion-ready website foundation with best-practice engineering.
              Designed to ship fast, scale cleanly, and deploy to Cloud Run with minimal drama.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Talk to us
              </a>
              <a
                href="#features"
                className="rounded-2xl border px-5 py-3 text-sm font-medium hover:bg-zinc-50"
              >
                See capabilities
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-600">
              <span className="rounded-full border px-3 py-1">Next.js</span>
              <span className="rounded-full border px-3 py-1">TypeScript</span>
              <span className="rounded-full border px-3 py-1">Tailwind</span>
              <span className="rounded-full border px-3 py-1">Cloud Run</span>
            </div>
          </div>

          {/* <div className="rounded-2xl border bg-gradient-to-b from-zinc-50 to-white p-8 shadow-sm">
            <div className="grid gap-6">
              <div>
                <p className="text-sm font-medium text-zinc-700">What you get</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight">A deployable asset, not a demo.</p>
              </div>
              <ul className="grid gap-3 text-sm text-zinc-700">
                <li className="rounded-xl border bg-white p-4">Cloud Run-ready Docker build (multi-stage)</li>
                <li className="rounded-xl border bg-white p-4">Lead capture API route + webhook integration</li>
                <li className="rounded-xl border bg-white p-4">Performance-first, accessible UI patterns</li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
