import { CTA } from "@/components/site/CTA";
import { ContactForm } from "@/components/site/ContactForm";
import { Features } from "@/components/site/Features";
import { HeroV4 } from "@/components/site/Hero3";
import { Pricing } from "@/components/site/Pricing";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white">


      {/* content */}
      <div className="relative">
        {/* Top */}


        {/* Hero */}
        <section className=" py-5 md:py-14" style={{ backgroundImage: "url('/images/banner.png')", backgroundPosition: '60% center' }}>
          {/* <Hero /> */}
          {/* <HeroAnimated /> */}
          <HeroV4 />
          {/* <HeroV5 /> */}
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

            <div className="card-glass hover-glow">
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
            <div className="card-glass hover-glow">

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

            <div className="card-glass hover-glow">
              <Testimonials />
            </div>
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

            <div className="card-glass hover-glow">
              <Pricing />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-5 md:py-14">
          <div className="container max-w-6xl">
            <div className="card-glass hover-glow">
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

            <div >
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Footer */}

      </div>
    </main>
  );
}
