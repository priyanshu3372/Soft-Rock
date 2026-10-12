import Image from "next/image";
import { bandIntro } from "@/data/band";
import { siteConfig } from "@/data/site";
import { photos } from "@/data/gallery";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function BandIntroduction() {
  const main = photos.sufiSet2;
  const inset = photos.drumsStage;

  return (
    <section aria-labelledby="about-title" className="relative overflow-hidden border-t border-line bg-ink-2 py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="relative lg:col-span-6" y={40}>
          <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
            <Image src={main.src} alt={main.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover object-[45%_50%]" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-2/60 to-transparent" />
          </div>
          <div className="absolute -bottom-10 right-4 w-[34%] max-w-[13rem] border-4 border-ink-2 shadow-2xl sm:-right-6 lg:-right-10">
            <Image src={inset.src} alt={inset.alt} width={inset.width} height={inset.height} sizes="13rem" className="h-auto w-full" />
          </div>
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow mb-5">{bandIntro.eyebrow}</p>
            <h2 id="about-title" className="display text-[clamp(2.6rem,6.5vw,5.75rem)]">
              More than music.
              <br />
              It&apos;s a <span className="accent">feeling.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-serif text-2xl leading-snug text-bone sm:text-[1.7rem]">{bandIntro.lead}</p>
            {bandIntro.body.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 leading-relaxed text-ash">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Repertoire">
              {siteConfig.genres.map((g) => (
                <li key={g} className="border border-line px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-bone/80">
                  {g}
                </li>
              ))}
            </ul>
            <ButtonLink href="/band" variant="text" className="mt-10">
              Get to know the band
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
