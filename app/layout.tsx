import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GoogleAnalytics } from "./_components/GoogleAnalytics";
import { JsonLd } from "./_components/JsonLd";
import { BASE_OPEN_GRAPH, localBusinessSchema, websiteSchema } from "./_lib/seo";

const siteUrl = "https://skywindowdesign.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sky Window Design & More | Custom Window Treatments",
    template: "%s | Sky Window Design & More",
  },
  description:
    "Sky Window Design and More is a local Orange Beach showroom for custom shades, blinds, shutters, draperies, motorized options, wallpaper and interior design.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", ...BASE_OPEN_GRAPH },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={[localBusinessSchema, websiteSchema]} />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
