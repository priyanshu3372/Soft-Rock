"use client";

import { useEffect } from "react";
import { siteConfig } from "@/data/site";
import { buttonClasses } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[85svh] items-center">
      <div className="container-x pt-24 text-center">
        <p className="eyebrow mb-6">Something went wrong</p>
        <h1 className="display text-[clamp(3rem,10vw,7.5rem)]">
          We hit a <span className="accent">wrong note.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-ash">
          This page didn&apos;t load properly. Please try again. For bookings, you can always email{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-bone underline underline-offset-4 hover:text-gold">
            {siteConfig.contact.email}
          </a>
          .
        </p>
        <button type="button" onClick={reset} className={buttonClasses("primary", "mt-10")}>
          Try again
        </button>
      </div>
    </section>
  );
}
