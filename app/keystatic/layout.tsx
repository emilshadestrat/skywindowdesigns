import type { Metadata } from "next";

// Keystatic renders its own full-page shell and must never be indexed.
export const metadata: Metadata = {
  title: "Content Admin | Sky Window Design & More",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
