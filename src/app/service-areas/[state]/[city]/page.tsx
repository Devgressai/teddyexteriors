import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
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
  const nearbyProjects = projects.filter((p) => p.city !== c.slug).slice(0, 2);
  const nearbyCities = cities.filter((o) => o.state === c.state && o.slug !== c.slug).slice(0, 6);
  const phone = get<string>("contact.phone") ?? undefined;

  const serviceDescriptions: Record<string, string> = {
    "siding-replacement": "Tear-off, substrate repair, WRB + flashing, new cladding.",
    "window-replacement": "Pan-flashed window installs with WRB integration.",
    "exterior-painting": "Prep, prime, and paint intact exterior surfaces.",
    "trim-and-gutters": "Fascia, soffit, kickout flashing, gutters, downspouts.",
    "envelope-remediation": "Open, document, correct hidden damage behind siding.",
    "whole-exterior-renovation": "Siding, windows, trim, finishes coordinated.",
  };

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
      intro={`We serve ${c.name} and surrounding ${c.counties.join(" / ")} County communities. Written scope, in-house crews, envelope-first construction.`}
    >
      {c.isSample && <SampleBanner note={c.sampleNote} />}
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

      {/* Services available locally — a proper editorial grid, not a bulleted list */}
      <section className="bg-[color:var(--surface-paper)]" aria-label={`Services available in ${c.name}`}>
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="eyebrow">What we do in {c.name}</p>
              <h2 className="mt-3 editorial-h2 max-w-[22ch]">Services available locally.</h2>
            </div>
            <p className="text-[0.85rem] text-[color:var(--ink-secondary)] max-w-[42ch]">
              Hire for a single scope, or coordinate the whole exterior. Pricing and scheduling confirmed after an on-site walk.
            </p>
          </div>
          {localServices.length === 0 ? (
            <p className="mt-10 text-sm text-[color:var(--ink-secondary)]">
              Service pages for {c.name} publish once the local coverage matrix is confirmed.
            </p>
          ) : (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {localServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/service-areas/${state}/${city}/${s.slug}`}
                    className="group block h-full rounded-sm border border-[color:var(--border-subtle)] p-6 hover:border-[color:var(--brand-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-cta)] transition-colors"
                  >
                    <h3 className="text-[1rem] font-semibold text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                      {s.name} in {c.name}
                    </h3>
                    <p className="mt-2 text-[0.85rem] text-[color:var(--ink-secondary)] leading-relaxed">
                      {serviceDescriptions[s.slug] ?? s.summary.slice(0, 100)}
                    </p>
                    <span className="mt-4 inline-flex items-center text-[0.8rem] font-semibold text-[color:var(--brand-cta)]">
                      View {s.name.toLowerCase()}
                      <svg viewBox="0 0 20 20" className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                        <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Permitting + local considerations */}
      <section className="bg-[color:var(--surface-stone)]" aria-label={`Permitting and local considerations in ${c.name}`}>
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">Permitting</p>
            <h2 className="mt-3 editorial-h2 max-w-[22ch]">The jurisdiction that handles your project.</h2>
            <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed">
              <Link
                href={c.jurisdiction.buildingDeptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[color:var(--ink-emphasis)] underline underline-offset-4 hover:text-[color:var(--brand-cta)]"
              >
                {c.jurisdiction.buildingDeptName}
              </Link>{" "}
              handles permits for projects in {c.name}. {c.jurisdiction.permitScopeNote}
            </p>
            <p className="mt-3 text-[0.78rem] text-[color:var(--ink-tertiary)]">
              We pull permits in the appropriate jurisdiction when the scope requires one.
            </p>
          </div>
          {c.localConstraints && c.localConstraints.length > 0 && (
            <aside className="lg:col-span-6">
              <div className="rounded-sm border-l-2 border-[color:var(--brand-cta)] bg-[color:var(--surface-paper)] p-7 shadow-[0_2px_8px_rgba(18,61,42,0.06)]">
                <p className="eyebrow">Local considerations</p>
                <ul className="mt-5 space-y-4 text-[0.9rem] text-[color:var(--ink-secondary)]">
                  {c.localConstraints.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--brand-cta)]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* Projects in / near this city */}
      {(localProjects.length > 0 || nearbyProjects.length > 0) && (
        <section className="bg-[color:var(--surface-paper)]" aria-label={`Projects in or near ${c.name}`}>
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <p className="eyebrow">Our work</p>
            <h2 className="mt-3 editorial-h2 max-w-[22ch]">
              {localProjects.length > 0
                ? `Documented projects in ${c.name}.`
                : `Documented projects near ${c.name}.`}
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...localProjects, ...nearbyProjects].slice(0, 6).map((p) => {
                const pc = cities.find((cc) => cc.slug === p.city);
                return (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[color:var(--surface-mist)]">
                        {p.photos[0] && (
                          <Image
                            src={p.photos[0].src}
                            alt={p.photos[0].alt}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 48vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        )}
                      </div>
                      <h3 className="mt-4 text-[1rem] font-semibold text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                        {p.title}
                      </h3>
                      {pc && (
                        <p className="mt-1 text-[0.78rem] text-[color:var(--ink-tertiary)]">
                          {pc.name}, {pc.state}
                        </p>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="bg-[color:var(--surface-warm)] border-t border-[color:var(--border-subtle)]" aria-label="Nearby service areas">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="eyebrow">Also serving</p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2 text-[0.95rem]">
              {nearbyCities.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/service-areas/${state}/${o.slug}`}
                    className="text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)]"
                  >
                    {o.name}
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
