import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/Anidachi_logo.png"
                alt="AniDachi Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AniDachi
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The ultimate platform for watching anime together. Create
              watchrooms, chat in real-time, and share your anime journey with
              friends.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quit smoking (Bloü)</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/quit-smoking" className="hover:text-white transition-colors">
                  Guides &amp; timelines
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-white transition-colors">
                  All tools
                </Link>
              </li>
              <li>
                <Link href="/tools/money-calculator" className="hover:text-white transition-colors">
                  Money saved calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/lung-recovery-timeline"
                  className="hover:text-white transition-colors"
                >
                  Lung recovery timeline
                </Link>
              </li>
              <li className="pt-1 text-xs uppercase tracking-wide text-gray-500">
                Calculators by country
              </li>
              <li>
                <Link
                  href="/quit-smoking-calculator/united-states"
                  className="hover:text-white transition-colors"
                >
                  United States
                </Link>
              </li>
              <li>
                <Link
                  href="/quit-smoking-calculator/united-kingdom"
                  className="hover:text-white transition-colors"
                >
                  United Kingdom
                </Link>
              </li>
              <li>
                <Link
                  href="/quit-smoking-calculator/australia"
                  className="hover:text-white transition-colors"
                >
                  Australia
                </Link>
              </li>
              <li>
                <Link href="/quit-smoking-calculator/vietnam" className="hover:text-white transition-colors">
                  Vietnam
                </Link>
              </li>
              <li>
                <Link href="/quit-smoking-calculator/indonesia" className="hover:text-white transition-colors">
                  Indonesia
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blou" className="hover:text-white transition-colors">
                  Bloü
                </Link>
              </li>
              <li>
                <Link href="/blou/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/blou/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:goshan.tolochko@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AniDachi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
