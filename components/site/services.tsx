"use client";

import { useState } from "react";
import {
  Sparkles,
  Smile,
  Gem,
  AlignHorizontalDistributeCenter,
  Anchor,
  Stethoscope,
  Microscope,
  Scissors,
  Droplets,
  Droplet,
  Syringe,
  Flower2,
  PenTool,
  Wand2,
  HeartPulse,
  Grip,
  FlaskConical,
  Layers,
  Dna,
  Atom,
  Waves,
  Plus,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "./language-provider";
import { Reveal } from "./reveal";
import {
  t,
  SERVICE_GROUPS,
  waLink,
  type IconName,
  type Lang,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { Tilt } from "@/components/motion/tilt";
import { RevealWords } from "@/components/motion/reveal-words";

const ICONS: Record<IconName, LucideIcon> = {
  Sparkles,
  Smile,
  Gem,
  AlignHorizontalDistributeCenter,
  Anchor,
  Stethoscope,
  Microscope,
  Scissors,
  Droplets,
  Droplet,
  Syringe,
  Flower2,
  PenTool,
  Wand2,
  HeartPulse,
  Grip,
  FlaskConical,
  Layers,
  Dna,
  Atom,
  Waves,
};

type Service = (typeof SERVICE_GROUPS)[number]["items"][number];

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
    <Reveal delay={(index % 3) * 90} className="h-full">
      <Tilt max={6} lift={8}>
        <div
          className={cn(
            "group h-full rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300",
            open
              ? "border-gold/50 shadow-[0_24px_50px_-32px_rgba(184,145,47,0.55)]"
              : "border-ink/8 shadow-[0_16px_40px_-36px_rgba(0,0,0,0.5)] hover:border-gold/40"
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
      </Tilt>
    </Reveal>
  );
}

export function Services() {
  const { lang } = useLang();
  // Twenty one treatments in one column made the phone scroll forever, so the
  // three areas share the space and the visitor picks one.
  const [tab, setTab] = useState(SERVICE_GROUPS[0].key);
  // One open card at a time keeps the grid from jumping around.
  const [openId, setOpenId] = useState<string | null>(null);

  const active =
    SERVICE_GROUPS.find((g) => g.key === tab) ?? SERVICE_GROUPS[0];

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
            <RevealWords
              segments={[
                { text: t.services.title[lang] },
                {
                  text: t.services.titleAccent[lang],
                  className: "text-gold-gradient italic",
                },
              ]}
            />
          </h2>
          <p className="mt-4 text-base text-ink/55">
            {t.services.subtitle[lang]}
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div
            role="tablist"
            aria-label={t.services.title[lang]}
            className="mx-auto mt-9 flex max-w-2xl items-center justify-center gap-1 rounded-full border border-ink/8 bg-white p-1.5 shadow-[0_16px_40px_-36px_rgba(0,0,0,0.5)] sm:gap-2"
          >
            {SERVICE_GROUPS.map((group) => {
              const on = group.key === tab;
              return (
                <button
                  key={group.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setTab(group.key);
                    setOpenId(null);
                  }}
                  className={cn(
                    "min-h-[42px] flex-1 whitespace-nowrap rounded-full px-2.5 text-xs font-medium transition-all duration-300 sm:px-4 sm:text-[13px] md:text-sm",
                    on
                      ? "bg-gradient-to-br from-gold-light to-gold-deep text-white shadow-[0_10px_24px_-14px_rgba(184,145,47,0.9)]"
                      : "text-ink/60 hover:text-gold-deep"
                  )}
                >
                  <span className="sm:hidden">{group.short[lang]}</span>
                  <span className="hidden sm:inline">{group.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-5 text-center text-xs uppercase tracking-[0.2em] text-gold-deep/70">
          {t.services.hint[lang]}
        </p>

        <div
          key={active.key}
          className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {active.items.map((service, i) => {
            const id = `${active.key}-${i}`;
            return (
              <ServiceCard
                key={id}
                service={service}
                index={i}
                lang={lang}
                open={openId === id}
                onToggle={() => setOpenId(openId === id ? null : id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
