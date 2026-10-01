import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { get } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact",
  description: "Phone, email, and hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const phone = get<string>("contact.phone");
  const email = get<string>("contact.emailPublic");
  const hours = get<string>("contact.hours");
  const base = get<{ locality: string; region: string; streetAddress?: string; postalCode?: string; isPublic: boolean }>("contact.operatingBase");

  return (
    <PageShell
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      eyebrow="Contact"
      heading="Get in touch."
      intro="For project enquiries, the fastest route is the estimate form. For general questions, use any of the below."
    >
      <section className="bg-[color:var(--surface-paper)]">
        <div className="mx-auto max-w-3xl px-6 py-16 grid gap-10 sm:grid-cols-2">
          <dl className="space-y-5 text-sm">
            {phone && (
              <div>
                <dt className="text-xs uppercase tracking-wider font-semibold text-[color:var(--ink-secondary)]">Phone</dt>
                <dd className="mt-1 text-base font-semibold text-[color:var(--ink-primary)]">
                  <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`}>{phone}</a>
                </dd>
              </div>
            )}
            {email && (
              <div>
                <dt className="text-xs uppercase tracking-wider font-semibold text-[color:var(--ink-secondary)]">Email</dt>
                <dd className="mt-1 text-base text-[color:var(--ink-primary)]">
                  <a href={`mailto:${email}`}>{email}</a>
                </dd>
              </div>
            )}
            {hours && (
              <div>
                <dt className="text-xs uppercase tracking-wider font-semibold text-[color:var(--ink-secondary)]">Hours</dt>
                <dd className="mt-1 text-base text-[color:var(--ink-primary)]">{hours}</dd>
              </div>
            )}
            {base && (
              <div>
                <dt className="text-xs uppercase tracking-wider font-semibold text-[color:var(--ink-secondary)]">Service area</dt>
                <dd className="mt-1 text-base text-[color:var(--ink-primary)]">
                  {base.isPublic && base.streetAddress ? (
                    <>
                      {base.streetAddress}, {base.locality}, {base.region} {base.postalCode}
                    </>
                  ) : (
                    <>Based in {base.locality}, {base.region}. We travel to projects across the region.</>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>
    </PageShell>
  );
}
