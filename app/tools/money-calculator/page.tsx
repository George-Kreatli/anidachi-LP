import Script from "next/script";
import Link from "next/link";
import type { Metadata } from "next";
import { MoneyCalculator } from "@/components/blou/money-calculator";
import { AppStoreBadgeLink } from "@/components/blou/app-store-badge";
import {
  appStoreUrlWithUtm,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildMetadata,
  buildWebApplicationSchema,
} from "@/lib/blou-seo";

const pathname = "/tools/money-calculator";

const toolFaq = [
  {
    question: "How do I estimate money saved after quitting smoking?",
    answer:
      "Enter how many cigarettes you used to smoke per day and your typical pack price. The calculator multiplies daily spend by smoke-free time ranges (1 week through 10 years).",
  },
  {
    question: "Is this calculator the same as the country-specific pages?",
    answer:
      "No. This page uses numbers you choose. Country pages at /quit-smoking-calculator/[country] start from estimated average pack prices in local currency—better when you want a local default.",
  },
  {
    question: "Does this replace medical or cessation advice?",
    answer:
      "No. It is for motivation and planning only. For quitting support, see NHS, CDC, or WHO resources linked from our quit smoking guides.",
  },
];

const howToSteps = [
  {
    name: "Set cigarettes per day",
    text: "Enter the number of cigarettes you used to smoke on a typical day before quitting.",
  },
  {
    name: "Set pack price",
    text: "Enter what you paid per pack (or per carton converted to per-pack). Adjust anytime to match your area.",
  },
  {
    name: "Read the savings ranges",
    text: "Review estimated savings for 1 week, 1 month, 1 year, and 10 years smoke-free.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Quit Smoking Money Saved Calculator by Bloü",
  description:
    "Calculate how much money you save after quitting smoking across 1 week, 1 month, 1 year, and 10 years.",
  pathname,
  ogType: "website",
});

export default function MoneyCalculatorPage() {
  const schema = [
    buildWebApplicationSchema({
      name: "Quit Smoking Money Saved Calculator",
      description: "Interactive calculator for estimating money saved after quitting smoking.",
      pathname,
    }),
    buildHowToSchema({
      name: "Use the quit smoking money saved calculator",
      description: "Estimate financial savings after quitting smoking using daily use and pack price.",
      steps: howToSteps,
    }),
    buildFaqSchema(toolFaq),
    buildBreadcrumbSchema([
      { name: "Home", pathname: "/" },
      { name: "Tools", pathname: "/tools" },
      { name: "Money calculator", pathname },
    ]),
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {schema.map((entry, index) => (
        <Script
          key={index}
          id={`money-tool-schema-${index}`}
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
        <span className="text-stone-800">Money calculator</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold text-stone-900">Quit Smoking Money Saved Calculator</h1>
      <p className="mt-3 text-stone-700">
        See immediate and long-term financial gains from staying smoke-free. For guides on withdrawal and recovery
        milestones, see{" "}
        <Link className="text-teal-700 hover:underline" href="/quit-smoking">
          quit smoking guides
        </Link>{" "}
        or a{" "}
        <Link className="text-teal-700 hover:underline" href="/quit-smoking-calculator/united-states">
          country calculator
        </Link>{" "}
        with local pack-price defaults.
      </p>
      <div className="mt-8">
        <MoneyCalculator />
      </div>
      <div className="mt-8 rounded-xl border border-stone-200 p-6">
        <p className="text-stone-700">
          Keep this momentum in the app with milestone tracking and craving support.
        </p>
        <div className="mt-4">
          <AppStoreBadgeLink
            href={appStoreUrlWithUtm("tool_money_calculator")}
            placement="tool_money_calculator"
          />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">How to use this calculator</h2>
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
