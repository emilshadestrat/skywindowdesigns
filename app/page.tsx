import type { Metadata } from "next";
import { JsonLd } from "./_components/JsonLd";
import { homeFaqSchema } from "./_lib/seo";
import { IMAGES } from "@/lib/siteData";
import Home from "@/pages/Home";

export const metadata: Metadata = {
  // Service and towns first, brand last. The old title spent its first 26
  // characters on the business name and ran to 71, past Google's ~60-character
  // cut, so the towns were the part being truncated away. Swag Window Designs
  // wins all three town searches with a 52-character title naming two towns.
  title: { absolute: "Window Treatments Orange Beach & Gulf Shores, Alabama" },
  description: "Custom shades, blinds, shutters and draperies from our Orange Beach showroom. Serving Gulf Shores, Foley and the Alabama Gulf Coast. Free consultation.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [IMAGES.hero] },
};

export default function HomePage() {
  return <><JsonLd data={homeFaqSchema} /><Home /></>;
}
