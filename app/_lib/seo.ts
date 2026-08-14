// Static App Router SEO helpers. Approved titles and descriptions come from the existing production data and components.
import { CITY_PAGES, CONTACT, HOMEPAGE_FAQS, IMAGES, PAGES, type CityPageData, type PageData } from "@/lib/siteData";

export const SITE_URL = "https://skywindowdesign.com";

const absoluteAssetUrl = (asset: string) => asset.startsWith("http") ? asset : `${SITE_URL}${asset}`;

const businessReference = { "@id": `${SITE_URL}/#business` };

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Sky Window Design & More",
  legalName: "Sky Window Design & More, LLC",
  description: "Custom window treatments for Orange Beach, Alabama and the Gulf Coast. Roller shades, plantation shutters, motorized shades, draperies, and more.",
  url: `${SITE_URL}/`,
  telephone: "+12512067319",
  email: CONTACT.email,
  image: absoluteAssetUrl(IMAGES.hero),
  logo: absoluteAssetUrl(IMAGES.logo),
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, Credit Card, Check",
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.address.street,
    addressLocality: CONTACT.address.city,
    addressRegion: CONTACT.address.state,
    postalCode: CONTACT.address.zip,
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 30.2658, longitude: -87.5833 },
  hasMap: "https://www.google.com/maps/search/?api=1&query=25405+Perdido+Beach+Blvd+Suite+7A+Orange+Beach+AL+36561",
  sameAs: ["https://www.facebook.com/skywindowdesign", "https://www.instagram.com/skywindowdesign"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "17:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "15:00" },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sky Window Design & More",
  url: `${SITE_URL}/`,
};

export const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export function serviceSchema(page: PageData) {
  return {
    "@context": "https://schema.org",
    "@type": page.schemaType,
    name: page.schemaName,
    url: page.canonical,
    description: page.meta,
    provider: businessReference,
    areaServed: { "@type": "City", name: "Orange Beach" },
  };
}

export function citySchema(page: CityPageData) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Window Treatments in ${page.area}`,
      url: page.canonical,
      description: page.meta,
      provider: businessReference,
      areaServed: { "@type": "AdministrativeArea", name: page.area },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];
}

export const crawlableRoutes = [
  "/",
  ...Object.keys(PAGES).map((slug) => `/${slug}`),
  ...Object.keys(CITY_PAGES).map((slug) => `/locations/${slug}`),
  "/contact",
  "/design-services",
  "/service-areas",
  "/blog",
  "/privacy",
  "/accessibility",
];
