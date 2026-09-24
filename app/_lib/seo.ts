// Static App Router SEO helpers. Approved titles and descriptions come from the existing production data and components.
import { CITY_PAGES, CONTACT, DESIGN_SERVICE_SLUGS, HOMEPAGE_FAQS, IMAGES, PAGES, type CityPageData, type PageData } from "@/lib/siteData";

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
  // Monday to Friday only, confirmed by the client 2026-09-24 and matching the
  // Google Business Profile. Saturday 10:00-15:00 was published here in error.
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "17:00" },
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

function breadcrumb(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: `${SITE_URL}${step.path}`,
    })),
  };
}

export function citySchema(page: CityPageData) {
  return [
    // The CityPage component builds a BreadcrumbList of its own, but it passes it
    // to <Seo>, which returns null -- so city pages shipped without one.
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
      { name: page.area, path: `/locations/${page.slug}` },
    ]),
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

// /service-areas renders through the legacy ServiceAreas component, whose <Seo>
// wrapper is a no-op — so this route had no structured data at all until now.
// Derived from CITY_PAGES so a new city page cannot be left out of it.
export function serviceAreasSchema() {
  const url = `${SITE_URL}/service-areas`;
  return [
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/service-areas" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Sky Window Design Service Areas",
      url,
      itemListElement: Object.values(CITY_PAGES).map((page, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: page.area,
        url: page.canonical,
      })),
    },
  ];
}

// /design-services has the same no-op <Seo> problem /service-areas had, so it
// also shipped with no structured data. Derived from DESIGN_SERVICE_SLUGS and
// the pages' own names, so the list cannot drift from the page it describes.
export function designServicesSchema() {
  const pages = DESIGN_SERVICE_SLUGS.map((slug) => PAGES[slug]).filter(Boolean);
  return [
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Design Services", path: "/design-services" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Sky Window Design Design Services",
      url: `${SITE_URL}/design-services`,
      itemListElement: pages.map((page, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: page.schemaName,
        url: page.canonical,
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
