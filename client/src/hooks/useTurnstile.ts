"use client";

/**
 * useTurnstile — an invisible Cloudflare Turnstile human check for one
 * consultation form. netlify/functions/submit-lead.ts checks the token
 * (netlify/lib/turnstile.ts). The widget logic is in lib/turnstileWidget.ts.
 *
 * The widget is "Sky Window Designs lead forms" in the gbp@shadestrategy.com
 * Cloudflare account. Its site key is public. Hosts other than the live ones,
 * such as Netlify deploy previews and localhost, get Cloudflare's always-pass
 * test key. The server only checks once TURNSTILE_SECRET_KEY is set.
 *
 * Usage:
 *   const turnstile = useTurnstile();
 *   <div ref={turnstile.containerRef} />   // just above the submit button
 *   const token = await turnstile.getToken();   // read at submit time
 *   if (token === null) -> ask the visitor to tick the box, don't send
 *   send { "cf-turnstile-response": token }, then turnstile.reset() once settled
 */
import { useCallback, useRef } from "react";
import { createHumanCheck, type TurnstileApi } from "@/lib/turnstileWidget";

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    onTurnstileLoad?: () => void;
  }
}

export const TURNSTILE_LIVE_HOSTS = ["skywindowdesign.com", "www.skywindowdesign.com"];
export const TURNSTILE_LIVE_SITE_KEY = "0x4AAAAAAF2pw9zxkd7G5Gh0";
export const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
export const TURNSTILE_TICK_MESSAGE = "Please tick the box to confirm you're a person, then send again.";

/** The live key only on the live hosts; read in the browser, never during server rendering. */
export function turnstileSiteKey(hostname: string): string {
  return TURNSTILE_LIVE_HOSTS.includes(hostname) ? TURNSTILE_LIVE_SITE_KEY : TURNSTILE_TEST_SITE_KEY;
}

let scriptLoaded: Promise<void> | null = null;

/** Loads Cloudflare's script once, on the first page that shows a form. */
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  scriptLoaded ??= new Promise<void>((resolve, reject) => {
    window.onTurnstileLoad = () => resolve();
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstileLoad";
    script.async = true;
    script.onerror = () => reject(new Error("Cloudflare Turnstile failed to load"));
    document.head.appendChild(script);
  });
  return scriptLoaded;
}

export function useTurnstile() {
  const check = useRef<ReturnType<typeof createHumanCheck> | null>(null);
  const human = () => (check.current ??= createHumanCheck({ getApi: () => window.turnstile }));

  const containerRef = useCallback((container: HTMLDivElement | null) => {
    if (!container) { human().remove(); return; }
    loadTurnstile().then(
      () => { if (container.isConnected) human().render(container, turnstileSiteKey(window.location.hostname)); },
      () => human().fail(),
    );
  }, []);

  const getToken = useCallback(() => human().token(), []);
  const reset = useCallback(() => human().reset(), []);

  return { containerRef, getToken, reset };
}
