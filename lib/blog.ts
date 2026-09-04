import fs from "node:fs";
import path from "node:path";
import { load as loadYaml } from "js-yaml";

/**
 * Keystatic-backed blog content for Sky Window Design & More.
 *
 * The blog had no posts and no article route before this — `app/blog/page.tsx`
 * rendered a "check back soon" placeholder. Posts are Git-tracked files under
 * `content/blog/`, edited at `/keystatic`.
 *
 * Scheduling: a post is public only when its status is `published` AND its
 * publishDate has arrived. Nothing else gates it.
 */

export type BlogBlock =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  publishDate: string;
  displayDate: string;
  status: "draft" | "published";
  body: BlogBlock[];
};

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function readAll(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(slug => fs.existsSync(path.join(CONTENT_DIR, slug, "index.yaml")))
    .map(slug => {
      const d = (loadYaml(fs.readFileSync(path.join(CONTENT_DIR, slug, "index.yaml"), "utf8")) ?? {}) as Record<
        string,
        unknown
      >;
      const publishDate = String(d.publishDate ?? "").slice(0, 10);
      if (!publishDate) throw new Error(`${slug}: missing publishDate`);
      const title = String(d.title ?? "");
      return {
        slug,
        title,
        metaTitle: (d.metaTitle as string) || title,
        excerpt: String(d.excerpt ?? ""),
        category: String(d.category ?? "Design Ideas"),
        readTime: String(d.readTime ?? "5 min read"),
        author: String(d.author ?? "Sky Window Design & More"),
        publishDate,
        // Derived, never stored — storing it again is how the two drift.
        displayDate: new Date(`${publishDate}T00:00:00Z`).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        }),
        status: (d.status as "draft" | "published") ?? "draft",
        body: ((d.body ?? []) as Array<Record<string, unknown>>).map(b =>
          b.type === "ul"
            ? { type: "ul" as const, items: [...((b.items as string[]) ?? [])] }
            : { type: b.type as "p" | "h2" | "h3", text: String(b.text ?? "") },
        ),
      };
    })
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : a.publishDate > b.publishDate ? -1 : a.slug.localeCompare(b.slug)));
}

/** Every post, drafts and future dates included. */
export function allPosts(): BlogPost[] {
  return readAll();
}

/** The public set: published, and dated today or earlier. */
export function publishedPosts(now: Date = new Date()): BlogPost[] {
  const today = now.toISOString().slice(0, 10);
  return readAll().filter(p => p.status === "published" && p.publishDate <= today);
}

export function postBySlug(slug: string, now: Date = new Date()): BlogPost | undefined {
  return publishedPosts(now).find(p => p.slug === slug);
}

/**
 * Slugs for `generateStaticParams`. Returns every NON-DRAFT slug, including
 * future-dated ones.
 *
 * The article route sets `dynamicParams = false`, so a slug omitted here 404s
 * permanently and can never revalidate into an article on its date. An
 * emitted-but-not-yet-due slug renders notFound() from a page Next will
 * regenerate. Do not narrow this to published-only.
 *
 * Drafts are excluded deliberately: a draft has no date commitment and should
 * not occupy a route at all.
 */
export function routableSlugs(): string[] {
  return readAll()
    .filter(p => p.status !== "draft")
    .map(p => p.slug);
}
