"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMotionOk } from "./use-motion-ok";

/**
 * Drifts its content against the page as the section passes, which gives a
 * flat photo a sense of depth.
 *
 * Everything shares one scroll listener per instance, throttled to a frame,
 * and only ever writes a transform.
 */
export function Parallax({
  children,
  className,
  /** Pixels of travel across the full pass. Negative moves the other way. */
  distance = 40,
  scale,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  /** Optional zoom paired with the drift, e.g. 1.06. */
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const motionOk = useMotionOk();

  useEffect(() => {
    if (!motionOk) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const view = window.innerHeight;
      if (box.bottom < -200 || box.top > view + 200) return;
      // -1 entering from the bottom, 0 centred, 1 leaving at the top.
      const centre = (box.top + box.height / 2 - view / 2) / (view / 2 + box.height / 2);
      const shift = (centre * distance).toFixed(2);
      const zoom = scale ? ` scale(${(1 + (scale - 1) * (1 - Math.abs(centre))).toFixed(4)})` : "";
      el.style.transform = `translate3d(0, ${shift}px, 0)${zoom}`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [motionOk, distance, scale]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
