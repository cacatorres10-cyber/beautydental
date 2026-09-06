import fs from "node:fs";
import path from "node:path";
import { TEAM } from "./content";

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

/** Accent free, letters and digits only, for comparing file names to names. */
const slug = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

/**
 * Pairs each person on the team with a photo from `public/images/team/`.
 *
 * A file that carries the person's name wins, whatever order it sorts in
 * ("dra-melany.jpg"). Anything left over fills the remaining slots in roster
 * order, so five files simply called 1 to 5 also land correctly.
 */
function getTeamPhotos(): Record<string, string> {
  const files = readDir(path.join(imagesDir(), "team"))
    .filter(isImage)
    .sort(naturalSort);

  const taken = new Set<string>();
  const photos: Record<string, string> = {};
  const src = (file: string) => `/images/team/${encodeURIComponent(file)}`;

  for (const member of TEAM) {
    const named = files.find(
      (file) =>
        !taken.has(file) &&
        member.match.some((fragment) =>
          slug(path.parse(file).name).includes(fragment)
        )
    );
    if (named) {
      taken.add(named);
      photos[member.key] = src(named);
    }
  }

  const spare = files.filter((file) => !taken.has(file));
  for (const member of TEAM) {
    if (photos[member.key]) continue;
    const next = spare.shift();
    if (!next) break;
    photos[member.key] = src(next);
  }

  return photos;
}

export type SitePhotos = {
  hero: string | null;
  /** Tighter crop of the same banner, framed for a phone. */
  heroMobile: string | null;
  /** Wide shot of the whole team, above the team cards. */
  teamBand: string | null;
  /** Optional cinematic loop for the opening, in public/media/hero.mp4 */
  heroVideo: string | null;
  /** Same loop cropped for a phone, in public/media/hero-mobile.mp4 */
  heroVideoMobile: string | null;
  heroPoster: string | null;
  doctor: string | null;
  intro: string | null;
  smile: string | null;
  clinic: string | null;
  gallery: string[];
  avatars: string[];
  /** Team member key -> photo path, for whoever has a photo uploaded. */
  team: Record<string, string>;
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
  const media = readDir(path.join(process.cwd(), "public", "media")).filter(
    (f) => VIDEO_EXTENSIONS.includes(path.extname(f).toLowerCase())
  );
  const video = (baseName: string) => {
    const hit = media.find((f) => path.parse(f).name.toLowerCase() === baseName);
    return hit ? `/media/${encodeURIComponent(hit)}` : null;
  };

  return {
    hero: featured("hero"),
    heroMobile: featured("hero-mobile"),
    teamBand: featured("equipo"),
    heroVideo: video("hero"),
    heroVideoMobile: video("hero-mobile"),
    heroPoster: featured("hero-poster"),
    doctor: featured("doctor"),
    intro: featured("intro"),
    smile: featured("smile"),
    clinic: featured("clinica") ?? featured("clinic"),
    gallery: folder("gallery"),
    avatars: folder("avatars"),
    team: getTeamPhotos(),
  };
}
