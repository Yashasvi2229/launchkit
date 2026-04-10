import { CodeBlock } from "@/components/docs/CodeBlock";

export function SeoAnalytics() {
  return (
    <section id="seo-analytics" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">SEO & Analytics</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX automates search engine optimization with standardized metadata generators and JSON-LD structured data scripts.
        </p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">The Metadata Pattern</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Instead of manual metadata objects, use the <code className="text-emerald-300">getSEOTags()</code> helper in <code className="text-emerald-300">src/lib/seo.tsx</code>. It pulls defaults from your <code className="text-white">config.ts</code> and ensures OpenGraph, Twitter, and Canonical tags are identical across pages.
          </p>
          <CodeBlock language="typescript">{`// app/pricing/page.tsx
import { getSEOTags } from "@/lib/seo";

export const metadata = getSEOTags({ 
  title: "Pricing Plans", 
  description: "Flexible annual and monthly billing options." 
});`}</CodeBlock>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">JSON-LD Structured Data</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            To rank better in Google rich results, use the <code className="text-emerald-300">renderSchemaTags()</code> component. This generates the invisible script tags that help search engines understand your product, author, or software application.
          </p>
          <CodeBlock language="typescript">{`// app/blog/[slug]/page.tsx
import { renderSchemaTags } from "@/lib/seo";

export default function BlogPost() {
  return (
    <>
      {renderSchemaTags({
        type: "BlogPosting",
        name: post.title,
        datePublished: post.date,
      })}
      <article>...</article>
    </>
  );
}`}</CodeBlock>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20">
          <h4 className="text-emerald-400 font-semibold mb-2">Canonical Link Logic</h4>
          <p className="text-zinc-400 text-[14px] leading-relaxed">
            The helper automatically handles local development vs production URLs. It uses your <code className="text-white">config.domainName</code> to generate absolute canonical links, preventing duplicate content issues when you have multiple staging environments.
          </p>
        </div>
      </div>
    </section>
  );
}
