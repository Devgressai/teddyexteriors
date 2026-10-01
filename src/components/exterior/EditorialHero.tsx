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
  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white">
    <svg viewBox="0 0 20 20" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true">
      <path d="M7 5l8 5-8 5V5z" fill="currentColor" />
    </svg>
  </span>
);

/**
 * Full-bleed hero. The exterior photograph fills the entire hero behind every
 * layer — ZERO global scrim, ZERO gradient wash, ZERO tint on the image itself.
 * The typography sits inside a SOLID evergreen panel positioned over the left
 * ~44% on desktop (narrower than the house crop so the house is always visible
 * at its true color). Mobile stacks a clean image above a solid panel.
 *
 * Text colors are set via inline style so the global .editorial-display rule
 * (which otherwise paints headings in evergreen for use on light sections)
 * doesn't win on specificity and render the h1 invisibly on the dark panel.
 */
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
    <section
      aria-label="Teddy Exteriors — Pacific Northwest exterior remodeling"
      className="relative isolate overflow-hidden bg-[color:var(--surface-inverse)]"
    >
      {/* Full-bleed photograph — no overlay, no gradient, no scrim */}
      <div className="absolute inset-0 -z-10 hidden lg:block">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      {/* Mobile: image stacked above the panel, no scrim on it */}
      <div className="relative lg:hidden w-full aspect-[4/3]">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-[1360px] px-6 lg:px-0 min-h-[560px] lg:min-h-[720px] flex items-stretch">
        {/* Solid evergreen panel — card over the left portion of the full-bleed photo */}
        <div
          className="relative w-full lg:w-[44%] bg-[color:var(--surface-inverse)] py-14 lg:py-20 px-6 sm:px-8 lg:px-12 flex flex-col justify-center"
          style={{
            boxShadow: "40px 0 60px -40px rgba(18,61,42,0.35)",
            ["--editorial-color" as string]: "var(--text-inverse)",
          }}
        >
          <ol className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.7rem] font-semibold tracking-[0.24em] uppercase text-white/85">
            {eyebrowLabels.map((label, i) => (
              <li key={label} className="flex items-center gap-5">
                {label}
                {i < eyebrowLabels.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[color:var(--accent-highlight)]"
                  />
                )}
              </li>
            ))}
          </ol>
          <h1
            className="mt-7 editorial-display"
            style={{ color: "#ffffff" }}
          >
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line.italic ? (
                  <span
                    className="italic"
                    style={{ color: "var(--accent-highlight)" }}
                  >
                    {line.text}
                  </span>
                ) : (
                  line.text
                )}
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
                className="group inline-flex items-center gap-3 text-[0.95rem] font-semibold text-white hover:text-[color:var(--accent-highlight)]"
              >
                <PlayCircle />
                {secondaryCta.label}
              </Link>
            )}
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3 text-[0.8125rem] text-white/90 max-w-md">
            {bulletProof.map((b) => (
              <li key={b.label} className="flex items-center gap-2">
                <span className="text-[color:var(--accent-highlight)]">
                  <Icon kind={b.icon ?? "check"} />
                </span>
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {projectCaption && (
        <div className="hidden lg:block absolute right-6 bottom-6 max-w-[280px] rounded-sm bg-white/92 backdrop-blur-sm border border-[color:var(--border-subtle)] px-4 py-3 text-[0.75rem] text-[color:var(--text-body)] leading-snug shadow-md">
          <p className="font-semibold text-[color:var(--text-heading)]">{projectCaption.title}</p>
          <p className="text-[color:var(--text-muted)]">{projectCaption.locality}</p>
          <p className="text-[color:var(--text-muted)] mt-0.5">{projectCaption.materials}</p>
        </div>
      )}
    </section>
  );
}
