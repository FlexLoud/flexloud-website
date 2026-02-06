import { env } from "@/lib/env";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">
          {env.NEXT_PUBLIC_SITE_NAME}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a className="text-sm text-zinc-700 hover:text-zinc-900" href="#features">Features</a>
          <a className="text-sm text-zinc-700 hover:text-zinc-900" href="#pricing">Pricing</a>
          <a className="text-sm text-zinc-700 hover:text-zinc-900" href="#contact">Contact</a>
        </nav>

        <a
          className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-zinc-50"
          href="#contact"
        >
          Get a proposal
        </a>
      </div>
    </header>
  );
}
