import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]}
      eyebrow="Policy"
      heading="Terms of use."
      intro="Operational draft. Final terms publish once legal review is complete."
    >
      <section className="bg-[color:var(--surface-paper)]" aria-label="Terms of use">
        <div className="mx-auto max-w-3xl px-6 py-16 prose">
          <p>
            The content on this site is informational. It does not constitute a contract, a bid, or
            a guarantee of availability for any particular property. Project scope, materials, and
            pricing are documented separately in a written estimate or contract issued after an
            on-site assessment.
          </p>
          <p>
            Technical statements about building envelope, moisture management, codes, and manufacturer
            installation requirements are reviewed by the technical reviewer named on each guide
            and reflect the sources listed at the end of each page. Verify current local requirements
            with the applicable jurisdiction.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
