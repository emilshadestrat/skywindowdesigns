// app/[slug]/page.tsx — Dynamic service page route
// Next.js App Router with SSG: pre-renders all service pages at build time

import type { Metadata } from "next";
import { PAGES } from "@/lib/siteData";
import { buildMetadata } from "@/lib/seo";
import { StandardPage } from "@/components/StandardPage";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// Pages that have their own dedicated routes (not [slug])
const EXCLUDED_SLUGS = new Set(["about", "visualizer"]);

// Pre-render all service pages at build time
export function generateStaticParams() {
  return Object.keys(PAGES)
    .filter((slug) => !EXCLUDED_SLUGS.has(slug))
    .map((slug) => ({ slug }));
}

// Generate metadata server-side for each page
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const data = PAGES[slug];
    if (!data) return buildMetadata({ title: "Page Not Found", description: "", canonical: "/" });
    return buildMetadata({
      title: data.title,
      description: data.meta,
      canonical: `/${slug}`,
    });
  })();
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = PAGES[slug];
  if (!data) return null;

  return (
    <>
      <Breadcrumbs items={data.breadcrumb} isHeroPage />
      <StandardPage pageKey={slug} />
    </>
  );
}
