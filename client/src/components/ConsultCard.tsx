"use client";

// ConsultCard.tsx — Inline consultation form card
// Client component: uses useState for form state and validation

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function ConsultCard() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!validate(form)) return;
    setSubmitted(true);
  }

  return (
    <div
      className="rounded-2xl bg-white p-6 border border-slate-100"
      style={{ boxShadow: "0 8px 40px rgba(15,23,42,0.18)" }}
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
          <p className="text-[12.5px] text-slate-500 mb-4 leading-relaxed">We&apos;ll respond within one business day. No obligation.</p>
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
            <button type="submit" className="btn-primary w-full justify-center !text-[14px] !py-3">
              Get Quote
            </button>
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
