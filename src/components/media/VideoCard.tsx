import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { type Video, formatDuration, videoCategories, youtubeThumb, youtubeWatchUrl } from "@/data/videos";
import { cn, formatDate } from "@/lib/utils";
import { PlayBadge } from "./YouTubePlayer";

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  className?: string;
  /** Aspect of the thumbnail frame. Shorts default to vertical. */
  frame?: "landscape" | "portrait";
  sizes?: string;
  showMeta?: boolean;
}

export function VideoCard({ video, onPlay, className, frame, sizes = "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw", showMeta = true }: VideoCardProps) {
  const shape = frame ?? (video.format === "short" ? "portrait" : "landscape");
  const duration = formatDuration(video.duration);

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <button
        type="button"
        onClick={() => onPlay(video)}
        className={cn(
          "relative block w-full overflow-hidden bg-ink-3 text-left",
          shape === "portrait" && "aspect-[9/16]",
          shape === "landscape" && "aspect-video",
        )}
      >
        <span className="sr-only">Play video: {video.title}</span>
        <Image
          src={youtubeThumb(video)}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-cinema)] group-hover:scale-[1.06]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
        <PlayBadge size="sm" />
        {duration && (
          <span className="absolute right-3 top-3 bg-ink/70 px-2 py-1 text-[0.68rem] font-medium tabular-nums tracking-wider text-bone backdrop-blur">
            {duration}
          </span>
        )}
        {video.format === "short" && (
          <span className="absolute left-3 top-3 border border-bone/30 bg-ink/50 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-bone backdrop-blur">
            Short
          </span>
        )}
      </button>

      {showMeta && (
        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.66rem] font-medium uppercase tracking-[0.24em] text-gold">
              {videoCategories[video.category]}
            </p>
            <h3 className="mt-2 font-sans text-lg font-semibold leading-snug text-bone">{video.title}</h3>
            <p className="mt-1 text-xs text-smoke">
              Published <time dateTime={video.publishedAt}>{formatDate(video.publishedAt)}</time>
            </p>
          </div>
          <a
            href={youtubeWatchUrl(video)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line text-ash transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Watch {video.title} on YouTube (opens in a new tab)</span>
          </a>
        </div>
      )}
    </article>
  );
}
