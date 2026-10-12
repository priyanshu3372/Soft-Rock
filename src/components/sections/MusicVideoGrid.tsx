"use client";

import { useMemo, useState } from "react";
import { type Video, type VideoCategory, videoCategories } from "@/data/videos";
import { VideoCard } from "@/components/media/VideoCard";
import { VideoModal } from "@/components/media/VideoModal";
import { cn } from "@/lib/utils";

interface MusicVideoGridProps {
  videos: Video[];
  /** Show category filters (only categories with real content appear). */
  filters?: boolean;
  /** "editorial" = asymmetric homepage layout; "grid" = uniform catalogue. */
  layout?: "editorial" | "grid";
}

type Filter = "all" | VideoCategory;

export function MusicVideoGrid({ videos, filters = false, layout = "grid" }: MusicVideoGridProps) {
  const [active, setActive] = useState<Video | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const available = useMemo(
    () => (Object.keys(videoCategories) as VideoCategory[]).filter((c) => videos.some((v) => v.category === c)),
    [videos],
  );
  const shown = filter === "all" ? videos : videos.filter((v) => v.category === filter);
  const longform = shown.filter((v) => v.format === "video");
  const shorts = shown.filter((v) => v.format === "short");

  return (
    <>
      {filters && available.length > 1 && (
        <div role="group" aria-label="Filter videos" className="-mx-1 mb-12 flex flex-wrap gap-2">
          {(["all", ...available] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-11 border px-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
                filter === f ? "border-gold bg-gold text-ink" : "border-line text-ash hover:border-bone/50 hover:text-bone",
              )}
            >
              {f === "all" ? "All Videos" : videoCategories[f]}
            </button>
          ))}
        </div>
      )}

      {layout === "editorial" ? (
        <EditorialLayout videos={shown} onPlay={setActive} />
      ) : (
        <div className="space-y-20">
          {longform.length > 0 && (
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {longform.map((v) => (
                <VideoCard key={v.id} video={v} onPlay={setActive} />
              ))}
            </div>
          )}
          {shorts.length > 0 && (
            <div>
              <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h3 className="display text-3xl sm:text-4xl">Shorts</h3>
                <p className="text-xs uppercase tracking-[0.22em] text-smoke">
                  {shorts.length} {shorts.length === 1 ? "clip" : "clips"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {shorts.map((v) => (
                  <VideoCard key={v.id} video={v} onPlay={setActive} sizes="(min-width:1280px) 16vw, (min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw" />
                ))}
              </div>
            </div>
          )}
          {shown.length === 0 && <p className="text-ash">No videos in this category yet.</p>}
        </div>
      )}

      <VideoModal video={active} onClose={() => setActive(null)} />
    </>
  );
}

/** Asymmetric homepage composition: one wide feature, a tall Short, and a supporting pair. */
function EditorialLayout({ videos, onPlay }: { videos: Video[]; onPlay: (v: Video) => void }) {
  const longform = videos.filter((v) => v.format === "video");
  const shorts = videos.filter((v) => v.format === "short");
  const [lead, ...rest] = longform;
  const tall = shorts[0];

  return (
    <div className="grid gap-x-6 gap-y-14 lg:grid-cols-12">
      {/* 9 + 3 columns: a 16:9 card and a 9:16 card come out at near-equal heights. */}
      {lead && <VideoCard video={lead} onPlay={onPlay} className="lg:col-span-9" sizes="(min-width:1024px) 75vw, 100vw" />}
      {tall && (
        <VideoCard
          video={tall}
          onPlay={onPlay}
          className="mx-auto w-full max-w-xs sm:max-w-sm lg:col-span-3 lg:max-w-none"
          sizes="(min-width:1024px) 25vw, 384px"
        />
      )}
      {rest.slice(0, 2).map((v) => (
        <VideoCard key={v.id} video={v} onPlay={onPlay} className="lg:col-span-6" sizes="(min-width:1024px) 50vw, 100vw" />
      ))}
    </div>
  );
}
