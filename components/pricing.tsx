"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Shield, Clock } from "lucide-react";

export function Pricing() {
  const handleSubscribe = async (priceId: string) => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "subscribe_click", { price_id: priceId });
    }
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" aria-hidden="true" />
            Early Access Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Start Watching Together
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Join as a founding member and lock in early-access pricing. Full
            refund guaranteed if you change your mind.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" aria-hidden="true" />
              <span>Secure payments via Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" aria-hidden="true" />
              <span>Cancel &amp; refund anytime</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {/* Active Plan — Crunchyroll Subscriber */}
          <Card className="relative border-2 border-purple-500 shadow-xl scale-105 bg-gradient-to-br from-purple-50 to-white transition-all duration-300 hover:shadow-2xl px-6 py-8">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-sm font-semibold">
                <Star className="w-3 h-3 mr-1" aria-hidden="true" />
                Most Popular
              </Badge>
            </div>

            <CardHeader className="text-center pt-6 pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Crunchyroll Subscriber
              </CardTitle>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-5xl font-bold text-gray-900">$8</span>
                <span className="text-gray-600 ml-1 text-lg">/month</span>
              </div>
              <CardDescription className="text-gray-600 text-base">
                For anime fans who already have Crunchyroll
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 px-6 pb-6">
              <ul className="space-y-2 mb-4">
                {[
                  "Unlimited watchrooms",
                  "Real-time chat & discussions",
                  "Chrome extension access",
                  "Cross-device playback sync",
                  "Watch history & progress tracking",
                  "Priority support",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button
                  className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => handleSubscribe("price_1RlnY7AGc1Bd58Cjo5BJckhN")}
                >
                  Subscribe Now
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Refundable &bull; Cancel anytime
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon — Anime Junkie */}
          <Card className="relative border-2 border-gray-200 bg-white transition-all duration-300 hover:shadow-xl px-6 py-8 opacity-90">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-amber-100 text-amber-800 px-6 py-2 text-sm font-semibold">
                <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                Coming Soon
              </Badge>
            </div>

            <CardHeader className="text-center pt-6 pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Anime Junkie
              </CardTitle>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-5xl font-bold text-gray-400">$38</span>
                <span className="text-gray-400 ml-1 text-lg">/month</span>
              </div>
              <CardDescription className="text-gray-600 text-base">
                The all-in-one anime streaming &amp; social experience
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 px-6 pb-6">
              <ul className="space-y-2 mb-4">
                {[
                  "Everything in Crunchyroll Subscriber",
                  "Built-in anime streaming (planned)",
                  "Premium anime library access (planned)",
                  "HD/4K streaming quality (planned)",
                  "Offline viewing (planned)",
                  "Early access to new features",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                        feature.includes("(planned)") ? "text-gray-300" : "text-green-500"
                      }`}
                      aria-hidden="true"
                    />
                    <span className={`text-sm ${feature.includes("(planned)") ? "text-gray-400" : "text-gray-700"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Button
                  className="w-full py-4 text-lg font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </Button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  We&apos;ll notify you when this tier launches
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
