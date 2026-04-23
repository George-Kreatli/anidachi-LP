import Script from "next/script";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id={`json-ld-${JSON.stringify(data).slice(0, 32)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  );
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anidachi.app";

export function OrganizationJsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "AniDachi",
      url: SITE_URL,
      logo: `${SITE_URL}/Anidachi_logo.png`,
      sameAs: [],
      contactPoint: {
        "@type": "ContactPoint",
        email: "goshan.tolochko@gmail.com",
        contactType: "customer support",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "AniDachi",
      url: SITE_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/watch/{search_term_string}-with-friends`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
  return <JsonLd data={data} />;
}

export function SoftwareApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "AniDachi",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Chrome, Web",
    description:
      "Watch anime together with friends. Create watchrooms, sync Crunchyroll playback, chat in real-time, and track your anime journey.",
    url: SITE_URL,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "8",
      highPrice: "8",
      offerCount: 1,
      offers: [
        {
          "@type": "Offer",
          name: "Crunchyroll Subscriber",
          price: "8",
          priceCurrency: "USD",
          priceValidUntil: "2027-12-31",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/#pricing`,
        },
      ],
    },
  };
  return <JsonLd data={data} />;
}

export function FAQPageJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "AniDachi",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "AniDachi",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/Anidachi_logo.png` },
    },
  };
  return <JsonLd data={data} />;
}
