import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { countries } from "@/lib/blou-seo-data";
import { buildBreadcrumbSchema, buildMetadata, buildWebPageSchema } from "@/lib/blou-seo";

const pathname = "/tools";

const pageDescription =
  "Free web tools: money saved calculator, lung recovery timeline, and country-specific savings calculators.";

export const metadata: Metadata = buildMetadata({
  title: "Quit smoking tools | Bloü",
  description: pageDescription,
  pathname,
  ogType: "website",
});

export default function ToolsIndexPage() {
  const schema = [
    buildWebPageSchema({
      name: "Quit smoking tools",
      description: pageDescription,
      pathname,
    }),
    buildBreadcrumbSchema([
      { name: "Home", pathname: "/" },
      { name: "Tools", pathname },
    ]),
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {schema.map((entry, index) => (
        <Script
          key={index}
          id={`tools-index-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <h1 className="text-3xl font-bold text-stone-900">Quit smoking tools</h1>
      <p className="mt-3 text-stone-700">
        Interactive calculators and visualizers. Educational only; not medical advice. For in-depth guides see{" "}
        <Link className="text-teal-700 hover:underline" href="/quit-smoking">
          quit smoking guides
        </Link>
        .
      </p>

      <ul className="mt-8 space-y-6">
        <li className="rounded-xl border border-stone-200 p-5">
          <h2 className="text-xl font-semibold text-stone-900">
            <Link className="text-teal-700 hover:underline" href="/tools/money-calculator">
              Money saved calculator
            </Link>
          </h2>
          <p className="mt-2 text-stone-700">
            Estimate savings over 1 week through 10 years using your own pack price and cigarettes per day.
          </p>
        </li>
        <li className="rounded-xl border border-stone-200 p-5">
          <h2 className="text-xl font-semibold text-stone-900">
            <Link className="text-teal-700 hover:underline" href="/tools/lung-recovery-timeline">
              Lung recovery timeline
            </Link>
          </h2>
          <p className="mt-2 text-stone-700">
            Visualize milestone-style progress from your quit date. Pair with our symptom pages for withdrawal
            details.
          </p>
        </li>
        <li className="rounded-xl border border-stone-200 p-5">
          <h2 className="text-xl font-semibold text-stone-900">Country savings calculators</h2>
          <p className="mt-2 text-sm text-stone-600">Starts from estimated average pack prices in local currency.</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {countries.map((c) => (
              <li key={c.slug}>
                <Link className="text-teal-700 hover:underline" href={`/quit-smoking-calculator/${c.slug}`}>
                  {c.country}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </main>
  );
}
