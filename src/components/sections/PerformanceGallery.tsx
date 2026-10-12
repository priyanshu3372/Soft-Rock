"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Photo } from "@/data/gallery";
import { PhotoLightbox } from "@/components/media/PhotoLightbox";
import { cn } from "@/lib/utils";

interface PerformanceGalleryProps {
  photos: Photo[];
  /**
   * "masonry": every image keeps its true proportions (any number of photos).
   * "mosaic": a fixed editorial composition for exactly 7 photos, ordered
   * tall, wide, tall, wide, wide, square, square.
   */
  layout?: "masonry" | "mosaic";
  /** Masonry columns at the largest breakpoint. */
  columns?: 3 | 4;
}

/** Cell spans for the 7-photo mosaic: a 4×3 grid from tablet up, dense 2-column flow on phones. */
const MOSAIC_SPANS = ["row-span-2", "col-span-2", "row-span-2", "col-span-2", "col-span-2", "", ""];

/** Editorial photo grid. Every image opens in an accessible lightbox. */
export function PerformanceGallery({ photos, layout = "masonry", columns = 4 }: PerformanceGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const mosaic = layout === "mosaic";

  return (
    <>
      <ul
        className={cn(
          mosaic
            ? "grid grid-flow-row-dense auto-rows-[46vw] grid-cols-2 gap-3 sm:gap-4 md:aspect-[3/2] md:auto-rows-auto md:grid-cols-4 md:grid-rows-3"
            : cn("columns-2 gap-3 sm:gap-4 md:columns-3", columns === 4 && "xl:columns-4"),
        )}
      >
        {photos.map((p, i) => (
          <li key={p.id} className={mosaic ? cn("relative", MOSAIC_SPANS[i]) : "mb-3 break-inside-avoid sm:mb-4"}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={cn("group relative block w-full overflow-hidden bg-ink-3", mosaic && "h-full")}
            >
              <span className="sr-only">View larger: </span>
              {mosaic ? (
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width:768px) 50vw, 100vw"
                  className={cn(
                    "object-cover transition-[transform,filter] duration-[1.2s] ease-[var(--ease-cinema)] [filter:saturate(0.85)] group-hover:scale-[1.04] group-hover:[filter:saturate(1.05)]",
                    p.height > p.width && "object-[50%_30%]",
                  )}
                />
              ) : (
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes={columns === 4 ? "(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw" : "(min-width:768px) 33vw, 50vw"}
                  className="h-auto w-full transition-[transform,filter] duration-[1.2s] ease-[var(--ease-cinema)] [filter:saturate(0.85)] group-hover:scale-[1.04] group-hover:[filter:saturate(1.05)]"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <span className="text-left text-xs font-medium tracking-wide text-bone">{p.caption}</span>
                <Plus className="h-5 w-5 shrink-0 text-gold" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <PhotoLightbox photos={photos} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
