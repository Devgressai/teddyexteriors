/**
 * Production validation gate (master brief §03).
 * Runs in `prebuild`. Fails `next build` when any REQUIRED_FOR_PRODUCTION field is unresolved
 * AND NODE_ENV === 'production'.
 *
 * Usage:
 *   NODE_ENV=production tsx scripts/validate-business-config.ts
 *
 * In non-production, prints a warning and exits 0 so dev/preview builds still work.
 */

import { business, REQUIRED_FOR_PRODUCTION, type Field } from "../src/lib/business.config";

type Issue = { path: string; status: string; reason: string };

function getByPath(path: string): Field<unknown> {
  const parts = path.split(".");
  let node: unknown = business as unknown;
  for (const key of parts) {
    if (node && typeof node === "object" && key in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[key];
    } else {
      throw new Error(`business config path not found: ${path}`);
    }
  }
  return node as Field<unknown>;
}

const issues: Issue[] = [];

for (const path of REQUIRED_FOR_PRODUCTION) {
  const field = getByPath(path);
  if (field.value === null) {
    issues.push({ path, status: field.status, reason: "value is null" });
    continue;
  }
  if (field.status !== "confirmed") {
    issues.push({ path, status: field.status, reason: "status is not 'confirmed'" });
  }
}

if (issues.length === 0) {
  console.log("[validate-business-config] OK — all required fields resolved + confirmed.");
  process.exit(0);
}

const isProd = process.env.NODE_ENV === "production";
const header = isProd
  ? "[31m[validate-business-config] FAILED — production build blocked.[0m"
  : "[33m[validate-business-config] WARN — unresolved required fields (non-prod, continuing).[0m";

console.error(header);
for (const i of issues) {
  console.error(`  - ${i.path} (${i.status}): ${i.reason}`);
}
console.error(
  "\nTo resolve: edit src/lib/business.config.ts with { value: ..., status: 'confirmed', confirmedBy, confirmedOn }, and mirror in docs/BUSINESS_FACTS.md.",
);

process.exit(isProd ? 1 : 0);
