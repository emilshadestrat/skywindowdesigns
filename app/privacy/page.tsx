// Design philosophy: route wrapper preserves the existing readable legal-page presentation.
import type { Metadata } from "next";
import { PrivacyClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Sky Window Design and More" },
  description: "How Sky Window Design and More in Orange Beach, AL collects and uses your information. We do not sell or rent your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyRoute() {
  return <PrivacyClient />;
}
