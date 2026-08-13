/* -------------------------------------------------------------------------
 * Beauty Dental & Skin — central content & data (bilingual ES / EN)
 * -------------------------------------------------------------------------
 * Everything the marketing site renders lives here so it is easy to edit.
 * Swap the placeholder photos (Pexels) and the SAMPLE testimonials for the
 * clinic's real assets — see README.md ("Cómo cambiar las fotos").
 * ---------------------------------------------------------------------- */

export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];
export const DEFAULT_LANG: Lang = "es";

/* ---- Business / contact information (verified from public listings) ---- */
export const CONTACT = {
  brand: "Beauty Dental & Skin",
  brandShort: "Beauty Dental & Skin",
  monogram: "BDS",
  phones: ["+1 (809) 349-0774", "+1 (849) 260-8631"],
  // wa.me number in international format, digits only.
  whatsapp: "18093490774",
  email: "Dra.ssilvestre@gmail.com",
  instagram: "https://www.instagram.com/beautydentalskin",
  instagramHandle: "@beautydentalskin",
  city: "La Romana",
  country: { es: "República Dominicana", en: "Dominican Republic" },
  // Used for the Google Maps embed. Refine with the exact address when known.
  mapsQuery: "La Romana, República Dominicana",
};

export const waLink = (text: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

/* --------------------------- Imagery (Pexels) ---------------------------
 * These are tasteful stock placeholders. They load in the browser; if a URL
 * ever fails, <SmartImage> shows an on-brand gold placeholder instead.
 * Replace the IDs/URLs below with the clinic's own photos.
 * --------------------------------------------------------------------- */
const px = (id: number, w = 1260) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/**
 * Drop the clinic's real photos into `public/images/` using the file names
 * listed in `public/images/_GUIA-FOTOS.md` and they are picked up automatically
 * — each entry tries the local file first and falls back to the stock photo,
 * so the site looks complete before and after the swap.
 */
export const IMAGES = {
  heroBg: "/brand/hero-bg.svg", // local, always renders
  heroMedia: "/images/hero.jpg",
  intro: "/images/intro.jpg",
  smileShowcase: "/images/smile.jpg",
  doctor: "/images/doctor.jpg", // portrait — Dra. Silvestre
  ctaBg: "/images/clinica.jpg",
  services: {
    dental: px(3845810, 900),
    skin: px(3738349, 900),
  },
  gallery: [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
    "/images/gallery-6.jpg",
    "/images/gallery-7.jpg",
    "/images/gallery-8.jpg",
  ],
  avatars: [
    "/images/avatar-1.jpg",
    "/images/avatar-2.jpg",
    "/images/avatar-3.jpg",
    "/images/avatar-4.jpg",
  ],
};

/** Stock photo shown while a local file in `public/images/` is still missing. */
export const IMAGE_FALLBACKS: Record<string, string> = {
  "/images/hero.jpg": px(3762453, 1400),
  "/images/intro.jpg": px(3985360, 1200),
  "/images/smile.jpg": px(6528856, 1600),
  "/images/doctor.jpg": px(5215024, 1000),
  "/images/clinica.jpg": px(3997379, 1600),
  "/images/gallery-1.jpg": px(3762453, 700),
  "/images/gallery-2.jpg": px(3985360, 700),
  "/images/gallery-3.jpg": px(6528856, 700),
  "/images/gallery-4.jpg": px(3738349, 700),
  "/images/gallery-5.jpg": px(3997379, 700),
  "/images/gallery-6.jpg": px(3845810, 700),
  "/images/gallery-7.jpg": px(4270091, 700),
  "/images/gallery-8.jpg": px(3762800, 700),
  "/images/avatar-1.jpg": px(774909, 200),
  "/images/avatar-2.jpg": px(415829, 200),
  "/images/avatar-3.jpg": px(1181686, 200),
  "/images/avatar-4.jpg": px(762020, 200),
};

/* ------------------------------ Icons map ------------------------------ */
// lucide-react icon names used per service (keeps content declarative).
export type IconName =
  | "Sparkles"
  | "Smile"
  | "Gem"
  | "AlignHorizontalDistributeCenter"
  | "Anchor"
  | "Stethoscope"
  | "Droplets"
  | "Syringe"
  | "Flower2"
  | "Wand2"
  | "HeartPulse";

/* ------------------------------- Content ------------------------------- */
type ServiceItem = {
  icon: IconName;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
};

export const DENTAL_SERVICES: ServiceItem[] = [
  {
    icon: "Smile",
    title: { es: "Diseño de Sonrisa", en: "Smile Design" },
    desc: {
      es: "Planificación digital para crear la sonrisa que armoniza con tu rostro.",
      en: "Digital planning to craft the smile that harmonizes with your face.",
    },
  },
  {
    icon: "Gem",
    title: { es: "Carillas y Lentes de Contacto", en: "Veneers & Dental Lenses" },
    desc: {
      es: "Porcelana ultrafina para una sonrisa natural, brillante y duradera.",
      en: "Ultra-thin porcelain for a natural, radiant and lasting smile.",
    },
  },
  {
    icon: "Sparkles",
    title: { es: "Blanqueamiento Dental", en: "Teeth Whitening" },
    desc: {
      es: "Recupera el blanco natural de tus dientes de forma segura y controlada.",
      en: "Restore your teeth's natural whiteness safely and comfortably.",
    },
  },
  {
    icon: "AlignHorizontalDistributeCenter",
    title: { es: "Ortodoncia y Alineadores", en: "Orthodontics & Aligners" },
    desc: {
      es: "Brackets estéticos y alineadores invisibles para una mordida perfecta.",
      en: "Aesthetic braces and invisible aligners for a perfect bite.",
    },
  },
  {
    icon: "Anchor",
    title: { es: "Implantes Dentales", en: "Dental Implants" },
    desc: {
      es: "Reemplazo fijo y natural de piezas ausentes con tecnología de precisión.",
      en: "Fixed, natural replacement of missing teeth with precision technology.",
    },
  },
  {
    icon: "Stethoscope",
    title: { es: "Odontología General", en: "General Dentistry" },
    desc: {
      es: "Prevención, limpieza y salud bucal para toda la familia.",
      en: "Prevention, cleaning and oral health for the whole family.",
    },
  },
];

export const SKIN_SERVICES: ServiceItem[] = [
  {
    icon: "Droplets",
    title: { es: "Limpieza Facial Profunda", en: "Deep Facial Cleansing" },
    desc: {
      es: "Higiene facial que renueva, purifica e ilumina tu piel al instante.",
      en: "A facial that renews, purifies and instantly brightens your skin.",
    },
  },
  {
    icon: "Flower2",
    title: { es: "Rejuvenecimiento Facial", en: "Facial Rejuvenation" },
    desc: {
      es: "Protocolos avanzados para una piel firme, luminosa y con menos líneas.",
      en: "Advanced protocols for firm, luminous skin with fewer fine lines.",
    },
  },
  {
    icon: "Syringe",
    title: { es: "Toxina Botulínica", en: "Botulinum Toxin" },
    desc: {
      es: "Suaviza arrugas de expresión conservando tu naturalidad.",
      en: "Softens expression lines while keeping you looking natural.",
    },
  },
  {
    icon: "Wand2",
    title: { es: "Rellenos con Ácido Hialurónico", en: "Hyaluronic Fillers" },
    desc: {
      es: "Volumen, contorno e hidratación para labios y rostro.",
      en: "Volume, contour and hydration for lips and face.",
    },
  },
  {
    icon: "HeartPulse",
    title: { es: "Bioestimulación & Skincare", en: "Bio-stimulation & Skincare" },
    desc: {
      es: "Estimula el colágeno y define una rutina hecha para tu piel.",
      en: "Boosts collagen and builds a routine made for your skin.",
    },
  },
];

/* ---- SAMPLE testimonials — replace with real reviews from Instagram ---- */
export const TESTIMONIALS: {
  name: string;
  location: Record<Lang, string>;
  quote: Record<Lang, string>;
}[] = [
  {
    name: "María F.",
    location: { es: "La Romana", en: "La Romana" },
    quote: {
      es: "Mi diseño de sonrisa superó todo lo que imaginé. Trato humano, resultados de lujo.",
      en: "My smile design exceeded everything I imagined. Warm care, luxury results.",
    },
  },
  {
    name: "Génesis P.",
    location: { es: "Higüey", en: "Higüey" },
    quote: {
      es: "La limpieza facial me dejó la piel radiante. Ya es mi clínica de confianza.",
      en: "The facial left my skin glowing. This is now my go-to clinic.",
    },
  },
  {
    name: "Carlos M.",
    location: { es: "Santo Domingo", en: "Santo Domingo" },
    quote: {
      es: "Profesionalismo total con los implantes. Volví a sonreír sin pensarlo.",
      en: "Total professionalism with my implants. I smile freely again.",
    },
  },
  {
    name: "Ana R.",
    location: { es: "La Romana", en: "La Romana" },
    quote: {
      es: "Blanqueamiento impecable y sin sensibilidad. El ambiente es precioso.",
      en: "Flawless whitening with no sensitivity. The space is gorgeous.",
    },
  },
];

/* ---- Trust stats (PLACEHOLDER numbers — adjust to real figures) ---- */
export const STATS: { value: string; label: Record<Lang, string> }[] = [
  { value: "+10", label: { es: "Años de experiencia", en: "Years of experience" } },
  { value: "+2.5K", label: { es: "Sonrisas transformadas", en: "Smiles transformed" } },
  { value: "+15", label: { es: "Tratamientos", en: "Treatments" } },
  { value: "4.9★", label: { es: "Valoración de pacientes", en: "Patient rating" } },
];

/* ------------------------- UI copy dictionary -------------------------- */
export const t = {
  nav: {
    services: { es: "Servicios", en: "Services" },
    about: { es: "Nosotros", en: "About" },
    gallery: { es: "Galería", en: "Gallery" },
    testimonials: { es: "Testimonios", en: "Reviews" },
    contact: { es: "Contacto", en: "Contact" },
    cta: { es: "Agenda tu cita", en: "Book now" },
  },
  hero: {
    eyebrow: { es: "La Romana · Rep. Dominicana", en: "La Romana · Dominican Republic" },
    title: { es: "Sonrisas Radiantes", en: "Radiant Smiles" },
    scroll: { es: "Desliza para descubrir", en: "Scroll to discover" },
    lead: {
      es: "Odontología estética y estética facial de lujo. Donde tu sonrisa y tu piel brillan juntas.",
      en: "Luxury aesthetic dentistry and facial care. Where your smile and skin shine together.",
    },
    body: {
      es: "En Beauty Dental & Skin unimos arte, ciencia y calidez para revelar tu versión más segura. Cada tratamiento es diseñado a la medida de tu rostro y de tus metas.",
      en: "At Beauty Dental & Skin we blend art, science and warmth to reveal your most confident self. Every treatment is tailored to your face and your goals.",
    },
    primary: { es: "Reservar por WhatsApp", en: "Book on WhatsApp" },
    secondary: { es: "Ver servicios", en: "Explore services" },
  },
  intro: {
    eyebrow: { es: "Nuestra filosofía", en: "Our philosophy" },
    title: {
      es: "Diseñamos sonrisas que transforman rostros y elevan la confianza.",
      en: "We design smiles that transform faces and elevate confidence.",
    },
    body: {
      es: "Creemos que la belleza real nace de la salud y del detalle. Por eso combinamos odontología de precisión con estética facial avanzada, en un espacio pensado para que te sientas cuidada de principio a fin.",
      en: "We believe real beauty is born from health and detail. That is why we combine precision dentistry with advanced facial aesthetics, in a space designed to care for you from start to finish.",
    },
  },
  services: {
    eyebrow: { es: "Lo que hacemos", en: "What we do" },
    title: { es: "Tratamientos", en: "Treatments" },
    titleAccent: { es: "a tu medida", en: "made for you" },
    dental: { es: "Odontología Estética", en: "Aesthetic Dentistry" },
    skin: { es: "Estética Facial & Skin", en: "Facial Aesthetics & Skin" },
    subtitle: {
      es: "Dos especialidades, un mismo objetivo: que te veas y te sientas espectacular.",
      en: "Two specialties, one goal: to make you look and feel spectacular.",
    },
    cta: { es: "Consultar tratamiento", en: "Ask about this" },
  },
  showcase: {
    eyebrow: { es: "Diseño de sonrisa digital", en: "Digital smile design" },
    title: { es: "Tu nueva sonrisa,", en: "Your new smile," },
    titleAccent: { es: "diseñada antes de empezar", en: "designed before we begin" },
    body: {
      es: "Visualizamos tu resultado con planificación digital. Verás tu sonrisa ideal antes de iniciar el tratamiento.",
      en: "We preview your result with digital planning. You'll see your ideal smile before treatment begins.",
    },
  },
  gallery: {
    eyebrow: { es: "Galería", en: "Gallery" },
    title: { es: "Resultados que hablan por sí solos", en: "Results that speak for themselves" },
    body: {
      es: "Un vistazo a nuestro trabajo y a nuestro espacio. Pronto, con las fotos reales de la clínica.",
      en: "A glimpse of our work and our space. Soon, with the clinic's real photos.",
    },
  },
  about: {
    eyebrow: { es: "Conoce a tu especialista", en: "Meet your specialist" },
    title: { es: "Dra. Silvestre", en: "Dr. Silvestre" },
    role: { es: "Odontóloga estética · Fundadora", en: "Aesthetic dentist · Founder" },
    body1: {
      es: "Apasionada por el detalle y por el bienestar de cada paciente, la Dra. Silvestre lidera Beauty Dental & Skin con una visión clara: unir salud, arte y elegancia en cada tratamiento.",
      en: "Passionate about detail and each patient's wellbeing, Dr. Silvestre leads Beauty Dental & Skin with a clear vision: to unite health, art and elegance in every treatment.",
    },
    body2: {
      es: "Su enfoque personalizado y su calidez han convertido a la clínica en un referente de estética dental y facial en La Romana.",
      en: "Her personalized approach and warmth have made the clinic a reference for dental and facial aesthetics in La Romana.",
    },
    note: {
      es: "* Foto y biografía de ejemplo — reemplázalas por las reales.",
      en: "* Sample photo and bio — replace with the real ones.",
    },
  },
  testimonials: {
    eyebrow: { es: "Testimonios", en: "Testimonials" },
    title: { es: "Lo que dicen nuestros pacientes", en: "What our patients say" },
  },
  ctaBand: {
    title: { es: "¿Lista para tu mejor sonrisa?", en: "Ready for your best smile?" },
    body: {
      es: "Agenda tu valoración hoy y descubre el plan hecho para ti.",
      en: "Book your assessment today and discover the plan made for you.",
    },
    button: { es: "Escríbenos por WhatsApp", en: "Message us on WhatsApp" },
  },
  contact: {
    eyebrow: { es: "Contacto", en: "Contact" },
    title: { es: "Visítanos o escríbenos", en: "Visit us or reach out" },
    body: {
      es: "Estaremos encantados de recibirte. Reserva tu cita por WhatsApp o llámanos.",
      en: "We would love to welcome you. Book by WhatsApp or give us a call.",
    },
    whatsapp: { es: "WhatsApp", en: "WhatsApp" },
    phone: { es: "Teléfonos", en: "Phone" },
    email: { es: "Correo", en: "Email" },
    social: { es: "Instagram", en: "Instagram" },
    location: { es: "Ubicación", en: "Location" },
    hours: { es: "Horario", en: "Hours" },
    hoursValue: {
      es: "Lun – Vie: 9:00 – 18:00 · Sáb: 9:00 – 14:00",
      en: "Mon – Fri: 9:00 – 18:00 · Sat: 9:00 – 14:00",
    },
    waMessage: {
      es: "¡Hola! Me gustaría agendar una cita en Beauty Dental & Skin.",
      en: "Hello! I would like to book an appointment at Beauty Dental & Skin.",
    },
  },
  footer: {
    tagline: {
      es: "Odontología estética y estética facial en La Romana.",
      en: "Aesthetic dentistry and facial care in La Romana.",
    },
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    nav: { es: "Navegación", en: "Navigation" },
    contact: { es: "Contacto", en: "Contact" },
    follow: { es: "Síguenos", en: "Follow us" },
  },
} as const;
