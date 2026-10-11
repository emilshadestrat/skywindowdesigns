// Guards the on-page limits and the URL form the site settled on.
//
// The site serves every page WITHOUT a trailing slash (next.config.ts
// `trailingSlash: false`; /contact/ answers 308 -> /contact). Three routes once
// declared canonicals like "/contact/", so each page pointed search engines at
// a URL that redirects straight back to itself. These tests keep canonicals,
// the sitemap route list and the config on the same slashless form, and keep
// titles at 60 characters or fewer and descriptions at 70-160.
import type { Metadata } from "next";
import { describe, expect, it, vi } from "vitest";
import nextConfig from "../next.config";
import { crawlableRoutes, SITE_URL } from "../app/_lib/seo";
import { CITY_PAGES, PAGES } from "../client/src/lib/siteData";
import { allPosts } from "../lib/blog";

// Route modules are imported only for their `metadata` export; the legacy
// visual components they render are irrelevant here.
vi.mock("../app/_components/LegacyPageClients", () => ({}));
vi.mock("../app/_components/BlogClients", () => ({}));

const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

const STATIC_ROUTES: Record<string, () => Promise<{ metadata: Metadata }>> = {
  "/": () => import("../app/page"),
  "/contact": () => import("../app/contact/page"),
  "/privacy": () => import("../app/privacy/page"),
  "/accessibility": () => import("../app/accessibility/page"),
  "/blog": () => import("../app/blog/page"),
  "/service-areas": () => import("../app/service-areas/page"),
  "/design-services": () => import("../app/design-services/page"),
};

type Entry = { route: string; title: string; description: string; canonical: string };

function titleOf(metadata: Metadata): string {
  const t = metadata.title;
  if (typeof t === "string") return t;
  if (t && typeof t === "object" && "absolute" in t && t.absolute) return t.absolute;
  throw new Error("expected an absolute title");
}

function canonicalPath(canonical: unknown): string {
  const href = String(canonical);
  return href.startsWith("http") ? new URL(href).pathname : href;
}

async function collect(): Promise<Entry[]> {
  const entries: Entry[] = [];
  for (const [route, load] of Object.entries(STATIC_ROUTES)) {
    const { metadata } = await load();
    entries.push({
      route,
      title: titleOf(metadata),
      description: String(metadata.description ?? ""),
      canonical: canonicalPath(metadata.alternates?.canonical),
    });
  }
  for (const [slug, page] of Object.entries(PAGES)) {
    entries.push({ route: `/${slug}`, title: page.title, description: page.meta, canonical: canonicalPath(page.canonical) });
  }
  for (const [slug, page] of Object.entries(CITY_PAGES)) {
    entries.push({ route: `/locations/${slug}`, title: page.title, description: page.meta, canonical: canonicalPath(page.canonical) });
  }
  // Scheduled posts included, so a post cannot go live over the limits.
  for (const post of allPosts().filter((p) => p.status === "published")) {
    entries.push({ route: `/blog/${post.slug}`, title: post.metaTitle, description: post.excerpt, canonical: `/blog/${post.slug}` });
  }
  return entries;
}

describe("titles and descriptions", async () => {
  const entries = await collect();

  it.each(entries.map((e) => [e.route, e] as const))("%s fits the limits", (_route, e) => {
    expect(e.title.length, `title "${e.title}"`).toBeLessThanOrEqual(TITLE_MAX);
    expect(e.description.length, `description "${e.description}"`).toBeGreaterThanOrEqual(DESC_MIN);
    expect(e.description.length, `description "${e.description}"`).toBeLessThanOrEqual(DESC_MAX);
    expect(e.title.match(/Sky Window/g)?.length ?? 0, `brand named twice in "${e.title}"`).toBeLessThanOrEqual(1);
  });

  it("no two pages share a title", () => {
    const seen = new Map<string, string>();
    for (const e of entries) {
      expect(seen.get(e.title), `"${e.title}" on ${e.route}`).toBeUndefined();
      seen.set(e.title, e.route);
    }
  });
});

describe("one URL form: no trailing slash", async () => {
  const entries = await collect();

  it("next.config serves slashless URLs", () => {
    expect(nextConfig.trailingSlash).toBe(false);
  });

  it.each(entries.map((e) => [e.route, e] as const))("%s declares itself as canonical", (_route, e) => {
    expect(e.canonical).toBe(e.route);
  });

  it("absolute canonicals use the production origin", () => {
    for (const page of [...Object.values(PAGES), ...Object.values(CITY_PAGES)]) {
      expect(page.canonical.startsWith(`${SITE_URL}/`)).toBe(true);
    }
  });

  it("sitemap routes carry no trailing slash and match the canonicals", () => {
    const canonicals = new Set(entries.map((e) => e.canonical));
    for (const route of crawlableRoutes) {
      if (route !== "/") expect(route.endsWith("/"), route).toBe(false);
      expect(canonicals.has(route), `${route} has no canonical entry`).toBe(true);
    }
  });
});
