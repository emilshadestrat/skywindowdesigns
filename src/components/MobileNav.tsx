"use client";

// MobileNav.tsx — Sky Window Design & More
// Extracted from Layout.tsx for Next.js App Router
// Client component: uses useState for accordion + overlay state

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_NAV_GROUPS, CONTACT, IMAGES } from "@/lib/siteData";
import { Phone, X, Plus, Minus } from "lucide-react";

export function MobileNav() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavOpen(false);
    setExpandedGroups(new Set());
  }, [pathname]);

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
      {/* Mobile sticky bar */}
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

      {/* Mobile nav overlay — grouped accordion */}
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

// Export a trigger button that can be used in the Header to open the mobile nav
export function MobileNavTrigger({ onClick }: { onClick: () => void }) {
  return null; // The Header has its own hamburger button
}
