import type { Metadata, Viewport } from "next";
import { Anton, Instrument_Serif, Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

// Anton is condensed; the auto-generated Arial fallback is ~28% wider and re-wraps headlines when the
// font arrives. Width-matched fallbacks (defined in globals.css) keep the swap free of layout shift.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Anton Fallback Impact", "Anton Fallback Narrow", "Anton Fallback Arial", "Impact", "sans-serif"],
});
const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});
// Not preloaded: the headline fonts get the early bandwidth; Inter's metric-matched fallback covers the gap.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.fullName,
  keywords: ["Softrock", "SoftRock Band", "Sufi rock", "Sufi rock fusion band", "live band Delhi NCR", "Bairagi", "wedding band", "Bollywood live band"],
  openGraph: {
    type: "website",
    siteName: siteConfig.fullName,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description },
  ...(siteConfig.indexable ? {} : { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  themeColor: "#080807",
  colorScheme: "dark",
};

/** MusicGroup structured data, limited to verified facts. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: siteConfig.fullName,
  alternateName: siteConfig.name,
  description: `${siteConfig.tagline} based in ${siteConfig.location}.`,
  genre: ["Sufi rock", "Bollywood", "Rock"],
  url: siteConfig.url,
  logo: absoluteUrl(siteConfig.logo.src),
  image: absoluteUrl("/images/photos/stage-softrock-logo.webp"),
  email: siteConfig.contact.email,
  sameAs: [siteConfig.social.youtube.url, siteConfig.social.instagram.url],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${instrument.variable} ${inter.variable}`}>
      <body className="grain min-h-screen overflow-x-clip">
        <SiteHeader />
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
