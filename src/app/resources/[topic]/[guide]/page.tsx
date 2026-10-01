import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema } from "@/lib/schema";
import { resourcePillars, resourceGuides } from "@/content-model/registry";
import { SampleBanner } from "@/components/SampleBanner";

export const dynamicParams = false;

export function generateStaticParams() {
  return resourceGuides.map((g) => ({ topic: g.pillar, guide: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string; guide: string }> }): Promise<Metadata> {
  const { topic, guide } = await params;
  const g = resourceGuides.find((x) => x.pillar === topic && x.slug === guide);
  if (!g) return {};
  return {
    title: g.title,
    description: g.summary,
    alternates: { canonical: `/resources/${topic}/${guide}` },
    robots: g.isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ topic: string; guide: string }> }) {
  const { topic, guide } = await params;
  const g = resourceGuides.find((x) => x.pillar === topic && x.slug === guide);
  if (!g) notFound();
  const pillar = resourcePillars.find((p) => p.slug === topic);

  // MDX soft-load — renders a "pending" fallback if the file doesn't exist
  const { loadMdx } = await import("@/content-model/load-mdx");
  const Body = await loadMdx(`resources/${g.pillar}/${g.slug}`);

  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Resources", path: "/resources" },
        pillar
          ? { name: pillar.topic, path: `/resources/${pillar.slug}` }
          : { name: g.pillar, path: `/resources/${g.pillar}` },
        { name: g.title, path: `/resources/${g.pillar}/${g.slug}` },
      ]}
      eyebrow="Guide"
      heading={g.title}
      intro={g.summary}
    >
      {g.isSample && <SampleBanner />}
      <JsonLd
        data={articleSchema({
          headline: g.title,
          description: g.summary,
          slug: `/resources/${g.pillar}/${g.slug}`,
          datePublished: g.datePublished,
          dateModified: g.dateModified,
          authorName: g.reviewer,
        })}
      />
      <section className="bg-[color:var(--surface-paper)]">
        <article className="mx-auto max-w-3xl px-6 py-16 prose">
          <Body />
          <hr />
          <p className="text-xs text-[color:var(--text-secondary)]">
            Reviewed by {g.reviewer}. Last updated {(g.dateModified ?? g.datePublished).slice(0, 10)}.
          </p>
        </article>
      </section>
    </PageShell>
  );
}
