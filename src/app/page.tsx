import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { getVideo, type Video } from "@/data/videos";
import { galleryPreview } from "@/data/gallery";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedPerformance } from "@/components/sections/FeaturedPerformance";
import { BandIntroduction } from "@/components/sections/BandIntroduction";
import { MusicVideoGrid } from "@/components/sections/MusicVideoGrid";
import { LiveShowsSection } from "@/components/sections/LiveShowsSection";
import { PerformanceGallery } from "@/components/sections/PerformanceGallery";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Re-render daily so upcoming shows drop off automatically once their date passes.
export const revalidate = 86400;

/** Homepage music showcase: lead video, a tall Short, then a supporting pair. */
const homepageVideos = ["8pSPAa2Zj54", "pG_VfHe16ts", "JvdD9eNfiSk", "QY0_X81BeNg"].map((id) => getVideo(id)).filter(Boolean) as Video[];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedPerformance />
      <BandIntroduction />

      <section aria-labelledby="music-title" className="py-24 sm:py-32">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Music & videos"
              title={
                <span id="music-title">
                  Turn it <span className="accent">up.</span>
                </span>
              }
              intro="Live sets, Sufi sessions and raw footage from the stage, straight from the official Softrock channel."
            />
            <Reveal className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonLink href="/music" variant="ghost">
                All videos
              </ButtonLink>
              <ButtonLink href={siteConfig.social.youtube.url} variant="text" className="sm:px-4">
                Subscribe on YouTube
              </ButtonLink>
            </Reveal>
          </div>
          <MusicVideoGrid videos={homepageVideos} layout="editorial" />
        </div>
      </section>

      <div className="border-t border-line bg-ink-2">
        <LiveShowsSection />
      </div>

      <section aria-labelledby="gallery-title" className="py-24 sm:py-32">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Gallery"
              title={
                <span id="gallery-title">
                  The moments between the <span className="accent">notes.</span>
                </span>
              }
            />
            <Reveal className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonLink href="/gallery" variant="ghost">
                Full gallery
              </ButtonLink>
            </Reveal>
          </div>
          <PerformanceGallery photos={galleryPreview} layout="mosaic" />
          <Reveal className="mt-14 flex flex-col items-center gap-4 border-t border-line pt-14 text-center">
            <p className="font-serif text-2xl italic text-bone/90 sm:text-3xl">More from the road, the stage and the soundcheck.</p>
            <ButtonLink href={siteConfig.social.instagram.url}>Follow the journey on Instagram</ButtonLink>
            <p className="text-xs tracking-[0.2em] text-smoke">{siteConfig.social.instagram.handle}</p>
          </Reveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
