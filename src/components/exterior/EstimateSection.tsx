"use client";
import { useActionState } from "react";
import Link from "next/link";
import { submitLead, type LeadState } from "@/app/actions/submit-lead";
import { Container } from "@/components/primitives";

export type EstimateSectionProps = {
  eyebrow?: string;
  heading: string;
  supporting: string;
  servicePrefill?: string;
  cityPrefill?: string;
  phone?: string;
  responseCommitment?: string;
};

const initial: LeadState = { ok: false };

const SERVICE_OPTIONS = [
  "Siding replacement",
  "Window replacement",
  "Exterior painting",
  "Trim, soffits, fascia & gutters",
  "Dry-rot / envelope remediation",
  "Whole-exterior renovation",
  "Not sure — help me decide",
];

export function EstimateSection({
  eyebrow = "Request an evaluation",
  heading,
  supporting,
  servicePrefill,
  cityPrefill,
  phone,
}: EstimateSectionProps) {
  const [state, action, pending] = useActionState(submitLead, initial);
  return (
    <section className="bg-[color:var(--surface-inverse)] text-[color:var(--ink-inverse)]" aria-label="Request an evaluation">
      <Container width="wide">
        <div className="py-[var(--section-pad-xl)] grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12 items-start">
          {/* Editorial left — expectation-setting */}
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow-inverse">{eyebrow}</p>
            <h2 className="mt-5 editorial-h1 text-[color:var(--ink-inverse)] max-w-[16ch]">{heading}</h2>
            <p className="mt-6 text-[1rem] text-white/80 leading-relaxed max-w-[42ch]">{supporting}</p>

            <ol className="mt-10 space-y-5">
              {[
                { title: "We review your request", body: "A person reads every submission — no auto-reply loops." },
                { title: "We follow up to confirm", body: "By your preferred contact method, with the right next step for your scope." },
                { title: "We walk your home together", body: "If an on-site visit makes sense, we schedule it around your calendar." },
              ].map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="text-[0.72rem] font-semibold tracking-widest text-[color:var(--brand-secondary)] mt-1 shrink-0">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-[0.95rem] font-semibold text-[color:var(--ink-inverse)]">{step.title}</p>
                    <p className="mt-1 text-[0.85rem] text-white/70 leading-relaxed">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {phone && (
              <p className="mt-10 text-[0.9rem] text-white/80">
                Prefer to talk?{" "}
                <a
                  href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                  className="font-semibold text-white underline underline-offset-4 hover:text-[color:var(--brand-secondary)]"
                >
                  {phone}
                </a>
              </p>
            )}
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-sm bg-white/[0.06] border border-white/15 p-7 lg:p-10 backdrop-blur-sm">
              {state.ok ? (
                <div role="status" className="py-14 text-center">
                  <p className="editorial-h3 text-[color:var(--brand-secondary)]">Thank you.</p>
                  <p className="mt-3 text-[0.95rem] text-white/85">{state.message}</p>
                  <p className="mt-6 text-[0.75rem] text-white/60">
                    You'll hear from us by your preferred contact method.
                  </p>
                </div>
              ) : (
                <form action={action} className="space-y-7" noValidate>
                  <input type="text" name="company" aria-hidden="true" tabIndex={-1} className="hidden" autoComplete="off" />

                  <fieldset className="space-y-5">
                    <legend className="eyebrow eyebrow-inverse mb-3">Step 01 · Project</legend>
                    <Field
                      label="Service of interest"
                      name="service"
                      as="select"
                      required
                      defaultValue={servicePrefill}
                      options={SERVICE_OPTIONS.map((label) => ({ value: label, label }))}
                      error={state.errors?.service}
                    />
                    <Field
                      label="Where is the property?"
                      hint="City or ZIP is enough. Full address isn't required."
                      name="cityOrZip"
                      required
                      defaultValue={cityPrefill}
                      autoComplete="postal-code"
                      error={state.errors?.cityOrZip}
                    />
                    <Field
                      label="A short description of what you're planning"
                      hint="A sentence or two is fine. Specifics help us prepare."
                      name="description"
                      as="textarea"
                      required
                      error={state.errors?.description}
                    />
                  </fieldset>

                  <fieldset className="space-y-5">
                    <legend className="eyebrow eyebrow-inverse mb-3">Step 02 · Contact</legend>
                    <Field label="Your name" name="name" required autoComplete="name" error={state.errors?.name} />
                    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5">
                      <Field
                        label="Preferred"
                        name="contactMethod"
                        as="select"
                        defaultValue="email"
                        options={[
                          { value: "email", label: "Email" },
                          { value: "phone", label: "Phone" },
                        ]}
                        error={state.errors?.contactMethod}
                      />
                      <Field label="Email or phone" name="contactValue" required error={state.errors?.contactValue} />
                    </div>
                  </fieldset>

                  {state.errors?.form && (
                    <p className="text-[0.85rem] text-red-200" role="alert">
                      {state.errors.form}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-white/10">
                    <button
                      type="submit"
                      disabled={pending}
                      className="group inline-flex items-center gap-3 rounded-sm bg-[color:var(--brand-secondary)] px-6 py-3.5 text-[0.95rem] font-semibold text-[color:var(--brand-primary)] hover:brightness-95 disabled:opacity-60"
                    >
                      {pending ? "Sending…" : "Request an Exterior Evaluation"}
                      <svg viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                        <path d="M4 10h11M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" fill="none" />
                      </svg>
                    </button>
                    <p className="text-[0.75rem] text-white/60 max-w-[30ch]">
                      No automated price quote. A person reads every request and follows up.
                    </p>
                  </div>
                  <p className="text-[0.7rem] text-white/50">
                    By submitting you agree to our{" "}
                    <Link href="/privacy" className="underline">privacy</Link>{" "}
                    and{" "}
                    <Link href="/terms" className="underline">terms</Link>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  hint,
  name,
  required,
  defaultValue,
  autoComplete,
  as = "input",
  options,
  error,
}: {
  label: string;
  hint?: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
  error?: string;
}) {
  const id = `field-${name}`;
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(" ") || undefined;
  const base =
    "w-full rounded-sm bg-white/[0.08] border border-white/20 px-3 py-2.5 text-[0.95rem] text-white placeholder-white/50 focus:bg-white/[0.14] focus:border-[color:var(--brand-secondary)] focus:outline-none";
  return (
    <div>
      <label htmlFor={id} className="block text-[0.8rem] font-semibold text-white/85">
        {label}
        {required && <span aria-hidden="true" className="ml-0.5 text-[color:var(--brand-secondary)]">*</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[0.72rem] text-white/55">
          {hint}
        </p>
      )}
      <div className="mt-1.5">
        {as === "textarea" ? (
          <textarea id={id} name={name} rows={3} required={required} defaultValue={defaultValue} aria-describedby={describedBy} className={base} />
        ) : as === "select" ? (
          <select id={id} name={name} required={required} defaultValue={defaultValue} aria-describedby={describedBy} className={base}>
            {!defaultValue && <option value="">Select…</option>}
            {options?.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : (
          <input id={id} name={name} required={required} defaultValue={defaultValue} autoComplete={autoComplete} aria-describedby={describedBy} className={base} />
        )}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[0.75rem] text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
