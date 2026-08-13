"use client";

import { Quote, Star } from "lucide-react";
import { useLang } from "./language-provider";
import { usePhotos } from "./photos-provider";
import { Reveal } from "./reveal";
import { SmartImage } from "./smart-image";
import { t, TESTIMONIALS, IMAGES } from "@/lib/content";

export function Testimonials() {
  const { lang } = useLang();
  const photos = usePhotos();

  return (
    <section id="testimonios" className="relative bg-white py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-deep/60" />
            {t.testimonials.eyebrow[lang]}
            <span className="h-px w-8 bg-gold-deep/60" />
          </span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl text-ink leading-tight">
            {t.testimonials.title[lang]}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={i} delay={(i % 2) * 120}>
              <figure className="relative flex h-full flex-col rounded-3xl border border-ink/8 bg-ivory p-8 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.5)]">
                <Quote
                  size={38}
                  className="text-gold/30 rotate-180"
                  strokeWidth={1.4}
                />
                <div className="mt-2 flex gap-0.5 text-gold-deep">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 font-serif text-lg md:text-xl leading-relaxed text-ink/85">
                  “{item.quote[lang]}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="h-11 w-11 overflow-hidden rounded-full ring-1 ring-gold/30">
                    <SmartImage
                      src={photos.avatars[i % photos.avatars.length]}
                      alt={item.name}
                      className="h-full w-full"
                    />
                  </span>
                  <span>
                    <span className="block font-medium text-ink">
                      {item.name}
                    </span>
                    <span className="block text-xs text-ink/50">
                      {item.location[lang]}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
