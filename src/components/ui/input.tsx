import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border px-3 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-zinc-900/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
