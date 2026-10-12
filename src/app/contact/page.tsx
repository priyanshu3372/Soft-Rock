import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { photos } from "@/data/gallery";
import { PageHero } from "@/components/sections/PageHero";
import { BookingForm } from "@/components/forms/BookingForm";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact & Booking",
  description: "Book Softrock for your wedding, corporate event, festival or private celebration. Send a booking enquiry.",
  alternates: { canonical: "/contact" },
};

const tips = ["The occasion and the mood you want", "Date, city and venue", "Approximate guest count", "Set timings, if you know them"];

export default function ContactPage() {
  const { contact, social } = siteConfig;

  return (
    <>
      <PageHero
        compact
        eyebrow="Contact & Booking"
        title={
          <>
            Let&apos;s make something <span className="accent">unforgettable.</span>
          </>
        }
        intro="Weddings, corporate evenings, college fests, festivals and private celebrations. Tell us about yours."
        image={photos.stageRoundBand}
        focus="50% 45%"
      />

      <section id="booking" aria-labelledby="booking-title" className="py-20 sm:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4" aria-label="Direct contact">
            <Reveal>
              <h2 id="booking-title" className="display text-[clamp(2.4rem,5vw,4rem)]">
                Booking <span className="accent">enquiry</span>
              </h2>
              <p className="mt-6 leading-relaxed text-ash">
                Fill in the form and the band will reply to talk dates, set and logistics. Or reach out directly:
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-10 divide-y divide-line border-y border-line">
                <li>
                  <a href={`mailto:${contact.email}`} className="group flex min-h-16 items-center gap-4 py-4">
                    <Mail className="h-5 w-5 text-gold" aria-hidden="true" />
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-smoke">Email</span>
                      <span className="text-bone group-hover:text-gold">{contact.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={contact.phoneHref} className="group flex min-h-16 items-center gap-4 py-4">
                    <Phone className="h-5 w-5 text-gold" aria-hidden="true" />
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-smoke">Phone</span>
                      <span className="text-bone group-hover:text-gold">{contact.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
                <li className="flex min-h-16 items-center gap-4 py-4">
                  <MapPin className="h-5 w-5 text-gold" aria-hidden="true" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.2em] text-smoke">Based in</span>
                    <span className="text-bone">{siteConfig.location}</span>
                  </span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <p className="eyebrow mb-4 text-smoke">Helpful to include</p>
              <ul className="space-y-2 text-sm text-ash">
                {tips.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex gap-3">
              <a
                href={social.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-line px-4 text-sm text-bone hover:border-gold hover:text-gold"
              >
                <YouTubeIcon className="h-5 w-5" /> YouTube<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href={social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 border border-line px-4 text-sm text-bone hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="h-5 w-5" /> Instagram<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Reveal>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
