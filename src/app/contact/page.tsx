// app/contact/page.tsx — Contact page
// Next.js: Client Component (form state) with server-side metadata

"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/lib/seo";
import { CONTACT } from "@/lib/siteData";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
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
};

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow";
const labelCls = "block text-[13.5px] font-semibold text-slate-700 mb-1.5";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const errCls = "text-[12.5px] text-red-600 mt-1";

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
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!validate(form)) return;
    setSubmitted(true);
  }

  return (
    <>
      <JsonLd data={schema} />
      <Breadcrumbs items={[{ label: "Home", url: "/" }, { label: "Contact" }]} isHeroPage />

      {/* Page Hero */}
      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container max-w-[760px]">
          <span className="eyebrow">Get in Touch</span>
          <h1
            className="font-[Montserrat,sans-serif] font-extrabold leading-tight text-slate-900 mb-4"
            style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Contact Sky Window Design and More
          </h1>
          <p className="text-[1.0625rem] leading-relaxed text-slate-600 max-w-[600px]">
            Schedule a consultation, ask a question, or confirm current showroom hours. We will help you organize the options and determine the next step.
          </p>
        </div>
      </section>

      {/* Main: Info + Form */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">

            {/* Left: Contact info */}
            <div>
              <h2
                className="font-[Montserrat,sans-serif] font-bold text-slate-900 mb-6"
                style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)" }}
              >
                Showroom Information
              </h2>

              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">Phone</p>
                    <a href={CONTACT.phoneHref} className="text-[1.0625rem] font-semibold text-slate-900 hover:text-blue-700 transition-colors">
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">Email</p>
                    <a href={`mailto:${CONTACT.email}`} className="text-[1.0625rem] font-semibold text-slate-900 hover:text-blue-700 transition-colors">
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-0.5">Showroom</p>
                    <p className="text-[1.0625rem] text-slate-700 leading-relaxed">
                      {CONTACT.address.street}<br />
                      {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Clock size={17} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2">Hours</p>
                    <div className="space-y-1.5">
                      {CONTACT.hours.map((h) => (
                        <div key={h.day} className="flex gap-4 text-[15px] text-slate-700">
                          <span className="w-40 flex-shrink-0">{h.day}</span>
                          <span className="font-semibold text-slate-900">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust points */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <p className="text-[13.5px] font-bold text-slate-700 mb-3 uppercase tracking-[0.12em]">What to Expect</p>
                <ul className="space-y-2.5">
                  {[
                    "We respond within one business day",
                    "Free in-home consultation available",
                    "Professional measure and installation",
                    "Local Orange Beach showroom to browse samples",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-slate-700">
                      <CheckCircle2 size={15} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-100 mt-6" style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.08)" }}>
                <iframe
                  title="Sky Window Design & More showroom location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.0!2d-87.58!3d30.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE1JzM2LjAiTiA4N8KwMzQnNDguMCJX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: Consultation form */}
            <div
              className="rounded-2xl p-8 border border-slate-100"
              style={{ boxShadow: "0 4px 24px rgba(15,23,42,0.08)" }}
            >
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 size={48} className="text-blue-600 mx-auto mb-4" />
                  <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                    Thank You
                  </h2>
                  <p className="text-[15px] text-slate-600 leading-relaxed max-w-[360px] mx-auto">
                    We received your message and will respond within one business day. This form does not schedule an appointment automatically.
                  </p>
                </div>
              ) : (
                <>
                  <h2
                    className="font-[Montserrat,sans-serif] font-bold text-slate-900 mb-2"
                    style={{ fontSize: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)" }}
                  >
                    Request a Consultation
                  </h2>
                  <p className="text-[14.5px] text-slate-500 mb-6">
                    This form does not schedule an appointment automatically.
                  </p>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} htmlFor="firstName">First Name <span className="text-red-500">*</span></label>
                        <input id="firstName" name="firstName" type="text" required autoComplete="given-name" aria-invalid={!!errors.firstName} className={inputCls} />
                        {errors.firstName && <p className={errCls}>{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="lastName">Last Name <span className="text-red-500">*</span></label>
                        <input id="lastName" name="lastName" type="text" required autoComplete="family-name" aria-invalid={!!errors.lastName} className={inputCls} />
                        {errors.lastName && <p className={errCls}>{errors.lastName}</p>}
                      </div>
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="phone">Phone <span className="text-red-500">*</span></label>
                      <input id="phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" aria-invalid={!!errors.phone} className={inputCls} placeholder="(251) 000-0000" />
                      {errors.phone && <p className={errCls}>{errors.phone}</p>}
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="email">Email <span className="text-red-500">*</span></label>
                      <input id="email" name="email" type="email" inputMode="email" required autoComplete="email" aria-invalid={!!errors.email} className={inputCls} placeholder="you@example.com" />
                      {errors.email && <p className={errCls}>{errors.email}</p>}
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="project">Project Details</label>
                      <textarea
                        id="project"
                        name="project"
                        rows={4}
                        className={inputCls}
                        placeholder="Tell us about the room, the windows, and what you'd like to improve."
                      />
                    </div>
                    {/* Honeypot */}
                    <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                    <button
                      type="submit"
                      className="btn-primary w-full justify-center !text-[15px] !py-3.5"
                    >
                      Request a Consultation
                    </button>
                    <p className="text-[12.5px] text-slate-400 text-center leading-relaxed">
                      We will respond within one business day. This form does not schedule an appointment automatically.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
