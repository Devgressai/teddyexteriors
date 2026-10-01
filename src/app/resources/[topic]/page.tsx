import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { resourcePillars, resourceGuides } from "@/content-model/registry";

export const dynamicParams = false;
export function generateStaticParams() {
  return resourcePillars.map((p) => ({ topic: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  const p = resourcePillars.find((x) => x.slug === topic);
  if (!p) return {};
  const title = `${p.topic} — Pacific Northwest Exterior Guides`;
  const description = p.scope;
  return {
    title,
    description,
    alternates: { canonical: `/resources/${p.slug}` },
    openGraph: { type: "article", title, description, url: `/resources/${p.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TopicHub({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const p = resourcePillars.find((x) => x.slug === topic);
  if (!p) notFound();
  const guides = resourceGuides.filter((g) => g.pillar === p.slug);
  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
        { name: p.topic, path: `/resources/${p.slug}` },
      ]}
      eyebrow="Resource pillar"
      heading={p.topic}
      intro={p.scope}
    >
      <section className="bg-[color:var(--surface-paper)]" aria-label={`${p.topic} guides`}>
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          {p.decisionAreas.length > 0 && (
            <div className="mb-10 border-l-2 border-[color:var(--brand-cta)] pl-5 max-w-[48ch]">
              <p className="eyebrow">What this pillar covers</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.85rem] text-[color:var(--ink-secondary)]">
                {p.decisionAreas.map((area, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-[color:var(--brand-secondary)]" aria-hidden="true" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {guides.length === 0 ? (
            <p className="text-sm text-[color:var(--ink-secondary)]">
              Guides publish as they are reviewed by {p.reviewer}.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/resources/${p.slug}/${g.slug}`}
                    className="group block h-full rounded-sm border border-[color:var(--border-subtle)] p-6 hover:border-[color:var(--brand-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-cta)] transition-colors"
                  >
                    <p className="eyebrow">Guide</p>
                    <h2 className="mt-3 editorial-h3 text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                      {g.title}
                    </h2>
                    <p className="mt-3 text-[0.9rem] text-[color:var(--ink-secondary)] leading-relaxed">
                      {g.summary}
                    </p>
                    <span className="mt-5 inline-flex items-center text-[0.8rem] font-semibold text-[color:var(--brand-cta)]">
                      Read guide
                      <svg viewBox="0 0 20 20" className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                        <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      </svg>
                    </span>
                    <p className="mt-5 pt-4 border-t border-[color:var(--border-subtle)] text-[0.72rem] text-[color:var(--ink-tertiary)]">
                      Reviewed by {g.reviewer}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageShell>
  );
}
