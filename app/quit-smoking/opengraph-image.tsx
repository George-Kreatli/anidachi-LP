import { ImageResponse } from "next/og";

export const alt = "Bloü — Quit smoking guides";
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
        <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>Quit smoking guides</div>
        <div style={{ marginTop: 16, fontSize: 28, color: "#0f766e" }}>Milestones, symptoms & tools — Bloü</div>
      </div>
    ),
    { ...size }
  );
}
