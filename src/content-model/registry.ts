/**
 * In-memory registry of structured content. Finite allowlist for dynamic routes.
 * Populated incrementally as content is authored.
 *
 * Dynamic page files call `listSlugs(entity)` to drive `generateStaticParams()`.
 * Unknown slugs route to `notFound()` via `dynamicParams = false`.
 *
 * Sample content lives in `samples.ts` and is included below. Each sample item has
 * `isSample: true` — the sitemap excludes samples and pages render a visible banner.
 * When the owner confirms the business facts, samples are either promoted (flip the flag
 * + swap placeholder assets) or replaced. URLs do not change.
 */

import type {
  Service,
  Material,
  City,
  Project,
  ResourcePillar,
  ResourceGuide,
  CostGuide,
  Comparison,
  Slug,
} from "./types";
import {
  sampleServices,
  sampleMaterials,
  sampleCities,
  sampleProjects,
  sampleResourcePillars,
  sampleResourceGuides,
  sampleCostGuides,
  sampleComparisons,
} from "./samples";

export const services: Service[] = [...sampleServices];
export const materials: Material[] = [...sampleMaterials];
export const cities: City[] = [...sampleCities];
export const projects: Project[] = [...sampleProjects];
export const resourcePillars: ResourcePillar[] = [...sampleResourcePillars];
export const resourceGuides: ResourceGuide[] = [...sampleResourceGuides];
export const costGuides: CostGuide[] = [...sampleCostGuides];
export const comparisons: Comparison[] = [...sampleComparisons];

type EntityName =
  | "service"
  | "material"
  | "city"
  | "project"
  | "resource-pillar"
  | "resource-guide"
  | "cost-guide"
  | "comparison";

const registries: Record<EntityName, { slug: Slug }[]> = {
  service: services,
  material: materials,
  city: cities,
  project: projects,
  "resource-pillar": resourcePillars,
  "resource-guide": resourceGuides,
  "cost-guide": costGuides,
  comparison: comparisons,
};

export function listSlugs(entity: EntityName): string[] {
  return registries[entity].map((e) => e.slug);
}

export function findBySlug<T extends { slug: Slug }>(entity: EntityName, slug: string): T | undefined {
  return registries[entity].find((e) => e.slug === slug) as T | undefined;
}

export function findCity(cityslug: string, state?: "WA" | "OR"): City | undefined {
  return cities.find((c) => c.slug === cityslug && (state ? c.state === state : true));
}

/** True when any sample content is still in the registry. */
export function hasSamples(): boolean {
  const all = [
    ...services, ...materials, ...cities, ...projects,
    ...resourcePillars, ...resourceGuides, ...costGuides, ...comparisons,
  ];
  return all.some((x) => "isSample" in x && (x as { isSample?: boolean }).isSample);
}
