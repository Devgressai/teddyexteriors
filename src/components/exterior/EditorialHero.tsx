import Image from "next/image";
import Link from "next/link";
import type { ImageAsset } from "@/content-model/types";
import { LimeCTA } from "@/components/primitives/CTA";

export type EditorialHeroProps = {
  eyebrowLabels: string[];
  headlineLines: { text: string; italic?: boolean }[];
  supporting: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  bulletProof: { label: string; icon?: "check" | "team" | "scope" | "shield" }[];
  heroImage: ImageAsset;
  projectCaption?: {
    title: string;
    locality: string;
    materials: string;
  };
};

const Icon = ({ kind }: { kind: NonNullable<EditorialHeroProps["bulletProof"][number]["icon"]> }) => {
  const common = { strokeWidth: 1.5, fill: "none", stroke: "currentColor" } as const;
  if (kind === "check")
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
        <circle cx="10" cy="10" r="8" {...common} />
        <path d="M6 10.5 9 13l5-6" {...common} strokeLinecap="square" />
      </svg>
    );
  if (kind === "team")
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
        <circle cx="7" cy="8" r="2.5" {...common} />
        <circle cx="14" cy="9" r="2" {...common} />
        <path d="M2.5 16c0-2.4 2-4 4.5-4s4.5 1.6 4.5 4M12 16c0-1.8 1.4-3 3-3s3 1.2 3 3" {...common} />
      </svg>
    );
  if (kind === "scope")
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
        <rect x="4" y="4" width="12" height="12" rx="1" {...common} />
        <path d="M7 8h6M7 11h6M7 14h4" {...common} strokeLinecap="square" />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
      <path d="M10 2.5 4 5v4c0 4 2.5 7 6 9 3.5-2 6-5 6-9V5l-6-2.5z" {...common} strokeLinejoin="miter" />
      <path d="M7.5 10l2 2 3.5-4" {...common} strokeLinecap="square" />
    </svg>
  );
};

const PlayCircle = () => (
  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-paper)]/95 text-[color:var(--ink-emphasis)]">
    <svg viewBox="0 0 20 20" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true">
      <path d="M7 5l8 5-8 5V5z" fill="currentColor" />
    </svg>
  </span>
);

export function EditorialHero({
  eyebrowLabels,
  headlineLines,
  supporting,
  primaryCta,
  secondaryCta,
  bulletProof,
  heroImage,
  projectCaption,
}: EditorialHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[color:var(--surface-inverse)] text-[color:var(--ink-inverse)]">
      {/* Hero background image + gradient scrim for text legibility on left */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-right-bottom"
        />
        {/* Desktop scrim — gradient fades from left */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(100deg, rgba(18,61,42,0.94) 0%, rgba(18,61,42,0.82) 32%, rgba(18,61,42,0.48) 55%, rgba(18,61,42,0.10) 78%, rgba(18,61,42,0) 100%)",
          }}
        />
        {/* Mobile scrim — stronger bottom-up fade since text stacks under image */}
        <div
          aria-hidden="true"
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,61,42,0.55) 0%, rgba(18,61,42,0.42) 30%, rgba(18,61,42,0.88) 70%, rgba(18,61,42,0.96) 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1360px] px-6 lg:px-8 pt-8 pb-10 lg:pt-16 lg:pb-20 min-h-[640px] lg:min-h-[720px] flex flex-col justify-center">
        <div className="max-w-[720px]">
          <ol className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.7rem] font-semibold tracking-[0.24em] uppercase text-white/85">
            {eyebrowLabels.map((label, i) => (
              <li key={label} className="flex items-center gap-5">
                {label}
                {i < eyebrowLabels.length - 1 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[color:var(--brand-secondary)]" />
                )}
              </li>
            ))}
          </ol>
          <h1 className="mt-7 editorial-display text-[color:var(--ink-inverse)]">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line.italic ? <span className="editorial-italic">{line.text}</span> : line.text}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-base/relaxed text-white/85">{supporting}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <LimeCTA href={primaryCta.href} size="lg">
              {primaryCta.label}
            </LimeCTA>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="group inline-flex items-center gap-3 text-[0.95rem] font-semibold text-white hover:text-[color:var(--brand-secondary)]"
              >
                <PlayCircle />
                {secondaryCta.label}
              </Link>
            )}
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.8125rem] text-white/85">
            {bulletProof.map((b) => (
              <li key={b.label} className="flex items-center gap-2">
                <span className="text-[color:var(--brand-secondary)]">
                  <Icon kind={b.icon ?? "check"} />
                </span>
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {projectCaption && (
        <div className="absolute right-4 lg:right-8 bottom-5 lg:bottom-8 max-w-[280px] rounded-sm bg-black/55 backdrop-blur-sm border border-white/15 px-4 py-3 text-[0.75rem] text-white/90 leading-snug">
          <p className="font-semibold text-white">{projectCaption.title}</p>
          <p className="opacity-85">{projectCaption.locality}</p>
          <p className="opacity-70 mt-0.5">{projectCaption.materials}</p>
        </div>
      )}
    </section>
  );
}
