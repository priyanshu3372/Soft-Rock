import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "text";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] transition-all duration-500 ease-[var(--ease-cinema)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-gold px-7 text-ink hover:bg-bone",
  ghost: "border border-bone/30 px-7 text-bone hover:border-bone hover:bg-bone hover:text-ink",
  text: "min-h-11 text-bone hover:text-gold",
};

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

interface ButtonLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  variant?: Variant;
  children: ReactNode;
  /** Opens in a new tab and adds an outbound arrow. Auto-detected for http(s) links. */
  external?: boolean;
}

export function ButtonLink({ href, variant = "primary", className, children, external, ...rest }: ButtonLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const classes = buttonClasses(variant, className);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      <span
        aria-hidden="true"
        className="h-px w-5 bg-current transition-all duration-500 ease-[var(--ease-cinema)] group-hover:w-8"
      />
    </Link>
  );
}
