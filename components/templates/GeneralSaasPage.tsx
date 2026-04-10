"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { CheckoutCard } from "./CheckoutCard";
import { ImageCarousel } from "./ImageCarousel";
import { StickyBottomBar } from "./StickyBottomBar";
import { Accordion } from "@/components/ui/Accordion";
import {
  Check,
  Shield,
  Database,
  CreditCard,
  Mail,
  Palette,
  BarChart3,
  Cpu,
  Wrench,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const features = [
  {
    icon: Shield,
    title: "Rock-Solid Authentication",
    description: "Clerk v6 deeply integrated with a built-in migration path to Better Auth if you prefer open-source.",
    bullets: [
      "Sign-in, sign-up pages and Next.js middleware protection",
      "Secure webhook syncing between Auth provider and database",
    ],
  },
  {
    icon: Database,
    title: "Database & Backend",
    description: "Supabase (PostgreSQL) backend configured with migrations and type safety.",
    bullets: [
      "Browser and admin clients included",
      "User and Subscription tables ready to go",
    ],
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    description: "Stripe integration fully wired up with options for LemonSqueezy.",
    bullets: [
      "Stripe Checkout, Customer Billing Portal, and webhook handler",
      "Subscriptions auto-update your database and unlock premium features",
    ],
  },
  {
    icon: Mail,
    title: "Transactional Emails",
    description: "Multi-provider support with Resend & Mailgun.",
    bullets: [
      "Pre-designed templates for Welcome, Receipts, and Cancellations",
    ],
  },
  {
    icon: Palette,
    title: "Beautiful & Responsive UI",
    description: "Powered by Tailwind CSS + DaisyUI with light & dark mode support.",
    bullets: [
      "Modals, Toasts, Skeletons, Timelines, Buttons out of the box",
      "Crisp Chat widget easily togglable",
    ],
  },
  {
    icon: BarChart3,
    title: "Marketing & SEO Ready",
    description: "High-converting marketing components and in-built Markdown blog system.",
    bullets: [
      "Hero, Pricing Tables, Features, FAQs, Testimonials",
      "Dynamic metadata, JSON-LD schema, Open Graph images, automatic sitemaps",
    ],
  },
  {
    icon: Wrench,
    title: "Developer Experience",
    description: "Strict TypeScript, ESLint, Prettier, and Husky pre-commit hooks.",
    bullets: [
      "Centralized config.ts — one file to customize branding, pricing, and links",
      "Vitest unit testing configured out of the box",
    ],
  },
];

const builtInPages = [
  {
    title: "Landing & Marketing Pages",
    description: "Stunning homepage with Hero, Features, Pricing, Testimonials, FAQs, and CTA sections. Plus a toggleable pricing page pulling from your config.",
    image: "/landing-marketing.png",
  },
  {
    title: "User Dashboard",
    description: "Protected dashboard with metric cards, progress tracking, subscription status, billing portal, and user settings with secure account deletion.",
    image: "/dashboard.png",
  },
  {
    title: "Admin Panel",
    description: "Dedicated admin route with audit logs, user management server actions, and platform oversight controls.",
    image: "/admin.png",
  },
  {
    title: "Content & SEO",
    description: "MDX blog with dynamic article pages. Drop markdown files and they instantly render as beautiful, SEO-optimized posts.",
    image: "/blog.png",
  },
];

const buildWith = [
  { label: "B2B SaaS", description: "CRMs, project management, analytics dashboards" },
  { label: "Consumer Apps", description: "Social platforms, productivity tools, habit trackers" },
  { label: "Internal Tools", description: "Admin panels, reporting systems, workflow automation" },
  { label: "Marketplaces", description: "Two-sided platforms, directories, booking systems" },
];

const faqItems = [
  {
    question: "How do I get access after purchase?",
    answer: "After payment, we'll invite your GitHub username to our private template repository. You'll receive a GitHub notification and email — just accept the invite, clone the repo, and start building.",
  },
  {
    question: "Do I get lifetime updates?",
    answer: "Yes. Once you have access to the repo, you can pull updates at any time. We continuously improve the template with framework updates, new features, and bug fixes.",
  },
  {
    question: "Can I use it for commercial projects?",
    answer: "Absolutely. Your license covers unlimited personal and commercial projects. Build and deploy as many apps as you want. The only restriction is you can't resell or redistribute the template source code itself.",
  },
  {
    question: "What if I need help?",
    answer: "Reach out to us at thedakshjaitly@gmail.com. We're happy to help with setup questions, configuration issues, or general guidance on getting the most out of the template.",
  },
  {
    question: "What's the refund policy?",
    answer: "Since this is a digital product with immediate access to source code, all sales are final. However, if you experience a technical issue that prevents you from using the template, contact us within 14 days and we'll work to resolve it or provide a refund at our discretion.",
  },
];

export function GeneralSaasPage() {
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-black text-white min-h-screen">
      <StickyBottomBar targetRef={formRef} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:pr-[440px] py-16 md:py-24">
        {/* Desktop sticky checkout card — fixed position on viewport */}
        <div className="hidden xl:block fixed top-8 right-[calc((100vw-80rem)/2+2rem)] w-[320px] z-40">
          <CheckoutCard />
        </div>

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-zinc-500 text-[13px] hover:text-zinc-300 transition-colors mb-8"
          >
            <ArrowRight className="w-3 h-3 rotate-180" />
            Back to LaunchX
          </a>

          <h1 className="text-heading mb-4">LaunchX SaaS Starter</h1>
          <p className="text-zinc-400 text-[16px] leading-relaxed max-w-2xl mb-6">
            The production-ready Next.js SaaS starter kit. Built for speed, scaled for production.
            We&apos;ve handled auth, billing, databases, emails, and SEO — so you can focus exclusively on your product.
          </p>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-zinc-600 line-through text-[20px]">$300</span>
            <span className="text-[42px] font-semibold text-emerald-400">$149</span>
            <span className="text-zinc-500 text-[14px]">/lifetime</span>
          </div>

          <a
            href="/docs"
            className="inline-flex items-center gap-1.5 text-[13px] text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
          >
            <ArrowRight className="w-3 h-3" />
            Read the documentation
          </a>
        </motion.div>

        {/* Mobile checkout card — inline */}
        <div ref={formRef} className="xl:hidden mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <CheckoutCard />
          </motion.div>
        </div>

        {/* ── Landing Page Preview Carousel ── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-24"
        >
          <h2 className="text-section mb-6">See it in action</h2>
          <ImageCarousel />
        </motion.section>

        {/* ── What's Inside ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-12"
          >
            <h2 className="text-section mb-4">What&apos;s inside the box</h2>
            <p className="text-zinc-500 text-[15px]">
              Everything you need to launch a production SaaS. No configuration rabbit holes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: i * 0.05 }}
                  className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-[16px] mb-1.5">{feature.title}</h3>
                      <p className="text-zinc-500 text-[13px] leading-relaxed mb-3">{feature.description}</p>
                      <ul className="space-y-1.5">
                        {feature.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2 text-[13px] text-zinc-400">
                            <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── MEX: AI-Native Development ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div
              className="rounded-2xl p-8 md:p-10 relative overflow-hidden border-2"
              style={{
                borderColor: "rgba(65, 105, 225, 0.3)",
                background: "linear-gradient(135deg, rgba(65, 105, 225, 0.06) 0%, rgba(0, 0, 0, 0) 60%)",
              }}
            >
              {/* Subtle glow */}
              <div
                className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-3xl"
                style={{ background: "rgba(65, 105, 225, 0.12)" }}
              />

              <div className="relative flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-10 h-10">
                      <Image src="/mex-mascot.svg" alt="MEX" fill className="object-contain" />
                    </div>
                    <div>
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider border"
                        style={{
                          color: "#4169E1",
                          borderColor: "rgba(65, 105, 225, 0.3)",
                          background: "rgba(65, 105, 225, 0.08)",
                        }}
                      >
                        Pre-configured
                      </span>
                    </div>
                  </div>

                  <h2 className="text-[22px] md:text-[26px] font-medium text-white mb-3 tracking-tight">
                    Built with MEX — AI context scaffolding
                  </h2>
                  <p className="text-zinc-400 text-[14px] leading-relaxed mb-5 max-w-xl">
                    Every LaunchKit template ships with a complete{" "}
                    <a href="/mex" className="transition-colors hover:opacity-80" style={{ color: "#4169E1" }}>
                      .mex
                    </a>{" "}
                    scaffold. Point your AI coding tool to the handover prompt and it instantly
                    understands your architecture, database schema, payment flows, and conventions.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      "AI learns your full codebase structure",
                      "80% fewer tokens consumed per session",
                      "Works with Cursor, Windsurf, Copilot, Claude Code",
                      "Drift detection keeps context current",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-[13px] text-zinc-400">
                        <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#4169E1" }} />
                        {item}
                      </div>
                    ))}
                  </div>

                  <a
                    href="/mex"
                    className="inline-flex items-center gap-2 mt-6 text-[13px] font-medium transition-colors hover:opacity-80"
                    style={{ color: "#4169E1" }}
                  >
                    Learn more about MEX
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Terminal preview */}
                <div className="w-full md:w-[280px] flex-shrink-0">
                  <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(65, 105, 225, 0.2)", background: "rgba(0, 0, 0, 0.4)" }}>
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ borderColor: "rgba(65, 105, 225, 0.15)" }}>
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                      <div className="w-2 h-2 rounded-full bg-zinc-700" />
                      <span className="text-[10px] text-zinc-600 ml-2 font-mono">terminal</span>
                    </div>
                    <div className="p-3 font-mono text-[11px] leading-relaxed">
                      <p className="text-zinc-500">$ npx mex init</p>
                      <p className="text-zinc-600 mt-1">Scanning codebase...</p>
                      <p className="text-zinc-600">Detecting stack: Next.js, Supabase, Stripe</p>
                      <p className="text-zinc-600">Generating scaffold...</p>
                      <p className="mt-1" style={{ color: "#4169E1" }}>
                        .mex/ scaffold created
                      </p>
                      <p className="text-zinc-600 mt-1">7 context files generated</p>
                      <p className="text-emerald-500 mt-1">Ready for AI-assisted development</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Built-in Pages ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-12"
          >
            <h2 className="text-section mb-4">Fully built pages & interfaces</h2>
            <p className="text-zinc-500 text-[15px]">
              Not just a backend framework — a complete, beautifully designed frontend so you never start with a blank screen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {builtInPages.map((page, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
              >
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.06] mb-4 bg-zinc-950">
                  <Image
                    src={page.image}
                    alt={page.title}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="text-white font-medium text-[16px] mb-1">{page.title}</h3>
                <p className="text-zinc-500 text-[13px] leading-relaxed">{page.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-12"
          >
            <h2 className="text-section mb-4">How it works</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Buy", description: "Purchase the template for $149. One-time payment, no subscriptions." },
              { step: "2", title: "Get Access", description: "Receive instant access to the private GitHub repo via your GitHub username." },
              { step: "3", title: "Build", description: "Clone, customize, and ship your SaaS. You own the code forever." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold text-[14px] mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-medium text-[16px] mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-[13px] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── What You Can Build ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-12"
          >
            <h2 className="text-section mb-4">What you can build</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {buildWith.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 hover:bg-white/[0.03] transition-all duration-300"
              >
                <h3 className="text-white font-medium text-[15px] mb-1">{item.label}</h3>
                <p className="text-zinc-500 text-[13px]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-8"
          >
            <h2 className="text-section">Frequently asked questions</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            <Accordion items={faqItems} />
          </motion.div>
        </section>

        {/* ── Bottom CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center py-12 border-t border-white/[0.06]"
        >
          <h2 className="text-[24px] font-medium text-white mb-3">Ready to ship?</h2>
          <p className="text-zinc-500 text-[15px] mb-6">
            Stop rebuilding auth and payments. Start building your product.
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-6">
            <span className="text-zinc-600 line-through text-[18px]">$300</span>
            <span className="text-[36px] font-semibold text-emerald-400">$149</span>
            <span className="text-zinc-500 text-[14px]">/lifetime</span>
          </div>
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
            className="xl:hidden px-8 py-3 rounded-xl bg-emerald-500 text-black text-[14px] font-semibold hover:bg-emerald-400 transition-colors duration-200 cursor-pointer"
          >
            Buy Now
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hidden xl:inline-block px-8 py-3 rounded-xl bg-emerald-500 text-black text-[14px] font-semibold hover:bg-emerald-400 transition-colors duration-200 cursor-pointer"
          >
            Buy Now
          </a>
        </motion.section>
      </div>
    </main>
  );
}
