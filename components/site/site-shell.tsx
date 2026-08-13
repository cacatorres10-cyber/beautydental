"use client";

import { LanguageProvider } from "./language-provider";
import { PhotosProvider } from "./photos-provider";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Intro } from "./intro";
import { Services } from "./services";
import { Showcase } from "./showcase";
import { Gallery } from "./gallery";
import { About } from "./about";
import { Testimonials } from "./testimonials";
import { CtaBand } from "./cta-band";
import { Contact } from "./contact";
import { Footer } from "./footer";
import type { SitePhotos } from "@/lib/photos";

export function SiteShell({ photos }: { photos: SitePhotos }) {
  return (
    <LanguageProvider>
      <PhotosProvider photos={photos}>
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar />
        <main>
          <Hero />
          <Intro />
          <Services />
          <Showcase />
          <Gallery />
          <About />
          <Testimonials />
          <CtaBand />
          <Contact />
        </main>
        <Footer />
      </PhotosProvider>
    </LanguageProvider>
  );
}
