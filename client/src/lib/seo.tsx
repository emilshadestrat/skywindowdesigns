// seo.ts — SEO infrastructure for Vite + Wouter
// Provides metadata helpers and JSON-LD schema rendering

const SITE_URL = "https://skywindesign-8rzxlz7n.manus.space";

interface BuildMetadataParams {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  type?: "website" | "article";
}

/**
 * Build metadata object for a page.
 * In the Vite version, this is used to update document head tags client-side.
 */
export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
  type = "website",
}: BuildMetadataParams) {
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
 * Render JSON-LD schema as a <script> tag.
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
