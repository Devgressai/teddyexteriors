import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { projects, findCity } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Projects",
  description: "Documented siding and exterior projects — specific materials, dimensions, substrate findings, and completed scope.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]}
      eyebrow="Projects"
      heading="Work we've completed."
      intro="Each case study names the materials installed, scope of work, substrate findings, and outcome. No stock photography; no 'representative examples.'"
    >
      {projects.length === 0 ? (
        <PreviewState message="Project case studies publish once real projects with customer permissions and photo rights are documented." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-5xl px-6 py-16 grid gap-10 sm:grid-cols-2">
            {projects.map((p) => {
              const city = findCity(p.city);
              return (
                <Link key={p.slug} href={`/projects/${p.slug}`} className="group block">
                  <h2 className="text-xl font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--cta-fill)]">
                    {p.title}
                  </h2>
                  {city && <p className="mt-1 text-xs text-[color:var(--text-secondary)]">{city.name}, {city.state}</p>}
                  <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{p.outcome}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </PageShell>
  );
}
