import { CodeBlock } from "@/components/docs/CodeBlock";

export function CrispChat() {
  return (
    <section id="crisp-chat" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Crisp Chat Widget</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          Engage with your customers in real-time using our pre-integrated Crisp support widget.
        </p>
      </div>

      <div className="space-y-16">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Activation Logic</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            The widget is managed by the <code className="text-emerald-400">src/components/ui/crisp-chat.tsx</code> component. It automatically loads the Crisp script and handles visibility based on your account settings.
          </p>
          
          <div className="p-1 rounded-2xl bg-zinc-900/50 border border-white/[0.06]">
            <CodeBlock language="typescript">{`// src/config/config.ts
export const config = {
  crisp: {
    id: "YOUR_CRISP_ID_HERE", 
    onlyShowOnRoutes: ["/pricing", "/support"] // Optional whitelist
  }
};`}</CodeBlock>
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6 flex items-center gap-3">
             <span className="w-2 h-6 bg-emerald-500 rounded-full" />
             How it Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
                <h4 className="text-white text-[14px] font-medium mb-2">Automatic Injection</h4>
                <p className="text-zinc-500 text-[12px] leading-relaxed">The script is injected into the document head only once when the first client-side render occurs.</p>
             </div>
             <div className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
                <h4 className="text-white text-[14px] font-medium mb-2">Route Whitelisting</h4>
                <p className="text-zinc-500 text-[12px] leading-relaxed">Use <code className="text-emerald-300">onlyShowOnRoutes</code> to ensure the chat only appears on contextually relevant pages.</p>
             </div>
             <div className="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
                <h4 className="text-white text-[14px] font-medium mb-2">Lazy Loading</h4>
                <p className="text-zinc-500 text-[12px] leading-relaxed">The widget respects performance by rendering nothing if the ID is missing from your configuration.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
