// The three pages an A2P 10DLC reviewer opens: the Privacy Policy, the Terms
// of Service and the SMS consent page. Patterned on shenandoahshutters.com,
// whose campaign was approved with the same set (see
// docs/a2p-campaign-package.md). Rendered by components/LegalPage.tsx.
//
// Internal links are plain anchors so tests can render these sections without
// a router.

import type { ReactNode } from "react";
import { CONTACT } from "./siteData";
import { SMS_DISCLOSURE, SMS_PROMO_CONSENT, SMS_SENDER, SMS_SERVICE_CONSENT } from "./smsConsent";

export type LegalSection = { heading: string; body: ReactNode };
export type LegalDoc = { title: string; eyebrow: string; effective: string; sections: LegalSection[] };
export type LegalKind = "privacy" | "terms" | "sms";

const link = "text-blue-700 underline underline-offset-2 hover:text-blue-900";

const contactUs: LegalSection = {
  heading: "Contact Us",
  body: (
    <address className="not-italic">
      {CONTACT.legalName}<br />
      {CONTACT.address.street}<br />
      {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}<br />
      <a href={CONTACT.phoneHref} className={link}>{CONTACT.phone}</a><br />
      <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a>
    </address>
  ),
};

const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  eyebrow: "Privacy Policy",
  effective: "October 13, 2026",
  sections: [
    {
      heading: "Information We Collect",
      body: <>
        <p>{SMS_SENDER} collects the information you choose to give us through our website forms, phone calls, emails, and in-person consultations. This may include your name, phone number, email address, project details, property address, and your SMS consent choices. We also collect limited technical and attribution information needed to run the website, prevent spam, and understand how visitors find us.</p>
        <p>We do not sell or rent your personal information.</p>
      </>,
    },
    {
      heading: "How We Use Information",
      body: <>
        <p>We use your information to respond to inquiries, schedule consultations, provide quotes, coordinate installations, communicate about your project, keep records of requests, and improve our website. We may also send occasional updates about products and promotions if you have opted in to receive them.</p>
        <p>We use service providers for website hosting, analytics, form handling, customer relationship management, and message delivery. They process information on our behalf, only to perform those services for us.</p>
      </>,
    },
    {
      heading: "Mobile Information and SMS",
      body: <>
        <p>Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. Sharing with subcontractors and service providers that support customer service, scheduling, website operations, or message delivery is permitted only as needed to provide those services. Text messaging opt-in data and consent will not be shared with any third parties.</p>
        <p>SMS consent is optional and is not a condition of purchase. Service texts and promotional texts are separate choices on our forms. If you opt in, message frequency varies and message and data rates may apply. Reply <strong>STOP</strong> to cancel and <strong>HELP</strong> for assistance. See <a href="/sms-consent" className={link}>SMS Consent and Messaging</a> for how consent is collected.</p>
      </>,
    },
    {
      heading: "Cookies and Analytics",
      body: <p>Our website uses cookies and analytics tools to understand how visitors use the site. This data is aggregated and does not identify individual users. You can disable cookies in your browser settings.</p>,
    },
    {
      heading: "Your Privacy Choices",
      body: <p>Depending on where you live, you may have the right to request access to, correction of, or deletion of personal information we hold about you. To make a request or ask a privacy question, contact us using the details below. We will respond within a reasonable time and may need to verify your request before acting on it.</p>,
    },
    {
      heading: "Security and Retention",
      body: <p>We use reasonable safeguards designed to protect the information submitted through this website. We keep information only as long as reasonably necessary for the purposes described above, for legal requirements, and for legitimate business records. You may ask us to update your contact information or stop optional marketing communications at any time.</p>,
    },
    {
      heading: "Policy Updates",
      body: <p>We may update this policy as our practices or legal requirements change. The current version is always posted on this page with its effective date.</p>,
    },
    contactUs,
  ],
};

const TERMS: LegalDoc = {
  title: "Terms of Service",
  eyebrow: "Terms of Service",
  effective: "October 13, 2026",
  sections: [
    {
      heading: "Website Use",
      body: <p>This website provides information about custom window treatments from {SMS_SENDER} and ways to request a quote or consultation. Please provide accurate contact information when you request service, and use the site only for lawful purposes.</p>,
    },
    {
      heading: "Quote and Consultation Requests",
      body: <p>Submitting a form asks {SMS_SENDER} to contact you. It does not create a purchase obligation, a contract, or a guarantee of availability. Product selection, measurements, pricing, timing, and installation terms are confirmed separately.</p>,
    },
    {
      heading: "SMS Terms",
      body: <>
        <p>Our forms offer two optional SMS checkboxes. By selecting one, you consent only to the type of message described beside it:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Service texts</strong> about consultations, appointment reminders, quotes, installation scheduling, project updates, and customer support.</li>
          <li><strong>Promotional texts</strong> about special offers, discounts, product announcements, and seasonal promotions.</li>
        </ul>
        <p>Message frequency varies. Message and data rates may apply. Reply <strong>STOP</strong> to opt out at any time; after you do, we will stop texting that number unless you opt in again. Reply <strong>HELP</strong> for assistance, or call <a href={CONTACT.phoneHref} className={link}>{CONTACT.phone}</a>. Consent is not a condition of purchase. Carriers are not liable for delayed or undelivered messages.</p>
      </>,
    },
    {
      heading: "Privacy",
      body: <p>Your use of this website is also governed by our <a href="/privacy" className={link}>Privacy Policy</a>, including its commitment that mobile information is not shared with third parties or affiliates for marketing or promotional purposes.</p>,
    },
    {
      heading: "Changes to These Terms",
      body: <p>We may update these terms from time to time. The current version is always posted on this page with its effective date.</p>,
    },
    contactUs,
  ],
};

const SMS_CONSENT: LegalDoc = {
  title: "SMS Consent and Messaging Information",
  eyebrow: "SMS Consent",
  effective: "October 13, 2026",
  sections: [
    {
      heading: "How Website Visitors Opt In",
      body: <>
        <p>Our only current SMS opt-in method is the quote and consultation form on this website. The same form appears on our <a href="/contact" className={link}>contact page</a> and on each product and service page.</p>
        <p>Visitors enter their contact details and may select either, both, or neither of two optional checkboxes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Service texts: &ldquo;{SMS_SERVICE_CONSENT}&rdquo;</li>
          <li>Promotional texts: &ldquo;{SMS_PROMO_CONSENT}&rdquo;</li>
        </ul>
        <p>Beneath the checkboxes the form states: &ldquo;{SMS_DISCLOSURE}&rdquo; It also links to our Privacy Policy, our Terms of Service, and this page.</p>
        <p>Neither checkbox is preselected, and neither is required to request a quote, book a consultation, or make a purchase. We do not use paper forms, purchased lists, shared opt-in lists, keyword opt-in, or third-party lead consent as SMS opt-in methods.</p>
      </>,
    },
    {
      heading: "Consent Is Specific and Voluntary",
      body: <p>Each message type has its own checkbox, and a visitor can send a request without selecting either one. We record each visitor&rsquo;s choices with the date and the page they submitted from, and we text only the message types a visitor selected.</p>,
    },
    {
      heading: "Message Types",
      body: <p>Service messages cover the consultation and project lifecycle: consultation confirmations, appointment reminders, quotes, installation scheduling, project updates, and customer support. Promotional messages, such as special offers, discounts, product announcements, and seasonal promotions, go only to people who separately selected the promotional checkbox. Message frequency varies, and message and data rates may apply.</p>,
    },
    {
      heading: "Opting Out and Getting Help",
      body: <p>Reply <strong>STOP</strong> to any message to opt out, or <strong>HELP</strong> for assistance. You can also call <a href={CONTACT.phoneHref} className={link}>{CONTACT.phone}</a> or email <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a>.</p>,
    },
    {
      heading: "Mobile Information and Sharing",
      body: <p>{SMS_SENDER} does not sell, rent, lease, or share SMS opt-in data, phone numbers, or consent records with third parties or affiliates for their marketing or promotional purposes. Our customer relationship platform processes these records only on our behalf, to deliver the messages a visitor chose. See our <a href="/privacy" className={link}>Privacy Policy</a> and <a href="/terms-of-service" className={link}>Terms of Service</a> for more.</p>,
    },
    contactUs,
  ],
};

export const LEGAL_DOCS: Record<LegalKind, LegalDoc> = { privacy: PRIVACY, terms: TERMS, sms: SMS_CONSENT };
