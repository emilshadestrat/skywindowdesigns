// Next.js App Router now emits metadata and structured data from server routes.
// This compatibility component remains so legacy visual templates can render unchanged.
interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  schema?: object | object[];
  ogImage?: string;
}

export function Seo(_props: SeoProps) {
  return null;
}
