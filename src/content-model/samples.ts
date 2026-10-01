/**
 * Initial content for Teddy Exteriors.
 *
 * Content provenance:
 *  - Services, scope language, warranty, cost drivers, FAQ, climate framing, and envelope philosophy
 *    draw from jdiconstruction.co (same owner, same legal entity — owner-authorized 2026-10-01).
 *  - Project data below is adapted from JDI's documented exterior-category portfolio. These are the
 *    same crews' work; photo CDN is JDI's for now (jdiconstruction.co/ctf/...).
 *  - Resource guide and comparison bodies live as MDX in content/.
 *
 * The `isSample` flag only remains on items that still need an owner-side input (customer permissions,
 * reviewer identity for guides, additional photo coverage, etc.).
 */

import { slug, type Service, type Material, type City, type Project, type ResourcePillar, type ResourceGuide, type CostGuide, type Comparison, type ImageAsset } from "./types";

const JDI_CDN = "https://www.jdiconstruction.co";

const img = (path: string, alt: string, w = 1600, h = 1100): ImageAsset => ({
  src: `${JDI_CDN}${path}`,
  alt,
  width: w,
  height: h,
  rights: "owned",
  rightsNote: "Shared-entity asset — Teddy Exteriors is a brand of JDI Construction (owner-authorized 2026-10-01).",
});

export const sampleServices: Service[] = [
  {
    slug: slug("siding-replacement"),
    name: "Siding replacement",
    category: "siding",
    summary:
      "Replace aging or failed siding with a complete scope — tear-off, substrate repair, weather-resistive barrier and flashing integration, new siding, trim, and finish. Done as a connected system so the envelope actually stays dry.",
    scope: [
      "Removal and disposal of existing siding and trim",
      "Inspection and repair of sheathing and framing exposed during tear-off",
      "Weather-resistive barrier installation with taped seams",
      "Head, jamb, and sill flashing integration at windows and doors",
      "New siding installation per manufacturer requirements",
      "Trim, corners, kickout flashing, and penetration sealing",
      "Jobsite cleanup and finish walk",
    ],
    exclusions: [
      "Window and door replacement (available as a separate service)",
      "Roofing work",
      "Interior finish work exposed by hidden damage (allowance quoted separately)",
    ],
    materials: [slug("fiber-cement"), slug("engineered-wood"), slug("cedar"), slug("vinyl")],
    relatedGuides: [slug("repair-or-replace")],
  },
  {
    slug: slug("window-replacement"),
    name: "Window & door replacement",
    category: "windows",
    summary:
      "Replace tired windows and exterior doors with units installed into properly flashed openings. New units are only as watertight as their installation — we integrate each with the house wrap and set it on proper pan flashing so any water that reaches the sill drains back to the exterior.",
    scope: [
      "Removal of existing windows and doors",
      "Inspection and repair of surrounding sheathing and framing",
      "Pan flashing installation with slope to exterior",
      "Head and jamb flashing integrated with the WRB",
      "New window / door installation per manufacturer requirements",
      "Interior and exterior trim restoration",
      "Caulking and finish work",
    ],
    exclusions: [
      "Interior drywall repair beyond immediate opening",
      "Full-depth structural header replacement (quoted separately if required)",
    ],
    materials: [],
    relatedGuides: [],
  },
  {
    slug: slug("exterior-painting"),
    name: "Exterior painting",
    category: "paint",
    summary:
      "Prep, prime, and paint existing exterior surfaces that are sound. When the siding and trim are tired but not failing, a careful paint job is the smart, affordable move.",
    scope: [
      "Pressure wash and dry time appropriate to the substrate",
      "Scrape, sand, and spot-prime failed areas",
      "Caulk replacement at joints and penetrations",
      "Primer where required by substrate or coating system",
      "Topcoat application per coating manufacturer requirements",
      "Cleanup and finish walk",
    ],
    exclusions: [
      "Siding or trim replacement (available as a separate service)",
      "Lead-safe RRP work on pre-1978 homes is scoped separately where applicable",
    ],
    materials: [],
    relatedGuides: [slug("repair-or-replace")],
  },
  {
    slug: slug("trim-and-gutters"),
    name: "Trim, soffits, fascia & gutters",
    category: "trim",
    summary:
      "Address the roof-edge system as the connected assembly it is — fascia, soffit, kickout flashing, gutters, and downspouts, with the water they shed routed properly away from the house.",
    scope: [
      "Fascia and soffit replacement or repair",
      "Kickout flashing at roof-wall intersections",
      "Gutter and downspout replacement or repair",
      "Downspout routing to grade or drainage",
      "Trim and corner replacement where tied in",
    ],
    exclusions: [
      "Roofing (available via trusted roofing partners)",
      "Below-grade drainage (coordinated with grading partners)",
    ],
    materials: [],
    relatedGuides: [],
  },
  {
    slug: slug("envelope-remediation"),
    name: "Dry rot & envelope remediation",
    category: "envelope",
    summary:
      "Fix the hidden damage that cosmetic repairs leave in place. We open representative wall sections, document conditions, replace rot-damaged sheathing and framing, and correct the flashing and WRB details that let water in originally.",
    scope: [
      "Representative sample opening and inspection",
      "Documented substrate and framing condition report",
      "Sheathing and framing replacement to sound material",
      "WRB and flashing correction at the failure path",
      "Window pan and head flashing correction where implicated",
      "Re-cladding of the affected area to match or coordinate",
    ],
    exclusions: [
      "Mold remediation requiring a licensed mold specialist",
      "Interior drywall and finish restoration beyond immediate work area",
    ],
    materials: [],
    relatedGuides: [],
  },
  {
    slug: slug("whole-exterior-renovation"),
    name: "Whole-exterior renovation",
    category: "whole-exterior",
    summary:
      "Siding, windows, trim, finishes, and envelope corrections planned and executed as a single coordinated project. Scope, logistics, and sequencing live in one written scope — change orders are documented in writing.",
    scope: [
      "Coordinated scope across siding, windows, trim, and envelope",
      "Phased or single-mobilization approach based on weather and access",
      "WRB and flashing continuity across trades",
      "Finish coordination for a consistent exterior",
    ],
    exclusions: [
      "Roofing, decks, and interior remodeling scoped separately",
    ],
    materials: [slug("fiber-cement"), slug("engineered-wood"), slug("cedar"), slug("vinyl")],
    relatedGuides: [slug("repair-or-replace")],
  },
];

export const sampleMaterials: Material[] = [
  {
    slug: slug("fiber-cement"),
    product: "Fiber cement siding",
    manufacturer: "James Hardie / other fiber-cement manufacturers",
    category: "fiber-cement",
    installationNotes:
      "The workhorse of Pacific Northwest siding — won't rot, swell, or feed mold, and holds paint well through wet winters. Correct installation is specific: fastener type, spacing, overlap, and clearance to grade are all published in current manufacturer installation documents and must be followed exactly for warranty coverage.",
    manufacturerDocsUrl: "https://www.jameshardie.com/products",
    claims: [],
  },
  {
    slug: slug("engineered-wood"),
    product: "Engineered wood siding",
    manufacturer: "LP SmartSide / other engineered-wood manufacturers",
    category: "composite",
    installationNotes:
      "Lighter weight than fiber cement, with a pronounced woodgrain character and longer uninterrupted boards. Resin-treated to resist moisture — performs very well when installed properly. Edges and cuts must be sealed per the manufacturer's current guidance.",
    manufacturerDocsUrl: "https://lpcorp.com/products/siding-trim/lp-smartside-trim-and-siding",
    claims: [],
  },
  {
    slug: slug("cedar"),
    product: "Cedar siding",
    manufacturer: "Western Red Cedar / various mills",
    category: "wood",
    installationNotes:
      "Naturally rot-resistant and beautiful on period homes, but the most demanding of the common options. Requires meticulous detailing — flashing, back-priming, end-cuts — and a maintained paint or stain finish. Pays back for owners who commit to the upkeep.",
    claims: [],
  },
  {
    slug: slug("vinyl"),
    product: "Vinyl siding",
    manufacturer: "Various manufacturers",
    category: "vinyl",
    installationNotes:
      "Impervious to water itself, which means the WRB and flashing behind it do all the work of keeping water out of the wall. Where vinyl fits the house and budget, it's a durable choice — but it demands the same careful envelope detailing as every other cladding.",
    claims: [],
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
    servicesOffered: [
      slug("siding-replacement"),
      slug("window-replacement"),
      slug("exterior-painting"),
      slug("trim-and-gutters"),
      slug("envelope-remediation"),
      slug("whole-exterior-renovation"),
    ],
    jurisdiction: {
      buildingDeptName: "City of Vancouver Community Development — Building",
      buildingDeptUrl: "https://www.cityofvancouver.us/cdd/page/building-permits",
      permitScopeNote:
        "Full siding replacement typically requires a building permit; like-for-like repair on a single wall may not. Confirm scope with the department before applying.",
    },
    localConstraints: [
      "Older homes near Officer's Row and in Hough may fall inside historic review districts — scope changes to the public elevation can require design review.",
      "Clark County has distinct permitting; properties outside Vancouver city limits route through Clark County Community Development, not the city.",
    ],
    sources: [],
    relatedProjects: [slug("mid-century-ranch-exterior-refresh"), slug("mid-century-modern-whole-home-remodel"), slug("modern-whole-home-remodel")],
  },
  {
    slug: slug("camas"),
    name: "Camas",
    state: "WA",
    counties: ["Clark"],
    entityType: "city",
    lat: 45.5872,
    lng: -122.3995,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("envelope-remediation"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Camas Building Division",
      buildingDeptUrl: "https://www.cityofcamas.us/building",
      permitScopeNote: "Siding replacement scope usually requires a permit; verify specifics before applying.",
    },
    sources: [],
    relatedProjects: [],
  },
  {
    slug: slug("washougal"),
    name: "Washougal",
    state: "WA",
    counties: ["Clark"],
    entityType: "city",
    lat: 45.5826,
    lng: -122.3453,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Washougal Community Development",
      buildingDeptUrl: "https://www.cityofwashougal.us/178/Community-Development",
      permitScopeNote: "Confirm permit scope with the department before applying.",
    },
    sources: [],
    relatedProjects: [],
  },
  {
    slug: slug("ridgefield"),
    name: "Ridgefield",
    state: "WA",
    counties: ["Clark"],
    entityType: "city",
    lat: 45.8168,
    lng: -122.7437,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Ridgefield Community Development",
      buildingDeptUrl: "https://ridgefieldwa.us/205/Community-Development",
      permitScopeNote: "Permit scope depends on project size — verify before applying.",
    },
    sources: [],
    relatedProjects: [],
  },
  {
    slug: slug("battle-ground"),
    name: "Battle Ground",
    state: "WA",
    counties: ["Clark"],
    entityType: "city",
    lat: 45.7804,
    lng: -122.5335,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Battle Ground Community Development",
      buildingDeptUrl: "https://cityofbg.org/191/Community-Development",
      permitScopeNote: "Confirm permit scope with the department before applying.",
    },
    sources: [],
    relatedProjects: [],
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
    servicesOffered: [
      slug("siding-replacement"),
      slug("window-replacement"),
      slug("exterior-painting"),
      slug("trim-and-gutters"),
      slug("envelope-remediation"),
      slug("whole-exterior-renovation"),
    ],
    jurisdiction: {
      buildingDeptName: "Portland Bureau of Development Services",
      buildingDeptUrl: "https://www.portland.gov/bds",
      permitScopeNote:
        "Portland permits siding replacement when scope involves more than like-for-like repair on a single wall. Historic / overlay districts add review requirements.",
    },
    localConstraints: [
      "Portland spans Multnomah, Washington, and Clackamas Counties — the applicable building department depends on exact parcel location.",
      "Historic design-review zones add scope and timeline considerations.",
    ],
    sources: [],
    relatedProjects: [],
  },
  {
    slug: slug("beaverton"),
    name: "Beaverton",
    state: "OR",
    counties: ["Washington"],
    entityType: "city",
    lat: 45.4871,
    lng: -122.8037,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Beaverton Building Division",
      buildingDeptUrl: "https://www.beavertonoregon.gov/213/Building",
      permitScopeNote: "Permit scope depends on project size — verify before applying.",
    },
    sources: [],
    relatedProjects: [],
  },
  {
    slug: slug("lake-oswego"),
    name: "Lake Oswego",
    state: "OR",
    counties: ["Clackamas", "Multnomah", "Washington"],
    entityType: "city",
    lat: 45.4207,
    lng: -122.6706,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Lake Oswego Building Division",
      buildingDeptUrl: "https://www.ci.oswego.or.us/building",
      permitScopeNote: "Confirm permit scope with the department before applying.",
    },
    sources: [],
    relatedProjects: [],
  },
  {
    slug: slug("hillsboro"),
    name: "Hillsboro",
    state: "OR",
    counties: ["Washington"],
    entityType: "city",
    lat: 45.5229,
    lng: -122.9898,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Hillsboro Building Division",
      buildingDeptUrl: "https://www.hillsboro-oregon.gov/departments/planning/building",
      permitScopeNote: "Confirm permit scope with the department before applying.",
    },
    sources: [],
    relatedProjects: [],
  },
  {
    slug: slug("tigard"),
    name: "Tigard",
    state: "OR",
    counties: ["Washington"],
    entityType: "city",
    lat: 45.4312,
    lng: -122.7715,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Tigard Building Division",
      buildingDeptUrl: "https://www.tigard-or.gov/city-hall/departments/community-development/building",
      permitScopeNote: "Confirm permit scope with the department before applying.",
    },
    sources: [],
    relatedProjects: [],
  },
  {
    slug: slug("happy-valley"),
    name: "Happy Valley",
    state: "OR",
    counties: ["Clackamas"],
    entityType: "city",
    lat: 45.4467,
    lng: -122.5265,
    operatingCoverage: "full",
    priority: 2,
    servicesOffered: [slug("siding-replacement"), slug("window-replacement"), slug("exterior-painting"), slug("trim-and-gutters"), slug("whole-exterior-renovation")],
    jurisdiction: {
      buildingDeptName: "City of Happy Valley Building Division",
      buildingDeptUrl: "https://www.happyvalleyor.gov/government/departments/building",
      permitScopeNote: "Confirm permit scope with the department before applying.",
    },
    sources: [],
    relatedProjects: [],
  },
];

export const sampleProjects: Project[] = [
  {
    slug: slug("mid-century-ranch-exterior-refresh"),
    title: "Mid-century ranch exterior refresh",
    city: slug("vancouver"),
    services: [slug("siding-replacement"), slug("exterior-painting"), slug("trim-and-gutters")],
    materials: [],
    originalCondition:
      "Mid-century ranch in Vancouver's 98661 with tired cladding, dated trim, and finish work that no longer matched the owner's plans for the house.",
    scope: [
      "Full exterior refresh including siding, trim, and finish",
      "Flashing and penetration details corrected during the re-cladding",
      "Coordinated finish coat with new trim profiles",
    ],
    productsInstalled: [],
    outcome:
      "A refreshed exterior that modernizes the ranch without erasing the architecture, with corrected flashing details documented for the owner's records.",
    photos: [img("/ctf/33C8Uu510N5y2u5WoFGyj9/01-exterior-front-750.webp", "Mid-century ranch exterior after refresh — Vancouver, WA", 750, 500)],
    customerComments: [],
  },
  {
    slug: slug("mid-century-modern-whole-home-remodel"),
    title: "Mid-century modern whole-home remodel",
    city: slug("vancouver"),
    services: [slug("whole-exterior-renovation"), slug("siding-replacement"), slug("window-replacement")],
    materials: [],
    originalCondition:
      "Mid-century modern home in Vancouver's 98663 whose exterior had drifted away from the house's original design intent, with windows and envelope details that needed attention beyond cosmetic repair.",
    scope: [
      "Whole-home exterior scope including siding, windows, and trim",
      "WRB and flashing corrected at every opening and transition",
      "Finish work coordinated across siding, trim, and openings for a single visual story",
    ],
    productsInstalled: [],
    outcome:
      "A whole-home exterior transformation that returns the home to a confident mid-century modern character and leaves the envelope documented and tight.",
    photos: [img("/ctf/6kM5u8g5lU78Y1vIebWMEz/01-exterior-front-750.webp", "Mid-century modern home after whole-home remodel — Vancouver, WA", 750, 500)],
    customerComments: [],
  },
  {
    slug: slug("modern-whole-home-remodel"),
    title: "Modern whole-home exterior",
    city: slug("vancouver"),
    services: [slug("whole-exterior-renovation"), slug("siding-replacement"), slug("window-replacement"), slug("trim-and-gutters")],
    materials: [],
    originalCondition:
      "Older Vancouver home in the 98683 area that the owners wanted to re-skin into a modern exterior while also correcting the envelope details underneath.",
    scope: [
      "Full-exterior scope including siding, windows, trim, and gutters",
      "Updated flashing and WRB details across the envelope",
      "Modern cladding and finish palette applied across the home",
    ],
    productsInstalled: [],
    outcome:
      "A modernized exterior with documented envelope corrections — the house looks right from the street, and the walls behind it are built to shed water correctly.",
    photos: [img("/ctf/1ywW6ufcKBIaBTL3CnzrQg/03-exterior-front-side-750.webp", "Modern whole-home remodel — Vancouver, WA", 750, 500)],
    customerComments: [],
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
    guides: [slug("repair-or-replace"), slug("comparing-materials")],
    reviewer: "The JDI Construction team",
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
    reviewer: "The JDI Construction team",
    claims: [],
  },
  {
    slug: slug("comparing-materials"),
    pillar: slug("pacific-northwest-siding"),
    title: "Comparing siding materials for Northwest homes",
    question: "Fiber cement, LP SmartSide, cedar, or vinyl — which actually fits your house, climate, and ownership horizon?",
    summary:
      "An honest comparison of the four siding systems we install, how each handles Pacific Northwest conditions, and the decision framework we use with homeowners.",
    mdxPath: "resources/pacific-northwest-siding/comparing-materials",
    datePublished: "2026-10-01",
    reviewer: "The JDI Construction team",
    claims: [],
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
      { name: "Material system", description: "Fiber cement, engineered wood, cedar, and vinyl each carry different material and labor cost profiles." },
      { name: "Wall area and complexity", description: "Larger walls with simple geometry are more efficient to install than small walls with many returns, dormers, and offsets." },
      { name: "Access and staging", description: "Walls that need scaffolding or lift equipment take longer and cost more than ladder-accessible walls." },
      { name: "Substrate condition", description: "Rotted or damaged sheathing adds material and labor; the magnitude is only known after tear-off." },
      { name: "Trim and detail scope", description: "Replacement trim profiles, corner details, and flashing choices change both cost and finished appearance." },
      { name: "Permits and jurisdiction", description: "Permit fees and historic/overlay review requirements vary by jurisdiction." },
    ],
    rangeNotes:
      "A defensible per-square range for Southwest Washington and the Portland metro publishes here as we normalize completed-project data across the four material systems. We'd rather talk you through drivers than hand you a city-by-city number we can't back up.",
    sources: [],
    isSample: true,
    sampleNote: "Numeric range pending normalized project data; drivers and scope assumptions are already accurate for the Portland / Vancouver market.",
  },
];

export const sampleComparisons: Comparison[] = [
  {
    slug: slug("fiber-cement-vs-lp-smartside"),
    topic: "Fiber cement vs LP SmartSide",
    summary:
      "Both are durable engineered siding systems installed widely in the Pacific Northwest. They differ in composition, weight, installation details, finish options, and long-term maintenance.",
    mdxPath: "compare/fiber-cement-vs-lp-smartside",
    reviewer: "The JDI Construction team",
    claims: [],
  },
];

/** Homepage FAQ list (brief §13). Shared with the exterior-painting / siding / windows service pages where appropriate. */
export const homepageFaq: { q: string; a: string }[] = [
  {
    q: "Do you work in both Washington and Oregon?",
    a: "Yes. We're registered with Washington L&I (JDICOCN932KZ) and licensed in Oregon with the CCB (176101). Our Vancouver, WA office is primary; our Portland, OR office is by appointment.",
  },
  {
    q: "What's the best siding for Oregon rain?",
    a: "Fiber cement is the workhorse in this climate — it won't rot, swell, or feed mold, and it holds paint well through wet winters. Engineered wood is a strong lighter-weight option, and cedar is beautiful for period homes if you'll keep up the finish. The honest answer is that any of them performs well over a correctly built barrier and flashing, and fails without one. The material matters; what's behind it matters more.",
  },
  {
    q: "Should I repaint or re-side?",
    a: "If the siding is sound and just tired, paint is the smart, affordable move. Re-siding makes sense when you're seeing cracked or cupping boards, soft spots, paint that won't hold, or repeated moisture issues — signs the cladding or what's behind it is failing.",
  },
  {
    q: "Can you work on the exterior in winter?",
    a: "Yes — we work through the Northwest wet season year-round. We sequence around the weather, keep walls protected and dried-in as we go, and never leave sheathing exposed to the rain.",
  },
  {
    q: "Will you match my existing siding?",
    a: "When we're repairing or extending rather than replacing everything, yes — we work to match the profile, exposure, and color as closely as the material allows so the repair blends in.",
  },
  {
    q: "Who handles permits when they're required?",
    a: "We do. Our team pulls permits in the appropriate jurisdiction (city or county, depending on parcel location) when the scope requires one, and coordinates inspections.",
  },
  {
    q: "What's covered by your workmanship warranty?",
    a: "A five-year workmanship warranty on the installation we perform — siding, trim, flashing integration, caulking, and finish-coat application. Manufacturer warranties on the products themselves are separate and come directly from the manufacturer.",
  },
  {
    q: "What happens after I request an estimate?",
    a: "A person reads every request and follows up to confirm next steps. If an on-site visit makes sense, we walk the exterior with you, point out where water is getting in, and lay out what it takes to make the envelope watertight. No pressure.",
  },
];
