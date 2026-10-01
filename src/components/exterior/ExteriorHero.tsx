import Image from "next/image";
import Link from "next/link";
import type { ExteriorHeroProps } from "./types";

export function ExteriorHero({
  eyebrow,
  h1Line1,
  h1Line2,
  supporting,
  primaryCta,
  secondaryCta,
  image,
  caption,
}: ExteriorHeroProps) {
  return (
    <section className="relative bg-[color:var(--surface-warm)]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <p className="text-xs tracking-[0.14em] uppercase font-semibold text-[color:var(--cta-fill)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-[color:var(--text-primary)]">
            <span className="block">{h1Line1}</span>
            {h1Line2 && <span className="block">{h1Line2}</span>}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--text-secondary)] max-w-xl">
            {supporting}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center rounded-md bg-[color:var(--cta-fill)] px-5 py-3 text-base font-semibold text-[color:var(--cta-text)] hover:brightness-95"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center text-base font-semibold text-[color:var(--text-primary)] underline underline-offset-4 hover:text-[color:var(--cta-fill)]"
              >
                {secondaryCta.label} <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            )}
          </div>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2">
          <figure>
            <div className="relative aspect-[4/3] lg:aspect-[16/11] overflow-hidden rounded-md bg-[color:var(--border-subtle)]/40">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>
            {caption && (
              <figcaption className="mt-3 text-xs text-[color:var(--text-secondary)]">
                <span className="font-semibold text-[color:var(--text-primary)]">{caption.cityState}</span>
                <span className="mx-2 opacity-60">·</span>
                <span>{caption.material}</span>
                <span className="mx-2 opacity-60">·</span>
                <span>{caption.scope}</span>
              </figcaption>
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
