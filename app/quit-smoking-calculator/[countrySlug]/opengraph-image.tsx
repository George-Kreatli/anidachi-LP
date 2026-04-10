import { ImageResponse } from "next/og";
import { countries } from "@/lib/blou-seo-data";

export const alt = "Bloü — Quit smoking calculator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ countrySlug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { countrySlug } = await params;
  const country = countries.find((c) => c.slug === countrySlug);

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
        <div style={{ fontSize: 48, fontWeight: 700, lineHeight: 1.2 }}>
          Money saved calculator{country ? ` · ${country.country}` : ""}
        </div>
        <div style={{ marginTop: 20, fontSize: 26, color: "#0f766e" }}>Bloü</div>
      </div>
    ),
    { ...size }
  );
}
