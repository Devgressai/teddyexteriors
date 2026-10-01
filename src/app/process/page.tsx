import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ProcessStory } from "@/components/exterior";

export const metadata: Metadata = {
  title: "Process",
  description: "How a project goes from first conversation to final walk.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Process", path: "/process" }]}
      eyebrow="Process"
      heading="From first conversation to the final walk."
      intro="A written scope with inclusions, exclusions, and allowances in advance; written change orders during construction; a punch walk before final payment."
    >
      <ProcessStory
        heading="Four phases."
        steps={[
          { number: "01", title: "Tell us about your home", description: "Share goals, location, and the work you're considering. We'll clarify scope and set up an on-site visit." },
          { number: "02", title: "Assess the exterior", description: "Document existing conditions behind siding, around windows, at eaves, and at the base of walls. Options get discussed with you, not decided for you." },
          { number: "03", title: "Review the written scope", description: "Written scope with inclusions, exclusions, and allowances for conditions that only become visible during tear-off. Change orders are issued in writing." },
          { number: "04", title: "Build and walk through", description: "Daily jobsite cleanup. A named project lead available for questions. A finish walk before final payment." },
        ]}
      />
    </PageShell>
  );
}
