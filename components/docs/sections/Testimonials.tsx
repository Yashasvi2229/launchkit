import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePanel } from "./shared/DocImagePanel";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Testimonials</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-2xl">
          Use testimonials as demo content in your SaaS template. These are placeholders for your users to replace with their own customer quotes before shipping.
        </p>
      </div>

      <div className="space-y-10">
        <DocImagePanel
          src="/docs/images/testimonial.png"
          alt="Testimonials section example"
          title="Testimonials Preview"
          caption="Demo testimonials are placeholders to show layout and content structure for template users."
        />

        <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <h3 className="text-[20px] font-semibold text-white mb-4">Where It Belongs</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed">
            On landing pages, place testimonials after feature explanation and before pricing to improve trust before pricing comparison.
          </p>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Sample Placeholder Data</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Keep testimonial content editable and clearly marked as sample content in the template.
          </p>

          <CodeBlock language="typescript" filename="src/config/testimonials.ts">{`export const testimonials = [
  {
    quote: "This template cut our build time from weeks to days.",
    name: "Alex Rivera",
    role: "Founder, Example SaaS",
    avatar: "/avatars/alex.png",
  },
  {
    quote: "Great defaults and easy to customize for our brand.",
    name: "Sam Patel",
    role: "Product Lead, DemoCo",
    avatar: "/avatars/sam.png",
  },
];`}</CodeBlock>
        </div>

        <div className="p-6 rounded-2xl border border-amber-500/20 bg-amber-500/[0.05]">
          <h4 className="text-amber-300 font-semibold mb-2">Important</h4>
          <p className="text-zinc-300 text-[14px] leading-relaxed">
            Replace all demo testimonials with real customer feedback before production launch.
          </p>
        </div>
      </div>
    </section>
  );
}