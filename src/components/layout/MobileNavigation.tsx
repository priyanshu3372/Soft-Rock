"use client";

import Link from "next/link";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { bookingHref, navigation, siteConfig } from "@/data/site";
import { InstagramIcon, YouTubeIcon } from "@/components/ui/icons";
import { cn, isActivePath } from "@/lib/utils";

const loadMotionFeatures = () => import("./motion-features").then((mod) => mod.default);
const ease = [0.22, 1, 0.36, 1] as const;

export function MobileNavigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => setMounted(true), []);

  // Close whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      // Keep focus inside the menu (the toggle button is part of the cycle).
      const nodes = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a,button")].filter(Boolean) as HTMLElement[];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const panel = (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.55, ease }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-4 pb-10 pt-24 sm:px-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,rgb(217_165_91/0.16),transparent_70%)]"
          />
          <nav aria-label="Mobile" className="relative">
            <ul className="space-y-1">
              {navigation.map((item, i) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <m.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.6, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "display flex items-baseline gap-4 py-2 text-[clamp(2.6rem,11vw,4.5rem)] transition-colors",
                        active ? "text-gold" : "text-bone hover:text-gold",
                      )}
                    >
                      <span className="font-sans text-xs tracking-[0.2em] text-smoke">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </m.li>
                );
              })}
            </ul>
          </nav>

          <div className="relative mt-auto space-y-6 pt-10">
            <Link
              href={bookingHref}
              onClick={() => setOpen(false)}
              className="flex min-h-14 w-full items-center justify-center bg-gold text-sm font-semibold uppercase tracking-[0.24em] text-ink"
            >
              Book the band
            </Link>
            <div className="flex items-center gap-6 text-ash">
              <a href={siteConfig.social.youtube.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm hover:text-bone">
                <YouTubeIcon className="h-5 w-5" /> YouTube<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm hover:text-bone">
                <InstagramIcon className="h-5 w-5" /> Instagram<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-[55] inline-flex h-11 w-11 items-center justify-center text-bone"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      {/* Portalled to <body>: the header's backdrop-filter would otherwise become the panel's containing block. */}
      {mounted && createPortal(<LazyMotion features={loadMotionFeatures} strict>{panel}</LazyMotion>, document.body)}
    </div>
  );
}
