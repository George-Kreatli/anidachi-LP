import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Bloü / AniDachi",
  description: "Privacy Policy for the bloü app. How we collect and use your information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors"
          >
            AniDachi
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blou"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              Bloü
            </Link>
            <Link
              href="/blou/terms"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              Terms
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-10">
          Application: bloü · Effective date: 2026-02-14
        </p>
        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <p>
            This privacy policy applies to the bloü app (the &quot;Application&quot;) for mobile devices, created by Heorhi Talochka (the &quot;Service Provider&quot;) as a commercial service. This service is intended for use &quot;AS IS&quot;.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">Nature of the service</h2>
            <p>
              The Application is a general wellness and motivation app. The tips, insights, and other content it provides are for informational and motivational support only and are not medical or professional health advice. If you have health concerns or need support with quitting, you should consult a qualified healthcare provider. This policy describes how we collect and use data in providing that wellness support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">1. Information We Collect</h2>
            <p className="mb-3">
              The Application collects information when you download and use it. This information may include:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Your device&apos;s Internet Protocol address (e.g. IP address)</li>
              <li>The pages of the Application that you visit, the time and date of your visit, and the time spent on those pages</li>
              <li>The time spent on the Application overall</li>
              <li>The operating system you use on your mobile device</li>
              <li>Crash logs (via Apple&apos;s diagnostics tools)</li>
              <li>App usage data (via Apple and Superwall)</li>
            </ul>
            <p>
              The Application does not gather precise information about the location of your mobile device.
            </p>
            <p className="mt-3">
              For a better experience, the Service Provider may require you to provide certain personally identifiable information, including but not limited to: name, age range, sex, and face photos. The information that the Service Provider requests will be retained and used as described in this privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">2. How We Use Your Information</h2>
            <p>
              Information we collect is used to operate and improve the Application and the service. Personally identifiable information you provide is retained by the Service Provider and used as described in this privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">3. Third-Party Services</h2>
            <p className="mb-3">
              Only aggregated, anonymized data is periodically transmitted to external services to help the Service Provider improve the Application and the service. The Service Provider may share your information with third parties in the ways described in this privacy statement.
            </p>
            <p className="mb-2">The Application relies on the following third-party tools:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Apple App Store &amp; Analytics – for purchases and usage insights</li>
              <li>Superwall – to manage subscriptions</li>
              <li>Gemini API (Google) – to generate AI-altered images and AI-based quitting tips</li>
            </ul>
            <p>
              These providers may collect anonymized data according to their own privacy practices. No personally identifiable information is intentionally transmitted to them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">4. Use of Artificial Intelligence</h2>
            <p>
              The Application uses Artificial Intelligence (AI) technologies to enhance user experience and provide certain features. The AI components may process user data to deliver personalized content, recommendations, or automated functionalities. All AI processing is performed in accordance with this privacy policy and applicable laws. If you have questions about the AI features or data processing, please contact the Service Provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">5. Your Rights and Choices</h2>
            <p className="mb-3">
              <strong>Opt-out.</strong> You can stop all collection of information by the Application by uninstalling it. You may use the standard uninstall processes available as part of your mobile device or via the mobile application marketplace or network.
            </p>
            <p>
              <strong>Data deletion.</strong> If you would like the Service Provider to delete User Provided Data that you have provided via the Application, please contact them at{" "}
              <a href="mailto:hello.blou.app@gmail.com" className="text-purple-600 hover:underline">
                hello.blou.app@gmail.com
              </a>
              . They will respond within a reasonable time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">6. Data Retention</h2>
            <p>
              The Service Provider will retain User Provided Data for as long as you use the Application and for a reasonable time thereafter. For requests to delete User Provided Data, see section 5 above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">7. Children&apos;s Privacy</h2>
            <p className="mb-3">
              The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
            </p>
            <p className="mb-3">
              The Service Provider does not knowingly collect personally identifiable information from children. The Service Provider encourages children never to submit personally identifiable information through the Application and/or services. The Service Provider encourages parents and legal guardians to monitor their children&apos;s internet usage and to help enforce this policy by instructing their children never to provide personally identifiable information through the Application and/or services without permission.
            </p>
            <p className="mb-3">
              If you have reason to believe that a child has provided personally identifiable information to the Service Provider through the Application and/or services, please contact the Service Provider at{" "}
              <a href="mailto:hello.blou.app@gmail.com" className="text-purple-600 hover:underline">
                hello.blou.app@gmail.com
              </a>{" "}
              so that they can take the necessary actions.
            </p>
            <p>
              You must be at least 16 years of age to consent to the processing of your personally identifiable information in your country (in some countries the Service Provider may allow your parent or guardian to do so on your behalf).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">8. Security</h2>
            <p>
              The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect the information they process and maintain.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">9. Changes to This Privacy Policy</h2>
            <p>
              This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes; continued use of the Application is deemed approval of all changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">10. Your Consent</h2>
            <p>
              By using the Application, you consent to the processing of your information as set forth in this Privacy Policy now and as amended by the Service Provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">11. Contact Us</h2>
            <p>
              If you have any questions regarding privacy while using the Application, or about the practices described here, please contact the Service Provider via email at{" "}
              <a href="mailto:hello.blou.app@gmail.com" className="text-purple-600 hover:underline">
                hello.blou.app@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
        <p className="mt-12">
          <Link
            href="/blou"
            className="text-purple-600 hover:underline font-medium"
          >
            ← Back to Bloü
          </Link>
        </p>
      </div>
    </main>
  );
}
