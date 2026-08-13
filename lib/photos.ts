import fs from "node:fs";
import path from "node:path";

/* -------------------------------------------------------------------------
 * Reads the clinic's photos straight off the filesystem at build time.
 *
 * The point is that nobody has to rename anything: drop any number of photos
 * into `public/images/gallery/` (any file names) and they all show up in the
 * carousel. Only a couple of "featured" slots look for a specific base name,
 * and any common image extension works for those.
 * ---------------------------------------------------------------------- */

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const imagesDir = () => path.join(process.cwd(), "public", "images");

function readDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir);
  } catch {
    return []; // folder not created yet — fall back to the stock photos
  }
}

const isImage = (file: string) =>
  IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase());

/** "case-2.jpg" sorts before "case-10.jpg". */
const naturalSort = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

/**
 * Finds a featured photo by base name, e.g. `featured("doctor")` matches
 * doctor.jpg / doctor.jpeg / doctor.PNG …
 */
function featured(baseName: string): string | null {
  const match = readDir(imagesDir())
    .filter(isImage)
    .find((file) => path.parse(file).name.toLowerCase() === baseName);

  return match ? `/images/${encodeURIComponent(match)}` : null;
}

/** Every image inside `public/images/<folder>/`, in natural order. */
function folder(name: string): string[] {
  return readDir(path.join(imagesDir(), name))
    .filter(isImage)
    .sort(naturalSort)
    // Photos keep whatever names they came with, so spaces and accents have
    // to survive the trip into an <img src>.
    .map((file) => `/images/${name}/${encodeURIComponent(file)}`);
}

export type SitePhotos = {
  hero: string | null;
  doctor: string | null;
  intro: string | null;
  smile: string | null;
  clinic: string | null;
  gallery: string[];
  avatars: string[];
};

/* ------------------------------- Videos -------------------------------- */

const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".m4v"];

/**
 * Patient testimonial videos, read from `public/media/testimonials/`.
 * Same deal as the photos: drop files in, any names, they all show up.
 */
export function getTestimonialVideos(): string[] {
  const dir = path.join(process.cwd(), "public", "media", "testimonials");
  return readDir(dir)
    .filter((file) => VIDEO_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort(naturalSort)
    .map((file) => `/media/testimonials/${encodeURIComponent(file)}`);
}

export function getSitePhotos(): SitePhotos {
  return {
    hero: featured("hero"),
    doctor: featured("doctor"),
    intro: featured("intro"),
    smile: featured("smile"),
    clinic: featured("clinica") ?? featured("clinic"),
    gallery: folder("gallery"),
    avatars: folder("avatars"),
  };
}
