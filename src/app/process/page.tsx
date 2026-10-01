import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ProcessTimeline, EstimateSection } from "@/components/exterior";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Our Process — From First Walk to Finish Walk",
  description:
    "How a Teddy Exteriors project runs from first conversation to the final walk — written scope, in-house crews, documented change orders, and envelope-first construction.",
  alternates: { canonical: "/process" },
  openGraph: {
    type: "article",
    title: "Our Process — From First Walk to Finish Walk",
    description:
      "Four phases from the first conversation to the final walk. Written scope and documented change orders throughout.",
    url: "/process",
  },
};

export default function ProcessPage() {
  const phone = get<string>("contact.phone") ?? undefined;
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Process", path: "/process" }]}
      eyebrow="Process"
      heading="From first conversation to the final walk."
      intro="A written scope with inclusions, exclusions, and allowances in advance; written change orders during construction; a punch walk before final payment. Four phases, documented throughout."
    >
      <ProcessTimeline
        eyebrow="Four phases"
        heading="Documented at every step."
        intro="You should always know what phase your project is in, what we're doing, and what happens next. No ambiguity, no verbal change orders, no finish walks skipped."
        steps={[
          {
            number: "01",
            title: "Walk the exterior with us",
            body:
              "On-site assessment of existing conditions. We open representative sections where envelope remediation is in scope and document what's behind the siding before we quote.",
          },
          {
            number: "02",
            title: "Review the written scope",
            body:
              "Written estimate with inclusions, exclusions, and conditions-revealed allowances. Material selections documented. Timeline and sequencing confirmed before you sign.",
          },
          {
            number: "03",
            title: "Build with in-house crews",
            body:
              "The crew that estimated your project builds it. Daily jobsite cleanup. Walls dried-in every night. Change orders issued in writing before they're installed.",
          },
          {
            number: "04",
            title: "Finish walk + warranty record",
            body:
              "A walk-the-exterior-together inspection before final payment. Punch items corrected. Installed-material documentation delivered for your records and future warranty claims.",
          },
        ]}
      />
      <EstimateSection
        heading="Start the first phase."
        supporting="A conversation about your home, with no pressure and no automated pricing. Tell us what you're considering."
        phone={phone}
      />
    </PageShell>
  );
}
