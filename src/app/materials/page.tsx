import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell, PreviewState } from "@/components/PageShell";
import { materials } from "@/content-model/registry";

export const metadata: Metadata = {
  title: "Siding Materials — Fiber Cement, Cedar, LP SmartSide, Vinyl",
  description:
    "Compare the siding systems we install in Vancouver, WA and Portland, OR: fiber cement, engineered wood (LP SmartSide), cedar, and vinyl. Each explained for Pacific Northwest conditions.",
  alternates: { canonical: "/materials" },
  openGraph: {
    type: "article",
    title: "Siding Materials — Fiber Cement, Cedar, LP SmartSide, Vinyl",
    description:
      "Compare the siding systems we install for Northwest homes.",
    url: "/materials",
  },
};

const JDI_CDN = "https://www.jdiconstruction.co";

const MATERIAL_IMAGES: Record<string, string> = {
  "fiber-cement": `${JDI_CDN}/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp`,
  "engineered-wood": `${JDI_CDN}/ctf/1ywW6ufcKBIaBTL3CnzrQg/03-exterior-front-side-750.webp`,
  cedar: `${JDI_CDN}/ctf/33C8Uu510N5y2u5WoFGyj9/01-exterior-front-750.webp`,
  vinyl: `${JDI_CDN}/ctf/6kM5u8g5lU78Y1vIebWMEz/01-exterior-front-750.webp`,
};

export default function MaterialsIndex() {
  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }]}
      eyebrow="Materials"
      heading="Four systems. One continuous envelope."
      intro="Each material has trade-offs in look, maintenance, and installation. These pages describe what we install, how we handle it, and why we recommend a given system in Pacific Northwest conditions."
    >
      {materials.length === 0 ? (
        <PreviewState message="Material pages publish once the confirmed install list is populated." />
      ) : (
        <section className="bg-[color:var(--surface-paper)]" aria-label="Material systems">
          <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {materials.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/materials/${m.slug}`}
                    className="group block h-full overflow-hidden rounded-sm border border-[color:var(--border-subtle)] hover:border-[color:var(--brand-cta)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-cta)] transition-colors"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-[color:var(--surface-mist)]">
                      {MATERIAL_IMAGES[m.slug] && (
                        <Image
                          src={MATERIAL_IMAGES[m.slug]}
                          alt={`${m.product} on a Northwest exterior`}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      )}
                    </div>
                    <div className="p-7">
                      <p className="eyebrow">{m.manufacturer}</p>
                      <h2 className="mt-3 editorial-h3 text-[color:var(--ink-emphasis)] group-hover:text-[color:var(--brand-cta)]">
                        {m.product}
                      </h2>
                      {m.installationNotes && (
                        <p className="mt-3 text-[0.9rem] text-[color:var(--ink-secondary)] leading-relaxed line-clamp-3">
                          {m.installationNotes}
                        </p>
                      )}
                      <span className="mt-5 inline-flex items-center text-[0.85rem] font-semibold text-[color:var(--brand-cta)]">
                        Learn more about {m.product.split(" ")[0]}
                        <svg viewBox="0 0 20 20" className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5">
                          <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </PageShell>
  );
}
