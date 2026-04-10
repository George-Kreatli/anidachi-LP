export type Milestone = {
  slug: string;
  label: string;
  daysSmokeFree: number;
  title: string;
  description: string;
  /** Answer-first paragraph for AEO (plain language, direct answer). */
  bluf: string;
  /** ISO date for Article dateModified and sitemap lastmod. */
  updatedAt: string;
  /** Extra unique copy for the first body section (YMYL depth). */
  uniqueLead: string;
  bodyChanges: string[];
  faq: { question: string; answer: string }[];
};

export type Symptom = {
  slug: string;
  symptom: string;
  typicalDuration: string;
  whyItHappens: string;
  bluf: string;
  updatedAt: string;
  commonTriggers: string[];
  whenToSeekCare: string;
  reliefTips: string[];
  relatedMilestoneSlug: string;
  faq: { question: string; answer: string }[];
};

export type CountryCalculator = {
  slug: string;
  country: string;
  currency: string;
  averagePackPrice: number;
  updatedAt: string;
};

/** Inline citation targets (NHS / CDC / WHO public pages). */
export const citationUrls = {
  nhsQuitSmoking: "https://www.nhs.uk/better-health/quit-smoking/",
  cdcBenefitsOfQuitting: "https://www.cdc.gov/tobacco/about/benefits-of-quitting.html",
  cdcQuitSmokingIndex: "https://www.cdc.gov/tobacco/quit_smoking/index.htm",
  whoTobaccoFactSheet: "https://www.who.int/news-room/fact-sheets/detail/tobacco",
} as const;

export const milestones: Milestone[] = [
  {
    slug: "what-happens-after-1-day",
    label: "1 day",
    daysSmokeFree: 1,
    title: "What happens to your body after 1 day without smoking",
    description:
      "After 1 day smoke-free, carbon monoxide drops and oxygen delivery improves for many people. Expect cravings in waves—each wave is often short even when it feels intense.",
    bluf:
      "After your first 24 hours without cigarettes, many people start to see early recovery signals such as lower blood carbon monoxide and improved oxygen delivery, while nicotine withdrawal can still trigger strong but usually brief cravings. Timelines vary by person, smoking history, and overall health.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "The first day is less about feeling “fixed” and more about your body beginning to climb out of constant smoke exposure. Public health summaries describe early cardiovascular and respiratory benefits after quitting; see the CDC’s benefits of quitting overview for the full picture.",
    bodyChanges: [
      "Carbon monoxide in blood drops significantly.",
      "Blood oxygen begins normalizing for better circulation.",
      "Cravings may spike in short waves throughout the day.",
    ],
    faq: [
      { question: "Is day 1 the hardest day to quit smoking?", answer: "For many people, day 1 feels intense because routines are still tied to smoking. The difficulty is normal and temporary." },
      { question: "How often do cravings happen in the first 24 hours?", answer: "Cravings often come in short bursts. Most episodes peak quickly and pass within minutes." },
    ],
  },
  {
    slug: "what-happens-after-3-days",
    label: "3 days",
    daysSmokeFree: 3,
    title: "What happens to your body after 3 days without smoking",
    description:
      "By day 3, nicotine is largely cleared for many people and withdrawal symptoms may feel strongest. Irritability, headaches, and cravings are common—and often begin to ease afterward.",
    bluf:
      "Around three days without smoking, nicotine levels are typically much lower than while smoking, and some people experience a peak in withdrawal discomfort (mood, sleep, cravings) before it gradually improves. Your timeline may differ based on how much and how long you smoked.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "Day three is frequently described as a rough patch because your nervous system is recalibrating without steady nicotine. NHS stop-smoking guidance emphasizes that withdrawal is temporary and that support strategies can reduce relapse risk during spikes.",
    bodyChanges: [
      "Nicotine levels are greatly reduced from baseline.",
      "Taste and smell sensitivity may improve.",
      "Withdrawal intensity can peak before easing.",
    ],
    faq: [
      { question: "Why do I feel worse on day 3?", answer: "Day 3 can coincide with peak nicotine withdrawal. Feeling irritable or foggy can be part of this short phase." },
      { question: "Will cravings decrease after day 3?", answer: "Many people notice a gradual decrease in craving frequency and intensity after this point." },
    ],
  },
  {
    slug: "what-happens-after-1-week",
    label: "1 week",
    daysSmokeFree: 7,
    title: "What happens to your body after 1 week without smoking",
    description:
      "One week smoke-free: breathing and circulation often feel a bit easier, and cravings may show up more around habits than all day long. Keep simple routines for triggers.",
    bluf:
      "At one week without cigarettes, many people notice early improvements in breathing comfort and circulation, while cravings often shift toward situational triggers rather than constant background urges. Not everyone feels the same pace of change.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "Seven days is a meaningful behavioral milestone: you have proof you can navigate multiple high-risk routines without smoking. WHO tobacco resources summarize how quitting reduces exposure to harmful smoke constituents over time.",
    bodyChanges: [
      "Lung irritation starts reducing as airways calm.",
      "Resting heart rate may feel more stable.",
      "Cravings become more cue-based than constant.",
    ],
    faq: [
      { question: "Is one week smoke-free a major milestone?", answer: "Yes. One week is a key behavioral and physiological milestone in early quit recovery." },
      { question: "Why do cravings still appear after a week?", answer: "Habit cues remain even as nicotine withdrawal improves. Triggers need retraining over time." },
    ],
  },
  {
    slug: "what-happens-after-2-weeks",
    label: "2 weeks",
    daysSmokeFree: 14,
    title: "What happens to your body after 2 weeks without smoking",
    description:
      "Two weeks in, exercise tolerance and day-to-day stamina often improve slightly, and airway irritation may be trending down. Cough can fluctuate while lungs clear mucus.",
    bluf:
      "After about two weeks smoke-free, many people notice better circulation and slightly easier physical activity, while coughing can come and go as airways clear. Individual variation is normal.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "If you are adding light activity, track effort level weekly rather than daily—noise is normal. CDC materials on quitting describe continued health gains across the first weeks and months after stopping smoking.",
    bodyChanges: [
      "Circulation continues improving in daily movement.",
      "Coughing can fluctuate as lungs clear irritants.",
      "Exercise may feel easier for many people.",
    ],
    faq: [
      { question: "Can lungs improve after just two weeks?", answer: "Yes, early functional improvements can begin within weeks, even though full recovery takes longer." },
      { question: "Is coughing normal at 2 weeks smoke-free?", answer: "It can be normal while cilia recover and clear mucus and particles." },
    ],
  },
  {
    slug: "what-happens-after-1-month",
    label: "1 month",
    daysSmokeFree: 30,
    title: "What happens to your body after 1 month without smoking",
    description:
      "One month without smoking: lung irritation often continues to ease, sleep may stabilize, and trigger skills feel more repeatable. Pair milestones with a savings plan.",
    bluf:
      "At one month smoke-free, many people report easier breathing during daily activities, more stable sleep patterns for some, and stronger confidence in handling triggers. Your experience may differ, especially if you have chronic lung disease.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "Use this milestone to tighten your relapse-prevention plan: identify the top three situations where you almost slipped, and pre-decide a two-minute action for each. NHS quit-smoking pages emphasize planning and support as core tools.",
    bodyChanges: [
      "Breathing often feels less tight during activity.",
      "Sleep quality may improve as nicotine disruption decreases.",
      "Trigger response patterns are easier to manage with routines.",
    ],
    faq: [
      { question: "How much healthier am I after one month?", answer: "Meaningful progress is common by one month, especially in breathing comfort and daily stamina." },
      { question: "Can relapse still happen at one month?", answer: "Yes. Keeping support tools and trigger plans active remains important." },
    ],
  },
  {
    slug: "what-happens-after-3-months",
    label: "3 months",
    daysSmokeFree: 90,
    title: "What happens to your body after 3 months without smoking",
    description:
      "Three months smoke-free: lung function trends may continue to improve, and cravings are often less frequent than early quit weeks. Identity as a non-smoker strengthens.",
    bluf:
      "By three months without cigarettes, respiratory symptoms and exercise tolerance often continue improving for many people, and cravings may be noticeably less frequent—though situational urges can still appear.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "Quarterly milestones are a good moment to review finances and health together: cumulative savings reinforce motivation, while steady routines reduce cue-driven slips. See CDC’s benefits timeline framing for long-horizon perspective.",
    bodyChanges: [
      "Lung function trends can improve further with sustained abstinence.",
      "Stress-response habits begin shifting away from smoking cues.",
      "Savings and smoke-free streak momentum strengthen commitment.",
    ],
    faq: [
      { question: "Do cravings disappear by 3 months?", answer: "Some cravings may remain, but frequency and intensity are often much lower than early quit stages." },
      { question: "What helps maintain progress after 3 months?", answer: "Consistent routines, stress tools, and visible progress tracking reduce relapse risk." },
    ],
  },
  {
    slug: "what-happens-after-6-months",
    label: "6 months",
    daysSmokeFree: 180,
    title: "What happens to your body after 6 months without smoking",
    description:
      "Six months in, daily breathing comfort and stamina are often improved versus smoking baseline. Occasional urges may still appear in old routines or stress.",
    bluf:
      "After six months smoke-free, many people experience more stable breathing day to day and better endurance for routine activity, while occasional urges can still occur during stress or familiar cues.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "If urges feel “random,” they are often tied to subtle cues (coffee, driving, end-of-work). WHO highlights continued health gains after quitting; pair that knowledge with a cue audit every few months.",
    bodyChanges: [
      "Daily respiratory comfort often improves versus baseline.",
      "Physical endurance may continue increasing.",
      "The non-smoker identity becomes more stable.",
    ],
    faq: [
      { question: "Is 6 months smoke-free a stable point?", answer: "It is a major stability milestone, though support systems are still useful for long-term maintenance." },
      { question: "Why do occasional urges still happen?", answer: "Contextual memory can trigger urges, especially in old routines or stress situations." },
    ],
  },
  {
    slug: "what-happens-after-1-year",
    label: "1 year",
    daysSmokeFree: 365,
    title: "What happens to your body after 1 year without smoking",
    description:
      "One year without cigarettes: cardiovascular and respiratory risk trends often improve with sustained abstinence. Celebrate the streak and keep a simple maintenance plan.",
    bluf:
      "One year after quitting, sustained abstinence is associated with meaningful long-term health benefits for many people, including improved cardiovascular risk trends and reduced ongoing lung irritation compared with continued smoking.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "A full year is also a behavioral dataset: you know which seasons, social settings, and emotions correlate with risk. CDC quit resources reinforce combining behavioral strategies with clinical support when needed.",
    bodyChanges: [
      "Cardiovascular risk profile generally improves over sustained abstinence.",
      "Airway inflammation typically remains lower than smoking baseline.",
      "Relapse likelihood can be reduced with strong habits.",
    ],
    faq: [
      { question: "How big is one year without smoking?", answer: "It is one of the strongest long-term milestones and often reflects a durable behavior change." },
      { question: "Should I still track milestones after one year?", answer: "Yes. Continued tracking reinforces identity and helps sustain motivation." },
    ],
  },
  {
    slug: "what-happens-after-5-years",
    label: "5 years",
    daysSmokeFree: 1825,
    title: "What happens to your body after 5 years without smoking",
    description:
      "Five years smoke-free: long-run benefits continue to compound. Triggers are usually weaker, but a simple safety plan still helps during major life stress.",
    bluf:
      "After five years without smoking, many people maintain improved respiratory comfort and cardiovascular health trajectories compared with continued smoking, with weaker day-to-day smoking triggers for most.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "Long-horizon quitting is as much about identity maintenance as biology: keep one supportive ritual (check-in, walk, journaling) that you can scale up during stress. NHS guidance frames quitting as one of the best health decisions you can make.",
    bodyChanges: [
      "Long-term cardiovascular and respiratory trends may continue improving.",
      "Behavioral triggers are usually far less dominant.",
      "Cumulative money saved becomes a meaningful life gain.",
    ],
    faq: [
      { question: "Can health keep improving years after quitting?", answer: "Yes, long-term trajectories can continue improving with ongoing smoke-free living." },
      { question: "How do I avoid late relapse?", answer: "Stay aware of high-risk stress periods and keep a simple relapse-prevention plan." },
    ],
  },
  {
    slug: "what-happens-after-10-years",
    label: "10 years",
    daysSmokeFree: 3650,
    title: "What happens to your body after 10 years without smoking",
    description:
      "Ten years without cigarettes: cumulative health and financial upside is large for many people. Stay alert during rare high-risk periods, even after long success.",
    bluf:
      "Ten years after quitting, many people continue to experience durable benefits compared with continued smoking, including better long-term respiratory and cardiovascular outlooks for many individuals, alongside substantial cumulative savings.",
    updatedAt: "2026-04-10",
    uniqueLead:
      "Decade milestones are a good moment to mentor someone else quitting: teaching your playbook reinforces your own habits. WHO tobacco fact sheets summarize population-level harms of smoking and benefits of quitting.",
    bodyChanges: [
      "Sustained abstinence supports better long-run health outcomes.",
      "Breathing and physical activity can remain more resilient.",
      "The financial upside compounds substantially over a decade.",
    ],
    faq: [
      { question: "Is there still benefit after 10 years?", answer: "Yes. Long-term smoke-free living compounds both health and financial benefits." },
      { question: "Should I still celebrate quit milestones?", answer: "Absolutely. Milestone rituals help maintain identity and motivation." },
    ],
  },
];

export const symptoms: Symptom[] = [
  {
    slug: "cravings",
    symptom: "cravings",
    typicalDuration: "2 to 8 weeks with declining intensity",
    whyItHappens:
      "Nicotine receptors and habit loops adapt after repeated exposure; when nicotine drops, your brain can send strong “seek cigarette” signals, especially around familiar cues.",
    bluf:
      "After quitting, cravings often last on the order of weeks for many people, with intensity usually decreasing over time; each craving episode is often short even when it feels powerful. Your pattern can vary with how much you smoked and your daily triggers.",
    updatedAt: "2026-04-10",
    commonTriggers: ["After meals", "With coffee or alcohol", "During stress or boredom"],
    whenToSeekCare:
      "Seek urgent help if urges coincide with self-harm thoughts, or speak to a clinician if cravings feel impossible to manage safely despite support.",
    reliefTips: [
      "Delay and breathe through the urge for 3–5 minutes.",
      "Drink water and change physical location.",
      "Use a pre-planned replacement routine after meals.",
    ],
    relatedMilestoneSlug: "what-happens-after-1-week",
    faq: [
      {
        question: "How long do nicotine cravings last after quitting smoking?",
        answer:
          "For many people, cravings persist for a few weeks and often become less frequent over time; individual episodes are commonly brief. If cravings feel unmanageable, use cessation support resources such as NHS quit smoking guidance.",
      },
      {
        question: "Do cravings ever fully stop?",
        answer:
          "They often become rare over time, especially when triggers are addressed consistently.",
      },
    ],
  },
  {
    slug: "cough",
    symptom: "cough",
    typicalDuration: "a few weeks to a few months",
    whyItHappens:
      "When smoke exposure stops, airways may produce more mucus temporarily as cilia and lung tissue recover—similar to “clearing out” irritants.",
    bluf:
      "A new or changing cough after quitting can last from a few weeks to a few months for some people as airways clear mucus and debris. Cough duration varies widely; seek care for red-flag symptoms.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Morning", "After lying down", "During physical activity"],
    whenToSeekCare:
      "See a clinician for coughing up blood, severe shortness of breath, high fever, unexplained weight loss, or symptoms that worsen instead of improving over time.",
    reliefTips: [
      "Hydrate regularly to thin mucus.",
      "Use humid air in dry environments.",
      "Track cough trend weekly rather than day-to-day noise.",
    ],
    relatedMilestoneSlug: "what-happens-after-2-weeks",
    faq: [
      {
        question: "How long does a cough last after quitting smoking?",
        answer:
          "Many people notice cough changes for weeks to a few months while airways clear; this is common for some, but not universal. Persistent or severe cough should be evaluated by a clinician.",
      },
      {
        question: "Is coughing normal after quitting smoking?",
        answer:
          "Yes, short-term cough can happen as lungs clear accumulated irritants for some quitters.",
      },
    ],
  },
  {
    slug: "insomnia",
    symptom: "insomnia",
    typicalDuration: "1 to 4 weeks for many people",
    whyItHappens:
      "Nicotine affects arousal and sleep timing; withdrawal can temporarily disrupt sleep depth and make it harder to fall or stay asleep.",
    bluf:
      "Sleep disruption after quitting often lasts about one to four weeks for many people, then tends to improve as withdrawal eases—not everyone follows the same timeline.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Late caffeine", "Irregular bedtimes", "Evening screen use"],
    whenToSeekCare:
      "Contact a clinician if insomnia is severe, lasts many weeks without improvement, or you have signs of sleep apnea or depression.",
    reliefTips: [
      "Keep consistent sleep and wake times.",
      "Avoid caffeine late in the day.",
      "Use a short wind-down routine before bedtime.",
    ],
    relatedMilestoneSlug: "what-happens-after-1-week",
    faq: [
      {
        question: "How long does insomnia last after quitting smoking?",
        answer:
          "Many people see sleep normalize within a few weeks after quitting, though temporary difficulty sleeping is common early on. If problems persist, seek medical advice.",
      },
      {
        question: "Will sleep return to normal?",
        answer:
          "In many cases, sleep quality improves gradually after the early withdrawal window.",
      },
    ],
  },
  {
    slug: "headaches",
    symptom: "headaches",
    typicalDuration: "days to a few weeks",
    whyItHappens:
      "Headaches can be triggered by withdrawal-related changes in blood flow, hydration, caffeine intake, and stress load during early quitting.",
    bluf:
      "Headaches after quitting often improve within days to a few weeks for many people, especially with hydration, regular meals, and sleep stability. Sudden severe headache needs urgent evaluation.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Caffeine changes", "Dehydration", "Screen strain and stress"],
    whenToSeekCare:
      "Seek urgent care for sudden “thunderclap” headache, neurological symptoms, fever with stiff neck, or headache after head injury.",
    reliefTips: [
      "Hydrate and eat regular meals.",
      "Practice short stress resets through breathwork.",
      "Limit screen strain during acute periods.",
    ],
    relatedMilestoneSlug: "what-happens-after-3-days",
    faq: [
      {
        question: "How long do headaches last after quitting smoking?",
        answer:
          "Headaches are common for some people in early withdrawal and often ease within days to a few weeks with hydration, sleep, and stress care.",
      },
      {
        question: "Are headaches common during nicotine withdrawal?",
        answer:
          "They can be common early on and usually improve as withdrawal settles.",
      },
    ],
  },
  {
    slug: "anxiety",
    symptom: "anxiety",
    typicalDuration: "2 to 6 weeks with variable intensity",
    whyItHappens:
      "Nicotine can mask stress signals; when it is removed, anxiety may feel more noticeable temporarily while your nervous system adapts.",
    bluf:
      "Anxiety can spike for some people in the first few weeks after quitting and often improves over roughly two to six weeks with coping support—not everyone experiences this pattern.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Work deadlines", "Social settings", "Caffeine and poor sleep"],
    whenToSeekCare:
      "Seek professional help if anxiety causes panic attacks, avoidance of daily activities, or thoughts of self-harm.",
    reliefTips: [
      "Use a simple 4-6 breathing pattern during spikes.",
      "Reduce high-stimulation triggers when possible.",
      "Schedule short movement breaks during stressful hours.",
    ],
    relatedMilestoneSlug: "what-happens-after-1-month",
    faq: [
      {
        question: "How long does anxiety last after quitting smoking?",
        answer:
          "Many people notice anxiety improves over a few weeks as withdrawal stabilizes, but timelines vary. If anxiety is severe or persistent, contact a healthcare professional.",
      },
      {
        question: "Does quitting smoking increase anxiety?",
        answer:
          "Temporary anxiety can increase during withdrawal, then improve with adaptation and coping routines.",
      },
    ],
  },
  {
    slug: "irritability",
    symptom: "irritability",
    typicalDuration: "1 to 4 weeks",
    whyItHappens:
      "Mood regulation systems adjust when nicotine stimulation drops, which can shorten patience during early quitting.",
    bluf:
      "Irritability commonly improves within about one to four weeks for many quitters as withdrawal eases, though stress and sleep can lengthen the window.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Sleep debt", "Hunger", "Interruptions at home or work"],
    whenToSeekCare:
      "Seek help if irritability escalates to aggression you cannot control or if you feel unsafe.",
    reliefTips: [
      "Give close contacts a short heads-up plan.",
      "Use 5-minute reset breaks before reacting.",
      "Stabilize meals and hydration through the day.",
    ],
    relatedMilestoneSlug: "what-happens-after-3-days",
    faq: [
      {
        question: "How long does irritability last after quitting smoking?",
        answer:
          "For many people, irritability is strongest in early withdrawal and often improves within a few weeks as the nervous system adapts.",
      },
      {
        question: "Why am I so irritable after quitting?",
        answer:
          "Mood swings are a known withdrawal effect while neurochemistry normalizes.",
      },
    ],
  },
  {
    slug: "weight-gain",
    symptom: "weight gain",
    typicalDuration: "most change appears in the first months",
    whyItHappens:
      "Nicotine can blunt appetite for some people; after quitting, appetite and reward eating can increase while routines are still forming.",
    bluf:
      "Weight changes, if they happen, often show up most in the first months after quitting, but gain is not inevitable and can be managed gradually without risking your quit.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Snacking instead of smoking", "Sugar-heavy comfort food", "Skipping meals"],
    whenToSeekCare:
      "Speak with a clinician if weight change is rapid, paired with edema, or if you have eating disorder concerns.",
    reliefTips: [
      "Plan high-protein snacks before cravings hit.",
      "Add short daily walks after meals.",
      "Track trend weekly, not daily.",
    ],
    relatedMilestoneSlug: "what-happens-after-3-months",
    faq: [
      {
        question: "How long does weight gain risk last after quitting smoking?",
        answer:
          "Most weight shifts, when they occur, cluster in the first months after quitting; long-term patterns depend on nutrition, activity, and support.",
      },
      {
        question: "Is weight gain inevitable after quitting?",
        answer:
          "Not inevitable, but some gain is common and can be managed with routine planning.",
      },
    ],
  },
  {
    slug: "brain-fog",
    symptom: "brain fog",
    typicalDuration: "days to several weeks",
    whyItHappens:
      "Attention and arousal systems adjust when nicotine is removed, which can feel like slower thinking or forgetfulness temporarily.",
    bluf:
      "Brain fog after quitting often lasts days to several weeks for many people and typically improves as sleep and withdrawal stabilize. If cognition is severely impaired, rule out other causes medically.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Sleep deprivation", "Multitasking", "High stress days"],
    whenToSeekCare:
      "Seek evaluation for sudden confusion, focal neurological deficits, or cognitive decline that is severe or progressive.",
    reliefTips: [
      "Work in short focused intervals.",
      "Sleep consistently and hydrate.",
      "Use light movement before cognitively demanding tasks.",
    ],
    relatedMilestoneSlug: "what-happens-after-1-week",
    faq: [
      {
        question: "How long does brain fog last after quitting smoking?",
        answer:
          "Many people notice clearer thinking within a few weeks, though early quit weeks can feel sluggish for some.",
      },
      {
        question: "Can I still work effectively with withdrawal fog?",
        answer:
          "Yes, with shorter focus blocks and predictable routines.",
      },
    ],
  },
  {
    slug: "fatigue",
    symptom: "fatigue",
    typicalDuration: "1 to 3 weeks commonly",
    whyItHappens:
      "Energy and stress systems recalibrate after nicotine withdrawal; poor sleep and stress can amplify tiredness.",
    bluf:
      "Fatigue commonly improves within about one to three weeks for many quitters, especially with consistent sleep and hydration. Prolonged exhaustion warrants medical review.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Poor sleep", "Low calorie intake", "Sedentary days"],
    whenToSeekCare:
      "See a clinician for fatigue with chest pain, fainting, severe shortness of breath, or symptoms lasting many weeks without improvement.",
    reliefTips: [
      "Get daylight exposure early in the day.",
      "Keep hydration and meal timing consistent.",
      "Use low-intensity exercise to rebuild energy.",
    ],
    relatedMilestoneSlug: "what-happens-after-2-weeks",
    faq: [
      {
        question: "How long does fatigue last after quitting smoking?",
        answer:
          "Short-term fatigue is common in early quitting for some people and often eases within a few weeks as routines stabilize.",
      },
      {
        question: "Is tiredness normal after quitting smoking?",
        answer:
          "Yes, short-term fatigue can occur during withdrawal and typically eases.",
      },
    ],
  },
  {
    slug: "shortness-of-breath",
    symptom: "shortness of breath",
    typicalDuration: "improves over weeks to months",
    whyItHappens:
      "Lungs and airways may undergo changes in inflammation and mucus clearance after quitting; exertional breathlessness can fluctuate during recovery.",
    bluf:
      "Breathlessness after quitting may fluctuate at first, but many people see gradual improvement over weeks to months depending on baseline lung health. Red-flag symptoms need prompt care.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Stairs and hills", "Cold air", "Respiratory infections"],
    whenToSeekCare:
      "Seek urgent care for severe breathlessness at rest, blue lips, chest pain, or fainting; schedule routine care if symptoms persist or worsen over weeks.",
    reliefTips: [
      "Use paced breathing during exertion.",
      "Increase activity gradually.",
      "Track weekly improvement in tolerance.",
    ],
    relatedMilestoneSlug: "what-happens-after-1-month",
    faq: [
      {
        question: "How long does shortness of breath last after quitting smoking?",
        answer:
          "Improvement timelines vary; some people notice gains over weeks, while others—especially with chronic lung disease—need clinician-guided monitoring.",
      },
      {
        question: "When should I get checked for breathlessness?",
        answer:
          "Seek medical review for persistent or worsening symptoms.",
      },
    ],
  },
  {
    slug: "mood-swings",
    symptom: "mood swings",
    typicalDuration: "2 to 6 weeks",
    whyItHappens:
      "Reward and stress regulation networks adjust after nicotine withdrawal, which can cause emotional ups and downs early on.",
    bluf:
      "Mood swings after quitting often settle over roughly two to six weeks for many people as withdrawal stabilizes; mental health symptoms that feel severe deserve professional support.",
    updatedAt: "2026-04-10",
    commonTriggers: ["Alcohol", "Sleep disruption", "Relationship conflict"],
    whenToSeekCare:
      "Seek urgent help for suicidal thoughts; contact a clinician for severe depression, mania, or mood symptoms that block daily life.",
    reliefTips: [
      "Use predictable daily routines.",
      "Limit alcohol during early quit weeks.",
      "Track triggers and high-risk times of day.",
    ],
    relatedMilestoneSlug: "what-happens-after-1-month",
    faq: [
      {
        question: "How long do mood swings last after quitting smoking?",
        answer:
          "Many people feel emotionally steadier within a few weeks, though variability is common early on; seek help if mood symptoms are severe.",
      },
      {
        question: "Are mood swings part of nicotine withdrawal?",
        answer:
          "Yes, emotional variability is common in early quit stages.",
      },
    ],
  },
];

export const countries: CountryCalculator[] = [
  { slug: "united-states", country: "United States", currency: "USD", averagePackPrice: 8.5, updatedAt: "2026-04-10" },
  { slug: "united-kingdom", country: "United Kingdom", currency: "GBP", averagePackPrice: 15, updatedAt: "2026-04-10" },
  { slug: "australia", country: "Australia", currency: "AUD", averagePackPrice: 40, updatedAt: "2026-04-10" },
  { slug: "vietnam", country: "Vietnam", currency: "VND", averagePackPrice: 26000, updatedAt: "2026-04-10" },
  { slug: "indonesia", country: "Indonesia", currency: "IDR", averagePackPrice: 32000, updatedAt: "2026-04-10" },
  { slug: "canada", country: "Canada", currency: "CAD", averagePackPrice: 18, updatedAt: "2026-04-10" },
  { slug: "new-zealand", country: "New Zealand", currency: "NZD", averagePackPrice: 38, updatedAt: "2026-04-10" },
  { slug: "germany", country: "Germany", currency: "EUR", averagePackPrice: 8.2, updatedAt: "2026-04-10" },
  { slug: "france", country: "France", currency: "EUR", averagePackPrice: 11.2, updatedAt: "2026-04-10" },
  { slug: "india", country: "India", currency: "INR", averagePackPrice: 220, updatedAt: "2026-04-10" },
];

export const healthSources = [
  { label: "NHS quit smoking support", href: citationUrls.nhsQuitSmoking },
  { label: "CDC benefits of quitting", href: citationUrls.cdcBenefitsOfQuitting },
  { label: "CDC quit smoking resources", href: citationUrls.cdcQuitSmokingIndex },
  { label: "WHO tobacco fact sheet", href: citationUrls.whoTobaccoFactSheet },
];
