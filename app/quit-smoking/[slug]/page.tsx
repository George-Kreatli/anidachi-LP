import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SeoPageShell } from "@/components/blou/seo-page-shell";
import { citationUrls, milestones, symptoms } from "@/lib/blou-seo-data";
import { sitePublishDate } from "@/lib/blou-seo-trust";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
} from "@/lib/blou-seo";

type Params = Promise<{ slug: string }>;

function cite({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <a
      className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

export function generateStaticParams() {
  return [...milestones.map((m) => ({ slug: m.slug })), ...symptoms.map((s) => ({ slug: s.slug }))];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const milestone = milestones.find((item) => item.slug === slug);
  if (milestone) {
    return buildMetadata({
      title: milestone.title,
      description: milestone.description,
      pathname: `/quit-smoking/${slug}`,
    });
  }

  const symptom = symptoms.find((item) => item.slug === slug);
  if (symptom) {
    const title = `How long does ${symptom.symptom} last when quitting smoking?`;
    return buildMetadata({
      title,
      description: `Typical duration: ${symptom.typicalDuration}. Relief tips, triggers, and when to see a clinician—plus tools to track your quit.`,
      pathname: `/quit-smoking/${slug}`,
    });
  }

  return {};
}

export default async function QuitSmokingSeoPage({ params }: { params: Params }) {
  const { slug } = await params;
  const milestone = milestones.find((item) => item.slug === slug);
  if (milestone) {
    const schema = [
      buildArticleSchema({
        title: milestone.title,
        description: milestone.description,
        pathname: `/quit-smoking/${slug}`,
        datePublished: sitePublishDate,
        dateModified: milestone.updatedAt,
      }),
      buildFaqSchema(milestone.faq),
      buildBreadcrumbSchema([
        { name: "Home", pathname: "/" },
        { name: "Quit Smoking", pathname: "/quit-smoking" },
        { name: milestone.label, pathname: `/quit-smoking/${slug}` },
      ]),
    ];

    return (
      <SeoPageShell
        title={milestone.title}
        description={milestone.description}
        bluf={milestone.bluf}
        sections={[
          {
            heading: "What your body is doing right now",
            body: (
              <>
                <p>
                  {milestone.uniqueLead} For a public-health overview of how quitting supports the
                  body over time, see {cite({ label: "CDC: Benefits of quitting smoking", href: citationUrls.cdcBenefitsOfQuitting })} and{" "}
                  {cite({ label: "NHS: Quit smoking", href: citationUrls.nhsQuitSmoking })}.
                </p>
                <p>
                  At {milestone.label} smoke-free, your body is actively adapting to lower nicotine
                  exposure and reduced smoke irritation. Recovery is rarely a straight line; some
                  symptoms improve quickly while others fluctuate. That variability is common and
                  does not automatically mean something is wrong.
                </p>
                <p>
                  {cite({ label: "WHO tobacco facts", href: citationUrls.whoTobaccoFactSheet })} summarize
                  why quitting reduces exposure to harmful smoke constituents; use them as a
                  complement—not a replacement—for advice from your clinician, especially if you
                  have heart or lung conditions.
                </p>
              </>
            ),
          },
          {
            heading: "How to stay on track through this stage",
            body: (
              <>
                <p>
                  <strong className="text-stone-900">Plan for triggers before they arrive.</strong>{" "}
                  Meals, commutes, alcohol, and stress are common cue clusters. Write a two-step
                  routine you can execute in under two minutes (stand up, drink water, text a
                  supporter, walk one block).
                </p>
                <p>
                  <strong className="text-stone-900">Interrupt urges early.</strong> Many urges peak
                  quickly. {cite({ label: "CDC quit smoking resources", href: citationUrls.cdcQuitSmokingIndex })} emphasize combining behavioral strategies with clinical support when needed.
                </p>
                <p>
                  Pair this page with the embedded calculator below to translate progress into a
                  concrete savings story—motivation often sticks better when it is measurable.
                </p>
              </>
            ),
          },
          {
            heading: "When this stage feels harder than expected",
            body: (
              <>
                <p>
                  Temporary discomfort does not mean you are failing. Withdrawal waves can
                  intensify before they settle. If symptoms are severe, atypical for you, or
                  include red flags like chest pain, fainting, or coughing blood, seek medical care.
                </p>
                <p>
                  If you are pregnant, living with cardiovascular disease, or managing a mental
                  health condition, involve your care team early—personalized guidance matters in
                  YMYL topics.
                </p>
              </>
            ),
          },
        ]}
        listItems={milestone.bodyChanges}
        faq={milestone.faq}
        relatedLinks={[
          { href: "/tools/money-calculator", label: "Quit Smoking Money Saved Calculator" },
          { href: "/tools/lung-recovery-timeline", label: "Lung Recovery Timeline Visualizer" },
          { href: "/quit-smoking/cravings", label: "How long do cravings last when quitting smoking?" },
          { href: "/quit-smoking/cough", label: "How long does cough last when quitting smoking?" },
        ]}
        campaign={`milestone_${milestone.slug}`}
        schema={schema}
      />
    );
  }

  const symptom = symptoms.find((item) => item.slug === slug);
  if (!symptom) {
    notFound();
  }

  const symptomTitle = `How long does ${symptom.symptom} last when quitting smoking?`;
  const symptomDescription = `${symptom.symptom} after quitting smoking often follows a typical range (${symptom.typicalDuration}), but timelines vary. Practical relief tips, triggers, and when to seek care below.`;

  const schema = [
    buildArticleSchema({
      title: symptomTitle,
      description: symptomDescription,
      pathname: `/quit-smoking/${slug}`,
      datePublished: sitePublishDate,
      dateModified: symptom.updatedAt,
    }),
    buildFaqSchema(symptom.faq),
    buildBreadcrumbSchema([
      { name: "Home", pathname: "/" },
      { name: "Quit Smoking", pathname: "/quit-smoking" },
      { name: symptom.symptom, pathname: `/quit-smoking/${slug}` },
    ]),
  ];

  return (
    <SeoPageShell
      title={symptomTitle}
      description={symptomDescription}
      bluf={symptom.bluf}
      extractFacts={[
        { label: "Typical duration (many people)", value: symptom.typicalDuration },
        { label: "Common triggers", value: symptom.commonTriggers.join("; ") },
        { label: "When to seek care", value: symptom.whenToSeekCare },
      ]}
      sections={[
        {
          heading: `Why ${symptom.symptom} happens after quitting`,
          body: (
            <>
              <p>{symptom.whyItHappens}</p>
              <p>
                For authoritative context on quitting and health effects, see{" "}
                {cite({ label: "CDC: Benefits of quitting", href: citationUrls.cdcBenefitsOfQuitting })},{" "}
                {cite({ label: "NHS: Quit smoking", href: citationUrls.nhsQuitSmoking })}, and{" "}
                {cite({ label: "WHO: Tobacco", href: citationUrls.whoTobaccoFactSheet })}.
              </p>
            </>
          ),
        },
        {
          heading: "What timeline is typical",
          body: (
            <>
              <p>
                <strong className="text-stone-900">Most people:</strong> {symptom.typicalDuration}.
                Personal timelines vary with smoking history, nicotine dependence, sleep, stress,
                caffeine, and general health.
              </p>
              <p>
                If your symptom is dramatically different from your past quit attempts or lasts
                beyond what feels reasonable for you, a clinician can help rule out non-quitting
                causes.
              </p>
            </>
          ),
        },
        {
          heading: "How to reduce intensity and avoid relapse",
          body: (
            <>
              <p>
                Treat symptom management as part of relapse prevention: short, repeatable actions
                beat “willpower only” on hard days. {cite({ label: "CDC quit smoking index", href: citationUrls.cdcQuitSmokingIndex })} lists evidence-based options to combine with behavioral plans.
              </p>
              <p>
                Use the tools on this page to anchor motivation: savings (calculator) and recovery
                framing (related links)—especially during high-risk evenings and weekends.
              </p>
            </>
          ),
        },
      ]}
      listItems={symptom.reliefTips}
      faq={symptom.faq}
      relatedLinks={[
        { href: `/quit-smoking/${symptom.relatedMilestoneSlug}`, label: "Related recovery milestone" },
        { href: "/tools/money-calculator", label: "Quit Smoking Money Saved Calculator" },
        { href: "/tools/lung-recovery-timeline", label: "Lung Recovery Timeline Visualizer" },
        { href: "/quit-smoking/what-happens-after-1-month", label: "What happens after 1 month without smoking?" },
      ]}
      campaign={`symptom_${symptom.slug}`}
      schema={schema}
    />
  );
}
