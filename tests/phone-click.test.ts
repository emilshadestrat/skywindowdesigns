// Every tel: link click must reach GA4 as phone_click (live audit 2026-11-17 found
// none). Runs the real inline GA4 init script against a fake document.
import vm from "node:vm";
import { describe, expect, it } from "vitest";
import { ga4InitScript } from "../app/_components/GoogleAnalytics";

class FakeElement {
  constructor(private readonly link: { href: string; textContent: string } | null) {}
  closest(selector: string) {
    if (selector !== 'a[href^="tel:"]' || !this.link) return null;
    const { href, textContent } = this.link;
    return { textContent, getAttribute: (name: string) => (name === "href" ? href : null) };
  }
}

function install() {
  const listeners: [string, (event: { target: unknown }) => void, unknown][] = [];
  const window: { dataLayer?: unknown[] } = {};
  const context = vm.createContext({
    window,
    Element: FakeElement,
    document: { addEventListener: (...args: [string, (event: { target: unknown }) => void, unknown]) => listeners.push(args) },
  });
  // The page's global object is `window`, so `dataLayer` resolves to window.dataLayer.
  vm.runInContext("var dataLayer; window = this; window.Element = Element;", context);
  vm.runInContext(ga4InitScript, context);
  const dataLayer = vm.runInContext("dataLayer", context) as IArguments[];
  return { listeners, dataLayer };
}

describe("GA4 phone_click", () => {
  it("is one capture-phase document click listener", () => {
    const { listeners } = install();
    expect(listeners).toHaveLength(1);
    expect(listeners[0][0]).toBe("click");
    expect(listeners[0][2]).toBe(true);
  });

  it("pushes ['event', 'phone_click', {link_url, link_text}] as an Arguments entry for tel: links only", () => {
    const { listeners, dataLayer } = install();
    const click = listeners[0][1];
    const before = dataLayer.length;
    click({ target: new FakeElement({ href: "tel:+12512067319", textContent: "\n  Call   (251) 206-7319 " }) });
    click({ target: new FakeElement(null) });
    click({ target: {} });
    const added = dataLayer.slice(before);
    expect(added).toHaveLength(1);
    expect(Object.prototype.toString.call(added[0])).toBe("[object Arguments]");
    expect(JSON.parse(JSON.stringify(Array.from(added[0])))).toEqual([
      "event",
      "phone_click",
      { link_url: "tel:+12512067319", link_text: "Call (251) 206-7319" },
    ]);
  });

  it("keeps the existing config and sends no other event", () => {
    expect(ga4InitScript).toContain("gtag('config', 'G-XKMPRYNWCQ');");
    expect(ga4InitScript.match(/gtag\('event', '[a-z_]+'/g)).toEqual(["gtag('event', 'phone_click'"]);
    expect(ga4InitScript).not.toMatch(/AW-|send_to|fbq|GTM-/);
  });
});
