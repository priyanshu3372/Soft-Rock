/**
 * Global site configuration.
 *
 * Every fact here comes from Softrock's own public YouTube channel
 * (channel page + video descriptions). See docs/ASSET-INVENTORY.md for sources.
 */

/**
 * Site URL, in order of preference:
 *  1. NEXT_PUBLIC_SITE_URL (set this once the real domain is known)
 *  2. Vercel's production URL (system env var, available on Vercel deployments)
 *  3. localhost for local development
 */
const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
const resolvedUrl = explicitUrl || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

/** Search engines may index only real production deployments (never previews or localhost). */
const indexable = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : Boolean(explicitUrl);

export const siteConfig = {
  name: "Softrock",
  /** As written on the band's YouTube channel. */
  fullName: "SoftRock Band",
  url: resolvedUrl.replace(/\/$/, ""),
  /** When false, pages are marked noindex and robots.txt disallows crawling. */
  indexable,
  title: "Softrock | Official Band Website",
  description:
    "Discover Softrock's music, watch live performances, explore the band's gallery, and get in touch for event bookings.",
  /** Channel description, verbatim: "Sufi-Rock Fusion Band." */
  tagline: "Sufi-Rock Fusion Band",
  location: "Delhi NCR",
  /** From the band's showreel descriptions: "Live Music | Rock | Bollywood | Sufi | Commercial" */
  genres: ["Rock", "Bollywood", "Sufi", "Commercial"],
  /** From the band's showreel descriptions. */
  showTypes: ["Concerts", "Weddings", "Corporate events", "Private parties", "Premium venues"],

  contact: {
    /** Publicly listed in the band's YouTube video descriptions. */
    email: "softrocklive@gmail.com",
    phoneDisplay: "+91 95482 60625",
    phoneHref: "tel:+919548260625",
  },

  social: {
    youtube: {
      label: "YouTube",
      handle: "@softrockband",
      url: "https://www.youtube.com/@softrockband",
      channelId: "UCBFaQ0K3Itpkk6cG96D0Wew",
    },
    instagram: {
      label: "Instagram",
      handle: "@softrock_band",
      url: "https://www.instagram.com/softrock_band/",
    },
  },

  logo: {
    src: "/images/brand/softrock-logo.png",
    width: 777,
    height: 587,
    alt: "Softrock Band logo",
  },
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "The Band", href: "/band" },
  { label: "Music", href: "/music" },
  { label: "Live Shows", href: "/live-shows" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const bookingHref = "/contact#booking";
