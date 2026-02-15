"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useActiveSection } from "../ui/userActiveSection";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const active = useActiveSection();

  const linkClass = (id: string) =>
    `nav-link ${active === id ? "nav-link-active" : ""}`;


  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 80;
      setStuck(s);
      if (s) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* This spacer prevents content jump when navbar becomes fixed */}
      <div className={stuck ? "h-[72px] md:h-[88px]" : "h-0"} />

      {/* <header
        className={[
          "z-50 w-full transition-all duration-300",
          stuck
            ? "fixed top-0 left-0 right-0 border-b bg-white/85 backdrop-blur shadow-sm"
            : "relative",
        ].join(" ")}
      > */}
      <header className={["z-50 w-full transition-all duration-300", stuck ? "nav-shell-stuck" : "relative"].join(" ")}>

        <div
          className={[
            "container max-w-6xl transition-all duration-300",
            // shrink on scroll
            stuck ? "py-3 md:py-4" : "py-3 md:py-3",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2" style={{ maxWidth: 200 }}>
              {/* <div className="h-8 w-8 rounded-xl bg-zinc-900" /> */}
              {/* i want to add my logo here */}
              <img src="/images/logo.png" alt="Logo" className="h-9 w-auto md:h-10" />

            </div>

            {/* Desktop Nav (unchanged) */}
            {/* <nav className="hidden items-center gap-6 text-sm text-zinc-700 md:flex">
              <a className="hover:text-zinc-900" href="#features">
                Features
              </a>
              <a className="hover:text-zinc-900" href="#testimonials">
                Testimonials
              </a>
              <a className="hover:text-zinc-900" href="#pricing">
                Pricing
              </a>
              <a className="hover:text-zinc-900" href="#contact">
                Contact
              </a>
              <a className="hover:text-zinc-900" href="#crm">
                CRM
              </a>
            </nav> */}

            <nav className="hidden items-center gap-6 md:flex">
              <a className={linkClass("features")} href="#features">Features</a>
              <a className={linkClass("services")} href="#services">Services</a>
              <a className={linkClass("testimonials")} href="#testimonials">Testimonials</a>
              <a className={linkClass("pricing")} href="#pricing">Pricing</a>
              <a className={linkClass("contact")} href="#contact">Contact</a>
            </nav>


            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <a href="#pricing" className="btn btn-primary hidden md:inline-flex">
                Get Started
              </a>

              {/* <button
                onClick={() => {
                  const html = document.documentElement;
                  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
                }}
                className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-xl border"
                style={{
                  background: "var(--surface-solid)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                🌙
              </button> */}



              {/* Mobile Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border md:hidden"
                style={{
                  background: "var(--surface-solid)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >

                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="mt-4 rounded-2xl border bg-white p-4 shadow-sm md:hidden">
              <nav className="flex flex-col gap-4 text-sm text-zinc-700">
                <a onClick={() => setOpen(false)} href="#features">
                  Features
                </a>
                <a onClick={() => setOpen(false)} href="#testimonials">
                  Testimonials
                </a>
                <a onClick={() => setOpen(false)} href="#pricing">
                  Pricing
                </a>
                <a onClick={() => setOpen(false)} href="#contact">
                  Contact
                </a>
                <a onClick={() => setOpen(false)} href="#crm">
                  CRM
                </a>

                <a
                  onClick={() => setOpen(false)}
                  href="#pricing"
                  className="mt-2 inline-flex justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                >
                  Get Started
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
