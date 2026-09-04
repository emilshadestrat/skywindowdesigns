import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `output: "export"` was removed when the blog gained a CMS.
  //
  // A static export cannot serve either half of Keystatic: /keystatic is a
  // force-dynamic page and /api/keystatic/[...params] is a route handler, and
  // neither exists in a flat file export. The site now deploys through
  // Netlify's Next runtime (@netlify/plugin-nextjs) like the rest of the
  // portfolio, publishing .next instead of a copied dist/.
  //
  // Every page here is still statically prerendered — dropping the export mode
  // changes how the output is served, not whether pages are pre-built.
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  // The Keystatic reader loads content/blog/**/index.yaml from disk at request
  // time. Next's output tracer cannot see those dynamic reads, so without this
  // the YAML files are dropped from the serverless bundle and every post 404s
  // in production while working perfectly locally.
  outputFileTracingIncludes: {
    "/blog": ["./content/**/*"],
    "/blog/[slug]": ["./content/**/*"],
    "/sitemap.xml": ["./content/**/*"],
  },
};

export default nextConfig;
