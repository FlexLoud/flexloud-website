"use client";

import * as React from "react";
import { useToast } from "./use-toast";

export function Toast() {
  const { state, clear } = useToast();

  React.useEffect(() => {
    if (!state) return;
    const t = setTimeout(() => clear(), 3000);
    return () => clearTimeout(t);
  }, [state, clear]);

  if (!state) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[320px] rounded-2xl border bg-amber-900 p-4 shadow-lg">
      {state.title && <div className="text-sm font-semibold">{state.title}</div>}
      {state.description && <div className="mt-1 text-sm text-zinc-600">{state.description}</div>}
    </div>
  );
}
