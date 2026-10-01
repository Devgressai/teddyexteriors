import Link from "next/link";
import type { ExteriorHeaderProps } from "./types";

export function ExteriorHeader({
  logo,
  brandName,
  regionSummary,
  waCredentialNumber,
  orCredentialNumber,
  phone,
  nav,
}: ExteriorHeaderProps) {
  const hasUtility = regionSummary || waCredentialNumber || orCredentialNumber;
  return (
    <header className="bg-[color:var(--surface-paper)] border-b border-[color:var(--border-subtle)]">
      {hasUtility && (
        <div className="border-b border-[color:var(--border-subtle)]/60 text-xs text-[color:var(--text-secondary)]">
          <div className="mx-auto max-w-7xl px-6 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            {regionSummary && <span>{regionSummary}</span>}
            <span className="flex gap-4">
              {waCredentialNumber && <span>WA L&amp;I <strong className="text-[color:var(--text-primary)]">{waCredentialNumber}</strong></span>}
              {orCredentialNumber && <span>OR CCB <strong className="text-[color:var(--text-primary)]">{orCredentialNumber}</strong></span>}
            </span>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${brandName} home`}>
          {logo ?? (
            <span className="text-lg font-semibold tracking-tight text-[color:var(--text-primary)]">{brandName}</span>
          )}
        </Link>
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-[color:var(--text-primary)] hover:text-[color:var(--cta-fill)]">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {phone && (
            <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="hidden md:inline text-sm font-semibold text-[color:var(--text-primary)]">
              {phone}
            </a>
          )}
          <Link
            href="/request-estimate"
            className="inline-flex items-center rounded-md bg-[color:var(--cta-fill)] px-4 py-2.5 text-sm font-semibold text-[color:var(--cta-text)] hover:brightness-95"
          >
            Get My Exterior Estimate
          </Link>
        </div>
      </div>
    </header>
  );
}
