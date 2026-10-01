import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { costGuides, services } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Costs and estimates",
  description: "What affects exterior project cost — unit basis, scope, access, demolition, and allowances. Numerical ranges only where defensible.",
  alternates: { canonical: "/costs" },
};

export default function CostsIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Costs", path: "/costs" }]}
      eyebrow="Costs"
      heading="What affects your exterior project cost."
      intro="Scope, size, access, hidden damage, materials, and permits. We publish numerical ranges only when we have defensible data, and label every range by date and geography."
    >
      {costGuides.length === 0 ? (
        <PreviewState message="Cost guides publish per confirmed service once a defensible dataset is in place." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-10 sm:grid-cols-2">
            {costGuides.map((cg) => {
              const s = services.find((x) => x.slug === cg.service);
              return (
                <Link key={cg.slug} href={`/costs/${cg.service}`} className="group block">
                  <h2 className="text-xl font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--cta-fill)]">
                    {s?.name ?? cg.service} cost guide
                  </h2>
                  <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
                    Unit basis: {cg.unitBasis.replace(/-/g, " ")}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </PageShell>
  );
}
