"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  icon?: any;
};

export function Testimonials() {
  const items: Testimonial[] = useMemo(
    () => [
      {
        quote:
          "Clean delivery. Minimal friction. Exactly what engineering teams want.",
        name: "Delivery Lead",
        role: "Engineering",
        company: "Logistics SaaS",
        icon: Rocket,
      },
      {
        quote:
          "Looks premium and loads fast. Finally, a site that feels enterprise-ready.",
        name: "Business Owner",
        role: "Founder",
        company: "Services Company",
        icon: Sparkles,
      },
      {
        quote:
          "Deployment was straightforward. Cloud Run worked on first run. Rare and beautiful.",
        name: "Platform Engineer",
        role: "Infra",
        company: "Cloud Team",
        icon: ShieldCheck,
      },
      {
        quote:
          "The UI feels polished and the performance is genuinely impressive under load.",
        name: "Tech Lead",
        role: "Frontend",
        company: "Product Org",
        icon: Cpu,
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const total = items.length;
  const active = items[index];

  const go = (next: number) => {
    const normalized = (next + total) % total;
    setDir(next > index ? 1 : -1);
    setIndex(normalized);
  };

  // autoplay
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(index + 1), 4500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused]);

  const Icon = active.icon ?? Quote;

  return (
    <section className="py-4">
      <div className="relative mx-auto max-w-6xl">
        {/* Frame */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm md:p-8"
        >
          {/* soft background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
          </div>

          {/* top bar */}
          <div className="relative mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-white">
                <Icon className="h-5 w-5 text-zinc-900" />
              </span>
              <div className="text-sm">
                <div className="font-medium text-zinc-900">Testimonials</div>
                <div className="text-zinc-600">What teams say after shipping</div>
              </div>
            </div>

            {/* arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-white hover:bg-zinc-50 active:scale-[0.98]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5 text-zinc-900" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-white hover:bg-zinc-50 active:scale-[0.98]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5 text-zinc-900" />
              </button>
            </div>
          </div>

          {/* slide */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: dir * 24, filter: "blur(2px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: dir * -24, filter: "blur(2px)" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="relative grid gap-6 md:grid-cols-[1.3fr_.7fr]"
              >
                {/* quote card */}
                <div className="rounded-3xl border bg-white/70 p-6 md:p-7">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl border bg-white">
                      <Quote className="h-4 w-4 text-zinc-900" />
                    </span>
                    <p className="text-base leading-relaxed text-zinc-800 md:text-lg">
                      “{active.quote}”
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-zinc-900">
                        {active.name}
                      </div>
                      <div className="text-sm text-zinc-600">
                        {[active.role, active.company].filter(Boolean).join(" · ")}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium text-zinc-700">
                      <span className="h-2 w-2 rounded-full bg-sky-500" />
                      Verified
                    </span>
                  </div>
                </div>

                {/* side mini stack */}
                <div className="grid gap-3">
                  {items
                    .map((t, i) => ({ t, i }))
                    .filter(({ i }) => i !== index)
                    .slice(0, 2)
                    .map(({ t, i }) => {
                      const MiniIcon = t.icon ?? Quote;
                      return (
                        <button
                          key={t.name + i}
                          type="button"
                          onClick={() => go(i)}
                          className="group rounded-3xl border bg-white/60 p-5 text-left hover:bg-white active:scale-[0.99]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border bg-white">
                              <MiniIcon className="h-4 w-4 text-zinc-900" />
                            </span>
                            <div>
                              <div className="line-clamp-2 text-sm text-zinc-700">
                                “{t.quote}”
                              </div>
                              <div className="mt-3 text-sm font-medium text-zinc-900">
                                {t.name}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* dots */}
          <div className="relative mt-6 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-zinc-900" : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
