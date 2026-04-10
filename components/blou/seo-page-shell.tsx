import type { ReactNode } from "react";
import Script from "next/script";
import Link from "next/link";
import { AppStoreCta } from "@/components/blou/app-store-cta";
import { MoneyCalculatorLazy } from "@/components/blou/money-calculator-lazy";
import { appStoreUrlWithUtm } from "@/lib/blou-seo";
import { healthSources } from "@/lib/blou-seo-data";

type ExtractFact = { label: string; value: string };

type Props = {
  title: string;
  description: string;
  bluf: string;
  sections: { heading: string; body: ReactNode }[];
  listItems: string[];
  faq: { question: string; answer: string }[];
  relatedLinks: { href: string; label: string }[];
  campaign: string;
  schema: unknown[];
  calculatorCurrency?: string;
  calculatorPackPrice?: number;
  extractFacts?: ExtractFact[];
};

export function SeoPageShell({
  title,
  description,
  bluf,
  sections,
  listItems,
  faq,
  relatedLinks,
  campaign,
  schema,
  calculatorCurrency,
  calculatorPackPrice,
  extractFacts,
}: Props) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {schema.map((entry, index) => (
        <Script
          key={index}
          id={`blou-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <h1 className="text-3xl font-bold tracking-tight text-stone-900">{title}</h1>
      <p className="mt-4 text-lg text-stone-700">{description}</p>

      <p className="mt-5 rounded-lg border border-stone-200 bg-white p-4 text-base font-medium leading-relaxed text-stone-800">
        {bluf}
      </p>

      {extractFacts && extractFacts.length > 0 ? (
        <section className="mt-6 overflow-x-auto rounded-xl border border-stone-200" aria-label="Key facts">
          <table className="w-full min-w-[280px] text-left text-sm">
            <tbody>
              {extractFacts.map((row) => (
                <tr key={row.label} className="border-b border-stone-100 last:border-0">
                  <th
                    scope="row"
                    className="w-1/3 whitespace-nowrap bg-stone-50 px-4 py-3 font-semibold text-stone-800"
                  >
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-stone-700">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      <aside className="mt-6 rounded-xl border border-teal-100 bg-teal-50 p-4">
        <p className="text-sm text-teal-800">
          Educational only; not a substitute for personal medical advice. See{" "}
          <a
            className="font-medium underline underline-offset-2"
            href={healthSources[0].href}
            target="_blank"
            rel="noopener noreferrer"
          >
            NHS
          </a>
          ,{" "}
          <a
            className="font-medium underline underline-offset-2"
            href={healthSources[1].href}
            target="_blank"
            rel="noopener noreferrer"
          >
            CDC
          </a>
          , and{" "}
          <a
            className="font-medium underline underline-offset-2"
            href={healthSources[3].href}
            target="_blank"
            rel="noopener noreferrer"
          >
            WHO
          </a>{" "}
          for authoritative guidance.
        </p>
      </aside>

      <article className="mt-8 space-y-6">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold text-stone-900">{section.heading}</h2>
            <div className="mt-2 space-y-3 leading-7 text-stone-700">{section.body}</div>
          </section>
        ))}

        <section>
          <h2 className="text-2xl font-semibold text-stone-900">What to expect next</h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-stone-700">
            {listItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </article>

      <div className="mt-10">
        <MoneyCalculatorLazy
          defaultPackPrice={calculatorPackPrice}
          currency={calculatorCurrency}
        />
      </div>

      <div className="mt-8 rounded-xl border border-stone-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-stone-900">Track this recovery in Bloü</h2>
        <p className="mt-2 text-stone-700">
          Use Bloü to keep your streak, monitor milestones, and get support when cravings hit.
        </p>
        <div className="mt-4">
          <AppStoreCta href={appStoreUrlWithUtm(campaign)} placement={campaign} />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">FAQ</h2>
        <div className="mt-4 space-y-4">
          {faq.map((entry) => (
            <details key={entry.question} className="rounded-lg border border-stone-200 p-4">
              <summary className="cursor-pointer font-medium text-stone-900">{entry.question}</summary>
              <p className="mt-2 text-sm leading-6 text-stone-700">{entry.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">Related pages</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link className="text-teal-700 hover:underline" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">Medical references</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          {healthSources.map((source) => (
            <li key={source.href}>
              <a
                className="text-teal-700 hover:underline"
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
