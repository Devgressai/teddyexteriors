import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, materials, resourceGuides, projects } from "@/content-model/registry";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { EstimateSection, MaterialCompare, type MaterialCompareEntry } from "@/components/exterior";
import { get } from "@/lib/business";
import { SampleBanner } from "@/components/SampleBanner";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const s = services.find((x) => x.slug === service);
  if (!s) return {};
  return {
    title: s.name,
    description: s.summary,
    alternates: { canonical: `/services/${s.slug}` },
    robots: s.isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = services.find((x) => x.slug === service);
  if (!s) notFound();

  const matched = materials.filter((m) => s.materials.includes(m.slug));
  const matEntries: MaterialCompareEntry[] = matched
    .map((m) => ({
      slug: m.slug,
      product: m.product,
      look: "", // populated per-material in registry metadata
      maintenance: "",
      fit: "",
      image: { src: "", alt: m.product, width: 1200, height: 900, rights: "owned" as const },
      href: `/materials/${m.slug}`,
    }))
    .filter((m) => m.image.src);

  const guides = resourceGuides.filter((g) => s.relatedGuides.includes(g.slug));
  const projectRefs = projects.filter((p) => p.services.includes(s.slug));
  const phone = get<string>("contact.phone") ?? undefined;

  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: s.name, path: `/services/${s.slug}` },
      ]}
      eyebrow="Service"
      heading={s.name}
      intro={s.summary}
    >
      {s.isSample && <SampleBanner note={s.sampleNote} />}
      <JsonLd
        data={serviceSchema({
          name: s.name,
          description: s.summary,
          slug: `/services/${s.slug}`,
        })}
      />
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-5xl px-6 py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">What's included</h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--text-primary)] list-disc pl-5">
              {s.scope.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          {s.exclusions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Not included</h2>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--text-secondary)] list-disc pl-5">
                {s.exclusions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      {matEntries.length > 0 && (
        <MaterialCompare heading="Material options" entries={matEntries} compareHref="/compare/siding-materials" />
      )}
      {(guides.length > 0 || projectRefs.length > 0) && (
        <section className="bg-[color:var(--surface-warm)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-12 lg:grid-cols-2">
            {guides.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Guides</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <a className="text-[color:var(--text-primary)] hover:text-[color:var(--cta-fill)]" href={`/resources/${g.pillar}/${g.slug}`}>
                        {g.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {projectRefs.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Related projects</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {projectRefs.map((p) => (
                    <li key={p.slug}>
                      <a className="text-[color:var(--text-primary)] hover:text-[color:var(--cta-fill)]" href={`/projects/${p.slug}`}>
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
      <EstimateSection
        heading={`Request an estimate for ${s.name.toLowerCase()}.`}
        supporting="Tell us about your home and the scope you're considering. We'll follow up to discuss next steps."
        servicePrefill={s.name}
        phone={phone}
      />
    </PageShell>
  );
}
