import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Credentials — WA L&I Registration + Oregon CCB License",
  description:
    "Washington L&I registration and Oregon CCB license — numbers, issuing entities, and direct verification links. The record at the issuing authority is authoritative, not what any contractor website says.",
  alternates: { canonical: "/credentials" },
  openGraph: {
    type: "article",
    title: "Credentials — WA L&I Registration + Oregon CCB License",
    description: "Verifiable registration + license numbers linked to the issuing agencies.",
    url: "/credentials",
  },
};

type CredentialColumn = {
  flag: string;
  state: string;
  heading: string;
  number?: string | null;
  numberLabel: string;
  entity?: string | null;
  classifications?: string[] | null;
  classLabel: string;
  checked?: string | null;
  verifyUrl: string;
  verifyLabel: string;
};

function CredentialCard({ col }: { col: CredentialColumn }) {
  return (
    <article className="rounded-sm border border-[color:var(--border-subtle)] bg-[color:var(--surface-paper)] p-7 lg:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{col.state}</p>
          <h2 className="mt-3 editorial-h2 text-[color:var(--ink-emphasis)]">{col.heading}</h2>
        </div>
        <span aria-hidden="true" className="text-[1.6rem] leading-none">
          {col.flag}
        </span>
      </div>
      <dl className="mt-6 space-y-4 text-[0.9rem]">
        {col.number && (
          <div>
            <dt className="text-[0.72rem] uppercase tracking-wider text-[color:var(--ink-tertiary)]">
              {col.numberLabel}
            </dt>
            <dd className="mt-1 stat text-[color:var(--brand-primary)]">{col.number}</dd>
          </div>
        )}
        {col.entity && (
          <div>
            <dt className="text-[0.72rem] uppercase tracking-wider text-[color:var(--ink-tertiary)]">
              Entity on registration
            </dt>
            <dd className="mt-1 text-[color:var(--ink-emphasis)]">{col.entity}</dd>
          </div>
        )}
        {col.classifications && col.classifications.length > 0 && (
          <div>
            <dt className="text-[0.72rem] uppercase tracking-wider text-[color:var(--ink-tertiary)]">
              {col.classLabel}
            </dt>
            <dd className="mt-1 text-[color:var(--ink-secondary)]">{col.classifications.join(", ")}</dd>
          </div>
        )}
        {col.checked && (
          <div>
            <dt className="text-[0.72rem] uppercase tracking-wider text-[color:var(--ink-tertiary)]">
              Status last verified
            </dt>
            <dd className="mt-1 text-[color:var(--ink-secondary)]">{col.checked}</dd>
          </div>
        )}
      </dl>
      <Link
        href={col.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-7 inline-flex items-center gap-2 rounded-sm bg-[color:var(--brand-cta)] px-5 py-3 text-[0.85rem] font-semibold text-[color:var(--brand-cta-ink)] hover:bg-[color:var(--brand-cta-hover)]"
      >
        {col.verifyLabel}
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
          <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
        </svg>
      </Link>
    </article>
  );
}

export default function CredentialsPage() {
  const wa: CredentialColumn = {
    flag: "🇺🇸",
    state: "Washington",
    heading: "L&I registered.",
    number: get<string>("credentials.waLniNumber"),
    numberLabel: "L&I registration number",
    entity: get<string>("credentials.waLniEntityName"),
    classifications: get<string[]>("credentials.waLniClassifications"),
    classLabel: "Classifications",
    checked: get<string>("credentials.waLniStatusCheckedOn"),
    verifyUrl: "https://secure.lni.wa.gov/verify/",
    verifyLabel: "Verify at Washington L&I",
  };
  const or: CredentialColumn = {
    flag: "🇺🇸",
    state: "Oregon",
    heading: "CCB licensed.",
    number: get<string>("credentials.orCcbNumber"),
    numberLabel: "CCB license number",
    entity: get<string>("credentials.orCcbEntityName"),
    classifications: get<string[]>("credentials.orCcbEndorsements"),
    classLabel: "Endorsements",
    checked: get<string>("credentials.orCcbStatusCheckedOn"),
    verifyUrl: "https://search.ccb.state.or.us/search/",
    verifyLabel: "Verify at Oregon CCB",
  };

  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Credentials", path: "/credentials" }]}
      eyebrow="Credentials"
      heading="Verified where you can check them."
      intro="Both state agencies maintain public records. The links below take you to the issuing authority — the record there is authoritative, not what any contractor website says."
    >
      <section className="bg-[color:var(--surface-warm)]" aria-label="State credentials">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20 grid gap-6 lg:grid-cols-2">
          <CredentialCard col={wa} />
          <CredentialCard col={or} />
        </div>
      </section>
      <section className="bg-[color:var(--surface-stone)] border-t border-[color:var(--border-subtle)]" aria-label="Why registration matters">
        <div className="mx-auto max-w-5xl px-6 py-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Why state registration matters</p>
            <h2 className="mt-3 editorial-h2 max-w-[26ch]">Hiring an unregistered contractor is riskier than most homeowners realize.</h2>
            <p className="mt-5 text-[0.95rem] text-[color:var(--ink-secondary)] leading-relaxed max-w-[56ch]">
              Washington L&amp;I registration and Oregon CCB licensing both require active bonding, insurance, and
              disclosure of ownership. The verification tools linked above show current status, bond amount, insurance
              expiry, and any complaint history — information a contractor can&apos;t edit on their own site.
            </p>
            <p className="mt-4 text-[0.85rem] text-[color:var(--ink-tertiary)] max-w-[56ch]">
              If a contractor can&apos;t give you a registration number, don&apos;t let them write on your house.
            </p>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-sm border-l-2 border-[color:var(--brand-cta)] bg-[color:var(--surface-paper)] p-6">
              <p className="eyebrow">Verify any contractor</p>
              <ul className="mt-4 space-y-3 text-[0.85rem]">
                <li>
                  <Link
                    href="https://secure.lni.wa.gov/verify/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[color:var(--brand-cta)] hover:underline"
                  >
                    Washington L&amp;I Contractor Lookup
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://search.ccb.state.or.us/search/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[color:var(--brand-cta)] hover:underline"
                  >
                    Oregon CCB License Lookup
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
