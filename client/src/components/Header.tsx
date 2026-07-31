"use client";

// Header.tsx — Sky Window Design & More
// Extracted from Layout.tsx for Next.js App Router
// Client component: uses useState, useEffect, usePathname

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { NAV_LINKS, CONTACT, IMAGES } from "@/lib/siteData";
import { Phone, Menu, ChevronDown } from "lucide-react";

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [pathname] = useLocation();

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isPill = !scrolled && pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className={isPill
        ? "nav-pill mx-3 lg:mx-6 mt-3 px-4 lg:px-6"
        : "bg-white/95 backdrop-blur-md shadow-sm"
      }>
        <div className="container mx-auto flex items-center justify-between h-16 lg:h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={IMAGES.logo}
              alt="Sky Window Design & More"
              className="h-10 lg:h-12 w-auto transition-all duration-300"
              width="160"
              height="48"
            />
          </Link>

          {/* Desktop nav — 5 consolidated items */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
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
                      <ChevronDown size={13} className="opacity-60" />
                    </Link>
                  ) : (
                    <button
                      className="nav-link inline-flex items-center gap-1 px-3 py-2 text-[14px] font-semibold text-slate-800 hover:text-blue-700 transition-colors"
                      aria-haspopup="menu"
                      aria-expanded={openDropdown === link.label}
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                    >
                      {link.label}
                      <ChevronDown size={13} className="opacity-60" />
                    </button>
                  )}
                  {openDropdown === link.label && (
                    <div className="absolute left-0 top-full pt-1 min-w-[220px] z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 overflow-hidden">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="dropdown-item block px-5 py-2.5 text-[14px] font-medium text-slate-700"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : link.isCta ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="ml-2 btn-primary nav-cta text-[13.5px] !py-2.5 !px-5"
                >
                  {link.label}
                </Link>
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

          {/* Desktop phone (always visible) */}
          <a
            href={CONTACT.phoneHref}
            className="nav-link hidden xl:inline-flex items-center gap-2 text-[14px] font-semibold text-slate-800 hover:text-blue-700 transition-colors"
          >
            <Phone size={15} />
            {CONTACT.phone}
          </a>

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
    </header>
  );
}

