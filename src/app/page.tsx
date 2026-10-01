import {
  ExteriorHero,
  CredentialRail,
  ServiceExplorer,
  EnvelopeDetail,
  MaterialCompare,
  RegionalCoverage,
  ProcessStory,
  TeamProof,
  ResourceFeature,
  EstimateSection,
  type CredentialRailItem,
  type ServiceExplorerEntry,
  type MaterialCompareEntry,
  type RegionalCoverageGroup,
  type ProcessStoryStep,
  type ResourceFeatureGuide,
} from "@/components/exterior";
import { get } from "@/lib/business";

export default function HomePage() {
  const phone = get<string>("contact.phone") ?? undefined;
  const waLni = get<string>("credentials.waLniNumber") ?? undefined;
  const orCcb = get<string>("credentials.orCcbNumber") ?? undefined;

  const credentialItems: CredentialRailItem[] = [];
  if (waLni) credentialItems.push({ label: "Washington L&I", value: waLni, href: "/credentials", sourceNote: "Verify at L&I" });
  if (orCcb) credentialItems.push({ label: "Oregon CCB", value: orCcb, href: "/credentials", sourceNote: "Verify at CCB" });

  const serviceEntries: ServiceExplorerEntry[] = [];
  const materials: MaterialCompareEntry[] = [];
  const coverage: RegionalCoverageGroup[] = [];

  const processSteps: ProcessStoryStep[] = [
    { number: "01", title: "Tell us about your home", description: "Share your goals, location, and the work you're considering." },
    { number: "02", title: "Assess the exterior", description: "Review existing conditions and discuss appropriate options." },
    { number: "03", title: "Review the written scope", description: "Understand proposed materials, work, exclusions, and next steps." },
    { number: "04", title: "Build and walk through", description: "Follow the agreed construction process and review the completed work." },
  ];

  const resourceFeatured: ResourceFeatureGuide = {
    slug: "repair-or-replace-siding",
    title: "Repair or Replace Your Siding?",
    summary: "Which clues point to a localized repair, and which point to full replacement in Pacific Northwest conditions.",
    href: "/resources/pacific-northwest-siding/repair-or-replace",
  };
  const resourceSupporting: ResourceFeatureGuide[] = [
    { slug: "comparing-siding-materials-nw", title: "Comparing Siding Materials for Northwest Homes", summary: "Fiber cement, LP SmartSide, wood, and other systems — how to choose for the climate and the house.", href: "/resources/pacific-northwest-siding/comparing-materials" },
    { slug: "ask-before-hiring", title: "What to Ask Before Hiring an Exterior Contractor", summary: "Credential verification, written scope, and warranty vs product coverage.", href: "/resources/hiring-and-credentials/what-to-ask" },
    { slug: "siding-and-windows-together", title: "Planning Siding and Window Replacement Together", summary: "When sequencing both at once saves on scaffolding, flashing, and finish work.", href: "/resources/pacific-northwest-siding/siding-and-windows-together" },
  ];

  return (
    <>
      <ExteriorHero
        eyebrow="Exterior remodeling · Vancouver & Portland"
        h1Line1="Beautiful Exteriors."
        h1Line2="Built for Northwest Weather."
        supporting="Siding, windows, and exterior improvements for homes across Vancouver, Portland, and the surrounding region. Tell us what you want to improve — we'll help you understand the options and next steps."
        primaryCta={{ label: "Get My Exterior Estimate", href: "/request-estimate" }}
        secondaryCta={{ label: "Explore Our Projects", href: "/projects" }}
        image={{
          src: "/images/hero-placeholder.jpg",
          alt: "Pacific Northwest home with new fiber cement siding",
          width: 1600,
          height: 1100,
          rights: "inspiration-only",
          rightsNote: "Replace with real project photograph before launch",
        }}
      />
      {credentialItems.length > 0 && <CredentialRail items={credentialItems} />}
      {serviceEntries.length > 0 && (
        <ServiceExplorer heading="What would you like to improve?" entries={serviceEntries} />
      )}
      <EnvelopeDetail
        heading="A great exterior starts behind the finish."
        intro="A refreshed exterior lasts when the layers behind it are correct. Here's what we check and address on a typical project."
        points={[
          { label: "Existing-wall assessment", description: "Document conditions behind old siding before scope is finalized." },
          { label: "Substrate repairs", description: "Replace rotted sheathing and corrected framing where required." },
          { label: "Weather-resistive barrier & flashing", description: "Integrate WRB and head/jamb/sill flashing to shed water correctly." },
          { label: "Product-specific installation", description: "Follow manufacturer requirements for fasteners, spacing, and seams." },
          { label: "Final walk and cleanup", description: "Confirm scope, correct punch items, and leave the site clean." },
        ]}
        links={[
          { label: "How we install siding", href: "/process" },
          { label: "Flashing & moisture management", href: "/resources/rain-and-moisture-management" },
          { label: "Our project process", href: "/process" },
        ]}
      />
      {materials.length > 0 && (
        <MaterialCompare heading="Choose the right look — and the right system — for your home." entries={materials} compareHref="/compare/siding-materials" />
      )}
      {coverage.length > 0 && (
        <RegionalCoverage
          heading="Your exterior team across Vancouver, Portland & nearby communities."
          supporting="Not sure whether your property is in our service area? Send us your city or ZIP."
          groups={coverage}
        />
      )}
      <ProcessStory heading="Know what happens before work begins." steps={processSteps} />
      <TeamProof
        heading="Real people. Clear communication. Work you can evaluate."
        intro="A named project lead on every job, and a written scope that explains exactly what we're doing and why."
        people={[]}
        testimonials={[]}
        teamHref="/team"
        reviewsHref="/reviews"
      />
      <ResourceFeature heading="Make your next exterior decision with confidence." featured={resourceFeatured} supporting={resourceSupporting} />
      <EstimateSection
        heading="Let's plan an exterior you'll feel good coming home to."
        supporting="Tell us what you're considering and where your home is located. Our team will follow up to discuss your project and the next step."
        phone={phone}
      />
    </>
  );
}
