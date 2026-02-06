export function CTA() {
  return (
    <section className="py-16">
      <div className="container max-w-6xl">
        <div className="rounded-2xl border bg-zinc-900 p-10 text-white">
          <h2 className="text-3xl font-semibold tracking-tight">Ready to ship?</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            If you want a website that behaves like a product asset (not a brochure), this repo is your baseline.
          </p>
          <div className="mt-6">
            <a
              href="#contact"
              className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
