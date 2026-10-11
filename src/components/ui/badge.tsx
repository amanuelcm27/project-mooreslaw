import type { ReactNode } from "react";
import { cn } from "./cn";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color:var(--primary)]/28 bg-[color:var(--primary)]/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--primary-bright)]",
        className,
      )}
    >
      {children}
    </span>
  );
}