import Image from "next/image";
import Link from "next/link";
import type { RegionalCoverageProps } from "./types";

/**
 * Two state groups with cities as real links. Map image optional and only when verified.
 * No implication of local offices in every city (spec §08).
 */
export function RegionalCoverage({ heading, groups, supporting, mapImage }: RegionalCoverageProps) {
  if (groups.length === 0) return null;
  return (
    <section className="bg-[color:var(--surface-warm)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <header className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)]">
            {heading}
          </h2>
          {supporting && <p className="mt-4 text-base text-[color:var(--text-secondary)]">{supporting}</p>}
        </header>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-start">
          {mapImage && (
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[color:var(--border-subtle)]/40">
                <Image
                  src={mapImage.src}
                  alt={mapImage.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <div className={mapImage ? "lg:col-span-6" : "lg:col-span-12"}>
            <div className="grid gap-10 sm:grid-cols-2">
              {groups.map((group) => (
                <div key={group.stateLabel}>
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-[color:var(--text-secondary)]">
                    {group.stateLabel}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {group.cities.map((city) => (
                      <li key={city.href}>
                        <Link href={city.href} className="text-base text-[color:var(--text-primary)] hover:text-[color:var(--cta-fill)]">
                          {city.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={group.stateHref} className="mt-5 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]">
                    Explore {group.stateLabel} service areas <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
