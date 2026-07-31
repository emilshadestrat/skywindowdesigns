// Root Layout — Sky Window Design & More
// Next.js App Router root layout
// Server component — imports globals.css, fonts, and renders shared chrome

import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Providers } from "@/components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sky Window Design & More | Custom Window Treatments on the Gulf Coast",
  description: "Custom window treatments, plantation shutters, motorized shades, draperies, and interior design services for Orange Beach, AL and the Gulf Coast.",
  metadataBase: new URL("https://skywindesign-8rzxlz7n.manus.space"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sky Window Design & More | Custom Window Treatments on the Gulf Coast",
    description: "Custom window treatments, plantation shutters, motorized shades, draperies, and interior design services for Orange Beach, AL and the Gulf Coast.",
    url: "https://skywindesign-8rzxlz7n.manus.space",
    siteName: "Sky Window Design & More",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Window Design & More | Custom Window Treatments on the Gulf Coast",
    description: "Custom window treatments, plantation shutters, motorized shades, draperies, and interior design services for Orange Beach, AL and the Gulf Coast.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          {/* Skip to content link for keyboard users */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-blue-700 focus:font-semibold focus:text-sm focus:rounded-lg focus:shadow-lg"
          >
            Skip to content
          </a>

          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
