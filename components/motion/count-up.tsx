"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionOk } from "./use-motion-ok";

/**
 * Runs a number up to its value the first time it is seen.
 *
 * The stats are written as display strings ("+2.5K", "4.9★"), so the digits
 * are pulled out, animated, and put back between whatever surrounded them.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const motionOk = useMotionOk();
  const match = value.match(/^(\D*)([\d.]+)(.*)$/);
  const target = match ? Number(match[2]) : NaN;
  const decimals = match ? (match[2].split(".")[1]?.length ?? 0) : 0;
  const animatable = motionOk && match !== null && Number.isFinite(target);

  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    if (!animatable) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // Fast off the mark, gliding into the final figure.
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(target * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [animatable, target, duration]);

  if (!animatable || !match) return <span>{value}</span>;

  const [, prefix, , suffix] = match;
  const body = shown === null ? match[2] : shown.toFixed(decimals);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {body}
      {suffix}
    </span>
  );
}
