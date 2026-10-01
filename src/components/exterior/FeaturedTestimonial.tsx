import Link from "next/link";
import { Container, Section } from "@/components/primitives";
import type { ReactNode } from "react";

export type FeaturedTestimonialProps = {
  eyebrow: string;
  heading: string;
  quote: string;
  attribution: string;
  locality: string;
  project?: string;
  platform?: { name: string; url: string };
  verifiedNote?: string;
  reviewsHref: string;
  secondary?: { quote: string; attribution: string; locality: string }[];
};

const QuoteGlyph = () => (
  <svg
    viewBox="0 0 48 36"
    aria-hidden="true"
    className="h-10 w-10 text-[color:var(--accent-cedar)]"
  >
    <path
      d="M20 36H4L0 20V4a4 4 0 014-4h12v16h-8l8 20zm28 0H32l-4-16V4a4 4 0 014-4h12v16h-8l8 20z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

export function FeaturedTestimonial({
  eyebrow,
  heading,
  quote,
  attribution,
  locality,
  project,
  platform,
  verifiedNote,
  reviewsHref,
  secondary,
}: FeaturedTestimonialProps) {
  const empty = !quote;
  return (
    <Section surface="paper" pad="lg" ariaLabel="Homeowner stories">
      <Container width="std">
        <header className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5 editorial-h2 max-w-[22ch]">{heading}</h2>
        </header>
        {empty ? (
          <div className="mt-10 rounded-sm border border-dashed border-[color:var(--border-subtle)] p-10 text-center">
            <p className="text-[0.9rem] text-[color:var(--ink-tertiary)]">
              Published testimonials will appear here once homeowners have given written permission to feature their words.
              In the meantime, independent review profiles for the parent entity are linked below.
            </p>
            <Link
              href={reviewsHref}
              className="mt-5 inline-flex items-center text-[0.9rem] font-semibold text-[color:var(--brand-cta)]"
            >
              See all reviews
              <Arrow />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8 items-start">
            <div className="lg:col-span-8">
              <QuoteGlyph />
              <blockquote className="mt-5 editorial-h2 leading-[1.2] text-[color:var(--ink-emphasis)] max-w-[32ch]">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <footer className="mt-7 flex flex-wrap items-end gap-x-6 gap-y-2 text-[0.85rem]">
                <span className="font-semibold text-[color:var(--ink-emphasis)]">— {attribution}</span>
                <span className="text-[color:var(--ink-tertiary)]">{locality}</span>
                {project && <span className="text-[color:var(--ink-tertiary)]">· {project}</span>}
                {platform && (
                  <Link
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[color:var(--brand-cta)] font-semibold"
                  >
                    Verified on {platform.name}
                  </Link>
                )}
              </footer>
              {verifiedNote && (
                <p className="mt-3 text-[0.72rem] text-[color:var(--ink-tertiary)]">{verifiedNote}</p>
              )}
            </div>
            {secondary && secondary.length > 0 && (
              <aside className="lg:col-span-4 border-l border-[color:var(--border-subtle)] lg:pl-8 space-y-7">
                {secondary.map((s, i) => (
                  <blockquote key={i} className="text-[0.9rem] text-[color:var(--ink-secondary)] leading-relaxed">
                    &ldquo;{s.quote}&rdquo;
                    <footer className="mt-2 text-[0.75rem] text-[color:var(--ink-tertiary)]">
                      — {s.attribution}, {s.locality}
                    </footer>
                  </blockquote>
                ))}
              </aside>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" className="ml-1.5 h-4 w-4" aria-hidden="true">
    <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
  </svg>
);
