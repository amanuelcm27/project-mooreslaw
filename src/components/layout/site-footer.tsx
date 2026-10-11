import { siteConfig } from "@/lib/site";
import { BrandMark } from "@/components/ui/brand-mark";
import { CurrentYear } from "@/components/ui/current-year";
import { ScrollLink } from "@/components/ui/scroll-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--surface-border)] bg-[color:var(--surface)]/70">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
        <div className="space-y-4">
          <BrandMark />
          <p className="max-w-xl text-sm leading-7 text-[color:var(--secondary)]">
            {siteConfig.brandTagline} We are validating demand before deciding the first product shape, supported workloads, and access model.
          </p>
          <p className="text-sm text-[color:var(--secondary)]">
            Contact: <a className="text-[color:var(--primary-bright)]" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </p>
        </div>

        <div className="grid gap-3 text-sm text-[color:var(--secondary)] sm:grid-cols-2">
          <ScrollLink targetId="use-cases" className="transition hover:text-[color:var(--foreground)]">Use cases</ScrollLink>
          <ScrollLink targetId="wishlist" focusId="wishlist-heading" className="transition hover:text-[color:var(--foreground)]">Wishlist</ScrollLink>
          <ScrollLink targetId="faq" className="transition hover:text-[color:var(--foreground)]">FAQ</ScrollLink>
          <a className="transition hover:text-[color:var(--foreground)]" href="/privacy">Privacy</a>
        </div>
      </div>

      <div className="border-t border-[color:var(--surface-border)]/70 px-4 py-4 text-center text-xs uppercase tracking-[0.28em] text-[color:var(--secondary)] sm:px-6 lg:px-8">
        © <CurrentYear /> {siteConfig.brandName}
      </div>
    </footer>
  );
}