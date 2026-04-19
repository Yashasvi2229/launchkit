import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | LaunchX",
  description: "Terms of Service for LaunchX — production-ready Next.js templates.",
};

export default function TermsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-semibold mb-2">Terms and Conditions</h1>
        <p className="text-zinc-500 text-[14px] mb-12">Last Updated: April 19, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed text-zinc-400">
          <section>
            <h2 className="text-white font-medium text-lg mb-3">1. Agreement to Terms</h2>
            <p>
              By completing a purchase or accessing LaunchX, you enter into a legally binding contract. You represent that you are at least 18 years of age and possess the legal authority to bind yourself or your entity to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">2. Digital Nature and Delivery</h2>
            <p>
              LaunchX is a digital software boilerplate delivered via invitation to a private GitHub Organization repository. All transactions are processed by Dodo Payments, our authorized Merchant of Record. Dodo Payments is the legal seller for tax and invoicing purposes, while LaunchX remains the provider of the intellectual property and technical support.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">3. Refund and Statutory Withdrawal Policy</h2>
            <p className="mb-3">
              Due to the immediate access nature of digital goods, all sales are final once access to the GitHub repository has been granted. You may request a refund within seventy-two (72) hours of purchase only if you have not yet accepted the GitHub invitation or accessed the source code.
            </p>
            <p>
              Pursuant to international consumer rights standards, you hereby provide express prior consent to the immediate performance of this contract and acknowledge that you waive your statutory 14-day right of withdrawal once delivery begins.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">4. Quality Rights</h2>
            <p>
              If the digital content is technically faulty, you are entitled to a repair or replacement as required by applicable consumer laws. Refunds for &quot;change of mind&quot; are strictly excluded once performance begins.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">5. Use Restrictions</h2>
            <p>
              You are strictly prohibited from redistributing, sublicensing, or reselling the boilerplate as a standalone product. You may not use the architectural logic to create a competing boilerplate service or remove any proprietary notices.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, LaunchX&apos;s liability is limited to the amount paid for the software. We are not liable for indirect, incidental, or consequential damages arising from your use of the boilerplate or any downtime of third-party platforms like GitHub.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">7. Governing Law and Jurisdiction</h2>
            <p>
              This Agreement is governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Delhi, India. LaunchX reserves the right to seek injunctive relief in any court of competent jurisdiction to protect its intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">8. Contact</h2>
            <p>
              Questions about these terms? Reach out at{" "}
              <a href="mailto:thedakshjaitly@gmail.com" className="text-white underline underline-offset-4 hover:text-zinc-300 transition-colors">
                thedakshjaitly@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
