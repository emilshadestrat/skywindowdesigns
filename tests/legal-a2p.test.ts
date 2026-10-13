// Guards what an A2P 10DLC reviewer checks before approving the SMS campaign:
// every lead form carries two separate, optional, unchecked SMS opt-ins that
// name the sender and disclose frequency, rates, STOP, HELP and "not a
// condition of purchase"; the Privacy Policy, Terms of Service and SMS consent
// pages exist, carry the required clauses and are linked from the form and
// the footer; and the campaign package quotes the live form word for word.
// Patterned on shenandoahshutters.com's approved campaign.
import fs from "node:fs";
import path from "node:path";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { crawlableRoutes } from "../app/_lib/seo";
import { SmsConsent } from "../client/src/components/SmsConsent";
import { LEGAL_DOCS, type LegalKind } from "../client/src/lib/legal";
import { CONTACT } from "../client/src/lib/siteData";
import { SMS_DISCLOSURE, SMS_PROMO_CONSENT, SMS_SERVICE_CONSENT, smsChoices } from "../client/src/lib/smsConsent";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");

function textOf(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .replace(/ ([.,])/g, "$1");
}

function docText(kind: LegalKind): string {
  const sections = LEGAL_DOCS[kind].sections.map((s) => createElement(Fragment, { key: s.heading }, s.heading, " ", s.body));
  return textOf(renderToStaticMarkup(createElement(Fragment, null, ...sections)));
}

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(relative);
    return /\.tsx?$/.test(entry.name) ? [relative] : [];
  });
}

describe("the SMS opt-in on the lead forms", () => {
  const html = renderToStaticMarkup(createElement(SmsConsent));
  const text = textOf(html);

  it("offers two separate checkboxes, neither checked nor required", () => {
    expect(html.match(/type="checkbox"/g)).toHaveLength(2);
    expect(html).toContain('name="sms_transactional"');
    expect(html).toContain('name="sms_marketing"');
    expect(html).not.toMatch(/\schecked/);
    expect(html).not.toMatch(/\srequired/);
    expect(text).toContain("SMS updates (optional)");
  });

  it("names the sender and discloses frequency, rates, STOP, HELP and no purchase condition", () => {
    expect(text).toContain(SMS_SERVICE_CONSENT);
    expect(text).toContain(SMS_PROMO_CONSENT);
    expect(SMS_SERVICE_CONSENT).toContain(CONTACT.legalName);
    expect(SMS_PROMO_CONSENT).toContain(CONTACT.legalName);
    expect(SMS_SERVICE_CONSENT).not.toMatch(/promot|offer/i);
    for (const phrase of ["Message frequency varies.", "Message and data rates may apply.", "Reply STOP to opt out", "HELP for help", "Consent is not a condition of purchase."]) {
      expect(text).toContain(phrase);
    }
  });

  it("ties both checkboxes to the disclosure and links the three policy pages", () => {
    const [, disclosureId] = html.match(/id="([^"]+-sms-disclosure)"/) ?? [];
    expect(disclosureId).toBeTruthy();
    expect(html.split(`aria-describedby="${disclosureId}"`)).toHaveLength(3);
    for (const href of ["/privacy", "/terms-of-service", "/sms-consent"]) expect(html).toContain(`href="${href}"`);
  });

  it("reads only a ticked box as consent", () => {
    expect(smsChoices(new FormData())).toEqual({ smsTransactionalOptIn: false, smsMarketingOptIn: false });
    const fd = new FormData();
    fd.set("sms_transactional", "on");
    expect(smsChoices(fd)).toEqual({ smsTransactionalOptIn: true, smsMarketingOptIn: false });
  });

  it("is on every form that submits a lead, and every form sends the choices", () => {
    const forms = sourceFiles("client/src").filter((file) => read(file).includes("await submitLead("));
    expect(forms).toEqual(expect.arrayContaining(["client/src/pages/Contact.tsx", "client/src/components/StandardPage.tsx"]));
    for (const file of forms) {
      expect(read(file), file).toContain("<SmsConsent");
      expect(read(file), file).toContain("...smsChoices(fd)");
    }
  });
});

describe("the policy pages", () => {
  it("Privacy Policy carries the mobile-information and opt-in no-sharing clauses", () => {
    const text = docText("privacy");
    expect(text).toContain("Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes.");
    expect(text).toContain("Text messaging opt-in data and consent will not be shared with any third parties.");
    expect(text).toContain("Reply STOP to cancel and HELP for assistance.");
    expect(text).toContain("not a condition of purchase");
    expect(text).toContain("Your Privacy Choices");
  });

  it("Terms of Service carries the SMS program terms", () => {
    const text = docText("terms");
    for (const phrase of ["Service texts", "Promotional texts", "Message frequency varies.", "Message and data rates may apply.", "Reply STOP to opt out", "Reply HELP for assistance", "Consent is not a condition of purchase.", "Carriers are not liable for delayed or undelivered messages."]) {
      expect(text).toContain(phrase);
    }
  });

  it("SMS consent page states the only opt-in method and quotes the live form verbatim", () => {
    const text = docText("sms");
    expect(text).toContain("Our only current SMS opt-in method is the quote and consultation form");
    expect(text).toContain(SMS_SERVICE_CONSENT);
    expect(text).toContain(SMS_PROMO_CONSENT);
    expect(text).toContain(SMS_DISCLOSURE);
    expect(text).toContain("does not sell, rent, lease, or share SMS opt-in data");
  });

  it("each page ends with the business's legal name, address and phone", () => {
    for (const kind of ["privacy", "terms", "sms"] as const) {
      const text = docText(kind);
      expect(text, kind).toContain(CONTACT.legalName);
      expect(text, kind).toContain(CONTACT.address.street);
      expect(text, kind).toContain(CONTACT.phone);
    }
  });

  it("are in the sitemap and linked from the footer", () => {
    const footer = read("client/src/components/Layout.tsx");
    for (const route of ["/privacy", "/terms-of-service", "/sms-consent"]) {
      expect(crawlableRoutes).toContain(route);
      expect(footer).toContain(`href="${route}"`);
    }
  });
});

describe("the A2P campaign package", () => {
  const pkg = read("docs/a2p-campaign-package.md");

  it("quotes the live form wording word for word", () => {
    expect(pkg).toContain(SMS_SERVICE_CONSENT);
    expect(pkg).toContain(SMS_PROMO_CONSENT);
    expect(pkg).toContain(SMS_DISCLOSURE);
  });

  it("points at the live evidence pages", () => {
    for (const url of ["https://skywindowdesign.com/contact", "https://skywindowdesign.com/privacy", "https://skywindowdesign.com/terms-of-service", "https://skywindowdesign.com/sms-consent"]) {
      expect(pkg).toContain(url);
    }
  });
});
