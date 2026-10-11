import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

const metadataBase = siteConfig.canonicalUrl ? new URL(siteConfig.canonicalUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteConfig.pageTitle,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: siteConfig.pageDescription,
  alternates: siteConfig.canonicalUrl ? { canonical: "/" } : undefined,
  openGraph: {
    title: siteConfig.pageTitle,
    description: siteConfig.pageDescription,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.pageTitle,
    description: siteConfig.pageDescription,
    images: ["/opengraph-image"],
  },
  themeColor: siteConfig.colors.background,
  icons: {
    icon: "/favicon.svg",
  },
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-[color:var(--background)] text-[color:var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
