import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { services } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Exterior Services — Siding, Windows, Trim, Gutters, Painting",
  description:
    "Full-service exterior remodeling in Vancouver, WA and Portland, OR — siding replacement, window replacement, exterior painting, trim, gutters, dry-rot remediation, and coordinated whole-exterior renovation.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "article",
    title: "Exterior Services — Siding, Windows, Trim, Gutters, Painting",
    description:
      "Full-service exterior remodeling in Vancouver, WA and Portland, OR.",
    url: "/services",
  },
};

const JDI_CDN = "https://www.jdiconstruction.co";

const SERVICE_IMAGES: Record<string, string> = {
  "siding-replacement": `${JDI_CDN}/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp`,
  "window-replacement": `${JDI_CDN}/ctf/2867howEJWyt6wVMWkIkN4/02-exterior-front-1920.webp`,
  "exterior-painting": `${JDI_CDN}/ctf/33C8Uu510N5y2u5WoFGyj9/01-exterior-front-750.webp`,
  "trim-and-gutters": `${JDI_CDN}/ctf/1ywW6ufcKBIaBTL3CnzrQg/03-exterior-front-side-750.webp`,
  "envelope-remediation": `${JDI_CDN}/ctf/6kM5u8g5lU78Y1vIebWMEz/01-exterior-front-750.webp`,
  "whole-exterior-renovation": `${JDI_CDN}/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp`,
};

export default function ServicesIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
      eyebrow="Services"
      heading="Exterior work, done with written scope and documented installation."
      intro="Hire for a single service, or coordinate a complete exterior. Each service page explains scope, exclusions, materials, and what the estimate process covers."
    >
      {services.length === 0 ? (
        <PreviewState message="Service pages publish once the confirmed service list is populated in the content model." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]" aria-label="Service list">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => {
                const image = SERVICE_IMAGES[s.slug];
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group block h-full rounded-sm overflow-hidden border border-[color:var(--border-subtle)] hover:border-[color:var(--brand-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-cta)] transition-colors"
                    >
                      {image && (
                        <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface-mist)]">
                          <Image
                            src={image}
                            alt={`${s.name} on a Northwest exterior`}
                            fill
                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 48vw, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h2 className="text-[1.0625rem] font-semibold text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                          {s.name}
                        </h2>
                        <p className="mt-2 text-[0.875rem] text-[color:var(--ink-secondary)] leading-relaxed line-clamp-4">
                          {s.summary}
                        </p>
                        <span className="mt-4 inline-flex items-center text-[0.8rem] font-semibold text-[color:var(--brand-cta)]">
                          View service
                          <svg viewBox="0 0 20 20" className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                            <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  );
}
