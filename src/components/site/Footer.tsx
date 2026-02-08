
export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 py-10">
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} Flexloud. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-zinc-600">
            <a className="hover:text-zinc-900" href="#features">Features</a>
            <a className="hover:text-zinc-900" href="#pricing">Pricing</a>
            <a className="hover:text-zinc-900" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
