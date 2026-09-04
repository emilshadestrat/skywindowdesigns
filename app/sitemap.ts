import type { MetadataRoute } from "next";
import { crawlableRoutes, SITE_URL } from "./_lib/seo";
import { publishedPosts } from "../lib/blog";

// Published blog posts are appended at build time, so the sitemap has to be
// regenerated for a scheduled post to appear — same revalidate window as the
// blog routes themselves.
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = crawlableRoutes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: (route === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
    priority: route === "/" ? 1 : route.startsWith("/locations/") ? 0.7 : 0.8,
  }));

  // Only posts whose date has passed, so a scheduled post never appears in the
  // sitemap before the page it points at exists.
  const postRoutes = publishedPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    lastModified: new Date(`${post.publishDate}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const seen = new Set(staticRoutes.map((r) => r.url));
  return [...staticRoutes, ...postRoutes.filter((r) => !seen.has(r.url))];
}
