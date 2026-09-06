"use client";

import { Fragment, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Segment = { text: string; className?: string };

/**
 * Lifts a headline into place one word at a time, each word rotating up out
 * of the line as if it were set on a wheel.
 *
 * Words carry their segment's class, so a gold gradient still applies. The
 * whole thing is one <span> per word with a transition delay, which keeps it
 * off the main thread and lets it survive a reduced-motion setting: the CSS
 * below simply resolves to the finished state.
 */
export function RevealWords({
  segments,
  className,
  delay = 0,
  step = 55,
}: {
  segments: Segment[];
  className?: string;
  /** Milliseconds before the first word moves. */
  delay?: number;
  /** Milliseconds between words. */
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.classList.add("is-visible");
          obs.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = segments.map((segment) => segment.text.split(" "));
  const total = words.reduce((n, list) => n + list.length, 0);
  let index = -1;

  return (
    <span ref={ref} className={cn("reveal-words", className)}>
      {segments.map((segment, s) =>
        words[s].map((word) => {
          index += 1;
          const last = index === total - 1;
          return (
            // The gap has to be a sibling of the inline-block word, not a
            // child: whitespace at the edge of an inline-block collapses away
            // and the headline reads as one run-on word.
            <Fragment key={`${s}-${index}`}>
              <span className="rw-word">
                <span
                  // The segment's own class rides on the animated span rather
                  // than a wrapper. A gold gradient paints with
                  // background-clip: text, and a child that has its own filter
                  // renders on a separate layer with no background to clip, so
                  // a wrapped word would simply come out invisible.
                  className={cn("rw-inner", segment.className)}
                  style={{ transitionDelay: `${delay + index * step}ms` }}
                >
                  {word}
                </span>
              </span>
              {last ? null : " "}
            </Fragment>
          );
        })
      )}
    </span>
  );
}

/** Convenience for a plain string with no gold segment. */
export function RevealText({
  children,
  ...rest
}: { children: string } & Omit<Parameters<typeof RevealWords>[0], "segments">) {
  return <RevealWords segments={[{ text: children }]} {...rest} />;
}

export type { Segment as RevealSegment };
export type RevealChildren = ReactNode;
