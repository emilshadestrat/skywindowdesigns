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
      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container max-w-[760px]">
          <span className="eyebrow">Privacy Policy</span>
          <h1
            className="font-[Montserrat,sans-serif] font-extrabold leading-tight text-slate-900 mb-4"
            style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            Privacy Policy
          </h1>
          <p className="text-[13px] text-slate-500 mb-2">Last updated: January 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-[720px]">
          <div className="space-y-6">
            <div>
              <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Information We Collect
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                Sky Window Design and More, LLC collects information you provide through our contact form, phone calls, emails, and in-person consultations. This may include your name, phone number, email address, project details, and property address. We do not sell or rent your personal information to third parties.
              </p>
            </div>
            <div>
              <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                How We Use Your Information
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                We use your information to respond to inquiries, schedule consultations, provide quotes, coordinate installations, and communicate about your project. We may also use your email to send occasional updates about products and promotions if you have opted in.
              </p>
            </div>
            <div>
              <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Cookies and Analytics
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                Our website uses cookies and analytics tools to understand how visitors use the site. This data is aggregated and does not identify individual users. You can disable cookies in your browser settings.
              </p>
            </div>
            <div>
              <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Third-Party Services
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                We may use third-party tools for analytics, form handling, and customer relationship management. These providers have their own privacy policies governing how they handle data.
              </p>
            </div>
            <div>
              <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Your Rights
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                You may request access to, correction of, or deletion of your personal information at any time by contacting us at {CONTACT.email} or {CONTACT.phone}.
              </p>
            </div>
            <div>
              <h2 className="font-[Montserrat,sans-serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                Contact Us
              </h2>
              <p className="text-[1.0625rem] leading-relaxed text-slate-600">
                Questions about this policy can be sent to {CONTACT.email} or by calling {CONTACT.phone}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
