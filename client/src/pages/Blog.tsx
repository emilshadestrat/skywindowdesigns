// Blog.tsx — Sky Window Design & More
// Placeholder blog/resource hub page for content marketing.
// Will be populated with articles in a future sprint.

import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CONTACT } from "@/lib/siteData";
import { Phone, BookOpen, ChevronRight } from "lucide-react";

export default function Blog() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://skywindowdesign.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://skywindowdesign.com/blog" },
      ],
    },
  ];

  return (
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: "Blog" }]}>
      <Seo
        title="Blog & Resources | Sky Window Design & More"
        description="Window treatment tips, design ideas, and product guides from Sky Window Design & More in Orange Beach, Alabama."
        canonical="https://skywindowdesign.com/blog"
        schema={schema}
      />

      {/* Hero */}
      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container max-w-[760px]">
          <span className="eyebrow">Blog & Resources</span>
          <h1
            className="font-[Fraunces,Georgia,serif] font-extrabold leading-tight text-slate-900 mb-6"
            style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Window Treatment Tips & Design Ideas
          </h1>
          <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-8 max-w-[600px]">
            We are putting together practical guides on choosing the right window treatments, caring for your shades and shutters, and making the most of your Gulf Coast home's natural light. Check back soon for our first articles.
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
      </section>

      {/* Coming soon placeholder */}
      <section className="py-20 bg-white">
        <div className="container max-w-[640px] text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "oklch(0.97 0.007 255)" }}
          >
            <BookOpen size={28} className="text-blue-600" />
          </div>
          <h2 className="font-[Fraunces,Georgia,serif] font-bold text-[1.5rem] text-slate-900 mb-3">
            Articles Coming Soon
          </h2>
          <p className="text-[1rem] leading-relaxed text-slate-600 mb-8">
            Our team is working on guides covering roller shade fabrics, motorized window treatment options, coastal-friendly materials, and how to choose between shades, blinds, and shutters for different rooms.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link href="/window-treatments" className="inline-flex items-center gap-1 text-[14.5px] font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              <ChevronRight size={14} />
              Browse Window Treatments
            </Link>
            <Link href="/service-areas" className="inline-flex items-center gap-1 text-[14.5px] font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              <ChevronRight size={14} />
              View Service Areas
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-1 text-[14.5px] font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              <ChevronRight size={14} />
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.15 0.02 255)" }}>
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-[Fraunces,Georgia,serif] font-extrabold text-white text-[1.375rem] leading-tight mb-1">
              Have a Question About Window Treatments?
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
