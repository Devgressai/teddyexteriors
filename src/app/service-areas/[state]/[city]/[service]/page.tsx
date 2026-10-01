import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";
import { cities, services, projects } from "@/content-model/registry";
import { EstimateSection } from "@/components/exterior";
import { get } from "@/lib/business";
import { SampleBanner } from "@/components/SampleBanner";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { state: string; city: string; service: string }[] = [];
  for (const c of cities) {
    const state = c.state === "WA" ? "washington" : "oregon";
    for (const serviceSlug of c.servicesOffered) {
      // Only emit cells confirmed in both the city record AND the service registry
      if (services.find((s) => s.slug === serviceSlug)) {
        params.push({ state, city: c.slug, service: serviceSlug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string; service: string }>;
}): Promise<Metadata> {
  const { state, city, service } = await params;
  const c = cities.find((x) => x.slug === city);
  const s = services.find((x) => x.slug === service);
  if (!c || !s) return {};
  const title = `${s.name} in ${c.name}, ${c.state}`;
  const description = `${s.summary} Serving ${c.name} and the ${c.counties.join(" / ")} County area with written scope, in-house crews, and envelope-first construction.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${state}/${city}/${service}` },
    openGraph: { type: "article", title, description, url: `/service-areas/${state}/${city}/${service}` },
    twitter: { card: "summary_large_image", title, description },
    robots: (c.isSample || s.isSample) ? { index: false, follow: false } : undefined,
  };
}

export default async function CityServicePage({
  params,
}: {
  params: Promise<{ state: string; city: string; service: string }>;
}) {
  const { state, city, service } = await params;
  const c = cities.find((x) => x.slug === city);
  const s = services.find((x) => x.slug === service);
  if (!c || !s) notFound();
  if (!c.servicesOffered.includes(s.slug)) notFound();
  const matchedProjects = projects.filter((p) => p.city === c.slug && p.services.includes(s.slug));
  const nearbyProjects = projects.filter((p) => p.services.includes(s.slug) && p.city !== c.slug).slice(0, 3);
  const phone = get<string>("contact.phone") ?? undefined;

  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Service areas", path: "/service-areas" },
        { name: c.state === "WA" ? "Washington" : "Oregon", path: `/service-areas/${state}` },
        { name: c.name, path: `/service-areas/${state}/${city}` },
        { name: s.name, path: `/service-areas/${state}/${city}/${service}` },
      ]}
      eyebrow={`${c.name}, ${c.state} · ${s.name}`}
      heading={`${s.name} in ${c.name}, ${c.state}.`}
      intro={s.summary}
    >
      {(c.isSample || s.isSample) && (
        <SampleBanner
          note={
            c.isSample
              ? "Sample city/service combination for the design gate. Not published until the territory and service list are confirmed."
              : s.sampleNote
          }
        />
      )}
      <JsonLd
        data={serviceSchema({
          name: `${s.name} in ${c.name}, ${c.state}`,
          description: s.summary,
          slug: `/service-areas/${state}/${city}/${service}`,
          areaServed: [c.name],
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
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">Permitting in {c.name}</h2>
            <p className="mt-3 text-sm text-[color:var(--ink-secondary)]">
              <a href={c.jurisdiction.buildingDeptUrl} className="underline" target="_blank" rel="noopener noreferrer">
                {c.jurisdiction.buildingDeptName}
              </a>
              . {c.jurisdiction.permitScopeNote}
            </p>
          </div>
        </div>
      </section>
      {(matchedProjects.length > 0 || nearbyProjects.length > 0) && (
        <section className="bg-[color:var(--surface-warm)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-10 lg:grid-cols-2">
            {matchedProjects.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">{s.name} projects in {c.name}</h2>
                <ul className="mt-4 space-y-2">
                  {matchedProjects.map((p) => (
                    <li key={p.slug}>
                      <a className="text-base text-[color:var(--ink-primary)] hover:text-[color:var(--brand-cta)]" href={`/projects/${p.slug}`}>
                        {p.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {nearbyProjects.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">Nearby projects</h2>
                <ul className="mt-4 space-y-2">
                  {nearbyProjects.map((p) => (
                    <li key={p.slug}>
                      <a className="text-base text-[color:var(--ink-primary)] hover:text-[color:var(--brand-cta)]" href={`/projects/${p.slug}`}>
                        <span>{p.title}</span>{" "}
                        <span className="text-xs text-[color:var(--ink-secondary)]">
                          — labeled by actual city, not {c.name}
                        </span>
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
        heading={`Request an estimate for ${s.name.toLowerCase()} in ${c.name}.`}
        supporting="Tell us what you're considering and where your home is located."
        servicePrefill={s.name}
        cityPrefill={`${c.name}, ${c.state}`}
        phone={phone}
      />
    </PageShell>
  );
}
