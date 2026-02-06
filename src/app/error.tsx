"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900">
        <div className="mx-auto max-w-xl px-6 py-20">
          <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
          <p className="mt-3 text-sm text-zinc-600">
            Try again. If the issue persists, contact support.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Retry
          </button>
          {error?.digest && (
            <p className="mt-6 text-xs text-zinc-500">Error ID: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  );
}
