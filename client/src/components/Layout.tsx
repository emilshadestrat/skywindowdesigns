import { useState, useEffect } from "react";
import { Link } from "wouter";
import { NAV_LINKS, MOBILE_NAV_LINKS, FOOTER_LINKS, CONTACT, IMAGES } from "@/lib/siteData";

interface LayoutProps {
  children: React.ReactNode;
  breadcrumb?: { label: string; url?: string }[];
}

export function Layout({ children, breadcrumb }: LayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className="sticky top-8 z-50 mx-auto flex items-center justify-between gap-6 rounded-full bg-white px-5 py-2.5 shadow-[var(--shadow-header)]"
        style={{ maxWidth: "1180px" }}
      >
        <Link href="/">
          <img src={IMAGES.logo} alt="Sky Window Design & More" className="h-11" width="160" height="46" />
        </Link>
        <nav className="hidden xl:flex items-center gap-7">
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="group relative">
                <Link
                  href={link.href}
                  className="text-[14.5px] font-medium text-[var(--text-heading)] transition-colors hover:text-[var(--link-hover)]"
                >
                  {link.label} <span className="text-[10px]">▾</span>
                </Link>
                <div className="invisible absolute left-0 top-full mt-2 min-w-[220px] rounded-2xl bg-white p-3 shadow-[var(--shadow-md)] opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-5 py-2.5 text-[14.5px] font-medium text-[var(--text-heading)] transition-colors hover:text-[var(--brand-primary)] hover:bg-[var(--surface-tint)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14.5px] font-medium text-[var(--text-heading)] transition-colors hover:text-[var(--link-hover)]"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
        <Link
          href="/contact"
          className="hidden xl:inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
        >
          Contact Us
        </Link>
        <button
          className="xl:hidden p-2"
          aria-label="Open menu"
          onClick={() => setMobileNavOpen(true)}
        >
          <span className="block w-6 h-0.5 bg-[var(--text-heading)] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[var(--text-heading)] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[var(--text-heading)]"></span>
        </button>
      </header>

      {/* Breadcrumb */}
      {breadcrumb && (
        <nav className="mx-auto max-w-[1280px] px-8 pt-4 text-[13.5px] text-[var(--text-muted)]" aria-label="Breadcrumb">
          {breadcrumb.map((item, i) => (
            <span key={i}>
              {item.url ? (
                <Link href={item.url} className="text-[var(--link-color)] hover:text-[var(--link-hover)]">{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
              {i < breadcrumb.length - 1 && <span className="mx-1.5 text-[var(--text-muted)]">›</span>}
            </span>
          ))}
        </nav>
      )}

      {/* Page content */}
      {children}

      {/* Footer */}
      <footer className="bg-[var(--surface-dark)] px-8 pt-16 pb-8">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <img src={IMAGES.logo} alt="Sky Window Design & More logo" className="h-12 mb-4 brightness-0 invert" width="160" height="48" />
            <p className="text-[14.5px] text-[var(--text-on-dark-muted)] leading-relaxed max-w-[280px]">
              Custom window treatments for Orange Beach, Alabama and the surrounding Gulf Coast.
            </p>
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-on-dark-muted)] mb-4">Services</div>
            {FOOTER_LINKS.services.map((link) => (
              <Link key={link.href} href={link.href} className="block text-[15px] text-white opacity-88 mb-2.5 hover:opacity-100 transition-opacity">
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-on-dark-muted)] mb-4">More Services</div>
            {FOOTER_LINKS.moreServices.map((link) => (
              <Link key={link.href} href={link.href} className="block text-[15px] text-white opacity-88 mb-2.5 hover:opacity-100 transition-opacity">
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-on-dark-muted)] mb-4">Service Area</div>
            {FOOTER_LINKS.serviceArea.map((link) => (
              <Link key={link.href} href={link.href} className="block text-[15px] text-white opacity-88 mb-2.5 hover:opacity-100 transition-opacity">
                {link.label}
              </Link>
            ))}
          </div>
          <div>
            <div className="text-[13px] font-semibold uppercase tracking-wider text-[var(--text-on-dark-muted)] mb-4">Contact</div>
            <p className="text-[15px] text-white opacity-88 mb-2">{CONTACT.phone}</p>
            <p className="text-[15px] text-white opacity-88 mb-2">{CONTACT.email}</p>
            <p className="text-[15px] text-white opacity-70 mb-4">{CONTACT.address.street}<br />{CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--border-on-dark)] px-5 py-3 text-[13.5px] font-semibold text-white hover:bg-white/14 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-12 pt-6 border-t border-[var(--border-on-dark)] flex justify-between items-center flex-wrap gap-3 max-w-[1280px] text-[13px] text-[var(--text-on-dark-muted)]">
          <span>© 2026 Sky Window Design & More, LLC. All rights reserved.</span>
          <span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link> ·{" "}
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </span>
        </div>
      </footer>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 bg-white border-t border-[var(--border-subtle)] p-2.5 xl:hidden">
        <a href={CONTACT.phoneHref} className="rounded-full bg-[var(--brand-primary)] px-5 py-2.5 text-[14px] font-semibold text-white">
          Call {CONTACT.phone}
        </a>
        <Link href="/contact" className="px-4 py-2 text-[14px] font-semibold text-[var(--brand-primary)]">
          Schedule a Consultation
        </Link>
      </div>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col gap-4 p-8 pt-20 xl:hidden">
          <button
            className="absolute top-5 right-5 text-3xl text-[var(--text-heading)]"
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
          >
            ×
          </button>
          {MOBILE_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-[var(--text-heading)] py-3 border-b border-[var(--border-subtle)]"
              onClick={() => setMobileNavOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
