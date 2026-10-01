import type { GenerationBrief } from "../master-visual-dna";

/**
 * Service-card briefs. Same architectural subject (one modern-transitional
 * Pacific Northwest house) read from four complementary angles so the four
 * cards feel like one project documented from four details — not four
 * unrelated stock exteriors. All four share the same lighting, same cladding
 * palette, same mature evergreen backdrop.
 */
export const serviceBriefs: GenerationBrief[] = [
  {
    id: "teddy-service-siding",
    role: "service",
    aspect: "4:5",
    lighting: "soft diffused overcast daylight, subtle post-rain damp sheen on surfaces",
    materialPalette: [
      "warm neutral fiber-cement lap siding",
      "deep charcoal trim and corner boards",
      "cedar entry accent",
      "mature evergreen vegetation",
    ],
    conversionFunction: "aspiration",
    compositionNotes:
      "Vertical 4:5 crop showing a two-story Pacific Northwest home elevation from a front 3/4 angle at eye-level, approximately 20-25 feet distance. House occupies the full frame vertically; crisp horizontal lap exposure legible across the entire wall; one window and corner board transition visible. Clean straight verticals.",
    specificSubject:
      "Front elevation of a two-story modern-craftsman Pacific Northwest home finished in warm neutral fiber-cement lap siding with dark charcoal trim at corners and windows and a cedar accent at the entry. Mature evergreens flank the composition. Visible lap exposure, caulked seams, and clean trim transitions — a crisp documented siding install.",
  },
  {
    id: "teddy-service-windows",
    role: "service",
    aspect: "4:5",
    lighting: "soft diffused overcast daylight, warm interior lamp light visible through window glass",
    materialPalette: [
      "black-framed casement and picture windows",
      "warm neutral fiber-cement siding",
      "dark charcoal window trim",
    ],
    conversionFunction: "aspiration",
    compositionNotes:
      "Vertical 4:5 crop centered on a group of two or three black-framed casement/picture windows integrated into fiber-cement siding at the same home shown in the siding card. Head flashing legible. Clean 90-degree verticals. Shot from ~12 feet distance, slight front 3/4 angle, eye-level.",
    specificSubject:
      "A row of large black-framed casement and picture windows set into warm neutral fiber-cement siding on the same two-story Pacific Northwest home — crisp head flashing above each unit, consistent reveal around the frames, warm interior lamp light visible through the glass against the cooler overcast exterior.",
  },
  {
    id: "teddy-service-gutters",
    role: "service",
    aspect: "4:5",
    lighting: "soft diffused overcast daylight, subtle wet reflection on metalwork",
    materialPalette: [
      "dark bronze seamless aluminum gutters",
      "cedar fascia and soffit",
      "architectural asphalt shingles",
    ],
    conversionFunction: "aspiration",
    compositionNotes:
      "Vertical 4:5 crop at a roof-edge corner of the same Pacific Northwest home, showing the gutter run meeting a downspout at an outside corner. Fascia, soffit, drip edge, and gutter spike/hidden-hanger pattern all legible. Shot from ground angled up ~15 degrees.",
    specificSubject:
      "Clean roof-edge detail at an outside corner of the same two-story Pacific Northwest home — dark bronze seamless aluminum K-style gutter running flat and true along a cedar fascia, meeting a round downspout that drops to a splash block, with architectural asphalt shingles and drip edge visible above.",
  },
  {
    id: "teddy-service-soffit-fascia",
    role: "service",
    aspect: "4:5",
    lighting: "soft diffused overcast daylight, directional raking light under the eave",
    materialPalette: [
      "cedar tongue-and-groove soffit",
      "painted fascia",
      "warm neutral fiber-cement siding",
    ],
    conversionFunction: "aspiration",
    compositionNotes:
      "Vertical 4:5 crop looking up at the underside of a generous overhanging eave on the same Pacific Northwest home — cedar tongue-and-groove soffit, painted fascia band, and the top course of fiber-cement siding visible at frame bottom. Vented soffit detail legible.",
    specificSubject:
      "Underside-of-eave architectural detail on the same two-story Pacific Northwest home — warm cedar tongue-and-groove soffit lining a generous overhang, continuous painted fascia at the drip edge, discreet linear soffit venting, meeting the top course of warm neutral fiber-cement siding at the wall.",
  },
];
