import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { cities, services } from "@/content-model/registry";
import { EstimateSection } from "@/components/exterior";
import { get } from "@/lib/business";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ state: "washington" }, { state: "oregon" }];
}

const STATE_META: Record<string, { label: string; code: "WA" | "OR"; blurb: string; intro: string }> = {
  washington: {
    label: "Washington",
    code: "WA",
    blurb: "Southwest Washington — Clark County communities surrounding Vancouver.",
    intro:
      "Our Vancouver office handles exterior remodeling across Clark County — written scope, in-house crews, envelope-first construction. We pull permits with the appropriate city or Clark County jurisdiction.",
  },
  oregon: {
    label: "Oregon",
    code: "OR",
    blurb:
      "Portland metro — Multnomah, Washington, and Clackamas Counties, with a Portland satellite by appointment.",
    intro:
      "Our Portland satellite handles projects across the Multnomah / Washington / Clackamas tri-county metro. Permit intake routes through the jurisdiction your parcel sits in; Portland projects go through BDS.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const meta = STATE_META[state];
  if (!meta) return {};
  const title = `${meta.label} Exterior Remodeling Service Areas`;
  return {
    title,
    description: meta.blurb,
    alternates: { canonical: `/service-areas/${state}` },
    openGraph: { type: "article", title, description: meta.blurb, url: `/service-areas/${state}` },
    twitter: { card: "summary_large_image", title, description: meta.blurb },
  };
}

export default async function StateHub({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const meta = STATE_META[state];
  if (!meta) notFound();
  const list = cities.filter((c) => c.state === meta.code);
  const serviceSlugs = services.slice(0, 6).map((s) => s.slug);
  const phone = get<string>("contact.phone") ?? undefined;

  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Service areas", path: "/service-areas" },
        { name: meta.label, path: `/service-areas/${state}` },
      ]}
      eyebrow="Service areas"
      heading={`${meta.label} exterior remodeling.`}
      intro={meta.intro}
    >
      <section className="bg-[color:var(--surface-paper)]" aria-label={`${meta.label} cities we serve`}>
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p className="eyebrow">Communities we serve</p>
              <h2 className="mt-3 editorial-h2 max-w-[24ch]">{list.length} {meta.label} communities.</h2>
            </div>
            <p className="text-[0.85rem] text-[color:var(--ink-secondary)] max-w-[42ch]">
              Not sure if your address is covered? Send us your city or ZIP and we&apos;ll confirm before we schedule a visit.
            </p>
          </div>
          {list.length === 0 ? (
            <p className="mt-10 text-sm text-[color:var(--ink-secondary)]">
              Approved cities publish here once the territory is confirmed.
            </p>
          ) : (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-areas/${state}/${c.slug}`}
                    className="group block h-full rounded-sm border border-[color:var(--border-subtle)] p-5 hover:border-[color:var(--brand-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-cta)] transition-colors"
                  >
                    <span className="block text-[1rem] font-semibold text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                      {c.name}
                    </span>
                    {c.counties.length > 0 && (
                      <span className="mt-1 block text-[0.78rem] text-[color:var(--ink-tertiary)]">
                        {c.counties.join(" / ")} County
                      </span>
                    )}
                    <span className="mt-3 inline-flex items-center text-[0.78rem] font-semibold text-[color:var(--brand-cta)]">
                      {c.servicesOffered.length} services available
                      <svg viewBox="0 0 20 20" className="ml-1.5 h-3 w-3 transition-transform group-hover:translate-x-0.5">
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

      {serviceSlugs.length > 0 && (
        <section
          className="bg-[color:var(--surface-stone)] border-y border-[color:var(--border-subtle)]"
          aria-label={`Services available throughout ${meta.label}`}
        >
          <div className="mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="eyebrow">What we do across {meta.label}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.9rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)]"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <EstimateSection
        heading={`Request an estimate for your ${meta.label} project.`}
        supporting="Tell us what you're considering and where. We'll confirm coverage and lay out the next step."
        phone={phone}
      />
    </PageShell>
  );
}
