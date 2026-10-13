// Design philosophy: route wrapper preserves the existing readable legal-page presentation.
import type { Metadata } from "next";
import { LegalPageClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Sky Window Design and More" },
  description: "How Sky Window Design and More collects and uses your information, including SMS consent. Mobile information is never shared for marketing.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyRoute() {
  return <LegalPageClient kind="privacy" />;
}
