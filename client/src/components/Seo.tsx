import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  schema?: object | object[];
}

export function Seo({ title, description, canonical, schema }: SeoProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);

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
  }, [title, description, canonical, schema]);

  return null;
}
