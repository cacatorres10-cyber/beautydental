"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
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

  const mediaChain = [mediaSrc, ...(mediaFallbacks ?? []), bgImageSrc];

  useEffect(() => setMediaIndex(0), [mediaSrc]);

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

  // A 16:9 frame throughout, so a widescreen banner reads correctly both as
  // the small opening card and once it fills the screen.
  const startWidth = isMobile ? 320 : 460;
  const endWidth = isMobile ? 960 : 1760;
  const rawWidth = Math.round(startWidth + progress * (endWidth - startWidth));
  const mediaWidth = `min(${rawWidth}px, 96vw)`;
  const mediaHeight = `min(${Math.round((rawWidth * 9) / 16)}px, 86vh)`;

  const textShift = progress * (isMobile ? 60 : 46);
  const titleOpacity = clamp(1 - progress * 1.6, 0, 1);
  const chromeOpacity = clamp(1 - progress * 2.4, 0, 1);

  // On phones the headline sat on top of the photo and became unreadable, so
  // the media starts lower and the headline sits above it.
  const stacked = isMobile && progress < 0.35;

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
              top: stacked ? "64%" : "50%",
              width: mediaWidth,
              height: mediaHeight,
              boxShadow: "0 30px 80px -40px rgba(120, 90, 20, 0.45)",
            }}
          >
            {mediaType === "video" ? (
              <video
                src={mediaSrc}
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

            {/* Light wash keeps the ink headline readable, clearing as it grows */}
            <div
              className="pointer-events-none absolute inset-0 bg-white"
              style={{ opacity: clamp(0.42 - progress * 0.42, 0, 1) }}
            />
          </div>

          <div
            className={`pointer-events-none relative z-10 flex w-full flex-col items-center gap-1 text-center md:gap-3 ${
              textBlend ? "mix-blend-difference" : ""
            }`}
            style={{
              marginBottom: stacked ? "40vh" : 0,
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
