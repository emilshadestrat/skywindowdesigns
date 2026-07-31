// Footer.tsx — Sky Window Design & More
// Extracted from Layout.tsx for Next.js App Router
// Server component — uses next/link for navigation

import Link from "next/link";
import { FOOTER_LINKS, CONTACT, IMAGES } from "@/lib/siteData";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "oklch(0.15 0.02 255)" }} className="pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr] gap-8 mb-12">
          {/* Col 1: Brand */}
          <div>
            <img
              src={IMAGES.logo}
              alt="Sky Window Design & More"
              className="h-11 w-auto mb-5 brightness-0 invert"
              width="160"
              height="44"
            />
            <p className="text-[14.5px] text-slate-400 leading-relaxed max-w-[280px] mb-6">
              Custom window treatments for Orange Beach, Alabama and the surrounding Gulf Coast.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/skywindowdesign"
                aria-label="Sky Window Design on Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://www.instagram.com/skywindowdesign"
                aria-label="Sky Window Design on Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">Services</div>
            {FOOTER_LINKS.services.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link block text-[14.5px] text-slate-300 mb-2.5 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 3: Design Services */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">Design Services</div>
            {FOOTER_LINKS.moreServices.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link block text-[14.5px] text-slate-300 mb-2.5 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 4: Service Areas */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">Service Areas</div>
            {FOOTER_LINKS.serviceArea.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="footer-link block text-[14.5px] text-slate-300 mb-2.5 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Col 5: Contact */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">Contact</div>
            <div className="space-y-3">
              <a
                href={CONTACT.phoneHref}
                className="footer-link flex items-start gap-3 text-[14.5px] text-slate-300 hover:text-white transition-colors"
              >
                <Phone size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="footer-link flex items-start gap-3 text-[14.5px] text-slate-300 hover:text-white transition-colors"
              >
                <Mail size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                {CONTACT.email}
              </a>
              <div className="flex items-start gap-3 text-[14.5px] text-slate-400">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                <span>
                  {CONTACT.address.street}<br />
                  {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
                </span>
              </div>
              <div className="flex items-start gap-3 text-[14px] text-slate-400">
                <Clock size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                <div>
                  {CONTACT.hours.map((h) => (
                    <div key={h.day}>{h.day}: {h.time}</div>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/contact"
              className="btn-primary footer-cta mt-5 !text-[13.5px] !py-2.5 !px-5 inline-flex"
            >
              Free Consultation
            </Link>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[13px] text-slate-500">
          <span>© 2026 Sky Window Design & More, LLC. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/accessibility" className="hover:text-slate-300 transition-colors">Accessibility</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
