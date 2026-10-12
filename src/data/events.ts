/**
 * Live shows.
 *
 * UPCOMING: no upcoming dates were publicly listed when the site was built,
 * so this list is intentionally empty. The Live Shows page shows a booking
 * invitation instead of a schedule. Add confirmed shows here, e.g.:
 *
 *   {
 *     date: "2026-12-31",          // ISO date
 *     time: "8:00 PM",            // optional
 *     title: "New Year's Eve Live",
 *     venue: "Venue name",
 *     city: "New Delhi",
 *     ticketUrl: "https://...",    // optional, real ticketing link only
 *     note: "Private event",       // optional
 *   },
 *
 * Past shows whose date has passed are hidden from "Upcoming" automatically.
 */

export interface UpcomingShow {
  date: string;
  time?: string;
  title: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  note?: string;
}

export const upcomingShows: UpcomingShow[] = [];

/**
 * Performances documented on the band's YouTube channel. Only details stated
 * in the video titles are used (no invented venues or exact dates).
 */
export interface DocumentedPerformance {
  title: string;
  detail: string;
  videoId: string;
  image: string;
  imageAlt: string;
}

export const documentedPerformances: DocumentedPerformance[] = [
  {
    title: "Bairagi Live",
    detail: "A Sufi project · 2026",
    videoId: "5XO-AM4p7Kc",
    image: "/images/photos/bairagi-night-stage.webp",
    imageAlt: "Softrock's vocalist seen from behind, facing a warmly lit night-time audience under chandeliers.",
  },
  {
    title: "Wedding Diaries",
    detail: "Raw · 2024",
    videoId: "8pSPAa2Zj54",
    image: "/images/photos/crowd-wedding-front.webp",
    imageAlt: "Softrock's vocalist leaning down from a flower-lined stage to sing with wedding guests at night.",
  },
  {
    title: "Live Rocking Sessions",
    detail: "Private events · 2024",
    videoId: "QY0_X81BeNg",
    image: "/images/photos/stage-softrock-logo.webp",
    imageAlt: "The full Softrock line-up on stage beneath a giant LED screen showing the Softrock Band logo.",
  },
  {
    title: "Live at Bareilly",
    detail: "Showreel",
    videoId: "3rA5d7x_BNA",
    image: "/images/photos/drums-closeup.webp",
    imageAlt: "Softrock's drummer mid-groove behind a sparkle-finish kit.",
  },
];

export const getUpcomingShows = (now = new Date()) => {
  const today = now.toISOString().slice(0, 10);
  return upcomingShows.filter((s) => s.date >= today).sort((a, b) => a.date.localeCompare(b.date));
};
