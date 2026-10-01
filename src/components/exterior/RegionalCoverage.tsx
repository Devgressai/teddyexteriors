import Link from "next/link";
import { Container, Section } from "@/components/primitives";
import { RegionalMap } from "./RegionalMap";
import type { RegionalCoverageGroup, RegionalCoverageProps } from "./types";

export function RegionalCoverage({ heading, groups, supporting }: RegionalCoverageProps) {
  if (groups.length === 0) return null;
  return (
    <Section surface="warm" pad="lg" ariaLabel="Service areas">
      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 items-start">
          <header className="lg:col-span-5">
            <p className="eyebrow">Service area</p>
            <h2 className="mt-5 editorial-h2 max-w-[18ch]">{heading}</h2>
            {supporting && (
              <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[46ch]">
                {supporting}
              </p>
            )}
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6">
              {groups.map((group) => (
                <StateColumn key={group.stateLabel} group={group} />
              ))}
            </div>
          </header>
          <div className="lg:col-span-7">
            <div className="rounded-sm border border-[color:var(--border-subtle)] bg-[color:var(--surface-soft)] p-6 lg:p-8">
              <RegionalMap />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function StateColumn({ group }: { group: RegionalCoverageGroup }) {
  return (
    <div>
      <h3 className="text-[0.75rem] uppercase tracking-[0.14em] font-semibold text-[color:var(--ink-secondary)]">
        {group.stateLabel}
      </h3>
      <ul className="mt-4 space-y-2 text-[0.9rem]">
        {group.cities.map((city) => (
          <li key={city.href}>
            <Link
              href={city.href}
              className="text-[color:var(--ink-emphasis)] hover:text-[color:var(--brand-cta)] transition-colors"
            >
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={group.stateHref}
        className="group mt-5 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-[color:var(--brand-cta)]"
      >
        All {group.stateLabel}
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
          <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </svg>
      </Link>
    </div>
  );
}
