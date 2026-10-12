import type { Metadata } from "next";
import { galleryPhotos, photos } from "@/data/gallery";
import { siteConfig } from "@/data/site";
import { PageHero } from "@/components/sections/PageHero";
import { PerformanceGallery } from "@/components/sections/PerformanceGallery";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of Softrock on stage, at soundcheck and with the crowd, from weddings to Bairagi Sufi sessions.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        compact
        eyebrow="Gallery"
        title={
          <>
            The moments between the <span className="accent">notes.</span>
          </>
        }
        intro="On stage, in the crowd and behind the scenes. Tap any photo to view it larger."
        image={photos.studioXo2}
      />

      <section aria-label="Photo gallery" className="py-16 sm:py-24">
        <div className="container-x">
          <PerformanceGallery photos={galleryPhotos} columns={3} />
        </div>
      </section>

      <section aria-labelledby="ig-title" className="pb-24 sm:pb-32">
        <Reveal className="container-x">
          <div className="flex flex-col items-center gap-6 border border-line bg-ink-2 px-6 py-16 text-center">
            <InstagramIcon className="h-9 w-9 text-gold" />
            <h2 id="ig-title" className="display text-[clamp(2.2rem,5vw,4rem)]">
              Follow the <span className="accent">journey</span>
            </h2>
            <p className="max-w-md text-ash">Rehearsals, reels and nights on the road, posted first on Instagram.</p>
            <ButtonLink href={siteConfig.social.instagram.url}>Follow {siteConfig.social.instagram.handle}</ButtonLink>
          </div>
        </Reveal>
      </section>

      <BookingCTA />
    </>
  );
}
