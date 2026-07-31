// StandardPage.tsx — Service page layout component
// Next.js: Server Component (no "use client" needed — ConsultCard is a client component)
// Pattern: Solomon Shade Solutions /services/motorized-patio-screens
// All copy VERBATIM from approved copy doc. Do not alter.

import Link from "next/link";
import { RevealDiv } from "@/components/RevealDiv";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ConsultCard } from "@/components/ConsultCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, buildMetadata } from "@/lib/seo";
import {
  PAGES, CONTACT, PRODUCT_CARDS, IMAGES, PROCESS_STEPS, CITY_PAGES,
  type PageData,
} from "@/lib/siteData";
import {
  Phone, ChevronRight, CheckCircle2, Star, Award, Ruler, Wrench, MapPin,
  Sun, EyeOff, Layers, Zap, Shield, Home,
} from "lucide-react";

// ── Related product map ────────────────────────────────────────────────────
const RELATED: Record<string, string[]> = {
  "roller-shades":             ["motorized-shades", "cellular-honeycomb-shades", "roman-shades"],
  "motorized-shades":          ["roller-shades", "draperies-curtains", "plantation-shutters"],
  "draperies-curtains":        ["roman-shades", "roller-shades", "plantation-shutters"],
  "plantation-shutters":       ["blinds", "roller-shades", "cellular-honeycomb-shades"],
  "cellular-honeycomb-shades": ["roller-shades", "roman-shades", "motorized-shades"],
  "roman-shades":              ["draperies-curtains", "roller-shades", "cellular-honeycomb-shades"],
  "blinds":                    ["plantation-shutters", "roller-shades", "cellular-honeycomb-shades"],
};

// ── Per-page hero image map ────────────────────────────────────────────────
const PAGE_IMG: Record<string, string> = {
  "roller-shades":             IMAGES.rollerShades,
  "motorized-shades":          IMAGES.motorizedShades,
  "draperies-curtains":        IMAGES.draperies,
  "plantation-shutters":       IMAGES.plantationShutters,
  "cellular-honeycomb-shades": IMAGES.cellularShades,
  "roman-shades":              IMAGES.romanShades,
  "blinds":                    IMAGES.rollerShades,
  "window-treatments":         IMAGES.hero,
  "wallpaper-interior-design": IMAGES.draperies,
  "commercial-window-treatments": IMAGES.motorizedShades,
  "window-treatment-repairs":  IMAGES.plantationShutters,
  "visualizer":                IMAGES.cellularShades,
  "about":                     IMAGES.hero,
};

// ── Secondary image map ("What It Is" section right-side image) ─────────────
const PAGE_IMG_SECONDARY: Record<string, string> = {
  "roller-shades":             IMAGES.cellularShades,
  "motorized-shades":          IMAGES.rollerShades,
  "draperies-curtains":        IMAGES.romanShades,
  "plantation-shutters":       IMAGES.rollerShades,
  "cellular-honeycomb-shades": IMAGES.romanShades,
  "roman-shades":              IMAGES.draperies,
  "blinds":                    IMAGES.plantationShutters,
  "window-treatments":         IMAGES.rollerShades,
  "wallpaper-interior-design": IMAGES.romanShades,
  "commercial-window-treatments": IMAGES.plantationShutters,
  "window-treatment-repairs":  IMAGES.rollerShades,
  "visualizer":                IMAGES.romanShades,
  "about":                     IMAGES.draperies,
};

// ── Editorial section images (rotates through available product images) ──────
const EDITORIAL_IMGS = [IMAGES.cellularShades, IMAGES.romanShades, IMAGES.draperies, IMAGES.plantationShutters];

// ── Per-page bullet points (hero left column) ──────────────────────────────
const PAGE_BULLETS: Record<string, string[]> = {
  "roller-shades":             ["Light-filtering, solar, privacy & blackout options", "Manual, cordless & motorized operation", "Custom fit for any window size", "Clean, minimal profile"],
  "motorized-shades":          ["Remote, app & voice control options", "Scheduled & group operation", "Ideal for hard-to-reach windows", "Cordless for a cleaner look"],
  "draperies-curtains":        ["Custom fabric, lining & hardware", "Tailored to your room's style", "Privacy & light management", "Coordinate with other treatments"],
  "plantation-shutters":       ["Adjustable louvers for light & privacy", "Architectural, built-in look", "Durable for coastal interiors", "Available in multiple materials"],
  "cellular-honeycomb-shades": ["Honeycomb construction for comfort", "Light-filtering & room-darkening options", "Top-down / bottom-up available", "Privacy without losing daylight"],
  "roman-shades":              ["Classic & contemporary fold styles", "Custom fabric, lining & hardware", "Manual & motorized operation", "Coordinate with draperies"],
  "blinds":                    ["Wood, composite & metal-look options", "Adjustable louvers for light direction", "Cordless & motorized options", "Moisture-resistant choices available"],
  "window-treatments":         ["Shades, shutters, blinds & draperies", "Motorized & smart-home options", "Custom measure & professional install", "Local Orange Beach showroom"],
  "wallpaper-interior-design": ["Coordinate color, texture & pattern", "Pair with window treatments", "Residential & select commercial", "Room-by-room design guidance"],
  "commercial-window-treatments": ["Offices, hospitality & restaurants", "Consistent look across multiple rooms", "Motorized options for larger spaces", "Commercial-grade durability"],
  "window-treatment-repairs":  ["Cord replacement & mechanism repair", "Fabric & hardware adjustments", "Honest repair vs. replacement advice", "Service area confirmed on request"],
  "visualizer":                ["Browse by product type", "Filter by room & light goal", "Save favorites before consulting", "Illustrative — confirm at showroom"],
  "about":                     ["Local Orange Beach showroom", "Custom measure & professional install", "Homes & businesses served", "Practical, honest design guidance"],
};

// ── Per-page feature cards (dark "Built to Last" section) ──────────────────
const PAGE_FEATURES: Record<string, { icon: React.ReactNode; title: string; body: string }[]> = {
  "roller-shades": [
    { icon: <Sun size={22} />, title: "Solar & Light-Filtering", body: "Reduce glare and UV while preserving your view with solar fabrics in a range of openness factors." },
    { icon: <EyeOff size={22} />, title: "Privacy & Blackout", body: "Privacy and room-darkening options for bedrooms, media rooms and any space that needs full coverage." },
    { icon: <Zap size={22} />, title: "Motorized Operation", body: "Add motorization for scheduled control, group operation and smart-home integration where supported." },
    { icon: <Ruler size={22} />, title: "Custom Fit", body: "Measured and cut to your exact window dimensions for a clean, professional installation." },
  ],
  "motorized-shades": [
    { icon: <Zap size={22} />, title: "Remote & App Control", body: "Operate individually or as a group via remote, smartphone, timer or voice assistant where supported." },
    { icon: <Shield size={22} />, title: "Cordless Safety", body: "Cordless systems remove exposed cords for a cleaner look and may support child-safety goals." },
    { icon: <Layers size={22} />, title: "Works With Any Shade", body: "Motorization may be available for selected shades, roller shades, cellular shades and more." },
    { icon: <Ruler size={22} />, title: "Hard-to-Reach Windows", body: "Tall windows, large openings and windows above furniture become easy to control daily." },
  ],
  "draperies-curtains": [
    { icon: <Layers size={22} />, title: "Fabric & Lining Options", body: "Choose from a wide range of fabrics and linings to match your light, privacy and style goals." },
    { icon: <Home size={22} />, title: "Custom Hardware", body: "Rods, rings, finials and mounting options coordinated with the fabric and room design." },
    { icon: <EyeOff size={22} />, title: "Privacy Control", body: "Fabric weight and lining type affect how much light and privacy a room receives." },
    { icon: <Layers size={22} />, title: "Layer With Other Treatments", body: "Draperies can be layered with shades, blinds or shutters for added control and depth." },
  ],
  "plantation-shutters": [
    { icon: <Sun size={22} />, title: "Adjustable Louvers", body: "Tilt the louvers for light control and privacy throughout the day without removing the shutter." },
    { icon: <Shield size={22} />, title: "Durable Materials", body: "Material options designed for coastal interiors where moisture and salt air are a consideration." },
    { icon: <Home size={22} />, title: "Architectural Look", body: "Shutters add a built-in, architectural appearance that coordinates with the room's design." },
    { icon: <Ruler size={22} />, title: "Custom Fit", body: "Measured and built to your exact window dimensions for a precise, professional installation." },
  ],
  "cellular-honeycomb-shades": [
    { icon: <Layers size={22} />, title: "Honeycomb Construction", body: "Air pockets in the cellular structure may help a room feel more comfortable depending on the product." },
    { icon: <Sun size={22} />, title: "Light-Filtering Options", body: "Available in light-filtering, room-darkening and top-down configurations depending on the selection." },
    { icon: <EyeOff size={22} />, title: "Top-Down / Bottom-Up", body: "Control privacy while maintaining natural light from above with top-down and bottom-up options." },
    { icon: <Ruler size={22} />, title: "Custom Fit", body: "Measured and cut to your exact window dimensions for a clean, professional installation." },
  ],
  "roman-shades": [
    { icon: <Layers size={22} />, title: "Multiple Fold Styles", body: "Choose from classic, relaxed and contemporary fold styles to match the room's design direction." },
    { icon: <Sun size={22} />, title: "Light & Privacy Options", body: "Available in light-filtering, privacy and room-darkening configurations depending on the fabric." },
    { icon: <Zap size={22} />, title: "Manual & Motorized", body: "Roman shades are available with manual and motorized operating systems where compatible." },
    { icon: <Home size={22} />, title: "Coordinate the Room", body: "Pair with draperies, wallpaper and other design elements for a more finished, cohesive look." },
  ],
  "blinds": [
    { icon: <Layers size={22} />, title: "Wood, Composite & Metal", body: "Material options for different rooms, moisture levels and maintenance preferences." },
    { icon: <Sun size={22} />, title: "Adjustable Light Direction", body: "Tilt the louvers to direct light and control privacy throughout the day." },
    { icon: <Shield size={22} />, title: "Moisture-Resistant Options", body: "Composite and faux-wood options for moisture-prone rooms like bathrooms and kitchens." },
    { icon: <Zap size={22} />, title: "Cordless & Motorized", body: "Cordless and motorized operating systems may be available for selected blinds." },
  ],
};

// ── Default features for pages without specific ones ──────────────────────
const DEFAULT_FEATURES = [
  { icon: <Award size={22} />, title: "Locally Owned & Operated", body: "Based in Orange Beach, Alabama, serving homeowners and businesses across the Gulf Coast." },
  { icon: <Ruler size={22} />, title: "Professional Measure & Install", body: "Every project is measured and installed by our team for a precise, professional result." },
  { icon: <MapPin size={22} />, title: "Orange Beach Showroom", body: "Visit our showroom to browse materials, fabrics and operating methods in person." },
  { icon: <CheckCircle2 size={22} />, title: "Free Consultation", body: "Schedule a free consultation to discuss the room, compare options and confirm the project details." },
];

// ── Main component ─────────────────────────────────────────────────────────
export function StandardPage({ pageKey }: { pageKey: string }) {
  const data: PageData | undefined = PAGES[pageKey];
  if (!data) return null;

  const serviceSchema = {
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
  const textLinks = data.relatedLinks ?? [];
  const heroImg = PAGE_IMG[pageKey] ?? IMAGES.hero;
  const secondaryImg = PAGE_IMG_SECONDARY[pageKey] ?? IMAGES.cellularShades;
  const cityKeys = Object.keys(CITY_PAGES);
  const bullets = PAGE_BULLETS[pageKey] ?? [];
  const features = PAGE_FEATURES[pageKey] ?? DEFAULT_FEATURES;

  // Split sections: first section = "What It Is", rest = additional content
  const [firstSection, ...restSections] = data.sections;

  // Process steps — verbatim from PROCESS_STEPS in siteData.ts
  const steps = PROCESS_STEPS.map((s) => ({ num: `0${s.num}`, title: s.title, body: s.body }));

  // FAQ items — answers aligned with approved copy in HOMEPAGE_FAQS and page sections
  const faqs = [
    { q: `What is included in a free consultation for ${data.schemaName}?`, a: "We discuss the room, compare product options, review measurements and confirm the project details. There is no obligation to purchase." },
    { q: "How long does installation take?", a: "Installation time depends on the product, the number of windows and the scope of the project. We confirm the timeline before moving forward." },
    { q: "Are motorized window treatments available?", a: "Motorized options may be available for selected shades and window-treatment systems. Compatibility depends on the selected shade, motor, hub and control platform." },
    { q: "Do you serve areas outside Orange Beach, Alabama?", a: "Yes. Our service area includes Gulf Shores, Foley, Fairhope, Pensacola, Gulf Breeze and Navarre. Contact us to confirm service availability for your location." },
  ];

  // Build breadcrumb items from the page's breadcrumb data
  const breadcrumbItems = data.breadcrumb.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: b.label,
    ...(b.url ? { item: b.url.startsWith("http") ? b.url : `https://skywindowdesign.com${b.url}` } : {}),
  }));

  const schema = [
    serviceSchema,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={schema} />

      {/* 1. DARK HERO */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "oklch(0.10 0.02 255)" }}>
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="" aria-hidden="true" className="w-full h-full object-cover" style={{ opacity: 0.28 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,15,40,0.85) 0%, rgba(10,15,40,0.55) 60%, rgba(10,15,40,0.30) 100%)" }} />
        </div>
        <div className="container relative z-10 py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            <div>
              <span className="eyebrow !text-blue-400 !mb-3">Orange Beach, Alabama</span>
              <h1
                className="font-[Montserrat,sans-serif] font-extrabold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
              >
                {data.h1}
              </h1>
              {firstSection && (
                <p className="text-[1.0rem] leading-relaxed text-white/75 mb-6 max-w-[540px]">
                  {firstSection.body.split("\n\n")[0]}
                </p>
              )}
              {bullets.length > 0 && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-white/85">
                      <CheckCircle2 size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-3 mb-8">
                <a href={CONTACT.phoneHref} className="btn-primary">
                  <Phone size={15} />
                  Call {CONTACT.phone}
                </a>
                <Link href="/contact" className="btn-outline-white">
                  Get a Free Consultation
                </Link>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/70 text-[13px]">5.0 · Google Reviews · Locally Owned &amp; Operated</span>
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <ConsultCard />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <div style={{ backgroundColor: "oklch(0.18 0.025 255)" }} className="py-4 border-b border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: <Award size={15} />, text: "Locally Owned & Operated" },
              { icon: <CheckCircle2 size={15} />, text: "Free Consultation" },
              { icon: <Wrench size={15} />, text: "Professional Install" },
              { icon: <MapPin size={15} />, text: "Orange Beach Showroom" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-2">
                <span className="text-blue-400 flex-shrink-0">{icon}</span>
                <span className="font-[Inter,sans-serif] text-white/80 text-[13px] font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. "WHAT IT IS" */}
      {firstSection && (
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <RevealDiv>
                <span className="eyebrow">What It Is</span>
                <h2 className="section-heading mb-5">{firstSection.heading}</h2>
                {firstSection.body.split("\n\n").map((para, j) => (
                  <p key={j} className="text-[1.0625rem] leading-relaxed text-slate-600 mb-4">{para.trim()}</p>
                ))}
                <div className="flex flex-wrap gap-4 mt-6">
                  <a href={CONTACT.phoneHref} className="btn-primary">
                    <Phone size={15} />
                    Call {CONTACT.phone}
                  </a>
                  <Link href="/contact" className="btn-outline">
                    Get a Free Consultation
                  </Link>
                </div>
              </RevealDiv>
              <RevealDiv delay={120}>
                <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(15,23,42,0.12)" }}>
                  <img src={secondaryImg} alt={data.schemaName} className="w-full aspect-[4/3] object-cover" />
                </div>
              </RevealDiv>
            </div>
          </div>
        </section>
      )}

      {/* 4. DARK FEATURES GRID */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "oklch(0.12 0.02 255)" }}>
        <div className="absolute inset-0 z-0">
          <img src={secondaryImg} alt="" aria-hidden="true" className="w-full h-full object-cover" style={{ opacity: 0.12 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(8,12,35,0.92) 0%, rgba(8,12,35,0.88) 100%)" }} />
        </div>
        <div className="container relative z-10">
          <RevealDiv className="mb-12 text-center">
            <span className="eyebrow !text-blue-400">Built to Last</span>
            <h2 className="section-heading-white">Designed Around Your Space</h2>
          </RevealDiv>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <RevealDiv key={f.title} delay={i * 70}>
                <div className="bg-white/95 rounded-xl p-5 h-full" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.18)" }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white" style={{ backgroundColor: "oklch(0.50 0.21 255)" }}>
                    {f.icon}
                  </div>
                  <h3 className="font-[Montserrat,sans-serif] font-bold text-[0.9375rem] text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-slate-600">{f.body}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
          <RevealDiv delay={280} className="flex flex-wrap gap-4 justify-center mt-12">
            <a href={CONTACT.phoneHref} className="btn-primary">
              <Phone size={15} />
              Call {CONTACT.phone}
            </a>
            <Link href="/contact" className="btn-outline-white">
              Get a Free Consultation
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* 5. ADDITIONAL CONTENT SECTIONS */}
      {restSections.length > 0 && (
        <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
          <div className="container space-y-20">
            {restSections.map((section, i) => (
              <RevealDiv key={i}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div>
                    <span className="eyebrow">{i === 0 ? "Why Choose It" : "More to Know"}</span>
                    <h2
                      className="font-[Montserrat,sans-serif] font-bold text-slate-900 mb-4"
                      style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", letterSpacing: "-0.02em" }}
                    >
                      {section.heading}
                    </h2>
                    {section.body.split("\n\n").map((para, j) => (
                      <p key={j} className="text-[1.0rem] leading-relaxed text-slate-600 mb-3">{para.trim()}</p>
                    ))}
                  </div>
                  <div className="rounded-xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.08)" }}>
                    <img src={EDITORIAL_IMGS[i % EDITORIAL_IMGS.length]} alt={section.heading} className="w-full aspect-[4/3] object-cover" />
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </section>
      )}

      {/* 6. HOW IT WORKS */}
      <section className="py-20 relative" style={{ backgroundColor: "oklch(0.15 0.02 255)" }}>
        <div className="container relative z-10">
          <RevealDiv className="mb-12">
            <span className="eyebrow !text-blue-400">How It Works</span>
            <h2 className="section-heading-white">From Free Quote to Finished Room</h2>
          </RevealDiv>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, i) => (
              <RevealDiv key={step.num} delay={i * 80}>
                <div
                  className="font-[Montserrat,sans-serif] font-extrabold mb-4 leading-none"
                  style={{ fontSize: "clamp(2.5rem, 1.5rem + 2.5vw, 3.75rem)", color: "oklch(0.50 0.21 255 / 0.35)" }}
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <h3 className="font-[Montserrat,sans-serif] font-bold text-[1rem] text-white mb-2">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-slate-400">{step.body}</p>
              </RevealDiv>
            ))}
          </div>
          <RevealDiv className="flex flex-wrap gap-4">
            <a href={CONTACT.phoneHref} className="btn-primary">
              <Phone size={15} />
              Call {CONTACT.phone}
            </a>
            <Link href="/contact" className="btn-outline-white">
              Schedule a Consultation
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* 7. RELATED PRODUCTS */}
      {relatedCards.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container">
            <RevealDiv>
              <span className="eyebrow">Also Available</span>
              <h2 className="section-heading mb-8">Related Window Treatments</h2>
            </RevealDiv>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCards.map((card, i) => (
                <RevealDiv key={card.href} delay={i * 60}>
                  <Link href={card.href} className="service-card block group h-full">
                    <img src={card.img} alt={`${card.title} — Sky Window Design and More`} className="w-full aspect-[4/3] object-cover" />
                    <div className="p-5">
                      <h3 className="font-[Montserrat,sans-serif] font-bold text-[1rem] text-slate-900 mb-1.5">{card.title}</h3>
                      <p className="text-[14px] text-slate-600 mb-3 leading-relaxed">{card.desc}</p>
                      <span className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                        Learn More <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                </RevealDiv>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. FAQ */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container max-w-[800px]">
          <RevealDiv>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-heading mb-8">Frequently Asked Questions</h2>
          </RevealDiv>
          <RevealDiv delay={60}>
            <FaqAccordion items={faqs} />
          </RevealDiv>
        </div>
      </section>

      {/* 9. RELATED SERVICES TEXT LINKS */}
      {textLinks.length > 0 && (
        <section className="py-12 bg-white border-t border-slate-100">
          <div className="container">
            <RevealDiv>
              <span className="eyebrow">Related Services</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                {textLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1 text-[14px] font-medium text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    <ChevronRight size={14} className="text-blue-500" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </RevealDiv>
          </div>
        </section>
      )}

      {/* 10. CITY CROSS-LINKS */}
      <section className="py-12" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container">
          <RevealDiv>
            <span className="eyebrow">Available in Your Area</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
              {cityKeys.map((cityKey) => {
                const city = CITY_PAGES[cityKey];
                return (
                  <Link
                    key={cityKey}
                    href={`/locations/${cityKey}`}
                    className="inline-flex items-center gap-1 text-[14px] font-medium text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    <MapPin size={14} className="text-blue-500" />
                    {city.area}
                  </Link>
                );
              })}
            </div>
          </RevealDiv>
        </div>
      </section>

      {/* 11. FINAL CTA */}
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
