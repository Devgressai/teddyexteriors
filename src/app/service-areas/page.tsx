import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { cities } from "@/content-model/registry";
import { RegionalMap } from "@/components/exterior";

export const metadata: Metadata = {
  title: "Service Areas — Vancouver, WA, Portland, OR and the Pacific Northwest",
  description:
    "We serve Vancouver, Washington, Portland, Oregon, and the surrounding region — Southwest Washington's Clark County and the Portland metro's Multnomah, Washington, and Clackamas Counties.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    type: "article",
    title: "Service Areas — Vancouver, WA, Portland, OR and the Pacific Northwest",
    description:
      "Southwest Washington and Northwest Oregon exterior remodeling service area.",
    url: "/service-areas",
  },
};

export default function ServiceAreasIndex() {
  const wa = cities.filter((c) => c.state === "WA");
  const or = cities.filter((c) => c.state === "OR");
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas" }]}
      eyebrow="Service areas"
      heading="Southwest Washington. Northwest Oregon."
      intro="We serve Vancouver, Portland, and the Clark / Multnomah / Washington / Clackamas County communities around them. Pick a state hub, or send us your city or ZIP."
    >
      {cities.length === 0 ? (
        <PreviewState message="Service-area pages publish once the owner-confirmed city list is populated." />
      ) : (
        <>
          <section className="bg-[color:var(--surface-paper)]" aria-label="Regional map">
            <div className="mx-auto max-w-6xl px-6 py-14">
              <div className="rounded-sm border border-[color:var(--border-subtle)] p-6 lg:p-8">
                <RegionalMap />
              </div>
            </div>
          </section>
          <section className="bg-[color:var(--surface-warm)]" aria-label="Cities by state">
            <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-2">
              {[
                { label: "Washington", slug: "washington", list: wa, note: "Clark County communities around Vancouver." },
                { label: "Oregon", slug: "oregon", list: or, note: "Multnomah, Washington, and Clackamas County communities." },
              ].map((group) => (
                <div key={group.slug}>
                  <p className="eyebrow">{group.label}</p>
                  <h2 className="mt-3 editorial-h2 max-w-[20ch]">{group.list.length} communities we serve.</h2>
                  <p className="mt-4 text-[0.9rem] text-[color:var(--ink-secondary)] max-w-[42ch]">
                    {group.note}
                  </p>
                  <ul className="mt-7 grid grid-cols-2 gap-x-5 gap-y-3">
                    {group.list.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/service-areas/${group.slug}/${c.slug}`}
                          className="group text-[0.95rem] text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)] inline-flex items-center gap-2"
                        >
                          {c.name}
                          <span className="text-[color:var(--ink-tertiary)] text-[0.72rem]">
                            {c.counties.length === 1 ? `${c.counties[0]} Co.` : ""}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/service-areas/${group.slug}`}
                    className="mt-8 group inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[color:var(--brand-cta)]"
                  >
                    All {group.label} service areas
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                      <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
