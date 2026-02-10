import {
  Gauge,
  Headphones,
  Palette,
  PlugZap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export function Features() {
  const items = [
    {
      title: "Modern UI that builds trust",
      desc: "Clean, premium screens with perfect spacing, typography, and mobile-first layout — your brand looks serious.",
      icon: Palette,
    },
    {
      title: "Built to convert leads",
      desc: "Clear sections + strong CTAs + social proof so visitors understand your offer fast and take action.",
      icon: TrendingUp,
    },
    {
      title: "Fast, secure & production-ready",
      desc: "Optimized performance, SEO basics, and security-first setup — ready for real customers, not just demos.",
      icon: ShieldCheck,
    },
    {
      title: "Custom CRM & Tally integration",
      desc: "We connect Tally data to your CRM with sync/automation so sales, billing, and reports stay updated.",
      icon: PlugZap,
    },
    {
      title: "Scales with your business",
      desc: "Multi-page, admin panels, dashboards, roles, and future modules — without rebuilding from scratch.",
      icon: Gauge,
    },
    {
      title: "Support that actually helps",
      desc: "Quick fixes, improvements, and ongoing updates — you focus on business, we handle the tech.",
      icon: Headphones,
    },
  ];

  return (
    <section
      id="features"
    // className="  bg-gradient-to-b from-white to-zinc-50"
    >
      <div className="container max-w-6xl">
        {/* Heading */}


        {/* Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => {
            const Icon = x.icon;
            return (
              <div
                key={x.title}
                className="group relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {/* soft glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-white">
                    <Icon className="h-5 w-5 text-zinc-900" />
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-zinc-900">
                    {x.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {x.desc}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-zinc-700">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                    Included in every project
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
