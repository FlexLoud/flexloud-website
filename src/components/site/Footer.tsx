"use client";

import { ArrowUpRight, ChevronUp, Mail, MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";

const SITE = {
  name: "Flexloud",
  tagline: "Systems Private Limited",
  email: "hello@flexloud.in",
  phone: "+91-XXXXXXXXXX",
  location: "India",
};

type LinkItem = { label: string; href: string; desc?: string };

export function Footer() {
  const year = new Date().getFullYear();
  const [open, setOpen] = useState<Record<string, boolean>>({
    Company: true,
    Services: true,
    Resources: true,
  });

  const groups = useMemo<Record<string, LinkItem[]>>(
    () => ({
      Company: [
        { label: "Home", href: "/", desc: "Flexloud homepage" },
        { label: "Features", href: "#features", desc: "Why Flexloud" },
        { label: "Testimonials", href: "#testimonials", desc: "Client feedback" },
        { label: "Pricing", href: "#pricing", desc: "Plans & pricing" },
        { label: "Contact", href: "#contact", desc: "Talk to us" },
      ],
      Services: [
        { label: "Custom CRM", href: "#services", desc: "CRM tailored to your workflow" },
        { label: "Tally Integration", href: "#services", desc: "Sync data reliably" },
        { label: "Web & App Development", href: "#services", desc: "Modern products" },
        { label: "Cloud Data Management", href: "#services", desc: "Secure, scalable systems" },
        { label: "SEO & Growth", href: "#services", desc: "Performance + visibility" },
      ],
      Resources: [
        { label: "Get a Quote", href: "#contact", desc: "Request estimate" },
        { label: "Case Studies", href: "#testimonials", desc: "See outcomes" },
        { label: "FAQ", href: "#pricing", desc: "Common questions" },
        { label: "Privacy Policy", href: "/privacy", desc: "Privacy & data handling" },
        { label: "Terms", href: "/terms", desc: "Terms of service" },
      ],
    }),
    []
  );

  const social = useMemo(
    () => [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "X (Twitter)", href: "https://x.com" },
    ],
    []
  );

  return (
    <footer className="footer-wrap">
      {/* Top gradient divider */}
      <div className="footer-divider" aria-hidden />

      <div className="container-xl footer-inner">
        {/* Brand / CTA */}
        <div className="footer-brand">
          <div className="flex items-center gap-3 ">
            {/* <img
              src="/images/logo.png"
              alt="Flexloud logo"
              className="h-10 w-auto"
              loading="lazy"
            /> */}
            <div >
              <p className="text-sm font-semibold text-white">
                {SITE.name} <span className="text-white/70">{SITE.tagline}</span>
              </p>
              {/* <p className="mt-0.5 text-sm text-white/70">{SITE.tagline}</p> */}
            </div>
          </div>

          <p className="mt-4 max-w-md text-sm text-white/70">
            Clean, fast, and reliable systems — from custom CRM + Tally sync to
            websites, webapps, and cloud data management.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn btn-primary footer-cta">
              Get a free consultation <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#pricing" className="btn btn-outline footer-cta-outline">
              View pricing
            </a>
          </div>

          <div className="mt-6 grid gap-2 text-sm text-white/75">
            <a className="footer-meta" href={`mailto:${SITE.email}`}>
              <Mail className="h-4 w-4" /> {SITE.email}
            </a>
            <a className="footer-meta" href={`tel:${SITE.phone}`}>
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <div className="footer-meta">
              <MapPin className="h-4 w-4" /> {SITE.location}
            </div>
          </div>
        </div>

        {/* Link groups */}
        <div className="footer-cols">
          {Object.entries(groups).map(([title, links]) => (
            <div key={title} className="footer-col">
              <button
                className="footer-col-head md:pointer-events-none"
                onClick={() => setOpen((p) => ({ ...p, [title]: !p[title] }))}
                aria-expanded={open[title]}
              >
                <span>{title}</span>
                <ChevronUp
                  className={[
                    "h-4 w-4 transition-transform md:hidden",
                    open[title] ? "rotate-0" : "rotate-180",
                  ].join(" ")}
                />
              </button>

              <ul
                className={[
                  "footer-links",
                  open[title] ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                  "md:max-h-none md:opacity-100",
                ].join(" ")}
              >
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="footer-link"
                      aria-label={l.desc ? `${l.label} - ${l.desc}` : l.label}
                      title={l.desc || l.label}
                    >
                      <span>{l.label}</span>
                      <span className="footer-link-icon" aria-hidden>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="footer-col">
            <div className="footer-col-head">
              <span>Social</span>
            </div>

            <ul className="footer-links md:opacity-100 md:max-h-none">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-link"
                    aria-label={`${SITE.name} on ${s.label}`}
                    title={`${SITE.name} on ${s.label}`}
                  >
                    <span>{s.label}</span>
                    <span className="footer-link-icon" aria-hidden>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="footer-top"
              aria-label="Back to top"
              title="Back to top"
            >
              <span>Back to top</span>
              <ChevronUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container-xl flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/60">
            © {year} {SITE.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            <a className="footer-mini-link" href="/privacy">
              Privacy
            </a>
            <a className="footer-mini-link" href="/terms">
              Terms
            </a>
            <a className="footer-mini-link" href="#contact">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
