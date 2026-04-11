"use client";

import Image from "next/image";
import { trackEvent } from "@/components/blou/analytics";
import { cn } from "@/lib/utils";

const BADGE_SRC = "/badges/download-on-the-app-store-us-uk.svg";
const BADGE_ASPECT = 119.66407 / 40;

type Props = {
  href: string;
  placement: string;
  className?: string;
  /** On-screen height in CSS pixels; Apple recommends at least 40px. */
  height?: number;
};

const defaultBadgeClass =
  "inline-block rounded-md shadow-[0_4px_14px_rgba(0,0,0,0.12)] ring-1 ring-stone-900/5 transition-[box-shadow,transform] duration-200 hover:shadow-[0_6px_20px_rgba(0,0,0,0.16)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

export function AppStoreBadgeLink({ href, placement, className, height = 54 }: Props) {
  const width = Math.round(height * BADGE_ASPECT);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(defaultBadgeClass, className)}
      onClick={() =>
        trackEvent("blou_app_store_click", {
          placement,
          destination: "app_store",
        })
      }
    >
      <Image
        src={BADGE_SRC}
        alt="Download on the App Store"
        width={width}
        height={height}
        unoptimized
        className="h-auto max-w-full"
        style={{ height: `${height}px`, width: "auto" }}
      />
    </a>
  );
}
