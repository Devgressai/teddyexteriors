import type { GenerationBrief } from "../master-visual-dna";

export const materialBriefs: GenerationBrief[] = [
  {
    id: "teddy-material-fiber-cement-detail",
    role: "material",
    aspect: "4:3",
    lighting: "soft directional daylight raking across the siding to reveal depth and texture",
    materialPalette: ["dark charcoal painted fiber cement", "white caulk at seams", "cedar trim adjacent"],
    conversionFunction: "education",
    compositionNotes:
      "Tight 4:3 crop on an installed fiber-cement lap siding wall at a corner, showing lap exposure (approximately 7 inches), fastener line, horizontal joint, and transition to a wood trim corner board. Realistic install, not showroom-perfect.",
    specificSubject:
      "Close architectural detail of installed fiber-cement lap siding on a residential wall — dark charcoal factory finish, visible 7-inch exposure, cleanly caulked vertical joint butted to a vertical cedar corner board, horizontal shadow line between courses, physical realism of the fastener spacing.",
  },
  {
    id: "teddy-material-cedar-detail",
    role: "material",
    aspect: "4:3",
    lighting: "soft overcast daylight, subtle wet sheen",
    materialPalette: ["aged western red cedar", "stained wood finish"],
    conversionFunction: "education",
    compositionNotes: "Vertical cedar shingle or board-and-batten close-up with visible grain and knots",
    specificSubject:
      "Close detail of western red cedar siding on a residential exterior — natural grain character, subtle color variation between boards, warm stain finish, slightly weathered but well-maintained, trim transition visible at the edge of the frame.",
  },
  {
    id: "teddy-material-engineered-wood-detail",
    role: "material",
    aspect: "4:3",
    lighting: "soft overcast daylight",
    materialPalette: ["prefinished engineered-wood siding", "subtle woodgrain embossing"],
    conversionFunction: "education",
    compositionNotes: "Close-up of engineered wood lap siding showing texture and butt-joint detail",
    specificSubject:
      "Close detail of installed engineered-wood lap siding (LP SmartSide family) on a residential wall — visible woodgrain embossing, long clean board run, color-matched caulk at a butt joint, trim board transition visible at frame edge.",
  },
  {
    id: "teddy-material-vinyl-detail",
    role: "material",
    aspect: "4:3",
    lighting: "soft overcast daylight",
    materialPalette: ["clean modern vinyl siding", "muted color"],
    conversionFunction: "education",
    compositionNotes: "Close detail of installed vinyl lap siding on a residential wall",
    specificSubject:
      "Close architectural detail of modern vinyl lap siding on a residential wall — clean lap profile, flat finish, understated color, physically realistic install with correct lock engagement and no obvious vinyl visual tells; shows ventilation / j-channel at a corner transition.",
  },
];
