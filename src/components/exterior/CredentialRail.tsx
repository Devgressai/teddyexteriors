import Link from "next/link";
import type { CredentialRailProps } from "./types";

/**
 * Compact typographic credential/trust rail. Shows ONLY the items passed in — "if only two
 * strong facts are available, display two" (homepage spec §03). No oversized stat cards.
 */
export function CredentialRail({ items }: CredentialRailProps) {
  if (items.length === 0) return null;
  return (
    <section aria-label="Credentials and trust" className="bg-[color:var(--surface-paper)] border-y border-[color:var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => {
          const content = (
            <>
              <dt className="text-xs uppercase tracking-wider text-[color:var(--text-secondary)]">
                {item.label}
              </dt>
              <dd className="mt-1 text-base font-semibold text-[color:var(--text-primary)]">{item.value}</dd>
              {item.sourceNote && (
                <dd className="mt-0.5 text-[11px] text-[color:var(--text-secondary)]">{item.sourceNote}</dd>
              )}
            </>
          );
          return (
            <div key={i}>
              <dl>
                {item.href ? (
                  <Link href={item.href} className="block hover:text-[color:var(--cta-fill)]">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </dl>
            </div>
          );
        })}
      </div>
    </section>
  );
}
