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

## 3. El equipo

👉 Los retratos van en la carpeta **`team/`** (son 5 personas).

Dos formas, las dos funcionan:

- **Con el nombre dentro del archivo:** `sindy.jpg`, `dra-melany.png`,
  `jose sanchez.jpeg`, `zaynab.webp`, `sardis.jpg`. No importa el orden,
  ni las mayúsculas, ni los acentos.
- **Numeradas** en este orden: `01` Dra. Sindy Silvestre, `02` Dra. Melany Rosa,
  `03` Dr. José Sánchez, `04` Dra. Zaynab Cartacio, `05` Sardis Carpio.

Fotos verticales. Se recortan en 3:4 desde arriba, así la cara siempre queda
dentro del cuadro. A quien le falte la foto se le muestran sus iniciales en
dorado. Los nombres y los cargos se editan en `lib/content.ts` (`TEAM`).

## 4. Testimonios (opcional)

Fotos de pacientes en la carpeta **`avatars/`**, cualquier nombre.
Si no pones ninguna, se muestran las iniciales.

---

### ¿Y si aún no subo fotos?
El sitio muestra fotos de muestra y, si algo falta, un placeholder dorado
elegante. **Nunca se ve roto** — puedes subir las fotos poco a poco.

### ¿Dónde se configura?
- Detección automática: `lib/photos.ts`
- Fotos de muestra y textos: `lib/content.ts`
