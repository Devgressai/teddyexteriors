import { JsonLd } from "../JsonLd";
import { faqSchema } from "@/lib/schema";

export type ExteriorFaqProps = {
  heading?: string;
  intro?: string;
  items: { q: string; a: string }[];
  emitSchema?: boolean;
};

/**
 * Semantic FAQ list with optional FAQPage JSON-LD. Content is server-rendered (not hidden
 * in collapsed accordions behind JS) so answers are discoverable by crawlers and users
 * who have JS disabled or styles failing to load.
 */
export function ExteriorFaq({ heading = "Questions before you get started?", intro, items, emitSchema = true }: ExteriorFaqProps) {
  if (items.length === 0) return null;
  return (
    <section className="bg-[color:var(--surface-warm)]">
      {emitSchema && <JsonLd data={faqSchema(items)} />}
      <div className="mx-auto max-w-5xl px-6 py-20 lg:py-24">
        <header className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--ink-primary)]">
            {heading}
          </h2>
          {intro && <p className="mt-4 text-base text-[color:var(--ink-secondary)]">{intro}</p>}
        </header>
        <dl className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {items.map((item) => (
            <div key={item.q} className="border-l-2 border-[color:var(--brand-secondary)] pl-5">
              <dt className="text-base font-semibold text-[color:var(--ink-primary)]">{item.q}</dt>
              <dd className="mt-2 text-sm text-[color:var(--ink-secondary)] leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
