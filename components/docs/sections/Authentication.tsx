import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePanel } from "./shared/DocImagePanel";

export function Authentication() {
  return (
    <section id="authentication" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 leading-tight text-center lg:text-left">Identity & Authentication</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX uses Clerk for identity and session management, with server-side linkage to application data in Supabase.
        </p>
      </div>

      <div className="space-y-16">
        {/* The Mirror Pattern */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6 flex items-center gap-3">
             <span className="w-2 h-6 bg-emerald-500 rounded-full" />
             The User Mirroring Pattern
          </h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            Identity data is managed in Clerk, while product data is stored in Supabase. A sync layer keeps these models aligned.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Sign Up", desc: "User registers via Clerk components or provider redirects." },
              { title: "Webhook", desc: "Clerk fires a 'user.created' event to your /api/webhooks/clerk route." },
              { title: "Database Sync", desc: "The server layer creates a shadow row in the Supabase 'users' table." }
            ].map((step, i) => (
              <div key={step.title} className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                <div className="text-emerald-500 font-mono text-[11px] mb-2">0{i+1}</div>
                <h4 className="text-white font-medium text-[14px] mb-2">{step.title}</h4>
                <p className="text-zinc-500 text-[12px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <DocImagePanel
              src="/docs/images/auth flow.png"
              alt="LaunchX Authentication Menu"
              title="Authenticated Session State"
              caption="Identity state is sourced from Clerk, while app-level permissions are evaluated server-side."
            />
          </div>
        </div>

        {/* Middleware Logic */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Edge-Level Protection</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            Routes are protected at the Edge to ensure zero-latency redirects for unauthenticated users.
          </p>
          <div className="p-1 rounded-2xl bg-[#0a0a0a] border border-white/[0.08]">
            <CodeBlock language="typescript" filename="middleware.ts">{`import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});`}</CodeBlock>
          </div>
        </div>

        {/* User Context */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Universal Auth Helpers</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Access the authenticated user safely across the entire stack using our standardized <code className="text-emerald-400">src/lib/auth.ts</code> helpers.
          </p>
          
          <div className="space-y-4">
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-900/50">
              <h4 className="text-white font-medium mb-3 text-[14px]">getAuthUserId()</h4>
              <p className="text-zinc-500 text-[12px] mb-4">Retrieves the Clerk ID from the current session. Fast and edge-compatible.</p>
              <CodeBlock language="typescript" plain>{`const userId = await getAuthUserId();`}</CodeBlock>
            </div>
            
            <div className="p-6 rounded-xl border border-white/[0.06] bg-zinc-900/50">
              <h4 className="text-white font-medium mb-3 text-[14px]">requireUser()</h4>
              <p className="text-zinc-500 text-[12px] mb-4">Enforces authentication and returns the full User Row from your database.</p>
              <CodeBlock language="typescript" plain>{`const user = await requireUser();
console.log(user.subscription_status);`}</CodeBlock>
            </div>
          </div>
        </div>

        {/* Footer Callout */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-600/10 to-transparent border border-emerald-500/20">
           <h4 className="text-emerald-400 font-semibold mb-2">Social Auth Ready</h4>
           <p className="text-zinc-400 text-[14px] leading-relaxed">
             Google, GitHub, and Magic Link can be enabled in Clerk. UI provider buttons follow your Clerk configuration.
           </p>
        </div>
      </div>
    </section>
  );
}
