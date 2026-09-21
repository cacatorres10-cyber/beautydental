"use client";

/**
 * One scroll listener for the whole page.
 *
 * Every effect that follows the scroll used to register its own listener and
 * its own animation frame. On a slow phone that is the same layout work done
 * five times over, so they all share this instead: one passive listener, one
 * frame, everyone read in it.
 */
type Subscriber = () => void;

const subscribers = new Set<Subscriber>();
let frame = 0;
let listening = false;

function flush() {
  frame = 0;
  subscribers.forEach((run) => run());
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(flush);
}

/** Runs `fn` once now, then at most once per frame while the page scrolls. */
export function onScrollFrame(fn: Subscriber) {
  subscribers.add(fn);

  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }

  fn();

  return () => {
    subscribers.delete(fn);
    if (subscribers.size > 0) return;
    listening = false;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}
