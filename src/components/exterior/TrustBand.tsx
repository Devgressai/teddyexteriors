import type { ReactNode } from "react";
import { Container } from "@/components/primitives";

export type TrustBandItem = {
  label: string;
  value: string;
  sub?: string;
  icon?: ReactNode;
};

const StarIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 text-[color:var(--ink-emphasis)]">
    <path d="M10 2l2.47 5.02 5.53.8-4 3.9.95 5.53L10 14.63 5.05 17.25 6 11.72 2 7.82l5.53-.8L10 2z" fill="currentColor" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 text-[color:var(--ink-emphasis)]">
    <path
      d="M10 2 4 4.5v4.4c0 3.7 2.4 7.1 6 8.6 3.6-1.5 6-4.9 6-8.6V4.5L10 2z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M7 10l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
  </svg>
);
const MedalIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 text-[color:var(--ink-emphasis)]">
    <circle cx="10" cy="8" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 11l-2 5 3-1 2 2 2-2 3 1-2-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const TeamIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 text-[color:var(--ink-emphasis)]">
    <circle cx="7" cy="7.5" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2.5 16c0-2.5 2-4.2 4.5-4.2S11.5 13.5 11.5 16M12 16c0-1.9 1.4-3.1 3-3.1s3 1.2 3 3.1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const HouseIcon = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5 text-[color:var(--ink-emphasis)]">
    <path d="M3 10 10 4l7 6v7H3v-7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 17v-4h4v4" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const trustIcons = {
  star: <StarIcon />,
  shield: <ShieldIcon />,
  medal: <MedalIcon />,
  team: <TeamIcon />,
  house: <HouseIcon />,
};

export function TrustBand({
  lead,
  items,
}: {
  lead?: string;
  items: TrustBandItem[];
}) {
  return (
    <section
      aria-label="Credentials and trust indicators"
      className="bg-[color:var(--surface-page)] border-b border-[color:var(--border-subtle)]"
    >
      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] items-center gap-x-10 gap-y-6 py-6">
          {lead && (
            <p className="eyebrow max-w-[180px] leading-relaxed lg:border-r lg:border-[color:var(--border-subtle)] lg:pr-10">
              {lead}
            </p>
          )}
          <ul className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-5">
            {items.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                {item.icon && <span className="mt-0.5 shrink-0">{item.icon}</span>}
                <div className="min-w-0">
                  <p className="text-[0.95rem] font-semibold text-[color:var(--ink-emphasis)] leading-tight">
                    {item.value}
                  </p>
                  <p className="text-[0.75rem] text-[color:var(--ink-secondary)] leading-tight mt-0.5">
                    {item.label}
                  </p>
                  {item.sub && (
                    <p className="text-[0.68rem] text-[color:var(--ink-tertiary)] leading-tight mt-0.5">{item.sub}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
