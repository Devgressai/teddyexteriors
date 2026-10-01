import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact Teddy Exteriors — Phone, Email, and Office",
  description:
    "Reach Teddy Exteriors in Vancouver, Washington and Portland, Oregon. Phone, email, hours, and office location — plus a direct link to the estimate form.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "article",
    title: "Contact Teddy Exteriors — Phone, Email, and Office",
    description:
      "Reach Teddy Exteriors in Vancouver, WA and Portland, OR.",
    url: "/contact",
  },
};

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path
      d="M4 5a2 2 0 0 1 2-2h2.5a1 1 0 0 1 .97.76l1 4a1 1 0 0 1-.29.98L8.6 10.33a12 12 0 0 0 5.08 5.08l1.59-1.59a1 1 0 0 1 .98-.29l4 1a1 1 0 0 1 .75.97V18a2 2 0 0 1-2 2A16 16 0 0 1 4 5z"
      fill="currentColor"
    />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M3.5 6.5l8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
    <path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export default function ContactPage() {
  const phone = get<string>("contact.phone");
  const email = get<string>("contact.emailPublic");
  const hours = get<string>("contact.hours");
  const base = get<{ locality: string; region: string; streetAddress?: string; postalCode?: string; isPublic: boolean }>("contact.operatingBase");

  const items: { icon: React.ReactNode; label: string; value: React.ReactNode }[] = [];
  if (phone) {
    items.push({
      icon: <PhoneIcon />,
      label: "Phone",
      value: (
        <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="hover:text-[color:var(--brand-cta)]">
          {phone}
        </a>
      ),
    });
  }
  if (email) {
    items.push({
      icon: <MailIcon />,
      label: "Email",
      value: (
        <a href={`mailto:${email}`} className="hover:text-[color:var(--brand-cta)]">
          {email}
        </a>
      ),
    });
  }
  if (hours) items.push({ icon: <ClockIcon />, label: "Hours", value: hours });
  if (base)
    items.push({
      icon: <PinIcon />,
      label: "Office",
      value:
        base.isPublic && base.streetAddress ? (
          <>
            {base.streetAddress}
            <br />
            {base.locality}, {base.region} {base.postalCode}
          </>
        ) : (
          <>Based in {base.locality}, {base.region}. We travel to projects across the region.</>
        ),
    });

  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      eyebrow="Contact"
      heading="Get in touch."
      intro="For project enquiries, the estimate form is the fastest route — service and location prefill, and a person reads every submission. For general questions, use any of the direct channels below."
    >
      <section className="bg-[color:var(--surface-paper)]" aria-label="Direct contact details">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ul className="grid gap-6 sm:grid-cols-2">
              {items.map((item) => (
                <li
                  key={item.label}
                  className="rounded-sm border border-[color:var(--border-subtle)] p-6"
                >
                  <span className="inline-flex items-center gap-2 text-[color:var(--brand-cta)]">
                    {item.icon}
                    <span className="eyebrow">{item.label}</span>
                  </span>
                  <p className="mt-3 text-[1rem] font-semibold text-[color:var(--ink-emphasis)] leading-snug">
                    {item.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div
              className="rounded-sm bg-[color:var(--surface-inverse)] text-[color:var(--ink-inverse)] p-7 lg:p-8"
              style={{ ["--editorial-color" as string]: "var(--text-inverse)" }}
            >
              <p className="eyebrow eyebrow-inverse">Project enquiry</p>
              <h2 className="mt-3 editorial-h2 text-[color:var(--ink-inverse)] max-w-[18ch]">
                Fastest route in.
              </h2>
              <p className="mt-5 text-[0.9rem] text-white/80 leading-relaxed">
                The estimate form carries your service and location into our intake. A person reads every submission
                and follows up by your preferred contact method.
              </p>
              <Link
                href="/request-estimate"
                className="group mt-7 inline-flex items-center gap-2 rounded-sm bg-[color:var(--brand-secondary)] px-5 py-3 text-[0.9rem] font-semibold text-[color:var(--brand-primary)] hover:brightness-95"
              >
                Request an Exterior Evaluation
                <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                  <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
