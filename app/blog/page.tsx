// Design philosophy: route wrapper only. The blog index now lists real posts
// read from content/blog/ instead of the "check back soon" placeholder.
import type { Metadata } from "next";
import { BlogIndexClient } from "../_components/BlogClients";
import { JsonLd } from "../_components/JsonLd";
import { publishedPosts } from "../../lib/blog";

// Posts are date-gated at render, so the index has to be revalidated for a
// scheduled post to appear on its date without a redeploy.
export const revalidate = 3600;

const SITE = "https://skywindowdesign.com";

export const metadata: Metadata = {
  title: { absolute: "Blog & Resources | Sky Window Design & More" },
  description:
    "Window treatment tips, design ideas, and product guides from Sky Window Design & More in Orange Beach, Alabama.",
  alternates: { canonical: "/blog" },
};

export default function BlogRoute() {
  const posts = publishedPosts();
  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      ],
    },
  ];
  if (posts.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE}/blog`,
      name: "Sky Window Design & More Blog",
      url: `${SITE}/blog`,
      inLanguage: "en-US",
      blogPost: posts.map(post => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: `${SITE}/blog/${post.slug}`,
        datePublished: post.publishDate,
      })),
    });
  }
  return (
    <>
      <JsonLd data={schema} />
      <BlogIndexClient
        posts={posts.map(({ slug, title, excerpt, category, readTime, displayDate }) => ({
          slug,
          title,
          excerpt,
          category,
          readTime,
          displayDate,
        }))}
      />
    </>
  );
}
