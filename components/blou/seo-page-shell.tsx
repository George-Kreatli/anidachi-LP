import type { ReactNode } from "react";
import Script from "next/script";
import Link from "next/link";
import { AppStoreBadgeLink } from "@/components/blou/app-store-badge";
import { MoneyCalculatorLazy } from "@/components/blou/money-calculator-lazy";
import { SeoStickyMobileAppCta } from "@/components/blou/seo-sticky-mobile-cta";
import { SeoPageWithSidebar, type TocItem } from "@/components/blou/seo-toc";
import { appStoreUrlWithUtm } from "@/lib/blou-seo";
import { healthSources } from "@/lib/blou-seo-data";
import { headingToAnchorId } from "@/lib/blou-heading-id";
import { isMedicalReviewerConfigured, medicalReview } from "@/lib/blou-seo-trust";

type ExtractFact = { label: string; value: string };

const scrollAnchor = "scroll-mt-28";

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
  const storeHref = appStoreUrlWithUtm(campaign);

  const usedIds = new Set<string>([
    "page-intro",
    "overview",
    "medical-review",
    "medical-notice",
    "plan-your-quit",
    "what-to-expect-next",
    "money-calculator",
    "get-blo-app",
    "faq",
    "related-pages",
    "medical-references",
  ]);
  if (extractFacts?.length) usedIds.add("key-facts");

  const sectionAnchors = sections.map((section) => ({
    ...section,
    anchorId: headingToAnchorId(section.heading, usedIds),
  }));

  const tocItems: TocItem[] = [
    { id: "page-intro", label: "Introduction" },
    { id: "overview", label: "Summary" },
    { id: "medical-review", label: "Medical review" },
  ];
  if (extractFacts?.length) tocItems.push({ id: "key-facts", label: "Key facts" });
  tocItems.push({ id: "medical-notice", label: "Medical notice" });
  sectionAnchors.forEach((s) => tocItems.push({ id: s.anchorId, label: s.heading }));
  tocItems.push(
    { id: "what-to-expect-next", label: "What to expect next" },
    { id: "plan-your-quit", label: "Stay on track" },
    { id: "money-calculator", label: "Money calculator" },
    { id: "get-blo-app", label: "Get Bloü" },
    { id: "faq", label: "FAQ" },
    { id: "related-pages", label: "Related pages" },
    { id: "medical-references", label: "References" }
  );

  return (
    <main>
      <SeoPageWithSidebar tocItems={tocItems} bottomPaddingForMobileCta>
        {schema.map((entry, index) => (
          <Script
            key={index}
            id={`blou-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}

        <h1 className="text-3xl font-bold tracking-tight text-stone-900">{title}</h1>

        <div id="page-intro" className={`${scrollAnchor} mt-4 space-y-4`}>
          <p className="text-lg text-stone-700">{description}</p>
          <div className="flex flex-wrap items-center">
            <AppStoreBadgeLink href={storeHref} placement={`${campaign}_intro`} />
          </div>
        </div>

        <p
          id="overview"
          className={`${scrollAnchor} mt-5 rounded-lg border border-stone-200 bg-white p-4 text-base font-medium leading-relaxed text-stone-800`}
        >
          {bluf}
        </p>

        <section
          id="medical-review"
          className={`${scrollAnchor} mt-5 rounded-lg border border-stone-200 bg-white p-4 text-sm leading-relaxed text-stone-700`}
          aria-label="Medical review"
        >
          {isMedicalReviewerConfigured() ? (
            <>
              <p className="font-semibold text-stone-900">Medically reviewed</p>
              <p className="mt-1">
                {medicalReview.reviewerName}, {medicalReview.reviewerTitle}. {medicalReview.credentialLine}
              </p>
              <p className="mt-2 text-stone-600">Last reviewed: {medicalReview.lastReviewed}</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-stone-900">Medical information</p>
              <p className="mt-1">Last content review: {medicalReview.lastReviewed}</p>
            </>
          )}
          <p className="mt-2 text-stone-600">{medicalReview.scope}</p>
        </section>

        {extractFacts && extractFacts.length > 0 ? (
          <section
            id="key-facts"
            className={`${scrollAnchor} mt-6 overflow-x-auto rounded-xl border border-stone-200`}
            aria-label="Key facts"
          >
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

        <aside
          id="medical-notice"
          className={`${scrollAnchor} mt-6 rounded-xl border border-teal-100 bg-teal-50 p-4`}
        >
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
          {sectionAnchors.map((section) => (
            <section key={section.heading} id={section.anchorId} className={scrollAnchor}>
              <h2 className="text-2xl font-semibold text-stone-900">{section.heading}</h2>
              <div className="mt-2 space-y-3 leading-7 text-stone-700">{section.body}</div>
            </section>
          ))}

          <section id="what-to-expect-next" className={scrollAnchor}>
            <h2 className="text-2xl font-semibold text-stone-900">What to expect next</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-stone-700">
              {listItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </article>

        <section
          id="plan-your-quit"
          className={`${scrollAnchor} mt-10 rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-sky-50 p-6 shadow-sm`}
        >
          <h2 className="text-xl font-semibold text-stone-900">Stay on track after you read this</h2>
          <p className="mt-2 text-stone-700">
            Bloü turns milestones, cravings, and savings into a simple daily rhythm—so you do not have
            to white-knuckle it alone.
          </p>
          <div className="mt-4 flex flex-wrap items-center">
            <AppStoreBadgeLink href={storeHref} placement={`${campaign}_mid`} />
          </div>
        </section>

        <div id="money-calculator" className={`${scrollAnchor} mt-10`}>
          <MoneyCalculatorLazy
            defaultPackPrice={calculatorPackPrice}
            currency={calculatorCurrency}
          />
        </div>

        <div
          id="get-blo-app"
          className={`${scrollAnchor} mt-8 rounded-xl border border-stone-200 bg-white p-6 shadow-sm`}
        >
          <h2 className="text-2xl font-semibold text-stone-900">Track this recovery in Bloü</h2>
          <p className="mt-2 text-stone-700">
            Use Bloü to keep your streak, monitor milestones, and get support when cravings hit.
          </p>
          <div className="mt-4 flex flex-wrap items-center">
            <AppStoreBadgeLink href={storeHref} placement={`${campaign}_footer_card`} />
          </div>
        </div>

        <section id="faq" className={`${scrollAnchor} mt-10`}>
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

        <section id="related-pages" className={`${scrollAnchor} mt-10`}>
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

        <section id="medical-references" className={`${scrollAnchor} mt-10`}>
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
      </SeoPageWithSidebar>

      <SeoStickyMobileAppCta href={storeHref} placement={`${campaign}_sticky_mobile`} />
    </main>
  );
}
