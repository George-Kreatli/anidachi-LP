import dynamic from "next/dynamic";

export const MoneyCalculatorLazy = dynamic(
  () =>
    import("@/components/blou/money-calculator").then((m) => m.MoneyCalculator),
  {
    ssr: true,
    loading: () => (
      <div
        className="rounded-2xl border border-teal-100 bg-stone-50 p-8 text-center text-sm text-stone-500"
        role="status"
      >
        Loading calculator…
      </div>
    ),
  }
);
