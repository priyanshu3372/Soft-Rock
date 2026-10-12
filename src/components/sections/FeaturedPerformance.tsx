import { ArrowUpRight } from "lucide-react";
import { featuredVideo, formatDuration, youtubeWatchUrl } from "@/data/videos";
import { photos } from "@/data/gallery";
import { performanceCredits } from "@/data/band";
import { YouTubePlayer } from "@/components/media/YouTubePlayer";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

export function FeaturedPerformance() {
  const v = featuredVideo;
  const poster = photos.bairagiHeritage3;
  const credits = performanceCredits.musicians.slice(0, 5);

  return (
    <section id="featured" aria-labelledby="featured-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-5">Featured performance · Bairagi</p>
            <h2 id="featured-title" className="display text-[clamp(2.6rem,7vw,6.25rem)]">
              Andaz E Karam <span className="accent">×</span> Dillagi
            </h2>
          </div>
          <dl className="flex gap-10 text-xs uppercase tracking-[0.22em]">
            <div>
              <dt className="text-smoke">Project</dt>
              <dd className="mt-1 text-bone">Bairagi: A Sufi Project</dd>
            </div>
            {v.duration && (
              <div>
                <dt className="text-smoke">Runtime</dt>
                <dd className="mt-1 tabular-nums text-bone">{formatDuration(v.duration)}</dd>
              </div>
            )}
            <div className="hidden sm:block">
              <dt className="text-smoke">Released</dt>
              <dd className="mt-1 text-bone">
                <time dateTime={v.publishedAt}>{formatDate(v.publishedAt, { month: "long", year: "numeric" })}</time>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal y={40}>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-x-6 -inset-y-10 -z-10 bg-[radial-gradient(50%_60%_at_50%_50%,rgb(217_165_91/0.14),transparent_70%)]" />
            <YouTubePlayer video={v} poster={poster} sizes="(min-width:1408px) 1312px, 100vw" />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-lg leading-relaxed text-bone/85 sm:text-xl">{v.description}</p>
            <a
              href={youtubeWatchUrl(v)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold hover:text-bone"
            >
              Watch the original on YouTube <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="eyebrow mb-4 text-smoke">On this recording</p>
            <ul className="divide-y divide-line border-y border-line text-sm">
              {credits.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-bone">{c.name}</span>
                  <span className="text-right text-ash">{c.role}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
