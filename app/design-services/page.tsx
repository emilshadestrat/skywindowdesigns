// Design philosophy: route wrapper preserves the existing luxury editorial design services page.
import type { Metadata } from "next";
import { DesignServicesClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "Design Services | Sky Window Design & More" },
  description: "Wallpaper, interior design, commercial window treatments, visualizer, and repair services from Sky Window Design & More in Orange Beach, Alabama.",
  alternates: { canonical: "/design-services" },
};

export default function DesignServicesRoute() {
  return <DesignServicesClient />;
}
