import Image from "next/image";
import Link from "next/link";
import type { ServiceExplorerProps } from "./types";

/**
 * One lead service + supporting entries. No "6 interchangeable icon cards" (spec §04).
 * Each entry has a real image + description + descriptive link.
 */
export function ServiceExplorer({ heading, entries }: ServiceExplorerProps) {
  if (entries.length === 0) return null;
  const lead = entries.find((e) => e.emphasis === "lead") ?? entries[0];
  const supporting = entries.filter((e) => e !== lead);
  return (
    <section className="bg-[color:var(--surface-warm)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--ink-primary)] max-w-2xl">
          {heading}
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <article className="lg:col-span-7">
            <Link href={lead.href} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                <Image
                  src={lead.image.src}
                  alt={lead.image.alt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight text-[color:var(--ink-primary)]">
                {lead.title}
              </h3>
              <p className="mt-2 text-base text-[color:var(--ink-secondary)] max-w-prose">
                {lead.description}
              </p>
              <span className="mt-3 inline-flex items-center text-sm font-semibold text-[color:var(--brand-cta)]">
                Learn more <span aria-hidden="true" className="ml-1">→</span>
              </span>
            </Link>
          </article>
          <div className="lg:col-span-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.map((entry) => (
              <Link key={entry.slug} href={entry.href} className="group flex gap-4">
                <div className="relative shrink-0 w-24 h-24 lg:w-28 lg:h-28 overflow-hidden rounded-md bg-[color:var(--border-subtle)]/40">
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-[color:var(--ink-primary)] group-hover:text-[color:var(--brand-cta)]">
                    {entry.title}
                  </h3>
                  <p className="mt-1 text-sm text-[color:var(--ink-secondary)] line-clamp-3">
                    {entry.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
