/**
 * Photography.
 *
 * Two kinds of image live here:
 * - Official Softrock photographs supplied by the band (no `sourceVideoId`).
 *   Originals were resized and converted to WebP; the raw files are kept out
 *   of the build in /photo-originals (git-ignored).
 * - Still frames from Softrock's own official YouTube uploads (source video
 *   recorded in `sourceVideoId`).
 *
 * TO ADD OR REPLACE A PHOTO: drop a WebP in /public/images/photos, then add or
 * update its entry below. Keep `width`/`height` accurate so the layout
 * reserves the right space.
 */

export type PhotoCategory = "live" | "portrait" | "crowd" | "backstage";

export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: PhotoCategory;
  /** YouTube video the frame was taken from, for stills from official uploads. */
  sourceVideoId?: string;
  /** True when the image is confirmed official Softrock content. */
  official: boolean;
  /** Optional caption shown in the lightbox. */
  caption?: string;
}

type Dims = { width: number; height: number };
/** Band photographs: 3:2 landscape and 2:3 portrait. */
const WIDE: Dims = { width: 2400, height: 1600 };
const TALL: Dims = { width: 1333, height: 2000 };
/** YouTube frames. */
const L: Dims = { width: 1280, height: 720 }; // landscape frame
const P: Dims = { width: 404, height: 720 }; // vertical (Shorts) frame
/** Bairagi session frames: cinemascope letterbox bars cropped away. */
const SCOPE: Dims = { width: 1280, height: 544 };

const photo = (
  id: string,
  dims: Dims,
  category: PhotoCategory,
  alt: string,
  caption?: string,
  sourceVideoId?: string,
): Photo => ({ id, src: `/images/photos/${id}.webp`, ...dims, category, sourceVideoId, official: true, alt, caption });

export const photos = {
  /* Band photographs */
  stageSoftrockLogo: photo("stage-softrock-logo", WIDE, "live",
    "The full Softrock line-up on stage beneath a giant LED screen showing the Softrock Band logo, with purple spotlights overhead.",
    "The full line-up, live"),
  stageRoundBand: photo("stage-round-band", WIDE, "live",
    "Softrock playing on a round stage behind red velvet ropes, the vocalist's arms raised between the bassist, keyboardist and guitarist.",
    "Live on stage"),
  stageWhiteSuit: photo("stage-white-suit", TALL, "live",
    "Softrock's vocalist in a white suit on a large stage, a giant LED screen and drum kit behind and a light beam cutting across.",
    "Live on stage"),
  bandPortraitWhite: photo("band-portrait-white", WIDE, "portrait",
    "The five members of Softrock in white suits, posing together around a table in an outdoor garden venue.",
    "The band"),
  bandPortraitSuits: photo("band-portrait-suits", WIDE, "portrait",
    "The five members of Softrock standing side by side in suits and sunglasses, the vocalist in the centre in white.",
    "The band"),
  bairagiStageVocals: photo("bairagi-stage-vocals", TALL, "live",
    "Softrock's vocalist in a black embroidered kurta singing in front of a blue LED screen reading Bairagi, A Sufi Project.",
    "Bairagi · A Sufi Project"),
  sufiSetWide: photo("sufi-set-wide", { width: 2400, height: 1349 }, "live",
    "Softrock's vocalist seated on a low stage in an embroidered velvet jacket, singing against a glittering LED backdrop.",
    "Sufi set"),
  sufiSet1: photo("sufi-set-1", { width: 1500, height: 2000 }, "live",
    "Softrock's vocalist seated mid-song, arms open, with a guitarist playing behind.",
    "Sufi set"),
  sufiSet2: photo("sufi-set-2", TALL, "live",
    "Softrock's vocalist seated, eyes closed and hand raised, singing into the microphone in an embroidered velvet jacket.",
    "Sufi set"),
  sufiSet3: photo("sufi-set-3", TALL, "live",
    "Softrock's vocalist seated and singing with an outstretched hand, the keyboardist behind.",
    "Sufi set"),
  vocalsNeon: photo("vocals-neon", TALL, "live",
    "Softrock's vocalist in a sequinned shirt singing at the microphone under neon stage visuals.",
    "Live on stage"),
  vocalsVelvet: photo("vocals-velvet", TALL, "live",
    "Softrock's vocalist in a maroon velvet jacket singing in a hotel ballroom.",
    "Live on stage"),
  vocalsStripes1: photo("vocals-stripes-1", TALL, "live",
    "Softrock's vocalist in a striped blazer singing with one hand raised, the drum kit beside.",
    "Live on stage"),
  vocalsStripes2: photo("vocals-stripes-2", TALL, "live",
    "Softrock's vocalist in a striped blazer singing in front of a bright stage screen.",
    "Live on stage"),
  vocalsMono: photo("vocals-mono", TALL, "live",
    "Black-and-white shot of Softrock's vocalist singing mid-stride in front of the drum kit and a photo-collage screen.",
    "Live on stage"),
  bass1: photo("bass-1", TALL, "live",
    "Softrock's bassist in sunglasses playing a five-string bass on a dark stage.", "Live on stage"),
  bass2: photo("bass-2", TALL, "live",
    "Softrock's bassist playing under a warm stage light.", "Live on stage"),
  drumsStage: photo("drums-stage", TALL, "live",
    "Softrock's drummer in a suit and sunglasses behind a Pearl kit, the Softrock logo screen behind.",
    "Live on stage"),
  drumsCloseup: photo("drums-closeup", { width: 1138, height: 843 }, "live",
    "Softrock's drummer mid-groove behind a sparkle-finish kit, warm bokeh lights behind.", "Live on stage"),
  studioXo1: photo("studio-xo-1", WIDE, "live",
    "Black-and-white shot of Softrock performing on the Studio XO club stage.", "Studio XO"),
  studioXo2: photo("studio-xo-2", WIDE, "live",
    "Black-and-white wide shot of the full Softrock line-up on the Studio XO stage.", "Studio XO"),
  crowdWeddingFront: photo("crowd-wedding-front", { width: 1123, height: 2000 }, "crowd",
    "Softrock's vocalist leaning down from a flower-lined stage to sing with wedding guests at night.",
    "Up close with the guests"),
  crowdChandelier: photo("crowd-chandelier", { width: 1121, height: 2000 }, "crowd",
    "Softrock's vocalist seen from behind, facing guests dancing with their arms up beneath a crystal chandelier.",
    "The crowd"),
  soundcheckOpenAir: photo("soundcheck-open-air", { width: 1124, height: 2000 }, "backstage",
    "Softrock's open-air stage and lighting truss set up in daylight, with an LED dance floor in front.",
    "Soundcheck"),
  soundcheckDrums: photo("soundcheck-drums", { width: 1125, height: 2000 }, "backstage",
    "Softrock's drummer at the kit during a daytime soundcheck, red drapes behind.", "Soundcheck"),

  /* Frames from official YouTube uploads */
  bairagiHeritage3: photo("bairagi-heritage-3", SCOPE, "live",
    "Softrock's vocalist with eyes closed, lost in the song, with electric guitarists behind.",
    "Andaz E Karam X Dillagi · Bairagi", "2Txv6byfx9o"),
  crowdDance2: photo("crowd-dance-2", L, "crowd",
    "A packed, joyful crowd singing along at a Bairagi Live show.", "Bairagi Live", "5XO-AM4p7Kc"),
  bairagiNightStage: photo("bairagi-night-stage", { width: 1242, height: 720 }, "live",
    "Softrock's vocalist seen from behind, facing a warmly lit night-time audience under chandeliers.", "Bairagi Live",
    "5XO-AM4p7Kc"),
  dholSessionStage: photo("dhol-session-stage", L, "backstage",
    "Softrock rehearsing on a large outdoor truss stage in daylight.", "Dhol Sessions", "JvdD9eNfiSk"),
  portraitVocals1: photo("portrait-vocals-1", P, "portrait",
    "Close-up portrait of Softrock's vocalist laughing at the microphone.", "Tumhe Dillagi · Bairagi", "pG_VfHe16ts"),
  portraitVocals2: photo("portrait-vocals-2", P, "portrait",
    "Softrock's vocalist in an embroidered shawl, hand on heart, smiling.", "Tumhe Dillagi · Bairagi", "pG_VfHe16ts"),
  portraitHeritageArch: photo("portrait-heritage-arch", P, "portrait",
    "Softrock's vocalist performing beneath a heritage archway, a guitarist behind.", "Andaz E Karam · Bairagi",
    "HTyDq8TxYRM"),
  portraitStripes: photo("portrait-stripes", P, "live",
    "Softrock's vocalist in a striped blazer singing in front of the Softrock logo screen.", "Kesariya", "PTJRRIrGhgg"),
  portraitNightCrowd: photo("portrait-night-crowd", P, "crowd",
    "An open-air crowd dancing at night in front of the stage.", "Sitaron Ki Mehfil", "BWpXqgyr8F4"),
} satisfies Record<string, Photo>;

/** Background-only imagery (not shown in the gallery). */
export const atmosphere = {
  /** Heavily blurred frame from the Bairagi Live showreel (5XO-AM4p7Kc), used behind the booking call-to-action. */
  nightBokeh: { src: "/images/photos/backdrop-night-bokeh.webp", width: 1600, height: 928, sourceVideoId: "5XO-AM4p7Kc" },
} as const;

/** Curated order for the gallery. Mixes formats for an editorial rhythm. */
export const galleryPhotos: Photo[] = [
  photos.stageSoftrockLogo,
  photos.sufiSet2,
  photos.crowdChandelier,
  photos.bandPortraitWhite,
  photos.bass1,
  photos.bairagiStageVocals,
  photos.stageRoundBand,
  photos.vocalsStripes1,
  photos.drumsStage,
  photos.studioXo2,
  photos.crowdWeddingFront,
  photos.vocalsNeon,
  photos.sufiSetWide,
  photos.stageWhiteSuit,
  photos.portraitVocals2,
  photos.bandPortraitSuits,
  photos.vocalsMono,
  photos.soundcheckOpenAir,
  photos.drumsCloseup,
  photos.sufiSet1,
  photos.vocalsVelvet,
  photos.crowdDance2,
  photos.vocalsStripes2,
  photos.studioXo1,
  photos.sufiSet3,
  photos.soundcheckDrums,
  photos.bairagiNightStage,
  photos.portraitStripes,
  photos.bairagiHeritage3,
  photos.portraitNightCrowd,
  photos.dholSessionStage,
  photos.portraitHeritageArch,
];

/** Homepage mosaic: 7 photos ordered tall, wide, tall, wide, wide, square, square. */
export const galleryPreview: Photo[] = [
  photos.bairagiStageVocals,
  photos.bandPortraitWhite,
  photos.bass1,
  photos.sufiSetWide,
  photos.bandPortraitSuits,
  photos.vocalsVelvet,
  photos.crowdWeddingFront,
];

export const photoCategoryLabels: Record<PhotoCategory, string> = {
  live: "On Stage",
  portrait: "Portraits",
  crowd: "The Crowd",
  backstage: "Soundcheck & Backstage",
};
