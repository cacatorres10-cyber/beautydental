"use client";

import { Instagram, MessageCircle, Phone, Mail } from "lucide-react";
import { Logo } from "./logo";
import { useLang } from "./language-provider";
import { t, CONTACT, waLink } from "@/lib/content";

const navLinks = [
  { id: "servicios", key: "services" as const },
  { id: "nosotros", key: "about" as const },
  { id: "galeria", key: "gallery" as const },
  { id: "testimonios", key: "testimonials" as const },
  { id: "contacto", key: "contact" as const },
];

export function Footer() {
  const { lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-white/70 overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 pt-20 pb-10 relative z-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
              {t.footer.tagline[lang]}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold-light transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={waLink(t.contact.waMessage[lang])}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-gold hover:text-gold-light transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-light/80">
              {t.footer.nav[lang]}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="inline-flex min-h-[36px] items-center text-white/60 hover:text-white transition-colors"
                  >
                    {t.nav[l.key][lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-gold-light/80">
              {t.footer.contact[lang]}
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold-light/70" />
                <a href={`tel:${CONTACT.phones[0].replace(/[^\d+]/g, "")}`} className="inline-flex min-h-[36px] items-center hover:text-white">
                  {CONTACT.phones[0]}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold-light/70" />
                <a href={`tel:${CONTACT.phones[1].replace(/[^\d+]/g, "")}`} className="inline-flex min-h-[36px] items-center hover:text-white">
                  {CONTACT.phones[1]}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold-light/70" />
                <a href={`mailto:${CONTACT.email}`} className="inline-flex min-h-[36px] items-center hover:text-white break-all">
                  {CONTACT.email}
                </a>
              </li>
              <li className="text-white/50">
                {CONTACT.city}, {CONTACT.country[lang]}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-white/40">
            © {year} {CONTACT.brand}. {t.footer.rights[lang]}
          </p>
          <p className="text-xs text-white/30">
            {CONTACT.instagramHandle}
          </p>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="pointer-events-none select-none absolute -bottom-6 md:-bottom-10 left-0 right-0 text-center">
        <span className="font-serif font-bold tracking-tighter text-white/[0.04] text-[18vw] leading-none">
          Beauty Dental
        </span>
      </div>
    </footer>
  );
}
