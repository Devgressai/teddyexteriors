import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Credentials",
  description: "Washington L&I registration and Oregon CCB license. Verify directly with the issuing agency.",
  alternates: { canonical: "/credentials" },
};

export default function CredentialsPage() {
  const waLni = get<string>("credentials.waLniNumber");
  const waEntity = get<string>("credentials.waLniEntityName");
  const waClass = get<string[]>("credentials.waLniClassifications");
  const waChecked = get<string>("credentials.waLniStatusCheckedOn");
  const orCcb = get<string>("credentials.orCcbNumber");
  const orEntity = get<string>("credentials.orCcbEntityName");
  const orEnd = get<string[]>("credentials.orCcbEndorsements");
  const orChecked = get<string>("credentials.orCcbStatusCheckedOn");

  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Credentials", path: "/credentials" }]}
      eyebrow="Credentials"
      heading="Verified where you can check them."
      intro="Both state agencies maintain public records. The links below take you to the issuing authority — the record there is authoritative, not what any contractor website says."
    >
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-3xl px-6 py-16 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Washington</h2>
            <dl className="mt-4 text-sm space-y-3">
              {waLni && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">L&amp;I registration</dt>
                  <dd className="font-semibold">{waLni}</dd>
                </div>
              )}
              {waEntity && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Entity on registration</dt>
                  <dd>{waEntity}</dd>
                </div>
              )}
              {waClass && waClass.length > 0 && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Classifications</dt>
                  <dd>{waClass.join(", ")}</dd>
                </div>
              )}
              {waChecked && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Status last verified</dt>
                  <dd>{waChecked}</dd>
                </div>
              )}
            </dl>
            <a
              href="https://secure.lni.wa.gov/verify/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]"
            >
              Verify at Washington L&amp;I <span aria-hidden="true" className="ml-1">→</span>
            </a>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Oregon</h2>
            <dl className="mt-4 text-sm space-y-3">
              {orCcb && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">CCB license</dt>
                  <dd className="font-semibold">{orCcb}</dd>
                </div>
              )}
              {orEntity && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Entity on license</dt>
                  <dd>{orEntity}</dd>
                </div>
              )}
              {orEnd && orEnd.length > 0 && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Endorsements</dt>
                  <dd>{orEnd.join(", ")}</dd>
                </div>
              )}
              {orChecked && (
                <div>
                  <dt className="text-[color:var(--text-secondary)]">Status last verified</dt>
                  <dd>{orChecked}</dd>
                </div>
              )}
            </dl>
            <a
              href="https://search.ccb.state.or.us/search/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center text-sm font-semibold text-[color:var(--cta-fill)]"
            >
              Verify at Oregon CCB <span aria-hidden="true" className="ml-1">→</span>
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
