"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/components/blou/analytics";

type Props = {
  defaultPackPrice?: number;
  currency?: string;
};

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "VND" || currency === "IDR" ? 0 : 2,
  }).format(value);
}

export function MoneyCalculator({ defaultPackPrice = 10, currency = "USD" }: Props) {
  const [cigarettesPerDay, setCigarettesPerDay] = useState(10);
  const [packPrice, setPackPrice] = useState(defaultPackPrice);
  const cigarettesPerPack = 20;

  const savings = useMemo(() => {
    const perDay = (cigarettesPerDay / cigarettesPerPack) * packPrice;
    return {
      week: perDay * 7,
      month: perDay * 30,
      year: perDay * 365,
      tenYears: perDay * 3650,
    };
  }, [cigarettesPerDay, packPrice]);

  return (
    <section className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-stone-900">Quit Smoking Money Saved Calculator</h2>
      <p className="mt-2 text-sm text-stone-600">
        Estimate how much money you keep by staying smoke-free.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="text-sm text-stone-700">
          Cigarettes per day
          <input
            className="mt-2 w-full rounded-md border border-stone-300 p-2"
            type="number"
            min={1}
            value={cigarettesPerDay}
            onChange={(event) => setCigarettesPerDay(Number(event.target.value))}
          />
        </label>
        <label className="text-sm text-stone-700">
          Pack price ({currency})
          <input
            className="mt-2 w-full rounded-md border border-stone-300 p-2"
            type="number"
            min={0}
            step="0.01"
            value={packPrice}
            onChange={(event) => setPackPrice(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ResultCard label="1 week" value={formatMoney(savings.week, currency)} />
        <ResultCard label="1 month" value={formatMoney(savings.month, currency)} />
        <ResultCard label="1 year" value={formatMoney(savings.year, currency)} />
        <ResultCard label="10 years" value={formatMoney(savings.tenYears, currency)} />
      </div>

      <button
        type="button"
        className="mt-4 text-sm text-teal-700 underline underline-offset-4"
        onClick={() =>
          trackEvent("blou_calculator_engagement", {
            tool: "money_calculator",
            cigarettes_per_day: cigarettesPerDay,
            pack_price: packPrice,
            currency,
          })
        }
      >
        Save these results
      </button>
    </section>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl bg-teal-50 p-4">
      <p className="text-xs uppercase tracking-wide text-teal-700">{label}</p>
      <p className="mt-2 text-xl font-semibold text-stone-900">{value}</p>
    </article>
  );
}
