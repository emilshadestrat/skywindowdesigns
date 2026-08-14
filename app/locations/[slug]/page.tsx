// Design philosophy: static local-service routes retain the original premium editorial template and approved copy.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPageClient } from "../../_components/LegacyPageClients";
import { JsonLd } from "../../_components/JsonLd";
import { citySchema } from "../../_lib/seo";
import { CITY_PAGES } from "@/lib/siteData";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CITY_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = CITY_PAGES[slug];
  if (!page) return {};

  return {
    title: { absolute: page.title },
    description: page.meta,
    alternates: { canonical: page.canonical },
  };
}

export default async function LocationRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CITY_PAGES[slug]) notFound();
  return <><JsonLd data={citySchema(CITY_PAGES[slug])} /><CityPageClient pageKey={slug} /></>;
}
