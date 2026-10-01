import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { EstimateSection } from "@/components/exterior";
import { display, get } from "@/lib/business";

export const metadata: Metadata = {
  title: "About Teddy Exteriors — Who We Are and How We Work",
  description:
    "Teddy Exteriors is the exterior arm of JDI Construction — an 18-year Pacific Northwest remodeler based in Vancouver, Washington. Written scope, in-house crews, envelope-first construction.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "article",
    title: "About Teddy Exteriors — Who We Are and How We Work",
    description:
      "A Vancouver, WA / Portland, OR exterior contractor with 18 years of in-house crews.",
    url: "/about",
  },
};

export default function AboutPage() {
  const brand = display<string>("identity.brandName", "Teddy Exteriors");
  const legal = get<string>("identity.legalEntity");
  const dba = get<string>("identity.dba");
  const phone = get<string>("contact.phone") ?? undefined;

  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      eyebrow="About"
      heading={`How ${brand} works.`}
      intro="A named project lead on every job, a written scope that explains exactly what we're doing and why, and a documented record of what we actually installed on your house."
    >
      <section className="bg-[color:var(--surface-paper)]" aria-label="Who we are">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">The company</p>
            <h2 className="mt-3 editorial-h2 max-w-[22ch]">A Pacific Northwest exterior contractor.</h2>
            <div className="mt-7 space-y-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[52ch]">
              <p>
                {brand} is the exterior arm of JDI Construction, a Vancouver, Washington remodeler with eighteen years of
                in-house crews across Southwest Washington and the Portland metro. Siding, windows, trim, gutters, and
                coordinated whole-exterior renovation — scoped in writing, built by the same hands that estimated it.
              </p>
              <p>
                Our focus is the exterior envelope — the layered assembly that keeps rain out of the wall. In a region
                that takes on forty inches of annual drizzle, the finish matters, but what&apos;s behind it matters more.
              </p>
              <p>
                We publish verified credentials, we document what we install, and we don&apos;t fabricate review counts,
                years in business, or completed-project totals. Everything on this site traces back to a source we can
                point to.
              </p>
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-sm border-l-2 border-[color:var(--brand-cta)] bg-[color:var(--surface-warm)] p-7">
              <p className="eyebrow">Business entity</p>
              <dl className="mt-4 space-y-3 text-[0.9rem]">
                {legal && (
                  <div>
                    <dt className="text-[0.75rem] text-[color:var(--ink-tertiary)] uppercase tracking-wider">Legal entity</dt>
                    <dd className="mt-0.5 text-[color:var(--ink-emphasis)]">{legal}</dd>
                  </div>
                )}
                {dba && (
                  <div>
                    <dt className="text-[0.75rem] text-[color:var(--ink-tertiary)] uppercase tracking-wider">Relationship</dt>
                    <dd className="mt-0.5 text-[color:var(--ink-emphasis)]">{dba}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-[0.75rem] text-[color:var(--ink-tertiary)] uppercase tracking-wider">Operating since</dt>
                  <dd className="mt-0.5 text-[color:var(--ink-emphasis)]">2008 (via JDI Construction)</dd>
                </div>
              </dl>
              <Link
                href="/credentials"
                className="mt-6 group inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[color:var(--brand-cta)]"
              >
                See verified credentials
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                  <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[color:var(--surface-stone)]" aria-label="How we work">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3 editorial-h2 max-w-[24ch]">The pattern we follow on every project.</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "Written scope before work begins.",
                body:
                  "Scope, materials, access, demolition, and conditions-revealed allowances all appear in writing before we open a wall. Change orders are documented and approved before we install the change.",
              },
              {
                title: "Same hands, every project.",
                body:
                  "In-house crews — not subcontracted bids. The crew building your exterior is the same crew we've worked with for years, with one project manager accountable throughout.",
              },
              {
                title: "Envelope first, finish second.",
                body:
                  "We open representative wall sections, document what we find, correct the flashing and WRB details that let water in originally, and then install new cladding. Finish on failed layers is temporary.",
              },
              {
                title: "Dry walls every night.",
                body:
                  "We sequence around weather, keep walls protected and dried-in as we go, and never leave sheathing exposed to the rain. Vancouver and Portland work year-round.",
              },
            ].map((item, i) => (
              <li key={item.title} className="flex gap-4">
                <span className="text-[0.78rem] font-semibold tracking-[0.14em] text-[color:var(--accent-cedar)] shrink-0 mt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="editorial-h3">{item.title}</h3>
                  <p className="mt-2 text-[0.9rem] text-[color:var(--ink-secondary)] leading-relaxed">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <EstimateSection
        heading="Request a conversation."
        supporting="If any of this sounds like the way you want your exterior done, tell us about your home."
        phone={phone}
      />
    </PageShell>
  );
}
