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
  doctor: "Dra. Sindy Silvestre",
  specialty: {
    es: "Odontología Estética y Armonización Facial",
    en: "Aesthetic Dentistry & Facial Harmonization",
  },
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

/** Stock photos tried, in order, while a local file is still missing. */
export const IMAGE_FALLBACKS: Record<string, string[]> = {
  "/images/hero.jpg": [px(3762453, 1400)],
  "/images/intro.jpg": [px(3985360, 1200)],
  "/images/smile.jpg": [px(6528856, 1600)],
  "/images/doctor.jpg": [px(5215024, 1000)],
  "/images/clinica.jpg": [px(3997379, 1600)],
  "/images/gallery-1.jpg": [px(3762453, 700)],
  "/images/gallery-2.jpg": [px(3985360, 700)],
  "/images/gallery-3.jpg": [px(6528856, 700)],
  "/images/gallery-4.jpg": [px(3738349, 700)],
  "/images/gallery-5.jpg": [px(3997379, 700)],
  "/images/gallery-6.jpg": [px(3845810, 700)],
  "/images/gallery-7.jpg": [px(4270091, 700)],
  "/images/gallery-8.jpg": [px(3762800, 700)],
  "/images/avatar-1.jpg": [px(774909, 200)],
  "/images/avatar-2.jpg": [px(415829, 200)],
  "/images/avatar-3.jpg": [px(1181686, 200)],
  "/images/avatar-4.jpg": [px(762020, 200)],
};

/* --------------------------- Hero stock banner ---------------------------
 * Wide stock photos for the opening banner, tried in order. The last resort
 * is the clinic's own composed banner in `public/images/hero.webp`, so the
 * hero still looks right if none of these load.
 *
 * To use a different photo, put its URL first in this list. Any wide (16:9)
 * image works — the banner expands as the visitor scrolls.
 * --------------------------------------------------------------------- */
export const HERO_BANNERS = [
  px(3985360, 1920), // facial aesthetics treatment
  px(3997379, 1920), // clinic / skincare
  px(3762453, 1920), // radiant smile
];

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

export const FACIAL_SERVICES: ServiceItem[] = [
  {
    icon: "Syringe",
    title: { es: "Toxina Botulínica", en: "Botulinum Toxin" },
    desc: {
      es: "Suaviza arrugas de expresión y rejuvenece tu mirada conservando tu naturalidad.",
      en: "Softens expression lines and refreshes your look while keeping you natural.",
    },
  },
  {
    icon: "Wand2",
    title: { es: "Rellenos con Ácido Hialurónico", en: "Hyaluronic Acid Fillers" },
    desc: {
      es: "Volumen, contorno e hidratación para devolver frescura a tu rostro.",
      en: "Volume, contour and hydration to bring freshness back to your face.",
    },
  },
  {
    icon: "Sparkles",
    title: { es: "Armonización Orofacial", en: "Orofacial Harmonization" },
    desc: {
      es: "Equilibramos las proporciones de tu rostro para un resultado armónico y natural.",
      en: "We balance your facial proportions for a harmonious, natural result.",
    },
  },
  {
    icon: "Flower2",
    title: { es: "Diseño de Labios", en: "Lip Design" },
    desc: {
      es: "Labios definidos, hidratados y proporcionales a tu rostro.",
      en: "Defined, hydrated lips in proportion with your face.",
    },
  },
  {
    icon: "HeartPulse",
    title: { es: "Bioestimuladores de Colágeno", en: "Collagen Bio-stimulators" },
    desc: {
      es: "Estimulan tu propio colágeno para una piel firme y luminosa a largo plazo.",
      en: "Stimulate your own collagen for firm, luminous skin over the long term.",
    },
  },
  {
    icon: "Droplets",
    title: { es: "Limpieza Facial & Skincare", en: "Facial Cleansing & Skincare" },
    desc: {
      es: "Higiene facial profunda y una rutina diseñada para tu tipo de piel.",
      en: "Deep facial cleansing and a routine designed for your skin type.",
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
      es: "Diseño de sonrisa y armonización facial. Donde tu sonrisa y tu rostro se equilibran.",
      en: "Smile design and facial harmonization. Where your smile and your face come into balance.",
    },
    body: {
      es: "En Beauty Dental & Skin unimos odontología estética y armonización facial para revelar tu versión más segura. Cada tratamiento es diseñado a la medida de tu rostro y de tus metas.",
      en: "At Beauty Dental & Skin we combine aesthetic dentistry and facial harmonization to reveal your most confident self. Every treatment is tailored to your face and your goals.",
    },
    primary: { es: "Reservar por WhatsApp", en: "Book on WhatsApp" },
    secondary: { es: "Ver servicios", en: "Explore services" },
  },
  intro: {
    eyebrow: { es: "Nuestra filosofía", en: "Our philosophy" },
    title: {
      es: "La sonrisa y el rostro se diseñan juntos, nunca por separado.",
      en: "The smile and the face are designed together, never apart.",
    },
    body: {
      es: "Creemos que la belleza real nace del equilibrio. Por eso la Dra. Sindy Silvestre combina odontología de precisión con armonización facial: cada sonrisa se proyecta en armonía con tus proporciones, y cada tratamiento facial respeta tu expresión natural.",
      en: "We believe real beauty is born from balance. That is why Dr. Sindy Silvestre combines precision dentistry with facial harmonization: every smile is planned in harmony with your proportions, and every facial treatment respects your natural expression.",
    },
  },
  services: {
    eyebrow: { es: "Lo que hacemos", en: "What we do" },
    title: { es: "Tratamientos", en: "Treatments" },
    titleAccent: { es: "a tu medida", en: "made for you" },
    dental: { es: "Odontología Estética", en: "Aesthetic Dentistry" },
    skin: { es: "Armonización Facial", en: "Facial Harmonization" },
    subtitle: {
      es: "Dos especialidades que trabajan juntas: tu sonrisa y la armonía de tu rostro.",
      en: "Two specialties that work as one: your smile and the harmony of your face.",
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
    eyebrow: { es: "Casos reales", en: "Real cases" },
    title: { es: "Antes y después", en: "Before & after" },
    body: {
      es: "Resultados reales de nuestros pacientes. Cada caso es único y se planifica de forma personalizada.",
      en: "Real results from our patients. Every case is unique and planned individually.",
    },
  },
  about: {
    eyebrow: { es: "Conoce a tu especialista", en: "Meet your specialist" },
    title: { es: "Dra. Sindy Silvestre", en: "Dr. Sindy Silvestre" },
    role: {
      es: "Odontología Estética y Armonización Facial",
      en: "Aesthetic Dentistry & Facial Harmonization",
    },
    body1: {
      es: "Con experiencia en diseños de sonrisas y estética facial, la Dra. Sindy Silvestre lidera Beauty Dental & Skin con una visión clara: unir salud, arte y equilibrio en cada tratamiento.",
      en: "With experience in smile design and facial aesthetics, Dr. Sindy Silvestre leads Beauty Dental & Skin with a clear vision: to unite health, art and balance in every treatment.",
    },
    body2: {
      es: "Su mirada integral —donde la sonrisa y la armonía del rostro se planifican juntas— y su trato cercano la han convertido en un referente de la estética dental y facial en La Romana.",
      en: "Her integrated approach — where the smile and facial harmony are planned together — and her warm care have made her a reference for dental and facial aesthetics in La Romana.",
    },
    note: {
      es: "",
      en: "",
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
      es: "Odontología estética y armonización facial en La Romana.",
      en: "Aesthetic dentistry and facial harmonization in La Romana.",
    },
    rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
    nav: { es: "Navegación", en: "Navigation" },
    contact: { es: "Contacto", en: "Contact" },
    follow: { es: "Síguenos", en: "Follow us" },
  },
} as const;
