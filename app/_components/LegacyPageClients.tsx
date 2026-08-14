"use client";

// Design philosophy: preserve the existing premium editorial presentation while App Router handles route generation.
import { CityPage } from "@/components/CityPage";
import { StandardPage } from "@/components/StandardPage";
import Accessibility from "@/pages/Accessibility";
import Blog from "@/pages/Blog";
import ContactPage from "@/pages/Contact";
import DesignServices from "@/pages/DesignServices";
import Privacy from "@/pages/Privacy";
import ServiceAreas from "@/pages/ServiceAreas";

export function StandardPageClient({ pageKey }: { pageKey: string }) {
  return <StandardPage pageKey={pageKey} />;
}

export function CityPageClient({ pageKey }: { pageKey: string }) {
  return <CityPage pageKey={pageKey} />;
}

export function ContactPageClient() {
  return <ContactPage />;
}

export function DesignServicesClient() {
  return <DesignServices />;
}

export function ServiceAreasClient() {
  return <ServiceAreas />;
}

export function BlogClient() {
  return <Blog />;
}

export function PrivacyClient() {
  return <Privacy />;
}

export function AccessibilityClient() {
  return <Accessibility />;
}
