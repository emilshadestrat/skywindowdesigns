#!/usr/bin/env node
/**
 * Dev server wrapper — strips the `--` separator that the Manus platform appends
 * (e.g. `pnpm run dev -- -p 3000`) and passes the remaining args to `next dev`.
 */
import { spawn } from "child_process";

// Get args after the script name
const rawArgs = process.argv.slice(2);

// Filter out any `--` separators that pnpm/npm passes through
const cleanArgs = rawArgs.filter((a) => a !== "--");

// Default to port 3000 if not specified
const hasPort = cleanArgs.some((a) => a === "-p" || a === "--port");
if (!hasPort) {
  cleanArgs.push("-p", "3000");
}

// Spawn next dev with the cleaned args
const child = spawn("npx", ["next", "dev", "--turbopack", ...cleanArgs], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
