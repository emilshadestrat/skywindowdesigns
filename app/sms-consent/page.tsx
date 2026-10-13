// The public evidence page for the A2P 10DLC campaign: how the website
// collects SMS consent. Linked from every lead form's SMS opt-in.
import type { Metadata } from "next";
import { LegalPageClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "SMS Consent and Messaging | Sky Window Design and More" },
  description: "How Sky Window Design and More collects optional SMS consent on its website, the texts it sends, and how to opt out with STOP or get HELP.",
  alternates: { canonical: "/sms-consent" },
};

export default function SmsConsentRoute() {
  return <LegalPageClient kind="sms" />;
}
