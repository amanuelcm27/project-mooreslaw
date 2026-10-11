import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Privacy | ${siteConfig.brandName}`,
  description: "Placeholder privacy policy for the GPU compute wishlist experiment.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="space-y-6 rounded-[2rem] border border-[color:var(--surface-border)] bg-[color:var(--surface)] p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--primary)]">Privacy placeholder</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em]">Privacy policy to be finalized before launch.</h1>
        <p className="max-w-3xl text-base leading-8 text-[color:var(--secondary)]">
          This page is a placeholder for the privacy policy that will be completed before any public launch. The current frontend collects wishlist responses for validation and product research only.
        </p>
        <div className="space-y-4 text-sm leading-7 text-[color:var(--secondary)]">
          <p>Replace this page with the production privacy policy before collecting real public submissions.</p>
          <p>Contact: <a className="text-[color:var(--primary-bright)]" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></p>
        </div>
        <a href="/" className="inline-flex rounded-full border border-[color:var(--surface-border)] bg-[color:var(--surface-elevated)] px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--primary)]/40">
          Back to the wishlist
        </a>
      </article>
    </main>
  );
}