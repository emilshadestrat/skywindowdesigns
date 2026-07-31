// CityPage.tsx — Sky Window Design & More
// Pattern: Solomon Shade Solutions — city/service-area page
// All copy VERBATIM from approved copy doc. Do not alter.

import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CITY_PAGES, PRODUCT_CARDS, CONTACT, type CityPageData } from "@/lib/siteData";
import { Phone, MapPin, CheckCircle2, ChevronRight } from "lucide-react";

// All city page keys for cross-linking
const ALL_CITY_KEYS = Object.keys(CITY_PAGES);

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
        { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://skywindowdesign.com/service-areas" },
        { "@type": "ListItem", position: 3, name: data.area, item: data.canonical },
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
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: "Service Areas", url: "/service-areas" }, { label: data.area }]}>
      <Seo title={data.title} description={data.meta} canonical={data.canonical} schema={schema} />

      {/* ── City Hero ── */}
      <section
        className="pt-8 pb-16"
        style={{ backgroundColor: "oklch(0.97 0.007 255)" }}
      >
        <div className="container">
          <div className="max-w-[760px]">
            <span className="eyebrow">{data.area}</span>
            <h1
              className="font-[Montserrat,sans-serif] font-extrabold leading-tight text-slate-900 mb-6"
              style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              {data.h1}
            </h1>
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

      {/* ── Content + Sidebar ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
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
                  <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-3">
                    {section.body}
                  </p>
                </div>
              ))}

              {/* FAQ */}
              <div className="mt-12 pt-12 border-t border-slate-100">
                <h2
                  className="font-[Montserrat,sans-serif] font-bold text-slate-900 mb-6"
                  style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)" }}
                >
                  Frequently Asked Questions
                </h2>
                <FaqAccordion items={data.faqs} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="font-[Montserrat,sans-serif] font-bold text-[1rem] text-slate-900 mb-4">
                  Serving {data.area}
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
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[13.5px] font-semibold text-blue-900 mb-1">Orange Beach Showroom</p>
                    <p className="text-[13px] text-blue-800 leading-relaxed">
                      {CONTACT.address.street}<br />
                      {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Products strip ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container">
          <span className="eyebrow">Our Services</span>
          <h2 className="section-heading mb-8">Window Treatments Available in {data.area}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_CARDS.slice(0, 6).map((card) => (
              <Link key={card.href} href={card.href} className="service-card group">
                <img
                  src={card.img}
                  alt={`${card.title} available in ${data.area} from Sky Window Design and More`}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-5">
                  <h3 className="font-[Montserrat,sans-serif] font-bold text-[1rem] text-slate-900 mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-[14px] text-slate-600 mb-3 leading-relaxed line-clamp-2">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                    Learn More <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Service Areas cross-link strip ── */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="container">
          <span className="eyebrow">Other Service Areas</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
            {ALL_CITY_KEYS
              .filter((key) => key !== pageKey)
              .map((key) => {
                const city = CITY_PAGES[key];
                return (
                  <Link
                    key={key}
                    href={`/locations/${key}`}
                    className="inline-flex items-center gap-1 text-[14.5px] font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                  >
                    <ChevronRight size={14} />
                    {city.area}
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
              Serving {data.area} and the Gulf Coast
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
