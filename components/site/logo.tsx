"use client";

import { cn } from "@/lib/utils";
import { usePhotos } from "./photos-provider";

/**
 * The clinic's own logo, with a typographic stand-in behind it.
 *
 * The artwork is a stacked lockup, monogram over wordmark over tagline. At
 * the height of a navbar the whole stack shrinks until the lettering cannot
 * be read, so up there the pieces are set side by side instead; the footer,
 * which has room, gets the artwork as drawn. `scripts/make-logo.mjs` cuts
 * the pieces and the white-lettered versions out of `public/brand/logo.png`.
 *
 * tone="dark"  -> for LIGHT backgrounds (ink text)
 * tone="light" -> for DARK backgrounds (ivory text)
 */
export function Logo({
  tone = "dark",
  variant = "lockup",
  className,
}: {
  tone?: "dark" | "light";
  /** "lockup" sets the pieces in a row; "stacked" uses the artwork as drawn. */
  variant?: "lockup" | "stacked";
  className?: string;
}) {
  const { brand } = usePhotos();
  const textColor = tone === "dark" ? "text-ink" : "text-white";
  const subColor = tone === "dark" ? "text-ink/55" : "text-white/60";

  const light = tone === "light";
  const full = light ? brand.fullLight : brand.full;
  const mark = light ? brand.markLight : brand.mark;
  const word = light ? brand.wordLight : brand.word;

  if (variant === "stacked" && full) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={full}
        alt="Beauty Dental & Skin"
        className={cn("h-20 w-auto md:h-24", className)}
      />
    );
  }

  if (mark && word) {
    return (
      <span className={cn("inline-flex items-center gap-2.5 md:gap-3", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} alt="" aria-hidden="true" className="h-10 w-auto md:h-12" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={word} alt="Beauty Dental & Skin" className="h-5 w-auto md:h-6" />
      </span>
    );
  }

  if (full) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={full}
        alt="Beauty Dental & Skin"
        className={cn("h-12 w-auto md:h-14", className)}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Mark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-lg md:text-xl font-semibold tracking-tight",
            textColor
          )}
        >
          Beauty <span className="text-gold-gradient">Dental</span>
        </span>
        <span
          className={cn(
            "text-[9px] md:text-[10px] uppercase tracking-[0.42em] mt-1",
            subColor
          )}
        >
          &amp; Skin · La Romana
        </span>
      </span>
    </span>
  );
}

function Mark() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="lg-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6c878" />
          <stop offset="0.5" stopColor="#c8a24c" />
          <stop offset="1" stopColor="#a5812f" />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="18.5"
        stroke="url(#lg-gold)"
        strokeWidth="1.5"
      />
      {/* stylized smile / drop */}
      <path
        d="M12 16c3-3 13-3 16 0 0 6-4 11-8 11s-8-5-8-11z"
        fill="url(#lg-gold)"
        opacity="0.9"
      />
      <path
        d="M12.5 16c2.5-2.4 12.5-2.4 15 0"
        stroke="#fff"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* sparkle */}
      <path
        d="M28 9.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z"
        fill="url(#lg-gold)"
      />
    </svg>
  );
}
