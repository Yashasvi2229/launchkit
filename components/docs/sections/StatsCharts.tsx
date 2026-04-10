import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePanel } from "./shared/DocImagePanel";

export function StatsCharts() {
  return (
    <section id="stats-charts" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Success Metrics</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX provides built-in charting components to track your SaaS growth, MRR, and user activity in real-time.
        </p>
      </div>

      <div className="space-y-12">
        <DocImagePanel
          src="/docs/images/stats mrr.png"
          alt="LaunchX Stats & Charts"
          title="Metrics Dashboard"
          caption="KPI cards and trend charts are rendered from server-fetched data with client-side chart components."
        />

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">The StatCard Component</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Located in <code className="text-emerald-300">src/components/dashboard/stats-card.tsx</code>, this component handles trend indicators and formatting automatically.
          </p>
          <CodeBlock language="typescript">{`<StatCard 
  title="Monthly Recurring Revenue"
  value="$12,450"
  trend="+12%"
  description="vs last month"
/>`}</CodeBlock>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Dynamic Charting</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Recharts is used for growth visualization. Data is loaded server-side and passed into client chart components.
          </p>
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">Features</h4>
            <ul className="space-y-3 text-[14px] text-zinc-400 font-mono">
              <li>• Fully Responsive / Auto-scaling</li>
              <li>• Custom Tooltips & Grid Styling</li>
              <li>• Animated Path Transitions</li>
              <li>• Tailored for HSL Theme Variables</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
