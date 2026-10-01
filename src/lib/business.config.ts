/**
 * Single source of truth for business facts.
 *
 * Rules:
 *  - Required fields with `value: null` block production builds via `scripts/validate-business-config.ts`.
 *  - Dev / preview renders show a banner when any required field is unresolved; copy/metadata/schema use
 *    the typed accessors in `src/lib/business.ts` which throw in production when a required field is missing.
 *  - Mirror every change in `docs/BUSINESS_FACTS.md` with status + source + confirmedBy/confirmedOn.
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

export const business: BusinessConfig = {
  identity: {
    brandName: { value: "Teddy Exteriors", status: "pending-owner", notes: "Working name until owner confirms" },
    legalEntity: empty(),
    dba: empty(),
    domain: empty(),
    tagline: empty(),
  },
  credentials: {
    waLniNumber: { ...empty(), source: "https://www.lni.wa.gov/" },
    waLniEntityName: empty(),
    waLniClassifications: empty(),
    waLniStatusCheckedOn: empty("pending-verification"),
    orCcbNumber: { ...empty(), source: "https://www.oregon.gov/ccb/" },
    orCcbEntityName: empty(),
    orCcbEndorsements: empty(),
    orCcbStatusCheckedOn: empty("pending-verification"),
    bond: empty(),
    liability: empty(),
  },
  contact: {
    phone: empty(),
    emailPublic: empty(),
    emailLeadDestination: empty(),
    hours: empty(),
    operatingBase: empty(),
  },
  territory: {
    originPoints: empty(),
    radiusDefinition: empty(),
    radiusMiles: { value: 100, status: "pending-owner", notes: "Candidate value from brief; owner confirms definition + miles" },
    confirmedCities: empty(),
    explicitExclusions: empty(),
  },
  services: { confirmed: empty() },
  materials: { confirmed: empty(), hardieProgramStatus: empty() },
  warranty: {
    workmanshipScope: empty(),
    workmanshipDuration: empty(),
    exclusions: empty(),
    manufacturerSeparate: empty(),
  },
  leadership: empty(),
  reviews: empty(),
  operations: {
    crm: empty(),
    analyticsId: empty(),
    hosting: empty(),
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
