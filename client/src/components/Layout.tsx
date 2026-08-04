// Layout.tsx — Sky Window Design & More
// Pattern: Solomon Shade Solutions (solomonshadesolutions.com)
// Nav: 5-item consolidated with dropdowns, Contact as CTA button
// Breadcrumbs: visible on all subpages
// Mobile: grouped accordion nav overlay + sticky bottom bar

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS, MOBILE_NAV_GROUPS, FOOTER_LINKS, CONTACT, IMAGES } from "@/lib/siteData";
import { Phone, Menu, X, ChevronDown, ChevronRight, MapPin, Mail, Clock, Plus, Minus } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  breadcrumb?: { label: string; url?: string }[];
  heroPage?: boolean; // true = nav starts transparent over hero
}

export function Layout({ children, breadcrumb, heroPage = false }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileNavOpen(false);
    setExpandedGroups(new Set());
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <>
      {/* Skip to content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-blue-700 focus:font-semibold focus:text-sm focus:rounded-lg focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(15,23,42,0.05),0_1px_2px_rgba(15,23,42,0.03)] border-b border-slate-100/60"
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div>
          <div className="container mx-auto flex items-center justify-between h-16 lg:h-[72px]">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src={IMAGES.logo}
                alt="Sky Window Design & More"
                className="h-12 lg:h-14 w-auto transition-all duration-300"
                width="160"
                height="56"
              />
            </Link>

            {/* Desktop nav — non-CTA items only */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.filter((link) => !link.isCta).map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onFocus={() => setOpenDropdown(link.label)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="nav-link inline-flex items-center gap-1 px-3 py-2 text-[14px] font-semibold text-slate-800 hover:text-blue-700 transition-colors"
                        aria-haspopup="menu"
                        aria-expanded={openDropdown === link.label}
                      >
                        {link.label}
                        <ChevronDown size={13} className={`opacity-60 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                      </Link>
                    ) : (
                      <button
                        className="nav-link inline-flex items-center gap-1 px-3 py-2 text-[14px] font-semibold text-slate-800 hover:text-blue-700 transition-colors"
                        aria-haspopup="menu"
                        aria-expanded={openDropdown === link.label}
                        onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      >
                        {link.label}
                        <ChevronDown size={13} className={`opacity-60 transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link px-3 py-2 text-[14px] font-semibold text-slate-800 hover:text-blue-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Spacer to push CTA + phone to the right */}
            <div className="hidden lg:flex-1" />

            {/* Contact CTA + phone — positioned on the right side */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="btn-primary nav-cta text-[13.5px] !py-2.5 !px-5"
              >
                Contact
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="nav-link hidden xl:inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-blue-700 transition-colors"
              >
                <Phone size={15} />
                {CONTACT.phone}
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 text-slate-800"
              aria-label="Open navigation menu"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* ── Full-width mega-menu dropdown panel ── */}
        {openDropdown && (
          <div
            className="absolute left-0 right-0 top-full hidden lg:block"
            onMouseEnter={() => setOpenDropdown(openDropdown)}
          >
            <div className="mega-menu-panel bg-white border-t border-slate-100 shadow-[0_16px_48px_rgba(15,23,42,0.12),0_4px_16px_rgba(15,23,42,0.06)]">
              <div className="container py-8">
                {NAV_LINKS.filter((l) => l.label === openDropdown).map((link) => {
                  const items = link.dropdown || [];
                  const isServices = link.label === "Window Treatments";
                  const isDesign = link.label === "Design Services";
                  const isAreas = link.label === "Service Areas";
                  return (
                    <div key={link.label} className="grid grid-cols-12 gap-8">
                      {/* Left column — category label + description */}
                      <div className="col-span-3">
                        <h3 className="font-[Montserrat,sans-serif] font-extrabold text-[1rem] text-slate-900 mb-2">
                          {link.label}
                        </h3>
                        <p className="text-[13px] leading-relaxed text-slate-500">
                          {isServices && "Explore our full range of custom window treatments, each tailored to your space, light and privacy needs."}
                          {isDesign && "Professional design services from wallpaper to commercial installations and repairs."}
                          {isAreas && "Serving homeowners and businesses across the Alabama and Florida Gulf Coast."}
                        </p>
                        {link.href && (
                          <Link
                            href={link.href}
                            className="inline-flex items-center gap-1 mt-4 text-[13px] font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                          >
                            View all <ChevronRight size={14} />
                          </Link>
                        )}
                      </div>
                      {/* Right column — link grid */}
                      <div className="col-span-9">
                        <div className={`grid gap-x-6 gap-y-1 ${
                          items.length > 5 ? "grid-cols-3" : items.length > 3 ? "grid-cols-2" : "grid-cols-1"
                        }`}>
                          {items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="dropdown-item block px-4 py-3 rounded-lg text-[14px] font-medium text-slate-700 hover:text-blue-800"
                            >
                              <span className="font-semibold text-slate-900 block mb-0.5">{item.label}</span>
                              {isServices && (
                                <span className="text-[12px] text-slate-400 font-normal">
                                  {item.label.includes("Roller") && "Solar, privacy & blackout options"}
                                  {item.label.includes("Motorized") && "Remote, app & voice control"}
                                  {item.label.includes("Draperies") && "Custom fabric, lining & hardware"}
                                  {item.label.includes("Shutters") && "Adjustable louvers, built-in look"}
                                  {item.label.includes("Cellular") && "Honeycomb construction for comfort"}
                                  {item.label.includes("Roman") && "Classic & contemporary fold styles"}
                                  {item.label.includes("Blinds") && "Wood, composite & metal options"}
                                </span>
                              )}
                              {isDesign && (
                                <span className="text-[12px] text-slate-400 font-normal">
                                  {item.label.includes("All") && "Browse all design services"}
                                  {item.label.includes("Wallpaper") && "Color, texture & pattern coordination"}
                                  {item.label.includes("Commercial") && "Offices, hospitality & restaurants"}
                                  {item.label.includes("Visualizer") && "Browse by product type & room"}
                                  {item.label.includes("Repairs") && "Cord, mechanism & fabric repair"}
                                </span>
                              )}
                              {isAreas && (
                                <span className="text-[12px] text-slate-400 font-normal">
                                  {item.label.includes("All") && "View all service areas"}
                                  {!item.label.includes("All") && "Window treatment services"}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Breadcrumb — visible on all subpages */}
      {breadcrumb && (
        <nav
          className="pt-[70px] bg-slate-50 border-b border-slate-100"
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
                {i < breadcrumb.length - 1 && <ChevronRight size={12} className="text-slate-300" />}
              </span>
            ))}
          </div>
        </nav>
      )}

      {/* Spacer for non-breadcrumb, non-hero pages */}
      {!breadcrumb && !heroPage && <div className="pt-[70px]" />}

      {/* Page content */}
      <main id="main-content">{children}</main>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "oklch(0.13 0.02 258)" }} className="pt-16 pb-8 relative">
        <div style={{ background: "linear-gradient(to right, oklch(0.48 0.22 258), oklch(0.40 0.20 258))" }} className="absolute top-0 left-0 right-0 h-px" />
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
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-5">Services</div>
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

            {/* Col 3: More Services */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-5">Design Services</div>
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
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-5">Service Areas</div>
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

            {/* Col 4: Contact */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-5">Contact</div>
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
          <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[13px] text-slate-500">
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

      {/* ── Mobile nav overlay — grouped accordion ── */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-[60] bg-white flex flex-col overflow-y-auto lg:hidden"
          style={{ paddingBottom: "80px" }}
        >
          {/* Mobile nav header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
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

          {/* Mobile nav — grouped accordion */}
          <nav className="flex flex-col px-5 pt-2">
            {MOBILE_NAV_GROUPS.map((group) => {
              const isExpanded = expandedGroups.has(group.label);
              return (
                <div key={group.label} className="border-b border-slate-100">
                  <button
                    className="w-full flex items-center justify-between py-3.5 text-[16px] font-bold text-slate-800"
                    onClick={() => toggleGroup(group.label)}
                    aria-expanded={isExpanded}
                  >
                    {group.label}
                    {isExpanded ? <Minus size={18} className="text-slate-400" /> : <Plus size={18} className="text-slate-400" />}
                  </button>
                  {isExpanded && (
                    <div className="pb-2 pl-3 flex flex-col gap-0.5">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="mobile-nav-link py-2.5 text-[15px] font-medium text-slate-600 hover:text-blue-700 transition-colors"
                          onClick={() => setMobileNavOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
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
