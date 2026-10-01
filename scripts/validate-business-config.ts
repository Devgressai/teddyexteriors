/**
 * Production validation gate (master brief §03).
 * Runs in `prebuild`. Fails `next build` when any REQUIRED_FOR_PRODUCTION field is unresolved
 * AND the build is production AND we're not in preview mode.
 *
 * Preview mode is auto-detected: if identity.domain is unresolved, there's no way we're
 * launching the real site yet, so the gate relaxes to a warning. Explicitly setting
 * TEDDY_ALLOW_PREVIEW_BUILD=1 also forces preview mode.
 *
 * Production detection: Vercel runs pnpm prebuild outside of NODE_ENV=production (that's
 * only set during `next build` itself), so we also treat VERCEL_ENV=production and
 * VERCEL=1-with-no-domain as production. The intent: strict gate only fires when the
 * owner has actually configured a real domain in business.config.ts.
 *
 * See docs/DECISIONS.md D-010.
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

const isProd = process.env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
const explicitAllow = process.env.TEDDY_ALLOW_PREVIEW_BUILD === "1";
const domainField = business.identity.domain;
const domainUnresolved = domainField.value === null || domainField.status !== "confirmed";
const previewMode = explicitAllow || domainUnresolved;
const willBlock = isProd && !previewMode;

const reason =
  !isProd
    ? "non-prod build"
    : explicitAllow
      ? "TEDDY_ALLOW_PREVIEW_BUILD=1 set"
      : domainUnresolved
        ? "identity.domain not confirmed — auto-detected preview"
        : "production gate active";

const header = willBlock
  ? `[validate-business-config] FAILED — production build blocked (${reason}).`
  : `[validate-business-config] WARN (${reason}) — unresolved required fields follow. Runtime noindex guards remain active.`;

console.error(header);
for (const i of issues) {
  console.error(`  - ${i.path} (${i.status}): ${i.reason}`);
}
console.error(
  "\nTo resolve: edit src/lib/business.config.ts with { value: ..., status: 'confirmed', confirmedBy, confirmedOn }, and mirror in docs/BUSINESS_FACTS.md.",
);

process.exit(willBlock ? 1 : 0);
