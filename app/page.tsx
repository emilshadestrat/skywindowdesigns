import type { Metadata } from "next";
import { JsonLd } from "./_components/JsonLd";
import { homeFaqSchema } from "./_lib/seo";
import { IMAGES } from "@/lib/siteData";
import Home from "@/pages/Home";

export const metadata: Metadata = {
  title: { absolute: "Sky Window Design & More | Custom Window Treatments in Orange Beach, AL" },
  description: "Custom window treatments in Orange Beach, Alabama. Roller shades, shutters, draperies, motorized options, and interior design for Gulf Coast homes and businesses.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [IMAGES.hero] },
};

export default function HomePage() {
  return <><JsonLd data={homeFaqSchema} /><Home /></>;
}
