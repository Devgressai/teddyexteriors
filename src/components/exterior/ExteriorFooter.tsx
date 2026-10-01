import Link from "next/link";
import { Container } from "@/components/primitives";

export type ExteriorFooterProps = {
  brandName: string;
  statement: string;
  phone?: string;
  email?: string;
  hours?: string;
  waCredentialNumber?: string;
  orCredentialNumber?: string;
  services: { label: string; href: string }[];
  stateHubs: { label: string; href: string }[];
  trust: { label: string; href: string }[];
  policies: { label: string; href: string }[];
};

const LogoMark = ({ brandName, inverse = true }: { brandName: string; inverse?: boolean }) => (
  <span className="flex items-center gap-2.5" aria-label={`${brandName} home`}>
    <svg
      viewBox="0 0 32 32"
      className={`h-9 w-9 ${inverse ? "text-[color:var(--brand-secondary)]" : "text-[color:var(--brand-primary)]"}`}
      aria-hidden="true"
    >
      <path d="M4 15 16 5l12 10v12H4V15z" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 3v4M14 7l2-2 2 2M12 10l4-3 4 3" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
    <span className="flex flex-col leading-[0.95]">
      <span className={`text-base font-bold tracking-[0.04em] ${inverse ? "text-white" : "text-[color:var(--ink-emphasis)]"}`}>
        TEDDY
      </span>
      <span
        className={`text-[0.78rem] font-semibold tracking-[0.22em] ${
          inverse ? "text-white/70" : "text-[color:var(--ink-secondary)]"
        }`}
      >
        EXTERIORS
      </span>
    </span>
  </span>
);

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
    <footer className="bg-[color:var(--surface-inverse)] text-[color:var(--ink-inverse)]">
      <Container width="wide">
        <div className="py-[var(--section-pad-md)] grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-10">
          {/* Brand + contact */}
          <div className="col-span-2 md:col-span-4">
            <LogoMark brandName={brandName} />
            <p className="mt-5 text-[0.9rem] text-white/70 leading-relaxed max-w-sm">{statement}</p>
            <dl className="mt-7 space-y-3 text-[0.9rem]">
              {phone && (
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                      className="font-semibold text-white hover:text-[color:var(--brand-secondary)]"
                    >
                      {phone}
                    </a>
                  </dd>
                </div>
              )}
              {email && (
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a href={`mailto:${email}`} className="text-white/85 hover:text-[color:var(--brand-secondary)]">
                      {email}
                    </a>
                  </dd>
                </div>
              )}
              {hours && (
                <div>
                  <dt className="sr-only">Hours</dt>
                  <dd className="text-white/60">{hours}</dd>
                </div>
              )}
            </dl>
            {(waCredentialNumber || orCredentialNumber) && (
              <div className="mt-6 text-[0.72rem] space-y-1.5 border-t border-white/10 pt-5">
                <p className="eyebrow eyebrow-inverse">Verified credentials</p>
                {waCredentialNumber && (
                  <p>
                    <span className="text-white/60">WA L&amp;I</span>{" "}
                    <a
                      href="https://secure.lni.wa.gov/verify/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white hover:text-[color:var(--brand-secondary)]"
                    >
                      {waCredentialNumber}
                    </a>
                  </p>
                )}
                {orCredentialNumber && (
                  <p>
                    <span className="text-white/60">OR CCB</span>{" "}
                    <a
                      href="https://search.ccb.state.or.us/search/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white hover:text-[color:var(--brand-secondary)]"
                    >
                      {orCredentialNumber}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>

          <FooterColumn title="Services" items={services} className="col-span-1 md:col-span-3" />
          <FooterColumn title="Service areas" items={stateHubs} className="col-span-1 md:col-span-2" />
          <FooterColumn title="About" items={trust} className="col-span-2 md:col-span-3" />
        </div>
      </Container>
      <div className="border-t border-white/10 bg-black/15">
        <Container width="wide">
          <div className="flex flex-wrap items-center justify-between gap-4 py-5 text-[0.72rem] text-white/55">
            <p>
              &copy; {new Date().getFullYear()} {brandName}. A brand of JDI Construction.
            </p>
            <nav aria-label="Policies" className="flex gap-5">
              {policies.map((p) => (
                <Link key={p.href} href={p.href} className="hover:text-white">
                  {p.label}
                </Link>
              ))}
            </nav>
          </div>
        </Container>
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
      <p className="eyebrow eyebrow-inverse">{title}</p>
      <ul className="mt-5 space-y-2.5 text-[0.9rem]">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="text-white/80 hover:text-[color:var(--brand-secondary)]">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
