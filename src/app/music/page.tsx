import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { featuredVideo, videos, youtubeWatchUrl } from "@/data/videos";
import { siteConfig } from "@/data/site";
import { photos } from "@/data/gallery";
import { PageHero } from "@/components/sections/PageHero";
import { MusicVideoGrid } from "@/components/sections/MusicVideoGrid";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { YouTubePlayer } from "@/components/media/YouTubePlayer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { YouTubeIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Music & Videos",
  description:
    "Watch Softrock's music videos, live performances and Bairagi Sufi sessions, including Andaz E Karam X Dillagi.",
  alternates: { canonical: "/music" },
};

export default function MusicPage() {
  const catalogue = videos.filter((v) => v.id !== featuredVideo.id);

  return (
    <>
      <PageHero
        compact
        eyebrow="Music & Videos"
        title={
          <>
            Turn it <span className="accent">up.</span>
          </>
        }
        intro="Live sets, Sufi sessions, soundchecks and raw footage from the official Softrock YouTube channel."
        image={photos.sufiSetWide}
      />

      <section aria-labelledby="featured-video-title" className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-4">Featured · Bairagi</p>
              <h2 id="featured-video-title" className="display text-[clamp(2.4rem,6vw,5rem)]">
                {featuredVideo.title}
              </h2>
            </div>
            <a
              href={youtubeWatchUrl(featuredVideo)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-bone"
            >
              Watch on YouTube <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
          <Reveal y={40}>
            <YouTubePlayer video={featuredVideo} poster={photos.bairagiHeritage3} sizes="(min-width:1408px) 1312px, 100vw" />
          </Reveal>
          <Reveal className="mt-6 max-w-2xl">
            <p className="leading-relaxed text-ash">{featuredVideo.description}</p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="catalogue-title" className="border-t border-line bg-ink-2 py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mb-10">
            <h2 id="catalogue-title" className="display text-[clamp(2.4rem,6vw,5rem)]">
              The <span className="accent">catalogue</span>
            </h2>
          </Reveal>
          <MusicVideoGrid videos={catalogue} filters />
          <Reveal className="mt-20 flex flex-col items-start gap-6 border border-line p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-center gap-5">
              <YouTubeIcon className="h-10 w-10 shrink-0 text-ember" />
              <div>
                <p className="text-lg font-semibold text-bone">New videos land on YouTube first.</p>
                <p className="text-sm text-ash">
                  Subscribe to {siteConfig.social.youtube.handle} to catch every release.
                </p>
              </div>
            </div>
            <ButtonLink href={siteConfig.social.youtube.url}>Visit the channel</ButtonLink>
          </Reveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
