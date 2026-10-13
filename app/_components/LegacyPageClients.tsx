"use client";

// Design philosophy: preserve the existing premium editorial presentation while App Router handles route generation.
import { CityPage } from "@/components/CityPage";
import { LegalPage } from "@/components/LegalPage";
import { StandardPage } from "@/components/StandardPage";
import type { LegalKind } from "@/lib/legal";
import Accessibility from "@/pages/Accessibility";
import Blog from "@/pages/Blog";
import ContactPage from "@/pages/Contact";
import DesignServices from "@/pages/DesignServices";
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

// Privacy Policy, Terms of Service and SMS consent (content in lib/legal.tsx).
export function LegalPageClient({ kind }: { kind: LegalKind }) {
  return <LegalPage kind={kind} />;
}

export function AccessibilityClient() {
  return <Accessibility />;
}
