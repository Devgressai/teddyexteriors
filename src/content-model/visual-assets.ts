/**
 * Typed visual asset manifest.
 *
 * Replaces scattered image paths across JSX. Every asset must be declared here before use.
 * `isDocumentary` is true only for real photographs of real work / real places.
 * `isGenerated` is true only for AI-generated editorial imagery that is NOT presented as proof.
 */

export type VisualAsset = {
  id: string;
  role:
    | "hero"
    | "service"
    | "material"
    | "project"
    | "people"
    | "envelope"
    | "regional"
    | "technical"
    | "resource";
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: `${number}:${number}`;
  focalPoint?: { x: number; y: number };
  desktopObjectPosition?: string;
  mobileObjectPosition?: string;
  usage: string[];
  isDocumentary: boolean;
  isGenerated: boolean;
  verifiedProjectSlug?: string;
  rightsOwner: "teddy" | "jdi-shared" | "licensed" | "manufacturer" | "inspiration";
  rightsNote?: string;
  generationPromptId?: string;
  generationPromptVersion?: number;
};

const JDI_CDN = "https://www.jdiconstruction.co";

export const visualAssets = {
  "jdi-exterior-front-after-1600": {
    id: "jdi-exterior-front-after-1600",
    role: "hero",
    src: `${JDI_CDN}/ctf/2PD7bqxA0kYRMKoXKs1TP6/01b-exterior-front-after-1600.webp`,
    alt: "Modern Northwest residential exterior under soft overcast light — Vancouver, WA",
    width: 2400,
    height: 1600,
    aspectRatio: "3:2",
    desktopObjectPosition: "right center",
    mobileObjectPosition: "center",
    usage: ["homepage.hero", "services.siding.card", "materials.hero"],
    isDocumentary: true,
    isGenerated: false,
    rightsOwner: "jdi-shared",
    rightsNote: "Shared-entity asset — Teddy Exteriors is a brand of JDI Construction.",
  },
  "jdi-exterior-front-1920": {
    id: "jdi-exterior-front-1920",
    role: "service",
    src: `${JDI_CDN}/ctf/2867howEJWyt6wVMWkIkN4/02-exterior-front-1920.webp`,
    alt: "New dark-framed residential windows integrated into exterior siding",
    width: 1920,
    height: 1280,
    aspectRatio: "3:2",
    usage: ["services.windows.card"],
    isDocumentary: true,
    isGenerated: false,
    rightsOwner: "jdi-shared",
  },
  "jdi-vancouver-whole-home-01": {
    id: "jdi-vancouver-whole-home-01",
    role: "project",
    src: `${JDI_CDN}/ctf/6kM5u8g5lU78Y1vIebWMEz/01-exterior-front-750.webp`,
    alt: "Mid-century modern whole-home remodel — Vancouver, WA",
    width: 750,
    height: 500,
    aspectRatio: "3:2",
    usage: ["projects.mid-century-modern-whole-home-remodel", "homepage.whyTeddy.block1"],
    isDocumentary: true,
    isGenerated: false,
    verifiedProjectSlug: "mid-century-modern-whole-home-remodel",
    rightsOwner: "jdi-shared",
  },
  "jdi-vancouver-modern-remodel": {
    id: "jdi-vancouver-modern-remodel",
    role: "project",
    src: `${JDI_CDN}/ctf/1ywW6ufcKBIaBTL3CnzrQg/03-exterior-front-side-750.webp`,
    alt: "Modern whole-home exterior remodel — Vancouver, WA",
    width: 750,
    height: 500,
    aspectRatio: "3:2",
    usage: ["projects.modern-whole-home-remodel", "homepage.whyTeddy.block3", "services.gutters.card"],
    isDocumentary: true,
    isGenerated: false,
    verifiedProjectSlug: "modern-whole-home-remodel",
    rightsOwner: "jdi-shared",
  },
  "jdi-mid-century-ranch": {
    id: "jdi-mid-century-ranch",
    role: "project",
    src: `${JDI_CDN}/ctf/33C8Uu510N5y2u5WoFGyj9/01-exterior-front-750.webp`,
    alt: "Mid-century ranch exterior refresh — Vancouver, WA",
    width: 750,
    height: 500,
    aspectRatio: "3:2",
    usage: ["projects.mid-century-ranch-exterior-refresh", "homepage.whyTeddy.block2", "services.soffit-fascia.card"],
    isDocumentary: true,
    isGenerated: false,
    verifiedProjectSlug: "mid-century-ranch-exterior-refresh",
    rightsOwner: "jdi-shared",
  },
} as const satisfies Record<string, VisualAsset>;

export type VisualAssetId = keyof typeof visualAssets;

export function asset(id: VisualAssetId): VisualAsset {
  return visualAssets[id];
}

/**
 * Guard — any asset flagged `isGenerated: true` must have usage that does NOT include
 * project/proof contexts. Caller contexts are hand-audited; this helper documents the rule.
 */
export function isProofUsage(usagePath: string): boolean {
  return (
    usagePath.startsWith("projects.") ||
    usagePath.includes(".proof") ||
    usagePath.includes(".testimonial") ||
    usagePath.includes(".case-study")
  );
}
