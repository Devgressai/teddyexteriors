/**
 * Content-model types. Mirrors docs/ARCHITECTURE.md "Content entities" section.
 * All fields that would appear on a public page must trace to a confirmed source — either
 * business.config.ts (business facts) or data/source-register.json (external claims).
 */

export type Slug = string & { readonly __slug: unique symbol };
export const slug = (s: string): Slug => s as Slug;

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  rights: "owned" | "licensed" | "owner-supplied" | "inspiration-only";
  rightsNote?: string;
  focalPoint?: { x: number; y: number };
};

export type ClaimRef = string; // id into data/source-register.json

export type ServiceCategory =
  | "siding"
  | "windows"
  | "doors"
  | "paint"
  | "trim"
  | "gutters"
  | "wood-repair"
  | "envelope"
  | "whole-exterior"
  | "roofing"
  | "decks"
  | "commercial"
  | "multifamily";

export type SampleFlag = { isSample?: boolean; sampleNote?: string };

export type Service = SampleFlag & {
  slug: Slug;
  name: string;
  category: ServiceCategory;
  summary: string;
  scope: string[];
  exclusions: string[];
  materials: Slug[]; // Material.slug refs
  relatedGuides: Slug[]; // ResourceGuide.slug refs
  heroImage?: ImageAsset;
};

export type Material = SampleFlag & {
  slug: Slug;
  product: string;
  manufacturer: string;
  lines?: string[];
  category: "fiber-cement" | "wood" | "metal" | "vinyl" | "composite" | "other";
  installationNotes?: string;
  manufacturerDocsUrl?: string;
  claims: ClaimRef[];
};

export type State = "WA" | "OR";

export type City = SampleFlag & {
  slug: Slug;
  name: string;
  state: State;
  counties: string[]; // Portland spans Multnomah/Washington/Clackamas — plural allowed
  entityType: "city" | "cdp" | "unincorporated" | "neighborhood";
  lat: number;
  lng: number;
  operatingCoverage: "full" | "partial" | "nearby-only";
  partialCoverageNote?: string;
  priority: 1 | 2 | 3;
  servicesOffered: Slug[]; // Service.slug refs
  jurisdiction: {
    buildingDeptName: string;
    buildingDeptUrl: string;
    permitScopeNote?: string;
  };
  localConstraints?: string[];
  sources: ClaimRef[];
  relatedProjects: Slug[];
};

export type Project = SampleFlag & {
  slug: Slug;
  title: string;
  city: Slug; // City.slug
  completionDate?: string; // ISO
  services: Slug[];
  materials: Slug[];
  originalCondition: string;
  scope: string[];
  productsInstalled: string[];
  dimensions?: {
    wallSquares?: number;
    trimLinearFeet?: number;
    sheathingThicknessIn?: number;
    other?: string;
  };
  substrateFindings?: string;
  moistureDetails?: string;
  constraints?: string[];
  changeHandling?: string;
  outcome: string;
  photos: ImageAsset[];
  customerComments?: {
    quote: string;
    attribution: string;
    permissionRecordedBy: string;
    permissionRecordedOn: string;
  }[];
  video?: {
    name: string;
    description: string;
    thumbnail: ImageAsset;
    uploadDate: string;
    contentUrl?: string;
    embedUrl?: string;
    durationIso?: string;
    captionsUrl?: string;
    transcript?: string;
  };
};

export type ResourcePillar = SampleFlag & {
  slug: Slug;
  topic: string;
  scope: string;
  decisionAreas: string[];
  guides: Slug[];
  reviewer: string; // must match business.config leadership[].name with technicalReviewer=true
};

export type ResourceGuide = SampleFlag & {
  slug: Slug;
  pillar: Slug;
  title: string;
  question: string;
  summary: string;
  mdxPath: string;
  datePublished: string;
  dateModified?: string;
  reviewer: string;
  claims: ClaimRef[];
};

export type CostGuide = SampleFlag & {
  slug: Slug;
  service: Slug;
  unitBasis: "per-square" | "per-opening" | "per-linear-foot" | "per-project";
  scopeAssumptions: string[];
  drivers: { name: string; description: string }[];
  rangeLow?: number;
  rangeHigh?: number;
  rangeNotes?: string; // if ranges omitted, explain why
  rangeDate?: string;
  sources: ClaimRef[];
};

export type Comparison = SampleFlag & {
  slug: Slug;
  topic: string;
  summary: string;
  mdxPath: string;
  materials?: Slug[];
  services?: Slug[];
  reviewer: string;
  claims: ClaimRef[];
};
