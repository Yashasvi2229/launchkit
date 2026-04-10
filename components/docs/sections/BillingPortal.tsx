import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePanel } from "./shared/DocImagePanel";

export function BillingPortal() {
  return (
    <section id="billing-portal" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Billing & Subscriptions</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          Complete subscription life-cycle management including plan switching, invoicing, and secure payment method updates.
        </p>
      </div>

      <div className="space-y-12">
        <DocImagePanel
          src="/docs/images/billing.png"
          alt="LaunchX Billing Interface"
          title="Billing Overview"
          caption="Users can inspect plan status and open the payment portal without exposing billing logic in the client."
        />

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Plan Management</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Switching plans is handled via a secure server action that initiates a Stripe checkout session. Once paid, the subscription status is synced to your database via the Stripe Webhook handler.
          </p>
          <CodeBlock language="typescript">{`// src/server/subscriptions/upsert-subscription.ts
export async function upsertSubscription(data: SubscriptionData) {
  const admin = createAdminClient();
  const { error } = await admin
    .from('subscriptions')
    .upsert(data);
  
  if (error) throw error;
}`}</CodeBlock>

          <div className="mt-10">
            <DocImagePanel
              src="/docs/images/pricing.png"
              alt="LaunchX Pricing Plans"
              title="Pricing Matrix"
              caption="Plans map to provider price IDs and are reconciled by webhook events."
            />
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">The Billing Portal Link</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            You can generate a direct link for a user to access their hosted Stripe portal using the <code className="text-emerald-300">stripe.billingPortal.sessions.create</code> API in your backend.
          </p>
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]">
            <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">What users can do:</h4>
            <ul className="grid sm:grid-cols-2 gap-4 text-[13px] text-zinc-500">
              <li className="flex gap-2">
                <span className="text-emerald-500">-</span>
                <span>Update Credit Card / Payment Method</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">-</span>
                <span>View & Download Invoice History</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">-</span>
                <span>Cancel or Reactivate Subscriptions</span>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-500">-</span>
                <span>Switch between Monthly and Annual plans</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
