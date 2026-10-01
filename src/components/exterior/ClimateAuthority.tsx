import { Container, Section } from "@/components/primitives";

export type ClimateAuthorityProps = {
  eyebrow: string;
  heading: string;
  body: string[];
  rules: { title: string; body: string }[];
};

/**
 * Pacific Northwest regional-authority section. Editorial essay on the left,
 * three "rules for building here" on the right. No stock mountain graphics,
 * no fir-tree icons.
 */
export function ClimateAuthority({ eyebrow, heading, body, rules }: ClimateAuthorityProps) {
  return (
    <Section surface="mist" pad="lg" ariaLabel="Pacific Northwest exterior work">
      <Container width="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-5 editorial-h2 max-w-[20ch]">{heading}</h2>
            <div className="mt-7 space-y-4 text-[0.98rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[52ch]">
              {body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-sm border-l-2 border-[color:var(--brand-cta)] bg-[color:var(--surface-paper)] p-8 lg:p-10 shadow-[0_2px_8px_rgba(18,61,42,0.06)]">
              <p className="eyebrow">Our rules for building here</p>
              <ol className="mt-6 space-y-6">
                {rules.map((rule, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="text-[0.72rem] font-semibold tracking-widest text-[color:var(--accent-cedar)] mt-1.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[0.98rem] font-semibold text-[color:var(--ink-emphasis)]">
                        {rule.title}
                      </h3>
                      <p className="mt-1 text-[0.85rem] text-[color:var(--ink-secondary)] leading-relaxed">
                        {rule.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
