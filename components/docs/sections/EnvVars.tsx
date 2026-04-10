import { CodeBlock } from "@/components/docs/CodeBlock";

export function EnvVars() {
  return (
    <section id="env-vars" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Environment Variables</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          Securely manage your API keys, secrets, and public configuration across production and development.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">The .env.local File</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            LaunchX uses a standard <code className="text-white">.env.local</code> file for local development. This file is ignored by Git to ensure your secrets never leak into your repository.
          </p>
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">Required Groups</h4>
            <ul className="space-y-4">
              <li>
                <div className="text-[13px] text-zinc-200 font-mono">NEXT_PUBLIC_CLERK_*</div>
                <p className="text-zinc-500 text-[12px]">Obtained from your Clerk Dashboard (Publishable + Secret Keys).</p>
              </li>
              <li>
                <div className="text-[13px] text-zinc-200 font-mono">NEXT_PUBLIC_SUPABASE_*</div>
                <p className="text-zinc-500 text-[12px]">Your project URL and Anon/Service Role keys from Supabase project settings.</p>
              </li>
              <li>
                <div className="text-[13px] text-zinc-200 font-mono">STRIPE_SECRET_KEY / WEBHOOK_SECRET</div>
                <p className="text-zinc-500 text-[12px]">Required for subscription syncing and secure payment processing.</p>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Type Safety with Zod</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            LaunchX validates environment variables at runtime. Missing keys fail fast with explicit messages from the schema parser.
          </p>
          <CodeBlock language="typescript">{`// This logic is handled in src/lib/env.ts
export function getServerEnv() {
  return serverSchema.parse(process.env); // Throws descriptive error if invalid
}`}</CodeBlock>
        </div>

        <div className="p-6 rounded-2xl bg-amber-500/[0.03] border border-amber-500/20">
          <h3 className="text-amber-400 font-semibold mb-2">Public vs Private</h3>
          <p className="text-zinc-400 text-[14px] leading-relaxed">
            Variable names with the <code className="text-white">NEXT_PUBLIC_</code> prefix are accessible to the browser. Variables without this prefix are strictly hidden and only accessible to server-side code (API routes, Server components).
          </p>
        </div>
      </div>
    </section>
  );
}
