import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — outputs to ./out/ directory
  // Manus platform has a built-in /manus-storage/ proxy in production
  output: "export",
  // Disable image optimization since we use external URLs
  images: {
    unoptimized: true,
  },
  // Add trailing slashes for consistent URLs in static export
  trailingSlash: false,
};

export default nextConfig;
