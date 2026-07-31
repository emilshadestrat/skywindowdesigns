#!/usr/bin/env node
/**
 * Dev server wrapper — does three things:
 * 1. Strips the `--` separator that the Manus platform appends
 * 2. Starts a storage proxy on a high port (not 3000) for /manus-storage/ requests
 * 3. Spawns `next dev` on port 3000 — the platform should detect this as the dev server
 *
 * Key: the proxy must NOT listen on port 3000 or any port the platform might
 * auto-detect. We use port 4567 and set MANUS_STORAGE_PROXY_URL so next.config.ts
 * rewrites can forward /manus-storage/ to it.
 */
import { spawn } from "child_process";
import { createServer } from "http";
import { setTimeout as sleep } from "timers/promises";

// ── Parse args ──────────────────────────────────────────────────────────────
const rawArgs = process.argv.slice(2);
const cleanArgs = rawArgs.filter((a) => a !== "--");
const hasPort = cleanArgs.some((a) => a === "-p" || a === "--port");
if (!hasPort) {
  cleanArgs.push("-p", "3000");
}

// ── Storage proxy server (high port, not auto-detected by platform) ─────────
const PROXY_PORT = 4567;

const proxyServer = createServer(async (req, res) => {
  try {
    const key = (req.url || "").replace(/^\//, "");
    if (!key) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing storage key");
      return;
    }

    const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
    const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!forgeBaseUrl || !forgeKey) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Storage proxy not configured");
      return;
    }

    const forgeUrl = new URL("v1/storage/presign/get", forgeBaseUrl + "/");
    forgeUrl.searchParams.set("path", key);

    const forgeResp = await fetch(forgeUrl, {
      headers: { Authorization: `Bearer ${forgeKey}` },
    });

    if (!forgeResp.ok) {
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Storage backend error");
      return;
    }

    const data = await forgeResp.json();
    if (!data.url) {
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Empty signed URL");
      return;
    }

    res.writeHead(307, {
      Location: data.url,
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
    });
    res.end();
  } catch {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Storage proxy error");
  }
});

// Start proxy silently — don't log to stdout to avoid confusing the platform
proxyServer.listen(PROXY_PORT, "127.0.0.1", () => {
  // Proxy is ready
});

// ── Start next dev on port 3000 ─────────────────────────────────────────────
// Set env var so next.config.ts rewrites can forward /manus-storage/ to the proxy
process.env.MANUS_STORAGE_PROXY_URL = `http://127.0.0.1:${PROXY_PORT}`;

// Small delay to ensure proxy is listening before next dev starts
await sleep(500);

const child = spawn("npx", ["next", "dev", "--turbopack", ...cleanArgs], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env },
});

child.on("exit", (code) => {
  proxyServer.close();
  process.exit(code ?? 1);
});
