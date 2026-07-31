// app/service-areas/page.tsx — Service Areas hub page
// Next.js: Server Component with server-side metadata and JSON-LD

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, buildMetadata, SITE_URL } from "@/lib/seo";
import { CITY_PAGES, CONTACT, PRODUCT_CARDS } from "@/lib/siteData";
import { ChevronRight, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Service Areas | Sky Window Design & More",
  description: "Sky Window Design & More serves Orange Beach, AL and the surrounding Gulf Coast. View all service areas for custom window treatments.",
  canonical: "/service-areas",
});

const cityKeys = Object.keys(CITY_PAGES);

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/service-areas` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sky Window Design Service Areas",
    itemListElement: cityKeys.map((key, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: CITY_PAGES[key].area,
      url: `${SITE_URL}/locations/${key}`,
    })),
  },
];

export default function ServiceAreasPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", url: "/" }, { label: "Service Areas" }]} isHeroPage />

      {/* Hero */}
      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
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

      {/* City grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cityKeys.map((key) => {
              const city = CITY_PAGES[key];
              return (
                <Link key={key} href={`/locations/${key}`} className="service-card group">
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

      {/* Popular Services strip */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container">
          <span className="eyebrow">Popular Services</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
            {PRODUCT_CARDS.slice(0, 4).map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="inline-flex items-center gap-1 text-[14.5px] font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
              >
                <ChevronRight size={14} />
                {card.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section className="py-12" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container">
          <span className="eyebrow">Visit Our Showroom</span>
          <h2 className="section-heading mb-6">Orange Beach, Alabama</h2>
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.08)" }}>
            <iframe
              title="Sky Window Design & More showroom location map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.0!2d-87.58!3d30.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE1JzM2LjAiTiA4N8KwMzQnNDguMCJX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-[14px] text-slate-500 mt-4">
            {CONTACT.address.street}, {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
          </p>
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
