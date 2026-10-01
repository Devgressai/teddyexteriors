import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { comparisons } from "@/content-model/registry";
import { SampleBanner } from "@/components/SampleBanner";

export const dynamicParams = false;
export function generateStaticParams() {
  return comparisons.map((c) => ({ comparison: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ comparison: string }> }): Promise<Metadata> {
  const { comparison } = await params;
  const c = comparisons.find((x) => x.slug === comparison);
  if (!c) return {};
  return {
    title: c.topic,
    description: c.summary,
    alternates: { canonical: `/compare/${c.slug}` },
    robots: c.isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function ComparisonPage({ params }: { params: Promise<{ comparison: string }> }) {
  const { comparison } = await params;
  const c = comparisons.find((x) => x.slug === comparison);
  if (!c) notFound();
  const { loadMdx } = await import("@/content-model/load-mdx");
  const Body = await loadMdx(`compare/${c.slug}`);
  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Compare", path: "/compare" },
        { name: c.topic, path: `/compare/${c.slug}` },
      ]}
      eyebrow="Comparison"
      heading={c.topic}
      intro={c.summary}
    >
      {c.isSample && <SampleBanner />}
      <section className="bg-[color:var(--surface-paper)]">
        <article className="mx-auto max-w-3xl px-6 py-16 prose">
          <Body />
        </article>
      </section>
    </PageShell>
  );
}
