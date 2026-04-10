import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import { MoneyCalculatorLazy } from "@/components/blou/money-calculator-lazy";
import { AppStoreCta } from "@/components/blou/app-store-cta";
import { countries } from "@/lib/blou-seo-data";
import {
  appStoreUrlWithUtm,
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
  buildWebApplicationSchema,
} from "@/lib/blou-seo";
import { sitePublishDate } from "@/lib/blou-seo-trust";

type Params = Promise<{ countrySlug: string }>;

export function generateStaticParams() {
  return countries.map((country) => ({ countrySlug: country.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { countrySlug } = await params;
  const country = countries.find((item) => item.slug === countrySlug);
  if (!country) return {};
  return buildMetadata({
    title: `Quit smoking money saved calculator ${country.country}`,
    description: `Estimate money saved after quitting smoking in ${country.country} using local pack price assumptions.`,
    pathname: `/quit-smoking-calculator/${countrySlug}`,
    ogType: "website",
  });
}

export default async function CountryCalculatorPage({ params }: { params: Params }) {
  const { countrySlug } = await params;
  const country = countries.find((item) => item.slug === countrySlug);
  if (!country) notFound();

  const faq = [
    {
      question: `What is the average cigarette pack price in ${country.country}?`,
      answer: `This calculator starts with an estimated average pack price of ${country.averagePackPrice} ${country.currency}. Adjust the value to match your local area.`,
    },
    {
      question: "Can I change cigarettes per day and pack price?",
      answer: "Yes. Customize both fields to model your personal smoking history and expected savings.",
    },
  ];

  const schema = [
    buildArticleSchema({
      title: `Quit smoking money saved calculator ${country.country}`,
      description: `Estimate money saved after quitting smoking in ${country.country} using local pack price assumptions.`,
      pathname: `/quit-smoking-calculator/${country.slug}`,
      datePublished: sitePublishDate,
      dateModified: country.updatedAt,
    }),
    buildWebApplicationSchema({
      name: `Quit Smoking Calculator ${country.country}`,
      description: `Country-specific money saved calculator for ${country.country}.`,
      pathname: `/quit-smoking-calculator/${country.slug}`,
    }),
    buildFaqSchema(faq),
    buildBreadcrumbSchema([
      { name: "Home", pathname: "/" },
      { name: "Calculator", pathname: `/quit-smoking-calculator/${country.slug}` },
      { name: country.country, pathname: `/quit-smoking-calculator/${country.slug}` },
    ]),
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {schema.map((entry, index) => (
        <Script
          key={index}
          id={`country-calculator-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}

      <h1 className="text-3xl font-bold text-stone-900">
        Quit Smoking Money Saved Calculator ({country.country})
      </h1>
      <p className="mt-3 text-stone-700">
        Use local pricing assumptions in {country.currency} to estimate your smoke-free savings and
        convert that momentum into a long-term quit plan.
      </p>

      <div className="mt-8">
        <MoneyCalculatorLazy
          defaultPackPrice={country.averagePackPrice}
          currency={country.currency}
        />
      </div>

      <div className="mt-8 rounded-xl border border-stone-200 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Continue this plan in Bloü</h2>
        <p className="mt-2 text-stone-700">
          Save your streak, track milestones, and keep support tools available when cravings hit.
        </p>
        <div className="mt-4">
          <AppStoreCta
            href={appStoreUrlWithUtm(`country_calculator_${country.slug}`)}
            placement={`country_calculator_${country.slug}`}
          />
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
    </main>
  );
}
