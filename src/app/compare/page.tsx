import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { comparisons } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Compare",
  description: "Direct comparisons for exterior buying decisions.",
  alternates: { canonical: "/compare" },
};

export default function CompareIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Compare", path: "/compare" }]}
      eyebrow="Compare"
      heading="Direct comparisons for buying decisions."
      intro="Not every exterior page needs to be a comparison. These are the comparisons homeowners actually face when they're deciding what to install."
    >
      {comparisons.length === 0 ? (
        <PreviewState message="Comparisons publish once reviewed." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-6 sm:grid-cols-2">
            {comparisons.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="group block">
                <h2 className="text-xl font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--cta-fill)]">
                  {c.topic}
                </h2>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{c.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
