"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

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

      <header
        className={[
          "z-50 w-full transition-all duration-300",
          stuck
            ? "fixed top-0 left-0 right-0 border-b bg-white/85 backdrop-blur shadow-sm"
            : "relative",
        ].join(" ")}
      >
        <div
          className={[
            "container max-w-6xl transition-all duration-300",
            // shrink on scroll
            stuck ? "py-3 md:py-4" : "py-3 md:py-3",
          ].join(" ")}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              {/* <div className="h-8 w-8 rounded-xl bg-zinc-900" /> */}
              {/* i want to add my logo here */}
              <img src="/images/logo2.png" alt="Logo" height={80} width={80} className=" rounded-xl" />

            </div>

            {/* Desktop Nav (unchanged) */}
            <nav className="hidden items-center gap-6 text-sm text-zinc-700 md:flex">
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
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <a
                href="#pricing"
                className="hidden rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 md:inline-flex"
              >
                Get Started
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-white md:hidden"
                aria-label="Toggle menu"
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
