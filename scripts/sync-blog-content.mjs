#!/usr/bin/env node
/**
 * Reports what the blog will publish, and fails the build on a malformed post.
 *
 * Unlike the sibling sites, nothing needs generating here — `lib/blog.ts` reads
 * the content files directly at request time. This script exists so a broken
 * post stops the build with a clear message instead of throwing mid-render,
 * and so the build log always states what is live and what is queued.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load as loadYaml } from "js-yaml";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "content", "blog");
const today = new Date().toISOString().slice(0, 10);

if (!fs.existsSync(DIR)) {
  console.log("Blog content: no content/blog directory yet — nothing to publish.");
  process.exit(0);
}

const slugs = fs.readdirSync(DIR).filter(s => fs.existsSync(path.join(DIR, s, "index.yaml")));
const posts = slugs.map(slug => {
  const d = loadYaml(fs.readFileSync(path.join(DIR, slug, "index.yaml"), "utf8")) ?? {};
  for (const field of ["title", "excerpt", "publishDate"]) {
    if (!d[field]) throw new Error(`content/blog/${slug}: missing required field "${field}"`);
  }
  const date = String(d.publishDate).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`content/blog/${slug}: publishDate "${d.publishDate}" is not YYYY-MM-DD`);
  const status = d.status ?? "draft";
  if (!["draft", "published"].includes(status)) throw new Error(`content/blog/${slug}: unknown status "${status}"`);
  if (!Array.isArray(d.body)) throw new Error(`content/blog/${slug}: body must be a list`);
  return { slug, date, status };
});

const live = posts.filter(p => p.status === "published" && p.date <= today);
const queued = posts.filter(p => p.status === "published" && p.date > today);
const drafts = posts.filter(p => p.status === "draft");

console.log(
  `Blog content: ${posts.length} file(s) — ${live.length} live, ${queued.length} scheduled, ${drafts.length} draft (as of ${today}).`,
);
if (queued.length) {
  const next = queued.sort((a, b) => (a.date < b.date ? -1 : 1))[0];
  console.log(`  Next to publish: ${next.date} ${next.slug}`);
}
