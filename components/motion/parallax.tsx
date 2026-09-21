"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMotionOk } from "./use-motion-ok";
import { onScrollFrame } from "./scroll-store";

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

    // Reading a rect forces layout, so an element nobody can see does not
    // get read at all: the observer simply takes it out of the rotation.
    let onScreen = false;
    const watcher = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        if (!onScreen) el.style.transform = "";
      },
      { rootMargin: "200px 0px" }
    );
    watcher.observe(el);

    const update = () => {
      if (!onScreen) return;
      const box = el.getBoundingClientRect();
      const view = window.innerHeight;
      // -1 entering from the bottom, 0 centred, 1 leaving at the top.
      const centre =
        (box.top + box.height / 2 - view / 2) / (view / 2 + box.height / 2);
      const shift = (centre * distance).toFixed(2);
      const zoom = scale
        ? ` scale(${(1 + (scale - 1) * (1 - Math.abs(centre))).toFixed(4)})`
        : "";
      el.style.transform = `translate3d(0, ${shift}px, 0)${zoom}`;
    };

    const stop = onScrollFrame(update);
    return () => {
      stop();
      watcher.disconnect();
      el.style.transform = "";
    };
  }, [motionOk, distance, scale]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
