import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Where to find real customer accounts of our work.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const sameAs = get<{ sameAs: string[] }>("reviews");
  const profiles = sameAs?.sameAs ?? [];

  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]}
      eyebrow="Reviews"
      heading="Where to find real customer accounts."
      intro="We link to the third-party review profiles that have genuine customer feedback. Published quotes on this site are shown only with written customer permission."
    >
      {profiles.length === 0 ? (
        <PreviewState message="Review profile URLs publish once the owner confirms genuine, verifiable third-party profiles." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <ul className="space-y-3">
              {profiles.map((url) => (
                <li key={url}>
                  <Link href={url} target="_blank" rel="noopener noreferrer" className="text-base text-[color:var(--text-primary)] underline underline-offset-4">
                    {url}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  );
}
