import { env } from "@/lib/env";

export function Footer() {
  return (
    <footer className="border-t py-10">
      <div className="container flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-zinc-600">
          © {new Date().getFullYear()} {env.NEXT_PUBLIC_SITE_NAME}. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-zinc-600">
          <a className="hover:text-zinc-900" href="/api/health">Health</a>
          <a className="hover:text-zinc-900" href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
