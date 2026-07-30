import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CONTACT } from "@/lib/siteData";

export default function Accessibility() {
  return (
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: "Accessibility" }]}>
      <Seo
        title="Accessibility Statement | Sky Window Design and More"
        description="Accessibility statement for Sky Window Design and More, Orange Beach, Alabama."
        canonical="https://skywindowdesign.com/accessibility/"
      />
      <section className="py-24 px-8">
        <div className="mx-auto max-w-[720px]">
          <h1 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-8">
            Accessibility Statement
          </h1>
          <p className="text-[13px] text-[var(--text-muted)] mb-8">Last updated: January 2026</p>

          <div className="space-y-6">
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Our Commitment</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                Sky Window Design and More, LLC is committed to making our website accessible to all users, including those with disabilities. We aim to comply with WCAG 2.1 Level AA guidelines where feasible.
              </p>
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Features</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                Our website includes semantic HTML, keyboard-navigable menus and forms, alt text for images, and sufficient color contrast. We continue to review and improve accessibility as the site evolves.
              </p>
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Reporting Issues</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                If you encounter an accessibility barrier on our site, please contact us at {CONTACT.email} or {CONTACT.phone}. We will work to address the issue promptly.
              </p>
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Third-Party Content</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                Some features on our site may include third-party content or widgets. We cannot guarantee the accessibility of third-party content but encourage providers to follow accessibility best practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
