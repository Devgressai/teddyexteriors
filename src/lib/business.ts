import { business, type BusinessConfig, type Field } from "./business.config";

const isProd = process.env.NODE_ENV === "production";
const allowPreview = process.env.TEDDY_ALLOW_PREVIEW_BUILD === "1";

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
 * Returns the field's value if confirmed. In production, throws if unresolved — the prebuild
 * validator should catch this, but this is a defense-in-depth for runtime code paths.
 * In dev/preview, returns the current `value` (may be unconfirmed), or null if not set.
 * Callers must handle null in dev gracefully (do not interpolate into HTML/metadata).
 */
export function get<T = unknown>(path: string): T | null {
  const field = getField(path);
  if (field.value !== null && field.status === "confirmed") return field.value as T;
  if (isProd && !allowPreview) {
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

/** True iff any required-for-production field is unresolved. Used by dev banner. */
export function hasUnresolvedRequirements(): boolean {
  for (const path of ["identity.brandName", "identity.domain", "credentials.waLniNumber", "credentials.orCcbNumber"]) {
    if (!isConfirmed(path)) return true;
  }
  return false;
}

export type { BusinessConfig };
