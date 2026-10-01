import type { Metadata } from "next";
import { PageShell, PreviewState } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Warranty",
  description: "Workmanship warranty terms, exclusions, and how manufacturer warranties interact.",
  alternates: { canonical: "/warranty" },
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
      intro="Workmanship covers how the installation was performed. Product warranties cover the materials themselves. We publish exact scope, duration, and exclusions."
    >
      {!resolved ? (
        <PreviewState message="Warranty terms publish once confirmed by the owner." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-3xl px-6 py-16 prose">
            <h2>Workmanship warranty</h2>
            <p><strong>Duration:</strong> {duration}</p>
            <p><strong>Scope:</strong> {scope}</p>
            {exclusions && (<><p><strong>Exclusions:</strong></p><p>{exclusions}</p></>)}
            {mfrSeparate && (
              <>
                <h2>Manufacturer warranties</h2>
                <p>
                  Siding, windows, and other installed products carry their own manufacturer warranties, with their own
                  terms and claim procedures. We provide the product warranty documentation and registration information
                  at project close.
                </p>
              </>
            )}
          </div>
        </section>
      )}
    </PageShell>
  );
}
