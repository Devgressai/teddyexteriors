import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { cities, services, projects } from "@/content-model/registry";
import { EstimateSection } from "@/components/exterior";
import { get } from "@/lib/business";
import { SampleBanner } from "@/components/SampleBanner";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ state: c.state === "WA" ? "washington" : "oregon", city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const c = cities.find((x) => x.slug === city && (x.state === "WA" ? "washington" : "oregon") === state);
  if (!c) return {};
  const title = `Siding, Windows & Exterior Services in ${c.name}, ${c.state}`;
  const description = `Serving ${c.name} and surrounding ${c.counties.join(" / ")} County communities with siding replacement, window replacement, exterior painting, trim, gutters, and envelope remediation.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${state}/${city}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/service-areas/${state}/${city}`,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: c.isSample ? { index: false, follow: false } : undefined,
  };
}

export default async function CityHub({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const c = cities.find((x) => x.slug === city && (x.state === "WA" ? "washington" : "oregon") === state);
  if (!c) notFound();
  const localServices = services.filter((s) => c.servicesOffered.includes(s.slug));
  const localProjects = projects.filter((p) => p.city === c.slug);
  const phone = get<string>("contact.phone") ?? undefined;

  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Service areas", path: "/service-areas" },
        { name: c.state === "WA" ? "Washington" : "Oregon", path: `/service-areas/${state}` },
        { name: c.name, path: `/service-areas/${state}/${city}` },
      ]}
      eyebrow={`Serving ${c.name}, ${c.state}`}
      heading={`Siding and exterior renovation in ${c.name}, ${c.state}.`}
      intro={`We serve ${c.name} and surrounding ${c.counties.join(" / ")} County communities. See the services available locally, nearby project work where available, and the applicable building-department resources.`}
    >
      {c.isSample && <SampleBanner note={c.sampleNote} />}
      {/* Single business @id across city pages — brief §12 critical invariant. */}
      <JsonLd
        data={serviceSchema({
          name: `Exterior services in ${c.name}, ${c.state}`,
          description: `Residential siding and exterior renovation serving ${c.name}, ${c.state}.`,
          slug: `/service-areas/${state}/${city}`,
          areaServed: [c.name],
        })}
      />
      {c.operatingCoverage !== "full" && c.partialCoverageNote && (
        <section className="bg-amber-50 border-y border-amber-200">
          <div className="mx-auto max-w-5xl px-6 py-5 text-sm text-amber-900">
            <strong className="font-semibold">Coverage note:</strong> {c.partialCoverageNote}
          </div>
        </section>
      )}
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-5xl px-6 py-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">Services available in {c.name}</h2>
            {localServices.length === 0 ? (
              <p className="mt-3 text-sm text-[color:var(--ink-secondary)]">
                Service pages for {c.name} publish once the local coverage matrix is confirmed.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {localServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/service-areas/${state}/${city}/${s.slug}`}
                      className="text-base text-[color:var(--ink-primary)] hover:text-[color:var(--brand-cta)]"
                    >
                      {s.name} in {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">Permitting</h2>
            <p className="mt-3 text-sm text-[color:var(--ink-secondary)]">
              <a href={c.jurisdiction.buildingDeptUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {c.jurisdiction.buildingDeptName}
              </a>
              . {c.jurisdiction.permitScopeNote}
            </p>
            {c.localConstraints && c.localConstraints.length > 0 && (
              <>
                <h3 className="mt-6 text-sm font-semibold text-[color:var(--ink-primary)]">Local considerations</h3>
                <ul className="mt-2 text-sm text-[color:var(--ink-secondary)] list-disc pl-5 space-y-1">
                  {c.localConstraints.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
      {localProjects.length > 0 && (
        <section className="bg-[color:var(--surface-warm)]">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">Projects in or near {c.name}</h2>
            <ul className="mt-4 space-y-2">
              {localProjects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-base text-[color:var(--ink-primary)] hover:text-[color:var(--brand-cta)]"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <EstimateSection
        heading={`Request an estimate for your ${c.name} project.`}
        supporting="Tell us what you're considering. We'll follow up to discuss scope and the estimate process."
        cityPrefill={`${c.name}, ${c.state}`}
        phone={phone}
      />
    </PageShell>
  );
}
