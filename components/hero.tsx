"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Users, MessageCircle, Chrome } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/gtag";
import { trackConversion } from "@/lib/conversion-events";

export function Hero() {
  useEffect(() => {
    trackConversion("cta_impression", {
      page_path: "/",
      page_template: "home",
      placement: "hero",
      cta_variant: "hero_start_paid_plan",
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 text-white">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-purple-300/20 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="absolute inset-0 bg-black/20" />
      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Watch Anime Together
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Transform your solo anime sessions into{" "}
            <span className="text-white font-semibold">shared adventures</span>.
            Create watchrooms, sync Crunchyroll playback with friends, chat in
            real-time, and track your progress — even when you watch at different
            times.
          </p>
          <p className="text-sm text-purple-200 mb-8 max-w-2xl mx-auto">
            AniDachi (アニ友) — &quot;anime friend&quot; in Japanese. Built for
            anime fans who want to share every episode, reaction, and theory
            with their crew.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link
                href="#pricing"
                onClick={() =>
                  trackConversion("cta_click", {
                    page_path: "/",
                    page_template: "home",
                    placement: "hero",
                    cta_variant: "hero_start_paid_plan",
                  })
                }
              >
                <Play className="mr-2 h-5 w-5" aria-hidden="true" />
                Start paid plan
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-700 px-8 py-4 text-lg font-semibold bg-transparent backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <a
                href="#how-it-works"
                onClick={() =>
                  trackEvent("extension_clicked", { cta: "hero_extension" })
                }
              >
                <Chrome className="mr-2 h-5 w-5" aria-hidden="true" />
                See How It Works
              </a>
            </Button>
          </div>

          <p className="text-xs text-purple-200/95 mb-6 max-w-md mx-auto">
            Early access from $8/mo — secure Stripe checkout. Everyone keeps
            their own Crunchyroll login; AniDachi is the watchroom layer.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-purple-200 mb-10">
            <span>Works with Crunchyroll</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>No ads</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Cancel &amp; refund anytime</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <Users className="h-6 w-6 text-purple-200" aria-hidden="true" />
              <span className="text-sm font-medium">Crunchyroll Detection</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <MessageCircle className="h-6 w-6 text-purple-200" aria-hidden="true" />
              <span className="text-sm font-medium">Real-time Chat</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg">
              <Play className="h-6 w-6 text-purple-200" aria-hidden="true" />
              <span className="text-sm font-medium">Perfect Sync</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
