// app/design-services/page.tsx — Design Services hub page
// Next.js: Server Component with server-side metadata and JSON-LD

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, buildMetadata, SITE_URL } from "@/lib/seo";
import { PAGES, CONTACT, IMAGES } from "@/lib/siteData";
import { ChevronRight, Phone, Paintbrush, Building2, Eye, Wrench } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Design Services | Sky Window Design & More",
  description: "Wallpaper, interior design, commercial window treatments, visualizer, and repair services from Sky Window Design & More in Orange Beach, Alabama.",
  canonical: "/design-services",
  ogImage: IMAGES.draperies,
});

const DESIGN_SERVICE_SLUGS = [
  "wallpaper-interior-design",
  "commercial-window-treatments",
  "visualizer",
  "window-treatment-repairs",
];

const ICON_MAP: Record<string, React.ReactNode> = {
  "wallpaper-interior-design": <Paintbrush size={20} />,
  "commercial-window-treatments": <Building2 size={20} />,
  "visualizer": <Eye size={20} />,
  "window-treatment-repairs": <Wrench size={20} />,
};

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Design Services", item: `${SITE_URL}/design-services` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sky Window Design Design Services",
    itemListElement: DESIGN_SERVICE_SLUGS.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: PAGES[slug]?.schemaName ?? slug,
      url: `${SITE_URL}/${slug}`,
    })),
  },
];

export default function DesignServicesPage() {
  const pages = DESIGN_SERVICE_SLUGS.map((slug) => PAGES[slug]).filter(Boolean);

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", url: "/" }, { label: "Design Services" }]} isHeroPage />

      {/* Hero */}
      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container">
          <div className="max-w-[760px]">
            <span className="eyebrow">Design Services</span>
            <h1
              className="font-[Montserrat,sans-serif] font-extrabold leading-tight text-slate-900 mb-6"
              style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Design Services Beyond Window Treatments
            </h1>
            <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-8 max-w-[600px]">
              From wallpaper and interior design to commercial window treatments, repairs, and a visualizer tool — Sky Window Design & More offers design services that go beyond shades and shutters for Orange Beach and the Gulf Coast.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Schedule a Consultation
              </Link>
              <a href={CONTACT.phoneHref} className="btn-outline">
                <Phone size={15} />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 gap-5">
            {pages.map((page) => {
              const slug = page.slug;
              return (
                <Link key={slug} href={`/${slug}`} className="service-card group">
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-blue-600 mt-0.5 flex-shrink-0">
                        {ICON_MAP[slug]}
                      </span>
                      <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.125rem] text-slate-900">
                        {page.schemaName}
                      </h2>
                    </div>
                    <p className="text-[14px] text-slate-600 mb-4 leading-relaxed">
                      {page.meta}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                      Learn More <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.15 0.02 255)" }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-[Montserrat,sans-serif] font-extrabold text-white text-[1.375rem] leading-tight mb-1">
              Serving the Gulf Coast
            </p>
            <p className="text-slate-400 text-[14.5px]">Schedule a free consultation at our Orange Beach showroom.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-outline-white">
              Schedule a Consultation
            </Link>
            <a href={CONTACT.phoneHref} className="btn-outline-white !border-white/40">
              <Phone size={15} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
