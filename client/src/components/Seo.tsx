import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  schema?: object | object[];
  ogImage?: string;
}

export function Seo({ title, description, canonical, schema, ogImage }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Standard meta
    setMeta("name", "description", description);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "Sky Window Design & More");
    if (ogImage) {
      setMeta("property", "og:image", ogImage);
    }

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    if (ogImage) {
      setMeta("name", "twitter:image", ogImage);
    }

    // Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    // Remove existing JSON-LD scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up JSON-LD on unmount
      document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
    };
  }, [title, description, canonical, schema, ogImage]);

  return null;
}
