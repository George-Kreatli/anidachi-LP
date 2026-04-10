import { ImageResponse } from "next/og";

export const alt = "Bloü — Money saved calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)",
          color: "#1c1917",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 700 }}>Quit smoking money calculator</div>
        <div style={{ marginTop: 16, fontSize: 28, color: "#0f766e" }}>See savings over weeks, months & years — Bloü</div>
      </div>
    ),
    { ...size }
  );
}
