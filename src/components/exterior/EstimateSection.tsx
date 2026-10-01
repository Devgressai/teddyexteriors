"use client";
import { useActionState } from "react";
import Image from "next/image";
import { submitLead, type LeadState } from "@/app/actions/submit-lead";
import type { EstimateSectionProps } from "./types";

const initial: LeadState = { ok: false };

export function EstimateSection({
  heading,
  supporting,
  servicePrefill,
  cityPrefill,
  teamImage,
  phone,
  responseCommitment,
}: EstimateSectionProps) {
  const [state, action, pending] = useActionState(submitLead, initial);
  return (
    <section className="bg-[color:var(--surface-inverse)] text-[color:var(--text-inverse)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24 grid gap-12 lg:grid-cols-12 items-start">
        <div className="lg:col-span-5">
          {teamImage ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-md">
              <Image src={teamImage.src} alt={teamImage.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          ) : (
            <div className="aspect-[4/5] rounded-md border border-white/15 bg-black/20 grid place-items-center text-xs opacity-60">
              Project / team photograph
            </div>
          )}
        </div>
        <div className="lg:col-span-7">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{heading}</h2>
          <p className="mt-4 text-base/relaxed opacity-90 max-w-xl">{supporting}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-80">
            {responseCommitment && <span>{responseCommitment}</span>}
            {phone && (
              <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="underline underline-offset-4">
                Or call {phone}
              </a>
            )}
          </div>
          {state.ok ? (
            <div
              role="status"
              className="mt-8 rounded-md bg-white/10 p-6 text-base"
            >
              {state.message}
            </div>
          ) : (
            <form action={action} className="mt-8 grid gap-5 sm:grid-cols-2">
              {/* honeypot */}
              <input type="text" name="company" aria-hidden="true" tabIndex={-1} className="hidden" autoComplete="off" />
              <Field label="Your name" name="name" required autoComplete="name" error={state.errors?.name} />
              <Field label="Contact method" name="contactMethod" as="select" defaultValue="email"
                options={[
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Phone" },
                ]}
                error={state.errors?.contactMethod}
              />
              <Field label="Email or phone" name="contactValue" required error={state.errors?.contactValue} className="sm:col-span-2" />
              <Field label="City or ZIP" name="cityOrZip" required defaultValue={cityPrefill} error={state.errors?.cityOrZip} />
              <Field label="Service of interest" name="service" required defaultValue={servicePrefill} error={state.errors?.service} />
              <Field
                label="Short project description"
                name="description"
                as="textarea"
                required
                error={state.errors?.description}
                className="sm:col-span-2"
              />
              {state.errors?.form && (
                <p className="sm:col-span-2 text-sm text-red-200" role="alert">
                  {state.errors.form}
                </p>
              )}
              <div className="sm:col-span-2 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center rounded-md bg-[color:var(--accent)] px-5 py-3 text-base font-semibold text-[color:var(--surface-inverse)] hover:brightness-95 disabled:opacity-60"
                >
                  {pending ? "Sending…" : "Request My Exterior Estimate"}
                </button>
                <p className="text-xs opacity-70 max-w-sm">
                  No automated price quote; a person reads every request and follows up.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  defaultValue,
  autoComplete,
  as = "input",
  options,
  error,
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  autoComplete?: string;
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
  error?: string;
  className?: string;
}) {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-err` : undefined;
  const base = "w-full rounded-md bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder-white/50 focus:bg-white/15";
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
        {required && <span aria-hidden="true" className="ml-0.5 text-[color:var(--accent)]">*</span>}
      </label>
      <div className="mt-1.5">
        {as === "textarea" ? (
          <textarea id={id} name={name} rows={4} required={required} defaultValue={defaultValue} aria-describedby={describedBy} className={base} />
        ) : as === "select" ? (
          <select id={id} name={name} required={required} defaultValue={defaultValue} aria-describedby={describedBy} className={base}>
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
        <p id={describedBy} className="mt-1 text-xs text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
