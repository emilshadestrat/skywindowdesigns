// ServiceAreas.tsx — Sky Window Design & More
// Hub page listing all 6 city/service-area pages in one place.
// Structural copy only — no copy doc content on this page.

import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CITY_PAGES, CONTACT } from "@/lib/siteData";
import { ChevronRight, MapPin, Phone } from "lucide-react";

export default function ServiceAreas() {
  const cityKeys = Object.keys(CITY_PAGES);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skywindowdesign.com/" },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://skywindowdesign.com/service-areas" },
      ],
    },
  ];

  return (
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: "Service Areas" }]}>
      <Seo
        title="Service Areas | Sky Window Design & More"
        description="Sky Window Design & More serves Orange Beach, AL and the surrounding Gulf Coast. View all service areas for custom window treatments."
        canonical="https://skywindowdesign.com/service-areas"
        schema={schema}
      />

      {/* ── Hero ── */}
      <section
        className="pt-8 pb-16"
        style={{ backgroundColor: "oklch(0.97 0.007 255)" }}
      >
        <div className="container">
          <div className="max-w-[760px]">
            <span className="eyebrow">Service Areas</span>
            <h1
              className="font-[Montserrat,sans-serif] font-extrabold leading-tight text-slate-900 mb-6"
              style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Window Treatment Services Across the Gulf Coast
            </h1>
            <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-8 max-w-[600px]">
              Sky Window Design &amp; More serves Orange Beach, Alabama and the surrounding Gulf Coast communities. Schedule a consultation at our Orange Beach showroom to discuss your project.
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

      {/* ── City grid ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cityKeys.map((key) => {
              const city = CITY_PAGES[key];
              return (
                <Link
                  key={key}
                  href={`/locations/${key}`}
                  className="service-card group"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.125rem] text-slate-900">
                        {city.area}
                      </h2>
                    </div>
                    <p className="text-[14px] text-slate-600 mb-4 leading-relaxed">
                      Custom window treatments in {city.area}, including shades, blinds, shutters, draperies and motorized options.
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

      {/* ── CTA Band ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.15 0.02 255)" }}
      >
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
    </Layout>
  );
}
