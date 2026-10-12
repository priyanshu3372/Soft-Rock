import Image from "next/image";
import { liveExperience } from "@/data/band";
import { bookingHref, siteConfig } from "@/data/site";
import { photos } from "@/data/gallery";
import { getUpcomingShows } from "@/data/events";
import { formatList } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { UpcomingShowsList } from "./UpcomingShows";

export function LiveShowsSection() {
  const upcoming = getUpcomingShows();

  return (
    <section aria-labelledby="live-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Live"
          title={
            <span id="live-title">
              Where the <span className="accent">magic</span> happens.
            </span>
          }
          intro="From heritage courtyards to wedding stages and open-air rigs. This is what a Softrock night looks and sounds like."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          <Reveal className="relative aspect-[4/3] overflow-hidden lg:col-span-8 lg:row-span-2 lg:aspect-auto" y={40}>
            <Image
              src={photos.stageRoundBand.src}
              alt={photos.stageRoundBand.alt}
              fill
              sizes="(min-width:1024px) 66vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <p className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.24em] text-bone/80">
              {photos.stageRoundBand.caption}
            </p>
          </Reveal>
          <Reveal className="relative aspect-video overflow-hidden lg:col-span-4" delay={0.1}>
            <Image src={photos.crowdDance2.src} alt={photos.crowdDance2.alt} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal className="relative aspect-video overflow-hidden lg:col-span-4" delay={0.2}>
            <Image src={photos.studioXo1.src} alt={photos.studioXo1.alt} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {liveExperience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="border-t border-line pt-6">
              <p className="font-sans text-xs tabular-nums tracking-[0.2em] text-gold">0{i + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-bone">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ash">{item.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 flex flex-col gap-8 border border-line bg-ink-2 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          {upcoming.length > 0 ? (
            <div className="flex-1">
              <p className="eyebrow mb-6">Upcoming shows</p>
              <UpcomingShowsList shows={upcoming.slice(0, 3)} />
            </div>
          ) : (
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Upcoming shows</p>
              <p className="font-serif text-2xl leading-snug text-bone sm:text-3xl">
                No public dates are listed right now. Softrock plays {formatList(siteConfig.showTypes.slice(0, 4)).toLowerCase()} across {siteConfig.location} and beyond.
              </p>
              <p className="mt-3 text-sm text-ash">Want them at yours? The calendar is open for enquiries.</p>
            </div>
          )}
          <ButtonLink href={bookingHref} className="shrink-0">
            Bring Softrock to your event
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
