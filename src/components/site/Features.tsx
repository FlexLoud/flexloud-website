export function Features() {
  const items = [
    { title: "Design system-ready", desc: "Composable UI primitives with consistent spacing, typography, and accessibility." },
    { title: "Conversion-oriented", desc: "Clear narrative flow: value → proof → pricing → CTA → contact." },
    { title: "Production wiring", desc: "Health checks, env validation, and Cloud Run compatible runtime behavior." },
    { title: "Extensible by default", desc: "Add blog, case studies, auth, or a CMS without rewriting foundations." }
  ];

  return (
    <section id="features" className="border-y bg-amber-800 py-16">
      <div className="container max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">Features</h2>
          <p className="mt-2 text-zinc-600">A modern web surface with real deployment posture.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {items.map((x) => (
            <div key={x.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold tracking-tight">{x.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
