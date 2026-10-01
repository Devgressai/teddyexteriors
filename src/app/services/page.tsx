import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { services } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Services",
  description: "Siding, windows, exterior painting, trim, gutters, and complete exterior renovation — serving Vancouver, WA and Portland, OR.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
      eyebrow="Services"
      heading="Exterior work, done with written scope and documented installation."
      intro="Hire for a single service, or coordinate a complete exterior. Each service page explains scope, exclusions, materials, and what the estimate process will cover."
    >
      {services.length === 0 ? (
        <PreviewState message="Service pages publish once the confirmed service list is populated in the content model." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-10 sm:grid-cols-2">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group block">
                <h2 className="text-xl font-semibold text-[color:var(--ink-primary)] group-hover:text-[color:var(--brand-cta)]">
                  {s.name}
                </h2>
                <p className="mt-2 text-sm text-[color:var(--ink-secondary)]">{s.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
