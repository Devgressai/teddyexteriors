import Link from "next/link";
import type { EnvelopeDetailProps } from "./types";

/**
 * Signature technical section (spec §06). Large diagram or installation photo on one side,
 * concise explanations on the other. Explain what photographs cannot show.
 */
export function EnvelopeDetail({ heading, intro, points, diagram, links }: EnvelopeDetailProps) {
  return (
    <section className="bg-[color:var(--surface-inverse)] text-[color:var(--ink-inverse)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24 grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-6">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{heading}</h2>
          <p className="mt-5 text-base/relaxed opacity-90 max-w-xl">{intro}</p>
          <dl className="mt-8 space-y-5">
            {points.map((p, i) => (
              <div key={i} className="border-l-2 border-[color:var(--brand-secondary)] pl-4">
                <dt className="text-sm font-semibold text-[color:var(--brand-secondary)]">{p.label}</dt>
                <dd className="mt-1 text-sm opacity-90">{p.description}</dd>
              </div>
            ))}
          </dl>
          {links.length > 0 && (
            <nav aria-label="Related guides" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm font-semibold underline underline-offset-4 hover:text-[color:var(--brand-secondary)]">
                  {l.label} <span aria-hidden="true">→</span>
                </Link>
              ))}
            </nav>
          )}
        </div>
        <div className="lg:col-span-6">
          {diagram ?? (
            <div className="aspect-[4/5] rounded-md border border-white/15 bg-black/20 grid place-items-center text-xs opacity-60">
              Wall-section SVG / annotated installation photo
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
