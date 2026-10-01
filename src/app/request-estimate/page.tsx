import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { EstimateSection } from "@/components/exterior";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Request an Exterior Evaluation — Teddy Exteriors Vancouver, WA / Portland, OR",
  description:
    "Share your project, location, and preferred contact method. A person reads every submission and follows up — no automated pricing, no sales pressure. Serving Vancouver, WA and Portland, OR.",
  alternates: { canonical: "/request-estimate" },
  openGraph: {
    type: "article",
    title: "Request an Exterior Evaluation",
    description:
      "A person reads every submission and follows up. No automated pricing.",
    url: "/request-estimate",
  },
};

export default function RequestEstimatePage() {
  const phone = get<string>("contact.phone") ?? undefined;
  const waLni = get<string>("credentials.waLniNumber");
  const orCcb = get<string>("credentials.orCcbNumber");
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Request estimate", path: "/request-estimate" }]}
      eyebrow="Request an evaluation"
      heading="Tell us about your home."
      intro="Share the work you're considering, where the property is, and how you want to be reached. A person reads every submission and follows up — no automated pricing engine, no sales call sequence."
    >
      <section className="bg-[color:var(--surface-stone)] border-y border-[color:var(--border-subtle)]" aria-label="What to expect">
        <div className="mx-auto max-w-5xl px-6 py-10 grid gap-6 sm:grid-cols-3 text-[0.85rem] text-[color:var(--ink-secondary)]">
          <div>
            <p className="eyebrow">Takes</p>
            <p className="mt-2 text-[0.95rem] text-[color:var(--ink-emphasis)] font-semibold">About 60 seconds.</p>
          </div>
          <div>
            <p className="eyebrow">Follow-up by</p>
            <p className="mt-2 text-[0.95rem] text-[color:var(--ink-emphasis)] font-semibold">Your preferred method.</p>
          </div>
          <div>
            <p className="eyebrow">On-site visit</p>
            <p className="mt-2 text-[0.95rem] text-[color:var(--ink-emphasis)] font-semibold">
              If scope warrants it.
            </p>
          </div>
        </div>
      </section>
      <EstimateSection
        heading="Let's plan your exterior."
        supporting="A short description helps us prepare for the on-site visit. Everything is reviewed by a person — no automated price quote."
        phone={phone}
      />
      {(waLni || orCcb) && (
        <section className="bg-[color:var(--surface-paper)]" aria-label="Verified credentials">
          <div className="mx-auto max-w-5xl px-6 py-10 flex flex-wrap items-center justify-between gap-6">
            <p className="eyebrow">Verified credentials</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[0.85rem] text-[color:var(--ink-secondary)]">
              {waLni && (
                <span>
                  WA L&amp;I <strong className="text-[color:var(--ink-emphasis)]">{waLni}</strong>
                </span>
              )}
              {orCcb && (
                <span>
                  OR CCB <strong className="text-[color:var(--ink-emphasis)]">{orCcb}</strong>
                </span>
              )}
              <span className="text-[color:var(--ink-tertiary)]">
                A brand of JDI Construction, Vancouver, WA
              </span>
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
