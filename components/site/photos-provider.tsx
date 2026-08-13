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
  doctor: string;
  intro: string;
  smile: string;
  clinic: string;
  gallery: string[];
  avatars: string[];
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

  const resolved: ResolvedPhotos = {
    hero: photos.hero ?? IMAGES.heroMedia,
    doctor: photos.doctor ?? IMAGES.doctor,
    intro: photos.intro ?? IMAGES.intro,
    smile: photos.smile ?? smileCase ?? IMAGES.smileShowcase,
    clinic: photos.clinic ?? photos.intro ?? IMAGES.ctaBg,
    gallery: photos.gallery.length ? photos.gallery : IMAGES.gallery,
    avatars: photos.avatars.length ? photos.avatars : IMAGES.avatars,
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
