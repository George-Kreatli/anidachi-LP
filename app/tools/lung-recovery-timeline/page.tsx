import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import { LungRecoveryVisualizer } from "@/components/blou/lung-recovery-visualizer";
import { AppStoreBadgeLink } from "@/components/blou/app-store-badge";
import { citationUrls } from "@/lib/blou-seo-data";
import {
  appStoreUrlWithUtm,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildMetadata,
  buildWebApplicationSchema,
} from "@/lib/blou-seo";

const pathname = "/tools/lung-recovery-timeline";

const toolFaq = [
  {
    question: "What does the lung recovery timeline show?",
    answer:
      "It maps common milestone-style framing of recovery after quitting smoking to your smoke-free streak. Individual recovery varies; use it for motivation alongside clinician and public-health guidance.",
  },
  {
    question: "Is this timeline medical advice?",
    answer:
      "No. It is educational. For symptoms like cough, shortness of breath, or chest pain, see a clinician and consult NHS, CDC, or WHO quit-smoking resources.",
  },
  {
    question: "Where can I read more about withdrawal symptoms?",
    answer:
      "Our symptom guides on /quit-smoking cover cravings, cough, anxiety, fatigue, and more with typical timelines and when to seek care.",
  },
];

const howToSteps = [
  {
    name: "Enter your quit context",
    text: "Set your quit date or the number of days you have been smoke-free.",
  },
  {
    name: "Review milestones",
    text: "Scroll the timeline to see how far you have progressed relative to common milestone labels.",
  },
  {
    name: "Dig deeper when needed",
    text: "Open related quit smoking articles for symptom-specific detail and authoritative citations.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Lung Recovery Timeline After Quitting Smoking",
  description:
    "Visualize your smoke-free lung recovery milestones and track progress from day 1 through year 1.",
  pathname,
  ogType: "website",
});

export default function LungRecoveryTimelinePage() {
  const schema = [
    buildWebApplicationSchema({
      name: "Lung Recovery Timeline Visualizer",
      description: "Interactive timeline showing progress milestones after quitting smoking.",
      pathname,
    }),
    buildHowToSchema({
      name: "Use the lung recovery timeline visualizer",
      description: "Explore milestone-style progress after quitting smoking from your quit date.",
      steps: howToSteps,
    }),
    buildFaqSchema(toolFaq),
    buildBreadcrumbSchema([
      { name: "Home", pathname: "/" },
      { name: "Tools", pathname: "/tools" },
      { name: "Lung recovery timeline", pathname },
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
      <nav className="text-sm text-stone-600">
        <Link className="text-teal-700 hover:underline" href="/tools">
          Tools
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-stone-800">Lung recovery timeline</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold text-stone-900">Lung Recovery Timeline</h1>
      <p className="mt-3 text-stone-700">
        Enter your smoke-free streak and review milestone-by-milestone progress. For population-level context on
        quitting and health, see{" "}
        <a
          className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
          href={citationUrls.cdcBenefitsOfQuitting}
          target="_blank"
          rel="noopener noreferrer"
        >
          CDC: Benefits of quitting smoking
        </a>{" "}
        and{" "}
        <a
          className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
          href={citationUrls.nhsQuitSmoking}
          target="_blank"
          rel="noopener noreferrer"
        >
          NHS: Quit smoking
        </a>
        .
      </p>
      <div className="mt-8">
        <LungRecoveryVisualizer />
      </div>
      <div className="mt-8 rounded-xl border border-stone-200 p-6">
        <p className="text-stone-700">
          Continue tracking these milestones with reminders and craving support inside Bloü.
        </p>
        <div className="mt-4">
          <AppStoreBadgeLink
            href={appStoreUrlWithUtm("tool_lung_timeline")}
            placement="tool_lung_timeline"
          />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">How to use this timeline</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6 text-stone-700">
          {howToSteps.map((step) => (
            <li key={step.name}>
              <span className="font-medium text-stone-900">{step.name}.</span> {step.text}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">FAQ</h2>
        <div className="mt-4 space-y-4">
          {toolFaq.map((entry) => (
            <details key={entry.question} className="rounded-lg border border-stone-200 p-4">
              <summary className="cursor-pointer font-medium text-stone-900">{entry.question}</summary>
              <p className="mt-2 text-sm leading-6 text-stone-700">{entry.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
