import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before the reveal starts once in view. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  as?: "div" | "li" | "section" | "figure";
}

/**
 * Fades content up once as it enters the viewport.
 *
 * A server component: it only marks the element with `data-reveal`. A single
 * <RevealObserver/> in the root layout flips it to visible, and the transition
 * itself is CSS (globals.css). Content stays visible without JavaScript and for
 * visitors who prefer reduced motion.
 */
export function Reveal({ children, className, delay = 0, y = 28, as: Tag = "div" }: RevealProps) {
  const style = { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties;
  return (
    <Tag data-reveal="" className={className} style={style}>
      {children}
    </Tag>
  );
}
