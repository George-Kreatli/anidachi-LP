"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/components/blou/analytics";

const milestones = [
  { day: 1, label: "24 hours", detail: "Carbon monoxide drops and oxygen improves." },
  { day: 2, label: "48 hours", detail: "Taste and smell can begin improving." },
  { day: 7, label: "1 week", detail: "Many cravings become less intense than day 1." },
  { day: 14, label: "2 weeks", detail: "Circulation and breathing comfort may improve." },
  { day: 30, label: "1 month", detail: "Daily movement can feel easier with reduced irritation." },
  { day: 365, label: "1 year", detail: "Sustained progress supports long-term heart health trends." },
];

export function LungRecoveryVisualizer() {
  const [daysSmokeFree, setDaysSmokeFree] = useState(14);

  const reached = useMemo(
    () => milestones.filter((item) => item.day <= daysSmokeFree),
    [daysSmokeFree]
  );

  return (
    <section className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-stone-900">Lung Recovery Timeline Visualizer</h2>
      <p className="mt-2 text-sm text-stone-600">
        Enter smoke-free days and see your recovery milestones.
      </p>

      <label className="mt-6 block text-sm text-stone-700">
        Days smoke-free
        <input
          className="mt-2 w-full rounded-md border border-stone-300 p-2"
          type="number"
          min={1}
          value={daysSmokeFree}
          onChange={(event) => setDaysSmokeFree(Number(event.target.value))}
        />
      </label>

      <ol className="mt-6 space-y-3">
        {milestones.map((item) => {
          const active = item.day <= daysSmokeFree;
          return (
            <li
              key={item.day}
              className={`rounded-lg border p-3 ${
                active ? "border-teal-300 bg-teal-50" : "border-stone-200 bg-stone-50"
              }`}
            >
              <p className="text-sm font-semibold text-stone-900">{item.label}</p>
              <p className="text-sm text-stone-600">{item.detail}</p>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        className="mt-4 text-sm text-teal-700 underline underline-offset-4"
        onClick={() =>
          trackEvent("blou_calculator_engagement", {
            tool: "lung_recovery_timeline",
            days_smoke_free: daysSmokeFree,
            milestones_reached: reached.length,
          })
        }
      >
        Save timeline progress
      </button>
    </section>
  );
}
