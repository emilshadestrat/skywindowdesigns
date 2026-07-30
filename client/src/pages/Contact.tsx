import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CONTACT } from "@/lib/siteData";

export default function ContactPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Sky Window Design & More",
      legalName: "Sky Window Design & More, LLC",
      telephone: "+12512067319",
      email: "lance@skywindowdesign.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "25405 Perdido Beach Blvd., Suite 7A",
        addressLocality: "Orange Beach",
        addressRegion: "AL",
        postalCode: "36561",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "10:00", closes: "17:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "15:00" },
      ],
    },
  };

  return (
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: "Contact" }]}>
      <Seo
        title="Contact Sky Window Design and More | Orange Beach, AL"
        description="Contact Sky Window Design and More in Orange Beach, Alabama, to discuss custom window treatments, motorized shades, draperies and more."
        canonical="https://skywindowdesign.com/contact/"
        schema={schema}
      />
      <section className="py-24 px-8">
        <div className="mx-auto max-w-[1280px] grid lg:grid-cols-[1fr_1fr] gap-12">
          {/* Left: Contact info */}
          <div>
            <h1 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-8">
              Contact Sky Window Design and More
            </h1>
            <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)] mb-8 max-w-[520px]">
              Schedule a consultation, ask a question, or confirm current showroom hours. We will help you organize the options and determine the next step.
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-2">Phone</h2>
                <a href={CONTACT.phoneHref} className="text-[1.0625rem] font-medium text-[var(--text-heading)] hover:text-[var(--brand-primary)]">
                  {CONTACT.phone}
                </a>
              </div>
              <div>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-2">Email</h2>
                <a href={`mailto:${CONTACT.email}`} className="text-[1.0625rem] font-medium text-[var(--text-heading)] hover:text-[var(--brand-primary)]">
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-2">Showroom</h2>
                <p className="text-[1.0625rem] text-[var(--text-body)]">
                  {CONTACT.address.street}<br />
                  {CONTACT.address.city}, {CONTACT.address.state} {CONTACT.address.zip}
                </p>
              </div>
              <div>
                <h2 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-2">Hours</h2>
                {CONTACT.hours.map((h, i) => (
                  <div key={i} className="flex justify-between py-1 text-[15px] text-[var(--text-body)] max-w-[320px]">
                    <span>{h.day}</span>
                    <span className="font-medium text-[var(--text-heading)]">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="bg-[var(--surface-tint)] rounded-[var(--radius-lg)] p-8">
            <h2 className="font-[var(--font-display)] text-1.5rem font-semibold text-[var(--text-heading)] mb-6">
              Request a Consultation
            </h2>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-semibold text-[var(--text-heading)] mb-1.5" htmlFor="firstName">First Name</label>
                  <input id="firstName" type="text" required className="w-full rounded-lg border border-[var(--border-subtle)] px-4 py-3 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[var(--text-heading)] mb-1.5" htmlFor="lastName">Last Name</label>
                  <input id="lastName" type="text" required className="w-full rounded-lg border border-[var(--border-subtle)] px-4 py-3 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" />
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[var(--text-heading)] mb-1.5" htmlFor="phone">Phone</label>
                <input id="phone" type="tel" required className="w-full rounded-lg border border-[var(--border-subtle)] px-4 py-3 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[var(--text-heading)] mb-1.5" htmlFor="email">Email</label>
                <input id="email" type="email" required className="w-full rounded-lg border border-[var(--border-subtle)] px-4 py-3 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[var(--text-heading)] mb-1.5" htmlFor="project">Project Details</label>
                <textarea id="project" rows={4} className="w-full rounded-lg border border-[var(--border-subtle)] px-4 py-3 text-[15px] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Tell us about the room, the windows, and what you'd like to improve." />
              </div>
              <button type="submit" className="w-full rounded-full bg-[var(--brand-primary)] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
                Request a Consultation
              </button>
              <p className="text-[13px] text-[var(--text-muted)] text-center">
                We will respond within one business day. This form does not schedule an appointment automatically.
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
