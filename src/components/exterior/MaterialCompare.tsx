import Image from "next/image";
import Link from "next/link";
import type { MaterialCompareProps } from "./types";

export function MaterialCompare({ heading, intro, entries, compareHref }: MaterialCompareProps) {
  if (entries.length === 0) return null;
  return (
    <section className="bg-[color:var(--surface-paper)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <header className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)]">
            {heading}
          </h2>
          {intro && <p className="mt-4 text-base text-[color:var(--text-secondary)]">{intro}</p>}
        </header>
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--border-subtle)]/40">
                <Image
                  src={entry.image.src}
                  alt={entry.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[color:var(--text-primary)]">{entry.product}</h3>
              <dl className="mt-3 text-sm space-y-2 text-[color:var(--text-secondary)]">
                <div>
                  <dt className="inline font-semibold text-[color:var(--text-primary)]">Look:</dt>{" "}
                  <dd className="inline">{entry.look}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-[color:var(--text-primary)]">Maintenance:</dt>{" "}
                  <dd className="inline">{entry.maintenance}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-[color:var(--text-primary)]">Fit:</dt>{" "}
                  <dd className="inline">{entry.fit}</dd>
                </div>
              </dl>
              {entry.href && (
                <Link href={entry.href} className="mt-4 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]">
                  Details <span aria-hidden="true" className="ml-1">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
        {compareHref && (
          <div className="mt-10">
            <Link href={compareHref} className="inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]">
              Compare siding options <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
