/**
 * Lightweight regional outline for Clark County WA + Portland metro OR.
 *
 * Bespoke SVG — not a Google Maps embed, not a generic US-state outline. Stylized
 * approximation of the regional geography with the Columbia River as a visible
 * division, Vancouver + Portland office pins, and a soft service-area halo.
 *
 * Coordinates are schematic (not geodetic). Designed to feel like a draftsman's
 * sketch rather than a street map.
 */

type Pin = { label: string; sub?: string; x: number; y: number };

const pins: Pin[] = [
  { label: "Vancouver", sub: "WA · HQ", x: 290, y: 200 },
  { label: "Camas", x: 345, y: 210 },
  { label: "Battle Ground", x: 300, y: 150 },
  { label: "Ridgefield", x: 240, y: 160 },
  { label: "Portland", sub: "OR · satellite", x: 290, y: 265 },
  { label: "Beaverton", x: 220, y: 275 },
  { label: "Lake Oswego", x: 275, y: 310 },
  { label: "Hillsboro", x: 170, y: 275 },
];

export function RegionalMap() {
  return (
    <figure className="relative" role="group" aria-labelledby="regional-map-title">
      <h3 id="regional-map-title" className="sr-only">
        Teddy Exteriors regional service area — Clark County, WA and the Portland metro, OR
      </h3>
      <svg viewBox="0 0 500 420" className="w-full h-auto" role="img" aria-label="Stylized regional map showing Vancouver, Washington and Portland, Oregon with surrounding service-area cities marked by pins.">
        <defs>
          <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#50a747" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#50a747" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#50a747" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0v24" fill="none" stroke="#d4d4d4" strokeWidth="0.4" opacity="0.5" />
          </pattern>
        </defs>

        {/* Background grid — architectural drafting feel */}
        <rect width="500" height="420" fill="url(#grid)" />

        {/* Service-area halo */}
        <circle cx="275" cy="240" r="180" fill="url(#halo)" />

        {/* Columbia River — the state line */}
        <path
          d="M30 240 C 90 230, 150 245, 200 240 S 290 220, 340 230 S 420 250, 480 240"
          fill="none"
          stroke="#8db4c7"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.75"
        />
        <text x="40" y="233" fontSize="9" fill="#4a6b7c" letterSpacing="2" fontFamily="var(--font-sans)">
          COLUMBIA RIVER
        </text>

        {/* State labels */}
        <text x="40" y="55" fontSize="11" fontWeight="700" fill="#2d3d2f" letterSpacing="4" fontFamily="var(--font-sans)">
          WASHINGTON
        </text>
        <text x="40" y="400" fontSize="11" fontWeight="700" fill="#2d3d2f" letterSpacing="4" fontFamily="var(--font-sans)">
          OREGON
        </text>

        {/* Clark County rough outline */}
        <path
          d="M180 90 L380 95 L420 180 L410 240 L200 235 L150 180 Z"
          fill="none"
          stroke="#2d3d2f"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.35"
        />
        <text x="265" y="130" fontSize="9" fill="#485550" letterSpacing="2" textAnchor="middle" fontFamily="var(--font-sans)">
          CLARK COUNTY
        </text>

        {/* Portland metro rough outline */}
        <path
          d="M130 245 L400 245 L430 350 L380 395 L170 395 L120 340 Z"
          fill="none"
          stroke="#2d3d2f"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.35"
        />
        <text x="275" y="378" fontSize="9" fill="#485550" letterSpacing="2" textAnchor="middle" fontFamily="var(--font-sans)">
          PORTLAND METRO
        </text>

        {/* Pins */}
        {pins.map((pin) => {
          const isOffice = Boolean(pin.sub);
          return (
            <g key={pin.label}>
              <circle
                cx={pin.x}
                cy={pin.y}
                r={isOffice ? 6 : 3.5}
                fill={isOffice ? "#347a2e" : "#50a747"}
                stroke="#ffffff"
                strokeWidth={isOffice ? 2 : 1.2}
              />
              {isOffice && (
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="12"
                  fill="none"
                  stroke="#347a2e"
                  strokeWidth="1"
                  opacity="0.4"
                />
              )}
              <text
                x={pin.x + (isOffice ? 12 : 8)}
                y={pin.y + 3}
                fontSize={isOffice ? 11 : 9}
                fontWeight={isOffice ? 700 : 500}
                fill="#2d3d2f"
                fontFamily="var(--font-sans)"
              >
                {pin.label}
              </text>
              {pin.sub && (
                <text
                  x={pin.x + 12}
                  y={pin.y + 15}
                  fontSize="8.5"
                  fill="#485550"
                  letterSpacing="1.2"
                  fontFamily="var(--font-sans)"
                >
                  {pin.sub.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {/* Scale indicator */}
        <g transform="translate(400, 390)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#2d3d2f" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#2d3d2f" strokeWidth="1" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="#2d3d2f" strokeWidth="1" />
          <text x="30" y="-6" fontSize="7.5" letterSpacing="1.2" fill="#485550" textAnchor="middle" fontFamily="var(--font-sans)">
            ~ 10 MILES
          </text>
        </g>
      </svg>
    </figure>
  );
}
