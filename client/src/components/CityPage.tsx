import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CITY_PAGES, type CityPageData } from "@/lib/siteData";

export function CityPage({ pageKey }: { pageKey: string }) {
  const data: CityPageData | undefined = CITY_PAGES[pageKey];
  if (!data) return null;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Window Treatments in ${data.area}`,
      provider: {
        "@type": "LocalBusiness",
        name: "Sky Window Design & More",
        telephone: "+12512067319",
        address: {
          "@type": "PostalAddress",
          streetAddress: "25405 Perdido Beach Blvd., Suite 7A",
          addressLocality: "Orange Beach",
          addressRegion: "AL",
          postalCode: "36561",
          addressCountry: "US",
        },
      },
      areaServed: data.area,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skywindowdesign.com/" },
        { "@type": "ListItem", position: 2, name: data.area, item: data.canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: data.area }]}>
      <Seo title={data.title} description={data.meta} canonical={data.canonical} schema={schema} />
      <section className="py-24 px-8">
        <div className="mx-auto max-w-[1280px]">
          <h1 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-8">
            {data.h1}
          </h1>
          {data.sections.map((section, i) => (
            <div key={i} className="mt-12">
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">
                {section.heading}
              </h2>
              <p className="font-[var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--text-body)] mb-3 max-w-[720px]">
                {section.body}
              </p>
            </div>
          ))}
          <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mt-16 mb-2">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={data.faqs} />
        </div>
      </section>
      <CtaBand
        ctas={[
          { label: "Schedule a Consultation", href: "/contact", variant: "primary" },
          { label: "Call (251) 206-7319", href: "tel:+12512067319", variant: "secondary" },
        ]}
      />
    </Layout>
  );
}
