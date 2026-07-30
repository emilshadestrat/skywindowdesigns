import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CONTACT } from "@/lib/siteData";

export default function Privacy() {
  return (
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: "Privacy Policy" }]}>
      <Seo
        title="Privacy Policy | Sky Window Design and More"
        description="Privacy policy for Sky Window Design and More, Orange Beach, Alabama."
        canonical="https://skywindowdesign.com/privacy/"
      />
      <section className="py-24 px-8">
        <div className="mx-auto max-w-[720px]">
          <h1 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-8">
            Privacy Policy
          </h1>
          <p className="text-[13px] text-[var(--text-muted)] mb-8">Last updated: January 2026</p>

          <div className="space-y-6">
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Information We Collect</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                Sky Window Design and More, LLC collects information you provide through our contact form, phone calls, emails, and in-person consultations. This may include your name, phone number, email address, project details, and property address. We do not sell or rent your personal information to third parties.
              </p>
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">How We Use Your Information</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                We use your information to respond to inquiries, schedule consultations, provide quotes, coordinate installations, and communicate about your project. We may also use your email to send occasional updates about products and promotions if you have opted in.
              </p>
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Cookies and Analytics</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                Our website uses cookies and analytics tools to understand how visitors use the site. This data is aggregated and does not identify individual users. You can disable cookies in your browser settings.
              </p>
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Third-Party Services</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                We may use third-party tools for analytics, form handling, and customer relationship management. These providers have their own privacy policies governing how they handle data.
              </p>
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Your Rights</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                You may request access to, correction of, or deletion of your personal information at any time by contacting us at {CONTACT.email} or {CONTACT.phone}.
              </p>
            </div>
            <div>
              <h2 className="font-[var(--font-display)] text-1.375rem font-semibold text-[var(--text-heading)] mb-3">Contact Us</h2>
              <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)]">
                Questions about this policy can be sent to {CONTACT.email} or by calling {CONTACT.phone}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
