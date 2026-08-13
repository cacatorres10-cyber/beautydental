import { SiteShell } from "@/components/site/site-shell";
import { getSitePhotos } from "@/lib/photos";

// Server component: reads the clinic's photos from public/images at build time.
export default function Home() {
  return <SiteShell photos={getSitePhotos()} />;
}
