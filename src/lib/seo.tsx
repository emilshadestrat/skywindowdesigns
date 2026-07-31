// seo.ts — SEO infrastructure for Next.js App Router
// Replaces the client-side Seo component with server-side generateMetadata helpers

import type { Metadata } from "next";

const SITE_URL = "https://skywindesign-8rzxlz7n.manus.space";

interface BuildMetadataParams {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
}

/**
 * Build Next.js Metadata object for a page.
 * All meta tags are rendered server-side in the initial HTML.
 */
export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
  type = "website",
}: BuildMetadataParams): Metadata {
  const fullUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return {
    title,
    description,
    alternates: {
      canonical: canonical || "/",
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "Sky Window Design & More",
      type,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

/**
 * Render JSON-LD schema as a Next.js <script> tag.
 * Must be called from a Server Component.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export { SITE_URL };
