"use client";

import { useLang } from "./language-provider";
import { usePhotos } from "./photos-provider";
import { Reveal } from "./reveal";
import { SmartImage } from "./smart-image";
import { t, STATS, IMAGES } from "@/lib/content";
import { Parallax } from "@/components/motion/parallax";
import { CountUp } from "@/components/motion/count-up";
import { RevealWords } from "@/components/motion/reveal-words";

export function Intro() {
  const { lang } = useLang();
  const photos = usePhotos();

  return (
    <section className="relative bg-ivory py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold-deep/60" />
              {t.intro.eyebrow[lang]}
            </span>
            <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-ink">
              <RevealWords segments={[{ text: t.intro.title[lang] }]} step={45} />
            </h2>
            <p className="mt-8 text-lg text-ink/60 leading-relaxed max-w-xl">
              {t.intro.body[lang]}
            </p>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <Reveal key={i} delay={i * 90}>
                  <div className="text-gold-gradient font-serif text-3xl md:text-4xl font-semibold">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-1 text-xs md:text-sm text-ink/55 leading-tight">
                    {s.label[lang]}
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-gold-light/30 to-transparent blur-2xl" />
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden ring-1 ring-gold/20 shadow-2xl">
                <Parallax className="h-[116%] -mt-[8%]" distance={-38}>
                  <SmartImage
                    src={photos.intro}
                    alt={t.intro.eyebrow[lang]}
                    className="h-full w-full"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-6 -left-6 hidden sm:flex flex-col items-start rounded-2xl bg-white/95 backdrop-blur px-5 py-4 shadow-xl ring-1 ring-ink/5">
                <span className="text-gold-gradient font-serif text-2xl font-semibold">
                  Beauty
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-ink/50">
                  Dental &amp; Skin
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
