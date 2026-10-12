"use client";

import Image from "next/image";
import { useState } from "react";
import type { DocumentedPerformance } from "@/data/events";
import { getVideo, type Video } from "@/data/videos";
import { PlayBadge } from "@/components/media/YouTubePlayer";
import { VideoModal } from "@/components/media/VideoModal";

/** Stacked cards for performances documented on the band's YouTube channel. */
export function DocumentedPerformances({ items }: { items: DocumentedPerformance[] }) {
  const [active, setActive] = useState<Video | null>(null);

  return (
    <>
      <ol className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => {
          const video = getVideo(item.videoId);
          return (
            <li key={item.videoId}>
              <button
                type="button"
                onClick={() => video && setActive(video)}
                className="group relative block aspect-[4/3] w-full overflow-hidden bg-ink-3 text-left"
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-cinema)] group-hover:scale-[1.05]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <PlayBadge size="sm" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <span>
                    <span className="block font-sans text-xs tabular-nums tracking-[0.2em] text-gold">0{i + 1}</span>
                    <span className="display mt-2 block text-3xl sm:text-4xl">{item.title}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.22em] text-ash">{item.detail}</span>
                  </span>
                </span>
                <span className="sr-only">: play video</span>
              </button>
            </li>
          );
        })}
      </ol>
      <VideoModal video={active} onClose={() => setActive(null)} />
    </>
  );
}
