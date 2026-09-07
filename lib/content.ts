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

/* ------------------------------ Hero mode -------------------------------
 * "banner" fills the screen with the team photo, darkened, and the headline
 * over it. "video" and "image" instead open with a small card that grows as
 * the visitor scrolls, playing `public/media/hero.mp4` or showing
 * `public/images/hero.webp`. Every file stays in the repository, so
 * switching the opening is a one-word change here.
 * --------------------------------------------------------------------- */
export const HERO_MODE: "banner" | "image" | "video" = "banner";

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
  | "Microscope"
  | "Scissors"
  | "Droplets"
  | "Droplet"
  | "Syringe"
  | "Flower2"
  | "PenTool"
  | "Wand2"
  | "HeartPulse"
  | "Grip"
  | "FlaskConical"
  | "Layers"
  | "Dna"
  | "Atom"
  | "Waves";

/* ------------------------------- Content ------------------------------- */
type ServiceItem = {
  icon: IconName;
  title: Record<Lang, string>;
  /** One line on the closed card. */
  desc: Record<Lang, string>;
  /** Shown when the visitor opens the card. */
  details: Record<Lang, string>;
};

type ServiceGroup = {
  key: string;
  label: Record<Lang, string>;
  /** Fits the tab row on a phone, where the full label wraps. */
  short: Record<Lang, string>;
  items: ServiceItem[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    key: "dental",
    label: { es: "Odontología Estética", en: "Aesthetic Dentistry" },
    short: { es: "Odontología", en: "Dentistry" },
    items: [
      {
        icon: "Smile",
        title: { es: "Diseño de Sonrisa", en: "Smile Design" },
        desc: {
          es: "Proyectamos la sonrisa que armoniza con tu rostro antes de empezar.",
          en: "We plan the smile that harmonizes with your face before we begin.",
        },
        details: {
          es: "Estudiamos tus proporciones faciales, el color de tu piel y la forma de tus labios para proyectar la sonrisa que te queda mejor. Verás una simulación antes de tocar un solo diente y decidimos juntas cada detalle.",
          en: "We study your facial proportions, skin tone and lip shape to plan the smile that suits you best. You see a simulation before a single tooth is touched, and we decide every detail together.",
        },
      },
      {
        icon: "Gem",
        title: {
          es: "Carillas en Cerámica y Resina",
          en: "Ceramic and Composite Veneers",
        },
        desc: {
          es: "Cerámica o resina para corregir color, forma y tamaño de tus dientes.",
          en: "Ceramic or composite to correct the color, shape and size of your teeth.",
        },
        details: {
          es: "La cerámica ofrece el mayor brillo y resistencia a las manchas, y la resina permite un resultado más conservador en una sola cita. En la valoración te explicamos cuál conviene a tu caso y a tu presupuesto.",
          en: "Ceramic gives the highest shine and stain resistance, while composite allows a more conservative result in a single visit. At your assessment we explain which one suits your case and your budget.",
        },
      },
      {
        icon: "Sparkles",
        title: { es: "Clareamiento Dental", en: "Tooth Lightening" },
        desc: {
          es: "Recupera el tono natural de tus dientes de forma segura y controlada.",
          en: "Bring back your teeth's natural shade safely and comfortably.",
        },
        details: {
          es: "Aclaramos varios tonos con geles profesionales y controlamos la sensibilidad durante todo el proceso. Es el paso ideal antes de un evento o al inicio de un diseño de sonrisa.",
          en: "We lighten several shades with professional gels and manage sensitivity throughout. It is the ideal step before an event, or at the start of a smile design.",
        },
      },
      {
        icon: "AlignHorizontalDistributeCenter",
        title: { es: "Ortodoncia y Alineadores", en: "Orthodontics and Aligners" },
        desc: {
          es: "Brackets estéticos y alineadores transparentes para alinear tu mordida.",
          en: "Aesthetic braces and clear aligners to align your bite.",
        },
        details: {
          es: "Alineamos tus dientes con brackets estéticos o con alineadores transparentes, casi invisibles y removibles. Planificamos el recorrido completo para que sepas desde el principio cuánto tiempo tomará.",
          en: "We align your teeth with aesthetic braces or clear aligners, nearly invisible and removable. We map the full path so you know from the start how long it will take.",
        },
      },
      {
        icon: "Anchor",
        title: {
          es: "Implantología y Rehabilitación Oral",
          en: "Implantology and Oral Rehabilitation",
        },
        desc: {
          es: "Reemplazo fijo de piezas ausentes y devolución completa de la función.",
          en: "Fixed replacement of missing teeth and full restoration of function.",
        },
        details: {
          es: "Reponemos la pieza perdida con un implante de titanio y una corona hecha a la medida de tu boca. Recuperas la mordida, el habla y la confianza para sonreír sin taparte. A cargo del Dr. José Sánchez.",
          en: "We replace the missing tooth with a titanium implant and a crown made to match your mouth. You get back your bite, your speech and the confidence to smile openly. Led by Dr. José Sánchez.",
        },
      },
      {
        icon: "Microscope",
        title: { es: "Endodoncia", en: "Endodontics" },
        desc: {
          es: "Tratamiento de conducto para salvar el diente y quitar el dolor.",
          en: "Root canal treatment to save the tooth and end the pain.",
        },
        details: {
          es: "Cuando la caries llega al nervio, el tratamiento de conducto conserva tu diente natural en lugar de extraerlo. Trabajamos con instrumentación de precisión para que sea cómodo y en las menos citas posibles. A cargo de la Dra. Valery Silvestre.",
          en: "When decay reaches the nerve, root canal treatment keeps your natural tooth instead of removing it. We work with precision instrumentation to keep it comfortable and in as few visits as possible. Led by Dr. Valery Silvestre.",
        },
      },
      {
        icon: "Scissors",
        title: { es: "Cirugía Bucal", en: "Oral Surgery" },
        desc: {
          es: "Extracciones, cordales y procedimientos quirúrgicos con protocolo seguro.",
          en: "Extractions, wisdom teeth and surgical procedures under a safe protocol.",
        },
        details: {
          es: "Extracción de cordales, dientes retenidos y cirugías previas a un implante, con anestesia bien controlada y un plan de recuperación claro. A cargo de la Dra. Zaynab Cartacio.",
          en: "Wisdom teeth, impacted teeth and pre-implant surgery, with well controlled anesthesia and a clear recovery plan. Led by Dr. Zaynab Cartacio.",
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
    ],
  },
  {
    key: "facial",
    label: { es: "Armonización Facial", en: "Facial Harmonization" },
    short: { es: "Armonización", en: "Harmonization" },
    items: [
      {
        icon: "Syringe",
        title: { es: "Toxina Botulínica", en: "Botulinum Toxin" },
        desc: {
          es: "Suaviza las líneas de expresión conservando tus gestos naturales.",
          en: "Softens expression lines while keeping your natural gestures.",
        },
        details: {
          es: "Relaja de forma puntual los músculos que marcan las líneas de la frente, el entrecejo y el contorno de los ojos. El resultado se ve a los pocos días y tu cara sigue siendo tu cara.",
          en: "Selectively relaxes the muscles behind the lines on the forehead, brow and around the eyes. Results show within days and your face still looks like you.",
        },
      },
      {
        icon: "Flower2",
        title: { es: "Relleno Labial", en: "Lip Filler" },
        desc: {
          es: "Ácido hialurónico para labios definidos, hidratados y proporcionales.",
          en: "Hyaluronic acid for defined, hydrated, well proportioned lips.",
        },
        details: {
          es: "Con ácido hialurónico definimos el borde, hidratamos y ajustamos la proporción entre el labio superior y el inferior. Buscamos labios que se vean tuyos, nunca rellenos de más. El resultado es inmediato y reversible.",
          en: "With hyaluronic acid we define the border, hydrate, and adjust the proportion between upper and lower lip. The goal is lips that look like yours, never overfilled. The result is immediate and reversible.",
        },
      },
      {
        icon: "PenTool",
        title: { es: "Proyección de Mentón", en: "Chin Projection" },
        desc: {
          es: "Ácido hialurónico para equilibrar el perfil y definir el óvalo facial.",
          en: "Hyaluronic acid to balance your profile and define the facial oval.",
        },
        details: {
          es: "Un mentón corto o poco proyectado desequilibra todo el perfil. Con ácido hialurónico damos la proyección justa para que el tercio inferior converse con la nariz y con los labios.",
          en: "A short or under-projected chin throws the whole profile out of balance. With hyaluronic acid we give it the right projection so the lower third works with the nose and the lips.",
        },
      },
      {
        icon: "Wand2",
        title: { es: "Rinomodelación", en: "Non-surgical Rhinoplasty" },
        desc: {
          es: "Corrige el perfil de la nariz con ácido hialurónico, sin cirugía.",
          en: "Reshapes the nose profile with hyaluronic acid, no surgery.",
        },
        details: {
          es: "Disimulamos el giba, elevamos la punta y alineamos el dorso con ácido hialurónico, en una sesión y sin quirófano. Es reversible, así que puedes verlo antes de pensar en algo definitivo.",
          en: "We smooth the bump, lift the tip and align the bridge with hyaluronic acid, in one session and without an operating room. It is reversible, so you can see the result before considering anything permanent.",
        },
      },
      {
        icon: "HeartPulse",
        title: { es: "Bioestimuladores de Colágeno", en: "Collagen Bio-stimulators" },
        desc: {
          es: "Hidroxiapatita de calcio y ácido poli-L-láctico para firmeza real.",
          en: "Calcium hydroxyapatite and poly-L-lactic acid for real firmness.",
        },
        details: {
          es: "En lugar de rellenar, estimulan a tu piel a producir su propio colágeno. Trabajamos con hidroxiapatita de calcio, de efecto más inmediato y tensor, y con ácido poli-L-láctico, de mejora progresiva y duradera. En la valoración elegimos el que mejor responde a tu piel.",
          en: "Instead of filling, they prompt your skin to make its own collagen. We work with calcium hydroxyapatite, with a more immediate lifting effect, and with poly-L-lactic acid, whose improvement is gradual and long lasting. At your assessment we choose the one your skin responds to best.",
        },
      },
    ],
  },
  {
    key: "cosmiatry",
    label: { es: "Cosmiatría", en: "Skin Care" },
    short: { es: "Cosmiatría", en: "Skin" },
    items: [
      {
        icon: "Droplets",
        title: { es: "Faciales", en: "Facials" },
        desc: {
          es: "Higiene profunda y activos escogidos para tu tipo de piel.",
          en: "Deep cleansing and actives chosen for your skin type.",
        },
        details: {
          es: "Limpieza profunda que retira impurezas y células muertas, seguida de activos según tu tipo de piel. Sales con una rutina de casa hecha para ti, no una genérica.",
          en: "A deep cleanse that clears impurities and dead cells, followed by actives matched to your skin type. You leave with a home routine built for you, not a generic one.",
        },
      },
      {
        icon: "Grip",
        title: { es: "Dermapen", en: "Dermapen" },
        desc: {
          es: "Microagujas que renuevan la piel y atenúan cicatrices y poros.",
          en: "Microneedling that renews the skin and softens scars and pores.",
        },
        details: {
          es: "Microperforaciones controladas que activan la reparación natural de la piel. Mejora la textura, las cicatrices de acné, los poros dilatados y las líneas finas, sesión tras sesión.",
          en: "Controlled micro-channels that switch on the skin's own repair. It improves texture, acne scars, enlarged pores and fine lines, session after session.",
        },
      },
      {
        icon: "FlaskConical",
        title: { es: "Mesoterapia Facial", en: "Facial Mesotherapy" },
        desc: {
          es: "Vitaminas y activos aplicados directamente donde la piel los necesita.",
          en: "Vitamins and actives delivered straight to where the skin needs them.",
        },
        details: {
          es: "Microinyecciones de vitaminas, minerales y ácido hialurónico no reticulado que hidratan desde dentro y devuelven luminosidad. Ideal para piel apagada, deshidratada o con fatiga.",
          en: "Micro-injections of vitamins, minerals and non-cross-linked hyaluronic acid that hydrate from within and bring back glow. Ideal for dull, dehydrated or tired skin.",
        },
      },
      {
        icon: "Layers",
        title: { es: "Peeling", en: "Chemical Peel" },
        desc: {
          es: "Renovación controlada para manchas, marcas y textura irregular.",
          en: "Controlled renewal for spots, marks and uneven texture.",
        },
        details: {
          es: "Exfoliación química graduada según tu piel y tu objetivo. Trabaja manchas, marcas de acné y textura irregular, y se planifica en sesiones para que la recuperación sea cómoda.",
          en: "A chemical exfoliation graded to your skin and your goal. It works on pigmentation, acne marks and uneven texture, planned across sessions so recovery stays comfortable.",
        },
      },
      {
        icon: "Droplet",
        title: {
          es: "Plasma Rico en Plaquetas",
          en: "Platelet Rich Plasma",
        },
        desc: {
          es: "Tu propia sangre como estímulo regenerador, sin nada externo.",
          en: "Your own blood as a regenerative stimulus, nothing external.",
        },
        details: {
          es: "Tomamos una pequeña muestra de tu sangre, separamos el plasma rico en plaquetas y lo devolvemos a la piel. Como viene de ti, el riesgo de rechazo es mínimo y el estímulo de regeneración es real.",
          en: "We take a small sample of your blood, separate the platelet rich plasma and return it to the skin. Because it comes from you, the risk of rejection is minimal and the regenerative stimulus is real.",
        },
      },
      {
        icon: "Dna",
        title: { es: "PDRN de Salmón", en: "Salmon PDRN" },
        desc: {
          es: "Regeneración profunda, hidratación y reparación del tejido.",
          en: "Deep regeneration, hydration and tissue repair.",
        },
        details: {
          es: "Polinucleótidos de origen marino que reparan el tejido desde dentro, calman la inflamación y mejoran la calidad de la piel. Muy indicado para piel fina, ojeras y rostro cansado.",
          en: "Marine polynucleotides that repair tissue from within, calm inflammation and improve skin quality. Well suited to thin skin, under-eye hollows and a tired face.",
        },
      },
      {
        icon: "Atom",
        title: { es: "Exosomas", en: "Exosomes" },
        desc: {
          es: "La tecnología más reciente en regeneración y luminosidad.",
          en: "The most recent technology in regeneration and glow.",
        },
        details: {
          es: "Mensajeros celulares que le indican a tu piel cómo repararse. Se usan solos o después de dermapen y peeling para potenciar el resultado, con una mejora visible en luminosidad y firmeza.",
          en: "Cellular messengers that tell your skin how to repair itself. Used alone or after dermapen and peels to amplify the result, with a visible gain in glow and firmness.",
        },
      },
      {
        icon: "Waves",
        title: { es: "HIFU · Ultraformer III", en: "HIFU · Ultraformer III" },
        desc: {
          es: "Lifting sin cirugía con estimulación intensa de colágeno.",
          en: "Non-surgical lifting with intense collagen stimulation.",
        },
        details: {
          es: "Ultrasonido focalizado de alta intensidad que actúa en las capas profundas, las mismas que trabaja un lifting quirúrgico, sin cortes y sin reposo. Tensa el óvalo, el cuello y el contorno, y el colágeno sigue trabajando durante meses.",
          en: "High intensity focused ultrasound that reaches the deep layers a surgical lift works on, with no cuts and no downtime. It tightens the jawline, neck and contour, and the collagen keeps working for months.",
        },
      },
    ],
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

/* ------------------------------ The team ------------------------------- */
export type TeamMember = {
  /** Stable id used to pair the person with their photo. */
  key: string;
  name: string;
  role: Record<Lang, string>;
  /**
   * Fragments looked for inside the photo file name (accent free, lowercase).
   * A file called "dra-melany.jpg" finds Melany no matter where it sorts.
   */
  match: string[];
};

export const TEAM: TeamMember[] = [
  {
    key: "sindy-silvestre",
    name: "Dra. Sindy Silvestre",
    role: {
      es: "Especialista en estética dental y armonización facial",
      en: "Specialist in dental aesthetics and facial harmonization",
    },
    // Two Silvestre doctors work here, so match her given name only.
    match: ["sindy"],
  },
  {
    key: "melany-rosa",
    name: "Dra. Melany Rosa",
    role: { es: "Odontóloga integral", en: "Comprehensive dentistry" },
    match: ["melany", "rosa"],
  },
  {
    key: "jose-sanchez",
    name: "Dr. José Sánchez",
    role: {
      es: "Especialista en implantología oral y rehabilitación bucal",
      en: "Specialist in oral implantology and oral rehabilitation",
    },
    match: ["jose", "sanchez"],
  },
  {
    key: "zaynab-cartacio",
    name: "Dra. Zaynab Cartacio",
    role: {
      es: "Especialista en cirugía bucal",
      en: "Specialist in oral surgery",
    },
    match: ["zaynab", "cartacio"],
  },
  {
    key: "sardis-carpio",
    name: "Sardis Carpio",
    role: { es: "Cosmiatra", en: "Skin care specialist" },
    match: ["sardis", "carpio"],
  },
  {
    key: "valery-silvestre",
    name: "Dra. Valery Silvestre",
    role: { es: "Máster en Endodoncia", en: "Master in Endodontics" },
    match: ["valery"],
  },
];

/* ------------------------- UI copy dictionary -------------------------- */
export const t = {
  nav: {
    services: { es: "Servicios", en: "Services" },
    about: { es: "Nosotros", en: "About" },
    gallery: { es: "Galería", en: "Gallery" },
    testimonials: { es: "Testimonios", en: "Reviews" },
    team: { es: "Equipo", en: "Team" },
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
    subtitle: {
      es: "Tres áreas que trabajan juntas: tu sonrisa, la armonía de tu rostro y tu piel.",
      en: "Three areas that work as one: your smile, the harmony of your face and your skin.",
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
  team: {
    eyebrow: { es: "Nuestro equipo", en: "Our team" },
    title: { es: "El equipo detrás de", en: "The team behind" },
    titleAccent: { es: "cada sonrisa", en: "every smile" },
    subtitle: {
      es: "Especialistas que trabajan juntos para cuidar tu sonrisa, tu piel y la armonía de tu rostro.",
      en: "Specialists who work together to care for your smile, your skin and the harmony of your face.",
    },
    band: {
      es: "Un equipo especializado, una sola visión de tu belleza.",
      en: "A specialized team with a single vision of your beauty.",
    },
    book: { es: "Agendar", en: "Book" },
    /** {name} is replaced with the specialist before opening WhatsApp. */
    waMessage: {
      es: "Hola, quisiera agendar una cita con {name}.",
      en: "Hello, I would like to book an appointment with {name}.",
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
