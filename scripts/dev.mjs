#!/usr/bin/env node
/**
 * Dev server wrapper — does three things:
 * 1. Strips the `--` separator that the Manus platform appends
 *    (e.g. `pnpm run dev -- -p 3000`)
 * 2. Starts a lightweight HTTP proxy on a side port for /manus-storage/ requests
 *    (replicates the Vite plugin that signs Forge storage URLs)
 * 3. Spawns `next dev` with the cleaned args, with the proxy as an env var
 *    so next.config.ts rewrites can forward /manus-storage/ to it
 */
import { spawn } from "child_process";
import { createServer } from "http";

// ── Parse args ──────────────────────────────────────────────────────────────
const rawArgs = process.argv.slice(2);
const cleanArgs = rawArgs.filter((a) => a !== "--");
const hasPort = cleanArgs.some((a) => a === "-p" || a === "--port");
if (!hasPort) {
  cleanArgs.push("-p", "3000");
}

// ── Storage proxy server ────────────────────────────────────────────────────
const PROXY_PORT = 3001;

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

proxyServer.listen(PROXY_PORT, () => {
  console.log(`[dev.mjs] Manus storage proxy running on port ${PROXY_PORT}`);
});

// ── Start next dev ──────────────────────────────────────────────────────────
// Set env var so next.config.ts rewrites can forward /manus-storage/ to the proxy
process.env.MANUS_STORAGE_PROXY_URL = `http://localhost:${PROXY_PORT}`;

const child = spawn("npx", ["next", "dev", "--turbopack", ...cleanArgs], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env },
});

child.on("exit", (code) => {
  proxyServer.close();
  process.exit(code ?? 1);
});
