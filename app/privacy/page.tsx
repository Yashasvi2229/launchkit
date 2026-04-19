import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LaunchX",
  description: "Privacy Policy for LaunchX — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-semibold mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-[14px] mb-12">Last Updated: April 19, 2026</p>

        <div className="space-y-10 text-[15px] leading-relaxed text-zinc-400">
          <section>
            <h2 className="text-white font-medium text-lg mb-3">1. Data Management</h2>
            <p>
              LaunchX is responsible for managing your information. We utilize Dodo Payments for secure payment processing and GitHub for product delivery. We do not sell your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">2. Data We Collect</h2>
            <p>
              We collect your email address, GitHub username, and transaction metadata solely to fulfill the contract and prevent fraud.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">3. Data Security</h2>
            <p>
              We do not maintain user accounts on our website. We implement reasonable security safeguards to protect your metadata. All internal access to our delivery systems and payment dashboards is secured via Multi-Factor Authentication (MFA) and encryption to prevent unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">4. User Rights</h2>
            <p>
              We recognize your rights to access, correct, or request the deletion of your information under applicable data protection laws. We maintain internal protocols to ensure that data transferred across borders receives a high level of protection consistent with global standards.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">5. Contact</h2>
            <p>
              For privacy inquiries or to exercise your rights, please contact us at:{" "}
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
