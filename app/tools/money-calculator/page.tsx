import Script from "next/script";
import type { Metadata } from "next";
import { MoneyCalculator } from "@/components/blou/money-calculator";
import { AppStoreCta } from "@/components/blou/app-store-cta";
import {
  appStoreUrlWithUtm,
  buildBreadcrumbSchema,
  buildMetadata,
  buildWebApplicationSchema,
} from "@/lib/blou-seo";

export const metadata: Metadata = buildMetadata({
  title: "Quit Smoking Money Saved Calculator by Bloü",
  description:
    "Calculate how much money you save after quitting smoking across 1 week, 1 month, 1 year, and 10 years.",
  pathname: "/tools/money-calculator",
  ogType: "website",
});

export default function MoneyCalculatorPage() {
  const schema = [
    buildWebApplicationSchema({
      name: "Quit Smoking Money Saved Calculator",
      description: "Interactive calculator for estimating money saved after quitting smoking.",
      pathname: "/tools/money-calculator",
    }),
    buildBreadcrumbSchema([
      { name: "Home", pathname: "/" },
      { name: "Tools", pathname: "/tools/money-calculator" },
      { name: "Money Calculator", pathname: "/tools/money-calculator" },
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
      <h1 className="text-3xl font-bold text-stone-900">Quit Smoking Money Saved Calculator</h1>
      <p className="mt-3 text-stone-700">
        See immediate and long-term financial gains from staying smoke-free.
      </p>
      <div className="mt-8">
        <MoneyCalculator />
      </div>
      <div className="mt-8 rounded-xl border border-stone-200 p-6">
        <p className="text-stone-700">
          Keep this momentum in the app with milestone tracking and craving support.
        </p>
        <div className="mt-4">
          <AppStoreCta
            href={appStoreUrlWithUtm("tool_money_calculator")}
            placement="tool_money_calculator"
          />
        </div>
      </div>
    </main>
  );
}
