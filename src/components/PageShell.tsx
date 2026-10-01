import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "./JsonLd";
import { breadcrumb } from "@/lib/schema";

export type Breadcrumb = { name: string; path: string };

export function PageShell({
  breadcrumbs,
  eyebrow,
  heading,
  intro,
  children,
}: {
  breadcrumbs: Breadcrumb[];
  eyebrow?: string;
  heading: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumb(breadcrumbs)} />
      <section className="bg-[color:var(--surface-warm)] border-b border-[color:var(--border-subtle)]">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="text-xs text-[color:var(--text-secondary)]">
            <ol className="flex flex-wrap items-center gap-x-2">
              {breadcrumbs.map((b, i) => (
                <li key={b.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link href={b.path} className="hover:text-[color:var(--cta-fill)]">
                      {b.name}
                    </Link>
                  ) : (
                    <span className="text-[color:var(--text-primary)]">{b.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && (
            <p className="mt-6 text-xs tracking-[0.14em] uppercase font-semibold text-[color:var(--cta-fill)]">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-4xl lg:text-5xl font-semibold tracking-tight text-[color:var(--text-primary)] max-w-3xl">
            {heading}
          </h1>
          {intro && (
            <p className="mt-5 text-lg text-[color:var(--text-secondary)] max-w-2xl">
              {intro}
            </p>
          )}
        </div>
      </section>
      {children}
    </>
  );
}

export function PreviewState({ message }: { message: string }) {
  return (
    <section className="bg-[color:var(--surface-paper)]">
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-sm text-[color:var(--text-secondary)]">{message}</p>
      </div>
    </section>
  );
}
