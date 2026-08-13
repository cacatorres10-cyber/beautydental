/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // No ESLint config is bundled; type-checking still runs during build.
    ignoreDuringBuilds: true,
  },
  images: {
    // Marketing site with mostly remote placeholder imagery.
    // `unoptimized` lets us reference any host without a running image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
