// Breadcrumbs.tsx — Sky Window Design & More
// Server component — uses next/link for navigation

import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  items: { label: string; url?: string }[];
  isHeroPage?: boolean;
}

export function Breadcrumbs({ items, isHeroPage = false }: BreadcrumbsProps) {
  return (
    <nav
      className={`${isHeroPage ? "pt-[80px]" : "pt-[70px]"} bg-slate-50 border-b border-slate-100`}
      aria-label="Breadcrumb"
    >
      <div className="container py-3 text-[13px] text-slate-500 flex items-center gap-1.5 flex-wrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {item.url ? (
              <Link href={item.url} className="text-blue-700 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-600 font-medium">{item.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight size={12} className="text-slate-300" />}
          </span>
        ))}
      </div>
    </nav>
  );
}
