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
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const BUCKET = process.env.R2_BUCKET || "skywindowdesigns-public-assets";
const ACCOUNT = process.env.R2_ACCOUNT_ID || "5930d267d82476bd8e6921d9a847be2c";
const PROFILE = process.env.R2_PROFILE || "r2-skywindowdesigns";
const ENDPOINT = `https://${ACCOUNT}.r2.cloudflarestorage.com`;
const DIRS = ["public/media"];

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
        // key mirrors the URL path: public/media/a/b.jpg -> media/a/b.jpg
        else out.set(relative("public", p).split(sep).join("/"), p);
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
  for (const prefix of DIRS.map((d) => relative("public", d))) {
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

if (checkOnly) {
  for (const k of missing) console.log(`  MISSING  ${k}`);
  for (const k of orphaned) console.log(`  ORPHAN   ${k}`);
  // Drift in either direction is worth a non-zero exit so CI or a pre-push
  // hook can act on it.
  process.exit(missing.length || orphaned.length ? 1 : 0);
}

for (const key of missing) {
  process.stdout.write(`  uploading ${key} ... `);
  // aws s3 cp infers Content-Type from the extension, which is what we want:
  // a wrong type here is how images end up downloading instead of rendering.
  aws(["s3", "cp", local.get(key), `s3://${BUCKET}/${key}`]);
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

console.log(`\nDone. ${missing.length} uploaded.`);
