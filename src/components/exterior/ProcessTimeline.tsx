import { Container, Section } from "@/components/primitives";

export type ProcessTimelineStep = {
  number: string;
  title: string;
  body: string;
};

export type ProcessTimelineProps = {
  eyebrow: string;
  heading: string;
  intro: string;
  steps: ProcessTimelineStep[];
  closing?: string;
};

/**
 * Horizontal editorial timeline. One continuous ruled line connects numbered waypoints
 * on desktop; the line rotates vertical on mobile so dots align on the left.
 * Explicitly not four identical numbered cards.
 */
export function ProcessTimeline({ eyebrow, heading, intro, steps, closing }: ProcessTimelineProps) {
  return (
    <Section surface="paper" pad="lg" ariaLabel="Our process">
      <Container width="wide">
        <header className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="mt-5 editorial-h2 max-w-[20ch]">{heading}</h2>
          <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[48ch]">
            {intro}
          </p>
        </header>
        <ol
          className="mt-14 relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6"
          role="list"
        >
          {/* Horizontal ruled line (desktop only) */}
          <span
            aria-hidden="true"
            className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-[color:var(--border-subtle)]"
          />
          {/* Vertical ruled line (mobile only) */}
          <span
            aria-hidden="true"
            className="md:hidden absolute top-0 bottom-0 left-[9px] w-px bg-[color:var(--border-subtle)]"
          />
          {steps.map((step, i) => (
            <li key={step.number} className="relative pl-7 md:pl-0 md:text-left">
              {/* Dot */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 md:top-3 md:left-1/2 md:-translate-x-1/2 h-4 w-4 rounded-full border-2 border-[color:var(--brand-cta)] bg-[color:var(--surface-paper)]"
              />
              <div className="md:text-center md:flex md:flex-col md:items-center">
                <p className="md:mt-10 editorial-italic-dark text-[0.95rem] font-semibold tracking-widest">
                  {step.number}
                </p>
                <h3 className="mt-2 md:mt-3 editorial-h3 max-w-[20ch]">{step.title}</h3>
                <p className="mt-2 text-[0.875rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[26ch]">
                  {step.body}
                </p>
              </div>
              {/* Mobile-only connector adjustment handled above */}
              {i === steps.length - 1 ? null : null}
            </li>
          ))}
        </ol>
        {closing && (
          <p className="mt-14 text-[0.9rem] text-[color:var(--ink-secondary)] max-w-[60ch]">{closing}</p>
        )}
      </Container>
    </Section>
  );
}
