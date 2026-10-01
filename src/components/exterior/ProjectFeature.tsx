import Image from "next/image";
import Link from "next/link";
import type { ProjectFeatureProps } from "./types";

/**
 * One strong project with substantial visual space (spec §05).
 * The work dominates the composition. No fabricated placeholders — caller gates visibility.
 */
export function ProjectFeature({ title, cityState, challenge, work, finish, images, href }: ProjectFeatureProps) {
  return (
    <section className="bg-[color:var(--surface-paper)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <header className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.14em] font-semibold text-[color:var(--cta-fill)]">
            Featured project
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)]">
            See what a thoughtful exterior renovation can change.
          </h2>
        </header>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-start">
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-[color:var(--border-subtle)]/40">
              <Image
                src={images.after.src}
                alt={images.after.alt}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </div>
            {images.before && (
              <p className="mt-2 text-xs text-[color:var(--text-secondary)]">
                Before/after available on the full case study.
              </p>
            )}
          </div>
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">{title}</h3>
            <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{cityState}</p>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-xs uppercase tracking-wider font-semibold text-[color:var(--text-secondary)]">
                  The challenge
                </dt>
                <dd className="mt-1 text-sm text-[color:var(--text-primary)]">{challenge}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider font-semibold text-[color:var(--text-secondary)]">
                  The work
                </dt>
                <dd className="mt-1 text-sm text-[color:var(--text-primary)]">{work}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider font-semibold text-[color:var(--text-secondary)]">
                  The finish
                </dt>
                <dd className="mt-1 text-sm text-[color:var(--text-primary)]">{finish}</dd>
              </div>
            </dl>
            <Link
              href={href}
              className="mt-8 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]"
            >
              Explore this transformation <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
