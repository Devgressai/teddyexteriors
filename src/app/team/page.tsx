import type { Metadata } from "next";
import Image from "next/image";
import { PageShell, PreviewState } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Team",
  description: "Named leadership and project responsibility.",
  alternates: { canonical: "/team" },
};

type Person = { slug: string; name: string; role: string; bio: string; technicalReviewer?: boolean };

export default function TeamPage() {
  const leadership = (get<Person[]>("leadership") ?? []);
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Team", path: "/team" }]}
      eyebrow="Team"
      heading="The people responsible for your project."
      intro="A named project lead on every job. The technical reviewer below approves the installation and envelope guidance on this site."
    >
      {leadership.length === 0 ? (
        <PreviewState message="Team biographies publish once leadership is confirmed." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-4xl px-6 py-16 space-y-10">
            {leadership.map((p) => (
              <article key={p.slug} className="flex gap-6 items-start">
                <div className="w-20 h-20 rounded-full bg-[color:var(--border-subtle)]/60" aria-hidden="true" />
                <div>
                  <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">{p.name}</h2>
                  <p className="text-sm text-[color:var(--ink-secondary)]">
                    {p.role}
                    {p.technicalReviewer && <span className="ml-2 text-[color:var(--brand-cta)]">· Technical reviewer</span>}
                  </p>
                  <p className="mt-3 text-sm text-[color:var(--ink-primary)]">{p.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
