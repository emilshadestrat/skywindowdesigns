// StandardPage.tsx — Sky Window Design & More
// Pattern: Solomon Shade Solutions — inner page layout
// All copy VERBATIM from approved copy doc. Do not alter.

import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PAGES, CONTACT, PRODUCT_CARDS, type PageData } from "@/lib/siteData";
import { Phone, ChevronRight, CheckCircle2 } from "lucide-react";

// Related products to show at bottom of product pages
const RELATED: Record<string, string[]> = {
  "roller-shades":              ["motorized-shades", "cellular-honeycomb-shades", "roman-shades"],
  "motorized-shades":           ["roller-shades", "draperies-curtains", "plantation-shutters"],
  "draperies-curtains":         ["roman-shades", "roller-shades", "plantation-shutters"],
  "plantation-shutters":        ["blinds", "roller-shades", "cellular-honeycomb-shades"],
  "cellular-honeycomb-shades":  ["roller-shades", "roman-shades", "motorized-shades"],
  "roman-shades":               ["draperies-curtains", "roller-shades", "cellular-honeycomb-shades"],
  "blinds":                     ["plantation-shutters", "roller-shades", "cellular-honeycomb-shades"],
};

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

  const relatedSlugs = RELATED[pageKey] ?? [];
  const relatedCards = PRODUCT_CARDS.filter((c) => relatedSlugs.includes(c.href.replace("/", "")));

  return (
    <Layout breadcrumb={data.breadcrumb}>
      <Seo title={data.title} description={data.meta} canonical={data.canonical} schema={schema} />

      {/* ── Page Hero ── */}
      <section
        className="pt-8 pb-16"
        style={{ backgroundColor: "oklch(0.97 0.007 255)" }}
      >
        <div className="container">
          <div className="max-w-[760px]">
            <h1
              className="font-[Montserrat,sans-serif] font-extrabold leading-tight text-slate-900 mb-6"
              style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              {data.h1}
            </h1>
            <div className="flex flex-wrap gap-4">
              {data.ctas.map((cta, idx) => (
                <Link
                  key={idx}
                  href={cta.href}
                  className={cta.variant === "primary" ? "btn-primary" : "btn-outline"}
                >
                  {cta.variant === "secondary" && <Phone size={15} />}
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Content sections ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">
            {/* Main content */}
            <div className="max-w-[720px]">
              {data.sections.map((section, i) => (
                <div key={i} className={i > 0 ? "mt-10 pt-10 border-t border-slate-100" : ""}>
                  <h2
                    className="font-[Montserrat,sans-serif] font-bold text-slate-900 mb-3"
                    style={{ fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)" }}
                  >
                    {section.heading}
                  </h2>
                  {section.body.split("\n\n").map((para, j) => (
                    <p key={j} className="text-[1.0625rem] leading-relaxed text-slate-600 mb-3">
                      {para.trim()}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="font-[Montserrat,sans-serif] font-bold text-[1rem] text-slate-900 mb-4">
                  Ready to Get Started?
                </h3>
                <ul className="space-y-2.5 mb-5">
                  {["Free in-home consultation", "Professional measure & install", "Local Orange Beach showroom"].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                      <CheckCircle2 size={15} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary w-full justify-center mb-3 !text-[14px] !py-2.5">
                  Schedule a Consultation
                </Link>
                <a href={CONTACT.phoneHref} className="btn-outline w-full justify-center !text-[14px] !py-2.5">
                  <Phone size={14} />
                  {CONTACT.phone}
                </a>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                <p className="text-[13.5px] text-blue-800 leading-relaxed">
                  <strong>Orange Beach Showroom</strong><br />
                  {CONTACT.address.street}<br />
                  {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Related products ── */}
      {relatedCards.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
          <div className="container">
            <span className="eyebrow">Also Available</span>
            <h2 className="section-heading mb-8">Related Window Treatments</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCards.map((card) => (
                <Link key={card.href} href={card.href} className="service-card group">
                  <img
                    src={card.img}
                    alt={`${card.title} — Sky Window Design and More`}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="p-5">
                    <h3 className="font-[Montserrat,sans-serif] font-bold text-[1rem] text-slate-900 mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-[14px] text-slate-600 mb-3 leading-relaxed">{card.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                      Learn More <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Band ── */}
      <section
        className="py-16"
        style={{ backgroundColor: "oklch(0.15 0.02 255)" }}
      >
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-[Montserrat,sans-serif] font-extrabold text-white text-[1.375rem] leading-tight mb-1">
              Ready to Compare Options for Your Space?
            </p>
            <p className="text-slate-400 text-[14.5px]">Schedule a free consultation at our Orange Beach showroom.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            {data.ctas.map((cta, idx) => (
              <Link
                key={idx}
                href={cta.href}
                className={cta.variant === "primary" ? "btn-outline-white" : "btn-outline-white !border-white/40"}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
