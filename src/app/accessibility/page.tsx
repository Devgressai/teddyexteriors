import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "How we approach accessibility and how to report an issue.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Accessibility", path: "/accessibility" }]}
      eyebrow="Policy"
      heading="Accessibility."
      intro="This site targets WCAG 2.2 AA. If you encounter a problem, we'd like to know."
    >
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-3xl px-6 py-16 prose">
          <h2>Standards</h2>
          <p>
            We design and build to WCAG 2.2 AA: semantic landmarks, keyboard support, visible focus,
            contrast, reduced-motion handling, accessible form errors, and usable touch targets.
          </p>
          <h2>What's exempted</h2>
          <p>
            Third-party embeds (maps, review widgets) may not meet the same bar. We flag these and
            include a text-based alternative where possible.
          </p>
          <h2>Report an issue</h2>
          <p>Email the address on <a href="/contact">/contact</a> and we'll respond.</p>
        </div>
      </section>
    </PageShell>
  );
}
