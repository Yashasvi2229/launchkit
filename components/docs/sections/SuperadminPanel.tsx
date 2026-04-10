import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePanel } from "./shared/DocImagePanel";

export function SuperadminPanel() {
  return (
    <section id="superadmin-panel" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Superadmin Engine</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          Central control surface for platform oversight. Managed via the <code className="text-emerald-400">/admin</code> route with server-enforced access control.
        </p>
      </div>

      <div className="space-y-16">
        {/* Access Control */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6 flex items-center gap-3">
             <span className="w-2 h-6 bg-emerald-500 rounded-full" />
             The requireAdmin Protocol
          </h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            Admin access is not determined by routes alone. LaunchX uses a server-side guard that verifies the <code className="text-white">is_admin</code> flag against the Supabase source of truth before any data is rendered.
          </p>
          
          <div className="p-1 rounded-2xl bg-zinc-900/50 border border-white/[0.06]">
            <CodeBlock language="typescript" filename="src/lib/admin.ts">{`export async function requireAdmin(): Promise<AdminUser> {
  const authUserId = await getAuthUserId();
  if (!authUserId) redirect("/sign-in");

  const supabase = createAdminClient();
  const { data: user } = await supabase
    .from("users")
    .select("is_admin")
    .eq("clerk_id", authUserId)
    .single();

  if (!user?.is_admin) redirect("/dashboard");
  return user as AdminUser;
}`}</CodeBlock>
          </div>

          <div className="mt-10">
            <DocImagePanel
              src="/docs/images/superadmin.png"
              alt="LaunchX Superadmin Interface"
              title="Admin Overview"
              caption="Admin panels remain server-guarded and should never rely on client-only checks."
            />
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Engine Capabilities</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "User Impersonation", desc: "View the dashboard exactly as a specific user sees it to debug issues." },
              { title: "Subscription Overrides", desc: "Manually grant Life-time access or extend trials for enterprise leads." },
              { title: "Platform Metrics", desc: "Real-time visibility into MRR, Churn, and Active User counts." },
              { title: "Global Broadcast", desc: "Send platform-wide notifications or maintenance alerts." }
            ].map(item => (
              <div key={item.title} className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.01]">
                <h4 className="text-white font-medium text-[14px] mb-1">{item.title}</h4>
                <p className="text-zinc-500 text-[12px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promotion Strategy */}
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-zinc-800 to-transparent border border-white/[0.05]">
          <h3 className="text-white font-semibold mb-4 text-[16px]">Granting Admin Privileges</h3>
          <p className="text-zinc-400 text-[14px] leading-relaxed mb-6">
            For security reasons, there is no "Make Admin" button in the UI. Admins must be promoted directly in the Supabase Dashboard by setting the <code className="text-white">is_admin</code> column to <code className="text-emerald-400">true</code>.
          </p>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[13px]">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
             Never allow public signup to the /admin route. Ensure your Middleware protects this path globally.
          </div>
        </div>
      </div>
    </section>
  );
}
