import { SiteShell } from "@/components/site/site-shell";
import { getSitePhotos, getTestimonialVideos } from "@/lib/photos";

// Server component: reads the clinic's photos and videos at build time.
export default function Home() {
  return (
    <SiteShell photos={getSitePhotos()} testimonialVideos={getTestimonialVideos()} />
  );
}
