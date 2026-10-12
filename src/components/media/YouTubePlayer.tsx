"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";
import { type Video, youtubeThumb } from "@/data/videos";
import { cn } from "@/lib/utils";

interface YouTubePlayerProps {
  video: Pick<Video, "id" | "title" | "format" | "maxres">;
  /** Optional local poster to use instead of YouTube's thumbnail. */
  poster?: { src: string; alt: string };
  priority?: boolean;
  /** Start playing immediately (only use after a user gesture, e.g. inside a modal). */
  autoPlay?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Lightweight YouTube facade: only a poster image loads until the visitor
 * presses play, then the privacy-enhanced (youtube-nocookie) player is
 * swapped in and starts. Nothing ever autoplays with sound on page load.
 */
export function YouTubePlayer({ video, poster, priority, autoPlay = false, className, sizes = "100vw" }: YouTubePlayerProps) {
  const [active, setActive] = useState(autoPlay);
  const isShort = video.format === "short";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-ink-3",
        isShort ? "aspect-[9/16]" : "aspect-video",
        className,
      )}
    >
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={`${video.title}: Softrock on YouTube`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer text-left"
        >
          <span className="sr-only">Play video: {video.title}</span>
          <Image
            src={poster?.src ?? youtubeThumb(video)}
            alt={poster?.alt ?? ""}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-cinema)] group-hover:scale-[1.04]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/20" />
          <PlayBadge />
        </button>
      )}
    </div>
  );
}

export function PlayBadge({ size = "lg" }: { size?: "sm" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/40 bg-ink/40 text-bone backdrop-blur-md transition-all duration-500 ease-[var(--ease-cinema)] group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink",
        size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-14 w-14",
      )}
    >
      <Play className={cn("translate-x-[2px] fill-current", size === "lg" ? "h-7 w-7" : "h-5 w-5")} />
      {size === "lg" && (
        <span className="absolute inset-0 animate-ping rounded-full border border-bone/30 [animation-duration:2.6s]" />
      )}
    </span>
  );
}
