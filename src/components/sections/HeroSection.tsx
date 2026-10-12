import Image from "next/image";
import { bookingHref, siteConfig } from "@/data/site";
import { featuredVideo } from "@/data/videos";
import { photos } from "@/data/gallery";
import { ButtonLink } from "@/components/ui/Button";
import { Equalizer } from "@/components/ui/icons";

/**
 * Full-viewport opening. A real Softrock stage still with a slow push-in
 * (no background video, so nothing heavy downloads on mobile and nothing autoplays).
 */
export function HeroSection() {
  const hero = photos.stageSoftrockLogo;

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={60}
          className="kenburns object-cover object-[50%_40%]"
        />
        {/* Cinematic grade: deep vignette + floor fade for legible type */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,transparent_20%,rgb(8_8_7/0.85)_80%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/70 to-transparent" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-end pb-28 pt-32 sm:pb-32">
        <p className="eyebrow fade-in flex items-center gap-3" style={{ animationDelay: "0.2s" }}>
          <Equalizer className="h-3 w-3 text-ember" />
          {siteConfig.tagline} · {siteConfig.location}
        </p>

        <h1 id="hero-title" className="display mt-6 text-[clamp(3.4rem,13vw,11.5rem)]">
          <span className="rise block" style={{ animationDelay: "0.35s" }}>
            Feel the music.
          </span>
          <span className="rise block" style={{ animationDelay: "0.55s" }}>
            Live the <span className="accent pr-[0.08em] text-[1.08em] leading-none">moment.</span>
          </span>
        </h1>

        <div className="fade-in mt-8 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between" style={{ animationDelay: "0.9s" }}>
          <p className="max-w-md text-base leading-relaxed text-bone/80 sm:text-lg">
            Meet Softrock. Discover the sound, the performances, and the moments that bring people together.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/music">Explore the music</ButtonLink>
            <ButtonLink href={bookingHref} variant="ghost">
              Book Softrock
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="container-x absolute inset-x-0 bottom-0 flex items-end justify-between pb-6">
        <a href="#featured" className="group flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-ash hover:text-bone">
          <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-bone/15">
            <span className="scroll-cue absolute inset-0 bg-gold" />
          </span>
          Scroll
        </a>
        <a
          href="#featured"
          className="hidden items-center gap-3 text-right text-[0.65rem] uppercase tracking-[0.26em] text-ash transition-colors hover:text-bone sm:flex"
        >
          <span>
            <span className="block text-smoke">Featured release</span>
            <span className="text-bone">{featuredVideo.title}</span>
          </span>
        </a>
      </div>
    </section>
  );
}
