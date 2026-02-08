import { CTA } from "@/components/site/CTA";
import { ContactForm } from "@/components/site/ContactForm";
import { Features } from "@/components/site/Features";
import { Hero } from "@/components/site/Hero";
import { Pricing } from "@/components/site/Pricing";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200 via-sky-200 to-emerald-200 blur-3xl opacity-60" />
        <div className="absolute top-[520px] right-[-120px] h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-fuchsia-200 via-rose-200 to-amber-200 blur-3xl opacity-50" />
      </div>

      {/* content */}
      <div className="relative">
        {/* Top */}


        {/* Hero */}
        <section className=" py-5 md:py-14" style={{ backgroundImage: "url('/images/banner.png')" }}>
          <Hero />
        </section>

        {/* Features */}
        <section id="features" className="py-5 md:py-14">
          <div className="container max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-medium text-zinc-900/80">Why Flexloud</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 ">
                Clean, fast, and built to handle real business needs.
              </h2>
              <p className="mt-3 text-zinc-600">
                We combine clean code, fast delivery, and transparent pricing. No fluff, no lock-ins — just reliable systems that help you grow.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-6 shadow-sm backdrop-blur md:p-10">
              <Features />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-5 md:py-14">

          <div className="container max-w-6xl">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">

              <div className="max-w-2xl">
                <p className="text-sm font-medium text-zinc-900/80">Services</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
                  Everything you need to build, grow, and scale
                </h2>
                <p className="mt-3 text-zinc-600">
                  From custom CRM + Tally sync to web/app development, cloud data management, and SEO—handled end-to-end.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                Fast delivery • Clean code • Transparent pricing
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-200/70 bg-white/70 p-6 shadow-sm backdrop-blur md:p-10">

              <Services />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-5 md:py-14">
          <div className="container max-w-6xl">
            <div className="mb-5 max-w-2xl">
              {/* <p className="text-sm font-medium text-zinc-900/80">Social proof</p> */}
              <p className="text-sm font-medium text-zinc-900/80">Testimonials</p>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
                Loved by teams that ship
              </h2>
              <p className="mt-3 text-zinc-600">
                A few words from people who use said product daily.
              </p>
            </div>

            <Testimonials />
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-5 md:py-14">
          <div className="container max-w-6xl">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-zinc-900/80">Pricing</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
                  Simple plans, transparent pricing
                </h2>
                <p className="mt-3 text-zinc-600">
                  Start small, scale later. No hidden charges.
                </p>
              </div>

              <div className="text-sm text-zinc-600">
                Need custom?{" "}
                <a className="font-medium text-zinc-900 hover:underline" href="#contact">
                  Contact us →
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm md:p-10">
              <Pricing />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-5 md:py-14">
          <div className="container max-w-6xl">
            <div className="rounded-3xl border border-zinc-200/70 bg-gradient-to-br from-zinc-900 to-zinc-800 p-8 text-white shadow-sm md:p-12">
              <CTA />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-5 md:py-14">
          <div className="container max-w-6xl">
            <div className="mb-8 max-w-2xl">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-2xl">
                Contact
              </h2>
              <p className="mt-2 text-zinc-600">
                Drop your details — we’ll help you choose the right solution.
              </p>
            </div>

            {/* <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm md:p-10"> */}
            <ContactForm />
            {/* </div> */}
          </div>
        </section>

        {/* Footer */}

      </div>
    </main>
  );
}
