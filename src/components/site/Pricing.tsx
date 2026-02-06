export function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "₹0–₹XXK",
      bullets: ["Single-page marketing site", "Lead form + webhook", "Cloud Run deployment"],
      highlight: false
    },
    {
      name: "Pro",
      price: "₹XXK–₹XXXK",
      bullets: ["Multi-page site", "Case studies + SEO", "Analytics + performance tuning"],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      bullets: ["Brand system + design ops", "Security posture + reviews", "Integrations (CRM, ticketing, etc.)"],
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="border-y bg-zinc-50 py-16">
      <div className="container max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">Pricing</h2>
          <p className="mt-2 text-zinc-600">Replace placeholders with your actual commercial model.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={[
                "rounded-2xl border bg-white p-6 shadow-sm",
                t.highlight ? "border-zinc-900" : ""
              ].join(" ")}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold tracking-tight">{t.name}</h3>
                <span className="text-sm text-zinc-600">{t.price}</span>
              </div>
              <ul className="mt-4 grid gap-2 text-sm text-zinc-700">
                {t.bullets.map((b) => (
                  <li key={b} className="rounded-xl border bg-zinc-50 px-3 py-2">{b}</li>
                ))}
              </ul>
              <a
                href="#contact"
                className={[
                  "mt-6 inline-flex w-full justify-center rounded-2xl px-4 py-3 text-sm font-medium",
                  t.highlight ? "bg-zinc-900 text-white hover:bg-zinc-800" : "border hover:bg-zinc-50"
                ].join(" ")}
              >
                Choose {t.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
