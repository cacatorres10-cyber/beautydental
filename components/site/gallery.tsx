"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";
import { SmartImage } from "./smart-image";
import { Reveal } from "./reveal";
import { useLang } from "./language-provider";
import { usePhotos } from "./photos-provider";
import { t } from "@/lib/content";

function Slide({ src, alt }: { src: string; alt: string }) {
  return (
    // Square frames suit the vertically-stacked before/after photos.
    <div className="aspect-square w-[230px] md:w-[290px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-ink/5 shadow-lg">
      <SmartImage src={src} alt={alt} className="h-full w-full" />
    </div>
  );
}

export function Gallery() {
  const { lang } = useLang();
  const photos = usePhotos();
  // A single row of 2-3 photos scrolls poorly, so keep one row until there
  // are enough cases to fill two.
  const useTwoRows = photos.gallery.length >= 6;
  const half = useTwoRows
    ? Math.ceil(photos.gallery.length / 2)
    : photos.gallery.length;
  const rowA = photos.gallery.slice(0, half);
  const rowB = photos.gallery.slice(half);

  return (
    <section id="galeria" className="relative bg-white py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-deep/60" />
            {t.gallery.eyebrow[lang]}
            <span className="h-px w-8 bg-gold-deep/60" />
          </span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl text-ink leading-tight">
            {t.gallery.title[lang]}
          </h2>
          <p className="mt-5 text-lg text-ink/55">{t.gallery.body[lang]}</p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-5">
        <InfiniteSlider gap={20} duration={38} durationOnHover={90}>
          {rowA.map((src, i) => (
            <Slide key={i} src={src} alt={`${t.gallery.title[lang]} ${i + 1}`} />
          ))}
        </InfiniteSlider>
        {rowB.length > 0 ? (
          <InfiniteSlider gap={20} duration={44} durationOnHover={90} reverse>
            {rowB.map((src, i) => (
              <Slide
                key={i}
                src={src}
                alt={`${t.gallery.title[lang]} ${half + i + 1}`}
              />
            ))}
          </InfiniteSlider>
        ) : null}
      </div>

      {/* soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
    </section>
  );
}
