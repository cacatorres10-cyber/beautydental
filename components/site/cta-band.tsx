"use client";

import { MessageCircle } from "lucide-react";
import { useLang } from "./language-provider";
import { usePhotos } from "./photos-provider";
import { Reveal } from "./reveal";
import { SmartImage } from "./smart-image";
import { t, IMAGES, waLink } from "@/lib/content";

export function CtaBand() {
  const { lang } = useLang();
  const photos = usePhotos();

  return (
    <section className="relative py-24 md:py-28 overflow-hidden bg-ink">
      <div className="absolute inset-0 opacity-25">
        <SmartImage src={photos.clinic} alt="" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/70" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(230,200,120,0.4), transparent 55%)",
        }}
      />

      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight">
            {t.ctaBand.title[lang]}
          </h2>
          <p className="mt-5 text-lg text-white/70">{t.ctaBand.body[lang]}</p>
          <div className="mt-10 flex justify-center">
            <a
              href={waLink(t.contact.waMessage[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold !px-8 !py-4 text-base"
            >
              <MessageCircle size={20} />
              {t.ctaBand.button[lang]}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
