import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { resourcePillars, resourceGuides } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Resources — Exterior Decision Guides for PNW Homeowners",
  description:
    "Pacific Northwest exterior guides: repair vs replacement, material comparisons, rain and moisture management, cost drivers, and how to compare contractor proposals.",
  alternates: { canonical: "/resources" },
  openGraph: {
    type: "article",
    title: "Resources — Exterior Decision Guides for PNW Homeowners",
    description:
      "Pacific Northwest exterior decision guides written for homeowners making real decisions.",
    url: "/resources",
  },
};

export default function ResourcesIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }]}
      eyebrow="Resources"
      heading="Guides for the decisions you'll make."
      intro="Repair vs replacement, material selection, moisture management, cost drivers, and how to compare proposals — written for homeowners making real decisions, not for keyword density."
    >
      {resourcePillars.length === 0 ? (
        <PreviewState message="Pillar guides publish once reviewed." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]" aria-label="Guide pillars">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <ul className="grid gap-10 lg:grid-cols-2">
              {resourcePillars.map((pillar) => {
                const guides = resourceGuides.filter((g) => g.pillar === pillar.slug);
                return (
                  <li key={pillar.slug}>
                    <Link
                      href={`/resources/${pillar.slug}`}
                      className="group block rounded-sm border border-[color:var(--border-subtle)] p-7 lg:p-8 hover:border-[color:var(--brand-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-cta)] transition-colors h-full"
                    >
                      <p className="eyebrow">{guides.length} {guides.length === 1 ? "guide" : "guides"}</p>
                      <h2 className="mt-3 editorial-h3 text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                        {pillar.topic}
                      </h2>
                      <p className="mt-3 text-[0.9rem] text-[color:var(--ink-secondary)] leading-relaxed">
                        {pillar.scope}
                      </p>
                      {pillar.decisionAreas.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.78rem] text-[color:var(--ink-tertiary)]">
                          {pillar.decisionAreas.slice(0, 5).map((area, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="h-1 w-1 rounded-full bg-[color:var(--brand-secondary)]" aria-hidden="true" />
                              {area}
                            </li>
                          ))}
                        </ul>
                      )}
                      <span className="mt-6 inline-flex items-center text-[0.85rem] font-semibold text-[color:var(--brand-cta)]">
                        Explore guides
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
