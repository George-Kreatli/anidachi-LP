import type { Metadata } from "next";
import Link from "next/link";
import { requireBlouAccess } from "@/lib/blou-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms of Service — Bloü / AniDachi",
  description: "Terms of Service for the bloü app.",
};

export default async function TermsPage() {
  await requireBlouAccess("/blou/terms");

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="sticky top-14 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link
            href="/blou"
            className="text-lg font-semibold text-gray-800 transition-colors hover:text-purple-600"
          >
            Bloü
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/blou/privacy"
              className="text-sm text-gray-600 transition-colors hover:text-purple-600"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-10">
          Application: bloü · Effective date: 2026-02-14
        </p>
        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">
          <p>
            These terms of service (&quot;Terms&quot;) apply to the bloü app (the &quot;Application&quot;) for mobile devices, created by Heorhi Talochka (the &quot;Service Provider&quot;) as a commercial service.
          </p>
          <p>
            By downloading or using the Application, you agree to these Terms. Please read them carefully before using the Application.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">1. Acknowledgement</h2>
            <p>
              You and the Service Provider acknowledge that this agreement is concluded between you and the Service Provider only, and not with Apple Inc. (&quot;Apple&quot;). The Service Provider, not Apple, is solely responsible for the Application and the content thereof. These Terms may not provide for usage rules that conflict with the Apple Media Services Terms and Conditions as of the effective date (which the Service Provider acknowledges having had the opportunity to review).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">2. Scope of License</h2>
            <p>
              The license granted to you for the Application is limited to a non-transferable license to use the Application on any Apple-branded products that you own or control, as permitted by the Usage Rules set forth in the Apple Media Services Terms and Conditions. The Application may be accessed and used by other accounts associated with the purchaser via Family Sharing or volume purchasing as permitted by Apple.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">3. Intellectual Property</h2>
            <p className="mb-3">
              Unauthorized copying, modification of the Application, any part of the Application, or the Service Provider&apos;s trademarks is strictly prohibited. You may not extract the source code of the Application, translate the Application into other languages, or create derivative versions. All trademarks, copyrights, database rights, and other intellectual property rights related to the Application remain the property of the Service Provider.
            </p>
            <p>
              In the event of any third-party claim that the Application or your possession or use of the Application infringes that third party&apos;s intellectual property rights, the Service Provider, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">4. Changes to the Application and Charges</h2>
            <p>
              The Service Provider is dedicated to ensuring that the Application is as beneficial and efficient as possible. The Service Provider reserves the right to modify the Application or to charge for its services at any time and for any reason. Any charges for the Application or its services will be clearly communicated to you before they apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">5. Data and Device Security</h2>
            <p className="mb-3">
              The Application stores and processes personal data that you have provided to the Service Provider in order to provide the service. You are not required to create an account to use the Application. All data is stored locally on your device.
            </p>
            <p>
              It is your responsibility to maintain the security of your phone and access to the Application. The Service Provider strongly advises against jailbreaking or rooting your phone, which involves removing software restrictions and limitations imposed by the official operating system of your device. Such actions could expose your phone to malware, viruses, malicious programs, compromise your phone&apos;s security features, and may result in the Application not functioning correctly or at all.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">6. Disclaimers and Limitations of Responsibility</h2>
            <p className="mb-3">
              <strong>Internet and connectivity.</strong> Some functions of the Application require an active internet connection (Wi-Fi or mobile network). The Service Provider cannot be held responsible if the Application does not function at full capacity due to lack of access to Wi-Fi or if you have exhausted your data allowance.
            </p>
            <p className="mb-3">
              <strong>Carrier and data charges.</strong> If you use the Application outside a Wi-Fi area, your mobile network provider&apos;s agreement terms still apply. You may incur charges from your mobile provider for data usage, or other third-party charges. By using the Application, you accept responsibility for any such charges, including roaming data charges if you use the Application outside your home territory without disabling data roaming. If you are not the bill payer for the device, the Service Provider assumes that you have obtained permission from the bill payer.
            </p>
            <p className="mb-3">
              <strong>Device and usage.</strong> The Service Provider cannot always assume responsibility for your use of the Application. For example, it is your responsibility to ensure that your device remains charged. If your device runs out of battery and you are unable to access the service, the Service Provider cannot be held responsible.
            </p>
            <p className="mb-3">
              <strong>Third-party services.</strong> The Service Provider strives to keep the Application updated and accurate but relies on third parties to provide information and functionality. These include:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Apple App Store &amp; Analytics – for purchases and usage insights</li>
              <li>Superwall – to manage subscriptions</li>
              <li>Gemini API (Google) – to generate AI-altered images and AI-based quitting tips</li>
            </ul>
            <p className="mb-3">
              The Service Provider accepts no liability for any loss, direct or indirect, that you experience as a result of relying on this functionality.
            </p>
            <p>
              <strong>Product claims.</strong> You and the Service Provider acknowledge that the Service Provider, not Apple, is responsible for addressing any claims by you or any third party relating to the Application or your possession or use of the Application, including (i) product liability claims, (ii) any claim that the Application fails to conform to any applicable legal or regulatory requirement, and (iii) claims arising under consumer protection, privacy, or similar legislation. The Service Provider does not limit its liability to you beyond what is permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">7. Not Medical or Professional Advice</h2>
            <p>
              Application and all content provided through it—including tips, insights, weekly analyses, and any other text or features—are for general wellness and motivational support only. They do not constitute medical, psychological, or other professional health advice. Application is not a substitute for advice, diagnosis, or treatment from a qualified healthcare provider. If you have concerns about your physical or mental health, nicotine dependence, or quitting smoking, you should consult a doctor or other appropriate healthcare professional. Use of the app does not create a doctor–patient, therapist–client, or other professional relationship between you and the Application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">8. Artificial Intelligence</h2>
            <p>
              The Application incorporates artificial intelligence (AI) technologies to provide certain features or services. By using the Application, you acknowledge and agree that AI may be used to process data and deliver functionalities. The Service Provider ensures that all AI usage complies with applicable laws and is designed to benefit the user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">9. Subscription and Payment Terms</h2>
            <p className="mb-3">
              The Application is free to download. A paid subscription is required to access key features. Payments are processed through Apple&apos;s App Store.
            </p>
            <p>
              All purchases are final. The Service Provider does not offer refunds, except as required by applicable law or Apple&apos;s own policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">10. Warranty</h2>
            <p>
              The Service Provider is solely responsible for any product warranties, whether express or implied by law, to the extent not effectively disclaimed. In the event of any failure of the Application to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price for the Application to you. To the maximum extent permitted by applicable law, Apple will have no other warranty obligation with respect to the Application. Any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty are the sole responsibility of the Service Provider.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">11. Maintenance and Support</h2>
            <p>
              The Service Provider is solely responsible for providing any maintenance and support services with respect to the Application, as specified in these Terms or as required under applicable law. You and the Service Provider acknowledge that Apple has no obligation whatsoever to furnish any maintenance or support services with respect to the Application.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">12. Updates and Termination</h2>
            <p className="mb-3">
              The Service Provider may update the Application from time to time. The Application is currently available as per the requirements of the operating system (and for any additional systems the Service Provider may extend availability to). These requirements may change, and you may need to download updates to continue using the Application. The Service Provider does not guarantee that it will always update the Application so that it remains relevant to you or compatible with the particular operating system version installed on your device. You agree to accept updates to the Application when offered.
            </p>
            <p>
              The Service Provider may cease providing the Application and may terminate your right to use it at any time without notice. Unless the Service Provider informs you otherwise, upon any termination: (a) the rights and licenses granted to you in these Terms will end; (b) you must cease using the Application and, if necessary, delete it from your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">13. Legal Compliance</h2>
            <p>
              You represent and warrant that (i) you are not located in a country that is subject to a U.S. Government embargo or that has been designated by the U.S. Government as a &quot;terrorist supporting&quot; country, and (ii) you are not listed on any U.S. Government list of prohibited or restricted parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">14. Third-Party Terms</h2>
            <p>
              When using the Application, you must comply with all applicable third-party terms of agreement (for example, your wireless data service agreement when using the Application over a mobile network).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">15. Third-Party Beneficiary</h2>
            <p>
              You and the Service Provider acknowledge and agree that Apple, and Apple&apos;s subsidiaries, are third-party beneficiaries of these Terms. Upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as a third-party beneficiary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mt-10 mb-3">16. Developer Name and Address</h2>
            <p>
              For questions, complaints, or claims with respect to the Application, please contact:
            </p>
            <p className="mt-2">
              Heorhi Talochka
              <br />
              Email:{" "}
              <a href="mailto:hello.blou.app@gmail.com" className="text-purple-600 hover:underline">
                hello.blou.app@gmail.com
              </a>
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
