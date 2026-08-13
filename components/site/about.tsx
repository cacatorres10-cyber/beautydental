"use client";

import { useLang } from "./language-provider";
import { usePhotos } from "./photos-provider";
import { Reveal } from "./reveal";
import { SmartImage } from "./smart-image";
import { t, IMAGES } from "@/lib/content";
import { BadgeCheck, Heart, Award } from "lucide-react";

export function About() {
  const { lang } = useLang();
  const photos = usePhotos();
  const chips = [
    { icon: BadgeCheck, es: "Trato personalizado", en: "Personalized care" },
    { icon: Award, es: "Tecnología de precisión", en: "Precision technology" },
    { icon: Heart, es: "Enfoque humano", en: "Human approach" },
  ];

  return (
    <section id="nosotros" className="relative bg-ivory py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-4 rounded-[2.2rem] bg-gradient-to-tr from-gold-light/25 to-transparent blur-2xl" />
              <div className="relative aspect-[4/5] rounded-[2.2rem] overflow-hidden ring-1 ring-gold/20 shadow-2xl">
                <SmartImage
                  src={photos.doctor}
                  alt={t.about.title[lang]}
                  className="h-full w-full"
                  label="Dra. Silvestre"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="font-serif text-2xl">{t.about.title[lang]}</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-gold-light">
                    {t.about.role[lang]}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold-deep/60" />
              {t.about.eyebrow[lang]}
            </span>
            <h2 className="mt-6 font-serif text-4xl md:text-5xl text-ink">
              {t.about.title[lang]}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.25em] text-gold-deep">
              {t.about.role[lang]}
            </p>
            <p className="mt-8 text-lg text-ink/60 leading-relaxed">
              {t.about.body1[lang]}
            </p>
            <p className="mt-4 text-lg text-ink/60 leading-relaxed">
              {t.about.body2[lang]}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {chips.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-white px-4 py-2 text-sm text-ink/70"
                >
                  <c.icon size={16} className="text-gold-deep" />
                  {c[lang]}
                </span>
              ))}
            </div>

            {t.about.note[lang] ? (
              <p className="mt-8 text-xs italic text-ink/35">{t.about.note[lang]}</p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
