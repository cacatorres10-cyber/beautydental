"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { useLang } from "./language-provider";
import { t, IMAGES, waLink } from "@/lib/content";
import { MessageCircle, ArrowDown } from "lucide-react";

export function Hero() {
  const { lang } = useLang();

  return (
    <section id="top" className="relative bg-ivory">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={IMAGES.heroMedia}
        bgImageSrc={IMAGES.heroBg}
        title={t.hero.title[lang]}
        date={t.hero.eyebrow[lang]}
        scrollToExpand={t.hero.scroll[lang]}
        textBlend={false}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif text-2xl md:text-3xl text-ink leading-snug">
            {t.hero.lead[lang]}
          </p>
          <p className="mt-6 text-base md:text-lg text-ink/60 leading-relaxed">
            {t.hero.body[lang]}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={waLink(t.contact.waMessage[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <MessageCircle size={18} />
              {t.hero.primary[lang]}
            </a>
            <a href="#servicios" className="btn-ghost">
              {t.hero.secondary[lang]}
              <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
