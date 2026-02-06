export function Testimonials() {
  const items = [
    { quote: "Clean delivery. Minimal friction. Exactly what engineering teams want.", name: "Delivery Lead" },
    { quote: "Looks premium and loads fast. Finally, a site that feels enterprise-ready.", name: "Business Owner" },
    { quote: "Deployment was straightforward. Cloud Run worked on first run. Rare and beautiful.", name: "Platform Engineer" }
  ];

  return (
    <section className="py-16">
      <div className="container max-w-6xl">
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">Proof</h2>
          <p className="mt-2 text-zinc-600">Social validation placeholders you can replace with real client quotes.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((x) => (
            <figure key={x.name} className="rounded-2xl border p-6">
              <blockquote className="text-sm text-zinc-700">“{x.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-zinc-900">{x.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
