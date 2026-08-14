// Design philosophy: route wrapper preserves the current editorial blog presentation.
import type { Metadata } from "next";
import { BlogClient } from "../_components/LegacyPageClients";

export const metadata: Metadata = {
  title: { absolute: "Blog & Resources | Sky Window Design & More" },
  description: "Window treatment tips, design ideas, and product guides from Sky Window Design & More in Orange Beach, Alabama.",
  alternates: { canonical: "/blog" },
};

export default function BlogRoute() {
  return <BlogClient />;
}
