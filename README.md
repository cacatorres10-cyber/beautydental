# Beauty Dental & Skin — Sitio web

Sitio web de la clínica **Beauty Dental & Skin** (odontología estética + estética facial) en **La Romana, República Dominicana**.

Diseño de lujo en **blanco · dorado · negro**, bilingüe **Español / Inglés**, con animaciones de scroll inmersivas.

> 🇧🇷 **Nota rápida (pt-BR):** este README explica como rodar o site e, principalmente, **como trocar as fotos, a logo, as cores e os textos**. As fotos atuais são do Pexels (placeholder) e os depoimentos/estatísticas são de exemplo — é só substituir pelos reais. Tudo está centralizado em `lib/content.ts`.

---

## 🚀 Cómo ejecutarlo (rodar o site)

```bash
npm install
npm run dev      # http://localhost:3000  (desarrollo)
```

Para producción:

```bash
npm run build
npm run start
```

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · framer-motion · estructura shadcn (`/components/ui`).

---

## 🗂️ Estructura

```
app/
  layout.tsx        → <head>, fuentes (Google Fonts), SEO/metadata
  page.tsx          → ensambla todas las secciones
  globals.css       → paleta (variables CSS) + utilidades
components/
  ui/               → componentes de los prompts (scroll-expansion, container-scroll, infinite-slider)
  site/             → secciones del sitio (hero, servicios, galería, etc.)
lib/
  content.ts        → ⭐ TODO el contenido: textos ES/EN, fotos, servicios, contacto
  utils.ts          → helper cn()
public/brand/       → hero-bg.svg + favicon.svg (assets locales)
```

---

## 🖼️ Cómo cambiar las fotos (trocar as fotos)

**Todas las imágenes se definen en `lib/content.ts`**, dentro del objeto `IMAGES`.

1. Sube las fotos reales de la clínica a `public/images/` (o usa un enlace externo).
2. Cambia las URLs en `IMAGES`. Ejemplo:

```ts
export const IMAGES = {
  heroMedia: "/images/mi-sonrisa.jpg",     // foto que se expande en el hero
  doctor:    "/images/dra-silvestre.jpg",  // foto de la doctora
  gallery: [
    "/images/caso-1.jpg",
    "/images/caso-2.jpg",
    // ...
  ],
  // ...
};
```

> 🛡️ **A prueba de fallos:** cada foto pasa por el componente `SmartImage`. Si una URL falla, se muestra un **placeholder dorado elegante** en lugar de una imagen rota. Así el sitio nunca se ve incompleto.

Las fotos actuales son de **Pexels** (solo de muestra). El hero (`heroBg`) usa un SVG local (`public/brand/hero-bg.svg`) que siempre carga.

---

## 🎬 (Opcional) Vídeo inmersivo en el hero

El hero usa una **imagen** por defecto. Para usar un **vídeo** real de la clínica:

1. Pon el vídeo en `public/media/hero.mp4`.
2. En `components/site/hero.tsx` cambia:
   ```tsx
   mediaType="image"   →   mediaType="video"
   mediaSrc={IMAGES.heroMedia}   →   mediaSrc="/media/hero.mp4"
   ```
   (También puedes pasar `posterSrc="/images/poster.jpg"`.)

También acepta enlaces de YouTube en `mediaSrc`.

---

## 🎨 Colores (paleta blanco / dorado / negro)

Definidos en **dos** lugares:

- `tailwind.config.ts` → colores `ink` (negro), `ivory` (blanco cálido), `gold` (dorado).
- `app/globals.css` → variables `--gold`, `--gold-light`, etc. y el degradado `.text-gold-gradient`.

Cambia esos valores y todo el sitio se actualiza. El fondo es **blanco** por diseño; las secciones oscuras (CTA y footer) usan `ink`.

---

## 🔤 Textos e idioma (ES / EN)

Todo el copy está en `lib/content.ts` en el objeto `t`, con versión `es` y `en`:

```ts
title: { es: "Sonrisas Radiantes", en: "Radiant Smiles" }
```

El selector **ES / EN** está en la barra de navegación (guarda la preferencia en el navegador). Idioma por defecto: `es` (`DEFAULT_LANG` en `content.ts`).

---

## ✍️ Logo

El logo actual es **tipográfico** (placeholder elegante) en `components/site/logo.tsx`.
Cuando tengas el logo real, reemplaza ese componente por un `<img src="/brand/logo.svg" ... />`.

---

## ✅ Antes de publicar (checklist)

- [ ] Reemplazar las fotos de Pexels por fotos reales (`lib/content.ts` → `IMAGES`).
- [ ] Reemplazar la **foto y bio** de la Dra. Silvestre (sección "Nosotros").
- [ ] Reemplazar los **testimonios de ejemplo** por reseñas reales (`TESTIMONIALS`).
- [ ] Ajustar las **estadísticas** (`STATS`) con cifras reales.
- [ ] Revisar **teléfonos, correo, horario y dirección** (`CONTACT`).
- [ ] Poner el **logo real**.
- [ ] (Opcional) Añadir el **vídeo** del hero.

> Los datos de contacto (`CONTACT` en `content.ts`) se tomaron de la información pública del negocio — **verifícalos**: teléfonos (809) 349-0774 / (849) 260-8631, correo Dra.ssilvestre@gmail.com, Instagram @beautydentalskin.

---

## ☁️ Deploy

Recomendado **Vercel** (creadores de Next.js):

1. Sube el repo a GitHub (ya está).
2. Importa el proyecto en [vercel.com](https://vercel.com) → detecta Next.js automáticamente.
3. Deploy. Sin variables de entorno necesarias.

También funciona en Netlify u otro host compatible con Next.js.
