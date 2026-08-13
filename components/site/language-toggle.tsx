"use client";

import { useLang } from "./language-provider";
import { cn } from "@/lib/utils";
import type { Lang } from "@/lib/content";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const options: Lang[] = ["es", "en"];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-ink/10 bg-white/70 p-0.5 backdrop-blur",
        className
      )}
      role="group"
      aria-label="Language selector"
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => setLang(opt)}
          className={cn(
            "rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
            lang === opt
              ? "bg-gradient-to-br from-gold-light to-gold-deep text-white shadow"
              : "text-ink/60 hover:text-ink"
          )}
          aria-pressed={lang === opt}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
