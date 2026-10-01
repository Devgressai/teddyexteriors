import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectFrontmatter = {
  title: string;
  city: string;
  region: string;
  completedOn: string;
  siding: {
    product: string;
    series?: string;
    texture?: string;
    thicknessIn?: number;
    squares?: number;
  };
  trim?: {
    product: string;
    series?: string;
    dimensions?: string;
  };
  sheathing?: {
    product: string;
    thicknessIn?: number;
  };
  scope: string[];
  inspectionMilestones?: { name: string; date: string }[];
  heroImage?: string;
  images?: string[];
  video?: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    contentUrl?: string;
    embedUrl?: string;
    durationIso?: string;
  };
  description: string;
};

export function listProjectSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function readProjectFrontmatter(slug: string): ProjectFrontmatter {
  const file = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
  const { data } = matter(file);
  return data as ProjectFrontmatter;
}
