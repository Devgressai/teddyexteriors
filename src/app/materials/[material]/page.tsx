import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { materials } from "@/content-model/registry";
import { PageShell } from "@/components/PageShell";
import { SampleBanner } from "@/components/SampleBanner";

export const dynamicParams = false;
export function generateStaticParams() {
  return materials.map((m) => ({ material: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ material: string }> }): Promise<Metadata> {
  const { material } = await params;
  const m = materials.find((x) => x.slug === material);
  if (!m) return {};
  return {
    title: m.product,
    alternates: { canonical: `/materials/${m.slug}` },
    robots: m.isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function MaterialPage({ params }: { params: Promise<{ material: string }> }) {
  const { material } = await params;
  const m = materials.find((x) => x.slug === material);
  if (!m) notFound();
  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Materials", path: "/materials" },
        { name: m.product, path: `/materials/${m.slug}` },
      ]}
      eyebrow="Material"
      heading={m.product}
      intro={`${m.manufacturer} · ${m.category.replace("-", " ")}`}
    >
      {m.isSample && <SampleBanner note={m.sampleNote} />}
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-3xl px-6 py-16 prose">
          {m.installationNotes && <p>{m.installationNotes}</p>}
          {m.manufacturerDocsUrl && (
            <p>
              <a href={m.manufacturerDocsUrl} target="_blank" rel="noopener noreferrer">
                Manufacturer installation documentation
              </a>
            </p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
