"use client";

import { createContext, useContext, type ReactNode } from "react";
import { IMAGES } from "@/lib/content";
import type { SitePhotos } from "@/lib/photos";

/**
 * Serves the clinic's own photos when they exist in `public/images/`, and the
 * stock stand-ins until then, so every section always has something to show.
 */
export type ResolvedPhotos = {
  hero: string;
  /** Phone framing of the banner; falls back to the wide one. */
  heroMobile: string;
  teamBand: string | null;
  heroVideo: string | null;
  heroVideoMobile: string | null;
  heroPoster: string | null;
  doctor: string;
  intro: string;
  smile: string;
  clinic: string;
  gallery: string[];
  avatars: string[];
  /** Team member key -> photo, empty until their portraits are uploaded. */
  team: Record<string, string>;
  brand: SitePhotos["brand"];
  /** True once real gallery photos are in place (hides the "sample" note). */
  hasRealGallery: boolean;
};

const PhotosContext = createContext<ResolvedPhotos | null>(null);

export function PhotosProvider({
  photos,
  children,
}: {
  photos: SitePhotos;
  children: ReactNode;
}) {
  // A real smile case beats a stock shade guide, so the showcase borrows one
  // from the gallery when no dedicated `smile` photo has been uploaded.
  const smileCase =
    photos.gallery.find((p) => /sorriso|sonrisa|smile/i.test(p)) ??
    photos.gallery[0];

  // Her portrait already lives in `public/images/`, so she is on the team
  // grid from the start even before the group photos are uploaded.
  const team = { ...photos.team };
  if (!team["sindy-silvestre"] && photos.doctor) {
    team["sindy-silvestre"] = photos.doctor;
  }

  const resolved: ResolvedPhotos = {
    hero: photos.hero ?? IMAGES.heroMedia,
    heroMobile: photos.heroMobile ?? photos.hero ?? IMAGES.heroMedia,
    teamBand: photos.teamBand,
    heroVideo: photos.heroVideo,
    heroVideoMobile: photos.heroVideoMobile ?? photos.heroVideo,
    heroPoster: photos.heroPoster,
    doctor: photos.doctor ?? IMAGES.doctor,
    intro: photos.intro ?? IMAGES.intro,
    smile: photos.smile ?? smileCase ?? IMAGES.smileShowcase,
    clinic: photos.clinic ?? photos.intro ?? IMAGES.ctaBg,
    gallery: photos.gallery.length ? photos.gallery : IMAGES.gallery,
    avatars: photos.avatars.length ? photos.avatars : IMAGES.avatars,
    team,
    brand: photos.brand,
    hasRealGallery: photos.gallery.length > 0,
  };

  return (
    <PhotosContext.Provider value={resolved}>{children}</PhotosContext.Provider>
  );
}

export function usePhotos() {
  const ctx = useContext(PhotosContext);
  if (!ctx) throw new Error("usePhotos must be used within <PhotosProvider>");
  return ctx;
}
