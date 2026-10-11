"use client";

import type { AnchorHTMLAttributes } from "react";
import { cn } from "./cn";

interface ScrollLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  targetId: string;
  focusId?: string;
  className?: string;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollLink({ targetId, focusId, className, children, onClick, ...props }: ScrollLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        event.preventDefault();

        const target = document.getElementById(targetId);
        if (!target) {
          return;
        }

        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });

        const focusTarget = focusId ? document.getElementById(focusId) : target;
        if (focusTarget instanceof HTMLElement) {
          window.setTimeout(() => focusTarget.focus({ preventScroll: true }), 100);
        }
      }}
      {...props}
    >
      {children}
    </a>
  );
}