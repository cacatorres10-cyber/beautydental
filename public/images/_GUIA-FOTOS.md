# 📸 Guía de fotos — Beauty Dental & Skin

**No hace falta renombrar nada.** El sitio lee esta carpeta automáticamente.

## 1. Casos (antes/después, sonrisas, armonización facial)

👉 Arrastra **todas** las fotos a la carpeta **`gallery/`**

- Los nombres pueden ser los que ya tienen: `IMG_4821.jpg`, `WhatsApp Image 2026-08-13.jpeg`…
- Pon las que quieras: 5, 20, 50. Todas entran al carrusel.
- Se ordenan alfabéticamente. ¿Quieres un orden concreto? Ponles un número
  delante: `01-...`, `02-...`, `03-...`
- Formatos: `.jpg` `.jpeg` `.png` `.webp` `.avif`

## 2. Fotos destacadas (solo estas llevan nombre fijo)

Van sueltas en esta carpeta (`public/images/`), **no** dentro de `gallery/`.
La extensión da igual (`.jpg`, `.jpeg`, `.png`, `.webp`).

| Nombre | Qué foto |
|---|---|
| `doctor` | Retrato de la **Dra. Sindy Silvestre** |
| `hero` | Foto principal del inicio (se expande al hacer scroll) |
| `intro` | Momento de atención / piel radiante |
| `smile` | Primer plano de una sonrisa o un antes/después destacado |
| `clinica` | Interior de la clínica |

Ejemplo: `doctor.jpeg`, `hero.jpg`, `clinica.png` — todos válidos.

## 3. Testimonios (opcional)

Fotos de pacientes en la carpeta **`avatars/`**, cualquier nombre.
Si no pones ninguna, se muestran las iniciales.

---

### ¿Y si aún no subo fotos?
El sitio muestra fotos de muestra y, si algo falta, un placeholder dorado
elegante. **Nunca se ve roto** — puedes subir las fotos poco a poco.

### ¿Dónde se configura?
- Detección automática: `lib/photos.ts`
- Fotos de muestra y textos: `lib/content.ts`
