import Image from "next/image";
import Link from "next/link";
import type { ResourceFeatureProps } from "./types";

export function ResourceFeature({ heading, featured, supporting }: ResourceFeatureProps) {
  return (
    <section className="bg-[color:var(--surface-paper)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] max-w-2xl">
          {heading}
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12 items-start">
          <article className="lg:col-span-7">
            <Link href={featured.href} className="group block">
              {featured.image && (
                <div className="relative aspect-[16/9] overflow-hidden rounded-md">
                  <Image
                    src={featured.image.src}
                    alt={featured.image.alt}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[color:var(--text-primary)]">
                {featured.title}
              </h3>
              <p className="mt-2 text-base text-[color:var(--text-secondary)]">{featured.summary}</p>
              <span className="mt-3 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]">
                Read the guide <span aria-hidden="true" className="ml-1">→</span>
              </span>
            </Link>
          </article>
          {supporting.length > 0 && (
            <ul className="lg:col-span-5 space-y-5">
              {supporting.map((g) => (
                <li key={g.slug}>
                  <Link href={g.href} className="group block">
                    <h3 className="text-base font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--cta-fill)]">
                      {g.title}
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--text-secondary)]">{g.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
