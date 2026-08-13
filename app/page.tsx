"use client";

import { LanguageProvider } from "@/components/site/language-provider";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Intro } from "@/components/site/intro";
import { Services } from "@/components/site/services";
import { Showcase } from "@/components/site/showcase";
import { Gallery } from "@/components/site/gallery";
import { About } from "@/components/site/about";
import { Testimonials } from "@/components/site/testimonials";
import { CtaBand } from "@/components/site/cta-band";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <LanguageProvider>
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
    </LanguageProvider>
  );
}
