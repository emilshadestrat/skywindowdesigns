// LegalPage.tsx — shared layout for the Privacy Policy, Terms of Service and
// SMS consent pages. Content lives in lib/legal.tsx.

import { Layout } from "@/components/Layout";
import { LEGAL_DOCS, type LegalKind } from "@/lib/legal";

export function LegalPage({ kind }: { kind: LegalKind }) {
  const doc = LEGAL_DOCS[kind];
  return (
    <Layout breadcrumb={[{ label: "Home", url: "/" }, { label: doc.title }]}>
      <section className="pt-8 pb-16" style={{ backgroundColor: "oklch(0.97 0.007 255)" }}>
        <div className="container max-w-[760px]">
          <span className="eyebrow">{doc.eyebrow}</span>
          <h1
            className="font-[Fraunces,Georgia,serif] font-extrabold leading-tight text-slate-900 mb-4"
            style={{ fontSize: "clamp(1.875rem, 1.5rem + 2vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            {doc.title}
          </h1>
          <p className="text-[13px] text-slate-500 mb-2">Effective date: {doc.effective}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container max-w-[720px]">
          <div className="space-y-8">
            {doc.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-[Fraunces,Georgia,serif] font-bold text-[1.375rem] text-slate-900 mb-3">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-[1.0625rem] leading-relaxed text-slate-600">{section.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
