import { ImageResponse } from "next/og";
import { milestones, symptoms } from "@/lib/blou-seo-data";

export const alt = "Bloü — Quit smoking";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const milestone = milestones.find((m) => m.slug === slug);
  const symptom = symptoms.find((s) => s.slug === slug);
  const line =
    milestone?.title ??
    (symptom ? `How long does ${symptom.symptom} last?` : "Quit smoking");

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
        <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2 }}>{line}</div>
        <div style={{ marginTop: 20, fontSize: 26, color: "#0f766e" }}>Bloü · Evidence-informed quit support</div>
      </div>
    ),
    { ...size }
  );
}
