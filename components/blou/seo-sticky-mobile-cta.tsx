"use client";

import { AppStoreBadgeLink } from "@/components/blou/app-store-badge";

type Props = {
  href: string;
  /** Analytics placement id (include `_sticky_mobile` in the string if you want that suffix). */
  placement: string;
};

export function SeoStickyMobileAppCta({ href, placement }: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-7xl justify-center px-4 py-3.5 pb-[max(0.875rem,env(safe-area-inset-bottom))]">
        <AppStoreBadgeLink href={href} placement={placement} height={56} />
      </div>
    </div>
  );
}
