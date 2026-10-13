// Linked from every lead form's SMS opt-in; an A2P 10DLC reviewer opens it.
import type { Metadata } from "next";
import { LegalPageClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Sky Window Design and More" },
  description: "Website, quote request and SMS messaging terms for Sky Window Design and More in Orange Beach, AL, including how to opt out with STOP.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsRoute() {
  return <LegalPageClient kind="terms" />;
}
