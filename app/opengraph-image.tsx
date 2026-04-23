import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AniDachi – Watch Anime Together";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            marginBottom: 20,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Watch Anime Together
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.9,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Create watchrooms, sync Crunchyroll playback with friends,
          and chat in real-time
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            opacity: 0.7,
            display: "flex",
            gap: 30,
          }}
        >
          <span>anidachi.app</span>
          <span>•</span>
          <span>Chrome Extension</span>
          <span>•</span>
          <span>Free to Try</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
