// CtaBand.tsx — minimal, used only by legacy pages
import { Link } from "wouter";

interface Cta {
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export function CtaBand({ ctas }: { ctas: Cta[] }) {
  return (
    <section className="py-16" style={{ backgroundColor: "oklch(0.15 0.02 255)" }}>
      <div className="container flex items-center justify-center gap-4 flex-wrap">
        {ctas.map((cta, i) => (
          <Link
            key={i}
            href={cta.href}
            className={cta.variant === "primary" ? "btn-outline-white" : "btn-outline-white !border-white/40"}
          >
            {cta.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
