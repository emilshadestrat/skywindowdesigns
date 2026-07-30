import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { FaqAccordion } from "@/components/FaqAccordion";
import {
  IMAGES, TRUST_ITEMS, PRODUCT_CARDS, HOMEPAGE_FAQS, PROCESS_STEPS, CONTACT,
} from "@/lib/siteData";

export default function Home() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Sky Window Design & More",
      legalName: "Sky Window Design & More, LLC",
      telephone: "+12512067319",
      email: "lance@skywindowdesign.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "25405 Perdido Beach Blvd., Suite 7A",
        addressLocality: "Orange Beach",
        addressRegion: "AL",
        postalCode: "36561",
        addressCountry: "US",
      },
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

  return (
    <Layout>
      <Seo
        title="Sky Window Design & More | Custom Window Treatments in Orange Beach, AL"
        description="Custom window treatments in Orange Beach, Alabama. Roller shades, shutters, draperies, motorized options, and interior design for Gulf Coast homes and businesses."
        canonical="https://skywindowdesign.com/"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-8 pt-12 pb-24">
        <div className="mx-auto max-w-[1280px] grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-4">
              Orange Beach, Alabama
            </p>
            <h1 className="font-[var(--font-display)] text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-[1.1] font-semibold text-[var(--text-heading)] mb-6">
              Custom Window Treatments for Gulf Coast Living
            </h1>
            <p className="text-[1.1875rem] leading-relaxed text-[var(--text-body)] mb-4 max-w-[560px]">
              Sky Window Design and More is a local Orange Beach showroom for custom shades, blinds, shutters, draperies, motorized options, wallpaper and interior design.
            </p>
            <p className="text-[1.1875rem] leading-relaxed text-[var(--text-body)] mb-8 max-w-[560px]">
              We help Gulf Coast homeowners and businesses compare products, fabrics and operating methods — then schedule professional measure and installation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
                Schedule a Consultation
              </Link>
              <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-primary)] px-7 py-3.5 text-[15px] font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary-tint)]">
                Call {CONTACT.phone}
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={IMAGES.hero}
              alt="Bright coastal living room with custom roller shades overlooking the Gulf Coast in Orange Beach, Alabama"
              className="w-full h-[420px] lg:h-[520px] object-cover rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="px-8 pb-8">
        <div className="mx-auto max-w-[1280px] flex items-center justify-center gap-8 flex-wrap py-6 border-y border-[var(--border-subtle)]">
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--star-gold)]"></span>
              <span className="text-[15px] font-semibold text-[var(--text-heading)]">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Window Treatments Intro */}
      <section className="py-24 px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-4">
            Products
          </p>
          <h2 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-6">
            Window Treatments Designed Around Your Space
          </h2>
          <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)] max-w-[720px] mb-4">
            Every room has different needs. A bedroom may need privacy and a softer level of light. A living area may need glare management without losing the feeling of an open view. A tall or hard-to-reach window may be easier to operate with motorization. A business may need a consistent look across several rooms.
          </p>
          <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)] max-w-[720px]">
            We help you compare the details that matter, including light control, privacy, fabric, material, operation, maintenance and overall style. The goal is a window treatment that looks right and works well for the space.
          </p>
        </div>
      </section>

      {/* Product Cards */}
      <section className="pb-24 px-8">
        <div className="mx-auto max-w-[1280px] grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-[var(--radius-lg)] overflow-hidden bg-white border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={card.img}
                  alt={`${card.title} — custom window treatment by Sky Window Design and More in Orange Beach, Alabama`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-[var(--font-display)] text-1.25rem font-semibold text-[var(--text-heading)] mb-2">
                  {card.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--text-body)] mb-4">
                  {card.desc}
                </p>
                <span className="text-[14px] font-semibold text-[var(--brand-primary)] group-hover:text-[var(--brand-primary-hover)]">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Showroom */}
      <section className="bg-[var(--surface-tint)] py-24 px-8">
        <div className="mx-auto max-w-[1280px] grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-4">
              Visit Us
            </p>
            <h2 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-6">
              A Local Showroom for Coastal Homes and Businesses
            </h2>
            <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)] mb-4 max-w-[560px]">
              Visit Sky Window Design and More at {CONTACT.address.street}, {CONTACT.address.city}, {CONTACT.address.state}. Browse materials, fabrics and operating methods in person.
            </p>
            <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)] mb-8 max-w-[560px]">
              Contact us before visiting to confirm current hours and consultation availability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
                Schedule a Consultation
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-primary)] px-7 py-3.5 text-[15px] font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary-tint)]">
                Learn About Us
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-[var(--radius-md)] p-6 shadow-[var(--shadow-sm)]">
              <h3 className="font-[var(--font-display)] text-1.25rem font-semibold text-[var(--text-heading)] mb-3">Showroom Hours</h3>
              {CONTACT.hours.map((h, i) => (
                <div key={i} className="flex justify-between py-1.5 text-[15px] text-[var(--text-body)] border-b border-[var(--border-subtle)] last:border-0">
                  <span>{h.day}</span>
                  <span className="font-medium text-[var(--text-heading)]">{h.time}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-[var(--radius-md)] p-6 shadow-[var(--shadow-sm)]">
              <h3 className="font-[var(--font-display)] text-1.25rem font-semibold text-[var(--text-heading)] mb-3">Location</h3>
              <p className="text-[15px] text-[var(--text-body)]">{CONTACT.address.street}</p>
              <p className="text-[15px] text-[var(--text-body)]">{CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}</p>
              <p className="text-[15px] text-[var(--text-body)] mt-3">{CONTACT.phone}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-4">
            How It Works
          </p>
          <h2 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-12">
            How the Design Process Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="relative">
                <div className="w-12 h-12 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-xl font-bold font-[var(--font-display)] mb-4">
                  {step.num}
                </div>
                <h3 className="font-[var(--font-display)] text-1.25rem font-semibold text-[var(--text-heading)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--text-body)] max-w-[360px]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--surface-tint)] py-24 px-8">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-4">
            FAQ
          </p>
          <h2 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-8">
            Frequently Asked Questions
          </h2>
          <FaqAccordion items={HOMEPAGE_FAQS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--brand-primary)] py-24 px-8">
        <div className="mx-auto max-w-[1280px] text-center">
          <h2 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-white mb-6">
            Ready to Compare Options for Your Space?
          </h2>
          <p className="text-[1.0625rem] leading-relaxed text-white/90 mb-8 max-w-[560px] mx-auto">
            Schedule a consultation at the Orange Beach showroom. Bring your questions, room photos, measurements or inspiration.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary-tint)]">
              Schedule a Consultation
            </Link>
            <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/14">
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
