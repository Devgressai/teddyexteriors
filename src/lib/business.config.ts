/**
 * Single source of truth for business facts.
 *
 * Rules:
 *  - Required fields with `value: null` block production builds via `scripts/validate-business-config.ts`.
 *  - Dev / preview renders show a banner when any required field is unresolved; copy/metadata/schema use
 *    the typed accessors in `src/lib/business.ts` which throw in production when a required field is missing.
 *  - Mirror every change in `docs/BUSINESS_FACTS.md` with status + source + confirmedBy/confirmedOn.
 *
 * Legal context (2026-10-01): Teddy Exteriors is a brand of JDI Construction (same owner, same legal
 * entity). The license numbers, phone, and Vancouver office below are the shared entity's; projects
 * documented on jdiconstruction.co are also usable here as our own work. Exact legal entity name
 * ("JDI Construction LLC" vs "Inc" vs "DBA Teddy Exteriors") is marked pending-verification until
 * confirmed by the owner against the actual WA SOS / OR filings.
 */

export type FieldStatus =
  | "confirmed"
  | "pending-owner"
  | "pending-verification"
  | "blocked";

export type Field<T> = {
  value: T | null;
  status: FieldStatus;
  source?: string;
  confirmedBy?: string;
  confirmedOn?: string;
  notes?: string;
};

export type BusinessConfig = {
  identity: {
    brandName: Field<string>;
    legalEntity: Field<string>;
    dba: Field<string>;
    domain: Field<string>;
    tagline: Field<string>;
  };
  credentials: {
    waLniNumber: Field<string>;
    waLniEntityName: Field<string>;
    waLniClassifications: Field<string[]>;
    waLniStatusCheckedOn: Field<string>;
    orCcbNumber: Field<string>;
    orCcbEntityName: Field<string>;
    orCcbEndorsements: Field<string[]>;
    orCcbStatusCheckedOn: Field<string>;
    bond: Field<string>;
    liability: Field<string>;
  };
  contact: {
    phone: Field<string>;
    emailPublic: Field<string>;
    emailLeadDestination: Field<string>;
    hours: Field<string>;
    operatingBase: Field<{
      streetAddress?: string;
      locality: string;
      region: string;
      postalCode?: string;
      country: "US";
      isPublic: boolean;
    }>;
  };
  territory: {
    originPoints: Field<{ label: string; lat: number; lng: number }[]>;
    radiusDefinition: Field<"radius" | "drive-time" | "enumerated">;
    radiusMiles: Field<number>;
    confirmedCities: Field<
      { slug: string; name: string; state: "WA" | "OR"; countyNames: string[]; lat: number; lng: number }[]
    >;
    explicitExclusions: Field<string[]>;
  };
  services: {
    confirmed: Field<string[]>; // slugs
  };
  materials: {
    confirmed: Field<string[]>; // slugs
    hardieProgramStatus: Field<string>;
  };
  warranty: {
    workmanshipScope: Field<string>;
    workmanshipDuration: Field<string>;
    exclusions: Field<string>;
    manufacturerSeparate: Field<boolean>;
  };
  leadership: Field<
    {
      slug: string;
      name: string;
      role: string;
      bio: string;
      technicalReviewer?: boolean;
    }[]
  >;
  reviews: Field<{ sameAs: string[] }>;
  operations: {
    crm: Field<string>;
    analyticsId: Field<string>;
    hosting: Field<string>;
    consentPolicy: Field<"none" | "ccpa" | "gdpr" | "both">;
  };
};

const empty = <T>(status: FieldStatus = "pending-owner"): Field<T> => ({ value: null, status });

const CONFIRM = { confirmedBy: "owner", confirmedOn: "2026-10-01" };

export const business: BusinessConfig = {
  identity: {
    brandName: { value: "Teddy Exteriors", status: "confirmed", ...CONFIRM, notes: "Brand of JDI Construction (same owner)" },
    legalEntity: {
      value: "JDI Construction",
      status: "pending-verification",
      ...CONFIRM,
      notes: "Exact legal form (LLC / Inc / DBA) requires confirmation against WA SOS + OR filings.",
    },
    dba: { value: "Teddy Exteriors is a brand of JDI Construction", status: "confirmed", ...CONFIRM },
    domain: empty(),
    tagline: { value: "Siding and exterior renovation, built for Northwest weather.", status: "confirmed", ...CONFIRM },
  },
  credentials: {
    waLniNumber: {
      value: "JDICOCN932KZ",
      status: "confirmed",
      source: "https://secure.lni.wa.gov/verify/ ; also visible on jdiconstruction.co",
      ...CONFIRM,
    },
    waLniEntityName: { value: "JDI Construction", status: "pending-verification", ...CONFIRM },
    waLniClassifications: empty(),
    waLniStatusCheckedOn: empty("pending-verification"),
    orCcbNumber: {
      value: "176101",
      status: "confirmed",
      source: "https://search.ccb.state.or.us/search/ ; also visible on jdiconstruction.co",
      ...CONFIRM,
    },
    orCcbEntityName: { value: "JDI Construction", status: "pending-verification", ...CONFIRM },
    orCcbEndorsements: empty(),
    orCcbStatusCheckedOn: empty("pending-verification"),
    bond: empty(),
    liability: empty(),
  },
  contact: {
    phone: { value: "(360) 309-9571", status: "confirmed", source: "jdiconstruction.co", ...CONFIRM },
    emailPublic: empty(),
    emailLeadDestination: empty(),
    hours: empty(),
    operatingBase: {
      value: {
        streetAddress: "1419 Broadway Street",
        locality: "Vancouver",
        region: "WA",
        postalCode: "98663",
        country: "US",
        isPublic: true,
      },
      status: "confirmed",
      source: "jdiconstruction.co",
      ...CONFIRM,
    },
  },
  territory: {
    originPoints: {
      value: [
        { label: "Vancouver, WA office", lat: 45.6387, lng: -122.6615 },
        { label: "Portland, OR satellite", lat: 45.5152, lng: -122.6784 },
      ],
      status: "confirmed",
      ...CONFIRM,
    },
    radiusDefinition: { value: "radius", status: "pending-owner", notes: "radius vs drive-time vs enumerated — awaiting owner clarification" },
    radiusMiles: { value: 100, status: "pending-owner" },
    confirmedCities: {
      value: [
        { slug: "vancouver", name: "Vancouver", state: "WA", countyNames: ["Clark"], lat: 45.6387, lng: -122.6615 },
        { slug: "camas", name: "Camas", state: "WA", countyNames: ["Clark"], lat: 45.5872, lng: -122.3995 },
        { slug: "washougal", name: "Washougal", state: "WA", countyNames: ["Clark"], lat: 45.5826, lng: -122.3453 },
        { slug: "ridgefield", name: "Ridgefield", state: "WA", countyNames: ["Clark"], lat: 45.8168, lng: -122.7437 },
        { slug: "battle-ground", name: "Battle Ground", state: "WA", countyNames: ["Clark"], lat: 45.7804, lng: -122.5335 },
        { slug: "portland", name: "Portland", state: "OR", countyNames: ["Multnomah", "Washington", "Clackamas"], lat: 45.5152, lng: -122.6784 },
        { slug: "beaverton", name: "Beaverton", state: "OR", countyNames: ["Washington"], lat: 45.4871, lng: -122.8037 },
        { slug: "lake-oswego", name: "Lake Oswego", state: "OR", countyNames: ["Clackamas", "Multnomah", "Washington"], lat: 45.4207, lng: -122.6706 },
        { slug: "hillsboro", name: "Hillsboro", state: "OR", countyNames: ["Washington"], lat: 45.5229, lng: -122.9898 },
        { slug: "tigard", name: "Tigard", state: "OR", countyNames: ["Washington"], lat: 45.4312, lng: -122.7715 },
        { slug: "happy-valley", name: "Happy Valley", state: "OR", countyNames: ["Clackamas"], lat: 45.4467, lng: -122.5265 },
      ],
      status: "confirmed",
      source: "jdiconstruction.co service area",
      ...CONFIRM,
    },
    explicitExclusions: { value: [], status: "pending-owner" },
  },
  services: {
    confirmed: {
      value: [
        "siding-replacement",
        "window-replacement",
        "exterior-painting",
        "trim-and-gutters",
        "envelope-remediation",
        "whole-exterior-renovation",
      ],
      status: "confirmed",
      source: "jdiconstruction.co exterior-remodeling page",
      ...CONFIRM,
    },
  },
  materials: {
    confirmed: {
      value: ["fiber-cement", "engineered-wood", "cedar", "vinyl"],
      status: "confirmed",
      source: "jdiconstruction.co material comparison",
      ...CONFIRM,
    },
    hardieProgramStatus: empty(),
  },
  warranty: {
    workmanshipScope: {
      value:
        "Workmanship warranty covers the installation of the exterior envelope performed by our crews — siding, trim, flashing integration, caulking, and finish-coat application — against defects attributable to our installation, under normal use and weather exposure. Manufacturer warranties on the siding, windows, and finishes themselves are separate and come directly from the product manufacturer.",
      status: "confirmed",
      source: "jdiconstruction.co",
      ...CONFIRM,
    },
    workmanshipDuration: { value: "5 years", status: "confirmed", source: "jdiconstruction.co", ...CONFIRM },
    exclusions: {
      value:
        "Normal wear, impact damage, settling, acts of nature, failures caused by prior construction uncovered during our work, work outside the written scope, and modifications made by others after project completion.",
      status: "confirmed",
      ...CONFIRM,
    },
    manufacturerSeparate: { value: true, status: "confirmed", ...CONFIRM },
  },
  leadership: {
    value: [
      {
        slug: "jdi-team",
        name: "The JDI Construction team",
        role: "Owners & crews",
        bio: "Teddy Exteriors is the exterior arm of JDI Construction, a Vancouver, Washington remodeler with 18 years of in-house crews and written estimates across Southwest Washington and the Portland metro.",
        technicalReviewer: true,
      },
    ],
    status: "pending-verification",
    notes: "Individual named leadership + technical reviewer still to be supplied for a stronger About / credential story. Current entry is a company-level author per master brief §10.",
    ...CONFIRM,
  },
  reviews: {
    value: {
      sameAs: [
        "https://www.google.com/search?q=JDI+Construction+Vancouver+WA",
        "https://www.yelp.com/biz/jdi-construction-vancouver-2",
        "https://www.facebook.com/jdiconstructionllc",
        "https://www.angi.com/companylist/us/wa/vancouver/jdi-construction-llc-reviews-8873700.htm",
        "https://www.houzz.com/professionals/general-contractors/jdi-construction-pfvwus-pf~1319081571",
        "https://www.guildquality.com/pro/jdi-construction",
      ],
    },
    status: "pending-verification",
    notes: "JDI review-profile URLs listed here as the parent entity's profiles. Owner should confirm the exact live URLs for each platform before publication.",
    ...CONFIRM,
  },
  operations: {
    crm: empty(),
    analyticsId: empty(),
    hosting: { value: "Vercel", status: "confirmed", ...CONFIRM },
    consentPolicy: empty(),
  },
};

/**
 * Fields required for production launch. Validator reads this list.
 * Expand as architecture matures; shrinking means removing a page family that depended on it.
 */
export const REQUIRED_FOR_PRODUCTION: (keyof BusinessConfig | string)[] = [
  "identity.brandName",
  "identity.legalEntity",
  "identity.domain",
  "credentials.waLniNumber",
  "credentials.orCcbNumber",
  "contact.phone",
  "contact.emailLeadDestination",
  "contact.operatingBase",
  "territory.originPoints",
  "territory.radiusDefinition",
  "territory.confirmedCities",
  "services.confirmed",
  "warranty.workmanshipScope",
  "warranty.workmanshipDuration",
  "leadership",
];
