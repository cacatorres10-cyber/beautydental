"use client";

import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useLang } from "./language-provider";
import { Reveal } from "./reveal";
import { RevealWords } from "@/components/motion/reveal-words";
import { t, VIDEO_CAPTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

/** File name without path or extension, used to look up a caption. */
function captionKey(src: string) {
  const file = decodeURIComponent(src).split("/").pop() ?? "";
  return file.replace(/\.[^.]+$/, "");
}

function VideoCard({
  src,
  index,
  registerRef,
  onPlay,
}: {
  src: string;
  index: number;
  registerRef: (el: HTMLVideoElement | null) => void;
  onPlay: (el: HTMLVideoElement) => void;
}) {
  const { lang } = useLang();
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const caption = VIDEO_CAPTIONS[captionKey(src)];

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      onPlay(el);
      void el.play();
    } else {
      el.pause();
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  return (
    <Reveal delay={index * 120}>
      <figure className="group relative">
        <div
          className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-ink ring-1 ring-gold/25 shadow-[0_30px_60px_-35px_rgba(60,45,10,0.6)] cursor-pointer"
          onClick={toggle}
        >
          <video
            ref={(el) => {
              ref.current = el;
              registerRef(el);
            }}
            // The media fragment makes browsers paint a real frame as the
            // poster, so the card never starts as a black rectangle.
            src={`${src}#t=0.6`}
            preload="metadata"
            playsInline
            controls={playing}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            className="h-full w-full object-cover"
          />

          {/* Play affordance — hidden once the video is running */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              playing ? "opacity-0" : "opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-gold-deep shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play size={24} className="ml-1" fill="currentColor" />
            </span>
          </div>

          {/* Caption over the video */}
          {caption ? (
            <figcaption
              className={cn(
                "pointer-events-none absolute bottom-0 left-0 right-0 p-5 text-white transition-opacity duration-300",
                playing ? "opacity-0" : "opacity-100"
              )}
            >
              <span className="block font-serif text-xl leading-tight">
                {caption.name}
              </span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.22em] text-gold-light">
                {caption.role[lang]}
              </span>
            </figcaption>
          ) : null}

          {/* Sound toggle, only useful while playing */}
          {playing ? (
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-white backdrop-blur transition-colors hover:bg-ink/80"
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          ) : null}
        </div>
      </figure>
    </Reveal>
  );
}

export function VideoTestimonials({ videos }: { videos: string[] }) {
  const { lang } = useLang();
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  // Two testimonials talking at once helps nobody.
  const pauseOthers = (playing: HTMLVideoElement) => {
    refs.current.forEach((el) => {
      if (el && el !== playing) el.pause();
    });
  };

  if (videos.length === 0) return null;

  return (
    <section id="testimonios" className="relative bg-white py-24 md:py-32">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <span className="eyebrow justify-center">
            <span className="h-px w-8 bg-gold-deep/60" />
            {t.testimonials.eyebrow[lang]}
            <span className="h-px w-8 bg-gold-deep/60" />
          </span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl text-ink leading-tight">
            <RevealWords segments={[{ text: t.testimonials.title[lang] }]} />
          </h2>
          <p className="mt-5 text-lg text-ink/55">{t.testimonials.body[lang]}</p>
        </Reveal>

        <div
          className={cn(
            "mx-auto grid gap-6 sm:gap-8",
            videos.length === 1
              ? "max-w-sm"
              : videos.length === 2
                ? "max-w-3xl grid-cols-1 sm:grid-cols-2"
                : "max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {videos.map((src, i) => (
            <VideoCard
              key={src}
              src={src}
              index={i}
              registerRef={(el) => {
                refs.current[i] = el;
              }}
              onPlay={pauseOthers}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
