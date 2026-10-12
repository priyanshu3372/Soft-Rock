import type { Metadata } from "next";
import Image from "next/image";
import { CalendarClock } from "lucide-react";
import { liveExperience } from "@/data/band";
import { siteConfig } from "@/data/site";
import { photos } from "@/data/gallery";
import { documentedPerformances, getUpcomingShows } from "@/data/events";
import { PageHero } from "@/components/sections/PageHero";
import { UpcomingShowsList } from "@/components/sections/UpcomingShows";
import { DocumentedPerformances } from "@/components/sections/DocumentedPerformances";
import { BookingForm } from "@/components/forms/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Live Shows",
  description:
    "Book Softrock for weddings, corporate events, private parties, concerts and premium venues across Delhi NCR and beyond.",
  alternates: { canonical: "/live-shows" },
};

// Re-render daily so past dates drop off the upcoming list automatically.
export const revalidate = 86400;

export default function LiveShowsPage() {
  const upcoming = getUpcomingShows();

  return (
    <>
      <PageHero
        eyebrow="Live Shows"
        title={
          <>
            Where the <span className="accent">magic</span> happens.
          </>
        }
        intro="Sufi soul, Bollywood singalongs and rock energy, played live by a full band. This is what Softrock brings to your night."
        image={photos.crowdDance2}
      >
        <ButtonLink href="#enquire">Bring Softrock to your event</ButtonLink>
      </PageHero>

      {/* Upcoming */}
      <section aria-labelledby="upcoming-title" className="py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <h2 id="upcoming-title" className="eyebrow mb-8">
              Upcoming shows
            </h2>
          </Reveal>
          {upcoming.length > 0 ? (
            <UpcomingShowsList shows={upcoming} />
          ) : (
            <Reveal className="flex flex-col gap-6 border border-line bg-ink-2 p-8 sm:flex-row sm:items-center sm:p-10">
              <CalendarClock className="h-10 w-10 shrink-0 text-gold" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-serif text-2xl leading-snug text-bone sm:text-3xl">No public dates are listed right now.</p>
                <p className="mt-2 text-ash">
                  Most Softrock nights are private: weddings, corporate evenings and celebrations. Follow{" "}
                  <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="text-bone underline underline-offset-4 hover:text-gold">
                    {siteConfig.social.instagram.handle}
                  </a>{" "}
                  for announcements.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* The experience */}
      <section aria-labelledby="experience-title" className="border-t border-line py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The live experience"
              title={
                <span id="experience-title">
                  Built for <span className="accent">the room.</span>
                </span>
              }
              intro="A high-energy live show designed for concerts, weddings, corporate events, private parties and premium venues."
            />
            <Reveal delay={0.1}>
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Event types">
                {siteConfig.showTypes.map((t) => (
                  <li key={t} className="border border-line px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-bone/80">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="space-y-10 lg:col-span-6 lg:col-start-7">
            {liveExperience.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6">
                <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-gold">0{i + 1}</span>
                <div>
                  <h3 className="display text-3xl sm:text-4xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ash">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo band */}
      <section aria-label="Live photographs" className="grid grid-cols-2 gap-1 sm:grid-cols-4">
        {[photos.stageWhiteSuit, photos.crowdChandelier, photos.vocalsMono, photos.vocalsNeon].map((p) => (
          <div key={p.id} className="relative aspect-square overflow-hidden">
            <Image src={p.src} alt={p.alt} fill sizes="(min-width:640px) 25vw, 50vw" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
          </div>
        ))}
      </section>

      {/* Documented performances */}
      <section aria-labelledby="past-title" className="py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="From the stage"
            title={
              <span id="past-title">
                Recent <span className="accent">nights.</span>
              </span>
            }
            intro="Performances captured on the official Softrock channel. Tap any card to watch."
            className="mb-14"
          />
          <DocumentedPerformances items={documentedPerformances} />
        </div>
      </section>

      {/* Booking form */}
      <section id="enquire" aria-labelledby="enquire-title" className="border-t border-line bg-ink-2 py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Booking enquiry"
              title={
                <span id="enquire-title">
                  Book <span className="accent">Softrock.</span>
                </span>
              }
              intro="Tell us about your event and the band will get back to you to talk dates, set and logistics."
            />
            <Reveal delay={0.1} className="mt-10 space-y-2 text-sm text-ash">
              <p>Prefer to talk directly?</p>
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-bone underline underline-offset-4 hover:text-gold">
                  {siteConfig.contact.email}
                </a>
              </p>
              <p>
                <a href={siteConfig.contact.phoneHref} className="text-bone underline underline-offset-4 hover:text-gold">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
