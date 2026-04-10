import { CodeBlock } from "@/components/docs/CodeBlock";

export function Payments() {
  return (
    <section id="payments" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 leading-tight text-center lg:text-left">Payments & Subscriptions</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX supports Stripe and Lemon Squeezy through a shared subscription model and provider-specific webhook handlers.
        </p>
      </div>

      <div className="space-y-16">
        {/* Provisioning */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6 flex items-center gap-3">
             <span className="w-2 h-6 bg-blue-500 rounded-full" />
             Multi-Provider Core
          </h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-8">
            The template is architected to be payment-agnostic. All subscriptions are normalized into a single <code className="text-emerald-400">subscriptions</code> table, regardless of the vendor.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-blue-500/10 bg-blue-500/[0.02] group">
              <h4 className="text-blue-400 font-medium mb-2 uppercase text-[12px] tracking-widest">Stripe SDK</h4>
              <p className="text-zinc-500 text-[13px] leading-relaxed group-hover:text-zinc-300 transition-colors">
                Native integration with Stripe Checkout and the Billing Portal. Handles Tax, Coupons, and Metered billing.
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-purple-500/10 bg-purple-500/[0.02] group">
              <h4 className="text-purple-400 font-medium mb-2 uppercase text-[12px] tracking-widest">Lemon Squeezy</h4>
              <p className="text-zinc-500 text-[13px] leading-relaxed group-hover:text-zinc-300 transition-colors">
                The Merchant of Record (MoR) solution. Handles VAT, global compliance, and payouts automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Webhook Logic */}
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-6">Webhook Security & Reliability</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Payment state is synchronized via cryptographically signed webhooks. LaunchX enforces strict signature verification to prevent spoofing.
          </p>
          
          <div className="p-1 rounded-2xl bg-zinc-900/50 border border-white/[0.06]">
            <CodeBlock language="typescript" filename="src/app/api/stripe/webhook/route.ts">{`import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;
  
  // High-Security Verification
  const event = stripe.webhooks.constructEvent(
    body, 
    signature, 
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  // Atomic DB Sync
  await upsertSubscription(event.data.object);
  return jsonSuccess();
}`}</CodeBlock>
          </div>
        </div>

        {/* Price Mapping */}
        <div>
          <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/[0.05]">
            <h4 className="text-white font-semibold mb-2 text-[14px] uppercase tracking-wider">The Pricing Protocol</h4>
            <p className="text-zinc-500 text-[13px] leading-relaxed mb-6">
              Do not hardcode provider price IDs in UI components. Keep all mappings in <code className="text-white">config/config.ts</code>.
            </p>
            
            <div className="space-y-3">
              {[
                { label: "ID Alignment", text: "Match your Stripe/LS Price IDs to the config object keys." },
                { label: "Environment Parity", text: "Use distinct keys for Test and Production environments." },
                { label: "Atomic Checkout", text: "The useCheckout hook handles URL generation automatically." }
              ].map(tip => (
                <div key={tip.label} className="flex gap-3 text-[13px]">
                   <span className="text-blue-500">-</span>
                   <span className="text-zinc-400"><strong className="text-zinc-200">{tip.label}:</strong> {tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Callout */}
        <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 mt-12">
          <p className="text-zinc-400 text-sm leading-relaxed">
            Use <code className="text-white">stripe listen --forward-to localhost:3000/api/stripe/webhook</code> during local development to test signature verification and subscription sync.
          </p>
        </div>
      </div>
    </section>
  );
}
