"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives every `[data-reveal]` element (see Reveal.tsx).
 *
 * Elements already on screen are marked revealed immediately, then the hiding
 * CSS is armed (`html[data-reveal-ready]`), so nothing visible ever flashes and
 * content stays visible if JavaScript never runs. Re-scans on navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")];
    const offscreen: HTMLElement[] = [];
    for (const el of pending) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.setAttribute("data-revealed", "");
      else offscreen.push(el);
    }
    document.documentElement.setAttribute("data-reveal-ready", "");

    if (!("IntersectionObserver" in window)) {
      offscreen.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    offscreen.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
