"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Container } from "@/components/primitives";
import { PrimaryCTA } from "@/components/primitives/CTA";

export type ExteriorHeaderProps = {
  logo?: ReactNode;
  brandName: string;
  regionSummary?: string;
  waCredentialNumber?: string;
  orCredentialNumber?: string;
  phone?: string;
  nav: { label: string; href: string }[];
  variant?: "default" | "transparent";
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    <path
      d="M4 5a2 2 0 0 1 2-2h2.5a1 1 0 0 1 .97.76l1 4a1 1 0 0 1-.29.98L8.6 10.33a12 12 0 0 0 5.08 5.08l1.59-1.59a1 1 0 0 1 .98-.29l4 1a1 1 0 0 1 .75.97V18a2 2 0 0 1-2 2A16 16 0 0 1 4 5z"
      fill="currentColor"
    />
  </svg>
);

const LogoMark = ({ brandName }: { brandName: string }) => (
  <span className="flex items-center gap-2.5" aria-label={`${brandName} home`}>
    <svg viewBox="0 0 32 32" className="h-8 w-8 text-[color:var(--brand-primary)]" aria-hidden="true">
      {/* Simple house-with-pine mark — a brand-owned SVG, not a stock icon */}
      <path
        d="M4 15 16 5l12 10v12H4V15z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="miter"
      />
      <path
        d="M16 3v4M14 7l2-2 2 2M12 10l4-3 4 3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="square"
      />
    </svg>
    <span className="flex flex-col leading-[0.95]">
      <span className="text-[0.95rem] font-bold tracking-[0.04em] text-[color:var(--ink-emphasis)]">TEDDY</span>
      <span className="text-[0.78rem] font-semibold tracking-[0.22em] text-[color:var(--ink-secondary)]">
        EXTERIORS
      </span>
    </span>
  </span>
);

export function ExteriorHeader({
  brandName,
  regionSummary,
  waCredentialNumber,
  orCredentialNumber,
  phone,
  nav,
}: ExteriorHeaderProps) {
  const pathname = usePathname();
  const hasUtility = regionSummary || waCredentialNumber || orCredentialNumber;
  const isActive = (href: string) =>
    pathname ? (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)) : false;
  return (
    <header className="sticky top-0 z-30 bg-[color:var(--surface-paper)]/95 backdrop-blur-sm border-b border-[color:var(--border-subtle)]">
      {hasUtility && (
        <div className="hidden md:block border-b border-[color:var(--border-subtle)]/60 text-[0.72rem] text-[color:var(--ink-secondary)]">
          <Container width="wide">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5">
              {regionSummary && <span>{regionSummary}</span>}
              <span className="flex gap-5">
                {waCredentialNumber && (
                  <span>
                    WA L&amp;I{" "}
                    <strong className="text-[color:var(--ink-emphasis)] font-semibold">
                      {waCredentialNumber}
                    </strong>
                  </span>
                )}
                {orCredentialNumber && (
                  <span>
                    OR CCB{" "}
                    <strong className="text-[color:var(--ink-emphasis)] font-semibold">
                      {orCredentialNumber}
                    </strong>
                  </span>
                )}
              </span>
            </div>
          </Container>
        </div>
      )}
      <Container width="wide">
        <div className="flex items-center justify-between gap-8 py-3.5">
          <Link
            href="/"
            aria-label={`${brandName} home`}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <LogoMark brandName={brandName} />
          </Link>
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7 text-[0.9375rem] font-medium">
            {nav.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative transition-colors ${
                    active
                      ? "text-[color:var(--brand-cta)] after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-[color:var(--brand-cta)]"
                      : "text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)]"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-5">
            {phone && (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                className="hidden md:inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)]"
              >
                <PhoneIcon />
                {phone}
              </a>
            )}
            <PrimaryCTA href="/request-estimate" size="sm">
              Request an Estimate
            </PrimaryCTA>
          </div>
        </div>
      </Container>
    </header>
  );
}
