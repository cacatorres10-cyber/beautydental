"use client";

import { cn } from "@/lib/utils";
import { usePhotos } from "./photos-provider";

/**
 * The clinic's own logo, with a typographic stand-in behind it.
 *
 * Drop `logo.svg` (or .png / .webp) into `public/brand/` and it is used
 * everywhere automatically. The artwork's lettering is black, so a bar
 * sitting on a dark photo needs `logo-light.*` alongside it; without one,
 * those places keep the stand-in, which already reads on dark.
 *
 * tone="dark"  -> for LIGHT backgrounds (ink text)
 * tone="light" -> for DARK backgrounds (ivory text)
 */
export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const photos = usePhotos();
  const textColor = tone === "dark" ? "text-ink" : "text-white";
  const subColor = tone === "dark" ? "text-ink/55" : "text-white/60";

  const file = tone === "light" ? photos.logoLight : photos.logo;
  if (file && (tone === "dark" || photos.logoLight)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={file}
        alt="Beauty Dental & Skin"
        className={cn("h-10 w-auto md:h-12", className)}
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
