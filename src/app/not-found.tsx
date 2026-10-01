import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] grid place-items-center bg-[color:var(--surface-warm)] px-6">
      <div className="max-w-xl text-center">
        <p className="text-xs tracking-[0.14em] uppercase font-semibold text-[color:var(--cta-fill)]">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[color:var(--text-primary)]">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 text-base text-[color:var(--text-secondary)]">
          The link may have moved, or the page isn&apos;t published yet. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-[color:var(--cta-fill)]">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Our work</Link>
          <Link href="/service-areas">Service areas</Link>
          <Link href="/request-estimate">Request estimate</Link>
        </div>
      </div>
    </section>
  );
}
