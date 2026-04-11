import type { ReactNode } from "react";

export type TocItem = { id: string; label: string };

export function SeoTocMobile({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav
      className="mb-8 rounded-xl border border-stone-200 bg-stone-50/90 p-4 lg:hidden"
      aria-label="On this page"
    >
      <p className="mb-3 text-sm font-semibold text-stone-900">On this page</p>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="inline-block rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm text-teal-800 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SeoTocDesktop({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav className="hidden lg:block" aria-label="On this page">
      <div className="sticky top-24 border-l-2 border-teal-200 pl-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
          On this page
        </p>
        <ul className="space-y-2.5 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-stone-600 transition-colors hover:text-teal-700 hover:underline"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function SeoPageWithSidebar({
  tocItems,
  children,
  bottomPaddingForMobileCta,
}: {
  tocItems: TocItem[];
  children: ReactNode;
  bottomPaddingForMobileCta?: boolean;
}) {
  return (
    <div
      className={`mx-auto max-w-7xl px-4 py-10 lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] xl:grid-cols-[minmax(0,1fr)_15.5rem] lg:gap-10 xl:gap-14 ${bottomPaddingForMobileCta ? "pb-24 lg:pb-10" : ""}`}
    >
      <div className="min-w-0 max-w-4xl">
        <SeoTocMobile items={tocItems} />
        {children}
      </div>
      <aside className="hidden min-w-0 lg:block">
        <SeoTocDesktop items={tocItems} />
      </aside>
    </div>
  );
}
