import Link from "next/link";
import type { ExteriorFooterProps } from "./types";

export function ExteriorFooter({
  brandName,
  statement,
  phone,
  email,
  hours,
  waCredentialNumber,
  orCredentialNumber,
  services,
  stateHubs,
  trust,
  policies,
}: ExteriorFooterProps) {
  return (
    <footer className="bg-[color:var(--surface-paper)] border-t border-[color:var(--border-subtle)]">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-lg font-semibold text-[color:var(--text-primary)]">{brandName}</p>
          <p className="mt-3 text-sm text-[color:var(--text-secondary)] max-w-sm">{statement}</p>
          <dl className="mt-6 text-sm space-y-1.5 text-[color:var(--text-primary)]">
            {phone && (
              <div>
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="font-semibold">
                    {phone}
                  </a>
                </dd>
              </div>
            )}
            {email && (
              <div>
                <dt className="sr-only">Email</dt>
                <dd>
                  <a href={`mailto:${email}`}>{email}</a>
                </dd>
              </div>
            )}
            {hours && (
              <div>
                <dt className="sr-only">Hours</dt>
                <dd className="text-[color:var(--text-secondary)]">{hours}</dd>
              </div>
            )}
          </dl>
          {(waCredentialNumber || orCredentialNumber) && (
            <p className="mt-4 text-xs text-[color:var(--text-secondary)]">
              {waCredentialNumber && <>WA L&amp;I <strong className="text-[color:var(--text-primary)]">{waCredentialNumber}</strong></>}
              {waCredentialNumber && orCredentialNumber && " · "}
              {orCredentialNumber && <>OR CCB <strong className="text-[color:var(--text-primary)]">{orCredentialNumber}</strong></>}
            </p>
          )}
        </div>
        <FooterColumn title="Services" items={services} className="lg:col-span-3" />
        <FooterColumn title="Service areas" items={stateHubs} className="lg:col-span-2" />
        <FooterColumn title="About us" items={trust} className="lg:col-span-2" />
      </div>
      <div className="border-t border-[color:var(--border-subtle)]">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[color:var(--text-secondary)]">
          <p>
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <nav aria-label="Policies" className="flex gap-5">
            {policies.map((p) => (
              <Link key={p.href} href={p.href}>
                {p.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  className,
}: {
  title: string;
  items: { label: string; href: string }[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className={className}>
      <h3 className="text-xs uppercase tracking-wider font-semibold text-[color:var(--text-secondary)]">
        {title}
      </h3>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="text-[color:var(--text-primary)] hover:text-[color:var(--cta-fill)]">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
