// Home.tsx — Sky Window Design & More
// Pattern: Solomon Shade Solutions (solomonshadesolutions.com)
// All copy VERBATIM from approved copy doc. Do not alter.

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  IMAGES, TRUST_ITEMS, PRODUCT_CARDS, HOMEPAGE_FAQS, PROCESS_STEPS, CONTACT,
} from "@/lib/siteData";
import { Phone, CheckCircle2, MapPin, Clock, ChevronRight } from "lucide-react";

// Scroll-reveal hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealDiv({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

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
    logo: "https://skywindowdesign.com/manus-storage/SkyLogo(2)_b2bdb6a8.png",
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
    <Layout heroPage>
      <Seo
        title="Sky Window Design & More | Custom Window Treatments in Orange Beach, AL"
        description="Custom window treatments in Orange Beach, Alabama. Roller shades, shutters, draperies, motorized options, and interior design for Gulf Coast homes and businesses."
        canonical="https://skywindowdesign.com/"
        schema={schema}
      />

      {/* ═══════════════════════════════════════════
          HERO — bright photo, white bottom fade, centered serif H1
          Pattern: CONTACTUS.png — no dark overlay, centered content
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        {/* Background image — bright, no dark overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Custom window treatments in a bright coastal living room in Orange Beach, Alabama"
            className="w-full h-full object-cover"
          />
          {/* Refined white fade — smoother transition with subtle warmth */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0) 30%, rgba(255,255,255,0.7) 55%, rgba(255,255,255,0.92) 78%, #ffffff 100%)" }}
          />
          {/* Subtle vignette for depth at edges */}
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(255,255,255,0.15) 100%)" }}
          />
        </div>

        {/* Sky watermark image — bottom-left corner */}
        <img
          src={IMAGES.skyWatermark}
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-1 w-[300px] lg:w-[500px] opacity-90 pointer-events-none select-none"
        />

        {/* Hero content — centered with refined spacing */}
        <div className="container relative z-10 py-20 flex flex-col items-center">
          {/* Refined eyebrow above H1 */}
          <span className="eyebrow mb-6" style={{ color: "oklch(0.48 0.22 258)" }}>Orange Beach, Alabama</span>

          {/* H1 — Petrona serif, refined leading */}
          <h1
            className="hero-serif leading-[1.08] mb-6"
            style={{ fontSize: "clamp(2.5rem, 2rem + 3vw, 4.25rem)" }}
          >
            Custom Window Treatments<br />for Gulf Coast Living
          </h1>

          {/* Subheading — verbatim from copy doc */}
          <p className="lead-text mb-10 max-w-[580px]">
            Sky Window Design and More is a local Orange Beach showroom for custom shades, blinds, shutters, draperies, motorized options, wallpaper and interior design.
          </p>

          {/* CTA row — Google badge image + Get Quote button */}
          <div className="flex items-center gap-6">
            {/* Google Reviews badge image */}
            <img
              src={IMAGES.googleReview}
              alt="5.0 Google Reviews"
              className="h-[80px] w-auto lg:h-[96px]"
            />

            {/* Get Quote button */}
            <Link href="/contact" className="btn-primary text-[15px] !py-3.5 !px-7">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TRUST BAR — solid blue, 3 columns, white serif text
          Pattern: CONTACTUS.png bottom blue bar — refined with subtle gradient
          ═══════════════════════════════════════════ */}
      <div style={{ background: "linear-gradient(135deg, oklch(0.48 0.22 258), oklch(0.40 0.20 258))" }} className="py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-5 text-center">
            {[
              "Locally Owned & Operated",
              "Professional Measure & Installation",
              "Serving the Alabama Gulf Coast",
              "Free In-Home Consultations",
              "Motorized & Smart Home Options",
              "Custom Fabric & Material Selection",
              "Licensed & Insured",
              "Satisfaction Guaranteed",
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2.5">
                <CheckCircle2 size={15} className="text-white/70 flex-shrink-0" />
                <span className="font-[Fraunces,Georgia,serif] text-white text-[14px] font-medium tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PRODUCTS INTRO
          ═══════════════════════════════════════════ */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.008 260)" }}>
        <div className="container">
          <RevealDiv className="text-center">
            <span className="eyebrow justify-center">Products</span>
            <h2 className="section-heading mb-6">Window Treatments Designed Around Your Space</h2>
            <p className="lead-text max-w-[1100px] mx-auto mb-5">
              Every room has different needs. A bedroom may need privacy and a softer level of light. A living area may need glare management without losing the feeling of an open view. A tall or hard-to-reach window may be easier to operate with motorization. A business may need a consistent look across several rooms.
            </p>
            <p className="lead-text max-w-[1100px] mx-auto">
              We help you compare the details that matter, including light control, privacy, fabric, material, operation, maintenance and overall style. The goal is a window treatment that looks right and works well for the space.
            </p>
          </RevealDiv>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCT CARDS — image-top, 3-col grid
          Pattern: Solomon's service cards
          ═══════════════════════════════════════════ */}
      <section className="pb-24" style={{ backgroundColor: "oklch(0.97 0.008 260)" }}>
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {PRODUCT_CARDS.map((card, i) => (
              <RevealDiv key={card.href} delay={i * 60}>
                <Link href={card.href} className="service-card block group h-full">
                  <div className="overflow-hidden relative">
                    <img
                      src={card.img}
                      alt={`${card.title} — custom window treatment by Sky Window Design and More in Orange Beach, Alabama`}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-[Fraunces,Georgia,serif] font-semibold text-[1.25rem] text-slate-900 mb-3 leading-tight">
                      {card.title}
                    </h3>
                    <div className="w-8 h-px bg-slate-300 mb-4 transition-all duration-400 group-hover:w-12 group-hover:bg-blue-600" />
                    <p className="text-[14px] leading-[1.7] text-slate-500 mb-6 flex-1">
                      {card.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-900 group-hover:text-blue-700 transition-colors">
                      Learn More <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              </RevealDiv>
            ))}
          </div>

          {/* CTA below cards */}
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

      {/* ═══════════════════════════════════════════
          SHOWROOM — split layout
          Pattern: Solomon's "Why Us" split section
          ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <RevealDiv>
              <span className="eyebrow">Visit Us</span>
              <h2 className="section-heading mb-5">A Local Showroom for Coastal Homes and Businesses</h2>
              <p className="lead-text mb-4 max-w-[540px]">
                Visit Sky Window Design and More at {CONTACT.address.street}, {CONTACT.address.city}, {CONTACT.address.state}. Browse materials, fabrics and operating methods in person.
              </p>
              <p className="lead-text mb-8 max-w-[540px]">
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

            {/* Right: hours + address cards */}
            <RevealDiv delay={120} className="space-y-4 lg:mt-10">
              <div className="surface-card p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <Clock size={18} className="text-blue-600" />
                  <h3 className="font-[Fraunces,Georgia,serif] font-bold text-[1.0625rem] text-slate-900">Showroom Hours</h3>
                </div>
                {CONTACT.hours.map((h) => (
                  <div key={h.day} className="flex justify-between py-2 text-[14.5px] text-slate-700 border-b border-slate-200 last:border-0">
                    <span>{h.day}</span>
                    <span className="font-semibold text-slate-900">{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="surface-card p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <MapPin size={18} className="text-blue-600" />
                  <h3 className="font-[Fraunces,Georgia,serif] font-bold text-[1.0625rem] text-slate-900">Location</h3>
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

      {/* ═══════════════════════════════════════════
          PROCESS — dark background, numbered steps
          Pattern: Solomon's "How It Works" section
          ═══════════════════════════════════════════ */}
      <section
        className="py-24 relative"
        style={{ backgroundColor: "oklch(0.14 0.025 260)" }}
      >
        {/* Subtle texture overlay for depth */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, oklch(0.20 0.03 260), transparent 70%)" }}
        />
        <div className="container relative z-10">
          <RevealDiv className="mb-14 text-center">
            <span className="eyebrow justify-center text-blue-400">How It Works</span>
            <h2 className="section-heading-white">How the Design Process Works</h2>
          </RevealDiv>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
            {PROCESS_STEPS.map((step, i) => (
              <RevealDiv key={step.num} delay={i * 80}>
                <div
                  className="font-[Fraunces,Georgia,serif] font-extrabold mb-5 leading-none"
                  style={{ fontSize: "clamp(3rem, 2rem + 3vw, 4.5rem)", color: "oklch(0.50 0.21 258 / 0.30)" }}
                  aria-hidden="true"
                >
                  0{step.num}
                </div>
                <div className="w-8 h-px bg-blue-500/30 mb-4" />
                <h3 className="font-[Fraunces,Georgia,serif] font-bold text-[1.125rem] text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-slate-400 max-w-[320px]">
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

      {/* ═══════════════════════════════════════════
          SERVICE AREAS STRIP
          ═══════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container">
          <RevealDiv className="text-center">
            <span className="eyebrow justify-center">Where We Work</span>
            <h2 className="section-heading mb-5">Proudly Serving the Alabama Gulf Coast</h2>
            <p className="lead-text mb-10 max-w-[600px] mx-auto">
              Based in Orange Beach, we serve homeowners and businesses throughout the Gulf Coast region.
            </p>
          </RevealDiv>
          <RevealDiv delay={60} className="flex flex-wrap gap-3 justify-center">
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
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-[14px] font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
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

      {/* ═══════════════════════════════════════════
          FAQ
          ═══════════════════════════════════════════ */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.008 260)" }}>
        <div className="container">
          <RevealDiv className="text-center">
            <span className="eyebrow justify-center">FAQ</span>
            <h2 className="section-heading mb-10">Frequently Asked Questions</h2>
          </RevealDiv>
          <RevealDiv delay={60}>
            <FaqAccordion items={HOMEPAGE_FAQS} />
          </RevealDiv>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FINAL CTA BAND — dark blue
          Pattern: Solomon's bottom CTA band
          ═══════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, oklch(0.48 0.22 258), oklch(0.40 0.20 258))" }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.1), transparent 70%)" }}
        />
        <div className="container text-center relative z-10">
          <RevealDiv>
            <h2
              className="font-[Fraunces,Georgia,serif] font-extrabold text-white mb-6 leading-tight"
              style={{ fontSize: "clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem)", letterSpacing: "-0.03em" }}
            >
              Ready to Compare Options for Your Space?
            </h2>
            <p className="text-white/85 text-[1.0625rem] leading-[1.7] mb-10 max-w-[540px] mx-auto">
              Schedule a consultation at the Orange Beach showroom. Bring your questions, room photos, measurements or <span className="gold-accent text-white/95">inspiration</span>.
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
    </Layout>
  );
}
