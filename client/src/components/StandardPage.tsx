// StandardPage.tsx — Sky Window Design & More
// Pattern: Solomon Shade Solutions /services/motorized-patio-screens
// All copy VERBATIM from approved copy doc. Do not alter.

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PAGES, CONTACT, PRODUCT_CARDS, IMAGES, PROCESS_STEPS, CITY_PAGES, type PageData } from "@/lib/siteData";
import { submitLead } from "@/lib/submitLead";
import {
  Phone, ChevronRight, CheckCircle2, Star, Award, Ruler, Wrench, MapPin,
  Sun, EyeOff, Layers, Zap, Shield, Home,
} from "lucide-react";

// The visualizer URL or access key is supplied through Netlify at build time.
// Keep the access key out of source control.
const visualizerConfig = process.env.NEXT_PUBLIC_SHADESTRATEGY_VISUALIZER_URL;
const visualizerEmbedUrl = visualizerConfig
  ? visualizerConfig.startsWith("http")
    ? visualizerConfig
    : `https://ai.shadestrategy.com/embed/visualizer?key=${visualizerConfig}&fullscreen=1`
  : undefined;

// ── Scroll-reveal hook (same as Home.tsx) ─────────────────────────────────────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.10 }
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

// ── Related product map ────────────────────────────────────────────────────────────────────────
const RELATED: Record<string, string[]> = {
  "roller-shades":             ["motorized-shades", "cellular-honeycomb-shades", "roman-shades"],
  "motorized-shades":          ["roller-shades", "draperies-curtains", "plantation-shutters"],
  "draperies-curtains":        ["roman-shades", "roller-shades", "plantation-shutters"],
  "plantation-shutters":       ["blinds", "roller-shades", "cellular-honeycomb-shades"],
  "cellular-honeycomb-shades": ["roller-shades", "roman-shades", "motorized-shades"],
  "roman-shades":              ["draperies-curtains", "roller-shades", "cellular-honeycomb-shades"],
  "blinds":                    ["plantation-shutters", "roller-shades", "cellular-honeycomb-shades"],
};

// ── Per-page hero image map ──────────────────────────────────────────────────────────────────────────────────────
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

// ── Secondary image map ("What It Is" section right-side image) ──────────────────────────────
// Uses a different product image than the hero for visual variety
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

// ── Editorial section images (rotates through available product images) ───────────────────
const EDITORIAL_IMGS = [IMAGES.cellularShades, IMAGES.romanShades, IMAGES.draperies, IMAGES.plantationShutters];

// ── Per-page bullet points (hero left column) ───────────────────────────────────────────────────
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

// ── Per-page feature cards (dark "Built to Last" section) ──────────────────────────────────────
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

// ── Default features for pages without specific ones ──────────────────────────────────────────
const DEFAULT_FEATURES = [
  { icon: <Award size={22} />, title: "Locally Owned & Operated", body: "Based in Orange Beach, Alabama, serving homeowners and businesses across the Gulf Coast." },
  { icon: <Ruler size={22} />, title: "Professional Measure & Install", body: "Every project is measured and installed by our team for a precise, professional result." },
  { icon: <MapPin size={22} />, title: "Orange Beach Showroom", body: "Visit our showroom to browse materials, fabrics and operating methods in person." },
  { icon: <CheckCircle2 size={22} />, title: "Free Consultation", body: "Schedule a free consultation to discuss the room, compare options and confirm the project details." },
];

// ── Inline consultation card (hero right column) ───────────────────────────────────
function ConsultCard({ sourcePage }: { sourcePage: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Captured once at mount — used server-side as a bot-timing signal alongside the honeypot.
  const [formLoadedAt] = useState<number>(() => Date.now());
  const inputCls = "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow";
  const errCls = "text-[12px] text-red-600 mt-1";
  const labelCls = "block text-[12.5px] font-semibold text-slate-700 mb-1";

  function validate(form: HTMLFormElement): boolean {
    const fd = new FormData(form);
    const errs: Record<string, string> = {};
    const first = (fd.get("firstName") as string)?.trim();
    const last = (fd.get("lastName") as string)?.trim();
    const phone = (fd.get("phone") as string)?.trim();
    const email = (fd.get("email") as string)?.trim();
    if (!first) errs.firstName = "First name is required";
    if (!last) errs.lastName = "Last name is required";
    if (!phone) errs.phone = "Phone is required";
    else if (phone.replace(/[^0-9]/g, "").length < 10) errs.phone = "Enter a valid phone number";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!validate(form)) return;
    const fd = new FormData(form);
    if (fd.get("_gotcha")) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitLead({
        firstName: (fd.get("firstName") as string).trim(),
        lastName: (fd.get("lastName") as string).trim(),
        phone: (fd.get("phone") as string).trim(),
        email: (fd.get("email") as string)?.trim() || undefined,
        project: (fd.get("project") as string)?.trim() || undefined,
        sourcePage,
        formLoadedAt,
      });
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please call us instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="surface-card p-6"
      style={{ boxShadow: "var(--shadow-xl)" }}
    >
      {submitted ? (
        <div className="text-center py-6">
          <CheckCircle2 size={40} className="text-blue-600 mx-auto mb-3" />
          <p className="font-[Fraunces,Georgia,serif] font-bold text-[1.125rem] text-slate-900 mb-2">Thank You</p>
          <p className="text-[13.5px] text-slate-600 leading-relaxed">We received your message and will respond within one business day.</p>
        </div>
      ) : (
        <>
          <p className="font-[Fraunces,Georgia,serif] font-bold text-[1.0625rem] text-slate-900 mb-1">Get a Quote</p>
          <p className="text-[12.5px] text-slate-500 mb-4 leading-relaxed">We'll respond within one business day. No obligation.</p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls} htmlFor="sc-first">First Name <span className="text-red-500">*</span></label>
                <input id="sc-first" name="firstName" type="text" required autoComplete="given-name" aria-invalid={!!errors.firstName} className={inputCls} />
                {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
              </div>
              <div>
                <label className={labelCls} htmlFor="sc-last">Last Name <span className="text-red-500">*</span></label>
                <input id="sc-last" name="lastName" type="text" required autoComplete="family-name" aria-invalid={!!errors.lastName} className={inputCls} />
                {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className={labelCls} htmlFor="sc-phone">Phone <span className="text-red-500">*</span></label>
              <input id="sc-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" aria-invalid={!!errors.phone} className={inputCls} placeholder="(251) 000-0000" />
              {errors.phone && <p className={errCls}>{errors.phone}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="sc-email">Email</label>
              <input id="sc-email" name="email" type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} className={inputCls} placeholder="you@example.com" />
              {errors.email && <p className={errCls}>{errors.email}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="sc-project">Project Details</label>
              <textarea id="sc-project" name="project" rows={3} className={inputCls} placeholder="Tell us about the room and what you'd like to improve." />
            </div>
            {/* Honeypot */}
            <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center !text-[14px] !py-3 disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? "Sending…" : "Get Quote"}
            </button>
            {submitError && <p className={`${errCls} text-center`}>{submitError}</p>}
          </form>
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            {["Rated 5.0 ★ by homeowners", "Licensed & insured", "No obligation. No spam. Ever."].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[12px] text-slate-500">
                <CheckCircle2 size={12} className="text-blue-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────────────
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
    <Layout breadcrumb={data.breadcrumb}>
      <Seo title={data.title} description={data.meta} canonical={data.canonical} schema={schema} />

      {/* ═════════════════════════════════════════════════════════════
          1. DARK HERO — full-bleed image, left content + right card
          Pattern: Solomon /services/motorized-patio-screens hero
          ═════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "oklch(0.10 0.02 255)" }}>
        {/* Background image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ opacity: 0.28 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,15,40,0.85) 0%, rgba(10,15,40,0.55) 60%, rgba(10,15,40,0.30) 100%)" }} />
        </div>

        <div className="container relative z-10 py-10 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 sm:gap-10 items-start">
            {/* Left: eyebrow + H1 + bullets + CTAs + rating */}
            <div>
              <span className="eyebrow !text-blue-400 !mb-3">Orange Beach, Alabama</span>
              <h1
                className="font-[Fraunces,Georgia,serif] font-extrabold text-white leading-tight mb-5"
                style={{ fontSize: "clamp(1.5rem, 1.25rem + 1.5vw, 3rem)", letterSpacing: "-0.025em" }}
              >
                {data.h1}
              </h1>

              {/* Subtext from first section */}
              {pageKey === "visualizer" && visualizerEmbedUrl && (
        <section className="py-10 sm:py-14 bg-white border-y border-slate-100">
          <div className="container text-center">
            <span className="eyebrow">Try It Before Your Consultation</span>
            <h2 className="section-heading mb-4">See Your Window Treatment Options</h2>
            <p className="lead-text max-w-[620px] mx-auto mb-7">
              Open the visualizer to explore styles, fabrics and operating options before you visit the Orange Beach showroom.
            </p>
            <a
              href={visualizerEmbedUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", padding: "14px 28px", background: "#0e5ed4", color: "#fff", fontWeight: 600, textDecoration: "none", borderRadius: 2, fontSize: 15 }}
            >
              Visualize Your Windows
            </a>
          </div>
        </section>
      )}

      {firstSection && (
                <p className="text-[1.0rem] leading-relaxed text-white/75 mb-6 max-w-[540px]">
                  {firstSection.body.split("\n\n")[0]}
                </p>
              )}

              {/* Bullet points */}
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

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
                <a href={CONTACT.phoneHref} className="btn-primary w-full sm:w-auto justify-center">
                  <Phone size={15} />
                  Call {CONTACT.phone}
                </a>
                <Link href="/contact" className="btn-outline-white w-full sm:w-auto justify-center">
                  Get Quote
                </Link>
              </div>

              {/* Rating badge */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/70 text-[13px]"><span className="gold-accent text-yellow-400">5.0</span> · Google Reviews · Locally Owned & Operated</span>
              </div>
            </div>

            {/* Right: consultation card */}
            <div className="lg:sticky lg:top-24">
              <ConsultCard sourcePage={`/${pageKey}`} />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          2. TRUST BAR — dark strip with 4 trust items
          Pattern: Solomon trust bar below hero
          ═════════════════════════════════════════════════════════════ */}
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

      {/* ═════════════════════════════════════════════════════════════
          3. "WHAT IT IS" — two-column: left text + right image
          Pattern: Solomon "WHAT THEY ARE" section
          ═════════════════════════════════════════════════════════════ */}
      {firstSection && (
        <section className="py-12 sm:py-20 bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left: copy */}
              <RevealDiv>
                <span className="eyebrow">What It Is</span>
                <h2 className="section-heading mb-5">{firstSection.heading}</h2>
                {firstSection.body.split("\n\n").map((para, j) => (
                  <p key={j} className="lead-text mb-4">
                    {para.trim()}
                  </p>
                ))}
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6">
                  <a href={CONTACT.phoneHref} className="btn-primary w-full sm:w-auto justify-center">
                    <Phone size={16} />
                    Call {CONTACT.phone}
                  </a>
                  <Link href="/contact" className="btn-outline w-full sm:w-auto justify-center">
                    Get Quote
                  </Link>
                </div>
              </RevealDiv>
              {/* Right: product image (different from hero for variety) */}
              <RevealDiv delay={120}>
                <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow-xl)" }}>
                  <img
                    src={secondaryImg}
                    alt={data.schemaName}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </RevealDiv>
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════════
          4. DARK FEATURES GRID — background image + 4 white cards
          Pattern: Solomon "BUILT TO LAST" section
          ═════════════════════════════════════════════════════════════ */}
      <section className="relative py-12 sm:py-20 overflow-hidden" style={{ backgroundColor: "oklch(0.12 0.02 255)" }}>
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
                <div className="surface-card p-5 h-full" style={{ boxShadow: "var(--shadow-lg)" }}>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 text-white"
                    style={{ backgroundColor: "oklch(0.50 0.21 255)" }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="font-[Fraunces,Georgia,serif] font-bold text-[0.9375rem] text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-slate-600">{f.body}</p>
                </div>
              </RevealDiv>
            ))}
          </div>
          <RevealDiv delay={280} className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mt-12">
            <a href={CONTACT.phoneHref} className="btn-primary w-full sm:w-auto justify-center">
              <Phone size={16} />
              Call {CONTACT.phone}
            </a>
            <Link href="/contact" className="btn-outline-white w-full sm:w-auto justify-center">
              Get Quote
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          5. ADDITIONAL CONTENT SECTIONS — two-col image+text
          Pattern: Solomon mid-page editorial sections
          ═════════════════════════════════════════════════════════════ */}
      {restSections.length > 0 && (
        <section className="py-12 sm:py-20" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
          <div className="container space-y-10 sm:space-y-20">
            {restSections.map((section, i) => (
              <RevealDiv key={i}>
                <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  {/* Text side */}
                  <div>
                    <span className="eyebrow">{i === 0 ? "Why Choose It" : "More to Know"}</span>
                    <h2
                      className="font-[Fraunces,Georgia,serif] font-bold text-slate-900 mb-4"
                      style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)", letterSpacing: "-0.02em" }}
                    >
                      {section.heading}
                    </h2>
                    {section.body.split("\n\n").map((para, j) => (
                      <p key={j} className="lead-text mb-3" style={{ fontSize: "1.0rem" }}>
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                  {/* Image side (rotates through different product images) */}
                  <div className="rounded-xl overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
                    <img
                      src={EDITORIAL_IMGS[i % EDITORIAL_IMGS.length]}
                      alt={section.heading}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                </div>
              </RevealDiv>
            ))}
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════════
          6. HOW IT WORKS — numbered steps on dark background
          Pattern: Solomon "HOW IT WORKS" section
          ═════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20 relative" style={{ backgroundColor: "oklch(0.15 0.02 255)" }}>
        <div className="container relative z-10">
          <RevealDiv className="mb-12">
            <span className="eyebrow !text-blue-400">How It Works</span>
            <h2 className="section-heading-white">From Free Quote to Finished Room</h2>
          </RevealDiv>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, i) => (
              <RevealDiv key={step.num} delay={i * 80}>
                <div
                  className="font-[Fraunces,Georgia,serif] font-extrabold mb-4 leading-none"
                  style={{ fontSize: "clamp(2.5rem, 1.5rem + 2.5vw, 3.75rem)", color: "oklch(0.50 0.21 255 / 0.35)" }}
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <h3 className="font-[Fraunces,Georgia,serif] font-bold text-[1rem] text-white mb-2">{step.title}</h3>
                <p className="text-[14px] leading-relaxed text-slate-400">{step.body}</p>
              </RevealDiv>
            ))}
          </div>
          <RevealDiv className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a href={CONTACT.phoneHref} className="btn-primary w-full sm:w-auto justify-center">
              <Phone size={16} />
              Call {CONTACT.phone}
            </a>
            <Link href="/contact" className="btn-outline-white w-full sm:w-auto justify-center">
              Get Quote
            </Link>
          </RevealDiv>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          7. RELATED PRODUCTS — image cards
          ═════════════════════════════════════════════════════════════ */}
      {relatedCards.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="container">
            <RevealDiv>
              <span className="eyebrow">Also Available</span>
              <h2 className="section-heading mb-8">Related Window Treatments</h2>
            </RevealDiv>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCards.map((card, i) => (
                <RevealDiv key={card.href} delay={i * 60}>
                  <Link href={card.href} className="service-card block group h-full">
                    <img
                      src={card.img}
                      alt={`${card.title} — Sky Window Design and More`}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="p-5">
                      <h3 className="font-[Fraunces,Georgia,serif] font-bold text-[1rem] text-slate-900 mb-1.5">{card.title}</h3>
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

      {/* ═════════════════════════════════════════════════════════════
          8. FAQ — accordion on light background
          ═════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container">
          <RevealDiv>
            <span className="eyebrow">FAQ</span>
            <h2 className="section-heading mb-8">Common Questions, Straight Answers</h2>
          </RevealDiv>
          <RevealDiv delay={60}>
            <FaqAccordion items={faqs} />
          </RevealDiv>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          9. RELATED SERVICES TEXT LINKS
          ═════════════════════════════════════════════════════════════ */}
      {textLinks.length > 0 && (
        <section className="py-10 sm:py-12 bg-white border-t border-slate-100">
          <div className="container">
            <span className="eyebrow">Related Services</span>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
              {textLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="inline-flex items-center gap-1 text-[14.5px] font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                >
                  <ChevronRight size={14} />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════════════════════════════════════════════════════════
          9b. AVAILABLE IN YOUR AREA — city cross-links strip
          ═════════════════════════════════════════════════════════════ */}
      <section className="py-10 sm:py-12 bg-white border-t border-slate-100">
        <div className="container">
          <span className="eyebrow">Available in Your Area</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
            {cityKeys.map((key) => {
              const city = CITY_PAGES[key];
              return (
                <Link
                  key={key}
                  href={`/locations/${key}`}
                  className="inline-flex items-center gap-1 text-[14.5px] font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors"
                >
                  <MapPin size={14} />
                  {city.area}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════
          10. FINAL CTA BAND — dark blue
          Pattern: Solomon bottom CTA band
          ═════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-20" style={{ backgroundColor: "oklch(0.50 0.21 255)" }}>
        <div className="container text-center">
          <RevealDiv>
            <h2
              className="font-[Fraunces,Georgia,serif] font-extrabold text-white mb-4 leading-tight"
              style={{ fontSize: "clamp(1.375rem, 1.15rem + 1.3vw, 2.625rem)", letterSpacing: "-0.025em" }}
            >
              Ready to Compare Options for Your Space?
            </h2>
            <p className="text-white/85 text-[15px] sm:text-[1.0625rem] leading-relaxed mb-8 max-w-[540px] mx-auto">
              Schedule a free consultation at the Orange Beach showroom. Bring your questions, room photos, measurements or <span className="gold-accent text-yellow-300">inspiration</span>.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-outline-white !border-white !text-white hover:!bg-white hover:!text-blue-700 w-full sm:w-auto justify-center">
                Get Quote
              </Link>
              <a href={CONTACT.phoneHref} className="btn-outline-white w-full sm:w-auto justify-center">
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
