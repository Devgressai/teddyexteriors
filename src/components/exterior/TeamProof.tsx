import Image from "next/image";
import Link from "next/link";
import type { TeamProofProps } from "./types";

export function TeamProof({ heading, intro, people, testimonials, teamHref, reviewsHref }: TeamProofProps) {
  const hasAny = people.length > 0 || testimonials.length > 0;
  if (!hasAny) return null;
  return (
    <section className="bg-[color:var(--surface-warm)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24 grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)]">
            {heading}
          </h2>
          <p className="mt-4 text-base text-[color:var(--text-secondary)]">{intro}</p>
          {people.length > 0 && (
            <ul className="mt-8 space-y-5">
              {people.map((p) => (
                <li key={p.name} className="flex items-center gap-4">
                  {p.photo ? (
                    <div className="relative w-14 h-14 overflow-hidden rounded-full bg-[color:var(--border-subtle)]/40">
                      <Image src={p.photo.src} alt={p.photo.alt} fill sizes="56px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[color:var(--border-subtle)]/60" aria-hidden="true" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[color:var(--text-primary)]">{p.name}</p>
                    <p className="text-xs text-[color:var(--text-secondary)]">{p.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link href={teamHref} className="mt-6 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]">
            Meet the team <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>
        <div className="lg:col-span-7">
          {testimonials.length > 0 && (
            <ul className="space-y-6">
              {testimonials.map((t, i) => (
                <li key={i} className="border-l-2 border-[color:var(--accent)] pl-5">
                  <blockquote className="text-base text-[color:var(--text-primary)]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <cite className="mt-2 block text-xs text-[color:var(--text-secondary)] not-italic">
                    — {t.attribution}
                  </cite>
                </li>
              ))}
            </ul>
          )}
          <Link href={reviewsHref} className="mt-6 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]">
            Read customer accounts <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
