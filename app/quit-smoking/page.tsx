import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { countries, milestones, symptoms } from "@/lib/blou-seo-data";
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildFaqSchema,
  buildItemListSchema,
  buildMetadata,
} from "@/lib/blou-seo";

const hubPath = "/quit-smoking";

const hubFaq = [
  {
    question: "Where should I start if I want to quit smoking?",
    answer:
      "Begin with a quit date plan and evidence-based support (behavioral strategies, clinical options where appropriate). Use our milestone guides to understand what to expect over the first days and weeks, and pair them with NHS, CDC, or WHO resources linked on each page.",
  },
  {
    question: "What happens to your body after you quit smoking?",
    answer:
      "Recovery unfolds over time: early changes can include shifting withdrawal symptoms and reduced exposure to smoke-related toxins; longer-term benefits continue as your body adapts. Our milestone pages (1 day through 10 years) summarize typical patterns and link to authoritative public-health sources.",
  },
  {
    question: "How long do cravings and withdrawal symptoms last?",
    answer:
      "Duration varies by person and smoking history. Our symptom guides cover cravings, cough, anxiety, fatigue, and more—with typical timelines, relief tips, and when to seek medical care.",
  },
  {
    question: "How is the global calculator different from country calculators?",
    answer:
      "The tool at /tools/money-calculator uses default inputs you choose yourself. Country pages at /quit-smoking-calculator/[country] start from estimated average pack prices in local currency so you can model savings closer to local retail.",
  },
  {
    question: "What is Bloü?",
    answer:
      "Bloü is a visual quit-smoking tracker app (streaks, milestones, craving support). These guides and tools on AniDachi complement the app; they are educational only and not a substitute for personal medical advice.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Quit Smoking Guides, Timelines & Tools | Bloü",
  description:
    "Milestone and symptom guides backed by public-health citations, plus calculators and a lung recovery visualizer. Educational resources for people quitting smoking.",
  pathname: hubPath,
  ogType: "website",
});

export default function QuitSmokingHubPage() {
  const itemListEntries = [
    ...milestones.map((m) => ({ name: m.title, pathname: `${hubPath}/${m.slug}` })),
    ...symptoms.map((s) => ({
      name: `How long does ${s.symptom} last when quitting smoking?`,
      pathname: `${hubPath}/${s.slug}`,
    })),
  ];

  const schema = [
    buildCollectionPageSchema({
      name: "Quit smoking guides and tools",
      description:
        "Educational milestone timelines, withdrawal symptom guides, and interactive tools for people quitting smoking.",
      pathname: hubPath,
    }),
    buildItemListSchema("Quit smoking articles", itemListEntries),
    buildFaqSchema(hubFaq),
    buildBreadcrumbSchema([
      { name: "Home", pathname: "/" },
      { name: "Quit smoking", pathname: hubPath },
    ]),
  ];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {schema.map((entry, index) => (
        <Script
          key={index}
          id={`quit-smoking-hub-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <h1 className="text-3xl font-bold text-stone-900">Quit smoking guides & tools</h1>
      <p className="mt-3 text-lg leading-relaxed text-stone-700">
        These pages explain what many people experience after stopping smoking—by milestone (day 1 through years
        smoke-free) and by symptom—using clear, answer-focused summaries. Each article links to NHS, CDC, and WHO
        guidance for context. Use the tools below to estimate savings and visualize recovery; they pair with the{" "}
        <span className="font-medium text-stone-800">Bloü</span> app for streak tracking and day-to-day support.
      </p>

      <section className="mt-10 rounded-xl border border-stone-200 bg-stone-50/80 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Interactive tools</h2>
        <ul className="mt-4 space-y-3 text-stone-700">
          <li>
            <Link className="font-medium text-teal-700 hover:underline" href="/tools/money-calculator">
              Quit smoking money saved calculator
            </Link>
            <span className="text-stone-600"> — global defaults; you set cigarettes per day and pack price.</span>
          </li>
          <li>
            <Link className="font-medium text-teal-700 hover:underline" href="/tools/lung-recovery-timeline">
              Lung recovery timeline visualizer
            </Link>
            <span className="text-stone-600"> — milestone view from your quit date.</span>
          </li>
        </ul>
        <h3 className="mt-6 text-base font-semibold text-stone-900">Country savings calculators</h3>
        <p className="mt-2 text-sm text-stone-600">
          Local-currency pack price starting points; adjust fields to match your area.
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {countries.map((c) => (
            <li key={c.slug}>
              <Link
                className="text-teal-700 hover:underline"
                href={`/quit-smoking-calculator/${c.slug}`}
              >
                {c.country}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">Milestones</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {milestones.map((item) => (
            <li key={item.slug} className="rounded-lg border border-stone-200 p-4">
              <Link className="font-medium text-teal-700 hover:underline" href={`${hubPath}/${item.slug}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">Symptoms</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {symptoms.map((item) => (
            <li key={item.slug} className="rounded-lg border border-stone-200 p-4">
              <Link className="font-medium text-teal-700 hover:underline" href={`${hubPath}/${item.slug}`}>
                How long does {item.symptom} last when quitting smoking?
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">FAQ</h2>
        <div className="mt-4 space-y-4">
          {hubFaq.map((entry) => (
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
