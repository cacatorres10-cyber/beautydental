"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { useLang } from "./language-provider";
import { usePhotos } from "./photos-provider";
import { t, IMAGES, HERO_MODE, waLink } from "@/lib/content";
import { MessageCircle, ArrowDown } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroBanner } from "./hero-banner";

export function Hero() {
  const { lang } = useLang();
  const photos = usePhotos();

  // A single local source: the previous chain of stock URLs swapped the
  // banner in front of the visitor mid-view, which read as a glitch.
  // `HERO_MODE` in lib/content.ts picks the opening.
  const useVideo = HERO_MODE === "video" && Boolean(photos.heroVideo);

  // The full screen banner carries its own headline and buttons, so the
  // copy that sits under the growing card becomes a band of its own.
  if (HERO_MODE === "banner") {
    return (
      <>
        <HeroBanner />
        <section className="bg-ivory px-5 py-16 text-center md:px-6 md:py-20">
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-ink/60 md:text-lg">
            {t.hero.body[lang]}
          </p>
        </section>
      </>
    );
  }

  return (
    <section id="top" className="relative bg-ivory">
      <ScrollExpandMedia
        mediaType={useVideo ? "video" : "image"}
        mediaSrc={useVideo ? photos.heroVideo! : photos.hero}
        mediaSrcMobile={
          useVideo ? photos.heroVideoMobile ?? undefined : photos.heroMobile
        }
        posterSrc={photos.heroPoster ?? photos.hero}
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
              <a href="#servicios" className="btn-ghost">
                {t.hero.secondary[lang]}
                <ArrowDown size={16} />
              </a>
            </Magnetic>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
