import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Testimonials } from "@/components/site/Testimonials";
import { Pricing } from "@/components/site/Pricing";
import { CTA } from "@/components/site/CTA";
import { ContactForm } from "@/components/site/ContactForm";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <section id="contact" className="py-16">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-2 text-zinc-600">
              Drop your requirements. This will route to your lead endpoint (webhook) or store server-side later.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
