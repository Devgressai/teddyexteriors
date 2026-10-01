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
  const title = `${s.name} in Vancouver, WA and Portland, OR`;
  const description = `${s.summary} Serving Vancouver, Washington; Portland, Oregon; and the surrounding Pacific Northwest region.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/services/${s.slug}`,
    },
    twitter: { card: "summary_large_image", title, description },
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

  const JDI_CDN = "https://www.jdiconstruction.co";
  const matImages: Record<string, string> = {
    "fiber-cement": `${JDI_CDN}/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp`,
    "engineered-wood": `${JDI_CDN}/ctf/1ywW6ufcKBIaBTL3CnzrQg/03-exterior-front-side-750.webp`,
    cedar: `${JDI_CDN}/ctf/33C8Uu510N5y2u5WoFGyj9/01-exterior-front-750.webp`,
    vinyl: `${JDI_CDN}/ctf/6kM5u8g5lU78Y1vIebWMEz/01-exterior-front-750.webp`,
  };
  const matched = materials.filter((m) => s.materials.includes(m.slug));
  const matEntries: MaterialCompareEntry[] = matched.map((m) => ({
    slug: m.slug,
    product: m.product,
    look:
      m.installationNotes?.split(". ")[0] ?? `${m.product} overview`,
    maintenance:
      m.installationNotes?.split(". ").slice(1, 2).join(". ") ?? "See product guide",
    fit: `${m.manufacturer}`,
    image: {
      src: matImages[m.slug] ?? "",
      alt: `${m.product} on a Northwest exterior`,
      width: 1200,
      height: 900,
      rights: "owned" as const,
    },
    href: `/materials/${m.slug}`,
  }));

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
            <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">What's included</h2>
            <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink-primary)] list-disc pl-5">
              {s.scope.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          {s.exclusions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">Not included</h2>
              <ul className="mt-4 space-y-2 text-sm text-[color:var(--ink-secondary)] list-disc pl-5">
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
                <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">Guides</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <a className="text-[color:var(--ink-primary)] hover:text-[color:var(--brand-cta)]" href={`/resources/${g.pillar}/${g.slug}`}>
                        {g.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {projectRefs.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">Related projects</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {projectRefs.map((p) => (
                    <li key={p.slug}>
                      <a className="text-[color:var(--ink-primary)] hover:text-[color:var(--brand-cta)]" href={`/projects/${p.slug}`}>
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
