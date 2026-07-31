// page.tsx — Homepage
// Next.js App Router: Server Component with generateMetadata + JSON-LD

import type { Metadata } from "next";
import Link from "next/link";
import { RevealDiv } from "@/components/RevealDiv";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, buildMetadata } from "@/lib/seo";
import {
  IMAGES, TRUST_ITEMS, PRODUCT_CARDS, HOMEPAGE_FAQS, PROCESS_STEPS, CONTACT,
} from "@/lib/siteData";
import { Phone, CheckCircle2, MapPin, Clock, ChevronRight, Star } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Sky Window Design & More | Custom Window Treatments in Orange Beach, AL",
  description: "Custom window treatments in Orange Beach, Alabama. Roller shades, shutters, draperies, motorized options, and interior design for Gulf Coast homes and businesses.",
  canonical: "/",
});

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://skywindowdesign.com/#business",
    name: "Sky Window Design & More",
    legalName: "Sky Window Design & More, LLC",
    description: "Custom window treatments for Orange Beach, Alabama and the Gulf Coast. Roller shades, plantation shutters, motorized shades, draperies, and more.",
    url: "https://skywindowdesign.com/",
    telephone: "+12512067319",
    email: "lance@skywindowdesign.com",
    image: "https://skywindowdesign.com/manus-storage/hero-coastal-room_69b05db7.jpg",
    logo: "https://skywindowdesign.com/manus-storage/sky-logo_1a5423c8.png",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    address: {
      "@type": "PostalAddress",
      streetAddress: "25405 Perdido Beach Blvd., Suite 7A",
      addressLocality: "Orange Beach",
      addressRegion: "AL",
      postalCode: "36561",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.2658,
      longitude: -87.5833,
    },
    hasMap: "https://www.google.com/maps/search/?api=1&query=25405+Perdido+Beach+Blvd+Suite+7A+Orange+Beach+AL+36561",
    sameAs: [
      "https://www.facebook.com/skywindowdesign",
      "https://www.instagram.com/skywindowdesign",
    ],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "10:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "15:00" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sky Window Design & More",
    url: "https://skywindowdesign.com/",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOMEPAGE_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center" style={{ paddingTop: "90px" }}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Custom window treatments in a bright coastal living room in Orange Beach, Alabama"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 35%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.95) 80%, #ffffff 100%)" }}
          />
        </div>
        <span className="sky-watermark" aria-hidden="true">sky</span>
        <div className="container relative z-10 py-20 flex flex-col items-center">
          <h1
            className="hero-serif leading-[1.12] mb-5"
            style={{ fontSize: "clamp(2.25rem, 1.8rem + 2.8vw, 3.75rem)" }}
          >
            Custom Window Treatments for Gulf Coast Living
          </h1>
          <p className="text-slate-700 text-[1.0625rem] leading-relaxed mb-8 max-w-[560px]">
            Sky Window Design and More is a local Orange Beach showroom for custom shades, blinds, shutters, draperies, motorized options, wallpaper and interior design.
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-slate-800 text-[15px] font-bold">5.0</span>
                <span className="text-slate-500 text-[11px] font-medium">Google Reviews</span>
              </div>
            </div>
            <div className="w-px h-10 bg-slate-300" aria-hidden="true" />
            <Link href="/contact" className="btn-primary">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ backgroundColor: "oklch(0.50 0.21 255)" }} className="py-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {[
              "Locally Owned & Operated",
              "Professional Measure & Installation",
              "Serving the Alabama Gulf Coast",
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-white/80 flex-shrink-0" />
                <span className="font-[Petrona,Georgia,serif] text-white text-[15px] font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS INTRO */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container">
          <RevealDiv>
            <span className="eyebrow">Products</span>
            <h2 className="section-heading mb-5">Window Treatments Designed Around Your Space</h2>
            <p className="text-[1.0625rem] leading-relaxed text-slate-600 max-w-[760px] mb-4">
              Every room has different needs. A bedroom may need privacy and a softer level of light. A living area may need glare management without losing the feeling of an open view. A tall or hard-to-reach window may be easier to operate with motorization. A business may need a consistent look across several rooms.
            </p>
            <p className="text-[1.0625rem] leading-relaxed text-slate-600 max-w-[760px]">
              We help you compare the details that matter, including light control, privacy, fabric, material, operation, maintenance and overall style. The goal is a window treatment that looks right and works well for the space.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* PRODUCT CARDS */}
      <section className="pb-20" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CARDS.map((card, i) => (
              <RevealDiv key={card.href} delay={i * 60}>
                <Link href={card.href} className="service-card block group h-full">
                  <div className="overflow-hidden" style={{ borderRadius: "0.75rem 0.75rem 0 0" }}>
                    <img
                      src={card.img}
                      alt={`${card.title} — custom window treatment by Sky Window Design and More in Orange Beach, Alabama`}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-[Montserrat,sans-serif] font-bold text-[1.125rem] text-slate-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-slate-600 mb-4 flex-1">
                      {card.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                      Learn More <ChevronRight size={15} />
                    </span>
                  </div>
                </Link>
              </RevealDiv>
            ))}
          </div>
          <RevealDiv className="mt-10 flex flex-wrap gap-4 justify-center">
            <a href={CONTACT.phoneHref} className="btn-primary">
              <Phone size={16} />
              Call {CONTACT.phone}
            </a>
            <Link href="/contact" className="btn-outline">
              Schedule a Consultation
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* SHOWROOM */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <RevealDiv>
              <span className="eyebrow">Visit Us</span>
              <h2 className="section-heading mb-5">A Local Showroom for Coastal Homes and Businesses</h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-4 max-w-[540px]">
                Visit Sky Window Design and More at {CONTACT.address.street}, {CONTACT.address.city}, {CONTACT.address.state}. Browse materials, fabrics and operating methods in person.
              </p>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-8 max-w-[540px]">
                Contact us before visiting to confirm current hours and consultation availability.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Browse fabrics, materials and operating methods in person",
                  "Compare products side by side with expert guidance",
                  "Custom measure and professional installation included",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-slate-700">
                    <CheckCircle2 size={17} className="text-blue-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="btn-primary">
                  Schedule a Consultation
                </Link>
                <Link href="/about" className="btn-outline">
                  Learn About Us
                </Link>
              </div>
            </RevealDiv>
            <RevealDiv delay={120} className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <div className="flex items-center gap-2.5 mb-4">
                  <Clock size={18} className="text-blue-600" />
                  <h3 className="font-[Montserrat,sans-serif] font-bold text-[1.0625rem] text-slate-900">Showroom Hours</h3>
                </div>
                {CONTACT.hours.map((h) => (
                  <div key={h.day} className="flex justify-between py-2 text-[14.5px] text-slate-700 border-b border-slate-200 last:border-0">
                    <span>{h.day}</span>
                    <span className="font-semibold text-slate-900">{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <div className="flex items-center gap-2.5 mb-4">
                  <MapPin size={18} className="text-blue-600" />
                  <h3 className="font-[Montserrat,sans-serif] font-bold text-[1.0625rem] text-slate-900">Location</h3>
                </div>
                <p className="text-[14.5px] text-slate-700">{CONTACT.address.street}</p>
                <p className="text-[14.5px] text-slate-700">{CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}</p>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2 mt-3 text-[14.5px] font-semibold text-blue-700 hover:text-blue-900 transition-colors">
                  <Phone size={14} />
                  {CONTACT.phone}
                </a>
              </div>
            </RevealDiv>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 relative" style={{ backgroundColor: "oklch(0.15 0.02 255)" }}>
        <div className="container relative z-10">
          <RevealDiv className="mb-12">
            <span className="eyebrow text-blue-400">How It Works</span>
            <h2 className="section-heading-white">How the Design Process Works</h2>
          </RevealDiv>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {PROCESS_STEPS.map((step, i) => (
              <RevealDiv key={step.num} delay={i * 80}>
                <div
                  className="font-[Montserrat,sans-serif] font-extrabold mb-4 leading-none"
                  style={{ fontSize: "clamp(3rem, 2rem + 3vw, 4.5rem)", color: "oklch(0.50 0.21 255 / 0.35)" }}
                  aria-hidden="true"
                >
                  0{step.num}
                </div>
                <h3 className="font-[Montserrat,sans-serif] font-bold text-[1.125rem] text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-slate-400 max-w-[320px]">
                  {step.body}
                </p>
              </RevealDiv>
            ))}
          </div>
          <RevealDiv className="flex flex-wrap gap-4">
            <a href={CONTACT.phoneHref} className="btn-primary">
              <Phone size={16} />
              Call {CONTACT.phone}
            </a>
            <Link href="/contact" className="btn-outline-white">
              Schedule a Consultation
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* SERVICE AREAS STRIP */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container">
          <RevealDiv>
            <span className="eyebrow">Where We Work</span>
            <h2 className="section-heading mb-4">Proudly Serving the Alabama Gulf Coast</h2>
            <p className="text-[1.0625rem] text-slate-600 mb-8 max-w-[600px]">
              Based in Orange Beach, we serve homeowners and businesses throughout the Gulf Coast region.
            </p>
          </RevealDiv>
          <RevealDiv delay={60} className="flex flex-wrap gap-3">
            {[
              { label: "Orange Beach, AL", href: "" },
              { label: "Gulf Shores, AL", href: "/locations/gulf-shores-al" },
              { label: "Foley, AL", href: "/locations/foley-al" },
              { label: "Fairhope, AL", href: "/locations/fairhope-al" },
              { label: "Pensacola, FL", href: "/locations/pensacola-fl" },
              { label: "Gulf Breeze, FL", href: "/locations/gulf-breeze-fl" },
              { label: "Navarre, FL", href: "/locations/navarre-fl" },
            ].map((city) => (
              city.href ? (
                <Link
                  key={city.label}
                  href={city.href}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-[14px] font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all"
                >
                  {city.label}
                </Link>
              ) : (
                <span
                  key={city.label}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-[14px] font-semibold text-slate-400 cursor-default"
                  title="Our home base — no separate page"
                >
                  {city.label}
                </span>
              )
            ))}
          </RevealDiv>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container">
          <RevealDiv>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-heading mb-8">Frequently Asked Questions</h2>
          </RevealDiv>
          <RevealDiv delay={60}>
            <FaqAccordion items={HOMEPAGE_FAQS} />
          </RevealDiv>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.50 0.21 255)" }}>
        <div className="container text-center">
          <RevealDiv>
            <h2
              className="font-[Montserrat,sans-serif] font-extrabold text-white mb-5 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 1.4rem + 1.6vw, 2.625rem)", letterSpacing: "-0.025em" }}
            >
              Ready to Compare Options for Your Space?
            </h2>
            <p className="text-white/85 text-[1.0625rem] leading-relaxed mb-8 max-w-[540px] mx-auto">
              Schedule a consultation at the Orange Beach showroom. Bring your questions, room photos, measurements or inspiration.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-outline-white !border-white !text-white hover:!bg-white hover:!text-blue-700">
                Schedule a Consultation
              </Link>
              <a href={CONTACT.phoneHref} className="btn-outline-white">
                <Phone size={16} />
                Call {CONTACT.phone}
              </a>
            </div>
          </RevealDiv>
        </div>
      </section>
    </>
  );
}
