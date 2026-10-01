import type { Metadata } from "next";
import {
  ExteriorHeader,
  ExteriorHero,
  CredentialRail,
  ServiceExplorer,
  ProjectFeature,
  BeforeAfter,
  EnvelopeDetail,
  MaterialCompare,
  RegionalCoverage,
  ProcessStory,
  TeamProof,
  ResourceFeature,
  EstimateSection,
  ExteriorFooter,
} from "@/components/exterior";

export const metadata: Metadata = {
  title: "Component showcase — private",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Private component showcase. Noindexed, not linked in production nav, excluded from sitemap.
 * Realistic long/short copy, missing optional images, validation states, focus states, mobile examples.
 * Changes to a shared token/component should propagate here consistently.
 */
export default function ShowcasePage() {
  const img = (src: string, alt: string) => ({ src, alt, width: 1600, height: 1100, rights: "inspiration-only" as const });
  return (
    <>
      <ExteriorHeader
        brandName="Showcase"
        regionSummary="Private — not for production"
        waCredentialNumber="WA-SAMPLE-00000"
        orCredentialNumber="OR-SAMPLE-00000"
        phone="(360) 555-0100"
        nav={[
          { label: "Services", href: "#services" },
          { label: "Our Work", href: "#work" },
          { label: "Materials", href: "#materials" },
          { label: "Service Areas", href: "#areas" },
          { label: "About", href: "#about" },
        ]}
      />
      <ExteriorHero
        eyebrow="Showcase · Hero"
        h1Line1="Beautiful Exteriors."
        h1Line2="Built for Northwest Weather."
        supporting="Representative hero copy with a composed image, factual caption, and both CTAs."
        primaryCta={{ label: "Get My Exterior Estimate", href: "#estimate" }}
        secondaryCta={{ label: "Explore Our Projects", href: "#work" }}
        image={img("/images/hero-placeholder.jpg", "Pacific Northwest exterior")}
        caption={{ cityState: "Camas, WA", material: "James Hardie HZ10 lap siding", scope: "Full re-side + flashing" }}
      />
      <CredentialRail
        items={[
          { label: "Washington L&I", value: "WA-SAMPLE-00000", sourceNote: "Verify at L&I" },
          { label: "Oregon CCB", value: "OR-SAMPLE-00000", sourceNote: "Verify at CCB" },
          { label: "Workmanship warranty", value: "3-year written" },
          { label: "Serving", value: "SW WA & NW OR" },
        ]}
      />
      <ServiceExplorer
        heading="What would you like to improve?"
        entries={[
          { slug: "siding", title: "Siding replacement", description: "Update the exterior and address what needs attention behind the old cladding.", image: img("/images/svc-siding.jpg", "Siding"), href: "#", emphasis: "lead" },
          { slug: "windows", title: "Window replacement", description: "Improve look and performance with installation suited to the home.", image: img("/images/svc-windows.jpg", "Windows"), href: "#" },
          { slug: "paint", title: "Exterior painting", description: "Refresh existing surfaces with proper prep and a suitable coating system.", image: img("/images/svc-paint.jpg", "Paint"), href: "#" },
          { slug: "trim", title: "Gutters, soffits & fascia", description: "Address roof-edge drainage, damaged trim, and related exterior details.", image: img("/images/svc-trim.jpg", "Trim"), href: "#" },
        ]}
      />
      <ProjectFeature
        title="Camas residence re-side"
        cityState="Camas, WA"
        challenge="Weathered T1-11 with hidden rot behind trim corners and under sill flashing."
        work="Full tear-off, sheathing repair, Tyvek + head/jamb/sill flashing, HZ10 lap siding."
        finish="James Hardie HZ10 lap siding, 7-inch exposure, Iron Gray."
        images={{ after: img("/images/project-after.jpg", "Finished re-side") }}
        href="#"
      />
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-2xl font-semibold mb-6">Before/After component (slider mode)</h2>
          <BeforeAfter
            before={img("/images/project-before.jpg", "Before: weathered siding")}
            after={img("/images/project-after.jpg", "After: new HZ10 lap siding")}
            label="Camas residence — before & after"
          />
        </div>
      </section>
      <EnvelopeDetail
        heading="A great exterior starts behind the finish."
        intro="A refreshed exterior lasts when the layers behind it are correct."
        points={[
          { label: "Existing-wall assessment", description: "Document conditions behind old siding." },
          { label: "Substrate repairs", description: "Replace rotted sheathing and correct framing." },
          { label: "WRB & flashing", description: "Integrate WRB and head/jamb/sill flashing." },
          { label: "Product-specific installation", description: "Follow manufacturer fastener/spacing/seam requirements." },
        ]}
        links={[{ label: "How we install siding", href: "#" }, { label: "Flashing & moisture", href: "#" }]}
      />
      <MaterialCompare
        heading="Choose the right look — and the right system."
        entries={[
          { slug: "hardie", product: "James Hardie fiber cement", look: "Crisp, painted, decades-proven in the PNW.", maintenance: "Repaint every 10–15 years; replace caulk as needed.", fit: "Most styles; HZ10 formulation for Northwest.", image: img("/images/mat-hardie.jpg", "Hardie close-up"), href: "#" },
          { slug: "lp", product: "LP SmartSide", look: "Deep woodgrain or smooth; prefinished options.", maintenance: "Repaint on manufacturer schedule.", fit: "Craftsman, farmhouse, cottage styles.", image: img("/images/mat-lp.jpg", "LP close-up"), href: "#" },
          { slug: "cedar", product: "Cedar", look: "Natural grain; shingle or lap profiles.", maintenance: "Annual inspection; stain or paint cycle.", fit: "Where authentic wood is required.", image: img("/images/mat-cedar.jpg", "Cedar close-up"), href: "#" },
        ]}
        compareHref="#"
      />
      <RegionalCoverage
        heading="Your exterior team across Vancouver, Portland & nearby communities."
        groups={[
          {
            stateLabel: "Southwest Washington",
            stateHref: "#",
            cities: [
              { name: "Vancouver", href: "#" },
              { name: "Camas", href: "#" },
              { name: "Washougal", href: "#" },
              { name: "Ridgefield", href: "#" },
              { name: "Battle Ground", href: "#" },
            ],
          },
          {
            stateLabel: "Portland Metro, Oregon",
            stateHref: "#",
            cities: [
              { name: "Portland", href: "#" },
              { name: "Beaverton", href: "#" },
              { name: "Lake Oswego", href: "#" },
              { name: "Hillsboro", href: "#" },
              { name: "Happy Valley", href: "#" },
            ],
          },
        ]}
      />
      <ProcessStory
        heading="Know what happens before work begins."
        steps={[
          { number: "01", title: "Tell us about your home", description: "Share your goals, location, and the work you're considering." },
          { number: "02", title: "Assess the exterior", description: "Review existing conditions and discuss appropriate options." },
          { number: "03", title: "Review the written scope", description: "Understand proposed materials, work, exclusions, and next steps." },
          { number: "04", title: "Build and walk through", description: "Follow the agreed construction process and review the completed work." },
        ]}
      />
      <TeamProof
        heading="Real people. Clear communication."
        intro="A named project lead on every job."
        people={[
          { name: "Sample Lead", role: "Project manager" },
          { name: "Sample Estimator", role: "Senior estimator" },
        ]}
        testimonials={[
          { quote: "Clear scope and no surprises — change-order process was in writing.", attribution: "Representative customer comment", topic: "scope-change" },
          { quote: "Clean jobsite every evening; crew was easy to talk to.", attribution: "Representative customer comment", topic: "cleanup" },
        ]}
        teamHref="#"
        reviewsHref="#"
      />
      <ResourceFeature
        heading="Make your next exterior decision with confidence."
        featured={{ slug: "feat", title: "Repair or Replace Your Siding?", summary: "Which clues point to a localized repair, and which point to full replacement.", href: "#" }}
        supporting={[
          { slug: "a", title: "Comparing siding materials for Northwest homes", summary: "Fiber cement, LP SmartSide, cedar, and more.", href: "#" },
          { slug: "b", title: "What to ask before hiring an exterior contractor", summary: "Credentials, scope, warranty.", href: "#" },
          { slug: "c", title: "Planning siding and windows together", summary: "When sequencing saves on scaffolding and flashing.", href: "#" },
        ]}
      />
      <EstimateSection
        heading="Let's plan an exterior you'll feel good coming home to."
        supporting="Tell us what you're considering and where your home is located."
        phone="(360) 555-0100"
        responseCommitment=""
      />
      <ExteriorFooter
        brandName="Showcase"
        statement="Siding, windows, and exterior renovation."
        phone="(360) 555-0100"
        email="hello@example.com"
        hours="Mon–Fri, 8 a.m. – 5 p.m."
        waCredentialNumber="WA-SAMPLE-00000"
        orCredentialNumber="OR-SAMPLE-00000"
        services={[
          { label: "Siding replacement", href: "#" },
          { label: "Window replacement", href: "#" },
          { label: "Exterior painting", href: "#" },
        ]}
        stateHubs={[
          { label: "Washington", href: "#" },
          { label: "Oregon", href: "#" },
        ]}
        trust={[
          { label: "About", href: "#" },
          { label: "Team", href: "#" },
          { label: "Credentials", href: "#" },
        ]}
        policies={[
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
        ]}
      />
    </>
  );
}
