import Link from "next/link";
import type { ReactNode } from "react";

type Size = "sm" | "md" | "lg";
const sizeFill: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-[0.9375rem]",
  lg: "px-6 py-3.5 text-base",
};

type Props = {
  href: string;
  children: ReactNode;
  size?: Size;
  className?: string;
  ariaLabel?: string;
  trailing?: boolean;
};

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5">
    <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="square" />
  </svg>
);

export function PrimaryCTA({ href, children, size = "md", className = "", ariaLabel, trailing = true }: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group inline-flex items-center justify-center rounded-sm bg-[color:var(--brand-cta)] font-semibold text-[color:var(--brand-cta-ink)] hover:bg-[color:var(--brand-cta-hover)] transition-colors ${sizeFill[size]} ${className}`}
    >
      {children}
      {trailing && <Arrow />}
    </Link>
  );
}

export function SecondaryCTA({ href, children, size = "md", className = "", ariaLabel, trailing = true }: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group inline-flex items-center font-semibold text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)] transition-colors ${sizeFill[size]} ${className}`}
    >
      {children}
      {trailing && <Arrow />}
    </Link>
  );
}

export function InverseCTA({ href, children, size = "md", className = "", ariaLabel, trailing = true }: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group inline-flex items-center justify-center rounded-sm bg-[color:var(--surface-paper)] font-semibold text-[color:var(--ink-emphasis)] hover:bg-[color:var(--surface-warm)] transition-colors ${sizeFill[size]} ${className}`}
    >
      {children}
      {trailing && <Arrow />}
    </Link>
  );
}

export function GhostInverseCTA({ href, children, size = "md", className = "", ariaLabel, trailing = true }: Props) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group inline-flex items-center font-semibold text-[color:var(--ink-inverse)] hover:text-[color:var(--brand-secondary)] transition-colors ${sizeFill[size]} ${className}`}
    >
      {children}
      {trailing && <Arrow />}
    </Link>
  );
}
