import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { cities } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Service areas",
  description: "Southwest Washington and Northwest Oregon — Vancouver, Portland, and surrounding communities.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasIndex() {
  const wa = cities.filter((c) => c.state === "WA");
  const or = cities.filter((c) => c.state === "OR");
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Service areas", path: "/service-areas" }]}
      eyebrow="Service areas"
      heading="Where we work."
      intro="We serve Vancouver, Washington, Portland, Oregon, and the surrounding region. Pick a state hub below, or send us your city or ZIP."
    >
      {cities.length === 0 ? (
        <PreviewState message="Service-area pages publish once the owner-confirmed city list is populated." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-10 sm:grid-cols-2">
            {[
              { label: "Washington", slug: "washington", list: wa },
              { label: "Oregon", slug: "oregon", list: or },
            ].map((group) => (
              <div key={group.slug}>
                <h2 className="text-xs uppercase tracking-wider font-semibold text-[color:var(--text-secondary)]">
                  {group.label}
                </h2>
                <ul className="mt-4 space-y-2">
                  {group.list.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/service-areas/${group.slug}/${c.slug}`}
                        className="text-base text-[color:var(--text-primary)] hover:text-[color:var(--cta-fill)]"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/service-areas/${group.slug}`}
                  className="mt-5 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]"
                >
                  Explore {group.label} <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
