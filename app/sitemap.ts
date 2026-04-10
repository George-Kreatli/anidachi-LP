import type { MetadataRoute } from "next";
import { countries, milestones, symptoms } from "@/lib/blou-seo-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anidachi.com";

/** Static URLs: omit lastModified when there is no stable content version date. */
const STATIC_PATHS = [
  "/",
  "/blou",
  "/tools/money-calculator",
  "/tools/lung-recovery-timeline",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const hubEntry = {
    url: `${SITE_URL}/quit-smoking`,
    lastModified: new Date(
      [...milestones.map((m) => m.updatedAt), ...symptoms.map((s) => s.updatedAt)].sort().at(-1) ??
        "2026-04-10"
    ),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  };

  return [
    ...STATIC_PATHS.map((path) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    hubEntry,
    ...milestones.map((item) => ({
      url: `${SITE_URL}/quit-smoking/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...symptoms.map((item) => ({
      url: `${SITE_URL}/quit-smoking/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...countries.map((item) => ({
      url: `${SITE_URL}/quit-smoking-calculator/${item.slug}`,
      lastModified: new Date(item.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
