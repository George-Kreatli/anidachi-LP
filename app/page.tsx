import { Hero } from "@/components/hero";
import { MainAppFeatures } from "@/components/main-app-features";
import { ChromeExtensionFeatures } from "@/components/chrome-extension-features";
import { ChromeExtensionDemo } from "@/components/chrome-extension-demo";
import { HowItWorks, howToSteps } from "@/components/how-it-works";
import { CompareTable } from "@/components/compare-table";
import { FAQSection } from "@/components/faq-section";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";
import {
  SoftwareApplicationJsonLd,
  FAQPageJsonLd,
  HowToJsonLd,
} from "@/components/json-ld";
import { homeFAQ } from "@/lib/home-faq";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Hero />
      <HowItWorks />
      <ChromeExtensionDemo />
      <MainAppFeatures />
      <ChromeExtensionFeatures />
      <CompareTable />
      <FAQSection questions={homeFAQ} />
      <Pricing />
      <Footer />

      <SoftwareApplicationJsonLd />
      <FAQPageJsonLd questions={homeFAQ} />
      <HowToJsonLd
        name="How to Watch Anime Together with AniDachi"
        description="Set up shared anime watchrooms on Crunchyroll in 5 easy steps."
        steps={howToSteps}
      />
    </main>
  );
}
