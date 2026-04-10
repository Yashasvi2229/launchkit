import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocImagePanel } from "./shared/DocImagePanel";

export function Blog() {
  return (
    <section id="blog" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">MDX Blog System</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          A built-in, SEO-optimized blogging engine that turns MDX files into high-performance product pages.
        </p>
      </div>

      <div className="space-y-12">
        <DocImagePanel
          src="/docs/images/blog.png"
          alt="LaunchX Blog Interface"
          title="Blog Listing"
          caption="The blog UI is built for static rendering and fast first-load performance."
        />

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Writing Posts</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Posts are written in MDX (Markdown + React Components). Simply create a new `post-slug.mdx` file in your content directory.
          </p>
          <CodeBlock filename="example-post.mdx" language="markdown">{`---
title: "How to ship a SaaS in 2026"
description: "A complete guide to the modern stack."
date: "2026-04-09"
author: "LaunchX Team"
image: "/blog/hero.png"
---

# Hello LaunchX!

You can use standard markdown and **React Components** right inside your text.`}</CodeBlock>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">SEO Automation</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            The blog automatically generates JSON-LD schema tags, OpenGraph images, and Meta tags for every post using the <code className="text-emerald-300">src/lib/seo.tsx</code> helper.
          </p>
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <ul className="space-y-3 text-[14px] text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-emerald-500">-</span>
                <span>Automatic <strong>Canonical URLs</strong> generation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500">-</span>
                <span>Structured data for <strong>Article</strong> and <strong>Breadcrumbs</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-500">-</span>
                <span>Dynamic <strong>Sitemap.xml</strong> integration.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
