"use client";

import {
  Sparkles,
  Smile,
  Gem,
  AlignHorizontalDistributeCenter,
  Anchor,
  Stethoscope,
  Droplets,
  Syringe,
  Flower2,
  Wand2,
  HeartPulse,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "./language-provider";
import { Reveal } from "./reveal";
import {
  t,
  DENTAL_SERVICES,
  SKIN_SERVICES,
  waLink,
  type IconName,
  type Lang,
} from "@/lib/content";

const ICONS: Record<IconName, LucideIcon> = {
  Sparkles,
  Smile,
  Gem,
  AlignHorizontalDistributeCenter,
  Anchor,
  Stethoscope,
  Droplets,
  Syringe,
  Flower2,
  Wand2,
  HeartPulse,
};

type Service = (typeof DENTAL_SERVICES)[number];

function ServiceCard({
  service,
  index,
  lang,
}: {
  service: Service;
  index: number;
  lang: Lang;
}) {
  const Icon = ICONS[service.icon];
  return (
    <Reveal delay={(index % 3) * 100}>
      <a
        href={waLink(
          `${t.contact.waMessage[lang]} (${service.title[lang]})`
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full flex-col rounded-3xl border border-ink/8 bg-white p-7 md:p-8 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_30px_60px_-35px_rgba(184,145,47,0.5)]"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-light/25 to-gold/10 text-gold-deep ring-1 ring-gold/20 transition-transform duration-500 group-hover:scale-110">
            <Icon size={26} strokeWidth={1.6} />
          </span>
          <ArrowUpRight
            size={20}
            className="text-ink/20 transition-all duration-500 group-hover:text-gold-deep group-hover:rotate-12"
          />
        </div>
        <h4 className="mt-6 font-serif text-xl md:text-2xl text-ink">
          {service.title[lang]}
        </h4>
        <p className="mt-3 text-sm md:text-base text-ink/55 leading-relaxed">
          {service.desc[lang]}
        </p>
        <span className="mt-6 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gold-deep opacity-0 -translate-y-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
          {t.services.cta[lang]}
        </span>
      </a>
    </Reveal>
  );
}

function GroupHeading({ label }: { label: string }) {
  return (
    <Reveal>
      <div className="flex items-center gap-4 mb-8">
        <span className="font-serif text-2xl md:text-3xl text-ink">{label}</span>
        <span className="h-px flex-1 hairline" />
      </div>
    </Reveal>
  );
}

export function Services() {
  const { lang } = useLang();

  return (
    <section id="servicios" className="relative bg-ivory py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-deep/60" />
            {t.services.eyebrow[lang]}
            <span className="h-px w-8 bg-gold-deep/60" />
          </span>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl text-ink leading-tight">
            {t.services.title[lang]}{" "}
            <span className="italic text-gold-gradient">
              {t.services.titleAccent[lang]}
            </span>
          </h2>
          <p className="mt-6 text-lg text-ink/55">{t.services.subtitle[lang]}</p>
        </Reveal>

        {/* Dental */}
        <div className="mt-20">
          <GroupHeading label={t.services.dental[lang]} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DENTAL_SERVICES.map((s, i) => (
              <ServiceCard key={i} service={s} index={i} lang={lang} />
            ))}
          </div>
        </div>

        {/* Skin */}
        <div className="mt-20">
          <GroupHeading label={t.services.skin[lang]} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKIN_SERVICES.map((s, i) => (
              <ServiceCard key={i} service={s} index={i} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
