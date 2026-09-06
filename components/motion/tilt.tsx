"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer, useMotionOk } from "./use-motion-ok";

/**
 * Leans a card towards the pointer in 3D and slides a soft gold highlight
 * across it, so the surface reads as a physical object catching the light.
 *
 * The transform is written straight to the node inside a rAF rather than
 * through React state: a card that re-rendered on every pointer move would
 * cost far more than the effect is worth.
 */
export function Tilt({
  children,
  className,
  max = 7,
  lift = 6,
  sheen = true,
}: {
  children: ReactNode;
  className?: string;
  /** Degrees of rotation at the corners. */
  max?: number;
  /** Pixels the card rises towards the viewer. */
  lift?: number;
  sheen?: boolean;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);
  const glow = useRef<HTMLSpanElement | null>(null);
  const frame = useRef(0);
  // Both hooks have to run every render, so no short-circuiting here.
  const finePointer = useFinePointer();
  const motionOk = useMotionOk();
  const enabled = finePointer && motionOk;

  const onMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || frame.current) return;
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const node = wrap.current;
      const card = inner.current;
      if (!node || !card) return;
      const box = node.getBoundingClientRect();
      const x = (clientX - box.left) / box.width - 0.5;
      const y = (clientY - box.top) / box.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) ` +
        `rotateY(${(x * max).toFixed(2)}deg) translateZ(${lift}px)`;
      if (glow.current) {
        glow.current.style.opacity = "1";
        glow.current.style.background =
          `radial-gradient(340px circle at ${((x + 0.5) * 100).toFixed(1)}% ` +
          `${((y + 0.5) * 100).toFixed(1)}%, rgba(230,200,120,0.22), transparent 62%)`;
      }
    });
  };

  const reset = () => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    if (inner.current) inner.current.style.transform = "";
    if (glow.current) glow.current.style.opacity = "0";
  };

  return (
    <div
      ref={wrap}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("h-full [transform-style:preserve-3d]", className)}
    >
      <div
        ref={inner}
        className="relative h-full transition-transform duration-500 ease-out will-change-transform"
      >
        {children}
        {sheen ? (
          <span
            ref={glow}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
          />
        ) : null}
      </div>
    </div>
  );
}
