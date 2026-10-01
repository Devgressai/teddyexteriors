import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { materials } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Materials",
  description: "Fiber cement, LP SmartSide, cedar, and other siding systems — compared for Pacific Northwest conditions.",
  alternates: { canonical: "/materials" },
};

export default function MaterialsIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }]}
      eyebrow="Materials"
      heading="Compare the siding systems we install."
      intro="Each material has trade-offs in look, maintenance, and installation. These pages describe what we install, how we handle it, and why we recommend a given system in Pacific Northwest conditions."
    >
      {materials.length === 0 ? (
        <PreviewState message="Material pages publish once the confirmed install list is populated." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-6 sm:grid-cols-2">
            {materials.map((m) => (
              <Link key={m.slug} href={`/materials/${m.slug}`} className="group block">
                <h2 className="text-xl font-semibold text-[color:var(--ink-primary)] group-hover:text-[color:var(--brand-cta)]">
                  {m.product}
                </h2>
                <p className="mt-1 text-sm text-[color:var(--ink-secondary)]">{m.manufacturer}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
