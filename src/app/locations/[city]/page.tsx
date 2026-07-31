// app/locations/[city]/page.tsx — Dynamic city page route
// Next.js App Router with SSG: pre-renders all city pages at build time

import type { Metadata } from "next";
import { CITY_PAGES } from "@/lib/siteData";
import { buildMetadata } from "@/lib/seo";
import { CityPage } from "@/components/CityPage";

// Pre-render all city pages at build time
export function generateStaticParams() {
  return Object.keys(CITY_PAGES).map((city) => ({ city }));
}

// Generate metadata server-side for each city page
export function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  return (async () => {
    const { city } = await params;
    const data = CITY_PAGES[city];
    if (!data) return buildMetadata({ title: "Page Not Found", description: "", canonical: "/" });
    return buildMetadata({
      title: data.title,
      description: data.meta,
      canonical: `/locations/${city}`,
    });
  })();
}

export default async function CityPageRoute({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = CITY_PAGES[city];
  if (!data) return null;

  return <CityPage pageKey={city} />;
}
