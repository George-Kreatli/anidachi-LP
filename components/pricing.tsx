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
import { Check, Star, Zap, Shield } from "lucide-react";

export function Pricing() {
  const handleSubscribe = async (priceId: string) => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const plans = [
    {
      name: "Crunchyroll Subscriber",
      price: "$8",
      period: "/month",
      description: "Perfect for existing Crunchyroll subscribers",
      priceId: "price_1RlnY7AGc1Bd58Cjo5BJckhN",
      popular: true,
      savings: "Save $4/month",
      features: [
        "Unlimited watchrooms",
        "Real-time chat and discussions",
        "Chrome extension access",
        "Cross-platform sync",
        "Watch history tracking",
        "Priority support",
      ],
    },
    {
      name: "Anime Junkie",
      price: "$38",
      period: "/month",
      description: "Complete anime streaming and social experience",
      priceId: "price_1RlnYtAGc1Bd58CjCLqrUG43",
      popular: false,
      savings: "Everything included",
      features: [
        "Everything in Crunchyroll Subscriber",
        "Built-in anime streaming",
        "Premium anime library access",
        "HD/4K streaming quality",
        "Offline viewing",
        "Early access to new features",
      ],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Special Launch Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Adventure
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Start your 7-day free trial. No credit card required. Cancel
            anytime.
          </p>

          {/* Trust indicators */}
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Secure payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Instant access</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 transition-all duration-300 hover:shadow-2xl ${
                plan.popular
                  ? "border-purple-500 shadow-xl scale-105 bg-gradient-to-br from-purple-50 to-white"
                  : "border-gray-200 hover:border-purple-300 bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 text-sm font-semibold">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <div className="mb-4">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {plan.savings}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1 text-lg">
                    {plan.period}
                  </span>
                </div>
                <CardDescription className="text-gray-600 text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4">
                  <Button
                    className={`w-full py-4 text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                    onClick={() => handleSubscribe(plan.priceId)}
                  >
                    Start Free Trial
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    7-day free trial • No credit card required
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Preview */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Questions? We&apos;ve got answers.
          </p>
          <Button
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            View FAQ
          </Button>
        </div>
      </div>
    </section>
  );
}
