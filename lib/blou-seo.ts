import type { Metadata } from "next";
import { isMedicalReviewerConfigured, medicalReview, sitePublishDate } from "@/lib/blou-seo-trust";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anidachi.com";

/** Public App Store listing — used in UTM links, JSON-LD `sameAs`, and entity clarity. */
export const BLOU_APP_STORE_URL =
  "https://apps.apple.com/us/app/quit-smoking-tracker-blou/id6758997298";

/** Single canonical brand string for schema and OG (matches App Store spelling). */
export const BLOU_ORGANIZATION_NAME = "Bloü";


const DEFAULT_OG_PATH =
  process.env.NEXT_PUBLIC_SEO_OG_IMAGE_PATH || "/Anidachi_logo.png";

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export function appStoreUrlWithUtm(campaign: string): string {
  const url = new URL(BLOU_APP_STORE_URL);
  url.searchParams.set("itscg", "30200");
  url.searchParams.set("itsct", "apps_box_link");
  url.searchParams.set("mttnsubad", "6758997298");
  url.searchParams.set("utm_source", "seo");
  url.searchParams.set("utm_medium", "organic");
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

function defaultOgImage(): NonNullable<Metadata["openGraph"]>["images"] {
  const url = absoluteUrl(DEFAULT_OG_PATH);
  return [{ url, width: 1200, height: 630, alt: "Bloü" }];
}

export function buildMetadata({
  title,
  description,
  pathname,
  ogType = "article",
}: {
  title: string;
  description: string;
  pathname: string;
  ogType?: "article" | "website";
}): Metadata {
  const url = absoluteUrl(pathname);
  const images: NonNullable<Metadata["openGraph"]>["images"] = defaultOgImage();
  const twitterImages = Array.isArray(images)
    ? images.map((img) => (typeof img === "object" && img && "url" in img ? img.url : img))
    : images;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: ogType,
      url,
      images,
      siteName: BLOU_ORGANIZATION_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages,
    },
  };
}

function blouOrganizationObject(includeUrl = true) {
  const org: Record<string, unknown> = {
    "@type": "Organization",
    name: BLOU_ORGANIZATION_NAME,
    sameAs: [BLOU_APP_STORE_URL],
  };
  if (includeUrl) {
    org.url = SITE_URL;
  }
  return org;
}

export function buildArticleSchema({
  title,
  description,
  pathname,
  dateModified,
  datePublished = sitePublishDate,
}: {
  title: string;
  description: string;
  pathname: string;
  dateModified: string;
  datePublished?: string;
}) {
  const pageUrl = absoluteUrl(pathname);
  const logoUrl = absoluteUrl(DEFAULT_OG_PATH);

  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified,
    author: blouOrganizationObject(),
    publisher: {
      ...blouOrganizationObject(),
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  if (isMedicalReviewerConfigured()) {
    article.reviewedBy = {
      "@type": "Person",
      name: medicalReview.reviewerName,
      jobTitle: medicalReview.reviewerTitle,
    };
  }

  return article;
}

export function buildFaqSchema(
  questions: { question: string; answer: string }[]
) {
  return {
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
}

export function buildWebApplicationSchema({
  name,
  description,
  pathname,
}: {
  name: string;
  description: string;
  pathname: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    url: absoluteUrl(pathname),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; pathname: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}

export function buildCollectionPageSchema({
  name,
  description,
  pathname,
}: {
  name: string;
  description: string;
  pathname: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(pathname),
  };
}

export function buildWebPageSchema({
  name,
  description,
  pathname,
}: {
  name: string;
  description: string;
  pathname: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(pathname),
  };
}

export function buildItemListSchema(
  name: string,
  items: { name: string; pathname: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.pathname),
    })),
  };
}

export function buildHowToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
