import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What we collect, why, and how it's used.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]}
      eyebrow="Policy"
      heading="Privacy."
      intro="Operational draft. Final policy publishes once legal review is complete and consent requirements for the lead-destination CRM are confirmed."
    >
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-3xl px-6 py-16 prose">
          <h2>What we collect</h2>
          <p>When you request an estimate, we collect the name and contact details you share, the city or ZIP you provide, the service of interest, and the description you write.</p>
          <h2>Why</h2>
          <p>To respond to your enquiry and prepare for a possible on-site visit. We don't sell this information.</p>
          <h2>Who sees it</h2>
          <p>Our estimators and project leads. The destination CRM used for lead handling is identified during intake once confirmed.</p>
          <h2>Analytics</h2>
          <p>We measure aggregate site usage (pages, events) to improve the site. Personal information is not sent to analytics in form payloads or URLs.</p>
          <h2>Contact</h2>
          <p>Email us using the address on <a href="/contact">/contact</a>.</p>
        </div>
      </section>
    </PageShell>
  );
}
