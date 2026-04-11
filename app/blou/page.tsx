import type { Metadata } from "next";
import Link from "next/link";
import { AppStoreBadgeLink } from "@/components/blou/app-store-badge";
import { requireBlouAccess } from "@/lib/blou-access";
import { appStoreUrlWithUtm } from "@/lib/blou-seo";
import { Camera, Wind, Heart, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bloü — Visual Quit Smoking Tracker",
  description:
    "Track your face timeline, test your healing lungs, and get instant support when cravings hit. See yourself glow up.",
  robots: { index: false, follow: false },
};

const FEATURES = [
  {
    icon: Camera,
    title: "Photo timeline",
    description: "Shows your real transformation over time—see your face change as you quit.",
  },
  {
    icon: Wind,
    title: "Lung capacity checks",
    description: "Simple breath checks that prove your body is healing.",
  },
  {
    icon: Heart,
    title: "SOS craving support",
    description: "Get instant help the second a craving hits.",
  },
  {
    icon: Sparkles,
    title: "Personal insights",
    description: "Powered by your actual progress—every milestone visualized, not just counted.",
  },
];

export default async function BlouPage() {
  await requireBlouAccess("/blou");

  return (
    <main className="min-h-screen bg-[#f0f7f4]">
      {/* Blou brand: soft teal/sage and sky, clean and calming */}
      <header className="sticky top-14 z-40 border-b border-teal-200/60 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/blou"
            className="text-lg font-semibold text-teal-800 transition-colors hover:text-teal-950"
          >
            Bloü
          </Link>
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href="/blou/privacy"
              className="text-sm text-stone-500 transition-colors hover:text-teal-600"
            >
              Privacy
            </Link>
            <Link
              href="/blou/terms"
              className="text-sm text-stone-500 transition-colors hover:text-teal-600"
            >
              Terms
            </Link>
            <Link
              href="/blou/manager"
              className="text-sm text-stone-500 transition-colors hover:text-teal-600"
            >
              Content Manager
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero — Blou visual branding: teal/sage gradient, soft and aspirational */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-[#e8f4f0] to-sky-100 text-stone-900">
        <div className="absolute inset-0">
          <div className="absolute top-24 left-16 w-40 h-40 bg-teal-300/25 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-20 w-56 h-56 bg-sky-300/20 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span className="text-teal-700">Bloü</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium text-teal-800/90 mb-3">
              Visual Quit Smoking Tracker
            </p>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Most quit apps just count days. Bloü shows you the{" "}
              <span className="font-semibold text-teal-800">visual transformation</span>.
              Track your face timeline, test your healing lungs, and get instant support when cravings hit.
            </p>
            <p className="text-xl text-stone-700 font-medium mb-8 max-w-xl mx-auto">
              Quitting smoking isn&apos;t about watching numbers go up. It&apos;s about{" "}
              <span className="text-teal-700 font-semibold">watching yourself glow up.</span>
            </p>
            <div className="flex justify-center">
              <AppStoreBadgeLink
                href={appStoreUrlWithUtm("landing_blou_hero")}
                placement="landing_blou_hero"
                height={64}
              />
            </div>
            <p className="mt-4 text-sm text-stone-500">
              Free · In-App Purchases · iPhone & iPad
            </p>
          </div>
        </div>
      </section>

      {/* What makes Bloü different */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 text-center mb-4">
            What makes Bloü different
          </h2>
          <p className="text-stone-600 text-center max-w-2xl mx-auto mb-16">
            Bloü gives you something other quit apps don&apos;t: <strong>proof</strong>.
            See your face change over time. Feel your lungs get stronger. Get instant help when you need it.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="p-6 rounded-2xl bg-[#f0f7f4] border border-teal-100 hover:border-teal-200 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-sky-50">
        <div className="container mx-auto px-4 text-center max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-stone-700 leading-relaxed">
            This isn&apos;t about guilt or tracking every slip. It&apos;s about seeing yourself become the person who doesn&apos;t smoke anymore. Your transformation is already starting. Let Bloü show you.
          </p>
          <div className="mt-10 flex justify-center">
            <AppStoreBadgeLink
              href={appStoreUrlWithUtm("landing_blou_philosophy")}
              placement="landing_blou_philosophy"
            />
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="py-8 border-t border-teal-100 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-stone-500">
          <p>
            Bloü requires an active subscription to access the app.{" "}
            <Link href="/blou/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>
            {" · "}
            <Link href="/blou/terms" className="text-teal-600 hover:underline">Terms of Service</Link>
          </p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-teal-600">
            <Link href="/quit-smoking" className="hover:underline">
              Guides &amp; timelines
            </Link>
            <span className="text-stone-300" aria-hidden>
              ·
            </span>
            <Link href="/tools/money-calculator" className="hover:underline">
              Money calculator
            </Link>
            <span className="text-stone-300" aria-hidden>
              ·
            </span>
            <Link href="/tools/lung-recovery-timeline" className="hover:underline">
              Lung recovery
            </Link>
          </p>
          <p className="mt-2">
            <Link href="/" className="text-teal-600 hover:underline">← Back to AniDachi</Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
