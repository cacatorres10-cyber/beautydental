"use client";

import { useState } from "react";
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
  Plus,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "./language-provider";
import { Reveal } from "./reveal";
import {
  t,
  DENTAL_SERVICES,
  FACIAL_SERVICES,
  waLink,
  type IconName,
  type Lang,
} from "@/lib/content";
import { cn } from "@/lib/utils";

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
  open,
  onToggle,
}: {
  service: Service;
  index: number;
  lang: Lang;
  open: boolean;
  onToggle: () => void;
}) {
  const Icon = ICONS[service.icon];

  return (
    <Reveal delay={(index % 3) * 90}>
      <div
        className={cn(
          "group h-full rounded-2xl border bg-white transition-all duration-300",
          open
            ? "border-gold/50 shadow-[0_24px_50px_-32px_rgba(184,145,47,0.55)]"
            : "border-ink/8 shadow-[0_16px_40px_-36px_rgba(0,0,0,0.5)] hover:border-gold/40 hover:-translate-y-1"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex w-full items-start gap-3.5 p-5 text-left md:p-6"
        >
          <span
            className={cn(
              "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gold-deep ring-1 ring-gold/20 transition-colors duration-300",
              open
                ? "bg-gradient-to-br from-gold-light to-gold-deep text-white ring-transparent"
                : "bg-gradient-to-br from-gold-light/25 to-gold/10"
            )}
          >
            <Icon size={19} strokeWidth={1.7} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block font-serif text-base leading-snug text-ink md:text-lg">
              {service.title[lang]}
            </span>
            <span className="mt-1.5 block text-[13px] leading-relaxed text-ink/55">
              {service.desc[lang]}
            </span>
          </span>

          <Plus
            size={17}
            className={cn(
              "mt-1 shrink-0 text-gold-deep transition-transform duration-300",
              open ? "rotate-45" : "group-hover:rotate-90"
            )}
          />
        </button>

        {/* Grid trick: animates open/closed without hard-coding a height. */}
        <div
          className={cn(
            "grid transition-all duration-400 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <div className="h-px w-full bg-gold/15" />
              <p className="mt-4 text-[13px] leading-relaxed text-ink/65 md:text-sm">
                {service.details[lang]}
              </p>
              <a
                href={waLink(
                  `${t.contact.waMessage[lang]} (${service.title[lang]})`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-[40px] items-center gap-2 rounded-full bg-gradient-to-br from-gold-light to-gold-deep px-4 text-xs font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle size={14} />
                {t.services.cta[lang]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function GroupHeading({ label }: { label: string }) {
  return (
    <Reveal>
      <div className="mb-6 flex items-center gap-4">
        <span className="font-serif text-xl text-ink md:text-2xl">{label}</span>
        <span className="hairline h-px flex-1" />
      </div>
    </Reveal>
  );
}

export function Services() {
  const { lang } = useLang();
  // One open card at a time keeps the grid from jumping around.
  const [openId, setOpenId] = useState<string | null>(null);

  const renderGroup = (list: Service[], group: string) =>
    list.map((s, i) => {
      const id = `${group}-${i}`;
      return (
        <ServiceCard
          key={id}
          service={s}
          index={i}
          lang={lang}
          open={openId === id}
          onToggle={() => setOpenId(openId === id ? null : id)}
        />
      );
    });

  return (
    <section id="servicios" className="relative bg-ivory py-20 md:py-28">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-deep/60" />
            {t.services.eyebrow[lang]}
            <span className="h-px w-8 bg-gold-deep/60" />
          </span>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-ink md:text-5xl">
            {t.services.title[lang]}{" "}
            <span className="text-gold-gradient italic">
              {t.services.titleAccent[lang]}
            </span>
          </h2>
          <p className="mt-4 text-base text-ink/55">
            {t.services.subtitle[lang]}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold-deep/70">
            {t.services.hint[lang]}
          </p>
        </Reveal>

        <div className="mt-14">
          <GroupHeading label={t.services.dental[lang]} />
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {renderGroup(DENTAL_SERVICES, "dental")}
          </div>
        </div>

        <div className="mt-14">
          <GroupHeading label={t.services.skin[lang]} />
          <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {renderGroup(FACIAL_SERVICES, "facial")}
          </div>
        </div>
      </div>
    </section>
  );
}
