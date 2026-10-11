import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { buttonStyles } from "@/components/ui/button";
import { ScrollLink } from "@/components/ui/scroll-link";

export function FinalCtaSection() {
  return (
    <section className="py-16 sm:py-20">
      <Card className="overflow-hidden border-[color:var(--primary)]/18 bg-[linear-gradient(180deg,rgba(23,26,32,0.98),rgba(10,12,16,0.94))] p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">Final CTA</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Have a GPU workload waiting to happen?</h2>
            <p className="max-w-2xl text-base leading-8 text-[color:var(--secondary)]">Tell us what you want to run. Your use case could help determine what we build first.</p>
            <p className="text-sm text-[color:var(--secondary)]">No payment required. No commitment to purchase.</p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <ScrollLink targetId="wishlist" focusId="wishlist-heading" className={buttonStyles()}>
              Join the Wishlist
              <ArrowRight className="h-4 w-4" />
            </ScrollLink>
            <p className="text-sm text-[color:var(--secondary)]">The button scrolls to the survey.</p>
          </div>
        </div>
      </Card>
    </section>
  );
}