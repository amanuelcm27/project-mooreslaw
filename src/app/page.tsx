import { DifferentiatorsSection } from "@/components/landing/differentiators";
import { FaqSection } from "@/components/landing/faq";
import { FinalCtaSection } from "@/components/landing/final-cta";
import { HeroSection } from "@/components/landing/hero";
import { HowItWorksSection } from "@/components/landing/how-it-works";
import { ProblemSection } from "@/components/landing/problem";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { UseCasesSection } from "@/components/landing/use-cases";
import { WishlistSection } from "@/components/wishlist/wishlist-section";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 noise-grid opacity-[0.22]" />
      <SiteHeader />
      <main id="main-content" className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <HeroSection />
        <UseCasesSection />
        <ProblemSection />
        <HowItWorksSection />
        <DifferentiatorsSection />
        <WishlistSection />
        <FinalCtaSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  );
}
