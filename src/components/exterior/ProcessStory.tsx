import Image from "next/image";
import type { ProcessStoryProps } from "./types";

/**
 * Horizontal sequence on desktop, vertical on mobile. Numbered typography, not identical boxes.
 */
export function ProcessStory({ heading, steps, closing }: ProcessStoryProps) {
  return (
    <section className="bg-[color:var(--surface-paper)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--ink-primary)] max-w-2xl">
          {heading}
        </h2>
        <ol className="mt-12 grid gap-10 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={i} className="relative">
              {step.image && (
                <div className="relative aspect-[4/3] mb-5 overflow-hidden rounded-md bg-[color:var(--border-subtle)]/40">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <span className="block text-4xl font-semibold text-[color:var(--brand-secondary)] leading-none">
                {step.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-[color:var(--ink-primary)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--ink-secondary)]">{step.description}</p>
            </li>
          ))}
        </ol>
        {closing && <p className="mt-10 text-sm text-[color:var(--ink-secondary)] max-w-2xl">{closing}</p>}
      </div>
    </section>
  );
}
