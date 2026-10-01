import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { resourcePillars } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Resources",
  description: "Decision guides for Pacific Northwest exterior projects — repair vs replacement, materials, rain and moisture management, costs, and hiring.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }]}
      eyebrow="Resources"
      heading="Guides for the decisions you'll make."
      intro="Repair vs replacement, material selection, moisture management, cost drivers, and how to compare proposals — written for homeowners making real decisions."
    >
      {resourcePillars.length === 0 ? (
        <PreviewState message="Pillar guides publish once reviewed." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-10 sm:grid-cols-2">
            {resourcePillars.map((p) => (
              <Link key={p.slug} href={`/resources/${p.slug}`} className="group block">
                <h2 className="text-xl font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--cta-fill)]">
                  {p.topic}
                </h2>
                <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{p.scope}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
