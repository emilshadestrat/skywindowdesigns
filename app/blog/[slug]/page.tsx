// Design philosophy: route wrapper only; BlogArticleClient owns presentation.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleClient } from "../../_components/BlogClients";
import { JsonLd } from "../../_components/JsonLd";
import { postBySlug, routableSlugs } from "../../../lib/blog";

export const revalidate = 3600;
export const dynamicParams = false;

const SITE = "https://skywindowdesign.com";

/**
 * Emits every non-draft slug, including posts whose publish date has not
 * arrived. `dynamicParams = false` means a slug omitted here 404s permanently
 * and can never revalidate into an article; an emitted-but-not-yet-due slug
 * renders notFound() from a page Next will regenerate, so the cached 404 is
 * replaced by the article on its date. Do not narrow this to published-only.
 */
export function generateStaticParams() {
  return routableSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: { absolute: post.metaTitle },
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.excerpt,
      url: `${SITE}/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function BlogArticleRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  // Absent because it is scheduled, a draft, or does not exist.
  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}`;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            url,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            datePublished: post.publishDate,
            dateModified: post.publishDate,
            articleSection: post.category,
            inLanguage: "en-US",
            author: { "@type": "Organization", name: post.author, url: `${SITE}/` },
            publisher: { "@type": "Organization", name: "Sky Window Design & More", url: `${SITE}/` },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
              { "@type": "ListItem", position: 3, name: post.title, item: url },
            ],
          },
        ]}
      />
      <BlogArticleClient post={post} />
    </>
  );
}
