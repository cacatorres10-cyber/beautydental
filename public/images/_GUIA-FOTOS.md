# 📸 Guía de fotos — Beauty Dental & Skin

Coloca aquí las fotos reales de la clínica. **La forma más simple:** súbelas con
los nombres de abajo y el sitio las tomará automáticamente. Si prefieres, mándalas
por el chat / un enlace y yo las conecto por ti.

> Formato ideal: **JPG** (o WEBP), buena resolución. No hace falta editarlas —
> yo las encuadro con CSS.

## Fotos principales (recomendadas)

| Archivo (nombre exacto) | Qué foto | Orientación |
|---|---|---|
| `hero.jpg` | Sonrisa radiante / paciente feliz (la estrella del inicio) | Vertical u horizontal, alta calidad |
| `doctor.jpg` | Retrato de la **Dra. Silvestre** (bata, sonriendo) | Vertical (4:5) |
| `intro.jpg` | Piel radiante / momento de atención en la clínica | Vertical (4:5) |
| `smile.jpg` | Antes/después o primer plano de una sonrisa | Horizontal (16:9) |
| `clinica.jpg` | Interior de la clínica / recepción | Horizontal, amplia |

## Galería (carrusel) — de 6 a 12 fotos

Nómbralas así: `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg` … (los números que tengas).
Ideas: diseños de sonrisa, blanqueamientos, carillas, tratamientos faciales,
antes/después, el equipo, el espacio.

## Testimonios (opcional) — foto de cada paciente

Nómbralas: `avatar-1.jpg`, `avatar-2.jpg` … (cuadradas, tipo perfil).
Si no las tienes, se muestran las iniciales — sin problema.

---

### ¿Cómo se conectan al sitio?
Todas las imágenes se enlazan en **`lib/content.ts`** (objeto `IMAGES`).
Cuando subas las fotos, avísame y actualizo ese archivo para que el sitio use
`/images/hero.jpg`, `/images/gallery-1.jpg`, etc. Mientras tanto, el sitio usa
fotos de ejemplo (Pexels) y, si falta alguna, muestra un placeholder dorado
elegante — nunca se ve roto.
