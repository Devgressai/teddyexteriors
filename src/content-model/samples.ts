/**
 * Sample content fixtures for the design-gate review (brief §14A, §14E).
 *
 * Rules:
 *  - Every item carries `isSample: true` so the sitemap excludes it and the pages render a visible "sample" banner.
 *  - Content is editorial / factual where safe (resource guide, comparison, cost guide, service descriptions, material facts).
 *  - City + project samples are labeled as design-gate placeholders — they do not claim actual service coverage or completed work until the owner confirms.
 *  - When the owner answers the business questions, flip `isSample: false`, swap placeholder photography for real assets, and the samples become real pages. No URL churn.
 */

import { slug, type Service, type Material, type City, type Project, type ResourcePillar, type ResourceGuide, type CostGuide, type Comparison } from "./types";

const SAMPLE_IMG = {
  src: "/images/sample-placeholder.jpg",
  width: 1600,
  height: 1100,
  rights: "inspiration-only" as const,
  rightsNote: "Design-gate placeholder — replace with real project photograph before the sample is unflagged.",
};

export const sampleServices: Service[] = [
  {
    slug: slug("siding-replacement"),
    name: "Siding replacement",
    category: "siding",
    summary:
      "Replace aging or damaged siding with a complete scope: tear-off, substrate repairs, weather-resistive barrier and flashing integration, new siding, trim, and finish.",
    scope: [
      "Removal and disposal of existing siding and trim",
      "Inspection and repair of sheathing and framing where exposed",
      "Weather-resistive barrier installation (or replacement) with taped seams",
      "Head, jamb, and sill flashing integration at windows and doors",
      "New siding installation per manufacturer requirements",
      "Trim, corners, and penetration finishing",
      "Jobsite cleanup and finish walk",
    ],
    exclusions: [
      "Window and door replacement (available as a separate service)",
      "Roofing work",
      "Interior finish work exposed by hidden damage (allowance quoted separately)",
    ],
    materials: [slug("james-hardie")],
    relatedGuides: [slug("repair-or-replace")],
    isSample: true,
    sampleNote: "Scope language will be refined to match the owner's actual process.",
  },
];

export const sampleMaterials: Material[] = [
  {
    slug: slug("james-hardie"),
    product: "James Hardie fiber cement",
    manufacturer: "James Hardie",
    category: "fiber-cement",
    lines: ["HardiePlank lap", "HardieShingle", "HardiePanel vertical"],
    installationNotes:
      "In the Pacific Northwest, James Hardie specifies the HZ10 climate-engineered formulation. Fastener type, spacing, overlap, and clearance to grade are published in current manufacturer installation documents.",
    manufacturerDocsUrl: "https://www.jameshardie.com/products",
    claims: [],
    isSample: true,
    sampleNote: "Published once the owner confirms Hardie-installer program participation.",
  },
];

export const sampleCities: City[] = [
  {
    slug: slug("vancouver"),
    name: "Vancouver",
    state: "WA",
    counties: ["Clark"],
    entityType: "city",
    lat: 45.6387,
    lng: -122.6615,
    operatingCoverage: "full",
    priority: 1,
    servicesOffered: [slug("siding-replacement")],
    jurisdiction: {
      buildingDeptName: "City of Vancouver Community Development — Building",
      buildingDeptUrl: "https://www.cityofvancouver.us/cdd/page/building-permits",
      permitScopeNote:
        "Full siding replacement typically requires a building permit; like-for-like siding repair on a single wall may not. Confirm scope with the department before applying.",
    },
    localConstraints: [
      "Older homes near Officer's Row and in Hough may be in historic review districts — scope changes to the public elevation may need design review.",
      "Clark County has distinct permitting; properties outside Vancouver city limits route through Clark County Community Development, not the city.",
    ],
    sources: [],
    relatedProjects: [slug("sample-vancouver-reside")],
    isSample: true,
    sampleNote: "City is listed here for the design gate. Service coverage is not published until the owner confirms the territory and services available in Vancouver.",
  },
  {
    slug: slug("portland"),
    name: "Portland",
    state: "OR",
    counties: ["Multnomah", "Washington", "Clackamas"],
    entityType: "city",
    lat: 45.5152,
    lng: -122.6784,
    operatingCoverage: "full",
    priority: 1,
    servicesOffered: [slug("siding-replacement")],
    jurisdiction: {
      buildingDeptName: "Portland Bureau of Development Services",
      buildingDeptUrl: "https://www.portland.gov/bds",
      permitScopeNote:
        "Portland permits siding replacement when the scope involves more than like-for-like repair on a single wall; historic/overlay districts have additional review.",
    },
    localConstraints: [
      "Portland spans Multnomah, Washington, and Clackamas Counties — the applicable building department depends on exact parcel location.",
      "Historic design-review zones add scope and timeline considerations.",
    ],
    sources: [],
    relatedProjects: [],
    isSample: true,
    sampleNote: "City is listed here for the design gate. Service coverage is not published until the owner confirms the territory.",
  },
];

export const sampleProjects: Project[] = [
  {
    slug: slug("sample-vancouver-reside"),
    title: "Vancouver, WA — complete re-side with substrate repair",
    city: slug("vancouver"),
    completionDate: "2026-07-15",
    services: [slug("siding-replacement")],
    materials: [slug("james-hardie")],
    originalCondition:
      "T1-11 siding with visible delamination at the base of several walls and failed caulk at the window perimeters. Trim corners showed moisture staining consistent with flashing failure.",
    scope: [
      "Full tear-off of existing T1-11 and trim",
      "Replaced ~18 sheets of 1/2\" CDX sheathing at the lower courses",
      "Tyvek HomeWrap with taped seams; head/jamb/sill flashing at windows",
      "James Hardie HardiePlank HZ10, 7-inch exposure",
      "4/4 x 4 trim at corners; aluminum drip at windows",
    ],
    productsInstalled: [
      "James Hardie HardiePlank HZ10 lap, 7\" exposure — Iron Gray prefinished",
      "James Hardie HardieTrim 4/4 x 4 corners — Arctic White",
      "Tyvek HomeWrap weather-resistive barrier",
      "Z-flashing at horizontal transitions, head flashing at all windows",
    ],
    dimensions: {
      wallSquares: 24,
      trimLinearFeet: 680,
      sheathingThicknessIn: 0.5,
    },
    substrateFindings:
      "Sheathing rot concentrated at base of walls under north-facing eaves; framing dry and structurally sound. No evidence of interior moisture intrusion.",
    moistureDetails:
      "WRB lapped shingle-style; head flashing continuous above windows; sill pans installed at bay window.",
    changeHandling:
      "Discovered sheathing damage during tear-off was estimated under the 'conditions revealed' allowance; written change order issued and approved before replacement.",
    outcome:
      "Refinished exterior with corrected flashing details and a documented record of installed materials for warranty registration.",
    photos: [
      { ...SAMPLE_IMG, src: "/images/sample-project-after.jpg", alt: "Vancouver residence after re-side with HardiePlank" },
    ],
    customerComments: [],
    isSample: true,
    sampleNote: "This case study is a design-gate placeholder. It will be replaced with a real, documented project once the owner provides approved assets and customer permissions.",
  },
];

export const sampleResourcePillars: ResourcePillar[] = [
  {
    slug: slug("pacific-northwest-siding"),
    topic: "Pacific Northwest siding",
    scope:
      "Repair vs replacement, material selection, profile and design choices, maintenance, installation scope, and service-life assumptions for exterior siding in Southwest Washington and Northwest Oregon.",
    decisionAreas: [
      "Repair vs full replacement",
      "Material selection for PNW weather",
      "Profile and trim design",
      "Maintenance expectations",
      "Service-life assumptions",
    ],
    guides: [slug("repair-or-replace")],
    reviewer: "Technical reviewer (pending owner confirmation)",
    isSample: true,
  },
];

export const sampleResourceGuides: ResourceGuide[] = [
  {
    slug: slug("repair-or-replace"),
    pillar: slug("pacific-northwest-siding"),
    title: "Repair or replace your siding?",
    question: "When is localized siding repair the right answer, and when does full replacement make more sense?",
    summary:
      "The decision usually comes down to whether damage is cosmetic, localized, or systemic — plus the condition of the layers behind the siding.",
    mdxPath: "resources/pacific-northwest-siding/repair-or-replace",
    datePublished: "2026-10-01",
    reviewer: "Technical reviewer (pending owner confirmation)",
    claims: [],
    isSample: true,
  },
];

export const sampleCostGuides: CostGuide[] = [
  {
    slug: slug("siding-replacement-cost"),
    service: slug("siding-replacement"),
    unitBasis: "per-square",
    scopeAssumptions: [
      "Full tear-off and disposal of existing siding and trim",
      "WRB and flashing integration",
      "Standard access (ground-floor and second-story walls without special staging)",
      "Allowance for substrate repair, invoiced separately against documented conditions",
    ],
    drivers: [
      { name: "Material system", description: "Fiber cement vs engineered wood vs cedar vs vinyl — each carries different material and labor costs." },
      { name: "Wall area and complexity", description: "Larger walls with simple geometry are more efficient to install than small walls with many returns, dormers, and offsets." },
      { name: "Access and staging", description: "Walls that need scaffolding or lift equipment take longer and cost more than ladder-accessible walls." },
      { name: "Substrate condition", description: "Rotted or damaged sheathing adds material and labor; the magnitude is only known after tear-off." },
      { name: "Trim and detail scope", description: "Replacement trim profiles, corner details, and flashing choices change both cost and finished appearance." },
      { name: "Permits and jurisdiction", description: "Permit fees and historic/overlay review requirements vary by jurisdiction." },
    ],
    rangeNotes:
      "A defensible range for Southwest Washington and Northwest Oregon publishes here once the owner shares actual completed-project data across the material systems installed. We will not invent a city-by-city number.",
    sources: [],
    isSample: true,
  },
];

export const sampleComparisons: Comparison[] = [
  {
    slug: slug("fiber-cement-vs-lp-smartside"),
    topic: "Fiber cement vs LP SmartSide",
    summary:
      "Both are durable engineered siding systems installed widely in the Pacific Northwest. They differ in composition, weight, installation details, finish options, and long-term maintenance.",
    mdxPath: "compare/fiber-cement-vs-lp-smartside",
    reviewer: "Technical reviewer (pending owner confirmation)",
    claims: [],
    isSample: true,
  },
];
