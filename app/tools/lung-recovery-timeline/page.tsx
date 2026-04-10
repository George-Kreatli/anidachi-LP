import Script from "next/script";
import type { Metadata } from "next";
import { LungRecoveryVisualizer } from "@/components/blou/lung-recovery-visualizer";
import { AppStoreCta } from "@/components/blou/app-store-cta";
import {
  appStoreUrlWithUtm,
  buildBreadcrumbSchema,
  buildMetadata,
  buildWebApplicationSchema,
} from "@/lib/blou-seo";

export const metadata: Metadata = buildMetadata({
  title: "Lung Recovery Timeline After Quitting Smoking",
  description:
    "Visualize your smoke-free lung recovery milestones and track progress from day 1 through year 1.",
  pathname: "/tools/lung-recovery-timeline",
  ogType: "website",
});

export default function LungRecoveryTimelinePage() {
  const schema = [
    buildWebApplicationSchema({
      name: "Lung Recovery Timeline Visualizer",
      description: "Interactive timeline showing progress milestones after quitting smoking.",
      pathname: "/tools/lung-recovery-timeline",
    }),
    buildBreadcrumbSchema([
      { name: "Home", pathname: "/" },
      { name: "Tools", pathname: "/tools/lung-recovery-timeline" },
      { name: "Lung Recovery Timeline", pathname: "/tools/lung-recovery-timeline" },
    ]),
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {schema.map((entry, index) => (
        <Script
          key={index}
          id={`lung-tool-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
      <h1 className="text-3xl font-bold text-stone-900">Lung Recovery Timeline</h1>
      <p className="mt-3 text-stone-700">
        Enter your smoke-free streak and review milestone-by-milestone progress.
      </p>
      <div className="mt-8">
        <LungRecoveryVisualizer />
      </div>
      <div className="mt-8 rounded-xl border border-stone-200 p-6">
        <p className="text-stone-700">
          Continue tracking these milestones with reminders and craving support inside Bloü.
        </p>
        <div className="mt-4">
          <AppStoreCta
            href={appStoreUrlWithUtm("tool_lung_timeline")}
            placement="tool_lung_timeline"
          />
        </div>
      </div>
    </main>
  );
}
