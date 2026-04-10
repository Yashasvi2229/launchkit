import Link from "next/link";
import { CodeBlock } from "@/components/docs/CodeBlock";

export function StyleGuide() {
  return (
    <section id="style-guide" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Internal Style Guide</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX ships with a curated library of 25+ atomic UI components, designed for consistency and speed.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Previewing Components</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            You can view every component in action at the live showcase route: <Link href="/style" className="text-emerald-400 hover:underline">/style</Link>. This page demonstrates all states (hover, loading, disabled) and various theme variations.
          </p>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Core Component Categories</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-medium mb-3 text-[14px] uppercase tracking-wider text-emerald-400">Feedback & Status</h4>
              <ul className="space-y-3 text-[14px] text-zinc-400">
                <li><strong className="text-zinc-200">Alert</strong> — Standard informational/error banners.</li>
                <li><strong className="text-zinc-200">Badge</strong> — Compact status labels (Pro, Trial, Active).</li>
                <li><strong className="text-zinc-200">Progress</strong> — Minimal horizontal progress bars.</li>
                <li><strong className="text-zinc-200">Skeleton</strong> — Ghost loading states for dashboard metrics.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3 text-[14px] uppercase tracking-wider text-blue-400">Navigation & Hierarchy</h4>
              <ul className="space-y-3 text-[14px] text-zinc-400">
                <li><strong className="text-zinc-200">Breadcrumb</strong> — Page path indicators.</li>
                <li><strong className="text-zinc-200">Steps</strong> — Multi-stage onboarding flows.</li>
                <li><strong className="text-zinc-200">Timeline</strong> — Sequential event logging.</li>
                <li><strong className="text-zinc-200">Tabs</strong> — Toggled category navigation.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Usage Example: Stat</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            The <code className="text-emerald-300">Stat</code> component is used heavily in the dashboard and admin panel to highlight KPIs.
          </p>
          <CodeBlock language="typescript">{`import Stat from "@/components/ui/stat";

<Stat 
  label="Active users" 
  value="1.4k" 
  description="+12% this week" 
/>`}</CodeBlock>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-500/[0.03] border border-white/[0.06]">
          <h4 className="text-white font-semibold mb-2">Philosophy</h4>
          <p className="text-zinc-400 text-[14px] leading-relaxed">
            All components are built using <strong>Vanilla Tailwind CSS</strong> and DaisyUI utility classes. We avoid complex CSS-in-JS libraries to ensure zero runtime overhead and maximum portability.
          </p>
        </div>
      </div>
    </section>
  );
}
