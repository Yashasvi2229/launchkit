import { CodeBlock } from "@/components/docs/CodeBlock";

function Heading2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-[24px] font-semibold text-white mb-4 mt-16 scroll-mt-20 border-b border-white/[0.06] pb-4 first:mt-0">
      {children}
    </h3>
  );
}

export function Architecture() {
  return (
    <section id="architecture" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Project Architecture</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX uses a layered architecture focused on type safety, predictable logic boundaries, and maintainable context for AI-assisted development.
        </p>
      </div>

      <div className="space-y-12">
        {/* Layered View */}
        <div className="relative rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.01]">
           <div className="p-6">
              <CodeBlock language="text" plain>
{`src/
├── app/                   # Next.js App Router (Layouts, Pages, Server Components)
├── components/            # Reusable UI & Atomic Parts (Tailwind + DaisyUI)
├── config/                # Central App Control (Global configuration constants)
├── lib/                   # Stateless SDKs (Stripe, Resend, Supabase init)
├── server/                # Critical Logic (State-modifying functions, SQL builders)
└── types/                 # Database & App-wide TypeScript Interfaces

supabase/
└── migrations/            # SQL source of truth (Policies, Triggers, Views)

.mex/                      # AI Context Scaffold (Memory for Agents)
.cursorrules               # System prompt for IDE (Rule enforcement)
CLAUDE.md                  # Workflow & Tech Map (Context loading)`}
              </CodeBlock>
           </div>
        </div>

        {/* Directory Deep-Dive */}
        <div>
          <Heading2 id="folder-roles">Directory Roles</Heading2>
          <div className="space-y-8">
            {[
              {
                name: "src/server/",
                desc: "Contains state-changing business logic. Keep mutations here so behavior stays consistent across webhooks, scheduled jobs, and user actions.",
                color: "text-blue-400"
              },
              {
                name: "src/app/",
                desc: "Handles routing, rendering, and data loading boundaries. Keep this layer focused on presentation and access orchestration.",
                color: "text-emerald-400"
              },
              {
                name: "supabase/migrations/",
                desc: "Defines schema, policies, and SQL-based constraints. Use migrations as the source of truth across local and production environments.",
                color: "text-red-400"
              }
            ].map((layer) => (
              <div key={layer.name}>
                <h4 className={`font-mono text-[16px] font-semibold mb-2 ${layer.color}`}>{layer.name}</h4>
                <p className="text-zinc-500 text-[13px] leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Control Plane */}
        <div>
          <Heading2 id="ai-context">The AI Control Plane</Heading2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            These root-level files define repository context rules used by AI coding tools.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
              <h5 className="text-white font-medium mb-2">.cursorrules</h5>
              <p className="text-zinc-500 text-[13px] leading-relaxed">
                Defines coding constraints such as fetch boundaries, naming conventions, and component expectations.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01]">
              <h5 className="text-white font-medium mb-2">CLAUDE.md</h5>
              <p className="text-zinc-500 text-[13px] leading-relaxed">
                Maps helper modules in <code className="text-white">src/lib</code> and documents repeatable implementation patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-600/10 to-transparent border border-emerald-500/20 shadow-[0_20px_50px_rgba(16,185,129,0.05)]">
           <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <div>
              <h4 className="text-emerald-400 font-semibold mb-2">Security First</h4>
              <p className="text-zinc-400 text-[14px] leading-relaxed">
                Auth and authorization are enforced with database policies (RLS), so data access remains restricted even if a client request path is bypassed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
