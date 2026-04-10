import { CodeBlock } from "@/components/docs/CodeBlock";

export function Middleware() {
  return (
    <section id="middleware" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Middleware & Proxy</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX uses a unified Proxy layer to consolidate security, authentication, and traffic control into a single high-performance middleware.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Edge Security Logic</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Everything starts in <code className="text-emerald-300">src/proxy.ts</code>. This file wraps the Clerk middleware and adds a custom security layer that executes before the request even reaches your Next.js pages.
          </p>
          
          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">1. Clerk Auth Integration</h4>
              <p className="text-zinc-500 text-[13px] mb-4">Ensures that <code className="text-white">/dashboard</code> and <code className="text-white">/admin</code> are gated, while public routes remain fast and accessible.</p>
            </div>
            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">2. IP-Based Throttling</h4>
              <p className="text-zinc-500 text-[13px] mb-4">Matches the client IP and applies a dual-limit strategy:</p>
              <ul className="space-y-2 text-[13px] text-zinc-400 font-mono">
                <li>• Sensitive (/sign-in, /sign-up, /api/auth): 5 req / 15 mins</li>
                <li>• Public (All others): 120 req / 1 min</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Custom Configuration</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            You can customize which routes are considered "sensitive" by updating the <code className="text-white">sensitivePaths</code> Set in <code className="text-emerald-300">src/proxy.ts</code>.
          </p>
          <CodeBlock language="typescript">{`const sensitivePaths = new Set([
  "/sign-in", 
  "/sign-up", 
  "/api/auth",
  "/api/newsletter/subscribe" // Add your own here
]);`}</CodeBlock>
        </div>

        <div className="p-6 rounded-2xl bg-blue-500/[0.03] border border-blue-500/20">
          <h4 className="text-blue-400 font-semibold mb-2">Advanced Headers</h4>
          <p className="text-zinc-400 text-[14px] leading-relaxed">
            The proxy automatically injects <code className="text-white">X-RateLimit-Remaining</code> and <code className="text-white">X-RateLimit-Reset</code> headers into every response. You can use these in your frontend to show proactive warnings to users who are hitting their limits.
          </p>
        </div>
      </div>
    </section>
  );
}
