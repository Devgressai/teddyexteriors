import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { costGuides, services } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Exterior Project Costs — Drivers, Ranges, and Honest Pricing",
  description:
    "What affects exterior project cost — scope, size, access, substrate condition, materials, and permits. Numerical ranges published only where defensibly sourced for Vancouver, WA and Portland, OR.",
  alternates: { canonical: "/costs" },
  openGraph: {
    type: "article",
    title: "Exterior Project Costs — Drivers, Ranges, and Honest Pricing",
    description: "Cost drivers for siding, windows, and exterior projects in the Pacific Northwest.",
    url: "/costs",
  },
};

export default function CostsIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Costs", path: "/costs" }]}
      eyebrow="Costs"
      heading="What affects your exterior project cost."
      intro="Scope, size, access, hidden damage, materials, and permits. We publish numerical ranges only when we have defensible data, and label every range by date and geography. No fabricated city-by-city pricing."
    >
      {costGuides.length === 0 ? (
        <PreviewState message="Cost guides publish per confirmed service once a defensible dataset is in place." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]" aria-label="Cost guides by service">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {costGuides.map((cg) => {
                const s = services.find((x) => x.slug === cg.service);
                return (
                  <li key={cg.slug}>
                    <Link
                      href={`/costs/${cg.service}`}
                      className="group block h-full rounded-sm border border-[color:var(--border-subtle)] p-7 hover:border-[color:var(--brand-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-cta)] transition-colors"
                    >
                      <p className="eyebrow">Cost guide</p>
                      <h2 className="mt-3 editorial-h3 text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                        {s?.name ?? cg.service}
                      </h2>
                      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.78rem]">
                        <div className="flex items-center gap-1.5">
                          <dt className="text-[color:var(--ink-tertiary)] uppercase tracking-wider">Basis</dt>
                          <dd className="text-[color:var(--ink-secondary)] font-semibold">
                            {cg.unitBasis.replace(/-/g, " ")}
                          </dd>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <dt className="text-[color:var(--ink-tertiary)] uppercase tracking-wider">Drivers</dt>
                          <dd className="text-[color:var(--ink-secondary)] font-semibold">{cg.drivers.length}</dd>
                        </div>
                      </dl>
                      <p className="mt-5 text-[0.85rem] text-[color:var(--ink-secondary)] leading-relaxed line-clamp-3">
                        {cg.scopeAssumptions.join(" · ")}
                      </p>
                      <span className="mt-5 inline-flex items-center text-[0.8rem] font-semibold text-[color:var(--brand-cta)]">
                        View cost drivers
                        <svg viewBox="0 0 20 20" className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                          <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  );
}
