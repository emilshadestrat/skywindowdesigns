// Layout.tsx — Sky Window Design & More
// Pattern: Solomon Shade Solutions (solomonshadesolutions.com)
// Nav: sticky, transparent on hero → white/blur on scroll
// Footer: dark bg (#0f172a), 4 columns, social icons
// Mobile: hamburger overlay + sticky bottom bar

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS, MOBILE_NAV_LINKS, FOOTER_LINKS, CONTACT, IMAGES } from "@/lib/siteData";
import { Phone, Menu, X, ChevronDown, MapPin, Mail, Clock } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  breadcrumb?: { label: string; url?: string }[];
  heroPage?: boolean; // true = nav starts transparent over hero
}

export function Layout({ children, breadcrumb, heroPage = false }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileNavOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBg = heroPage && !scrolled
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur-md shadow-sm";

  const navText = heroPage && !scrolled ? "text-white" : "text-slate-800";
  const navHover = heroPage && !scrolled ? "hover:text-blue-200" : "hover:text-blue-700";
  const logoFilter = heroPage && !scrolled ? "brightness-0 invert" : "";

  return (
    <>
      {/* ── Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="container mx-auto flex items-center justify-between h-16 lg:h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={IMAGES.logo}
              alt="Sky Window Design & More"
              className={`h-10 lg:h-12 w-auto transition-all duration-300 ${logoFilter}`}
              width="160"
              height="48"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1 px-3 py-2 text-[14px] font-semibold transition-colors ${navText} ${navHover}`}
                  >
                    {link.label}
                    <ChevronDown size={13} className="opacity-60" />
                  </Link>
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full pt-1 min-w-[220px] z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-5 py-2.5 text-[14px] font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-[14px] font-semibold transition-colors ${navText} ${navHover}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={CONTACT.phoneHref}
              className={`inline-flex items-center gap-2 text-[14px] font-semibold transition-colors ${navText} ${navHover}`}
            >
              <Phone size={15} />
              {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="btn-primary text-[13.5px] !py-2.5 !px-5"
            >
              Free Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 transition-colors ${navText}`}
            aria-label="Open navigation menu"
            onClick={() => setMobileNavOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Breadcrumb (non-hero pages only) */}
      {breadcrumb && !heroPage && (
        <nav
          className="bg-slate-50 border-b border-slate-100 pt-[70px]"
          aria-label="Breadcrumb"
        >
          <div className="container py-3 text-[13px] text-slate-500 flex items-center gap-1.5 flex-wrap">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {item.url ? (
                  <Link href={item.url} className="text-blue-700 hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-600 font-medium">{item.label}</span>
                )}
                {i < breadcrumb.length - 1 && <span className="text-slate-300">›</span>}
              </span>
            ))}
          </div>
        </nav>
      )}

      {/* Page content */}
      <main>{children}</main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "oklch(0.15 0.02 255)" }} className="pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr] gap-10 mb-12">
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
                  className="block text-[14.5px] text-slate-300 mb-2.5 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Col 3: Service Areas */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">Service Areas</div>
              {FOOTER_LINKS.serviceArea.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[14.5px] text-slate-300 mb-2.5 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Col 4: Contact */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">Contact</div>
              <div className="space-y-3">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-start gap-3 text-[14.5px] text-slate-300 hover:text-white transition-colors"
                >
                  <Phone size={15} className="mt-0.5 flex-shrink-0 text-blue-400" />
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 text-[14.5px] text-slate-300 hover:text-white transition-colors"
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
                className="btn-primary mt-5 !text-[13.5px] !py-2.5 !px-5 inline-flex"
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

      {/* ── Mobile sticky bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 bg-white border-t border-slate-200 px-4 py-3 lg:hidden shadow-[0_-2px_12px_rgba(0,0,0,0.08)]">
        <a
          href={CONTACT.phoneHref}
          className="btn-primary flex-1 justify-center !text-[14px] !py-2.5"
        >
          <Phone size={15} />
          Call Now
        </a>
        <Link
          href="/contact"
          className="btn-outline flex-1 justify-center !text-[14px] !py-2.5"
        >
          Free Consultation
        </Link>
      </div>

      {/* ── Mobile nav overlay ── */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto lg:hidden"
          style={{ paddingBottom: "80px" }}
        >
          {/* Mobile nav header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <Link href="/" onClick={() => setMobileNavOpen(false)}>
              <img src={IMAGES.logo} alt="Sky Window Design & More" className="h-10 w-auto" width="160" height="40" />
            </Link>
            <button
              className="p-2 text-slate-700"
              aria-label="Close navigation menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          {/* Mobile nav links */}
          <nav className="flex flex-col px-5 pt-4">
            {MOBILE_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3.5 text-[16px] font-semibold text-slate-800 border-b border-slate-100 hover:text-blue-700 transition-colors"
                onClick={() => setMobileNavOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {/* Mobile nav contact */}
          <div className="px-5 pt-6 pb-4 mt-auto">
            <a
              href={CONTACT.phoneHref}
              className="btn-primary w-full justify-center mb-3"
            >
              <Phone size={16} />
              {CONTACT.phone}
            </a>
            <Link
              href="/contact"
              className="btn-outline w-full justify-center"
              onClick={() => setMobileNavOpen(false)}
            >
              Free Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
