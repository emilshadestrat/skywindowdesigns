// ServiceAreas.tsx — Sky Window Design & More
// Hub page listing all 6 city/service-area pages in one place.
// Structural copy only — no copy doc content on this page.

import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CITY_PAGES, CONTACT, PRODUCT_CARDS } from "@/lib/siteData";
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
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Sky Window Design Service Areas",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Gulf Shores, AL", url: "https://skywindowdesign.com/locations/gulf-shores-al" },
        { "@type": "ListItem", position: 2, name: "Foley, AL", url: "https://skywindowdesign.com/locations/foley-al" },
        { "@type": "ListItem", position: 3, name: "Fairhope, AL", url: "https://skywindowdesign.com/locations/fairhope-al" },
        { "@type": "ListItem", position: 4, name: "Pensacola, FL", url: "https://skywindowdesign.com/locations/pensacola-fl" },
        { "@type": "ListItem", position: 5, name: "Gulf Breeze, FL", url: "https://skywindowdesign.com/locations/gulf-breeze-fl" },
        { "@type": "ListItem", position: 6, name: "Navarre, FL", url: "https://skywindowdesign.com/locations/navarre-fl" },
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
        className="pt-6 pb-12 sm:pt-8 sm:pb-16"
        style={{ backgroundColor: "oklch(0.97 0.007 255)" }}
      >
        <div className="container">
          <div className="max-w-[760px]">
            <span className="eyebrow">Service Areas</span>
            <h1
              className="font-[Fraunces,Georgia,serif] font-extrabold leading-tight text-slate-900 mb-6"
              style={{ fontSize: "clamp(1.5rem, 1.25rem + 1.5vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Window Treatment Services Across the Gulf Coast
            </h1>
            <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-8 max-w-[600px]">
              Sky Window Design &amp; More serves Orange Beach, Alabama and the surrounding Gulf Coast communities. Schedule a consultation at our Orange Beach showroom to discuss your project.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link href="/contact" className="btn-primary w-full sm:w-auto justify-center">
                Schedule a Consultation
              </Link>
              <a href={CONTACT.phoneHref} className="btn-outline w-full sm:w-auto justify-center">
                <Phone size={15} />
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── City grid ── */}
      <section className="py-12 sm:py-16 bg-white">
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
                      <h2 className="font-[Fraunces,Georgia,serif] font-bold text-[1.125rem] text-slate-900">
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

      {/* ── Popular Services strip ── */}
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

      {/* ── Map embed ── */}
      <section className="py-10 sm:py-12" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
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

      {/* ── CTA Band ── */}
      <section
        className="py-12 sm:py-16"
        style={{ backgroundColor: "oklch(0.15 0.02 255)" }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-[Fraunces,Georgia,serif] font-extrabold text-white text-[1.375rem] leading-tight mb-1">
              Serving the Gulf Coast
            </p>
            <p className="text-slate-400 text-[14.5px]">Schedule a free consultation at our Orange Beach showroom.</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 flex-shrink-0 w-full sm:w-auto">
            <Link href="/contact" className="btn-outline-white w-full sm:w-auto justify-center">
              Schedule a Consultation
            </Link>
            <a href={CONTACT.phoneHref} className="btn-outline-white !border-white/40 w-full sm:w-auto justify-center">
              <Phone size={15} />
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
