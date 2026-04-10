import Link from "next/link";
import type { Metadata } from "next";
import { milestones, symptoms } from "@/lib/blou-seo-data";
import { buildMetadata } from "@/lib/blou-seo";

export const metadata: Metadata = buildMetadata({
  title: "Quit Smoking Guides and Timelines",
  description:
    "Browse quit smoking milestone guides, symptom timelines, and tools to track progress and savings.",
  pathname: "/quit-smoking",
});

export default function QuitSmokingHubPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">Quit Smoking Guides</h1>
      <p className="mt-3 text-stone-700">
        Explore milestone timelines and withdrawal symptom pages, then use tools to keep your
        progress moving forward.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-stone-900">Milestones</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {milestones.map((item) => (
            <li key={item.slug} className="rounded-lg border border-stone-200 p-4">
              <Link className="font-medium text-teal-700 hover:underline" href={`/quit-smoking/${item.slug}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">Symptoms</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {symptoms.map((item) => (
            <li key={item.slug} className="rounded-lg border border-stone-200 p-4">
              <Link className="font-medium text-teal-700 hover:underline" href={`/quit-smoking/${item.slug}`}>
                How long does {item.symptom} last when quitting smoking?
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
