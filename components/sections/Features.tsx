"use client";

import { motion } from "framer-motion";
import {
    MessageSquareCode,
    RefreshCw,
    Users,
    Shield,
    FileText,
    Rocket,
} from "lucide-react";
import { IconCloud } from "@/components/ui/icon-cloud";
import { File, Folder, Tree } from "@/components/ui/file-tree";
import {
    Terminal,
    AnimatedSpan,
    TypingAnimation,
} from "@/components/ui";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const techSlugs = [
    "nextdotjs",
    "react",
    "typescript",
    "javascript",
    "tailwindcss",
    "prisma",
    "supabase",
    "stripe",
    "clerk",
    "vercel",
    "postgresql",
    "nodejs",
    "git",
    "github",
];

const supportingFeatures = [
    {
        icon: MessageSquareCode,
        title: "Queryable Precedent",
        description:
            "200+ established patterns with Build, Verify, and Debug instructions.",
    },
    {
        icon: RefreshCw,
        title: "Live Context Updates",
        description:
            "Templates stay current when APIs change. No more deprecated code.",
    },
    {
        icon: Users,
        title: "Mode-Switching Skills",
        description:
            "Frontend, backend, DevOps — behavioral personas for sustained work sessions.",
    },
    {
        icon: Shield,
        title: "Security Built In",
        description:
            "OWASP Top 10, STRIDE threat modeling, and security checklists baked in.",
    },
    {
        icon: FileText,
        title: "Traversable Graph",
        description:
            "Context files use self-directing instructions so the AI autonomously loads what it needs.",
    },
    {
        icon: Rocket,
        title: "Deploy Configs",
        description:
            "One-click deploy to Vercel, Railway, or Fly.io with env vars pre-mapped.",
    },
];

export function Features() {
    const images = techSlugs.map(
        (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
    );

    return (
        <section id="features" className="py-32">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-24"
                >
                    <h2 className="text-section mb-4">Everything you need to ship</h2>
                    <p className="text-zinc-500 max-w-lg text-[15px]">
                        Templates, AI rules, prompts, and deployment configs — all designed
                        to work together.
                    </p>
                </motion.div>

                {/* ── Hero Feature 1: AI-Optimized Templates ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32"
                >
                    {/* Text — left */}
                    <div>
                        <p className="text-[13px] font-mono text-emerald-400 mb-4 tracking-wide">
                            01
                        </p>
                        <h3 className="text-[28px] md:text-[32px] font-medium tracking-tight text-white mb-4 leading-tight">
                            AI-Optimized Templates
                        </h3>
                        <p className="text-zinc-400 text-[16px] leading-relaxed mb-6 max-w-md">
                            5 production-ready Next.js starter kits — AI Wrapper, Chrome
                            Extension, Landing Page, Mobile App, and Dashboard — each with
                            auth, payments, and database pre-configured.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Next.js", "Clerk", "Supabase", "Stripe", "Vercel"].map(
                                (tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[12px] text-zinc-400"
                                    >
                                        {tech}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Visual — right: Icon Cloud */}
                    <div className="flex items-center justify-center h-[320px] rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                        <IconCloud images={images} />
                    </div>
                </motion.div>

                {/* ── Hero Feature 2: Progressive AI Context ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32"
                >
                    {/* Visual — left: FileTree */}
                    <div className="order-2 lg:order-1 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 md:p-6">
                        <Tree
                            className="bg-transparent overflow-hidden rounded-md text-[13px]"
                            initialSelectedId="ai-2"
                            initialExpandedItems={["root", "docs", "scripts"]}
                        >
                            <Folder element="launchkit-template" value="root">
                                {/* Level 1 — Always Loaded */}
                                <File value="ai-1">
                                    <p className="text-emerald-400/80">.cursorrules</p>
                                </File>
                                <File value="ai-2">
                                    <p className="text-emerald-400/80">.windsurfrules</p>
                                </File>
                                <File value="ai-3"><p>.env.example</p></File>
                                <Folder element="docs" value="docs">
                                    <File value="d-1"><p>SETUP.md</p></File>
                                    <File value="d-2"><p>DEPLOYMENT.md</p></File>
                                    <File value="d-3"><p>ARCHITECTURE.md</p></File>
                                    <File value="d-4"><p>PROMPTS.md</p></File>

                                    {/* Level 2 — Loaded on Demand */}
                                    <Folder element="ai-context" value="ai-context">
                                        <File value="ac-1">
                                            <p className="text-cyan-400/70">HANDOVER.md</p>
                                        </File>
                                        <File value="ac-2">
                                            <p className="text-cyan-400/70">overview.md</p>
                                        </File>
                                        <File value="ac-3">
                                            <p className="text-cyan-400/70">authentication.md</p>
                                        </File>
                                        <File value="ac-4">
                                            <p className="text-cyan-400/70">database.md</p>
                                        </File>
                                        <File value="ac-5">
                                            <p className="text-cyan-400/70">payments.md</p>
                                        </File>
                                        <File value="ac-6">
                                            <p className="text-cyan-400/70">api-routes.md</p>
                                        </File>
                                    </Folder>

                                    {/* Level 3 — Loaded Per Task */}
                                    <Folder element="prompts" value="prompts">
                                        <File value="p-1">
                                            <p className="text-purple-400/70">setup.md</p>
                                        </File>
                                        <File value="p-2">
                                            <p className="text-purple-400/70">auth.md</p>
                                        </File>
                                        <File value="p-3">
                                            <p className="text-purple-400/70">database.md</p>
                                        </File>
                                        <File value="p-4">
                                            <p className="text-purple-400/70">payments.md</p>
                                        </File>
                                        <File value="p-5">
                                            <p className="text-purple-400/70">api-routes.md</p>
                                        </File>
                                        <File value="p-6">
                                            <p className="text-purple-400/70">ui.md</p>
                                        </File>
                                        <File value="p-7">
                                            <p className="text-purple-400/70">email.md</p>
                                        </File>
                                        <File value="p-8">
                                            <p className="text-purple-400/70">security.md</p>
                                        </File>
                                        <File value="p-9">
                                            <p className="text-purple-400/70">performance.md</p>
                                        </File>
                                        <File value="p-10">
                                            <p className="text-purple-400/70">debugging.md</p>
                                        </File>
                                        <File value="p-11">
                                            <p className="text-purple-400/70">deployment.md</p>
                                        </File>
                                        <File value="p-12">
                                            <p className="text-purple-400/70">refactoring.md</p>
                                        </File>
                                    </Folder>

                                    {/* Role Personas */}
                                    <Folder element="skills" value="skills">
                                        <File value="s-1">
                                            <p className="text-blue-400/70">frontend-engineer.md</p>
                                        </File>
                                        <File value="s-2">
                                            <p className="text-blue-400/70">backend-engineer.md</p>
                                        </File>
                                        <File value="s-3">
                                            <p className="text-blue-400/70">devops-engineer.md</p>
                                        </File>
                                        <File value="s-4">
                                            <p className="text-blue-400/70">ui-ux-designer.md</p>
                                        </File>
                                        <File value="s-5">
                                            <p className="text-blue-400/70">product-manager.md</p>
                                        </File>
                                    </Folder>

                                    {/* Security Context */}
                                    <Folder element="security" value="security">
                                        <File value="sec-1">
                                            <p className="text-amber-400/70">threat-modeling.md</p>
                                        </File>
                                        <File value="sec-2">
                                            <p className="text-amber-400/70">owasp-checklist.md</p>
                                        </File>
                                        <File value="sec-3">
                                            <p className="text-amber-400/70">security-review.md</p>
                                        </File>
                                        <File value="sec-4">
                                            <p className="text-amber-400/70">common-vulnerabilities.md</p>
                                        </File>
                                    </Folder>

                                    {/* Alternatives */}
                                    <Folder element="alternatives" value="alternatives">
                                        <File value="alt-1"><p>supabase-auth.md</p></File>
                                        <File value="alt-2"><p>mongodb-database.md</p></File>
                                    </Folder>
                                </Folder>
                                <Folder element="scripts" value="scripts">
                                    <File value="sc-1"><p>setup.sh</p></File>
                                    <File value="sc-2"><p>deploy.sh</p></File>
                                    <File value="sc-3"><p>check-env.js</p></File>
                                </Folder>
                            </Folder>
                        </Tree>
                    </div>

                    {/* Text — right */}
                    <div className="order-1 lg:order-2">
                        <p className="text-[13px] font-mono text-emerald-400 mb-4 tracking-wide">
                            02
                        </p>
                        <h3 className="text-[28px] md:text-[32px] font-medium tracking-tight text-white mb-4 leading-tight">
                            Progressive AI context loading
                        </h3>
                        <p className="text-zinc-400 text-[16px] leading-relaxed mb-2 max-w-md">
                            Your AI loads exactly what it needs, when it needs it — permanent rules, per-session context, and per-task prompts.
                        </p>
                        <a
                            href="#ai-architecture"
                            className="text-emerald-400 text-[14px] underline underline-offset-4 hover:text-emerald-300 transition-colors mb-6 inline-block"
                        >
                            Know more →
                        </a>
                        <div className="grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-6">
                            <div className="text-center">
                                <p className="text-[18px] md:text-[22px] font-medium text-white">Level 1</p>
                                <p className="text-[11px] md:text-[12px] text-zinc-400">Always loaded</p>
                                <p className="text-[10px] md:text-[11px] text-zinc-600 mt-0.5">&lt;300 tokens</p>
                            </div>
                            <div className="text-center border-l border-white/[0.08]">
                                <p className="text-[18px] md:text-[22px] font-medium text-white">Level 2</p>
                                <p className="text-[11px] md:text-[12px] text-zinc-400">On demand</p>
                                <p className="text-[10px] md:text-[11px] text-zinc-600 mt-0.5">&lt;5k tokens</p>
                            </div>
                            <div className="text-center border-l border-white/[0.08]">
                                <p className="text-[18px] md:text-[22px] font-medium text-white">Level 3</p>
                                <p className="text-[11px] md:text-[12px] text-zinc-400">Per task</p>
                                <p className="text-[10px] md:text-[11px] text-zinc-600 mt-0.5">Token-efficient</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Hero Feature 3: One-Command Setup ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-32"
                >
                    {/* Text — left */}
                    <div>
                        <p className="text-[13px] font-mono text-emerald-400 mb-4 tracking-wide">
                            03
                        </p>
                        <h3 className="text-[28px] md:text-[32px] font-medium tracking-tight text-white mb-4 leading-tight">
                            One-command setup
                        </h3>
                        <p className="text-zinc-400 text-[16px] leading-relaxed mb-6 max-w-md">
                            Run npx launchx-setup — it auto-configures environment
                            variables, connects services, and deploys to Vercel. Zero to live
                            in 5 minutes.
                        </p>
                        <div className="flex items-center gap-2 text-[13px] text-zinc-500">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                            Average setup time: 4m 32s
                        </div>
                    </div>

                    {/* Visual — right: Terminal */}
                    <div>
                        <Terminal className="w-full max-w-lg h-[400px]">
                            <TypingAnimation>&gt; npx launchx-setup</TypingAnimation>

                            <AnimatedSpan className="text-emerald-500 whitespace-pre font-mono text-[10px] leading-tight">{` /$$                                               /$$       /$$   /$$
| $$                                              | $$      | $$  / $$
| $$        /$$$$$$  /$$   /$$ /$$$$$$$   /$$$$$$$| $$$$$$$ |  $$/ $$/
| $$       |____  $$| $$  | $$| $$__  $$ /$$_____/| $$__  $$ \   $$$$/ 
| $$        /$$$$$$$| $$  | $$| $$   \ $$| $$      | $$   \ $$  >$$  $$ 
| $$       /$$__  $$| $$  | $$| $$  | $$| $$      | $$  | $$ /$$/ \  $$
| $$$$$$$$|  $$$$$$$|  $$$$$$/| $$  | $$|  $$$$$$$| $$  | $$| $$   \ $$
|________/ \_______/ \______/ |__/  |__/ \_______/|__/  |__/|__/  |__/
                                                                      
                                                                      
                                                                      `}</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-300">{`\n🚀 Let's get your AI Wrapper deployed in 5 minutes`}</AnimatedSpan>

                            <AnimatedSpan className="text-green-500">✓ Detected template: AI Wrapper SaaS</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Node version: 18.17.0 ✓</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Git initialized ✓</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</AnimatedSpan>
                            <AnimatedSpan className="text-white font-bold">Step 1 of 5: Authentication Setup</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-400">? Choose your auth provider:</AnimatedSpan>
                            <AnimatedSpan className="text-emerald-400">  ❯ Clerk (recommended)</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Clerk selected</AnimatedSpan>
                            <AnimatedSpan className="text-zinc-400">→ https://dashboard.clerk.com/sign-up</AnimatedSpan>
                            <AnimatedSpan className="text-zinc-400">? Paste your Clerk Publishable Key:</AnimatedSpan>
                            <TypingAnimation className="text-zinc-300">pk_test_abc123def456</TypingAnimation>
                            <AnimatedSpan className="text-green-500">✓ Valid key format</AnimatedSpan>
                            <AnimatedSpan className="text-zinc-400">? Paste your Clerk Secret Key:</AnimatedSpan>
                            <TypingAnimation className="text-zinc-300">sk_test_xyz789uvw012</TypingAnimation>
                            <AnimatedSpan className="text-green-500">✓ Testing connection... success!</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Clerk configured</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</AnimatedSpan>
                            <AnimatedSpan className="text-white font-bold">Step 2 of 5: Database Setup</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-400">? Choose your database:</AnimatedSpan>
                            <AnimatedSpan className="text-emerald-400">  ❯ Supabase (recommended, free tier)</AnimatedSpan>
                            <AnimatedSpan className="text-zinc-400">→ https://supabase.com/dashboard</AnimatedSpan>
                            <AnimatedSpan className="text-zinc-400">? Paste your Supabase URL:</AnimatedSpan>
                            <TypingAnimation className="text-zinc-300">https://abc123.supabase.co</TypingAnimation>
                            <AnimatedSpan className="text-green-500">✓ Connection successful</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Running database migrations...</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Created tables: users, subscriptions, credits</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Supabase configured</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</AnimatedSpan>
                            <AnimatedSpan className="text-white font-bold">Step 3 of 5: Payment Setup</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-400">? Choose payment provider:</AnimatedSpan>
                            <AnimatedSpan className="text-emerald-400">  ❯ Stripe (recommended)</AnimatedSpan>
                            <AnimatedSpan className="text-zinc-400">? Paste your Stripe keys:</AnimatedSpan>
                            <TypingAnimation className="text-zinc-300">pk_test_123...</TypingAnimation>
                            <AnimatedSpan className="text-green-500">✓ Stripe connected</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Webhook setup deferred to deployment</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Stripe configured (test mode)</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</AnimatedSpan>
                            <AnimatedSpan className="text-white font-bold">Step 4 of 5: AI Configuration</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-400">? Choose AI provider:</AnimatedSpan>
                            <AnimatedSpan className="text-emerald-400">  ◉ OpenAI</AnimatedSpan>
                            <AnimatedSpan className="text-zinc-400">? Paste your OpenAI API key:</AnimatedSpan>
                            <TypingAnimation className="text-zinc-300">sk-proj-abc123...</TypingAnimation>
                            <AnimatedSpan className="text-green-500">✓ API key valid</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Testing GPT-4 access... success!</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ OpenAI configured</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</AnimatedSpan>
                            <AnimatedSpan className="text-white font-bold">Step 5 of 5: Deployment</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-400">? Where do you want to deploy?</AnimatedSpan>
                            <AnimatedSpan className="text-emerald-400">  ❯ Vercel (recommended, free tier)</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ GitHub connected</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Deploying to Vercel...</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-400">⏳ Deployment in progress...</AnimatedSpan>
                            <AnimatedSpan className="text-zinc-400">[████████████████████] 100%</AnimatedSpan>

                            <AnimatedSpan className="text-green-500">✓ Build complete!</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Setting environment variables...</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Creating Stripe webhook...</AnimatedSpan>
                            <AnimatedSpan className="text-green-500">✓ Webhook secret saved</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-600">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</AnimatedSpan>

                            <AnimatedSpan className="text-white font-bold text-base">🎉 Your app is LIVE!</AnimatedSpan>
                            <AnimatedSpan className="text-emerald-400 font-bold">→ https://my-ai-wrapper.vercel.app</AnimatedSpan>

                            <AnimatedSpan className="text-zinc-500">Done in 4m 32s. Happy building! 🚀</AnimatedSpan>
                        </Terminal>
                    </div>
                </motion.div>

                {/* ── Supporting features — 3×2 grid ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-4"
                >
                    <p className="text-[13px] font-mono text-zinc-600 mb-10 tracking-wide">
                        And everything else
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {supportingFeatures.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease, delay: i * 0.06 }}
                        >
                            <feature.icon
                                size={20}
                                strokeWidth={1.5}
                                className="text-zinc-500 mb-4"
                            />
                            <h3 className="text-[15px] font-medium tracking-tight mb-1.5 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-[14px] text-zinc-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
