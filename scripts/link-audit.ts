/**
 * Internal-link audit skeleton (master brief §11).
 *
 * Reads data/page-manifest.json and the content-model registry, then reports:
 *  - orphaned indexable pages (no inbound links from priority hubs)
 *  - broken internal destinations (hrefs that don't match any registered route)
 *  - redirect chains (once a redirects registry is added)
 *  - links to drafts / noncanonical pages
 *  - click depth from the home hub for priority routes (usability goal ~3)
 *
 * This is a skeleton. It becomes authoritative once routes + content are populated.
 * Run: `pnpm tsx scripts/link-audit.ts`
 */

import { readFileSync } from "node:fs";
import path from "node:path";

type ManifestPage = { route: string; family: string; publishStatus: string };
type Manifest = { pages: ManifestPage[] };

function loadManifest(): Manifest {
  const raw = readFileSync(path.join(process.cwd(), "data", "page-manifest.json"), "utf8");
  return JSON.parse(raw) as Manifest;
}

function main() {
  const manifest = loadManifest();
  const published = manifest.pages.filter((p) => p.publishStatus === "planned" || p.publishStatus === "live");
  console.log(`[link-audit] manifest routes: ${manifest.pages.length} (published/planned: ${published.length})`);
  // Expand with crawling + comparison once routes are implemented.
  // Exits non-zero when real defects are detected.
  process.exit(0);
}

main();
