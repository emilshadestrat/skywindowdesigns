// Design philosophy: route wrapper preserves the existing readable accessibility-page presentation.
import type { Metadata } from "next";
import { AccessibilityClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "Accessibility Statement | Sky Window Design and More" },
  description: "Accessibility statement for Sky Window Design and More, Orange Beach, Alabama.",
  alternates: { canonical: "/accessibility/" },
};

export default function AccessibilityRoute() {
  return <AccessibilityClient />;
}
