"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Photo } from "@/data/gallery";

interface PhotoLightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/** Accessible lightbox: native <dialog>, arrow keys, swipe, Esc to close. */
export function PhotoLightbox({ photos, index, onClose, onIndexChange }: PhotoLightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const photo = index !== null ? photos[index] : null;
  const count = photos.length;

  const go = (delta: number) => index !== null && onIndexChange((index + delta + count) % count);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (photo && !d.open) d.showModal();
    if (!photo && d.open) d.close();
  }, [photo]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onClick={(e) => e.target === ref.current && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      aria-label="Photo viewer"
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-bone"
    >
      {photo && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-8">
            <p className="text-xs tabular-nums tracking-[0.24em] text-ash" aria-live="polite">
              {String(index! + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="inline-flex h-12 w-12 items-center justify-center border border-bone/30 transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Close photo viewer</span>
            </button>
          </div>

          <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-4 sm:px-20">
            <div className="relative h-full w-full">
              <Image
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="flex w-full max-w-3xl flex-col items-center gap-2 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
              <span className="text-sm text-ash">{photo.caption ?? photo.alt}</span>
              {photo.sourceVideoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${photo.sourceVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center gap-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold hover:text-bone"
                >
                  Source video <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </figcaption>
          </figure>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                className="absolute left-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink/60 text-bone backdrop-blur transition-colors hover:text-gold sm:left-6"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Previous photo</span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="absolute right-2 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink/60 text-bone backdrop-blur transition-colors hover:text-gold sm:right-6"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Next photo</span>
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
