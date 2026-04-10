import { CodeBlock } from "@/components/docs/CodeBlock";

export function Emails() {
  return (
    <section id="emails" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Email Architecture</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          A flexible, provider-agnostic email layer that handles everything from magic links to event-driven notification workflows.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Multi-Provider Support</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            LaunchX supports Resend and Mailgun through one email abstraction. Switch providers with environment configuration.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <h4 className="text-white font-medium mb-1 uppercase text-[12px] tracking-wider text-emerald-400">Resend (Default)</h4>
              <p className="text-zinc-500 text-[13px]">Default provider with straightforward setup for transactional delivery.</p>
            </div>
            <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <h4 className="text-white font-medium mb-1 uppercase text-[12px] tracking-wider text-emerald-400">Mailgun</h4>
              <p className="text-zinc-500 text-[13px]">Alternative provider for teams with existing Mailgun infrastructure.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Sending Transactional Emails</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            All outgoing emails should use the <code className="text-emerald-300">sendTransactionalEmail()</code> wrapper in <code className="text-emerald-300">src/lib/email.ts</code>. This ensures consistent error handling and provider fallback.
          </p>
          <CodeBlock language="typescript">{`import { sendTransactionalEmail } from "@/lib/email";

await sendTransactionalEmail({
  to: "user@example.com",
  subject: "Welcome to LaunchX!",
  html: "<h1>Let's build something great</h1>",
  text: "Welcome to Launchkit. Let's build something great."
});`}</CodeBlock>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20">
          <h4 className="text-emerald-400 font-semibold mb-2">React Email Templates</h4>
          <p className="text-zinc-400 text-[14px] leading-relaxed">
            You can send raw HTML, but templates in <code className="text-emerald-300">src/lib/email-templates.ts</code> provide consistent rendering across major email clients.
          </p>
        </div>
      </div>
    </section>
  );
}
