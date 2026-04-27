"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import {
  trackConversion,
  type PageTemplateId,
  ctaCopyVariantForTemplate,
} from "@/lib/conversion-events";

const COPY = {
  default: {
    title: "Start your AniDachi paid plan",
    body: "$8/mo (early access) · Billed by Stripe. Full refund if you change your mind — no hidden fees.",
    button: "Start paid plan",
  },
  guide: {
    title: "Ready to run this setup with AniDachi?",
    body: "Same Crunchyroll account you already use. Checkout takes under a minute; cancel or refund on your terms.",
    button: "Start paid plan",
  },
  compare: {
    title: "See pricing and start checkout",
    body: "Compare plans on the home page, then start a secure Stripe checkout when you are ready.",
    button: "Start paid plan",
  },
  anime: {
    title: "Create a watchroom with a paid AniDachi plan",
    body: "Unlimited watchrooms, sync, and chat on Crunchyroll. Each viewer still needs their own Crunchyroll access.",
    button: "Start paid plan",
  },
  listicle: {
    title: "Turn these shows into a shared watchroom",
    body: "Lock in early-access pricing, then open any title on Crunchyroll in an AniDachi room.",
    button: "Start paid plan",
  },
  glossary: {
    title: "Try AniDachi with a clear refund path",
    body: "Early-access pricing with Stripe — cancel or refund if it is not a fit.",
    button: "Start paid plan",
  },
  pillar: {
    title: "Start a paid AniDachi plan",
    body: "Founding-member pricing on Stripe. Refund if you are not happy — we built this for long-running anime groups.",
    button: "Start paid plan",
  },
} as const;

type CtaCopyKey = keyof typeof COPY;

export interface PrimaryCheckoutCtaProps {
  pagePath: string;
  pageTemplate: PageTemplateId;
  /** Maps to COPY key; default: derived from `pageTemplate` */
  variant?: CtaCopyKey;
  placement:
    | "content_above_fold"
    | "content_bottom"
    | "content_mid"
    | "hero"
    | "home_features"
    | "nav";
  className?: string;
  ctaVariant?: string;
  trustMicrocopyClassName?: string;
}

export function PrimaryCheckoutCta({
  pagePath,
  pageTemplate,
  variant: variantProp,
  placement,
  className = "",
  ctaVariant = "primary_checkout",
  trustMicrocopyClassName = "text-sm text-gray-500 mt-4 max-w-md mx-auto flex items-start justify-center gap-2",
}: PrimaryCheckoutCtaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const impressionFired = useRef(false);
  const key = variantProp ?? ctaCopyVariantForTemplate(pageTemplate);
  const copy = COPY[key] ?? COPY.default;

  const fireImpression = useCallback(() => {
    if (impressionFired.current) return;
    impressionFired.current = true;
    trackConversion("cta_impression", {
      page_path: pagePath,
      page_template: pageTemplate,
      placement,
      cta_variant: ctaVariant,
    });
  }, [pagePath, pageTemplate, placement, ctaVariant]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      fireImpression();
      return;
    }

    const ob = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            fireImpression();
            ob.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [fireImpression]);

  return (
    <div
      ref={rootRef}
      className={`p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl text-center ${className}`.trim()}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{copy.title}</h3>
      <p className="text-gray-600 mb-6 max-w-lg mx-auto">{copy.body}</p>
      <Button
        size="lg"
        className="bg-purple-600 hover:bg-purple-700 text-white"
        asChild
      >
        <Link
          href="/#pricing"
          onClick={() =>
            trackConversion("cta_click", {
              page_path: pagePath,
              page_template: pageTemplate,
              placement,
              cta_variant: ctaVariant,
            })
          }
        >
          {copy.button}
          <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </Link>
      </Button>
      <p className={trustMicrocopyClassName}>
        <Shield
          className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5"
          aria-hidden="true"
        />
        <span>Secure checkout via Stripe. Crunchyroll subscription not included — everyone keeps their own streaming login.</span>
      </p>
    </div>
  );
}
