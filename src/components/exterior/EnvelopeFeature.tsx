import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/primitives";
import { WallSectionDiagram } from "./WallSectionDiagram";
import type { ImageAsset } from "@/content-model/types";

export type EnvelopeFeatureProps = {
  eyebrow: string;
  headline: { pre: string; italic?: string };
  intro: string;
  closingHeading: string;
  closingBody: string;
  detailImage: ImageAsset;
  learnMoreHref: string;
  exploreHref: string;
};

/**
 * Section 06 — Teddy's signature building-science differentiator.
 * Deep evergreen band. Left: eyebrow + headline + intro + CTA. Center: original SVG
 * wall-section diagram with labels. Right: an evocative atmospheric image + closing text.
 *
 * Matches the mockup: "A GREAT EXTERIOR STARTS BEHIND THE FINISH" eyebrow,
 * "What you don't see matters most." headline with italic emphasis,
 * annotated wall section with SIDING / RAINSCREEN / WRB / SHEATHING / FLASHING / INSULATION / FRAMING labels.
 */
export function EnvelopeFeature({
  eyebrow,
  headline,
  intro,
  closingHeading,
  closingBody,
  detailImage,
  learnMoreHref,
  exploreHref,
}: EnvelopeFeatureProps) {
  return (
    <Section surface="inverse" pad="xl" ariaLabel="Our building-science approach">
      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 items-start">
          {/* Left — editorial copy */}
          <div className="lg:col-span-4">
            <p className="eyebrow eyebrow-inverse">{eyebrow}</p>
            <h2 className="mt-6 editorial-h1 text-[color:var(--ink-inverse)] max-w-[14ch]">
              {headline.pre}{" "}
              {headline.italic && <span className="editorial-italic">{headline.italic}</span>}
              <span className="block">matters most.</span>
            </h2>
            <p className="mt-6 text-[0.95rem] text-white/80 leading-relaxed max-w-[42ch]">{intro}</p>
            <Link
              href={learnMoreHref}
              className="group mt-7 inline-flex items-center gap-3 rounded-sm bg-[color:var(--surface-paper)] px-5 py-3 text-[0.9rem] font-semibold text-[color:var(--ink-emphasis)] hover:bg-[color:var(--surface-warm)] transition-colors"
            >
              Learn About Our Approach
              <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </Link>
          </div>

          {/* Center — the diagram */}
          <div className="lg:col-span-5">
            <WallSectionDiagram />
          </div>

          {/* Right — atmospheric detail image + closing editorial */}
          <aside className="lg:col-span-3 flex flex-col gap-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10">
              <Image
                src={detailImage.src}
                alt={detailImage.alt}
                fill
                sizes="(min-width: 1024px) 24vw, 90vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow eyebrow-inverse">{closingHeading}</p>
              <p className="mt-3 text-[0.85rem] text-white/80 leading-relaxed">{closingBody}</p>
              <Link
                href={exploreHref}
                className="group mt-4 inline-flex items-center gap-2 text-[0.85rem] font-semibold text-white hover:text-[color:var(--brand-secondary)]"
              >
                Explore Our Building Science Approach
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                  <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                </svg>
              </Link>
            </div>
            <p className="eyebrow eyebrow-inverse text-right mt-2">BUILT FOR<br/>NORTHWEST<br/>WEATHER</p>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
