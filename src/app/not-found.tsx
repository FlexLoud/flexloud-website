export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-zinc-600">
        The page you are looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="mt-6 inline-flex rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Go home
      </a>
    </div>
  );
}
