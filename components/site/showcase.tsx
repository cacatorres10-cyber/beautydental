"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { SmartImage } from "./smart-image";
import { useLang } from "./language-provider";
import { t, IMAGES } from "@/lib/content";

export function Showcase() {
  const { lang } = useLang();

  return (
    <section className="relative bg-white">
      <ContainerScroll
        titleComponent={
          <div className="px-4">
            <span className="eyebrow justify-center">
              <span className="h-px w-8 bg-gold-deep/60" />
              {t.showcase.eyebrow[lang]}
              <span className="h-px w-8 bg-gold-deep/60" />
            </span>
            <h2 className="mt-5 font-serif text-3xl md:text-5xl lg:text-6xl text-ink leading-tight">
              {t.showcase.title[lang]}
              <br />
              <span className="italic text-gold-gradient">
                {t.showcase.titleAccent[lang]}
              </span>
            </h2>
            <p className="mt-5 mb-2 mx-auto max-w-xl text-base md:text-lg text-ink/55">
              {t.showcase.body[lang]}
            </p>
          </div>
        }
      >
        <SmartImage
          src={IMAGES.smileShowcase}
          alt={t.showcase.eyebrow[lang]}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
          label="Smile design"
        />
      </ContainerScroll>
    </section>
  );
}
