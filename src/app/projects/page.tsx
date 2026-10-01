import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { projects, findCity } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Projects — Vancouver, WA and Portland, OR exterior work",
  description:
    "Documented siding, windows, and exterior renovation projects in the Pacific Northwest. Every case study names the materials installed, scope, substrate findings, and outcome — no stock photography.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "article",
    title: "Projects — Vancouver, WA and Portland, OR exterior work",
    description:
      "Documented siding and exterior renovation case studies in the Pacific Northwest.",
    url: "/projects",
  },
};

export default function ProjectsIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]}
      eyebrow="Our Work"
      heading="Documented projects. No stock photography."
      intro="Each case study names the materials installed, scope of work, substrate findings, change-order handling, and outcome. The project is the proof — not a highlight reel."
    >
      {projects.length === 0 ? (
        <PreviewState message="Project case studies publish once real projects with customer permissions and photo rights are documented." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]" aria-label="Project list">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {projects.map((p) => {
                const city = findCity(p.city);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--brand-cta)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[color:var(--surface-mist)]">
                        {p.photos[0] ? (
                          <Image
                            src={p.photos[0].src}
                            alt={p.photos[0].alt}
                            fill
                            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div className="absolute inset-0 grid place-items-center text-[0.72rem] text-[color:var(--ink-tertiary)]">
                            Case-study photography pending
                          </div>
                        )}
                      </div>
                      <div className="mt-5">
                        <p className="eyebrow">
                          {city ? `${city.name}, ${city.state}` : "Project"}
                        </p>
                        <h2 className="mt-2 editorial-h3 text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                          {p.title}
                        </h2>
                        <p className="mt-2 text-[0.9rem] text-[color:var(--ink-secondary)] leading-relaxed line-clamp-3">
                          {p.outcome}
                        </p>
                        {p.services.length > 0 && (
                          <p className="mt-3 text-[0.72rem] uppercase tracking-wider text-[color:var(--ink-tertiary)]">
                            {p.services
                              .slice(0, 3)
                              .map((sl) => sl.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()))
                              .join(" · ")}
                          </p>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  );
}
