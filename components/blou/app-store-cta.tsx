"use client";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/components/blou/analytics";

type Props = {
  href: string;
  placement: string;
  label?: string;
  className?: string;
};

export function AppStoreCta({
  href,
  placement,
  label = "Track your progress in Bloü",
  className,
}: Props) {
  return (
    <Button asChild className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("blou_app_store_click", {
            placement,
            destination: "app_store",
          })
        }
      >
        {label}
      </a>
    </Button>
  );
}
