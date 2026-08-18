"use client";

import {
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  MapPin,
  Clock,
} from "lucide-react";
import { useLang } from "./language-provider";
import { Reveal } from "./reveal";
import { t, CONTACT, waLink } from "@/lib/content";

export function Contact() {
  const { lang } = useLang();

  const cards = [
    {
      icon: MessageCircle,
      label: t.contact.whatsapp[lang],
      value: CONTACT.phones[0],
      href: waLink(t.contact.waMessage[lang]),
      accent: true,
    },
    {
      icon: Phone,
      label: t.contact.phone[lang],
      value: CONTACT.phones.join("  ·  "),
      href: `tel:${CONTACT.phones[0].replace(/[^\d+]/g, "")}`,
    },
    {
      icon: Mail,
      label: t.contact.email[lang],
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      icon: Instagram,
      label: t.contact.social[lang],
      value: CONTACT.instagramHandle,
      href: CONTACT.instagram,
    },
    {
      icon: MapPin,
      label: t.contact.location[lang],
      value: `${CONTACT.city}, ${CONTACT.country[lang]}`,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        CONTACT.mapsQuery
      )}`,
    },
    {
      icon: Clock,
      label: t.contact.hours[lang],
      value: t.contact.hoursValue[lang],
    },
  ];

  return (
    <section id="contacto" className="relative bg-ivory py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-deep/60" />
            {t.contact.eyebrow[lang]}
            <span className="h-px w-8 bg-gold-deep/60" />
          </span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl text-ink leading-tight">
            {t.contact.title[lang]}
          </h2>
          <p className="mt-5 text-lg text-ink/55">{t.contact.body[lang]}</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((c, i) => {
              const inner = (
                <>
                  <span
                    className={
                      "flex h-11 w-11 items-center justify-center rounded-xl ring-1 " +
                      (c.accent
                        ? "bg-gradient-to-br from-gold-light to-gold-deep text-white ring-transparent"
                        : "bg-white text-gold-deep ring-gold/20")
                    }
                  >
                    <c.icon size={20} />
                  </span>
                  <span className="mt-4 block text-xs uppercase tracking-[0.2em] text-ink/45">
                    {c.label}
                  </span>
                  <span className="mt-1 block text-sm md:text-base text-ink/80 font-medium break-words">
                    {c.value}
                  </span>
                </>
              );
              return (
                <Reveal key={i} delay={(i % 2) * 90}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>

          {/* Map */}
          <Reveal delay={120} className="min-h-[22rem]">
            <div className="h-full overflow-hidden rounded-3xl ring-1 ring-ink/8 shadow-xl">
              <iframe
                title="Beauty Dental & Skin · La Romana"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  CONTACT.mapsQuery
                )}&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[22rem] w-full grayscale-[0.2] contrast-[1.05]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
