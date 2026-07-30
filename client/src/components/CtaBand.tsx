import { Link } from "wouter";

interface Cta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export function CtaBand({ ctas }: { ctas: Cta[] }) {
  return (
    <section className="bg-[var(--brand-primary)] py-24 px-8">
      <div className="mx-auto max-w-[1280px] flex items-center justify-center gap-6 flex-wrap">
        {ctas.map((cta, i) => {
          const base = "inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-colors";
          const variant =
            cta.variant === "primary"
              ? "bg-white text-[var(--brand-primary)] hover:bg-[var(--brand-primary-tint)]"
              : "border-2 border-white/30 text-white hover:bg-white/14";
          return (
            <Link key={i} href={cta.href} className={`${base} ${variant}`}>
              {cta.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
