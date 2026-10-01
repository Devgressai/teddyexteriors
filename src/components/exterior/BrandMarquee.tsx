"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/primitives";
import { confirmedBrands, type InstalledBrand } from "@/content-model/brands";

export type BrandMarqueeProps = {
  eyebrow?: string;
  heading?: string;
  speedSec?: number;
};

/**
 * Infinite right-to-left logo marquee. Pure CSS translateX animation on a doubled list for
 * seamless looping. Pauses on hover and under `prefers-reduced-motion: reduce`.
 *
 * Logo assets live in `/public/images/brands/`. When a brand's SVG isn't present, the slot
 * renders a Fraunces display wordmark fallback so the row stays coherent before the licensed
 * manufacturer assets arrive. See `/public/images/brands/README.md` for sourcing rules.
 */
export function BrandMarquee({
  eyebrow = "Brands we install",
  heading,
  speedSec = 42,
}: BrandMarqueeProps) {
  const brands = confirmedBrands();
  const [missingLogos, setMissingLogos] = useState<Set<string>>(new Set());

  // Probe for the logo files on mount. Any that 404 fall back to the wordmark.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const checks = await Promise.all(
        brands.map(async (b) => {
          if (!b.logo) return b.slug;
          try {
            const res = await fetch(b.logo, { method: "HEAD" });
            return res.ok ? null : b.slug;
          } catch {
            return b.slug;
          }
        }),
      );
      if (cancelled) return;
      const missing = new Set(checks.filter((s): s is string => s !== null));
      setMissingLogos(missing);
    })();
    return () => {
      cancelled = true;
    };
  }, [brands]);

  if (brands.length === 0) return null;

  // Double the list for a seamless loop
  const loop = [...brands, ...brands];

  return (
    <section
      aria-label="Manufacturer brands we install"
      className="border-y border-[color:var(--border-subtle)] overflow-hidden"
    >
      {(eyebrow || heading) && (
        <Container width="wide">
          <div className="pt-10 pb-6 lg:pt-14 lg:pb-8 text-center">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {heading && (
              <h2 className="mt-3 editorial-h2 max-w-[32ch] mx-auto">{heading}</h2>
            )}
          </div>
        </Container>
      )}
      <div
        className="brand-marquee relative py-8 lg:py-10"
        role="list"
        aria-roledescription="Scrolling list of manufacturer brands"
      >
        <ul
          className="brand-marquee-track flex items-center gap-14 lg:gap-20"
          style={{ animationDuration: `${speedSec}s` }}
        >
          {loop.map((brand, i) => (
            <BrandSlot
              key={`${brand.slug}-${i}`}
              brand={brand}
              fallback={missingLogos.has(brand.slug) || !brand.logo}
              ariaHidden={i >= brands.length}
            />
          ))}
        </ul>
      </div>
      <style jsx>{`
        .brand-marquee::before,
        .brand-marquee::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          pointer-events: none;
          z-index: 1;
        }
        .brand-marquee::before {
          left: 0;
          background: linear-gradient(
            to right,
            var(--surface-paper) 10%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        .brand-marquee::after {
          right: 0;
          background: linear-gradient(
            to left,
            var(--surface-paper) 10%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        .brand-marquee-track {
          width: max-content;
          animation-name: brand-marquee-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .brand-marquee:hover .brand-marquee-track {
          animation-play-state: paused;
        }
        @keyframes brand-marquee-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-marquee-track {
            animation: none;
            flex-wrap: wrap;
            width: 100%;
            justify-content: center;
          }
          .brand-marquee::before,
          .brand-marquee::after {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

function BrandSlot({
  brand,
  fallback,
  ariaHidden,
}: {
  brand: InstalledBrand;
  fallback: boolean;
  ariaHidden: boolean;
}) {
  const slotHeight = 44;
  const slotWidth = Math.round(slotHeight * brand.aspectRatio);
  return (
    <li
      role="listitem"
      aria-hidden={ariaHidden ? "true" : undefined}
      className="shrink-0 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
      style={{ width: `${slotWidth}px`, height: `${slotHeight}px` }}
    >
      {!fallback && brand.logo ? (
        <Image
          src={brand.logo}
          alt={`${brand.name} logo`}
          width={slotWidth}
          height={slotHeight}
          sizes={`${slotWidth}px`}
          className="h-full w-auto object-contain"
          unoptimized
        />
      ) : (
        <span
          className="editorial-h3 text-[color:var(--ink-tertiary)] font-normal italic"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {brand.name}
        </span>
      )}
    </li>
  );
}
