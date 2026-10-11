"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { brandNavigation } from "@/components/layout/site-navigation";
import { BrandMark } from "@/components/ui/brand-mark";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/components/ui/cn";
import { ScrollLink } from "@/components/ui/scroll-link";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--surface-border)]/70 bg-[rgba(8,9,11,0.84)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="shrink-0">
          <BrandMark />
        </a>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Primary">
          {brandNavigation.map((item) => (
            <ScrollLink
              key={item.label}
              targetId={item.targetId}
              className="rounded-full px-4 py-2 text-sm text-[color:var(--secondary)] transition hover:bg-white/5 hover:text-[color:var(--foreground)]"
            >
              {item.label}
            </ScrollLink>
          ))}
          <ScrollLink targetId="wishlist" focusId="wishlist-heading" className={buttonStyles()}>
            Join the Wishlist
          </ScrollLink>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] text-[color:var(--foreground)] md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[color:var(--surface-border)]/60 bg-[color:var(--surface)] md:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6 lg:px-8" aria-label="Mobile">
            {brandNavigation.map((item) => (
              <ScrollLink
                key={item.label}
                targetId={item.targetId}
                className={cn("rounded-2xl px-4 py-3 text-sm font-medium text-[color:var(--foreground)] hover:bg-white/5")}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </ScrollLink>
            ))}
            <ScrollLink
              targetId="wishlist"
              focusId="wishlist-heading"
              className={cn(buttonStyles(), "mt-1 w-full")}
              onClick={() => setOpen(false)}
            >
              Join the Wishlist
            </ScrollLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}