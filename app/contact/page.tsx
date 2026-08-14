// Design philosophy: route wrapper preserves the current high-end contact presentation.
import type { Metadata } from "next";
import { ContactPageClient } from "../_components/LegacyPageClients";
import { JsonLd } from "../_components/JsonLd";
import { localBusinessSchema } from "../_lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Contact Sky Window Design and More | Orange Beach, AL" },
  description: "Contact Sky Window Design and More in Orange Beach, Alabama, to discuss custom window treatments, motorized shades, draperies and more.",
  alternates: { canonical: "/contact/" },
};

export default function ContactRoute() {
  return <><JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", mainEntity: localBusinessSchema }} /><ContactPageClient /></>;
}
