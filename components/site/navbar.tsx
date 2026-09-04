"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { LanguageToggle } from "./language-toggle";
import { useLang } from "./language-provider";
import { t, waLink, CONTACT } from "@/lib/content";
import { cn } from "@/lib/utils";

const links = [
  { id: "servicios", key: "services" as const },
  { id: "nosotros", key: "about" as const },
  { id: "equipo", key: "team" as const },
  { id: "galeria", key: "gallery" as const },
  { id: "testimonios", key: "testimonials" as const },
  { id: "contacto", key: "contact" as const },
];

export function Navbar() {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 bg-white/85 backdrop-blur-md border-b border-ink/5 shadow-[0_8px_30px_-20px_rgba(0,0,0,0.35)]"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-5 md:px-6 flex items-center justify-between gap-4">
        <a href="#top" aria-label="Beauty Dental & Skin" className="shrink-0">
          <Logo tone="dark" />
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm text-ink/70 hover:text-gold-deep transition-colors duration-300"
            >
              {t.nav[l.key][lang]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <a
            href={waLink(t.contact.waMessage[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold hidden sm:inline-flex !px-5 !py-2.5"
          >
            {t.nav.cta[lang]}
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 ease-in-out",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-5 pt-4 pb-6 mt-3 bg-white/95 backdrop-blur-md border-t border-ink/5 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] items-center text-base text-ink/80 hover:text-gold-deep border-b border-ink/5"
            >
              {t.nav[l.key][lang]}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4">
            <LanguageToggle />
            <a
              href={waLink(t.contact.waMessage[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold !px-5 !py-2.5"
              onClick={() => setOpen(false)}
            >
              {t.nav.cta[lang]}
            </a>
          </div>
          <p className="pt-4 text-xs text-ink/40">{CONTACT.phones.join("  ·  ")}</p>
        </div>
      </div>
    </header>
  );
}
