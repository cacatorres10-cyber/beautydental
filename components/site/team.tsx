"use client";

import { MessageCircle } from "lucide-react";
import { useLang } from "./language-provider";
import { usePhotos } from "./photos-provider";
import { Reveal } from "./reveal";
import { t, waLink, TEAM, type TeamMember } from "@/lib/content";
import { cn } from "@/lib/utils";

/** "Dra. Melany Rosa" -> "MR", used while a portrait is still missing. */
function initials(name: string) {
  return name
    .replace(/^(dra?|dr)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function Member({ member, photo }: { member: TeamMember; photo?: string }) {
  const { lang } = useLang();
  const href = waLink(
    t.team.waMessage[lang].replace("{name}", member.name)
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block text-center"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ivory ring-1 ring-gold/20 transition-all duration-500 group-hover:ring-gold/50 group-hover:shadow-[0_24px_50px_-30px_rgba(120,90,20,0.55)]">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={member.name}
            loading="lazy"
            // Portraits are framed head and shoulders, so anchoring the crop
            // to the top keeps faces in the card at every width.
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white to-[#f4efe3]">
            <span className="text-gold-gradient font-serif text-4xl">
              {initials(member.name)}
            </span>
          </div>
        )}

        {/* Always offered on touch, revealed on hover on a desktop. The wash
            turns dark over a photo and gold over the cream placeholder. */}
        <span
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t to-transparent pb-3 pt-10 text-[11px] font-medium tracking-wide transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100",
            photo ? "from-ink/75 text-white" : "from-gold/25 text-gold-deep"
          )}
        >
          <MessageCircle size={13} />
          {t.team.book[lang]}
        </span>
      </div>

      <h3 className="mt-4 font-serif text-base leading-tight text-ink transition-colors duration-300 group-hover:text-gold-deep md:text-lg">
        {member.name}
      </h3>
      <p className="mt-1 text-[11px] leading-snug text-ink/50 md:text-xs">
        {member.role[lang]}
      </p>
    </a>
  );
}

export function Team() {
  const { lang } = useLang();
  const photos = usePhotos();

  return (
    <section
      id="equipo"
      className="relative scroll-mt-20 bg-white pb-24 pt-4 md:pb-32"
    >
      <div className="container mx-auto px-5 md:px-6">
        {photos.teamBand ? (
          <Reveal className="mb-14 md:mb-20">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-gold/15 shadow-[0_40px_90px_-60px_rgba(60,45,10,0.7)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos.teamBand}
                alt={t.team.eyebrow[lang]}
                className="h-full w-full object-cover object-[center_22%] aspect-[4/3] sm:aspect-[16/7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-5 font-serif text-lg leading-snug text-white md:p-9 md:text-2xl">
                {t.team.band[lang]}
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="hairline mx-auto mb-16 h-px w-full max-w-3xl md:mb-20" />
        )}

        <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-deep/60" />
            {t.team.eyebrow[lang]}
            <span className="h-px w-8 bg-gold-deep/60" />
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-ink md:text-5xl">
            {t.team.title[lang]}{" "}
            <span className="text-gold-gradient italic">
              {t.team.titleAccent[lang]}
            </span>
          </h2>
          <p className="mt-5 text-lg text-ink/55">{t.team.subtitle[lang]}</p>
        </Reveal>

        {/* Flex rather than a grid so an odd last row stays centred. The
            narrower block keeps it at three across, in two even rows. */}
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5">
          {TEAM.map((member, i) => (
            <Reveal
              key={member.key}
              delay={i * 80}
              className="w-[calc(50%-0.625rem)] sm:w-[calc(33.333%-0.834rem)]"
            >
              <Member member={member} photo={photos.team[member.key]} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
