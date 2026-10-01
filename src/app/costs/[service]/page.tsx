import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { costGuides, services } from "@/content-model/registry";
import { SampleBanner } from "@/components/SampleBanner";

export const dynamicParams = false;
export function generateStaticParams() {
  return costGuides.map((cg) => ({ service: cg.service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const cg = costGuides.find((x) => x.service === service);
  const s = services.find((x) => x.slug === service);
  if (!cg || !s) return {};
  return {
    title: `${s.name} cost guide`,
    description: `What drives cost on a ${s.name.toLowerCase()} project.`,
    alternates: { canonical: `/costs/${service}` },
    robots: cg.isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function CostGuidePage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const cg = costGuides.find((x) => x.service === service);
  const s = services.find((x) => x.slug === service);
  if (!cg || !s) notFound();
  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Costs", path: "/costs" },
        { name: s.name, path: `/costs/${s.slug}` },
      ]}
      eyebrow="Cost guide"
      heading={`${s.name} cost guide`}
      intro={`Unit basis: ${cg.unitBasis.replace(/-/g, " ")}. Last reviewed: ${cg.rangeDate ?? "pending data"}.`}
    >
      {cg.isSample && <SampleBanner />}
      <section className="bg-[color:var(--surface-paper)]" aria-label={`${s.name} cost guide`}>
        <div className="mx-auto max-w-3xl px-6 py-16 prose">
          <h2>Scope assumed in these ranges</h2>
          <ul>{cg.scopeAssumptions.map((a, i) => <li key={i}>{a}</li>)}</ul>
          <h2>Cost drivers</h2>
          <ul>
            {cg.drivers.map((d, i) => (
              <li key={i}>
                <strong>{d.name}:</strong> {d.description}
              </li>
            ))}
          </ul>
          {cg.rangeLow && cg.rangeHigh ? (
            <>
              <h2>Range</h2>
              <p>${cg.rangeLow.toLocaleString()} – ${cg.rangeHigh.toLocaleString()} per {cg.unitBasis.replace(/-/g, " ")}. {cg.rangeNotes}</p>
            </>
          ) : (
            <>
              <h2>Why we don't publish a number here</h2>
              <p>{cg.rangeNotes ?? "A defensible range for this scope in this geography is pending more completed-project data. We can walk you through the drivers above during an estimate."}</p>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
