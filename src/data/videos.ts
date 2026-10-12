/**
 * Verified videos from youtube.com/@softrockband.
 *
 * This is a static, hand-maintained list. The site does NOT sync with YouTube.
 * To add a video, copy its ID from the URL (youtube.com/watch?v=<ID> or
 * youtube.com/shorts/<ID>) and add an entry below. Thumbnails load from YouTube's
 * image CDN automatically.
 *
 * `publishedAt` is the YouTube upload date, not necessarily the performance date.
 */

export type VideoCategory = "music-video" | "live" | "behind-the-scenes";
export type VideoFormat = "video" | "short";

export interface Video {
  id: string;
  /** Clean display title (hashtags removed). */
  title: string;
  /** Original YouTube title, kept for reference. */
  originalTitle: string;
  format: VideoFormat;
  category: VideoCategory;
  publishedAt: string;
  /** Duration in seconds, where known. */
  duration?: number;
  description?: string;
  /** Set to false if a video has no `maxresdefault` thumbnail (all current ones do). */
  maxres?: boolean;
}

export const videoCategories: Record<VideoCategory, string> = {
  "music-video": "Music Videos",
  live: "Live Performances",
  "behind-the-scenes": "Behind the Scenes",
};

export const videos: Video[] = [
  {
    id: "2Txv6byfx9o",
    title: "Andaz E Karam X Dillagi",
    originalTitle: "Andaz E Karam X Dillagi | Bairagi (A Sufi Project) By Softrock Band.",
    format: "video",
    category: "music-video",
    publishedAt: "2026-09-18",
    duration: 362,
    description:
      "Softrock's take on Andaz E Karam X Dillagi, a mashup from the Sufi project Bairagi. Traditional Sufi music meets the energy of a full rock band.",
  },
  {
    id: "5XO-AM4p7Kc",
    title: "Bairagi Live: Showreel",
    originalTitle: "Showreel | Bairagi Live ( A Sufi Project) | By SoftRock Band | 2026",
    format: "video",
    category: "live",
    publishedAt: "2026-09-15",
    duration: 36,
    description:
      "The energy of Bairagi live on stage: powerful vocals, Sufi music, electric guitars, grooving bass, keyboards and hard-hitting drums.",
  },
  {
    id: "JvdD9eNfiSk",
    title: "Dhol Sessions",
    originalTitle: "Dhol Sessions | Softrock Band | 2026",
    format: "video",
    category: "live",
    publishedAt: "2026-09-10",
    duration: 140,
    description: "Softrock Band live performance, from rock and Bollywood to Sufi and commercial hits.",
  },
  {
    id: "8pSPAa2Zj54",
    title: "Wedding Diaries: Raw 2024",
    originalTitle: "Wedding Dairies | SoftRock Band | Raw 2024",
    format: "video",
    category: "live",
    publishedAt: "2026-09-05",
    duration: 242,
    description: "Raw footage of the full band on stage at a wedding performance.",
  },
  {
    id: "QY0_X81BeNg",
    title: "Live Rocking Sessions: Private Events 2024",
    originalTitle: "Live Rocking Sessions | SoftRock Band | Private Events | 2024.",
    format: "video",
    category: "live",
    publishedAt: "2026-09-06",
    duration: 74,
    description: "Highlights from Softrock's private event performances.",
  },
  {
    id: "4A9ZzpMCDoU",
    title: "Dil Mein Bazi Guitar: Soundcheck",
    originalTitle: "Dil mein Bazi Guitar | Soundchecks | SoftRock Band",
    format: "video",
    category: "behind-the-scenes",
    publishedAt: "2026-09-08",
    duration: 73,
    description: "A live show soundcheck with singer Sushil.",
  },

  // ── Shorts ─────────────────────────────────────────────
  {
    id: "pG_VfHe16ts",
    title: "Tumhe Dillagi Bhool Jani Padegi",
    originalTitle: "Tumhe dillagi bhool jani padegi ❤️ | Sufi music #shorts #nusratfatehalikhan #dillagi #qawwali",
    format: "short",
    category: "music-video",
    publishedAt: "2026-10-03",
  },
  {
    id: "HTyDq8TxYRM",
    title: "Andaz E Karam · Bairagi Project",
    originalTitle: "Andaz E Karam | Bairagi Project | SoftRock Band. #sufimusic  #madhursharma #nusratfatehalikhan",
    format: "short",
    category: "music-video",
    publishedAt: "2026-10-01",
  },
  {
    id: "BWpXqgyr8F4",
    title: "Sitaron Ki Mehfil",
    originalTitle: "Sitaron ki mehfil",
    format: "short",
    category: "live",
    publishedAt: "2026-09-16",
  },
  {
    id: "PTJRRIrGhgg",
    title: "Kesariya",
    originalTitle: "Kesariya✨",
    format: "short",
    category: "live",
    publishedAt: "2026-09-10",
  },
  {
    id: "wETp0P13ru4",
    title: "Yaa Ali",
    originalTitle: "Yaa Ali 🔥🎙️",
    format: "short",
    category: "live",
    publishedAt: "2026-09-10",
  },
  {
    id: "j_nybWc1HEE",
    title: "Leke Pehla Pehla Pyar × Mere Naseeb Mein",
    originalTitle: "Leke pehla pehla pyar x mere naseeb mein ✨🔥",
    format: "short",
    category: "live",
    publishedAt: "2026-08-30",
  },
  {
    id: "3zmfqcRo9ow",
    title: "Humein Tumse Pyar Kitna",
    originalTitle: "Humein tumse pyar kitna",
    format: "short",
    category: "live",
    publishedAt: "2026-09-16",
  },
  {
    id: "yQq6i9Beurw",
    title: "Silli Silli Hawa",
    originalTitle: "Silli silli hawa",
    format: "short",
    category: "live",
    publishedAt: "2026-09-14",
  },
  {
    id: "z_w88ci06qI",
    title: "Sanson Ki Mala",
    originalTitle: "Sanson ki mala #mirzapurthemovie #madhursharma",
    format: "short",
    category: "live",
    publishedAt: "2026-10-05",
  },
  {
    id: "yxuzXpOMcJ0",
    title: "Aaja Soniye",
    originalTitle: "Aaja soniye #sonunigam #dhol #live",
    format: "short",
    category: "live",
    publishedAt: "2026-10-06",
  },
  {
    id: "3rA5d7x_BNA",
    title: "Showreel: Live at Bareilly",
    originalTitle: "Showreel Softrock live at Bareilly",
    format: "short",
    category: "live",
    publishedAt: "2026-02-05",
  },
  {
    id: "DhOVxgLELaE",
    title: "Soundcheck: Dhol Session",
    originalTitle: "Soundcheck❤️ #liveband #softrockband #dholsession #punjabi",
    format: "short",
    category: "behind-the-scenes",
    publishedAt: "2026-02-05",
  },
];

export const featuredVideoId = "2Txv6byfx9o";

export const getVideo = (id: string) => videos.find((v) => v.id === id);
export const featuredVideo = getVideo(featuredVideoId)!;
export const longformVideos = videos.filter((v) => v.format === "video");
export const shortVideos = videos.filter((v) => v.format === "short");

export const youtubeThumb = (v: Pick<Video, "id" | "maxres">) =>
  `https://i.ytimg.com/vi/${v.id}/${v.maxres === false ? "hqdefault" : "maxresdefault"}.jpg`;

export const youtubeWatchUrl = (v: Pick<Video, "id" | "format">) =>
  v.format === "short" ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;

export const formatDuration = (s?: number) =>
  s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : undefined;
