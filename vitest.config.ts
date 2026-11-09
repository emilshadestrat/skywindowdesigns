import path from "node:path";
import { defineConfig } from "vitest/config";

// Kept separate from vite.config.ts, which is the old Manus/Vite app config and
// loads plugins this Next.js site no longer installs.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client/src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      wouter: path.resolve(import.meta.dirname, "client/src/components/navigation.tsx"),
    },
  },
  esbuild: { jsx: "automatic" },
  test: {
    environment: "node",
    // Tests never use a real Turnstile secret, even where the build has one;
    // tests that need the check on stub their own.
    env: { TURNSTILE_SECRET_KEY: "" },
    include: ["tests/**/*.test.ts"],
  },
});
