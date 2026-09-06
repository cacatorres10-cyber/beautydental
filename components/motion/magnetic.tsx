"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useFinePointer, useMotionOk } from "./use-motion-ok";

/**
 * The button leans towards the cursor as it approaches, which makes the main
 * calls to action feel like they want to be pressed.
 */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  /** Share of the distance to the pointer the element travels. */
  strength?: number;
  /** Ceiling in pixels, so a wide button never slides far. */
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const frame = useRef(0);
  const finePointer = useFinePointer();
  const motionOk = useMotionOk();
  const enabled = finePointer && motionOk;

  const onMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (!enabled || frame.current) return;
    const { clientX, clientY } = event;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const node = ref.current;
      if (!node) return;
      const box = node.getBoundingClientRect();
      const dx = clientX - (box.left + box.width / 2);
      const dy = clientY - (box.top + box.height / 2);
      const clamp = (v: number) => Math.max(-max, Math.min(max, v * strength));
      node.style.transform = `translate(${clamp(dx).toFixed(1)}px, ${clamp(
        dy
      ).toFixed(1)}px)`;
    });
  };

  const reset = () => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "inline-block transition-transform duration-500 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </span>
  );
}
