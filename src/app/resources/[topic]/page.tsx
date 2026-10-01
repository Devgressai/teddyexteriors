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
  return { title: p.topic, description: p.scope, alternates: { canonical: `/resources/${p.slug}` } };
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
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {guides.length === 0 ? (
            <p className="text-sm text-[color:var(--text-secondary)]">Guides publish as they are reviewed by {p.reviewer}.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/resources/${p.slug}/${g.slug}`} className="group block">
                    <h2 className="text-lg font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--cta-fill)]">
                      {g.title}
                    </h2>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{g.summary}</p>
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
