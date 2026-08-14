// Design philosophy: App Router route layer only; the existing premium page template remains the visual source of truth.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StandardPageClient } from "../_components/LegacyPageClients";
import { JsonLd } from "../_components/JsonLd";
import { serviceSchema } from "../_lib/seo";
import { PAGES } from "@/lib/siteData";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) return {};

  return {
    title: { absolute: page.title },
    description: page.meta,
    alternates: { canonical: page.canonical },
  };
}

export default async function StandardRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!PAGES[slug]) notFound();
  return <><JsonLd data={serviceSchema(PAGES[slug])} /><StandardPageClient pageKey={slug} /></>;
}
