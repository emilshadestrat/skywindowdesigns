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
      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container max-w-[760px]">
          <span className="eyebrow">Accessibility</span>
          <h1
            className="font-[Fraunces,Georgia,serif] font-extrabold leading-tight text-slate-900 mb-4"
            style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Accessibility Statement
          </h1>
          <p className="text-[13px] text-slate-500 mb-2">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-[720px]">
          <div className="space-y-6">
            <div>
              <h2 className="font-[Fraunces,Georgia,serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Our Commitment
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                Sky Window Design and More, LLC is committed to making our website accessible to all users, including those with disabilities. We aim to comply with WCAG 2.1 Level AA guidelines where feasible.
              </p>
            </div>
            <div>
              <h2 className="font-[Fraunces,Georgia,serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Features
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                Our website includes semantic HTML, keyboard-navigable menus and forms, alt text for images, and sufficient color contrast. We continue to review and improve accessibility as the site evolves.
              </p>
            </div>
            <div>
              <h2 className="font-[Fraunces,Georgia,serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Reporting Issues
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                If you encounter an accessibility barrier on our site, please contact us at {CONTACT.email} or {CONTACT.phone}. We will work to address the issue promptly.
              </p>
            </div>
            <div>
              <h2 className="font-[Fraunces,Georgia,serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Third-Party Content
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                Some features on our site may include third-party content or widgets. We cannot guarantee the accessibility of third-party content but encourage providers to follow accessibility best practices.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
