"use client";

import * as React from "react";

type ToastState = { title?: string; description?: string } | null;

const ToastContext = React.createContext<{
  toast: (t: { title?: string; description?: string }) => void;
  state: ToastState;
  clear: () => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ToastState>(null);

  const toast = (t: { title?: string; description?: string }) => setState(t);
  const clear = () => setState(null);

  return (
    <ToastContext.Provider value={{ toast, state, clear }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
