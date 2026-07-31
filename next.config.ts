import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Disable image optimization since we use external URLs
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
