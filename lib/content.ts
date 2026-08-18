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
  /** One line on the closed card. */
  desc: Record<Lang, string>;
  /** Shown when the visitor opens the card. */
  details: Record<Lang, string>;
};

export const DENTAL_SERVICES: ServiceItem[] = [
  {
    icon: "Smile",
    title: { es: "Diseño de Sonrisa", en: "Smile Design" },
    desc: {
      es: "Planificación digital para crear la sonrisa que armoniza con tu rostro.",
      en: "Digital planning to craft the smile that harmonizes with your face.",
    },
    details: {
      es: "Estudiamos tus proporciones faciales, el color de tu piel y la forma de tus labios para proyectar la sonrisa que te queda mejor. Verás una simulación antes de tocar un solo diente, y decidimos juntas cada detalle.",
      en: "We study your facial proportions, skin tone and lip shape to plan the smile that suits you best. You see a simulation before a single tooth is touched, and we decide every detail together.",
    },
  },
  {
    icon: "Gem",
    title: { es: "Carillas y Lentes de Contacto", en: "Veneers & Dental Lenses" },
    desc: {
      es: "Porcelana ultrafina para una sonrisa natural, brillante y duradera.",
      en: "Ultra-thin porcelain for a natural, radiant and lasting smile.",
    },
    details: {
      es: "Láminas de porcelana ultrafinas que corrigen color, forma, tamaño y pequeños espacios entre dientes. Son resistentes a las manchas y, bien cuidadas, duran muchos años sin perder brillo.",
      en: "Ultra-thin porcelain layers that correct color, shape, size and small gaps between teeth. They resist staining and, cared for properly, last for years without losing their shine.",
    },
  },
  {
    icon: "Sparkles",
    title: { es: "Blanqueamiento Dental", en: "Teeth Whitening" },
    desc: {
      es: "Recupera el blanco natural de tus dientes de forma segura y controlada.",
      en: "Restore your teeth's natural whiteness safely and comfortably.",
    },
    details: {
      es: "Aclaramos varios tonos con geles profesionales y controlamos la sensibilidad durante todo el proceso. Ideal antes de un evento o como primer paso de un diseño de sonrisa.",
      en: "We lighten several shades with professional gels and manage sensitivity throughout. Ideal before an event, or as the first step of a smile design.",
    },
  },
  {
    icon: "AlignHorizontalDistributeCenter",
    title: { es: "Ortodoncia y Alineadores", en: "Orthodontics & Aligners" },
    desc: {
      es: "Brackets estéticos y alineadores invisibles para una mordida perfecta.",
      en: "Aesthetic braces and invisible aligners for a perfect bite.",
    },
    details: {
      es: "Alineamos tus dientes con brackets estéticos o con alineadores transparentes, casi invisibles y removibles. Planificamos el recorrido completo para que sepas cuánto tiempo tomará.",
      en: "We align your teeth with aesthetic braces or clear aligners, nearly invisible and removable. We map the full path so you know how long it will take.",
    },
  },
  {
    icon: "Anchor",
    title: { es: "Implantes Dentales", en: "Dental Implants" },
    desc: {
      es: "Reemplazo fijo y natural de piezas ausentes con tecnología de precisión.",
      en: "Fixed, natural replacement of missing teeth with precision technology.",
    },
    details: {
      es: "Reponemos la pieza perdida con un implante de titanio y una corona hecha a la medida de tu boca. Recuperas la mordida, el habla y la confianza para sonreír sin taparte.",
      en: "We replace the missing tooth with a titanium implant and a crown made to match your mouth. You get back your bite, your speech and the confidence to smile openly.",
    },
  },
  {
    icon: "Stethoscope",
    title: { es: "Odontología General", en: "General Dentistry" },
    desc: {
      es: "Prevención, limpieza y salud bucal para toda la familia.",
      en: "Prevention, cleaning and oral health for the whole family.",
    },
    details: {
      es: "Limpiezas, resinas, tratamiento de caries y revisiones periódicas para toda la familia. La base de cualquier tratamiento estético es una boca sana.",
      en: "Cleanings, fillings, cavity treatment and regular check-ups for the whole family. A healthy mouth is the foundation of any aesthetic treatment.",
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
    details: {
      es: "Relaja de forma puntual los músculos que marcan las líneas de expresión en frente, entrecejo y contorno de ojos. El resultado se ve a los pocos días y conserva tus gestos naturales.",
      en: "Selectively relaxes the muscles that create expression lines on the forehead, brow and around the eyes. Results show within days and your natural expressions stay intact.",
    },
  },
  {
    icon: "Wand2",
    title: { es: "Rellenos con Ácido Hialurónico", en: "Hyaluronic Acid Fillers" },
    desc: {
      es: "Volumen, contorno e hidratación para devolver frescura a tu rostro.",
      en: "Volume, contour and hydration to bring freshness back to your face.",
    },
    details: {
      es: "Reponemos volumen donde el rostro lo ha perdido: pómulos, surcos, ojeras y mentón. Es una sustancia que tu cuerpo reconoce, y el resultado es inmediato y reversible.",
      en: "We restore volume where the face has lost it: cheeks, folds, under-eyes and chin. It is a substance your body recognizes, and the result is immediate and reversible.",
    },
  },
  {
    icon: "Sparkles",
    title: { es: "Armonización Orofacial", en: "Orofacial Harmonization" },
    desc: {
      es: "Equilibramos las proporciones de tu rostro para un resultado armónico y natural.",
      en: "We balance your facial proportions for a harmonious, natural result.",
    },
    details: {
      es: "Un plan que mira el rostro completo en vez de tratar una zona aislada. Combinamos los procedimientos necesarios para equilibrar proporciones y que todo converse con tu sonrisa.",
      en: "A plan that looks at the whole face instead of treating one isolated area. We combine the procedures needed to balance proportions so everything works with your smile.",
    },
  },
  {
    icon: "Flower2",
    title: { es: "Diseño de Labios", en: "Lip Design" },
    desc: {
      es: "Labios definidos, hidratados y proporcionales a tu rostro.",
      en: "Defined, hydrated lips in proportion with your face.",
    },
    details: {
      es: "Definimos el borde, hidratamos y ajustamos la proporción entre labio superior e inferior. Buscamos labios que se vean tuyos, no rellenos de más.",
      en: "We define the border, hydrate, and adjust the proportion between upper and lower lip. The goal is lips that look like yours, never overfilled.",
    },
  },
  {
    icon: "HeartPulse",
    title: { es: "Bioestimuladores de Colágeno", en: "Collagen Bio-stimulators" },
    desc: {
      es: "Estimulan tu propio colágeno para una piel firme y luminosa a largo plazo.",
      en: "Stimulate your own collagen for firm, luminous skin over the long term.",
    },
    details: {
      es: "En lugar de rellenar, estimulan a tu piel a producir su propio colágeno. La mejora aparece de forma gradual y la firmeza se sostiene durante meses.",
      en: "Instead of filling, they prompt your skin to produce its own collagen. The improvement appears gradually and the firmness holds for months.",
    },
  },
  {
    icon: "Droplets",
    title: { es: "Limpieza Facial & Skincare", en: "Facial Cleansing & Skincare" },
    desc: {
      es: "Higiene facial profunda y una rutina diseñada para tu tipo de piel.",
      en: "Deep facial cleansing and a routine designed for your skin type.",
    },
    details: {
      es: "Higiene profunda que retira impurezas y células muertas, seguida de activos según tu tipo de piel. Terminas con una rutina de casa hecha para ti, no genérica.",
      en: "A deep cleanse that clears impurities and dead cells, followed by actives matched to your skin type. You leave with a home routine built for you, not a generic one.",
    },
  },
];

/* ------------------------- Video testimonials --------------------------
 * Videos are read straight from `public/media/testimonials/` — drop new ones
 * in and they appear. To label one, add an entry keyed by its file name
 * (without extension); anything unlabelled simply shows no caption.
 * --------------------------------------------------------------------- */
export const VIDEO_CAPTIONS: Record<
  string,
  { name: string; role: Record<Lang, string> }
> = {
  "01-fernando-abad": {
    name: "Fernando Abad",
    role: { es: "Pitcher profesional", en: "Professional pitcher" },
  },
  "02-paciente-sonrisa": {
    name: "Paciente Beauty",
    role: { es: "Diseño de sonrisa", en: "Smile design" },
  },
};

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
    title: { es: "Belleza que se Siente", en: "Beauty You Feel" },
    scroll: { es: "Desliza para descubrir", en: "Scroll to discover" },
    lead: {
      es: "Odontología estética y armonización facial. Porque verte bien es, sobre todo, sentirte segura de ti.",
      en: "Aesthetic dentistry and facial harmonization. Because looking good is, above all, feeling sure of yourself.",
    },
    body: {
      es: "En Beauty Dental & Skin cuidamos tu sonrisa y la armonía de tu rostro con un mismo objetivo: tu autoestima. Cada tratamiento se diseña a la medida de tus rasgos y de tus metas.",
      en: "At Beauty Dental & Skin we care for your smile and the harmony of your face with one goal: your confidence. Every treatment is designed around your features and your goals.",
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
    cta: { es: "Consultar por WhatsApp", en: "Ask on WhatsApp" },
    hint: { es: "Toca un tratamiento para ver más", en: "Tap a treatment to see more" },
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
      es: "Su mirada integral, donde la sonrisa y la armonía del rostro se planifican juntas, y su trato cercano la han convertido en un referente de la estética dental y facial en La Romana.",
      en: "Her integrated approach, where the smile and facial harmony are planned together, and her warm care have made her a reference for dental and facial aesthetics in La Romana.",
    },
    note: {
      es: "",
      en: "",
    },
  },
  testimonials: {
    eyebrow: { es: "Testimonios", en: "Testimonials" },
    title: { es: "Lo que dicen nuestros pacientes", en: "What our patients say" },
    body: {
      es: "Historias reales, contadas por quienes ya viven su nueva sonrisa.",
      en: "Real stories, told by the people already living their new smile.",
    },
    play: { es: "Reproducir", en: "Play" },
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
