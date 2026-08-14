// Design philosophy: route wrapper preserves the existing readable legal-page presentation.
import type { Metadata } from "next";
import { PrivacyClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Sky Window Design and More" },
  description: "Privacy policy for Sky Window Design and More, Orange Beach, Alabama.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyRoute() {
  return <PrivacyClient />;
}
