"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useMotionOk } from "./use-motion-ok";

/**
 * Gives the page weight: the scroll eases instead of snapping, which is most
 * of what separates a luxury site from a plain one.
 *
 * Only on a pointer device. On a phone the native scroll already has inertia
 * and smoothing it again fights the thumb, so touch keeps the real thing.
 */
export function SmoothScroll() {
  const motionOk = useMotionOk();

  useEffect(() => {
    if (!motionOk) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // Long tail, no bounce: settles rather than overshooting.
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native smooth scrolling would fight this one.
      anchors: { offset: -80 },
      autoRaf: true,
    });

    // The header shrinks on scroll and the sections reveal on scroll; both
    // listen to the window, and Lenis keeps emitting real scroll events.
    document.documentElement.style.scrollBehavior = "auto";

    return () => {
      lenis.destroy();
      document.documentElement.style.removeProperty("scroll-behavior");
    };
  }, [motionOk]);

  return null;
}
