import type { MetadataRoute } from "next";
import { crawlableRoutes, SITE_URL } from "./_lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return crawlableRoutes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/locations/") ? 0.7 : 0.8,
  }));
}
