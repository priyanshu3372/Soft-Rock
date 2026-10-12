import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Use an array for intentional line breaks. */
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  size?: "lg" | "xl";
}

export function SectionHeading({ eyebrow, title, intro, align = "left", as: Tag = "h2", className, size = "lg" }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <Tag
        className={cn(
          "display text-balance",
          size === "xl" ? "text-[clamp(3rem,10vw,9rem)]" : "text-[clamp(2.6rem,7vw,6.25rem)]",
        )}
      >
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-6 max-w-xl text-base leading-relaxed text-ash sm:text-lg", align === "center" && "mx-auto")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
