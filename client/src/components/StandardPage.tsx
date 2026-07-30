import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CtaBand } from "@/components/CtaBand";
import { PAGES, CONTACT, type PageData } from "@/lib/siteData";

export function StandardPage({ pageKey }: { pageKey: string }) {
  const data: PageData | undefined = PAGES[pageKey];
  if (!data) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": data.schemaType,
    name: data.schemaName,
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
    areaServed: [{ "@type": "State", name: "Alabama" }, { "@type": "State", name: "Florida" }],
  };

  return (
    <Layout breadcrumb={data.breadcrumb}>
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
              {section.body.split("\n\n").map((para, j) => (
                <p key={j} className="font-[var(--font-sans)] text-[1.0625rem] leading-relaxed text-[var(--text-body)] mb-3 max-w-[720px]">
                  {para.trim()}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <CtaBand ctas={data.ctas} />
    </Layout>
  );
}
