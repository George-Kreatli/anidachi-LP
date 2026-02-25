import { NavBar } from "@/components/nav-bar";
import { Hero } from "@/components/hero";
import { MainAppFeatures } from "@/components/main-app-features";
import { ChromeExtensionFeatures } from "@/components/chrome-extension-features";
import { ChromeExtensionDemo } from "@/components/chrome-extension-demo";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavBar />
      <Hero />
      <ChromeExtensionDemo />
      <MainAppFeatures />
      <ChromeExtensionFeatures />
      <Pricing />
      <Footer />
    </main>
  );
}
