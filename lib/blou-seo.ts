import type { Metadata } from "next";
import { medicalReview, sitePublishDate } from "@/lib/blou-seo-trust";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anidachi.com";
const APP_STORE_URL = "https://apps.apple.com/app/blo%C3%BC/id6758997298";

const DEFAULT_OG_PATH =
  process.env.NEXT_PUBLIC_SEO_OG_IMAGE_PATH || "/Anidachi_logo.png";

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}

export function appStoreUrlWithUtm(campaign: string): string {
  const url = new URL(APP_STORE_URL);
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
      siteName: "Bloü",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: twitterImages,
    },
  };
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

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      name: "Blou",
      url: SITE_URL,
    },
    reviewedBy: {
      "@type": "Person",
      name: medicalReview.reviewerName,
      jobTitle: medicalReview.reviewerTitle,
    },
    publisher: {
      "@type": "Organization",
      name: "Blou",
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
