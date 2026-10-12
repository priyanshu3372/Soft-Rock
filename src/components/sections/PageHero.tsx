import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: { src: string; alt: string };
  /** CSS object-position for the background image. */
  focus?: string;
  children?: ReactNode;
  compact?: boolean;
}

/** Editorial hero used by secondary pages. */
export function PageHero({ eyebrow, title, intro, image, focus = "50% 40%", children, compact }: PageHeroProps) {
  return (
    <section className={cn("relative isolate flex flex-col overflow-hidden", compact ? "min-h-[70svh]" : "min-h-[88svh]")}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={60}
        className="kenburns -z-20 object-cover"
        style={{ objectPosition: focus }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/50" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/40" />

      <div className="container-x mt-auto pb-16 pt-36 sm:pb-24">
        <p className="eyebrow fade-in mb-6" style={{ animationDelay: "0.15s" }}>
          {eyebrow}
        </p>
        <h1 className="display rise max-w-6xl text-balance text-[clamp(3.2rem,11vw,9.5rem)]" style={{ animationDelay: "0.3s" }}>
          {title}
        </h1>
        {intro && (
          <p className="fade-in mt-8 max-w-xl text-lg leading-relaxed text-bone/80" style={{ animationDelay: "0.7s" }}>
            {intro}
          </p>
        )}
        {children && (
          <div className="fade-in mt-10" style={{ animationDelay: "0.85s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
