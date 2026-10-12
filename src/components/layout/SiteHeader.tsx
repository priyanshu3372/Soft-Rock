"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bookingHref, navigation } from "@/data/site";
import { cn, isActivePath } from "@/lib/utils";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <div className="h-11 shrink-0 sm:h-12">
          <Logo eager sizes="64px" />
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navigation.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "link-underline py-1 text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-colors",
                      active ? "text-bone" : "text-bone/65 hover:text-bone",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={bookingHref}
            className="hidden min-h-11 items-center border border-gold/70 px-5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold transition-colors duration-500 hover:bg-gold hover:text-ink sm:inline-flex"
          >
            Book the band
          </Link>
          <MobileNavigation pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
