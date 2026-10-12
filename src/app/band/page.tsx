import type { Metadata } from "next";
import Image from "next/image";
import { bairagi, bandIntro, performanceCredits } from "@/data/band";
import { siteConfig } from "@/data/site";
import { photos } from "@/data/gallery";
import { PageHero } from "@/components/sections/PageHero";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Band",
  description:
    "Meet Softrock, a Sufi-rock fusion band from Delhi NCR, and Bairagi, the band's Sufi project. Rock, Bollywood, Sufi and commercial hits, live.",
  alternates: { canonical: "/band" },
};

export default function BandPage() {
  return (
    <>
      <PageHero
        eyebrow="The Band"
        title={
          <>
            Sufi soul. <span className="accent">Rock</span> heart.
          </>
        }
        intro={bandIntro.lead}
        image={photos.bandPortraitSuits}
        focus="50% 30%"
      />

      {/* Introduction */}
      <section aria-labelledby="identity-title" className="py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Musical identity"
              title={
                <span id="identity-title">
                  One stage. <br />
                  Four <span className="accent">moods.</span>
                </span>
              }
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              {bandIntro.body.map((p) => (
                <p key={p.slice(0, 24)} className="mb-6 text-lg leading-relaxed text-bone/85">
                  {p}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="mt-10 grid grid-cols-2 gap-px bg-line">
                {siteConfig.genres.map((g, i) => (
                  <div key={g} className="bg-ink p-6">
                    <dt className="font-sans text-xs tabular-nums tracking-[0.2em] text-gold">0{i + 1}</dt>
                    <dd className="display mt-3 text-3xl sm:text-4xl">{g}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Group photograph */}
      <section aria-label="Softrock on stage">
        <Reveal y={40} as="figure" className="relative">
          <div className="relative aspect-[4/3] sm:aspect-[16/9]">
            <Image
              src={photos.bandPortraitWhite.src}
              alt={photos.bandPortraitWhite.alt}
              fill
              sizes="100vw"
              className="object-cover object-[50%_30%]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
          </div>
          <figcaption className="container-x -mt-14 relative flex justify-between text-xs uppercase tracking-[0.24em] text-ash">
            <span>The full line-up</span>
          </figcaption>
        </Reveal>
      </section>

      {/* Bairagi */}
      <section aria-labelledby="bairagi-title" className="relative overflow-hidden py-24 sm:py-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_75%_40%,rgb(217_165_91/0.12),transparent_70%)]"
        />
        <div className="container-x grid items-center gap-16 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <p className="eyebrow mb-5">{bairagi.subtitle}</p>
              <h2 id="bairagi-title" className="accent text-[clamp(4.5rem,13vw,10rem)] leading-[0.85] text-gold-soft">
                {bairagi.name}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <blockquote className="mt-10 border-l-2 border-gold pl-6">
                <p className="font-serif text-2xl leading-snug text-bone sm:text-3xl">&ldquo;{bairagi.quote}&rdquo;</p>
                <footer className="mt-4 text-xs uppercase tracking-[0.22em] text-smoke">{bairagi.quoteSource}</footer>
              </blockquote>
              <p className="mt-8 max-w-xl leading-relaxed text-ash">{bairagi.body}</p>
              <ButtonLink href="/music" variant="text" className="mt-8">
                Watch Bairagi
              </ButtonLink>
            </Reveal>
          </div>
          <div className="order-1 grid grid-cols-5 gap-4 lg:order-2 lg:col-span-6">
            <Reveal className="col-span-3 self-end" y={50}>
              <Image
                src={photos.portraitHeritageArch.src}
                alt={photos.portraitHeritageArch.alt}
                width={photos.portraitHeritageArch.width}
                height={photos.portraitHeritageArch.height}
                sizes="(min-width:1024px) 30vw, 60vw"
                className="h-auto w-full"
              />
            </Reveal>
            <Reveal className="col-span-2 mb-16" delay={0.15} y={70}>
              <Image
                src={photos.portraitVocals1.src}
                alt={photos.portraitVocals1.alt}
                width={photos.portraitVocals1.width}
                height={photos.portraitVocals1.height}
                sizes="(min-width:1024px) 20vw, 40vw"
                className="h-auto w-full"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section aria-labelledby="credits-title" className="border-y border-line bg-ink-2 py-24 sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The musicians"
              title={
                <span id="credits-title">
                  The people <span className="accent">behind</span> the sound.
                </span>
              }
              intro={
                <>
                  As credited on <em className="not-italic text-bone">{performanceCredits.source.label}</em>. Line-ups can
                  vary from show to show.
                </>
              }
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <ul className="divide-y divide-line border-y border-line">
                {performanceCredits.musicians.map((m) => (
                  <li key={m.name} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                    <span className="display text-3xl sm:text-4xl">{m.name}</span>
                    <span className="text-sm uppercase tracking-[0.18em] text-ash">{m.role}</span>
                  </li>
                ))}
              </ul>
              <p className="eyebrow mb-4 mt-12 text-smoke">Recording</p>
              <ul className="space-y-2 text-sm">
                {performanceCredits.production.map((p) => (
                  <li key={p.name} className="flex justify-between gap-4">
                    <span className="text-bone">{p.name}</span>
                    <span className="text-right text-ash">{p.role}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`https://www.youtube.com/watch?v=${performanceCredits.source.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-bone"
              >
                See full credits on YouTube ↗<span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section aria-label="Performance photographs" className="py-24 sm:py-32">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {[photos.vocalsStripes1, photos.bass2, photos.drumsStage, photos.sufiSet3].map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width:1024px) 25vw, 50vw" className="h-auto w-full" />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
            <p className="font-serif text-2xl italic text-bone/90 sm:text-3xl">Hear it for yourself.</p>
            <ButtonLink href="/music">Explore the music</ButtonLink>
          </Reveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
