import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePanel } from "./shared/DocImagePanel";

export function SettingsProfile() {
  return (
    <section id="settings-profile" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Settings & Profiles</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          Comprehensive user profile management with high-performance reactive forms and data validation.
        </p>
      </div>

      <div className="space-y-12">
        <DocImagePanel
          src="/docs/images/settings.png"
          alt="LaunchX Settings Interface"
          title="Profile and Account Settings"
          caption="Settings keeps profile edits and account-risk actions in clearly separated blocks."
        />

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Reactive Form Pattern</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Settings forms use a headless form pattern with Zod validation. Changes can be persisted through autosave or explicit submit actions.
          </p>
          <CodeBlock language="typescript">{`// src/components/dashboard/settings-form.tsx
const updateProfile = async (data: ProfileData) => {
  setIsLoading(true);
  const res = await fetch("/api/user/update", {
    method: "POST",
    body: JSON.stringify(data),
  });
  setIsLoading(false);
  if (res.ok) toast.success("Profile saved!");
};`}</CodeBlock>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Danger Zone</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Critical actions like account deletion are gated by confirmation dialogs. See <code className="text-emerald-300">src/components/dashboard/delete-account-modal.tsx</code>.
          </p>
          <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/[0.04]">
            <h4 className="text-red-400 font-semibold mb-2 text-[14px]">Security Note</h4>
            <p className="text-zinc-400 text-[13px] leading-relaxed">
              When a user deletes their account, we trigger a cleanup job that safely removes their data from Supabase and cancels their active Stripe subscription automatically via a background webhook.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
