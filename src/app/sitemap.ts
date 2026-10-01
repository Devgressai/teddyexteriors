import type { MetadataRoute } from "next";
import { get } from "@/lib/business";
import {
  services,
  materials,
  cities,
  projects,
  resourcePillars,
  resourceGuides,
  costGuides,
  comparisons,
} from "@/content-model/registry";

/** Sample content never appears in the sitemap. */
const notSample = <T extends { isSample?: boolean }>(x: T): boolean => !x.isSample;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = get<string>("identity.domain");
  if (!base) return [];
  const now = new Date();

  const entry = (
    path: string,
    priority = 0.5,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  const entries: MetadataRoute.Sitemap = [
    entry("/", 1.0, "weekly"),
    entry("/services", 0.9, "monthly"),
    entry("/materials", 0.8, "monthly"),
    entry("/service-areas", 0.9, "monthly"),
    entry("/service-areas/washington", 0.85, "monthly"),
    entry("/service-areas/oregon", 0.85, "monthly"),
    entry("/projects", 0.9, "weekly"),
    entry("/resources", 0.8, "monthly"),
    entry("/costs", 0.7, "monthly"),
    entry("/compare", 0.6, "monthly"),
    entry("/about", 0.6, "yearly"),
    entry("/team", 0.6, "yearly"),
    entry("/credentials", 0.6, "yearly"),
    entry("/process", 0.6, "yearly"),
    entry("/warranty", 0.5, "yearly"),
    entry("/reviews", 0.5, "monthly"),
    entry("/contact", 0.6, "yearly"),
    entry("/request-estimate", 0.9, "yearly"),
    entry("/privacy", 0.3, "yearly"),
    entry("/terms", 0.3, "yearly"),
    entry("/accessibility", 0.3, "yearly"),
  ];

  for (const s of services.filter(notSample)) entries.push(entry(`/services/${s.slug}`, 0.85));
  for (const m of materials.filter(notSample)) entries.push(entry(`/materials/${m.slug}`, 0.7));
  for (const c of cities.filter(notSample)) {
    const state = c.state === "WA" ? "washington" : "oregon";
    entries.push(entry(`/service-areas/${state}/${c.slug}`, 0.8));
    for (const sv of c.servicesOffered) {
      const svcEntry = services.find((x) => x.slug === sv);
      if (svcEntry && !svcEntry.isSample) {
        entries.push(entry(`/service-areas/${state}/${c.slug}/${sv}`, 0.75));
      }
    }
  }
  for (const p of projects.filter(notSample)) entries.push(entry(`/projects/${p.slug}`, 0.8));
  for (const rp of resourcePillars.filter(notSample)) entries.push(entry(`/resources/${rp.slug}`, 0.7));
  for (const rg of resourceGuides.filter(notSample)) entries.push(entry(`/resources/${rg.pillar}/${rg.slug}`, 0.6));
  for (const cg of costGuides.filter(notSample)) entries.push(entry(`/costs/${cg.service}`, 0.6));
  for (const cp of comparisons.filter(notSample)) entries.push(entry(`/compare/${cp.slug}`, 0.6));

  return entries;
}
