// Design philosophy: route wrapper preserves the existing premium service-area presentation.
import type { Metadata } from "next";
import { ServiceAreasClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "Service Areas | Sky Window Design & More" },
  description: "Sky Window Design & More serves Orange Beach, AL and the surrounding Gulf Coast. View all service areas for custom window treatments.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasRoute() {
  return <ServiceAreasClient />;
}
