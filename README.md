# Softrock — Official Band Website

Official site for **SoftRock Band**, a Sufi-rock fusion band from Delhi NCR.
Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, React Hook Form and Zod.

Pages: Home · The Band · Music · Live Shows · Gallery · Contact & Booking.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

Copy `.env.example` to `.env.local` and fill in what you need (see below).

## Editing content (no code knowledge needed beyond editing text)

All band content lives in `src/data/`. Pages read from these files, so each fact is edited in one place.

| What | File |
| --- | --- |
| Band name, tagline, location, contact email/phone, social links, logo | `src/data/site.ts` |
| Band introduction, Bairagi project, credited musicians | `src/data/band.ts` |
| Videos (YouTube IDs, titles, categories, featured video) | `src/data/videos.ts` |
| Photos (gallery order, captions, alt text) | `src/data/gallery.ts` |
| Upcoming shows and documented performances | `src/data/events.ts` |

### Add a YouTube video
1. Copy the ID from the URL: `youtube.com/watch?v=`**`ID`** or `youtube.com/shorts/`**`ID`**.
2. Add an entry to `videos` in `src/data/videos.ts` (`format: "short"` for Shorts) with a clean `title`, a `category` and the `publishedAt` date.
3. To change the featured video, set `featuredVideoId`.

Thumbnails load from YouTube automatically. The site does **not** sync with YouTube; the list is curated by hand.

### Add an upcoming show
Add an object to `upcomingShows` in `src/data/events.ts` (the format is documented in that file). Shows appear on the homepage and the Live Shows page, and drop off automatically after their date (pages re-render daily). Only add confirmed dates and real ticket links.

### Replace or add photos
1. Put the image in `public/images/photos/` (WebP or JPG; around 1600px on the long edge is plenty).
2. Update or add the entry in `src/data/gallery.ts`, with correct `width`/`height` (prevents layout shift), descriptive `alt` text and a `caption`.
3. Reorder `galleryPhotos` (Gallery page) or `galleryPreview` (homepage mosaic: exactly 7 photos, ordered tall, wide, tall, wide, wide, square, square).

Next.js converts and resizes images automatically (AVIF/WebP). If you overwrite a file with the same name locally, delete `.next/cache/images` to see the change immediately.

### Replace the logo
Overwrite `public/images/brand/softrock-logo.png` (transparent PNG) and update its `width`/`height` in `src/data/site.ts`. Favicons are `src/app/icon.png` and `src/app/apple-icon.png`; the social sharing image is `src/app/opengraph-image.jpg` (1200×630).

## Booking form

The form posts to `src/app/api/booking/route.ts`, which validates every field again on the server (the same Zod schema as the browser, `src/lib/validation.ts`) and then delivers the enquiry. **Configure at least one channel before going live:**

| Option | Environment variables |
| --- | --- |
| **Email via [Resend](https://resend.com)** | `RESEND_API_KEY`, `BOOKING_TO_EMAIL` (e.g. `softrocklive@gmail.com`), `BOOKING_FROM_EMAIL` (an address on a domain verified in Resend) |
| **Webhook** (Zapier, Make, Slack, Formspree, Google Apps Script…) | `BOOKING_WEBHOOK_URL`: receives a JSON POST with every field plus `subject` and `text` |

Both can be set at once; an enquiry counts as delivered if at least one channel accepts it. Email replies go straight to the visitor (`reply_to`).

How it behaves:
- **Delivered** → the visitor sees a success message.
- **Delivery failed** → an error with the band's direct email and phone. Nothing is faked.
- **No channel configured, production** → HTTP 503 and the same error with direct contacts. The server log explains what to set.
- **No channel configured, `npm run dev`** → development fallback: the enquiry is printed to the terminal and the success screen clearly says it was *not* sent.

Spam protection: hidden honeypot field, minimum fill time (3s), payload size cap, and a best-effort per-IP rate limit (5 per 10 minutes, in memory, so per server instance). Bots get a silent "success" and nothing is delivered.

## Deployment (Vercel)

1. Push the project to GitHub/GitLab and import it at vercel.com (framework: Next.js; no build settings needed).
2. Add the environment variables (booking delivery, and `NEXT_PUBLIC_SITE_URL` once you have a domain).
3. Deploy. Add the custom domain in Vercel → Domains, then set `NEXT_PUBLIC_SITE_URL=https://your-domain` and redeploy.

Site URL and indexing (`src/data/site.ts`):
- Canonical URLs, the sitemap and Open Graph links use `NEXT_PUBLIC_SITE_URL`, falling back to Vercel's production URL, then localhost.
- Search engines may index only Vercel **production** deployments (or any host with `NEXT_PUBLIC_SITE_URL` set). Previews and local builds send `noindex` and a disallow-all `robots.txt`.

Any Node host works too: `npm run build && npm run start`.

## Project structure

```
src/
  app/                 routes (page.tsx per page), api/booking, sitemap, robots, icons, OG image
  components/
    layout/            SiteHeader, MobileNavigation, SiteFooter, Logo
    sections/          HeroSection, FeaturedPerformance, BandIntroduction, MusicVideoGrid,
                       LiveShowsSection, PerformanceGallery, BookingCTA, PageHero, …
    media/             YouTubePlayer (click-to-play facade), VideoCard, VideoModal, PhotoLightbox
    forms/             BookingForm
    ui/                Button, Reveal (+ RevealObserver), SectionHeading, icons
  data/                all editable content (see above)
  lib/                 validation (Zod), booking delivery, utils
public/images/         photos/ and brand/
docs/ASSET-INVENTORY.md  where every image and video came from
```

## Implementation notes

- **Server Components by default.** Client components only where interaction needs them: header/menu, video players, gallery lightbox, form, and one scroll-reveal observer.
- **Video:** no YouTube scripts load until a visitor presses play; then the privacy-enhanced `youtube-nocookie.com` player starts. Nothing autoplays with sound.
- **Motion:** the hero headline is a CSS "focus pull" that is visible from the first paint. Scroll reveals use CSS plus a single IntersectionObserver. framer-motion is used only for the mobile menu and is lazy-loaded. All motion respects `prefers-reduced-motion`, and content stays visible without JavaScript.
- **Fonts:** Anton (display), Instrument Serif (accents), Inter (body) via `next/font`. Anton uses width-matched local fallbacks (in `globals.css`) so headlines don't re-wrap or shift when the font loads.
- **Accessibility:** semantic landmarks, skip link, one `h1` per page, visible focus states, labelled form fields with announced errors, keyboard-operable menu, dialogs and lightbox (arrow keys, Esc), WCAG AA contrast.
- **SEO:** per-page titles and descriptions, Open Graph/Twitter cards, sitemap, robots, and `MusicGroup` structured data limited to verified facts.

## Content policy

Only facts published by the band are used (see `docs/ASSET-INVENTORY.md`). There are no invented members, dates, venues, statistics or reviews. Sections with no verified data (for example upcoming shows) show an honest empty state with a booking invitation.
