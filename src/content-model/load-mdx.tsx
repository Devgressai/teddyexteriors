import type { ReactElement } from "react";

/**
 * Soft-load an MDX file. If the file doesn't exist, returns a fallback component
 * that renders a visible notice — never crashes the build or the request.
 *
 * Usage:
 *   const Body = await loadMdx("resources/pacific-northwest-siding/repair-or-replace");
 *   <Body />
 */
export async function loadMdx(relativePath: string): Promise<() => ReactElement> {
  try {
    const mod = await import(`../../content/${relativePath}.mdx`);
    return mod.default as () => ReactElement;
  } catch {
    return function MissingMdx() {
      return (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-semibold">Guide body pending.</p>
          <p className="mt-1 opacity-80">
            This page is registered in the content model, but the corresponding MDX file at
            <code className="mx-1 text-xs">content/{relativePath}.mdx</code>
            has not been authored yet. Create it to publish the full guide body.
          </p>
        </div>
      );
    };
  }
}
