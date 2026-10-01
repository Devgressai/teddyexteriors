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

const CheckGlyph = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
    <circle cx="10" cy="10" r="9" fill="rgba(255,255,255,0.14)" />
    <path
      d="M6 10.5 9 13.5l5-6.5"
      fill="none"
      stroke="var(--accent-highlight)"
      strokeWidth="2"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
  </svg>
);

const PlayCircle = () => (
  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/55 bg-white/10 text-white backdrop-blur-sm">
    <svg viewBox="0 0 20 20" className="ml-0.5 h-4 w-4" aria-hidden="true">
      <path d="M7 5l8 5-8 5V5z" fill="currentColor" />
    </svg>
  </span>
);

/**
 * Full-bleed photographic hero in the Sierrasiding.com idiom.
 *
 * The exterior photograph fills the entire hero behind every layer — NO
 * global scrim, NO gradient wash, NO opacity filter on the image. The hero
 * image is composed so that the left ~40% is a quiet mature-evergreen area
 * that absorbs white text naturally; a subtle text-shadow carries legibility
 * without introducing a visible tint on the house crop at right.
 *
 * Underneath the hero band sits a three-column proof row — license, local
 * team, written-estimate — mirroring Sierra Siding's immediate-trust pattern.
 *
 * Heading color is set inline so the global .editorial-display rule (which
 * forces evergreen for light sections) can't win specificity.
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
  const textShadow = "0 2px 14px rgba(10, 28, 18, 0.65), 0 1px 2px rgba(10, 28, 18, 0.6)";
  const subtleShadow = "0 1px 10px rgba(10, 28, 18, 0.6)";

  return (
    <section
      aria-label="Teddy Exteriors — Pacific Northwest exterior remodeling"
      className="relative isolate overflow-hidden bg-[color:var(--surface-inverse)]"
      style={{ ["--editorial-color" as string]: "#ffffff" }}
    >
      {/* Full-bleed photograph — zero overlay */}
      <div className="absolute inset-0 -z-10">
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

      <div className="relative mx-auto max-w-[1360px] px-6 lg:px-10">
        <div className="min-h-[560px] lg:min-h-[720px] flex items-center">
          <div className="w-full lg:max-w-[640px] py-16 lg:py-24">
            <ol
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.72rem] font-semibold tracking-[0.26em] uppercase text-white"
              style={{ textShadow: subtleShadow }}
            >
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
              style={{ color: "#ffffff", textShadow }}
            >
              {headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {line.italic ? (
                    <span
                      className="italic"
                      style={{ color: "var(--accent-highlight)", textShadow }}
                    >
                      {line.text}
                    </span>
                  ) : (
                    line.text
                  )}
                </span>
              ))}
            </h1>

            <p
              className="mt-6 max-w-xl text-base/relaxed text-white"
              style={{ textShadow: subtleShadow }}
            >
              {supporting}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <LimeCTA href={primaryCta.href} size="lg">
                {primaryCta.label}
              </LimeCTA>
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="group inline-flex items-center gap-3 text-[1rem] font-semibold text-white hover:text-[color:var(--accent-highlight)]"
                  style={{ textShadow: subtleShadow }}
                >
                  <PlayCircle />
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            <ul
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-[0.9rem] text-white max-w-md"
              style={{ textShadow: subtleShadow }}
            >
              {bulletProof.map((b) => (
                <li key={b.label} className="flex items-center gap-3">
                  <CheckGlyph />
                  {b.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {projectCaption && (
        <div
          className="hidden lg:block absolute right-6 bottom-6 max-w-[280px] rounded-sm bg-white/92 backdrop-blur-sm border border-[color:var(--border-subtle)] px-4 py-3 text-[0.75rem] text-[color:var(--text-body)] leading-snug shadow-md"
        >
          <p className="font-semibold text-[color:var(--text-heading)]">{projectCaption.title}</p>
          <p className="text-[color:var(--text-muted)]">{projectCaption.locality}</p>
          <p className="text-[color:var(--text-muted)] mt-0.5">{projectCaption.materials}</p>
        </div>
      )}
    </section>
  );
}
