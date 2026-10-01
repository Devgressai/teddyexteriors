import type { GenerationBrief } from "../master-visual-dna";

/**
 * One-off editorial briefs — hero, project feature, envelope detail,
 * mid-page story break. Shared visual DNA with the service + why briefs
 * so the whole homepage reads as one documented project with multiple
 * supporting angles.
 */
export const editorialBriefs: GenerationBrief[] = [
  {
    id: "teddy-hero-main",
    role: "hero",
    aspect: "16:9",
    focalPoint: { x: 0.7, y: 0.55 },
    safeArea:
      "left 44% of the frame must be visually quiet so a solid evergreen text panel reads over it — allow mature evergreen vegetation or front-walk negative space there",
    lighting:
      "soft diffused overcast daylight late morning, subtle post-rain damp sheen, no harsh shadows",
    materialPalette: [
      "warm neutral fiber-cement lap siding",
      "dark charcoal window and door trim",
      "cedar entry accent",
      "dark bronze gutters",
      "mature evergreen landscaping",
    ],
    conversionFunction: "aspiration",
    compositionNotes:
      "Wide 16:9 editorial exterior of the primary subject home — the same two-story Pacific Northwest residence used in every supporting shot — framed with the house occupying the right 55-60% of the composition and the left 40-45% held as quiet mature evergreens for a text overlay. Front 3/4 angle, eye-level, straight verticals, documentary photography feel.",
    specificSubject:
      "A premium but believable two-story modern-craftsman Pacific Northwest home — warm neutral fiber-cement lap siding, dark charcoal window and door trim, cedar accent at the entry, dark bronze seamless gutters, a wet concrete driveway catching soft sky reflections — set among mature evergreen landscaping on a quiet neighborhood lot in Vancouver, WA or Portland, OR. Shot from across the street at a front 3/4 angle under soft overcast light.",
  },
  {
    id: "teddy-project-feature",
    role: "service",
    aspect: "16:10",
    lighting: "soft diffused overcast daylight afternoon, calm atmosphere",
    materialPalette: [
      "warm neutral fiber-cement lap siding",
      "cedar board-and-batten accent gable",
      "dark charcoal window trim",
      "mature evergreen landscaping",
    ],
    conversionFunction: "proof",
    compositionNotes:
      "Horizontal 16:10 editorial exterior of the SAME subject home as the hero but shot from the OPPOSITE 3/4 angle (approach from the other side of the walkway) so the two images read as the same project documented from both sides. Composition centered on the home.",
    specificSubject:
      "Opposite-angle front 3/4 editorial exterior of the same two-story Pacific Northwest home from the hero — warm neutral fiber-cement lap siding, a cedar board-and-batten accent in the entry gable, dark charcoal window trim, mature evergreen landscaping — same soft overcast light, same post-rain atmosphere.",
  },
  {
    id: "teddy-envelope-detail",
    role: "envelope",
    aspect: "4:5",
    lighting:
      "soft diffused overcast daylight raking the wall, directional enough to reveal flashing geometry",
    materialPalette: [
      "metal head flashing",
      "self-adhered flashing membrane",
      "exposed house wrap",
      "warm neutral fiber-cement siding partially installed",
    ],
    conversionFunction: "education",
    compositionNotes:
      "Vertical 4:5 crop of a window head flashing detail on the same Pacific Northwest home — bent metal Z-flashing integrated over the housewrap and under the wrap at the top, with self-adhered membrane sealing the window flange and the first couple of courses of fiber-cement siding started below. Documentary technical photograph.",
    specificSubject:
      "Close architectural detail of a window head flashing assembly on a Pacific Northwest home mid-remodel — bent metal Z-flashing properly lapped under housewrap above and over the window flange below, self-adhered flashing membrane sealing the flange corners, and the first two courses of warm neutral fiber-cement lap siding started under the sill. Honest technical photograph, not glamour.",
  },
  {
    id: "teddy-story-break",
    role: "hero",
    aspect: "24:13",
    lighting:
      "soft diffused overcast daylight, early evening low-angle, warm interior window glow",
    materialPalette: [
      "warm neutral fiber-cement siding",
      "dark charcoal window trim",
      "cedar accents",
      "mature evergreen landscaping",
      "warm interior lamp light visible through windows",
    ],
    conversionFunction: "aspiration",
    compositionNotes:
      "Very wide 24:13 cinematic editorial crop of the same Pacific Northwest home from the hero shot — framed slightly wider with more mature evergreen context on both sides. Soft early-evening overcast, warm interior lamp light visible through two or three windows. Room at the bottom for an overlaid headline. Documentary cinematic.",
    specificSubject:
      "Early-evening editorial wide of the same two-story Pacific Northwest home from the hero — warm neutral fiber-cement siding, dark charcoal window trim, cedar accents, mature evergreens, warm interior lamp light glowing from the entry and two upstairs windows against the cool overcast exterior. Cinematic composure, documentary tone.",
  },
];
