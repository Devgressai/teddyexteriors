import type { ImageAsset } from "@/content-model/types";
import type { ReactNode } from "react";

export type ExteriorHeaderProps = {
  logo?: ReactNode;
  brandName: string;
  regionSummary?: string;
  waCredentialNumber?: string;
  orCredentialNumber?: string;
  phone?: string;
  nav: { label: string; href: string }[];
  showStickyAfterPx?: number;
};

export type HeroCaption = {
  cityState: string;
  material: string;
  scope: string;
};

export type ExteriorHeroProps = {
  eyebrow: string;
  h1Line1: string;
  h1Line2?: string;
  supporting: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image: ImageAsset;
  caption?: HeroCaption;
};

export type CredentialRailItem = { label: string; value: string; href?: string; sourceNote?: string };
export type CredentialRailProps = { items: CredentialRailItem[] };

export type ServiceExplorerEntry = {
  slug: string;
  title: string;
  description: string;
  image: ImageAsset;
  href: string;
  emphasis?: "lead" | "supporting";
};
export type ServiceExplorerProps = {
  heading: string;
  entries: ServiceExplorerEntry[];
};

export type ProjectFeatureProps = {
  title: string;
  cityState: string;
  challenge: string;
  work: string;
  finish: string;
  images: { before?: ImageAsset; after: ImageAsset };
  href: string;
};

export type BeforeAfterProps = {
  before: ImageAsset;
  after: ImageAsset;
  label?: string;
  mode?: "slider" | "pair"; // pair when alignment is poor
};

export type EnvelopeDetailProps = {
  heading: string;
  intro: string;
  points: { label: string; description: string }[];
  diagram?: ReactNode;
  links: { label: string; href: string }[];
};

export type MaterialCompareEntry = {
  slug: string;
  product: string;
  look: string;
  maintenance: string;
  fit: string;
  image: ImageAsset;
  href?: string;
};
export type MaterialCompareProps = {
  heading: string;
  intro?: string;
  entries: MaterialCompareEntry[];
  compareHref?: string;
};

export type RegionalCoverageGroup = {
  stateLabel: string;
  stateHref: string;
  cities: { name: string; href: string }[];
};
export type RegionalCoverageProps = {
  heading: string;
  groups: RegionalCoverageGroup[];
  supporting?: string;
  mapImage?: ImageAsset;
};

export type ProcessStoryStep = {
  number: string; // "01"
  title: string;
  description: string;
  image?: ImageAsset;
};
export type ProcessStoryProps = {
  heading: string;
  steps: ProcessStoryStep[];
  closing?: string;
};

export type TeamProofPerson = {
  name: string;
  role: string;
  photo?: ImageAsset;
};
export type TeamProofTestimonial = {
  quote: string;
  attribution: string;
  topic: "communication" | "cleanup" | "scope-change" | "install-quality" | "schedule";
};
export type TeamProofProps = {
  heading: string;
  intro: string;
  people: TeamProofPerson[];
  testimonials: TeamProofTestimonial[];
  teamHref: string;
  reviewsHref: string;
};

export type ResourceFeatureGuide = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  image?: ImageAsset;
};
export type ResourceFeatureProps = {
  heading: string;
  featured: ResourceFeatureGuide;
  supporting: ResourceFeatureGuide[];
};

export type EstimateSectionProps = {
  heading: string;
  supporting: string;
  servicePrefill?: string;
  cityPrefill?: string;
  teamImage?: ImageAsset;
  phone?: string;
  responseCommitment?: string;
};

export type ExteriorFooterProps = {
  brandName: string;
  statement: string;
  phone?: string;
  email?: string;
  hours?: string;
  waCredentialNumber?: string;
  orCredentialNumber?: string;
  services: { label: string; href: string }[];
  stateHubs: { label: string; href: string }[];
  trust: { label: string; href: string }[];
  policies: { label: string; href: string }[];
};
