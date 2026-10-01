import { ImageResponse } from "next/og";
import { display } from "@/lib/business";

export const alt = "Exterior renovation serving Vancouver, Washington and Portland, Oregon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const brand = display<string>("identity.brandName", "Teddy Exteriors");
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#1E3D2A",
          color: "#FCFAF8",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#50A747" }}>
          Exterior Remodeling · Vancouver &amp; Portland
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 600, maxWidth: 1000 }}>
            Beautiful exteriors.
            <br />
            Built for Northwest weather.
          </div>
          <div style={{ fontSize: 24, color: "#D4D4D4", marginTop: 24 }}>{brand}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#D4D4D4" }}>
          <span>Siding · Windows · Trim · Full Exterior</span>
          <span>Southwest WA · NW OR</span>
        </div>
      </div>
    ),
    size,
  );
}
