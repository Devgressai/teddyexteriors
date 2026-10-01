import Link from "next/link";

export type ReviewPlatform = {
  name: string;
  url: string;
  /**
   * Optional observed rating. Only populate if the rating is publicly visible on the linked
   * platform at the time of publication. Do not fabricate.
   */
  rating?: string;
};

export type ReviewPlatformsProps = {
  heading?: string;
  intro?: string;
  platforms: ReviewPlatform[];
  reviewsHref?: string;
};

/**
 * Typographic row of real review-platform links. No fake stars; no aggregate "4.9/5"
 * if a specific rating isn't actually visible on the linked platform. Brief §12 bans
 * self-serving aggregateRating markup — this component intentionally emits none.
 */
export function ReviewPlatforms({
  heading = "Where our customers are talking about us.",
  intro,
  platforms,
  reviewsHref = "/reviews",
}: ReviewPlatformsProps) {
  if (platforms.length === 0) return null;
  return (
    <section className="bg-[color:var(--surface-paper)] border-y border-[color:var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--ink-primary)]">{heading}</h2>
            {intro && <p className="mt-2 text-sm text-[color:var(--ink-secondary)]">{intro}</p>}
          </div>
          <Link
            href={reviewsHref}
            className="text-sm font-semibold text-[color:var(--brand-cta)]"
          >
            See all reviews <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {platforms.map((p) => (
            <li key={p.url}>
              <Link
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-[color:var(--border-subtle)] rounded-md px-4 py-3 hover:border-[color:var(--brand-cta)]"
              >
                <span className="block text-xs uppercase tracking-wider text-[color:var(--ink-secondary)]">
                  {p.name}
                </span>
                {p.rating && (
                  <span className="mt-1 block text-base font-semibold text-[color:var(--ink-primary)]">
                    {p.rating}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
