import type { ReactNode } from "react";
import { cn } from "./cn";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[color:var(--surface-border)] bg-[color:var(--surface)] shadow-[0_24px_80px_rgba(0,0,0,0.24)]",
        className,
      )}
    >
      {children}
    </div>
  );
}