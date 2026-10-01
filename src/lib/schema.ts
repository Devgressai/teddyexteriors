import { get, isConfirmed } from "./business";

type Thing = Record<string, unknown>;

/**
 * Returns the canonical site URL. Required in production.
 * Throws in prod if domain is unresolved; returns a placeholder in dev.
 */
function siteUrl(): string {
  return (get<string>("identity.domain") ?? "https://preview.local") as string;
}

function businessId(): string {
  return `${siteUrl()}#business`;
}

export function localBusiness(): Thing | null {
  // Per master brief §12: use GeneralContractor subtype when accurate; one @id across the site.
  const brand = get<string>("identity.brandName");
  if (!brand) return null;

  const base = get<{ locality: string; region: string; isPublic: boolean; streetAddress?: string; postalCode?: string; country: "US" }>(
    "contact.operatingBase",
  );
  const phone = get<string>("contact.phone");
  const email = get<string>("contact.emailPublic");
  const sameAs = get<{ sameAs: string[] }>("reviews");

  const thing: Thing = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": businessId(),
    name: brand,
    url: siteUrl(),
  };
  if (phone) thing.telephone = phone;
  if (email) thing.email = email;
  if (base && base.isPublic && base.streetAddress) {
    thing.address = {
      "@type": "PostalAddress",
      streetAddress: base.streetAddress,
      addressLocality: base.locality,
      addressRegion: base.region,
      postalCode: base.postalCode,
      addressCountry: base.country,
    };
  }
  if (sameAs?.sameAs?.length) thing.sameAs = sameAs.sameAs;

  // Credentials via identifier (schema.org `identifier` property with PropertyValue)
  const waLni = get<string>("credentials.waLniNumber");
  const orCcb = get<string>("credentials.orCcbNumber");
  const identifiers: Thing[] = [];
  if (waLni) {
    identifiers.push({
      "@type": "PropertyValue",
      propertyID: "WA L&I Contractor Registration",
      value: waLni,
    });
  }
  if (orCcb) {
    identifiers.push({
      "@type": "PropertyValue",
      propertyID: "Oregon CCB License",
      value: orCcb,
    });
  }
  if (identifiers.length) thing.identifier = identifiers;

  return thing;
}

export function website(): Thing | null {
  const brand = get<string>("identity.brandName");
  if (!brand) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl()}#website`,
    url: siteUrl(),
    name: brand,
    publisher: { "@id": businessId() },
  };
}

export function breadcrumb(trail: { name: string; path: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl()}${item.path}`,
    })),
  };
}

export function serviceSchema(args: {
  name: string;
  description: string;
  slug: string;
  areaServed?: string[];
}): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: `${siteUrl()}${args.slug}`,
    provider: { "@id": businessId() },
    ...(args.areaServed && args.areaServed.length > 0 && {
      areaServed: args.areaServed.map((name) => ({ "@type": "City", name })),
    }),
  };
}

export function articleSchema(args: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  images?: string[];
  authorName?: string;
}): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    url: `${siteUrl()}${args.slug}`,
    mainEntityOfPage: `${siteUrl()}${args.slug}`,
    datePublished: args.datePublished,
    dateModified: args.dateModified ?? args.datePublished,
    ...(args.images && args.images.length > 0 && { image: args.images }),
    publisher: { "@id": businessId() },
    ...(args.authorName
      ? { author: { "@type": "Person", name: args.authorName } }
      : { author: { "@id": businessId() } }),
  };
}

export function faqSchema(items: { q: string; a: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function videoSchema(args: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  durationIso?: string;
}): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: args.name,
    description: args.description,
    thumbnailUrl: args.thumbnailUrl,
    uploadDate: args.uploadDate,
    ...(args.contentUrl && { contentUrl: args.contentUrl }),
    ...(args.embedUrl && { embedUrl: args.embedUrl }),
    ...(args.durationIso && { duration: args.durationIso }),
  };
}

export { isConfirmed, siteUrl };
