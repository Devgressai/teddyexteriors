import type { Metadata } from "next";
import { PageShell, PreviewState } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Warranty — 5-Year Workmanship + Separate Manufacturer Coverage",
  description:
    "Teddy Exteriors workmanship warranty explained: a 5-year written warranty on the installation we perform, separate from manufacturer warranties on the siding and windows themselves.",
  alternates: { canonical: "/warranty" },
  openGraph: {
    type: "article",
    title: "Warranty — 5-Year Workmanship + Separate Manufacturer Coverage",
    description: "Workmanship vs manufacturer warranty, scope, exclusions.",
    url: "/warranty",
  },
};

export default function WarrantyPage() {
  const scope = get<string>("warranty.workmanshipScope");
  const duration = get<string>("warranty.workmanshipDuration");
  const exclusions = get<string>("warranty.exclusions");
  const mfrSeparate = get<boolean>("warranty.manufacturerSeparate");
  const resolved = scope && duration;

  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Warranty", path: "/warranty" }]}
      eyebrow="Warranty"
      heading="Workmanship and manufacturer warranties — explained separately."
      intro="Workmanship covers how the installation was performed. Product warranties cover the materials themselves. The two run on different clocks and claim procedures."
    >
      {!resolved ? (
        <PreviewState message="Warranty terms publish once confirmed by the owner." />
      ) : (
        <>
          <section className="bg-[color:var(--surface-paper)]" aria-label="Workmanship warranty">
            <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow">Workmanship warranty</p>
                <h2 className="mt-3 editorial-h2 max-w-[22ch]">What our hands warrant.</h2>
                <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[52ch]">
                  {scope}
                </p>
                {exclusions && (
                  <div className="mt-7">
                    <p className="text-[0.78rem] uppercase tracking-wider font-semibold text-[color:var(--ink-tertiary)]">
                      Exclusions
                    </p>
                    <p className="mt-2 text-[0.9rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[52ch]">
                      {exclusions}
                    </p>
                  </div>
                )}
              </div>
              <aside className="lg:col-span-5">
                <div className="rounded-sm border-l-2 border-[color:var(--brand-cta)] bg-[color:var(--surface-warm)] p-7">
                  <p className="eyebrow">Duration</p>
                  <p className="mt-3 stat text-[color:var(--brand-primary)]">{duration}</p>
                  <p className="mt-5 text-[0.85rem] text-[color:var(--ink-secondary)] leading-relaxed">
                    Starts the day the project passes finish walk. Transferable with the home when documented at
                    time of sale.
                  </p>
                </div>
              </aside>
            </div>
          </section>
          {mfrSeparate && (
            <section className="bg-[color:var(--surface-stone)]" aria-label="Manufacturer warranties">
              <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
                <p className="eyebrow">Manufacturer warranties</p>
                <h2 className="mt-3 editorial-h2 max-w-[26ch]">The products themselves carry their own coverage.</h2>
                <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[62ch]">
                  Siding, windows, and other installed products carry their own manufacturer warranties, with their
                  own terms, durations, and claim procedures. We provide the product warranty documentation and
                  registration information at project close so you have the paperwork ready when you need it.
                </p>
                <p className="mt-4 text-[0.85rem] text-[color:var(--ink-tertiary)] max-w-[62ch]">
                  Manufacturer warranties often require specific installation practices to remain in force. Our scope
                  defaults to those practices; where you request a deviation, we document it in writing before we
                  install so there&apos;s no later surprise on the warranty side.
                </p>
              </div>
            </section>
          )}
        </>
      )}
    </PageShell>
  );
}
