import type { GenerationBrief } from "../master-visual-dna";

/**
 * Three editorial atmospheric briefs for the WhyTeddyNarrative blocks.
 * Each pairs with a specific proof pillar — written estimate, in-house crews,
 * envelope-first. Shared visual DNA (same light, same Pacific Northwest
 * architecture, same material language) so the three blocks read as a
 * cohesive editorial sequence.
 */
export const whyBriefs: GenerationBrief[] = [
  {
    id: "teddy-why-written-estimate",
    role: "service",
    aspect: "16:12",
    lighting: "soft diffused overcast daylight late morning, calm atmosphere",
    materialPalette: [
      "warm neutral fiber-cement lap siding",
      "dark charcoal window trim",
      "cedar entry accent",
      "wet asphalt walk reflecting sky",
    ],
    conversionFunction: "trust",
    compositionNotes:
      "Horizontal 16:12 editorial crop of a quiet front-walk approach to the same Pacific Northwest home used in the service cards. Front porch and entry at right third. Clean composition. Natural depth of field; no artificial bokeh. Room on the left for editorial typography.",
    specificSubject:
      "Calm editorial exterior of a two-story modern-craftsman Pacific Northwest home with warm neutral fiber-cement siding, dark charcoal window trim, cedar accent at the entry, and a wet concrete walk reflecting the overcast sky. Mature evergreens frame the lot. Deliberate composition, documentary feel.",
  },
  {
    id: "teddy-why-in-house-crews",
    role: "service",
    aspect: "16:12",
    lighting: "soft diffused overcast daylight, early afternoon, slight humidity",
    materialPalette: [
      "mid-century horizontal lap siding",
      "warm neutral paint",
      "dark trim at eaves and windows",
    ],
    conversionFunction: "trust",
    compositionNotes:
      "Horizontal 16:12 editorial crop of a different Pacific Northwest home — a mid-century single-story ranch with crisp horizontal siding and generous eaves — shot from a front 3/4 angle, approximately 30 feet distance. Same lighting + landscaping language as the first why image.",
    specificSubject:
      "Front 3/4 editorial exterior of a well-maintained mid-century Pacific Northwest ranch home finished in warm neutral horizontal lap siding with dark trim at the eaves and windows, generous overhangs, mature evergreen landscaping, and a composed native-plant front yard. The same overcast light as the sibling editorial images.",
  },
  {
    id: "teddy-why-envelope-first",
    role: "envelope",
    aspect: "16:12",
    lighting: "soft diffused overcast daylight on a working wall section, honest documentary feel",
    materialPalette: [
      "exposed house wrap weather-resistive barrier",
      "metal head-flashing details",
      "wood sheathing substrate",
      "chalk layout lines",
    ],
    conversionFunction: "education",
    compositionNotes:
      "Horizontal 16:12 crop of a Pacific Northwest exterior wall mid-renovation — one window opening visible with properly integrated head flashing, housewrap lapped shingle-fashion, taped seams, and the first courses of new fiber-cement siding started at the base. No people in frame. Documentary not glamour.",
    specificSubject:
      "Working wall section on a Pacific Northwest home mid-remodel — exposed house wrap taped at the seams, metal Z-flashing at a window head integrated correctly over the wrap, sheathing visible at the top of the field, and the first courses of warm neutral fiber-cement lap siding started at the bottom. Honest documentary photograph of a correct install.",
  },
];
