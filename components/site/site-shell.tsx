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
import { Team } from "./team";
import { VideoTestimonials } from "./video-testimonials";
import { CtaBand } from "./cta-band";
import { Contact } from "./contact";
import { Footer } from "./footer";
import { WhatsappFab } from "./whatsapp-fab";
import type { SitePhotos } from "@/lib/photos";

export function SiteShell({
  photos,
  testimonialVideos,
}: {
  photos: SitePhotos;
  testimonialVideos: string[];
}) {
  return (
    <LanguageProvider>
      <PhotosProvider photos={photos}>
        <div className="noise-overlay" aria-hidden="true" />
        <Navbar />
        <main>
          <Hero />
          {/* The specialist comes first: visitors want to know who will treat
              them before they read the philosophy. */}
          <About />
          {/* She leads, and the rest of the team follows right after. */}
          <Team />
          <Services />
          <Showcase />
          <Gallery />
          <Intro />
          <VideoTestimonials videos={testimonialVideos} />
          <CtaBand />
          <Contact />
        </main>
        <Footer />
        <WhatsappFab />
      </PhotosProvider>
    </LanguageProvider>
  );
}
