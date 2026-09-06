"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  /** Phone framing of the same banner, in a taller crop. */
  mediaSrcMobile?: string;
  /** Tried in order if `mediaSrc` fails to load. */
  mediaFallbacks?: string[];
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/**
 * The opening media grows as the visitor scrolls past a tall sticky section.
 *
 * The original version hijacked the wheel and pinned the window at scrollY 0
 * until the media finished expanding, which left the page feeling frozen on
 * desktop. This drives the same effect from the page's own scroll position,
 * so scrolling always behaves normally.
 */
const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  mediaSrcMobile,
  mediaFallbacks,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  // A phone gets the tighter crop, where faces are large enough to read.
  const source = isMobile && mediaSrcMobile ? mediaSrcMobile : mediaSrc;
  const mediaChain = [source, ...(mediaFallbacks ?? []), bgImageSrc];

  useEffect(() => setMediaIndex(0), [source]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const distance = track.offsetHeight - window.innerHeight;
      if (distance <= 0) return;
      const scrolled = -track.getBoundingClientRect().top;
      setProgress(clamp(scrolled / distance, 0, 1));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // The frame keeps one aspect throughout so the banner reads correctly both
  // as the small opening card and once it fills the screen. `aspect-ratio`
  // derives the height from the width the browser actually settles on, which
  // a second `min()` on the height would get wrong once 96vw clamps it.
  const startWidth = isMobile ? 260 : 460;
  const endWidth = isMobile ? 960 : 1760;
  const rawWidth = Math.round(startWidth + progress * (endWidth - startWidth));
  const mediaWidth = `min(${rawWidth}px, 96vw)`;
  // A phone runs out of width almost at once, so there the frame also turns
  // from a landscape card into a tall one: that is where the growth is felt.
  const phoneFrame = isMobile && mediaSrcMobile;
  const mediaAspect = phoneFrame
    ? `${(1.34 - progress * 0.54).toFixed(3)} / 1`
    : "16 / 9";

  const textShift = progress * (isMobile ? 60 : 46);
  const titleOpacity = clamp(1 - progress * 1.6, 0, 1);
  const chromeOpacity = clamp(1 - progress * 2.4, 0, 1);

  // The headline used to sit on top of the banner, which buried the faces in
  // a team photo. The card starts lower with the headline above it, and both
  // slide back to centre as the banner grows, with no jump on the way.
  const restTop = isMobile ? 64 : 62;
  const mediaTop = `${(restTop - progress * (restTop - 50)).toFixed(2)}%`;
  const titleGap = `${((isMobile ? 30 : 32) * (1 - progress)).toFixed(2)}vh`;

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";

  return (
    <div>
      <div ref={trackRef} className="relative h-[200vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          {/* Brand ground */}
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bgImageSrc}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="absolute left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl ring-1 ring-gold/30"
            style={{
              top: mediaTop,
              width: mediaWidth,
              aspectRatio: mediaAspect,
              maxHeight: "86vh",
              boxShadow: "0 30px 80px -40px rgba(120, 90, 20, 0.45)",
            }}
          >
            {mediaType === "video" ? (
              <video
                src={source}
                poster={posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                disablePictureInPicture
                className="h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mediaChain[mediaIndex]}
                alt={title || "Beauty Dental & Skin"}
                onError={() =>
                  setMediaIndex((i) => (i < mediaChain.length - 1 ? i + 1 : i))
                }
                className="h-full w-full object-cover"
              />
            )}

            {/* A light wash settles the card into the ivory ground; it clears
                as the banner takes over the screen. */}
            <div
              className="pointer-events-none absolute inset-0 bg-white"
              style={{ opacity: clamp(0.24 - progress * 0.24, 0, 1) }}
            />
          </div>

          <div
            className={`pointer-events-none relative z-10 flex w-full flex-col items-center gap-1 text-center md:gap-3 ${
              textBlend ? "mix-blend-difference" : ""
            }`}
            style={{
              marginBottom: titleGap,
              opacity: titleOpacity,
            }}
          >
            <h2
              className="font-serif text-[2.75rem] font-semibold leading-[1.05] text-ink sm:text-6xl lg:text-8xl"
              style={{ transform: `translateX(-${textShift}vw)` }}
            >
              {firstWord}
            </h2>
            <h2
              className="text-gold-gradient font-serif text-[2.75rem] font-semibold italic leading-[1.05] sm:text-6xl lg:text-8xl"
              style={{ transform: `translateX(${textShift}vw)` }}
            >
              {restOfTitle}
            </h2>
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-[9%] z-10 text-center"
            style={{ opacity: chromeOpacity }}
          >
            {date ? (
              <p className="font-serif text-lg italic text-gold-deep md:text-2xl">
                {date}
              </p>
            ) : null}
            {scrollToExpand ? (
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ink/50 md:text-xs">
                {scrollToExpand}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <section className="px-6 py-14 md:px-16 md:py-20">{children}</section>
    </div>
  );
};

export default ScrollExpandMedia;
