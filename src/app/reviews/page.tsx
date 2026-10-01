import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Reviews — Verified Customer Accounts Across Six Platforms",
  description:
    "Verified homeowner reviews of our exterior work on Google, Yelp, Facebook, Angi, Houzz, and GuildQuality. We link to the live platforms rather than republishing scores we can't audit.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    type: "article",
    title: "Reviews — Verified Customer Accounts Across Six Platforms",
    description:
      "Verified homeowner reviews on six independent third-party platforms.",
    url: "/reviews",
  },
};

function platformName(url: string): string {
  if (url.includes("google.")) return "Google";
  if (url.includes("yelp.")) return "Yelp";
  if (url.includes("facebook.")) return "Facebook";
  if (url.includes("angi.")) return "Angi";
  if (url.includes("houzz.")) return "Houzz";
  if (url.includes("guildquality.")) return "GuildQuality";
  if (url.includes("bbb.")) return "BBB";
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Review";
  }
}

export default function ReviewsPage() {
  const sameAs = get<{ sameAs: string[] }>("reviews");
  const profiles = sameAs?.sameAs ?? [];

  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }]}
      eyebrow="Reviews"
      heading="Where to find real customer accounts."
      intro="We link to the third-party review profiles that host genuine customer feedback. We don't republish aggregate star counts on this page — the live platforms are the audit trail. Click through to see what homeowners actually say."
    >
      {profiles.length === 0 ? (
        <PreviewState message="Review profile URLs publish once the owner confirms genuine, verifiable third-party profiles." />
      ) : (
        <>
          <section className="bg-[color:var(--surface-paper)]" aria-label="Review platforms">
            <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
              <p className="eyebrow">Independent review platforms</p>
              <h2 className="mt-3 editorial-h2 max-w-[26ch]">Six places you can check our work.</h2>
              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {profiles.map((url) => (
                  <li key={url}>
                    <Link
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full rounded-sm border border-[color:var(--border-subtle)] p-6 hover:border-[color:var(--brand-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-cta)] transition-colors"
                    >
                      <p className="eyebrow">Platform</p>
                      <h3 className="mt-3 editorial-h3 text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                        {platformName(url)}
                      </h3>
                      <p className="mt-3 text-[0.78rem] text-[color:var(--ink-tertiary)] break-all">
                        {url.replace(/^https?:\/\/(www\.)?/, "")}
                      </p>
                      <span className="mt-5 inline-flex items-center text-[0.85rem] font-semibold text-[color:var(--brand-cta)]">
                        Read reviews on {platformName(url)}
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1.5 h-3.5 w-3.5">
                          <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="bg-[color:var(--surface-stone)] border-t border-[color:var(--border-subtle)]" aria-label="How we treat testimonials">
            <div className="mx-auto max-w-5xl px-6 py-14 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="eyebrow">Our discipline with testimonials</p>
                <h2 className="mt-3 editorial-h2 max-w-[26ch]">We publish quotes only with written permission.</h2>
                <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[56ch]">
                  Reviews on this site show the customer&apos;s name, project location, and the platform the quote
                  came from. We don&apos;t edit testimonials for marketing voice, and we don&apos;t aggregate scores
                  into decorative star widgets.
                </p>
              </div>
              <aside className="lg:col-span-5">
                <div className="rounded-sm border-l-2 border-[color:var(--brand-cta)] bg-[color:var(--surface-paper)] p-6">
                  <p className="eyebrow">What we never do</p>
                  <ul className="mt-4 space-y-2.5 text-[0.85rem] text-[color:var(--ink-secondary)]">
                    {[
                      "Buy reviews",
                      "Incentivize reviews",
                      "Delete negative feedback",
                      "Invent testimonials",
                      "Display fabricated aggregate ratings",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-[color:var(--brand-cta)] shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </section>
        </>
      )}
    </PageShell>
  );
}
