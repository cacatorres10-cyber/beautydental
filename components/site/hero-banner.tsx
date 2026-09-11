"use client";

import { MessageCircle, ArrowDown } from "lucide-react";
import { useLang } from "./language-provider";
import { usePhotos } from "./photos-provider";
import { t, waLink } from "@/lib/content";
import { Magnetic } from "@/components/motion/magnetic";
import { RevealWords } from "@/components/motion/reveal-words";

/**
 * The team photo filling the screen, darkened, with the headline over it.
 *
 * A phone is far too narrow for a photo of six people side by side: covering
 * the screen with it leaves two faces and a lot of shoulders. So the phone
 * gets the whole frame as a band in the middle of the section, with the
 * headline above and the buttons below, and the same photo blurred behind it
 * for depth. Nobody is cropped out.
 *
 * The alternative opening lives in <Hero>: a small card that grows as the
 * visitor scrolls. `HERO_MODE` in lib/content.ts picks between them.
 */
export function HeroBanner() {
  const { lang } = useLang();
  const photos = usePhotos();
  const [firstWord, ...restOfTitle] = t.hero.title[lang].split(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink"
      // Dynamic viewport units so the browser chrome on a phone cannot leave
      // a strip of the next section peeking under the fold.
      style={{ minHeight: "100svh" }}
    >
      {/* Tablet and up: the photo covers the screen. */}
      <div className="absolute inset-0 hidden sm:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos.hero}
          alt=""
          aria-hidden="true"
          // A slow drift keeps the still from feeling like a screenshot.
          className="kenburns h-full w-full object-cover object-[center_38%]"
        />
        {/* Darkened so the type reads: a flat wash for contrast, a vertical
            gradient to seat the navbar and the scroll cue, and a warm tint
            that keeps the clinic's gold in the picture. */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/25 to-ink/85" />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(1100px 700px at 70% 25%, rgba(230,200,120,0.55), transparent 65%)",
          }}
        />
      </div>

      {/* Phone: the same photo out of focus, as a ground for the band. */}
      <div className="absolute inset-0 sm:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos.hero}
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-125 object-cover opacity-40 blur-2xl"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(520px 420px at 50% 30%, rgba(230,200,120,0.22), transparent 70%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 pb-16 pt-24 text-center sm:pb-24 sm:pt-28 md:px-6">
        {/* Smaller and tighter on a phone, where the full line plus its two
            rules ran a few pixels past the screen and wrapped. */}
        <span className="eyebrow justify-center !text-[10px] !tracking-[0.18em] !text-gold-light sm:!text-xs sm:!tracking-[0.25em]">
          <span className="h-px w-6 bg-gold-light/60 sm:w-8" />
          {t.hero.eyebrow[lang]}
          <span className="h-px w-6 bg-gold-light/60 sm:w-8" />
        </span>

        <h1 className="mx-auto mt-5 max-w-4xl font-serif text-[2.4rem] font-semibold leading-[1.03] text-white sm:mt-7 sm:text-6xl lg:text-7xl">
          <RevealWords
            segments={[
              { text: firstWord },
              {
                // No leading space: the reveal already puts one between
                // every pair of words, segment boundaries included.
                text: restOfTitle.join(" "),
                className: "text-gold-gradient italic",
              },
            ]}
            step={70}
          />
        </h1>

        {/* The whole team, on the phone only. 16:9 trims the ceiling and the
            floor out of the 3:2 frame without losing a single person. */}
        <div className="mt-6 overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15 sm:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos.hero}
            alt={t.team.eyebrow[lang]}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <p className="mx-auto mt-6 max-w-2xl font-serif text-base leading-snug text-white/85 sm:mt-7 sm:text-lg md:text-2xl">
          {t.hero.lead[lang]}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <Magnetic>
            <a
              href={waLink(t.contact.waMessage[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <MessageCircle size={18} />
              {t.hero.primary[lang]}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#servicios"
              className="btn-ghost !border-white/30 !bg-white/10 !text-white hover:!border-gold-light hover:!text-gold-light"
            >
              {t.hero.secondary[lang]}
              <ArrowDown size={16} />
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-2 sm:bottom-7">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/55">
          {t.hero.scroll[lang]}
        </span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/35 pt-1.5">
          <span className="scroll-dot h-2 w-[3px] rounded-full bg-gold-light" />
        </span>
      </div>
    </section>
  );
}
