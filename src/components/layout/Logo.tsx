import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Official Softrock logo, from the band's YouTube channel artwork.
 * Its original black field was converted to true transparency.
 */
export function Logo({
  className,
  href = "/",
  eager,
  sizes = "64px",
}: {
  className?: string;
  href?: string | null;
  /** Above-the-fold usage: load immediately (without competing with the hero for priority). */
  eager?: boolean;
  /** Rendered width, so the optimizer serves a right-sized file. */
  sizes?: string;
}) {
  const img = (
    <Image
      src={siteConfig.logo.src}
      width={siteConfig.logo.width}
      height={siteConfig.logo.height}
      alt={siteConfig.logo.alt}
      loading={eager ? "eager" : "lazy"}
      sizes={sizes}
      className={cn("h-full w-auto", className)}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} className="block h-full" aria-label="Softrock, home">
      {img}
    </Link>
  );
}
