#!/usr/bin/env node
/**
 * Mirrors public/media into the Cloudflare R2 bucket that serves it in
 * production.
 *
 * The repo keeps the authoritative copy; R2 is a mirror. That means the two
 * can drift: add an image, reference it, deploy, and it 404s in production
 * while working perfectly on your machine — because the browser is fetching
 * from R2, not from the site. Run this after adding or replacing anything
 * under public/media.
 *
 *   node scripts/sync-assets-to-r2.mjs           # upload anything missing
 *   node scripts/sync-assets-to-r2.mjs --check   # report drift, upload nothing
 *   node scripts/sync-assets-to-r2.mjs --delete  # also remove R2 objects with
 *                                                # no local counterpart
 *
 * Requires an aws CLI profile with R2 credentials:
 *   aws configure --profile r2-skywindowdesigns   (region: auto)
 *
 * Those credentials are for uploading only. They must NOT be set in Netlify —
 * the build never talks to R2, it only writes the public base URL into the
 * markup.
 */

import { execFileSync } from "node:child_process";
import { closeSync, openSync, readdirSync, readSync, statSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const BUCKET = process.env.R2_BUCKET || "skywindowdesigns-public-assets";
const ACCOUNT = process.env.R2_ACCOUNT_ID || "5930d267d82476bd8e6921d9a847be2c";
const PROFILE = process.env.R2_PROFILE || "r2-skywindowdesigns";
const ENDPOINT = `https://${ACCOUNT}.r2.cloudflarestorage.com`;
const DIRS = ["public/media"];
// Keys mirror the URL path, so the public root is stripped from each one:
// public/media/a/b.webp -> media/a/b.webp
const PUBLIC_ROOT = "public";

/**
 * What a file actually is, by its first bytes — not by its name.
 *
 * Two independent problems make this worth doing before every upload:
 *
 *  1. **Files that are not images at all.** Two files in this portfolio were
 *     376 KB HTML error pages saved during a curl, wearing a `.png` name.
 *     Netlify served them as `content-type: image/png` regardless, because the
 *     header comes from the extension — so a 200 with the right content type
 *     is *not* proof that an image is real. Only the bytes are.
 *
 *  2. **Real images with the wrong extension.** A WebP named `.jpg` renders
 *     fine in a browser, which is why it survives unnoticed. But `aws s3 cp`
 *     also derives the content type from the extension, so the mirror would
 *     claim `image/jpeg` for WebP bytes, and unknown extensions land as
 *     `application/octet-stream`, which browsers refuse to render.
 *
 * So: refuse the first, and fix the second on the way past by passing an
 * explicit `--content-type`.
 */
const SIGNATURES = [
  ["image/png", (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47],
  ["image/jpeg", (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff],
  ["image/gif", (b) => b.subarray(0, 4).toString("latin1") === "GIF8"],
  ["image/webp", (b) => b.subarray(0, 4).toString("latin1") === "RIFF" && b.subarray(8, 12).toString("latin1") === "WEBP"],
  ["image/x-icon", (b) => b[0] === 0x00 && b[1] === 0x00 && b[2] === 0x01 && b[3] === 0x00],
  ["image/avif", (b) => b.subarray(4, 8).toString("latin1") === "ftyp" && b.subarray(8, 12).toString("latin1").startsWith("avif")],
  ["video/mp4", (b) => b.subarray(4, 8).toString("latin1") === "ftyp"],
];

const BY_EXTENSION = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
};

function sniff(file) {
  // 12 bytes is enough for every binary signature above, but not to tell an SVG
  // from any other XML document: both open `<?xml version="1.0"`, and 12 bytes
  // holds only `<?xml versio` — not even the closing `?>`. A declaration-strip
  // built on that read can never match, so every SVG carrying a prologue falls
  // through to "not an image" and is skipped instead of mirrored. 4 KB clears a
  // declaration, a DOCTYPE and an editor's generator comment with room to spare.
  const fd = openSync(file, "r");
  const head = Buffer.alloc(4096);
  let read = 0;
  try {
    read = readSync(fd, head, 0, 4096, 0);
  } finally {
    closeSync(fd);
  }
  const magic = head.subarray(0, 12);
  for (const [type, matches] of SIGNATURES) if (matches(magic)) return type;
  let text = head.subarray(0, read).toString("latin1").trim().toLowerCase();
  // SVG is text, so it has no magic number worth trusting — which makes it the
  // easy thing for a non-image to be mistaken for. An S3 error response is XML
  // too: beacon-blinds-rebuild had a 111-byte
  // <Error><Code>AccessDenied</Code></Error> saved with a .webp name, and a
  // check that accepted any XML called it a valid image.
  //
  // So skip only what may legitimately precede a root element — the XML
  // declaration, a DOCTYPE, comments — and then require that the root itself is
  // <svg>. Searching for "<svg" anywhere in the head would reopen the same hole
  // from the other side, since plenty of HTML error pages embed an inline SVG
  // icon well within the first few KB.
  for (;;) {
    const before = text;
    text = text
      .replace(/^\s+/, "")
      .replace(/^<\?xml[^>]*\?>/, "")
      .replace(/^<!--[\s\S]*?-->/, "")
      .replace(/^<!doctype[^>]*>/, "");
    if (text === before) break;
  }
  return text.startsWith("<svg") ? "image/svg+xml" : null;
}

/**
 * Returns the content type to upload with, or null when the file should not be
 * uploaded at all.
 */
function inspect(file) {
  const declared = BY_EXTENSION[extname(file).toLowerCase()] ?? null;
  const actual = sniff(file);
  // Not a recognisable image or video. If the name claims to be one, that is a
  // broken file, not a naming quirk.
  if (actual === null) return { type: declared, broken: declared !== null };
  return { type: actual, mislabelled: declared !== null && declared !== actual, declared };
}

const checkOnly = process.argv.includes("--check");
const withDelete = process.argv.includes("--delete");

function aws(args) {
  return execFileSync("aws", [...args, "--endpoint-url", ENDPOINT, "--profile", PROFILE], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

/** Every file under the mirrored dirs, keyed the way R2 stores it. */
function localKeys() {
  const out = new Map();
  for (const dir of DIRS) {
    const walk = (d) => {
      for (const name of readdirSync(d)) {
        const p = join(d, name);
        if (statSync(p).isDirectory()) walk(p);
        else out.set(relative(PUBLIC_ROOT, p).split(sep).join("/"), p);
      }
    };
    try {
      walk(dir);
    } catch {
      // directory absent — nothing to mirror from it
    }
  }
  return out;
}

function remoteKeys() {
  const out = new Set();
  for (const prefix of DIRS.map((d) => relative(PUBLIC_ROOT, d))) {
    let token = "";
    do {
      const args = ["s3api", "list-objects-v2", "--bucket", BUCKET, "--prefix", `${prefix}/`, "--max-keys", "1000"];
      if (token) args.push("--continuation-token", token);
      const res = JSON.parse(aws(args) || "{}");
      for (const o of res.Contents ?? []) out.add(o.Key);
      token = res.IsTruncated ? res.NextContinuationToken : "";
    } while (token);
  }
  return out;
}

const local = localKeys();
const remote = remoteKeys();

const missing = [...local.keys()].filter((k) => !remote.has(k)).sort();
const orphaned = [...remote].filter((k) => !local.has(k)).sort();

console.log(`local:  ${local.size} files`);
console.log(`remote: ${remote.size} objects`);
console.log(`missing from R2: ${missing.length}`);
console.log(`in R2 with no local copy: ${orphaned.length}`);

const inspected = new Map([...local.entries()].map(([key, file]) => [key, inspect(file)]));
const broken = [...inspected.entries()].filter(([, i]) => i.broken);
const mislabelled = [...inspected.entries()].filter(([, i]) => i.mislabelled);

if (broken.length) {
  console.log(`
not actually images: ${broken.length}`);
  for (const [key] of broken) console.log(`  BROKEN     ${key} — the bytes are not an image`);
}
if (mislabelled.length) {
  console.log(`
real images with a misleading extension: ${mislabelled.length}`);
  for (const [key, i] of mislabelled) console.log(`  MISLABELLED ${key} is ${i.type}, not ${i.declared} — uploading with the real type`);
}

if (checkOnly) {
  for (const k of missing) console.log(`  MISSING  ${k}`);
  for (const k of orphaned) console.log(`  ORPHAN   ${k}`);
  // Drift in either direction is worth a non-zero exit so CI or a pre-push
  // hook can act on it.
  process.exit(missing.length || orphaned.length || broken.length ? 1 : 0);
}

const brokenKeys = new Set(broken.map(([key]) => key));
let uploaded = 0;

for (const key of missing) {
  if (brokenKeys.has(key)) {
    console.log(`  SKIPPED    ${key} — fix the file, don't mirror it`);
    continue;
  }
  const { type } = inspected.get(key);
  process.stdout.write(`  uploading ${key} ... `);
  // Always pass the type explicitly. Left to itself, aws s3 cp derives it from
  // the extension, which is wrong for a mislabelled file and lands unknown
  // extensions as application/octet-stream — which browsers refuse to render.
  const args = ["s3", "cp", local.get(key), `s3://${BUCKET}/${key}`];
  if (type) args.push("--content-type", type);
  aws(args);
  uploaded += 1;
  console.log("ok");
}

if (withDelete) {
  for (const key of orphaned) {
    process.stdout.write(`  deleting ${key} ... `);
    aws(["s3", "rm", `s3://${BUCKET}/${key}`]);
    console.log("ok");
  }
} else if (orphaned.length) {
  console.log("\nOrphaned objects left in place. Re-run with --delete to remove them.");
}

console.log(`\nDone. ${uploaded} uploaded.`);
if (brokenKeys.size) process.exitCode = 1;
