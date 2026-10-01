import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { display, get } from "@/lib/business";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are and how we work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const brand = display<string>("identity.brandName", "Teddy Exteriors");
  const legal = get<string>("identity.legalEntity");
  const dba = get<string>("identity.dba");
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      eyebrow="About"
      heading={`How ${brand} works.`}
      intro="A named project lead on every job, a written scope that explains exactly what we're doing and why, and a documented record of what we actually install."
    >
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-3xl px-6 py-16 prose">
          <p>
            {brand} is a Pacific Northwest exterior contractor. Siding, windows, exterior painting, trim, gutters,
            and coordinated whole-exterior renovations in Southwest Washington and Northwest Oregon.
          </p>
          {(legal || dba) && (
            <p className="text-sm text-[color:var(--ink-secondary)]">
              {legal && <>Legal entity: {legal}. </>}
              {dba && <>{dba}.</>}
            </p>
          )}
          <p>
            Scope, materials, access, and hidden-damage allowances all appear in writing before work begins.
            Change orders are issued in writing. Finish walks happen before payment.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
