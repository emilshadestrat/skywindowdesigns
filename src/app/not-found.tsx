// app/not-found.tsx — 404 page
// Next.js: Server Component with server-side metadata

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { CONTACT } from "@/lib/siteData";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found | Sky Window Design and More",
  description: "The page you are looking for could not be found. Browse our window treatments or contact us for help.",
  canonical: "/404",
});

export default function NotFound() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", url: "/" }, { label: "404" }]} isHeroPage />

      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container max-w-[640px] text-center">
          <span className="eyebrow">404 Error</span>
          <h1
            className="font-[Montserrat,sans-serif] font-extrabold leading-tight text-slate-900 mb-4"
            style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            This Page Could Not Be Found
          </h1>
          <p className="text-[1.0625rem] leading-relaxed text-slate-600 mb-8">
            The page you are looking for may have moved or no longer exists. Try one of the links below, or contact us directly.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <a href={CONTACT.phoneHref} className="btn-outline">
              Call {CONTACT.phone}
            </a>
          </div>
          <div className="flex items-center justify-center gap-x-6 gap-y-2 flex-wrap text-[14.5px]">
            <Link href="/window-treatments" className="font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              Window Treatments
            </Link>
            <Link href="/service-areas" className="font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              Service Areas
            </Link>
            <Link href="/roller-shades" className="font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              Roller Shades
            </Link>
            <Link href="/motorized-shades" className="font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              Motorized Shades
            </Link>
            <Link href="/plantation-shutters" className="font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              Plantation Shutters
            </Link>
            <Link href="/design-services" className="font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              Design Services
            </Link>
            <Link href="/about" className="font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              About
            </Link>
            <Link href="/contact" className="font-medium text-blue-700 hover:text-blue-900 hover:underline transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
