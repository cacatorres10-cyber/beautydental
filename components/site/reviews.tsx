"use client";

import { Star, ExternalLink, PenLine } from "lucide-react";
import { useLang } from "./language-provider";
import { Reveal } from "./reveal";
import {
  t,
  GOOGLE_REVIEWS,
  GOOGLE_RATING,
  mapsPlaceUrl,
  type GoogleReview,
} from "@/lib/content";
import { Tilt } from "@/components/motion/tilt";
import { RevealWords } from "@/components/motion/reveal-words";

/** The Google "G", drawn rather than loaded, since nothing external loads. */
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2.1 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.1z"
      />
      <path
        fill="#34A853"
        d="M24 46c6 0 11-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8 41.1 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2v-5.7H4.5C3 17 2 20.4 2 24s1 7 2.5 9.9l7.3-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C35 4.3 30 2 24 2 15.4 2 8 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z"
      />
    </svg>
  );
}

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={
            n <= Math.round(rating)
              ? "fill-gold-mid text-gold-mid"
              : "text-ink/20"
          }
        />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initials = review.name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <Tilt max={5} lift={6}>
      <div className="flex h-full flex-col rounded-2xl border border-ink/8 bg-white p-6 shadow-[0_16px_40px_-36px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-light/30 to-gold/10 font-serif text-sm text-gold-deep ring-1 ring-gold/20">
            {initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-ink">
              {review.name}
            </span>
            <span className="block text-xs text-ink/45">{review.date}</span>
          </span>
          <GoogleG />
        </div>

        <span className="mt-4">
          <Stars rating={review.rating} />
        </span>

        {/* Their words, exactly as written. */}
        <p className="mt-3 text-[13px] leading-relaxed text-ink/70 md:text-sm">
          {review.text}
        </p>
      </div>
    </Tilt>
  );
}

export function Reviews() {
  const { lang } = useLang();
  const hasReviews = GOOGLE_REVIEWS.length > 0;

  return (
    <section id="resenas" className="relative scroll-mt-20 bg-ivory py-20 md:py-28">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-deep/60" />
            {t.reviews.eyebrow[lang]}
            <span className="h-px w-8 bg-gold-deep/60" />
          </span>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-ink md:text-5xl">
            <RevealWords
              segments={[
                { text: t.reviews.title[lang] },
                {
                  text: t.reviews.titleAccent[lang],
                  className: "text-gold-gradient italic",
                },
              ]}
            />
          </h2>
          <p className="mt-4 text-base text-ink/55">{t.reviews.body[lang]}</p>

          {GOOGLE_RATING ? (
            <span className="mt-6 inline-flex items-center gap-3 rounded-full border border-ink/8 bg-white px-5 py-2.5 shadow-[0_16px_40px_-36px_rgba(0,0,0,0.5)]">
              <GoogleG size={20} />
              <span className="font-serif text-xl text-ink">
                {GOOGLE_RATING.score.toFixed(1)}
              </span>
              <Stars rating={GOOGLE_RATING.score} size={14} />
              <span className="text-xs text-ink/45">
                {GOOGLE_RATING.count}
              </span>
            </span>
          ) : null}
        </Reveal>

        {hasReviews ? (
          <div className="mt-12 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GOOGLE_REVIEWS.map((review, i) => (
              <Reveal key={i} delay={(i % 3) * 90} className="h-full">
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        ) : null}

        <Reveal delay={120}>
          {/* Without the review texts the section would be a headline over
              empty space, so the links become a card of their own. */}
          <div
            className={
              hasReviews
                ? "mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                : "mx-auto mt-10 flex max-w-xl flex-col items-center gap-5 rounded-3xl border border-ink/8 bg-white px-6 py-10 text-center shadow-[0_24px_60px_-45px_rgba(0,0,0,0.6)]"
            }
          >
            {hasReviews ? null : (
              <>
                <GoogleG size={32} />
                <p className="text-sm leading-relaxed text-ink/60">
                  {t.reviews.empty[lang]}
                </p>
              </>
            )}
            <span className="flex flex-col items-center gap-3 sm:flex-row">
            <a
              href={mapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <GoogleG />
              {t.reviews.cta[lang]}
              <ExternalLink size={15} />
            </a>
            <a
              href={mapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <PenLine size={16} />
              {t.reviews.write[lang]}
            </a>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
