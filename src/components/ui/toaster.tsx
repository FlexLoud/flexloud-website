"use client";

import { ToastProvider } from "./use-toast";
import { Toast } from "./toast";

export function Toaster({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toast />
    </ToastProvider>
  );
}
