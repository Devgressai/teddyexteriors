import {
  EditorialHero,
  ClimateMicrobar,
  TrustBand,
  trustIcons,
  BrandMarquee,
  ServiceComposition,
  EnvelopeFeature,
  ProjectFeature,
  StoryBreak,
  MaterialCompare,
  RegionalCoverage,
  ProcessTimeline,
  WhyTeddyNarrative,
  ClimateAuthority,
  FeaturedTestimonial,
  ResourceFeature,
  ExteriorFaq,
  ReviewPlatforms,
  EstimateSection,
  type ServiceCard,
  type TrustBandItem,
  type MaterialCompareEntry,
  type RegionalCoverageGroup,
  type ProcessTimelineStep,
  type WhyTeddyBlock,
  type ResourceFeatureGuide,
  type ReviewPlatform,
} from "@/components/exterior";
import type { Metadata } from "next";
import { get } from "@/lib/business";
import { cities, materials, projects, findCity } from "@/content-model/registry";
import { homepageFaq } from "@/content-model/samples";

const TEDDY_IMG = "/images/teddy";

export const metadata: Metadata = {
  title: {
    absolute:
      "Teddy Exteriors — Siding, Windows & Exterior Remodeling in Vancouver, WA and Portland, OR",
  },
  description:
    "Exterior remodeling for Pacific Northwest homes — siding, windows, trim, gutters, and whole-exterior renovation serving Vancouver, Washington and Portland, Oregon. Built envelope-first for forty inches of annual rain.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "Teddy Exteriors — Exteriors built for the Northwest",
    description:
      "Siding, windows, gutters and exterior remodeling designed for Vancouver, WA and Portland, OR — built the right way from the structure out.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teddy Exteriors — Exteriors built for the Northwest",
    description:
      "Siding, windows, gutters and exterior remodeling for Vancouver, WA and Portland, OR.",
  },
  keywords: [
    "exterior remodeling Vancouver WA",
    "siding contractor Vancouver WA",
    "siding replacement Portland OR",
    "window replacement Vancouver WA",
    "fiber cement siding Pacific Northwest",
    "exterior contractor Clark County",
    "gutter installation Portland",
    "whole exterior renovation Vancouver",
  ],
};

export default function HomePage() {
  const phone = get<string>("contact.phone") ?? undefined;
  const waLni = get<string>("credentials.waLniNumber") ?? undefined;
  const orCcb = get<string>("credentials.orCcbNumber") ?? undefined;
  const warrantyDuration = get<string>("warranty.workmanshipDuration") ?? undefined;
  const sameAs = get<{ sameAs: string[] }>("reviews");

  const trustItems: TrustBandItem[] = [];
  trustItems.push({
    icon: trustIcons.star,
    label: "Google Rating",
    value: "Google-reviewed",
    sub: "See all reviews",
  });
  if (waLni || orCcb) {
    trustItems.push({
      icon: trustIcons.shield,
      label: `${waLni ? "WA" : ""}${waLni && orCcb ? " & " : ""}${orCcb ? "OR" : ""}`,
      value: "Licensed & Insured",
      sub: [waLni && `WA ${waLni}`, orCcb && `OR CCB ${orCcb}`].filter(Boolean).join(" · "),
    });
  }
  trustItems.push({
    icon: trustIcons.medal,
    label: "Industry-Leading Materials",
    value: "Quality Installation",
    sub: warrantyDuration ? `${warrantyDuration} workmanship` : undefined,
  });
  trustItems.push({
    icon: trustIcons.team,
    label: "Vancouver · Portland",
    value: "Local Team",
    sub: "In-house crews",
  });
  trustItems.push({
    icon: trustIcons.house,
    label: "Serving the PNW",
    value: "18 Years of Experience",
    sub: "Shared with JDI Construction",
  });

  const serviceCards: ServiceCard[] = [
    {
      slug: "siding-replacement",
      label: "Siding",
      headline: "Protect the structure. Transform the exterior.",
      description: "Durable, beautiful siding installed the right way for long-term protection in the Northwest.",
      href: "/services/siding-replacement",
      image: {
        src: `${TEDDY_IMG}/teddy-service-siding.webp`,
        alt: "Warm neutral fiber cement lap siding with dark trim on a Pacific Northwest home",
        width: 1200,
        height: 1500,
        rights: "owned",
      },
    },
    {
      slug: "window-replacement",
      label: "Windows",
      headline: "Better comfort. A brighter home.",
      description: "High-performance windows for energy efficiency, comfort and curb appeal.",
      href: "/services/window-replacement",
      image: {
        src: `${TEDDY_IMG}/teddy-service-windows.webp`,
        alt: "Row of black-framed casement and picture windows on a Northwest exterior",
        width: 1200,
        height: 1500,
        rights: "owned",
      },
    },
    {
      slug: "trim-and-gutters",
      label: "Gutters",
      headline: "Keep water moving in the right direction.",
      description: "Professionally installed gutter systems to protect your home's foundation and exterior.",
      href: "/services/trim-and-gutters",
      image: {
        src: `${TEDDY_IMG}/teddy-service-gutters.webp`,
        alt: "Dark bronze seamless gutter meeting a downspout at a Northwest roof corner",
        width: 1200,
        height: 1500,
        rights: "owned",
      },
    },
    {
      slug: "trim-and-gutters-soffit",
      label: "Soffit & Fascia",
      headline: "The finishing details that matter.",
      description: "Complete exterior systems for a clean, durable, and lasting finish.",
      href: "/services/trim-and-gutters",
      image: {
        src: `${TEDDY_IMG}/teddy-service-soffit-fascia.webp`,
        alt: "Cedar tongue-and-groove soffit under a generous Pacific Northwest eave",
        width: 1200,
        height: 1500,
        rights: "owned",
      },
    },
  ];

  const materialEntries: MaterialCompareEntry[] = materials.map((m) => ({
    slug: m.slug,
    product: m.product,
    look:
      m.slug === "fiber-cement"
        ? "Crisp, painted, decades-proven in the PNW."
        : m.slug === "engineered-wood"
          ? "Pronounced woodgrain; longer board lengths."
          : m.slug === "cedar"
            ? "Natural wood grain; shingle or lap profiles."
            : "Clean, consistent finish; many colors.",
    maintenance:
      m.slug === "fiber-cement"
        ? "Repaint cycle driven by paint quality, not the siding itself."
        : m.slug === "engineered-wood"
          ? "Repaint on manufacturer schedule; seal exposed ends."
          : m.slug === "cedar"
            ? "Annual inspection; stain or paint cycle."
            : "Washing; WRB and flashing behind do the work.",
    fit:
      m.slug === "fiber-cement"
        ? "Most styles; strong default for Northwest homes."
        : m.slug === "engineered-wood"
          ? "Craftsman, farmhouse, cottage styles."
          : m.slug === "cedar"
            ? "Period homes and owners who commit to upkeep."
            : "Budget-focused projects with correct envelope.",
    image: {
      // Each material gets a visibly different exterior crop; still placeholder JDI photography.
      // Replace with per-material close-ups when real photography lands.
      src:
        m.slug === "fiber-cement"
          ? `${TEDDY_IMG}/teddy-material-fiber-cement-detail.webp`
          : m.slug === "engineered-wood"
            ? `${TEDDY_IMG}/teddy-material-engineered-wood-detail.webp`
            : m.slug === "cedar"
              ? `${TEDDY_IMG}/teddy-material-cedar-detail.webp`
              : `${TEDDY_IMG}/teddy-material-vinyl-detail.webp`,
      alt: `${m.product} on a Northwest exterior`,
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

  const processSteps: ProcessTimelineStep[] = [
    { number: "01", title: "Walk the exterior with us", body: "We assess existing conditions, point out where water's getting in, and lay out what it takes to make the envelope watertight." },
    { number: "02", title: "Review the written scope", body: "Written estimate with inclusions, exclusions, and allowances for conditions revealed during tear-off." },
    { number: "03", title: "Build with in-house crews", body: "The same hands that estimated your project build it. Clean jobsite, respectful crews, dry walls." },
    { number: "04", title: "Finish walk & warranty record", body: "A finish walk before final payment, with a documented record of installed materials for warranty." },
  ];

  const whyBlocks: WhyTeddyBlock[] = [
    {
      eyebrow: "Written estimate",
      heading: "No surprise invoices.",
      body: "Scope, materials, access, demolition allowances, and conditions-revealed allowances all appear in writing before work begins. Change orders are issued in writing. The final invoice should look like the first estimate — plus whatever we found and documented along the way.",
      image: {
        src: `${TEDDY_IMG}/teddy-why-written-estimate.webp`,
        alt: "Calm editorial exterior of a Pacific Northwest home under overcast light",
        width: 1600,
        height: 1200,
        rights: "owned",
      },
      imagePosition: "right",
    },
    {
      eyebrow: "In-house crews",
      heading: "Same hands, every project.",
      body: "No bidding your project out to the lowest sub we can find. The crews building your exterior are the same crews we've worked with for years, under one roof with one project manager. Clean, respectful jobsites — and dry walls at the end of every day.",
      image: {
        src: `${TEDDY_IMG}/teddy-why-in-house-crews.webp`,
        alt: "Mid-century ranch exterior refresh in the Pacific Northwest",
        width: 1600,
        height: 1200,
        rights: "owned",
      },
      imagePosition: "left",
    },
    {
      eyebrow: "Envelope first",
      heading: "The walls behind the siding get the same care as the siding.",
      body: "We open representative wall sections, document conditions, correct the flashing and WRB details that let water in originally, and only then install new cladding. If the envelope isn't right, the finish is temporary.",
      image: {
        src: `${TEDDY_IMG}/teddy-why-envelope-first.webp`,
        alt: "Working wall section with taped housewrap, head flashing, and first siding courses",
        width: 1600,
        height: 1200,
        rights: "owned",
      },
      imagePosition: "right",
    },
  ];

  const resourceFeatured: ResourceFeatureGuide = {
    slug: "repair-or-replace",
    title: "Repair or replace your siding?",
    summary: "Which clues point to localized repair, and which point to full replacement in Pacific Northwest conditions.",
    href: "/resources/pacific-northwest-siding/repair-or-replace",
  };
  const resourceSupporting: ResourceFeatureGuide[] = [
    { slug: "fiber-vs-lp", title: "Fiber cement vs LP SmartSide", summary: "How the two most-installed Northwest siding systems compare.", href: "/compare/fiber-cement-vs-lp-smartside" },
    { slug: "cost-guide", title: "What drives siding-replacement cost", summary: "Scope, access, substrate — the honest answer on ranges.", href: "/costs/siding-replacement" },
  ];

  const vancouverProject = projects.find((p) => p.city === "vancouver");
  const projectCity = vancouverProject ? findCity(vancouverProject.city) : null;

  const reviewPlatforms: ReviewPlatform[] = (sameAs?.sameAs ?? []).map((url) => ({
    name: platformName(url),
    url,
  }));

  return (
    <>
      <EditorialHero
        eyebrowLabels={["VANCOUVER, WA", "PORTLAND, OR", "SURROUNDING AREAS"]}
        headlineLines={[
          { text: "Exteriors built" },
          { text: "for the " },
          { text: "Northwest.", italic: true },
        ]}
        supporting="Siding, windows, gutters and exterior remodeling designed for our climate — and built the right way, from the structure out."
        primaryCta={{ label: "Request an Exterior Evaluation", href: "/request-estimate" }}
        secondaryCta={{ label: "See Our Work", href: "/projects" }}
        bulletProof={[
          { label: "No-pressure consultation", icon: "check" },
          { label: "Local team", icon: "team" },
          { label: "Clear project scope", icon: "scope" },
          { label: "Experienced & insured", icon: "shield" },
        ]}
        heroImage={{
          src: `${TEDDY_IMG}/teddy-hero-main.webp`,
          alt: "Modern-craftsman Pacific Northwest home with warm neutral fiber-cement siding and cedar entry under overcast light",
          width: 2400,
          height: 1350,
          rights: "owned",
        }}
        projectCaption={{
          title: "Modern Northwest Exterior",
          locality: "Vancouver, WA",
          materials: "Siding · Windows · Gutters",
        }}
      />

      <ClimateMicrobar />
      <TrustBand lead="A trusted exterior contractor in the PNW" items={trustItems} />

      <BrandMarquee
        eyebrow="Brands we install"
        heading="The manufacturers behind the exteriors we build."
      />

      <ServiceComposition
        eyebrow="Our Services"
        heading="Complete Exterior Solutions"
        intro="From siding and windows to gutters and exterior painting, we help homeowners protect, enhance, and add long-term value to their homes."
        viewAllHref="/services"
        cards={serviceCards}
      />

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

      <EnvelopeFeature
        eyebrow="A great exterior starts behind the finish"
        headline={{ pre: "What you", italic: "don't see" }}
        intro="A beautiful exterior isn't just about the finish. It's about a properly built system — with correct flashing, water management, and installation details that protect your home for decades."
        closingHeading="The details make the difference"
        closingBody="Proper flashing, sequencing and installation keep water out and your home protected — especially in the Pacific Northwest."
        detailImage={{
          src: `${TEDDY_IMG}/teddy-envelope-detail.webp`,
          alt: "Window head flashing with housewrap, flashing tape, and the first courses of fiber-cement siding started below",
          width: 800,
          height: 1000,
          rights: "owned",
        }}
        learnMoreHref="/process"
        exploreHref="/resources/pacific-northwest-siding/repair-or-replace"
      />

      {materialEntries.length > 0 && (
        <MaterialCompare
          heading="Four material systems. What's behind them matters more."
          intro="Any of these performs well over a correctly built barrier and flashing. All of them fail without one."
          entries={materialEntries}
          compareHref="/compare/fiber-cement-vs-lp-smartside"
        />
      )}

      <StoryBreak
        eyebrow="Built for the Northwest"
        headline="Forty inches of rain. One continuous envelope."
        meta="Siding · Windows · Trim"
        locality="Vancouver, WA"
        image={{
          src: `${TEDDY_IMG}/teddy-story-break.webp`,
          alt: "Cinematic early-evening wide of a Pacific Northwest home with warm interior light against overcast sky",
          width: 2400,
          height: 1350,
          rights: "owned",
        }}
      />

      <WhyTeddyNarrative
        sectionEyebrow="Why Teddy"
        sectionHeading="Specifics, not slogans."
        blocks={whyBlocks}
      />

      <ClimateAuthority
        eyebrow="Pacific Northwest"
        heading="We build for the weather we actually have."
        body={[
          "Between fall and spring, the Portland metro and Clark County take on the better part of forty inches of rain — most of it as a slow, sideways drizzle that finds every unsealed seam. Overcast light, saturated ground, and freeze-thaw cycles at elevation shape every exterior decision.",
          "Our job isn't to keep every drop of water from reaching the back of the siding — rain gets behind cladding on every house. The real job is giving that water a fast, uninterrupted path back out before it reaches the wood and insulation underneath.",
          "That means specific choices about weather-resistive barriers, flashing, rainscreens, penetration sealing, and sequencing the work around the actual weather window. Vancouver and Portland houses need envelopes designed for forty inches of annual drizzle, not showrooms.",
        ]}
        rules={[
          {
            title: "No cosmetic covers over failed layers.",
            body: "If the WRB or flashing underneath has failed, replacing the siding alone just hides the problem for another year or two.",
          },
          {
            title: "Open before we propose.",
            body: "On exterior remediation scopes, we open a representative section and document what's behind the siding before quoting a repair plan.",
          },
          {
            title: "Work year-round, dry every night.",
            body: "Walls get protected, dried-in, and never left exposed to the rain between workdays. We don't shut down for the wet season.",
          },
        ]}
      />

      <RegionalCoverage
        heading="Your exterior team across Vancouver, Portland & nearby communities."
        supporting="Not sure whether your property is in our service area? Send us your city or ZIP."
        groups={coverage}
      />

      <ProcessTimeline
        eyebrow="Our Process"
        heading="Know what happens before work begins."
        intro="Four phases from first conversation to the final walk. We stay in writing throughout — scope, allowances, and change orders — so you always know where the project stands."
        steps={processSteps}
      />

      <FeaturedTestimonial
        eyebrow="Homeowner stories"
        heading="Real people. Clear communication. Work you can evaluate."
        quote=""
        attribution=""
        locality=""
        reviewsHref="/reviews"
      />

      {reviewPlatforms.length > 0 && (
        <ReviewPlatforms
          platforms={reviewPlatforms}
          intro="Public review profiles for the parent entity. The live platforms are the honest signal."
        />
      )}

      <ResourceFeature heading="Make your next exterior decision with confidence." featured={resourceFeatured} supporting={resourceSupporting} />
      <ExteriorFaq items={homepageFaq} />
      <EstimateSection
        heading="Let's walk your exterior together."
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
