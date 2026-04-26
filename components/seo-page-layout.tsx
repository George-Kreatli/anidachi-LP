import Link from "next/link";
import { Footer } from "@/components/footer";
import { FAQSection, type FAQItem } from "@/components/faq-section";
import {
  BreadcrumbJsonLd,
  ArticleJsonLd,
  FAQPageJsonLd,
  ItemListJsonLd,
} from "@/components/json-ld";
import { TableOfContents, type TocHeading } from "@/components/table-of-contents";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export type { TocHeading };

export interface SeoPageLayoutProps {
  breadcrumbs: { name: string; url: string }[];
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  faq?: FAQItem[];
  headings?: TocHeading[];
  itemList?: { name: string; url: string; position: number }[];
  aboveFoldCta?: boolean;
  children: React.ReactNode;
}

function CtaBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mt-12 p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl text-center ${className}`.trim()}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Ready to Watch Anime Together?
      </h3>
      <p className="text-gray-600 mb-6">
        Create your first watchroom in under two minutes.
      </p>
      <Button
        size="lg"
        className="bg-purple-600 hover:bg-purple-700 text-white"
        asChild
      >
        <Link href="/#pricing">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}

export function SeoPageLayout({
  breadcrumbs,
  title,
  description,
  url,
  datePublished,
  dateModified,
  faq,
  headings,
  itemList,
  aboveFoldCta,
  children,
}: SeoPageLayoutProps) {
  const hasToc = headings && headings.length > 0;

  const articleBody = (
    <>
      {aboveFoldCta && <CtaBlock className="!mt-0 mb-10" />}
      {children}
      <CtaBlock />
    </>
  );

  return (
    <>
      <main id="main-content" className="min-h-screen bg-white">
        <nav aria-label="Breadcrumb" className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.url} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <Link
                      href={crumb.url}
                      className="hover:text-purple-600 transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      {crumb.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {hasToc ? (
          <div className="container mx-auto max-w-6xl px-4 py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              <aside
                className="order-1 w-full flex-shrink-0 lg:order-2 lg:w-64"
                aria-label="Table of contents"
              >
                <TableOfContents headings={headings!} />
              </aside>
              <article className="order-2 min-w-0 flex-1 max-w-3xl lg:order-1 lg:max-w-none">
                {articleBody}
              </article>
            </div>
          </div>
        ) : (
          <article className="container mx-auto max-w-3xl px-4 py-12">
            {articleBody}
          </article>
        )}

        {faq && faq.length > 0 && <FAQSection questions={faq} />}
      </main>
      <Footer />

      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd
        title={title}
        description={description}
        url={url}
        datePublished={datePublished}
        dateModified={dateModified}
      />
      {faq && faq.length > 0 && <FAQPageJsonLd questions={faq} />}
      {itemList && itemList.length > 0 && (
        <ItemListJsonLd name={title} items={itemList} />
      )}
    </>
  );
}
