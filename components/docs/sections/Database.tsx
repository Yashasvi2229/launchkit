import { CodeBlock } from "@/components/docs/CodeBlock";

function Heading2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="text-[21px] font-semibold text-white mb-4 mt-16 scroll-mt-20 border-b border-white/[0.06] pb-4 first:mt-0">
      {children}
    </h3>
  );
}

export function Database() {
  return (
    <section id="database" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Supabase & RLS</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-2xl">
          LaunchX uses Supabase with PostgreSQL and Row Level Security (RLS) for policy-driven data access control.
        </p>
      </div>

      <div className="space-y-12">
        {/* The Client Pattern */}
        <div>
          <Heading2 id="architecture-db">The Dual-Client Pattern</Heading2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            We separate database access into two distinct patterns to prevent "Privilege Escalation" — ensuring the UI only sees what it&apos;s allowed to see.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
              <h4 className="text-white font-semibold mb-2 text-[15px]">Browser Client</h4>
              <p className="text-zinc-500 text-[13px] leading-relaxed mb-4">Uses the Anon Key. Strictly governed by RLS. Safe for use in Client Components.</p>
              <CodeBlock language="typescript">{`const supabase = createBrowserClient();
const { data } = await supabase
  .from('profiles')
  .select('*');`}</CodeBlock>
            </div>

            <div className="p-6 rounded-2xl border border-red-500/10 bg-red-500/[0.02] hover:bg-red-500/[0.03] transition-colors">
              <h4 className="text-red-400 font-semibold mb-2 text-[15px]">Admin Engine</h4>
              <p className="text-zinc-500 text-[13px] leading-relaxed mb-4">Uses the Service Role Key and bypasses RLS. Restrict to server-side execution only.</p>
              <CodeBlock language="typescript">{`const admin = createAdminClient();
// System-level override
await admin.from('users')
  .update({ is_admin: true });`}</CodeBlock>
            </div>
          </div>
        </div>

        {/* Security Deep Dive */}
        <div>
          <Heading2 id="rls">RLS: The First Line of Defense</Heading2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Security policies are stored as SQL in <code className="text-white">supabase/migrations/</code>. This ensures that even if a hacker captures an API request, the database will reject the query if it doesn&apos;t match the owner.
          </p>
          
          <div className="p-1 rounded-2xl bg-[#0a0a0a] border border-white/[0.08]">
            <CodeBlock language="sql" filename="supabase/migrations/20240101_init.sql">{`-- Only the owner can view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = clerk_id);`}</CodeBlock>
          </div>
        </div>

        {/* Local Development */}
        <div>
          <Heading2 id="cli">The Migration Workflow</Heading2>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            LaunchX is built for professional workflows. Never edit tables in the Dashboard UI. Use the CLI to track changes.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { cmd: "npx supabase start", desc: "Start a local Postgres instance." },
              { cmd: "npx supabase db diff", desc: "Generate a new migration file." },
              { cmd: "npx supabase db push", desc: "Apply changes to production." }
            ].map(item => (
              <div key={item.cmd} className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                <code className="text-emerald-400 text-[12px] block mb-2">{item.cmd}</code>
                <p className="text-zinc-500 text-[11px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Type Generation */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20">
           <h4 className="text-blue-400 font-semibold mb-3">Strongly Typed Database</h4>
           <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">
             LaunchX includes a <code className="text-white">generate-types</code> script that introspects your Supabase schema and creates a <code className="text-white">src/types/database.ts</code> file. This gives you full Autocomplete and Type Safety across your entire data layer.
           </p>
           <CodeBlock language="bash" plain>{`npm run db:types`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
