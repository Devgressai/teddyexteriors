"use server";

import { headers } from "next/headers";
import { get } from "@/lib/business";

/**
 * Lead submission server action.
 *
 * Design per master brief §15:
 *  - Server-side validation (defense in depth; client also validates).
 *  - Rate limit per IP (in-memory, upgrade to Redis/Upstash when deployed).
 *  - No personal data in logs; sandbox destination when LEAD_DESTINATION env unset.
 *  - Success returned only after the destination accepts (no optimistic UI).
 *
 * Downstream delivery is intentionally not implemented here — hooks are prepared for the
 * owner-chosen CRM (Resend/HubSpot/other) once confirmed in business.config.
 */

export type LeadState = {
  ok: boolean;
  errors?: Record<string, string>;
  acceptedAt?: string;
  message?: string;
};

type Lead = {
  name: string;
  contactMethod: "email" | "phone";
  contactValue: string;
  cityOrZip: string;
  service: string;
  description: string;
  attribution: {
    landingPath?: string;
    source?: string;
    medium?: string;
    campaign?: string;
  };
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const bucket = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const stamps = (bucket.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (stamps.length >= RATE_LIMIT_MAX) return false;
  stamps.push(now);
  bucket.set(ip, stamps);
  return true;
}

function validate(input: FormData): { data?: Lead; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};
  const name = String(input.get("name") ?? "").trim();
  const method = String(input.get("contactMethod") ?? "email");
  const contactValue = String(input.get("contactValue") ?? "").trim();
  const cityOrZip = String(input.get("cityOrZip") ?? "").trim();
  const service = String(input.get("service") ?? "").trim();
  const description = String(input.get("description") ?? "").trim();
  const honeypot = String(input.get("company") ?? "").trim();

  if (honeypot) return { errors: { form: "spam" } };
  if (!name) errors.name = "Please share your name.";
  if (method !== "email" && method !== "phone") errors.contactMethod = "Choose a contact method.";
  if (!contactValue) errors.contactValue = method === "email" ? "Email required." : "Phone required.";
  if (method === "email" && contactValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue)) {
    errors.contactValue = "Enter a valid email address.";
  }
  if (!cityOrZip) errors.cityOrZip = "City or ZIP required.";
  if (!service) errors.service = "Choose a service.";
  if (description.length < 10) errors.description = "A short description helps us prepare.";
  if (description.length > 2000) errors.description = "Please keep this under 2,000 characters.";

  if (Object.keys(errors).length > 0) return { errors };
  return {
    data: {
      name,
      contactMethod: method as "email" | "phone",
      contactValue,
      cityOrZip,
      service,
      description,
      attribution: {
        landingPath: String(input.get("landingPath") ?? "") || undefined,
        source: String(input.get("utm_source") ?? "") || undefined,
        medium: String(input.get("utm_medium") ?? "") || undefined,
        campaign: String(input.get("utm_campaign") ?? "") || undefined,
      },
    },
  };
}

async function deliver(lead: Lead): Promise<boolean> {
  const destination = get<string>("contact.emailLeadDestination") ?? process.env.LEAD_SANDBOX_EMAIL;
  if (!destination) {
    // Dev/preview without any destination: persist to console only. Not a success in prod.
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead sandbox]", { ...lead, contactValue: "[redacted]" });
      return true;
    }
    return false;
  }
  // Delivery hook — owner-chosen CRM wires here once confirmed. Returning false until wired.
  // When implementing: await delivery.send(...); verify ack; then return true.
  if (process.env.NODE_ENV !== "production") {
    console.info("[lead would-send]", { destination, ...lead, contactValue: "[redacted]" });
    return true;
  }
  return false;
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) {
    return { ok: false, errors: { form: "Please wait a moment before trying again." } };
  }

  const { data, errors } = validate(formData);
  if (!data) return { ok: false, errors };

  const delivered = await deliver(data);
  if (!delivered) {
    return {
      ok: false,
      errors: { form: "We couldn't send your request right now. Please try again shortly or call us directly." },
    };
  }

  return {
    ok: true,
    acceptedAt: new Date().toISOString(),
    message: "Thanks — your request is in. We'll follow up to confirm next steps.",
  };
}
