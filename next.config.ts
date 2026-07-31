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
  // In dev mode, proxy /manus-storage/ to the side proxy server
  // (set up by scripts/dev.mjs). In production, the Manus platform CDN
  // handles this automatically, so rewrites are a no-op for static export.
  async rewrites() {
    const proxyUrl = process.env.MANUS_STORAGE_PROXY_URL;
    if (proxyUrl) {
      return [
        {
          source: "/manus-storage/:path*",
          destination: `${proxyUrl}/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
