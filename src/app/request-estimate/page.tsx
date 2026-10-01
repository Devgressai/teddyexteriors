import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { EstimateSection } from "@/components/exterior";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Request an estimate",
  description: "Tell us about your home and the work you're considering.",
  alternates: { canonical: "/request-estimate" },
};

export default function RequestEstimatePage() {
  const phone = get<string>("contact.phone") ?? undefined;
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Request estimate", path: "/request-estimate" }]}
      eyebrow="Request an estimate"
      heading="Tell us about your home."
      intro="Share the work you're considering and where your home is located. We'll follow up to confirm next steps and schedule an on-site visit if appropriate."
    >
      <EstimateSection
        heading="Let's plan your project."
        supporting="A short description helps us prepare for the on-site visit. Everything is reviewed by a person."
        phone={phone}
      />
    </PageShell>
  );
}
