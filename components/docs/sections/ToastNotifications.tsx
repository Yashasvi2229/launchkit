import { CodeBlock } from "@/components/docs/CodeBlock";

export function ToastNotifications() {
  return (
    <section id="toast-notifications" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Toast Notifications</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          A built-in notification system designed for real-time feedback without interrupting the user flow.
        </p>
      </div>

      <div className="space-y-16">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6 flex items-center gap-3">
             <span className="w-2 h-6 bg-emerald-500 rounded-full" />
             Technical Implementation
          </h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            Unlike heavy external libraries, the template uses a specialized <code className="text-emerald-400">Toast</code> component located in <code className="text-white">src/components/ui/toast.tsx</code>. It integrates directly with DaisyUI's alert system for consistent styling.
          </p>
          
          <div className="p-1 rounded-2xl bg-zinc-900/50 border border-white/[0.06]">
            <CodeBlock language="typescript">{`import Toast from "@/components/ui/toast";

<Toast 
  message="Profile updated successfully!" 
  tone="success" 
  onDismiss={() => {}} 
/>`}</CodeBlock>
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Tone Options</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            The notification system supports four semantic tones that map to DaisyUI states:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { tone: "success", color: "text-emerald-400" },
              { tone: "error", color: "text-red-400" },
              { tone: "info", color: "text-blue-400" },
              { tone: "warning", color: "text-amber-400" }
            ].map(item => (
              <div key={item.tone} className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.01] text-center">
                <code className={`block ${item.color} font-bold mb-2`}>{item.tone}</code>
                <span className="text-[11px] text-zinc-500 uppercase tracking-tighter">DaisyUI Alert</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
