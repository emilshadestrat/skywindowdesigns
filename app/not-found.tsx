import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-6 py-24 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Page not found</p>
        <h1 className="section-heading">This page is not available.</h1>
        <p className="lead-text mt-6">Please return to the Sky Window Design &amp; More homepage to continue exploring our custom window treatment services.</p>
        <Link href="/" className="btn-primary mt-8">Return home</Link>
      </div>
    </main>
  );
}
