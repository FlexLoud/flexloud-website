"use client";

import {
  BadgeIndianRupee,
  Building2,
  Check,
  Rocket,
  Sparkles,
  ToggleLeft,
} from "lucide-react";
import { useMemo, useState } from "react";

type Tier = {
  name: string;
  price: string;
  note?: string;
  bullets: string[];
  highlight?: boolean;
  cta: string;
};

type PlanKey = "website" | "crm" | "monthly";

export function Pricing() {
  const [plan, setPlan] = useState<PlanKey>("website");

  const data = useMemo<Record<PlanKey, { title: string; subtitle: string; tiers: Tier[] }>>(
    () => ({
      website: {
        title: "Website pricing",
        subtitle: "Choose a plan. We’ll adjust scope based on your exact needs.",
        tiers: [
          {
            name: "Starter",
            price: "₹15k – ₹45k",
            note: "Best for: simple business site",
            bullets: [
              "1-page or up to 3 sections",
              "Mobile responsive + fast load",
              "Lead form + WhatsApp/Email",
              "Basic SEO (titles, meta, sitemap)",
              "Deploy + domain setup support",
            ],
            cta: "Talk for Starter",
          },
          {
            name: "Pro",
            price: "₹45k – ₹1.2L",
            note: "Best for: multi-page + growth",
            bullets: [
              "Multi-page site (5–12 pages)",
              "Services, portfolio, case studies",
              "Advanced SEO + speed optimization",
              "Analytics + event tracking",
              "Blog / CMS ready (optional)",
            ],
            highlight: true,
            cta: "Choose Pro",
          },
          {
            name: "Enterprise",
            price: "Custom",
            note: "Best for: brand + complex needs",
            bullets: [
              "Full brand UI system (design + components)",
              "Custom animations + interactions",
              "Security review + performance budget",
              "Integrations (CRM, chat, forms, tools)",
              "Priority support + faster delivery",
            ],
            cta: "Contact Sales",
          },
        ],
      },

      crm: {
        title: "Standalone CRM pricing",
        subtitle: "CRM build depends on modules. We can start small and scale later.",
        tiers: [
          {
            name: "Starter CRM",
            price: "₹60k – ₹1.5L",
            note: "Best for: basic leads + pipeline",
            bullets: [
              "Leads capture + pipeline stages",
              "Users + roles (basic)",
              "Search, filters, export",
              "Activity logs / notes",
              "Deployment + backups setup",
            ],
            cta: "Discuss CRM Starter",
          },
          {
            name: "Pro CRM",
            price: "₹1.5L – ₹4L",
            note: "Best for: teams + automation",
            bullets: [
              "Lead + customer modules",
              "Role-based access (advanced)",
              "Automations (email/WhatsApp/webhooks)",
              "Reports + dashboards",
              "API integrations (Tally/ERP optional)",
            ],
            highlight: true,
            cta: "Choose Pro CRM",
          },
          {
            name: "Enterprise CRM",
            price: "Custom",
            note: "Best for: multi-tenant / large ops",
            bullets: [
              "Multi-tenant / multi-branch setup",
              "Custom workflows + approvals",
              "Audit logs + security posture",
              "Performance tuning for large data",
              "SLA support + dedicated rollout",
            ],
            cta: "Contact Sales",
          },
        ],
      },

      monthly: {
        title: "Monthly support",
        subtitle: "For maintenance, updates, SEO, and small new features every month.",
        tiers: [
          {
            name: "Basic",
            price: "₹8k / month",
            note: "Best for: small updates",
            bullets: [
              "Minor UI/content updates",
              "Bug fixes (non-critical)",
              "Performance checks",
              "Basic SEO cleanup",
              "Email support",
            ],
            cta: "Start Basic",
          },
          {
            name: "Growth",
            price: "₹18k / month",
            note: "Best for: regular changes",
            bullets: [
              "Everything in Basic",
              "New sections/pages (small)",
              "Tracking + conversion tweaks",
              "Priority response",
              "Monthly report summary",
            ],
            highlight: true,
            cta: "Choose Growth",
          },
          {
            name: "Scale",
            price: "₹35k+ / month",
            note: "Best for: fast-moving teams",
            bullets: [
              "Dedicated monthly bandwidth",
              "Feature rollout support",
              "Design + dev improvements",
              "Integrations help",
              "Faster turnaround",
            ],
            cta: "Talk for Scale",
          },
        ],
      },
    }),
    []
  );

  const active = data[plan];

  const pillBase =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium";
  const segBtn =
    "rounded-full px-3 py-2 text-sm font-medium transition-colors";

  return (
    <section id="pricing" >
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8 md:mb-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-zinc-900/70">Pricing</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">
                Simple plans. Flexible scope.
              </h2>
              <p className="mt-2 text-zinc-600">
                {active.subtitle}
              </p>
            </div>

            <span className={`${pillBase} bg-white`}>
              <BadgeIndianRupee className="h-4 w-4" />
              Flexible pricing (less work = less cost)
            </span>
          </div>

          {/* Switch */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setPlan("website")}
                className={[
                  segBtn,
                  plan === "website"
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                Website
              </button>
              <button
                type="button"
                onClick={() => setPlan("crm")}
                className={[
                  segBtn,
                  plan === "crm"
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                Standalone CRM
              </button>
              <button
                type="button"
                onClick={() => setPlan("monthly")}
                className={[
                  segBtn,
                  plan === "monthly"
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
              >
                Monthly Support
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-zinc-600">
            Exact price depends on pages/modules/features — we’ll confirm after a quick call.
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {active.tiers.map((t) => (
            <div
              key={t.name}
              className={[
                "relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all",
                t.highlight
                  ? "border-zinc-900 shadow-md md:-translate-y-1"
                  : "hover:shadow-md hover:-translate-y-0.5",
              ].join(" ")}
            >
              {/* highlight glow */}
              {t.highlight && (
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-200/50 blur-3xl" />
              )}

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                      {t.name}
                    </h3>
                    {t.note && (
                      <p className="mt-1 text-sm text-zinc-600">{t.note}</p>
                    )}
                  </div>

                  {t.highlight ? (
                    <span className={`${pillBase} bg-zinc-900 text-white border-zinc-900`}>
                      <Sparkles className="h-4 w-4" />
                      Popular
                    </span>
                  ) : (
                    <span className={`${pillBase} bg-zinc-50`}>
                      {t.name.toLowerCase().includes("enterprise") ? (
                        <Building2 className="h-4 w-4" />
                      ) : (
                        <Rocket className="h-4 w-4" />
                      )}
                      Plan
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-2xl font-semibold tracking-tight text-zinc-900">
                    {t.price}
                  </div>
                </div>

                <ul className="mt-5 grid gap-2 text-sm text-zinc-700">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex gap-2 rounded-2xl border bg-zinc-50 px-3 py-2">
                      <Check className="mt-0.5 h-4 w-4 text-zinc-900" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={[
                    "mt-6 inline-flex w-full justify-center rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    t.highlight
                      ? "bg-zinc-900 text-white hover:bg-zinc-800"
                      : "border bg-white hover:bg-zinc-50",
                  ].join(" ")}
                >
                  {t.cta}
                </a>

                <p className="mt-3 text-xs text-zinc-500">
                  Need something smaller/bigger? We can reduce or add features — price updates accordingly.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* small footer note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-zinc-600">
          <ToggleLeft className="h-4 w-4" />
          Switch plans above to compare Website, CRM, or Monthly Support.
        </div>
      </div>
    </section>
  );
}
