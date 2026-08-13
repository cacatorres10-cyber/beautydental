"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IMAGE_FALLBACKS } from "@/lib/content";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  label?: string;
  /** Extra sources to try, in order, before giving up on the placeholder. */
  fallbacks?: string[];
};

/**
 * <img> with a graceful on-brand fallback.
 * If the remote photo fails to load, we show an elegant gold placeholder
 * instead of a broken-image icon — so the layout never looks unfinished.
 */
export function SmartImage({
  src,
  alt,
  className,
  imgClassName,
  priority,
  label,
  fallbacks,
}: SmartImageProps) {
  // Walk the sources in order — the clinic's own photo, then any stand-ins,
  // then the branded placeholder below — so nothing ever shows as broken.
  const chain = [src, ...(fallbacks ?? IMAGE_FALLBACKS[src] ?? [])];
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const current = chain[index];

  const handleError = () => {
    if (index < chain.length - 1) {
      setIndex(index + 1);
      return;
    }
    setFailed(true);
  };

  if (failed) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          className
        )}
        style={{
          background:
            "linear-gradient(135deg,#141414 0%,#2a2a2a 45%,#141414 100%)",
        }}
        aria-label={alt}
        role="img"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(230,200,120,0.35), transparent 55%), radial-gradient(circle at 80% 90%, rgba(200,162,76,0.3), transparent 55%)",
          }}
        />
        <div className="relative text-center">
          <div className="font-serif text-3xl md:text-4xl tracking-tight text-gold-light">
            Beauty Dental &amp; Skin
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-white/50">
            {label ?? "La Romana · RD"}
          </div>
        </div>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      onError={handleError}
      className={cn("h-full w-full object-cover", imgClassName)}
    />
  );
}
