import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border px-3 py-2 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-zinc-900/20",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
