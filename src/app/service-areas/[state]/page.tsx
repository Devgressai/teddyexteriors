import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { cities } from "@/content-model/registry";

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ state: "washington" }, { state: "oregon" }];
}

const STATE_META: Record<string, { label: string; code: "WA" | "OR"; blurb: string }> = {
  washington: {
    label: "Washington",
    code: "WA",
    blurb: "Southwest Washington — Clark County and surrounding communities.",
  },
  oregon: {
    label: "Oregon",
    code: "OR",
    blurb: "Portland metro — Multnomah, Washington, and Clackamas counties, and nearby cities.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const meta = STATE_META[state];
  if (!meta) return {};
  return {
    title: `${meta.label} service areas`,
    description: meta.blurb,
    alternates: { canonical: `/service-areas/${state}` },
  };
}

export default async function StateHub({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const meta = STATE_META[state];
  if (!meta) notFound();
  const list = cities.filter((c) => c.state === meta.code);
  return (
    <PageShell
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Service areas", path: "/service-areas" },
        { name: meta.label, path: `/service-areas/${state}` },
      ]}
      eyebrow="Service areas"
      heading={`${meta.label} service areas`}
      intro={meta.blurb}
    >
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {list.length === 0 ? (
            <p className="text-sm text-[color:var(--ink-secondary)]">
              Approved cities publish here once the territory is confirmed.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/service-areas/${state}/${c.slug}`}
                    className="block border border-[color:var(--border-subtle)] rounded-md px-4 py-3 hover:border-[color:var(--brand-cta)]"
                  >
                    <span className="block text-base font-semibold text-[color:var(--ink-primary)]">{c.name}</span>
                    {c.counties.length > 0 && (
                      <span className="block text-xs text-[color:var(--ink-secondary)]">
                        {c.counties.join(" / ")} County
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageShell>
  );
}
