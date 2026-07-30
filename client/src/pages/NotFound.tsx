import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { Seo } from "@/components/Seo";
import { CONTACT } from "@/lib/siteData";

export default function NotFound() {
  return (
    <Layout>
      <Seo
        title="Page Not Found | Sky Window Design and More"
        description="The page you are looking for could not be found. Browse our window treatments or contact us for help."
        canonical="https://skywindowdesign.com/404/"
      />
      <section className="py-32 px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-primary)] mb-4">
            404
          </p>
          <h1 className="font-[var(--font-display)] text-[clamp(2rem,1.6rem+1.6vw,2.75rem)] leading-tight font-semibold text-[var(--text-heading)] mb-6">
            This Page Could Not Be Found
          </h1>
          <p className="text-[1.0625rem] leading-relaxed text-[var(--text-body)] mb-8">
            The page you are looking for may have moved or no longer exists. Try one of the links below, or contact us directly.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]">
              Back to Home
            </Link>
            <a href={CONTACT.phoneHref} className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-primary)] px-7 py-3.5 text-[15px] font-semibold text-[var(--brand-primary)] transition-colors hover:bg-[var(--brand-primary-tint)]">
              Call {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
