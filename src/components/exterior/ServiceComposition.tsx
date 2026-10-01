import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/primitives";
import { SecondaryCTA } from "@/components/primitives/CTA";
import type { ImageAsset } from "@/content-model/types";

export type ServiceCard = {
  slug: string;
  label: string;
  headline: string;
  description: string;
  href: string;
  image: ImageAsset;
};

export type ServiceCompositionProps = {
  eyebrow: string;
  heading: string;
  intro: string;
  viewAllHref: string;
  cards: ServiceCard[];
};

/**
 * Editorial service row — eyebrow + headline + intro + CTA on the left; four image-led
 * service cards on the right. Each card has a distinct photographic subject (not icons)
 * so the services differentiate visually, not just by text label.
 *
 * Mirrors the mockup brief: Siding / Windows / Gutters / Soffit & Fascia.
 */
export function ServiceComposition({ eyebrow, heading, intro, viewAllHref, cards }: ServiceCompositionProps) {
  if (cards.length === 0) return null;
  return (
    <Section surface="warm" pad="lg" ariaLabel="Services">
      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          <header className="lg:col-span-3">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-5 editorial-h2 border-t border-[color:var(--border-subtle)] pt-5">{heading}</h2>
            <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed">{intro}</p>
            <SecondaryCTA href={viewAllHref} size="sm" className="mt-6 border border-[color:var(--ink-emphasis)] px-5 py-2.5">
              View All Services
            </SecondaryCTA>
          </header>
          <ul className="lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card) => (
              <li key={card.slug}>
                <Link href={card.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[color:var(--surface-mist)]">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="eyebrow text-[0.65rem]">{card.label}</p>
                    <h3 className="mt-2 text-[1.0625rem] font-semibold leading-snug text-[color:var(--ink-emphasis)]">
                      {card.headline}
                    </h3>
                    <p className="mt-2 text-[0.85rem] text-[color:var(--ink-secondary)] leading-relaxed">
                      {card.description}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--border-subtle)] text-[color:var(--ink-emphasis)] group-hover:border-[color:var(--brand-cta)] group-hover:text-[color:var(--brand-cta)] transition-colors"
                    >
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5">
                        <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
