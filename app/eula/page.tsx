import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EULA | LaunchX",
  description: "End-User License Agreement for LaunchX.",
};

export default function EulaPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-semibold mb-2">Software License Agreement (EULA)</h1>
        <p className="text-zinc-500 text-[14px] mb-12">License Type: Single-User / Business Proprietary License</p>

        <div className="space-y-10 text-[15px] leading-relaxed text-zinc-400">
          <section>
            <h2 className="text-white font-medium text-lg mb-3">1. Grant of License</h2>
            <p>
              LaunchX grants you a non-exclusive, non-transferable license to use the coding boilerplate to build unlimited end-user applications for personal or commercial use.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">2. Intellectual Property and AI Training</h2>
            <p>
              LaunchX retains all ownership of the source code and architectural logic. You are strictly prohibited from using the software, architecture, or logic for training, fine-tuning, or validating any Artificial Intelligence (AI) or machine learning models without prior written authorization.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">3. Export Controls</h2>
            <p>
              The Software is subject to international trade and export restrictions. You certify that you are not a restricted person under applicable trade sanctions and will not provide &quot;remote access&quot; to this software to any restricted foreign persons through cloud or network connections.
            </p>
          </section>

          <section>
            <h2 className="text-white font-medium text-lg mb-3">4. Termination</h2>
            <p>
              This license terminates automatically upon breach of these terms. Upon termination, LaunchX will revoke your GitHub access and you must immediately destroy all copies of the software in your possession.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
