"use client";

import { X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { type Video, youtubeWatchUrl } from "@/data/videos";
import { cn } from "@/lib/utils";
import { YouTubePlayer } from "./YouTubePlayer";

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

/** Accessible modal player built on the native <dialog> element. */
export function VideoModal({ video, onClose }: VideoModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (video && !dialog.open) dialog.showModal();
    if (!video && dialog.open) dialog.close();
  }, [video]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label={video ? `Video: ${video.title}` : "Video player"}
      className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 text-bone backdrop:bg-transparent"
    >
      {video && (
        <div
          className={cn(
            "relative mx-auto",
            video.format === "short" ? "w-[min(88vw,calc(78svh*9/16))]" : "w-[min(92vw,calc(78svh*16/9),1280px)]",
          )}
        >
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">Now playing</p>
              <p className="display text-2xl sm:text-3xl">{video.title}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-bone/30 transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close video</span>
            </button>
          </div>
          <YouTubePlayer key={video.id} video={video} autoPlay />
          <a
            href={youtubeWatchUrl(video)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ash hover:text-gold"
          >
            Watch on YouTube <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      )}
    </dialog>
  );
}
