/**
 * Manufacturer brands Teddy Exteriors installs — rendered in the BrandMarquee row.
 *
 * Each entry references an optional logo file in `/public/images/brands/`. When the file
 * doesn't exist (or hasn't been obtained from the manufacturer's partner program yet),
 * the component falls back to a Fraunces display wordmark of the brand name, so the row
 * reads correctly even before the licensed assets land.
 *
 * See `/public/images/brands/README.md` for the asset-sourcing rules.
 */

export type InstalledBrand = {
  slug: string;
  name: string;
  category: "siding" | "windows" | "doors" | "trim" | "envelope";
  /** Width/height ratio when the logo image is present; use to reserve layout space */
  aspectRatio: number;
  /** Optional logo file in /public/images/brands/ — SVG preferred, PNG @2x fallback */
  logo?: string;
  /** Manufacturer homepage for context — not linked in the marquee */
  manufacturerUrl: string;
  /** Owner-confirmed installation relationship — if false, exclude from marquee */
  confirmed: boolean;
};

export const installedBrands: InstalledBrand[] = [
  {
    slug: "anlin",
    name: "Anlin",
    category: "windows",
    aspectRatio: 2.6,
    logo: "/images/brands/anlin.svg",
    manufacturerUrl: "https://www.anlin.com",
    confirmed: true,
  },
  {
    slug: "ply-gem",
    name: "Ply Gem",
    category: "siding",
    aspectRatio: 3.0,
    logo: "/images/brands/ply-gem.svg",
    manufacturerUrl: "https://www.plygem.com",
    confirmed: true,
  },
  {
    slug: "milgard",
    name: "Milgard",
    category: "windows",
    aspectRatio: 3.4,
    logo: "/images/brands/milgard.svg",
    manufacturerUrl: "https://www.milgard.com",
    confirmed: true,
  },
  {
    slug: "james-hardie",
    name: "James Hardie",
    category: "siding",
    aspectRatio: 3.3,
    logo: "/images/brands/james-hardie.svg",
    manufacturerUrl: "https://www.jameshardie.com",
    confirmed: true,
  },
  {
    slug: "andersen",
    name: "Andersen",
    category: "windows",
    aspectRatio: 3.8,
    logo: "/images/brands/andersen.svg",
    manufacturerUrl: "https://www.andersenwindows.com",
    confirmed: true,
  },
  // Suggested additions — common Pacific Northwest exterior industry brands.
  // Flip confirmed:true for the ones Teddy actually has a relationship with.
  {
    slug: "lp-smartside",
    name: "LP SmartSide",
    category: "siding",
    aspectRatio: 3.6,
    logo: "/images/brands/lp-smartside.svg",
    manufacturerUrl: "https://lpcorp.com",
    confirmed: true,
  },
  {
    slug: "marvin",
    name: "Marvin",
    category: "windows",
    aspectRatio: 3.4,
    logo: "/images/brands/marvin.svg",
    manufacturerUrl: "https://www.marvin.com",
    confirmed: false,
  },
  {
    slug: "pella",
    name: "Pella",
    category: "windows",
    aspectRatio: 2.8,
    logo: "/images/brands/pella.svg",
    manufacturerUrl: "https://www.pella.com",
    confirmed: false,
  },
  {
    slug: "certainteed",
    name: "CertainTeed",
    category: "siding",
    aspectRatio: 3.6,
    logo: "/images/brands/certainteed.svg",
    manufacturerUrl: "https://www.certainteed.com",
    confirmed: false,
  },
  {
    slug: "simpson-doors",
    name: "Simpson",
    category: "doors",
    aspectRatio: 2.6,
    logo: "/images/brands/simpson-doors.svg",
    manufacturerUrl: "https://www.simpsondoor.com",
    confirmed: false,
  },
  {
    slug: "tyvek",
    name: "DuPont Tyvek",
    category: "envelope",
    aspectRatio: 2.8,
    logo: "/images/brands/tyvek.svg",
    manufacturerUrl: "https://www.dupont.com/building-envelope",
    confirmed: false,
  },
  {
    slug: "boral-truexterior",
    name: "Boral TruExterior",
    category: "trim",
    aspectRatio: 3.4,
    logo: "/images/brands/boral-truexterior.svg",
    manufacturerUrl: "https://www.westlakeroyalbuildingproducts.com/truexterior/",
    confirmed: false,
  },
];

/** Returns only brands with confirmed installation relationships. */
export function confirmedBrands(): InstalledBrand[] {
  return installedBrands.filter((b) => b.confirmed);
}
