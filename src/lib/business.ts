import { business, REQUIRED_FOR_PRODUCTION, type BusinessConfig, type Field } from "./business.config";

const isProd = process.env.NODE_ENV === "production";
const explicitAllowPreview = process.env.TEDDY_ALLOW_PREVIEW_BUILD === "1";

/**
 * A build is in preview mode when either:
 *  - the env flag is explicitly set, OR
 *  - identity.domain is not yet confirmed (you literally cannot be in production
 *    without a canonical domain, so this is a safe auto-detection).
 */
function isPreviewBuild(): boolean {
  if (explicitAllowPreview) return true;
  const domain = business.identity.domain;
  if (domain.value === null || domain.status !== "confirmed") return true;
  return false;
}

function getField(path: string): Field<unknown> {
  const parts = path.split(".");
  let node: unknown = business as unknown;
  for (const key of parts) {
    if (node && typeof node === "object" && key in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[key];
    } else {
      throw new Error(`[business] path not found: ${path}`);
    }
  }
  return node as Field<unknown>;
}

/**
 * Returns the field's value if confirmed. In production with a confirmed domain,
 * throws on unresolved reads (defense-in-depth beyond the prebuild validator).
 * Returns null in dev or in auto-detected preview builds so templates can gate gracefully.
 */
export function get<T = unknown>(path: string): T | null {
  const field = getField(path);
  if (field.value !== null && field.status === "confirmed") return field.value as T;
  if (isProd && !isPreviewBuild()) {
    throw new Error(
      `[business] production read of unresolved field "${path}" (status=${field.status})`,
    );
  }
  return (field.value as T | null) ?? null;
}

/** Display helper: returns value if any, else fallback. Never throws. Prefer this in UI. */
export function display<T = string>(path: string, fallback: T): T {
  const field = getField(path);
  return (field.value as T | null) ?? fallback;
}

/** True iff the field is set + confirmed. */
export function isConfirmed(path: string): boolean {
  const field = getField(path);
  return field.value !== null && field.status === "confirmed";
}

/** True iff any required-for-production field is unresolved. Drives noindex / banner / robots. */
export function hasUnresolvedRequirements(): boolean {
  for (const path of REQUIRED_FOR_PRODUCTION) {
    if (!isConfirmed(path)) return true;
  }
  return false;
}

export type { BusinessConfig };
