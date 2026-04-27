"use client";

import Link from "next/link";
import {
  inferPageTemplateFromPath,
  trackConversion,
} from "@/lib/conversion-events";

export function NavPricingLink() {
  return (
    <Link
      href="/#pricing"
      className="text-purple-100 hover:text-white transition-colors"
      onClick={() => {
        if (typeof window === "undefined") return;
        const path = window.location.pathname;
        trackConversion("cta_click", {
          page_path: path,
          page_template: inferPageTemplateFromPath(path),
          placement: "nav",
          cta_variant: "nav_pricing",
        });
      }}
    >
      Pricing
    </Link>
  );
}
