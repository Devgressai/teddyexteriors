import {
  ExteriorHero,
  CredentialRail,
  ServiceExplorer,
  ProjectFeature,
  EnvelopeDetail,
  MaterialCompare,
  RegionalCoverage,
  ProcessStory,
  TeamProof,
  ResourceFeature,
  ExteriorFaq,
  ReviewPlatforms,
  EstimateSection,
  type CredentialRailItem,
  type ServiceExplorerEntry,
  type MaterialCompareEntry,
  type RegionalCoverageGroup,
  type ProcessStoryStep,
  type ResourceFeatureGuide,
  type ReviewPlatform,
} from "@/components/exterior";
import { get } from "@/lib/business";
import { services, materials, cities, projects, findCity } from "@/content-model/registry";
import { homepageFaq } from "@/content-model/samples";

export default function HomePage() {
  const phone = get<string>("contact.phone") ?? undefined;
  const waLni = get<string>("credentials.waLniNumber") ?? undefined;
  const orCcb = get<string>("credentials.orCcbNumber") ?? undefined;
  const warrantyDuration = get<string>("warranty.workmanshipDuration") ?? undefined;
  const sameAs = get<{ sameAs: string[] }>("reviews");

  const credentialItems: CredentialRailItem[] = [];
  if (waLni) credentialItems.push({ label: "Washington L&I", value: waLni, href: "/credentials", sourceNote: "Verify at L&I" });
  if (orCcb) credentialItems.push({ label: "Oregon CCB", value: orCcb, href: "/credentials", sourceNote: "Verify at CCB" });
  if (warrantyDuration) credentialItems.push({ label: "Workmanship warranty", value: warrantyDuration, href: "/warranty" });
  credentialItems.push({ label: "Serving", value: "SW WA & NW OR" });

  // Build service entries from the registry; lead service is siding-replacement.
  const serviceOrder = ["siding-replacement", "window-replacement", "exterior-painting", "trim-and-gutters", "whole-exterior-renovation"];
  const serviceImages: Record<string, string> = {
    "siding-replacement": "https://www.jdiconstruction.co/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp",
    "window-replacement": "https://www.jdiconstruction.co/ctf/2867howEJWyt6wVMWkIkN4/02-exterior-front-1920.webp",
    "exterior-painting": "https://www.jdiconstruction.co/ctf/1ZvHzs6V0u8I4YQB8YcLP6/after1-1920.webp",
    "trim-and-gutters": "https://www.jdiconstruction.co/ctf/6kHHfr9QWABV91WPhvNeUT/before2-800.webp",
    "whole-exterior-renovation": "https://www.jdiconstruction.co/ctf/1ywW6ufcKBIaBTL3CnzrQg/03-exterior-front-side-750.webp",
  };
  const serviceEntries: ServiceExplorerEntry[] = serviceOrder
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s, i) => ({
      slug: s.slug,
      title: s.name,
      description: s.summary,
      image: {
        src: serviceImages[s.slug] ?? "/images/hero-placeholder.jpg",
        alt: `${s.name} example`,
        width: 1200,
        height: 800,
        rights: "owned" as const,
      },
      href: `/services/${s.slug}`,
      emphasis: i === 0 ? ("lead" as const) : ("supporting" as const),
    }));

  const materialEntries: MaterialCompareEntry[] = materials.map((m) => ({
    slug: m.slug,
    product: m.product,
    look:
      m.slug === "fiber-cement"
        ? "Crisp, painted, decades-proven in the PNW."
        : m.slug === "engineered-wood"
          ? "Pronounced woodgrain character or smooth; longer board lengths."
          : m.slug === "cedar"
            ? "Natural wood grain; shingle or lap profiles."
            : "Clean, consistent finish; many colors available.",
    maintenance:
      m.slug === "fiber-cement"
        ? "Repaint cycle driven by paint quality and exposure, not the siding itself."
        : m.slug === "engineered-wood"
          ? "Repaint on manufacturer schedule; seal exposed cut ends."
          : m.slug === "cedar"
            ? "Annual inspection; stain or paint cycle; most demanding of the four."
            : "Washing; no paint cycle; WRB and flashing behind do the work.",
    fit:
      m.slug === "fiber-cement"
        ? "Most styles; strong default for Northwest homes."
        : m.slug === "engineered-wood"
          ? "Craftsman, farmhouse, cottage styles."
          : m.slug === "cedar"
            ? "Period homes and owners who commit to upkeep."
            : "Budget-focused projects where the envelope detailing is correct.",
    image: {
      src: "https://www.jdiconstruction.co/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp",
      alt: `${m.product} close-up`,
      width: 800,
      height: 600,
      rights: "owned" as const,
    },
    href: `/materials/${m.slug}`,
  }));

  const waCities = cities.filter((c) => c.state === "WA").slice(0, 5);
  const orCities = cities.filter((c) => c.state === "OR").slice(0, 5);
  const coverage: RegionalCoverageGroup[] = [
    {
      stateLabel: "Southwest Washington",
      stateHref: "/service-areas/washington",
      cities: waCities.map((c) => ({ name: c.name, href: `/service-areas/washington/${c.slug}` })),
    },
    {
      stateLabel: "Portland Metro, Oregon",
      stateHref: "/service-areas/oregon",
      cities: orCities.map((c) => ({ name: c.name, href: `/service-areas/oregon/${c.slug}` })),
    },
  ];

  const processSteps: ProcessStoryStep[] = [
    { number: "01", title: "Tell us about your home", description: "Share your goals, location, and the work you're considering." },
    { number: "02", title: "Walk the exterior with us", description: "We review existing conditions, point out where water's getting in, and lay out what it takes to make the envelope watertight." },
    { number: "03", title: "Review the written scope", description: "Written estimate with inclusions, exclusions, and allowances for conditions revealed during tear-off. Change orders are issued in writing." },
    { number: "04", title: "Build and walk through", description: "In-house crews, clean jobsite, and a finish walk before final payment." },
  ];

  const resourceFeatured: ResourceFeatureGuide = {
    slug: "repair-or-replace",
    title: "Repair or replace your siding?",
    summary: "Which clues point to a localized repair, and which point to full replacement in Pacific Northwest conditions.",
    href: "/resources/pacific-northwest-siding/repair-or-replace",
  };
  const resourceSupporting: ResourceFeatureGuide[] = [
    { slug: "fiber-vs-lp", title: "Fiber cement vs LP SmartSide", summary: "How the two most-installed Northwest siding systems actually compare.", href: "/compare/fiber-cement-vs-lp-smartside" },
    { slug: "cost-guide", title: "What drives siding-replacement cost", summary: "Scope, access, substrate, and the honest answer on where ranges come from.", href: "/costs/siding-replacement" },
  ];

  // Feature a real Vancouver project if one exists in the registry.
  const vancouverProject = projects.find((p) => p.city === "vancouver");
  const projectCity = vancouverProject ? findCity(vancouverProject.city) : null;

  // Review platforms — only renders when owner-confirmed URLs are populated.
  const reviewPlatforms: ReviewPlatform[] = (sameAs?.sameAs ?? []).map((url) => ({
    name: platformName(url),
    url,
  }));

  return (
    <>
      <ExteriorHero
        eyebrow="Exterior remodeling · Vancouver & Portland"
        h1Line1="Beautiful exteriors."
        h1Line2="Built for Northwest weather."
        supporting="Siding, windows, and exterior improvements for homes across Vancouver, Portland, and the surrounding region. We treat the exterior as the connected system it is — because in this climate, that's the only way it holds up."
        primaryCta={{ label: "Get My Exterior Estimate", href: "/request-estimate" }}
        secondaryCta={{ label: "Explore Our Projects", href: "/projects" }}
        image={{
          src: "https://www.jdiconstruction.co/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp",
          alt: "Pacific Northwest home with new fiber cement siding — Vancouver, WA",
          width: 1600,
          height: 1100,
          rights: "owned",
        }}
        caption={{ cityState: "Vancouver, WA", material: "Fiber cement lap siding", scope: "Full exterior refresh" }}
      />
      {credentialItems.length > 0 && <CredentialRail items={credentialItems} />}
      {reviewPlatforms.length > 0 && (
        <ReviewPlatforms
          platforms={reviewPlatforms}
          intro="Public review profiles for the parent entity. Click through to the source — ratings on this page would be ours to inflate; the live platforms are the honest signal."
        />
      )}
      {serviceEntries.length > 0 && (
        <ServiceExplorer heading="What would you like to improve?" entries={serviceEntries} />
      )}
      {vancouverProject && projectCity && (
        <ProjectFeature
          title={vancouverProject.title}
          cityState={`${projectCity.name}, ${projectCity.state}`}
          challenge={vancouverProject.originalCondition}
          work={vancouverProject.scope.slice(0, 2).join(". ") + "."}
          finish={vancouverProject.outcome}
          images={{ after: vancouverProject.photos[0] }}
          href={`/projects/${vancouverProject.slug}`}
        />
      )}
      <EnvelopeDetail
        heading="Water is the enemy."
        intro="Between fall and spring, the Portland metro and Clark County take on the better part of forty inches of rain — most of it as a slow, sideways drizzle that finds every unsealed seam. The exterior is a layered system. We build each layer correctly."
        points={[
          { label: "Weather-resistive barrier", description: "The house wrap must shed bulk water while letting the wall breathe. Seams taped, laps right-side-up." },
          { label: "Pan + head flashing at openings", description: "Pan flashing slopes to drain to the exterior. A missing or reversed pan is one of the most common causes of hidden rot." },
          { label: "Kickout flashing at roof-wall intersections", description: "Without it, a firehose of roof water runs straight down inside the wall." },
          { label: "Deck ledger & penetration sealing", description: "Flashing above and behind deck ledgers; every hose bib, vent, and fixture integrated with the wrap." },
          { label: "Finish choice", description: "Fiber cement, engineered wood, cedar, or vinyl — chosen to the house and detailed correctly behind." },
        ]}
        links={[
          { label: "Dry-rot & envelope remediation", href: "/services/envelope-remediation" },
          { label: "Repair or replace your siding?", href: "/resources/pacific-northwest-siding/repair-or-replace" },
          { label: "Our process", href: "/process" },
        ]}
      />
      {materialEntries.length > 0 && (
        <MaterialCompare
          heading="Four material systems. The one behind it matters more."
          intro="Any of these performs well over a correctly built barrier and flashing. All of them fail without one. The material matters; what's behind it matters more."
          entries={materialEntries}
          compareHref="/compare/fiber-cement-vs-lp-smartside"
        />
      )}
      <RegionalCoverage
        heading="Your exterior team across Vancouver, Portland & nearby communities."
        supporting="Not sure whether your property is in our service area? Send us your city or ZIP."
        groups={coverage}
      />
      <ProcessStory heading="Know what happens before work begins." steps={processSteps} />
      <TeamProof
        heading="In-house crews. Written estimates. Work you can evaluate."
        intro="Teddy Exteriors is the exterior arm of JDI Construction — 18 years of in-house crews based in Vancouver, Washington, with a Portland satellite by appointment. Clean, respectful crews; we treat your home like it's our own."
        people={[]}
        testimonials={[]}
        teamHref="/team"
        reviewsHref="/reviews"
      />
      <ResourceFeature heading="Make your next exterior decision with confidence." featured={resourceFeatured} supporting={resourceSupporting} />
      <ExteriorFaq items={homepageFaq} />
      <EstimateSection
        heading="Let's plan an exterior you'll feel good coming home to."
        supporting="Tell us what you're considering and where your home is located. A person reads every request and follows up."
        phone={phone}
      />
    </>
  );
}

function platformName(url: string): string {
  if (url.includes("google.")) return "Google";
  if (url.includes("yelp.")) return "Yelp";
  if (url.includes("facebook.")) return "Facebook";
  if (url.includes("angi.")) return "Angi";
  if (url.includes("houzz.")) return "Houzz";
  if (url.includes("guildquality.")) return "GuildQuality";
  if (url.includes("bbb.")) return "BBB";
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "Review";
  }
}
