/**
 * Teddy's signature envelope-detail diagram — original SVG wall section.
 *
 * Shows the layered assembly from exterior to interior: siding + rainscreen + WRB + sheathing
 * + flashing + insulation + framing. Labels are callouts on the right; the diagram sits on the
 * left of the EnvelopeDetail composition.
 *
 * This is a brand asset — NOT a stock infographic. Technical accuracy: a typical modern
 * residential cladding assembly over a ventilated rainscreen, with pan/head flashing at an
 * opening (window) and plywood sheathing on advanced framing.
 */

type Label = { id: string; title: string; description: string };

const labels: Label[] = [
  { id: "siding", title: "Siding", description: "Fiber cement, engineered wood, or other cladding" },
  { id: "rainscreen", title: "Rainscreen", description: "Proper ventilation & drainage" },
  { id: "wrb", title: "Weather-resistive barrier", description: "Keeps moisture out" },
  { id: "sheathing", title: "Sheathing", description: "Structural support" },
  { id: "flashing", title: "Flashing", description: "Critical water management" },
  { id: "insulation", title: "Insulation", description: "Improved comfort & efficiency" },
  { id: "framing", title: "Framing", description: "The backbone of your home" },
];

export function WallSectionDiagram() {
  return (
    <figure className="relative" role="group" aria-labelledby="envelope-diagram-title">
      <h3 id="envelope-diagram-title" className="sr-only">
        Exterior wall section — a layered assembly diagram
      </h3>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(180px,240px)] gap-x-6 lg:gap-x-8 items-stretch">
        {/* Diagram column */}
        <div className="relative">
          <svg
            viewBox="0 0 340 520"
            role="img"
            aria-label="Cross-section of a modern residential exterior wall showing cladding, rainscreen gap, weather-resistive barrier, sheathing, flashing at a window head, insulation, and framing."
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="siding-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#4a5a52" />
                <stop offset="100%" stopColor="#2f3a35" />
              </linearGradient>
              <linearGradient id="sheathing-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#c6a579" />
                <stop offset="100%" stopColor="#a98659" />
              </linearGradient>
              <linearGradient id="insulation-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f3cfd6" />
                <stop offset="100%" stopColor="#e5a9b4" />
              </linearGradient>
              <pattern id="osb" width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="url(#sheathing-grad)" />
                <path d="M0 0l6 6M6 0l-6 6" stroke="#8a6a44" strokeOpacity="0.35" strokeWidth="0.4" />
              </pattern>
            </defs>

            {/* Framing — rightmost (interior) */}
            <g>
              <rect x="265" y="40" width="30" height="440" fill="#a98659" />
              <rect x="265" y="40" width="30" height="440" fill="none" stroke="#6b4e2a" strokeOpacity="0.4" />
              {/* grain lines */}
              {[80, 140, 200, 260, 320, 380, 440].map((y) => (
                <line key={y} x1="268" y1={y} x2="292" y2={y + 8} stroke="#6b4e2a" strokeOpacity="0.3" strokeWidth="0.6" />
              ))}
            </g>

            {/* Insulation — in bay to left of framing */}
            <g>
              <rect x="225" y="40" width="40" height="440" fill="url(#insulation-grad)" />
              {/* batt texture */}
              {[70, 120, 170, 220, 270, 320, 370, 420, 470].map((y) => (
                <line key={y} x1="228" y1={y} x2="262" y2={y} stroke="#c4869a" strokeOpacity="0.4" />
              ))}
            </g>

            {/* Sheathing (OSB) */}
            <rect x="205" y="30" width="20" height="460" fill="url(#osb)" />

            {/* WRB (dark membrane) */}
            <rect x="198" y="20" width="7" height="480" fill="#1d2420" />
            <rect x="198" y="20" width="7" height="480" fill="none" stroke="#000" strokeOpacity="0.4" />

            {/* Rainscreen furring strips (vertical) + air gap */}
            <g>
              <rect x="186" y="30" width="12" height="460" fill="#d6c7a7" fillOpacity="0.25" />
              {[55, 155, 255, 355, 455].map((y) => (
                <rect key={y} x="188" y={y} width="8" height="40" fill="#a98659" opacity="0.65" />
              ))}
            </g>

            {/* Siding — leftmost (exterior) — layered lap boards */}
            <g>
              <rect x="60" y="20" width="126" height="480" fill="url(#siding-grad)" />
              {[55, 110, 165, 220, 275, 330, 385, 440].map((y) => (
                <g key={y}>
                  <line x1="60" y1={y} x2="186" y2={y} stroke="#1a2320" strokeWidth="1" opacity="0.6" />
                  <line x1="60" y1={y + 1.5} x2="186" y2={y + 1.5} stroke="#5c6e65" strokeWidth="0.6" opacity="0.5" />
                </g>
              ))}
            </g>

            {/* Window opening — showing head flashing at mid height */}
            <g>
              {/* Trim recess */}
              <rect x="60" y="195" width="126" height="90" fill="#232c28" />
              {/* Window */}
              <rect x="78" y="210" width="90" height="60" fill="#141b18" stroke="#2a332e" strokeWidth="1" />
              {/* interior behind glass glow */}
              <rect x="80" y="212" width="86" height="56" fill="#2d3d2f" opacity="0.9" />
              <line x1="124" y1="212" x2="124" y2="268" stroke="#1d2420" strokeWidth="1" />
              <line x1="80" y1="240" x2="166" y2="240" stroke="#1d2420" strokeWidth="1" />

              {/* Head flashing — bent metal above window head */}
              <path
                d="M60 198 L186 198 L186 205 L182 205 L182 201 L60 201 Z"
                fill="#c5c7c4"
                stroke="#4a4e4a"
                strokeWidth="0.5"
              />
              <line x1="60" y1="199.5" x2="186" y2="199.5" stroke="#8c8f8c" strokeWidth="0.4" />

              {/* Pan flashing at sill — slopes to exterior */}
              <path
                d="M60 282 L186 285 L186 290 L60 288 Z"
                fill="#c5c7c4"
                stroke="#4a4e4a"
                strokeWidth="0.5"
              />
            </g>

            {/* Flashing callout detail — kickout-style tab at upper edge of window */}
            <path
              d="M186 198 L198 198 L198 205 L186 205 Z"
              fill="#9ea1a0"
              stroke="#4a4e4a"
              strokeWidth="0.5"
            />

            {/* Label leader-lines */}
            <g stroke="#c9d1cb" strokeOpacity="0.55" strokeWidth="0.7" fill="none">
              <path d="M110 55 L300 55" />
              <path d="M190 130 L300 130" />
              <path d="M201 230 L300 230" />
              <path d="M215 320 L300 320" />
              <path d="M186 198 L220 185 L300 185" />
              <path d="M245 400 L300 400" />
              <path d="M280 470 L300 470" />
            </g>

            {/* leader dots */}
            <g fill="#50a747">
              <circle cx="110" cy="55" r="2.2" />
              <circle cx="190" cy="130" r="2.2" />
              <circle cx="201" cy="230" r="2.2" />
              <circle cx="215" cy="320" r="2.2" />
              <circle cx="186" cy="198" r="2.2" />
              <circle cx="245" cy="400" r="2.2" />
              <circle cx="280" cy="470" r="2.2" />
            </g>
          </svg>
        </div>

        {/* Labels column */}
        <ol className="flex flex-col justify-between gap-3 text-left">
          {labels.map((label) => (
            <li key={label.id} className="pl-3 border-l border-[color:var(--brand-secondary)]/50">
              <p className="text-[0.72rem] uppercase tracking-[0.14em] font-semibold text-[color:var(--brand-secondary)]">
                {label.title}
              </p>
              <p className="mt-0.5 text-[0.78rem] text-white/80 leading-snug">{label.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
