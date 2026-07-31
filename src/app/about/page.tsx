// app/about/page.tsx — About page
// Next.js: Server Component using StandardPage with server-side metadata

import type { Metadata } from "next";
import { StandardPage } from "@/components/StandardPage";
import { buildMetadata } from "@/lib/seo";
import { PAGES } from "@/lib/siteData";

const data = PAGES["about"];

export const metadata: Metadata = buildMetadata({
  title: data.title,
  description: data.meta,
  canonical: "/about",
});

export default function AboutPage() {
  return <StandardPage pageKey="about" />;
}
