import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { WishlistWizard } from "@/components/wishlist/wishlist-wizard";

export function WishlistSection() {
  return (
    <section id="wishlist" className="py-16 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-5 lg:sticky lg:top-24">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">Wishlist</p>
          <h2 id="wishlist-heading" tabIndex={-1} className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Help us build the right GPU cloud.
          </h2>
          <p className="text-base leading-8 text-[color:var(--secondary)]">
            Tell us what you&apos;re trying to run, what&apos;s stopping you today, and what would make GPU access useful. Your answers will help determine what we build first.
          </p>
          <div className="grid gap-3 text-sm text-[color:var(--secondary)]">
            <Card className="p-4">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">Time</div>
              <p className="mt-2">Approximately 2-3 minutes.</p>
            </Card>
            <Card className="p-4">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">Status</div>
              <p className="mt-2">Joining is an expression of interest, not a purchase or guaranteed access.</p>
            </Card>
            <Card className="p-4">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[color:var(--primary)]">Privacy</div>
              <p className="mt-2">
                <a className="text-[color:var(--primary-bright)] underline-offset-4 hover:underline" href="/privacy">
                  Review the placeholder privacy policy
                </a>
                .
              </p>
            </Card>
          </div>
        </div>

        <Card className="overflow-hidden p-4 sm:p-6 lg:p-8">
          <Suspense
            fallback={
              <div className="space-y-4 py-6 text-sm text-[color:var(--secondary)]">
                <div className="h-4 w-40 rounded-full bg-white/5" />
                <div className="h-2 w-full rounded-full bg-white/5" />
                <div className="h-56 rounded-[1.5rem] border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)]/70" />
              </div>
            }
          >
            <WishlistWizard />
          </Suspense>
        </Card>
      </div>
    </section>
  );
}