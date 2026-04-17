"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import {
    Bot,
    Globe,
    Chrome,
    LayoutDashboard,
    Smartphone,
} from "lucide-react";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { useWaitlistSpots } from "@/hooks/use-waitlist-spots";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const templates: {
    icon: any;
    name: string;
    originalPrice: number;
    price: number;
    description: string;
    stack: { imageUrl: string; profileUrl: string }[];
    prebuilt: (string | { label: string; highlight: boolean })[];
    buildWith: string[];
}[] = [
        {
            icon: LayoutDashboard,
            name: "General SaaS",
            originalPrice: 300,
            price: 149,
            description: "The complete foundation for any SaaS. Auth, payments, database, and UI ready to go.",
            stack: [
                { imageUrl: "https://cdn.simpleicons.org/nextdotjs/white", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/stripe/635BFF", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/supabase/3ECF8E", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/resend/white", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/react/61DAFB", profileUrl: "" },
            ],
            prebuilt: [
                "Auth, Payments & Database",
                "Email, SEO & Analytics",
                "Landing page & Dashboard UI",
                { label: "PLUS: .cursorrules & context docs", highlight: true },
                { label: "PLUS: AI prompt library", highlight: true },
                { label: "PLUS: Security & role prompts", highlight: true },
            ],
            buildWith: ["B2B SaaS", "Consumer apps", "Internal tools", "Marketplaces"],
        },
        {
            icon: Bot,
            name: "AI Wrapper SaaS",
            originalPrice: 400,
            price: 199,
            description: "Ship AI-powered tools with built-in billing, caching, and usage tracking.",
            stack: [
                { imageUrl: "https://cdn.simpleicons.org/nextdotjs/white", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/stripe/635BFF", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/supabase/3ECF8E", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/claude/D97757", profileUrl: "" },
            ],
            prebuilt: [
                "Token counting & credit system",
                "API key management & caching",
                "Streaming responses UI",
                { label: "PLUS: AI-specific .cursorrules", highlight: true },
                { label: "PLUS: Model routing prompts", highlight: true },
                { label: "PLUS: AI architecture docs", highlight: true },
            ],
            buildWith: ["Chat tools", "Generators", "Analyzers", "Copilots"],
        },
        {
            icon: Globe,
            name: "Landing Page + Waitlist",
            originalPrice: 200,
            price: 99,
            description: "Validate ideas fast with a polished landing page and email capture.",
            stack: [
                { imageUrl: "https://cdn.simpleicons.org/nextdotjs/white", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/framer/white", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/resend/white", profileUrl: "" },
            ],
            prebuilt: [
                "Animated hero sections",
                "Email capture + waitlist",
                "SEO optimized",
                "Analytics ready (PostHog)",
                "A/B testing support",
            ],
            buildWith: ["Product launches", "Idea validation", "Coming soon pages", "Side projects"],
        },
        {
            icon: Chrome,
            name: "Chrome Extension",
            originalPrice: 200,
            price: 99,
            description: "Build browser extensions with modern tooling and Manifest V3.",
            stack: [
                { imageUrl: "https://cdn.simpleicons.org/react/61DAFB", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/typescript/3178C6", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/vite/646CFF", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/googlechrome/white", profileUrl: "" },
            ],
            prebuilt: [
                "Popup + sidebar UI",
                "Content scripts",
                "Chrome storage sync",
                "Background workers",
                "Web Store ready packaging",
            ],
            buildWith: ["Productivity tools", "Web scrapers", "AI assistants", "Tab managers"],
        },
        {
            icon: Smartphone,
            name: "Mobile App",
            originalPrice: 400,
            price: 199,
            description: "Cross-platform mobile apps with auth, push notifications, and offline support.",
            stack: [
                { imageUrl: "https://cdn.simpleicons.org/react/61DAFB", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/expo/white", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/typescript/3178C6", profileUrl: "" },
                { imageUrl: "https://cdn.simpleicons.org/supabase/3ECF8E", profileUrl: "" },
            ],
            prebuilt: [
                "Push notifications",
                "Deep linking",
                "Offline-first storage",
                "Auth flows (biometric)",
                "App Store ready config",
            ],
            buildWith: ["Consumer apps", "Fitness trackers", "Social tools", "Habit apps"],
        },
    ];

export function Templates() {
    const totalValue = templates.reduce((sum, t) => sum + t.originalPrice, 0);
    const bundlePrice = 399;
    const { spotsLeft } = useWaitlistSpots();

    return (
        <section id="templates" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-16"
                >
                    <h2 className="text-section mb-4">
                        5 templates. Pick one or grab them all.
                    </h2>
                    <p className="text-zinc-500 max-w-lg text-[15px]">
                        Each template ships with AI rules, security docs, prompts, and
                        one-command deployment.
                    </p>
                </motion.div>

                {/* Early access urgency banner */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease }}
                    className="mb-10 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/15 px-5 py-4 max-w-md"
                >
                    <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        <p className="text-[13px] text-zinc-300">
                            Early access pricing —{" "}
                            <span className="text-emerald-400 font-medium">
                                {spotsLeft !== null ? spotsLeft : "–"} of 100 spots
                            </span>{" "}
                            remaining
                        </p>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                            className="h-full bg-emerald-400/60 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{
                                width: spotsLeft !== null ? `${((100 - spotsLeft) / 100) * 100}%` : "0%",
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease, delay: 0.3 }}
                        />
                    </div>
                </motion.div>

                {/* Template cards — 3 top row, 2 bottom row centered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    {templates.map((template, i) => {
                        const cardInner = (
                            <>
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center">
                                        <template.icon size={18} strokeWidth={1.5} className="text-zinc-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-[15px] font-medium text-white">{template.name}</h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-zinc-600 text-[16px] line-through">${template.originalPrice}</span>
                                            <span className="text-emerald-400 text-[20px] font-semibold">
                                                ${template.price}
                                            </span>
                                            <span className="text-zinc-500 text-[12px]">/lifetime</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-[13px] text-zinc-500 leading-relaxed mb-5">{template.description}</p>

                                {/* Tech stack icons */}
                                <div className="mb-5">
                                    <AvatarCircles avatarUrls={template.stack} />
                                </div>

                                {/* Pre-built features */}
                                <div className="space-y-2 mb-5 flex-1">
                                    {template.prebuilt.map((item, j) => {
                                        const isHighlight = typeof item === 'object' && item.highlight;
                                        const label = typeof item === 'object' ? item.label : item;
                                        return (
                                            <div key={j} className="flex items-start gap-2 text-[12px]">
                                                <span className={isHighlight ? "text-emerald-400 mt-0.5 font-bold" : "text-emerald-400 mt-0.5"}>
                                                    {isHighlight ? "✦" : "✓"}
                                                </span>
                                                <span className={isHighlight ? "text-emerald-300 font-medium" : "text-zinc-400"}>
                                                    {label}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Perfect for building */}
                                <div className="pt-4 border-t border-white/[0.06] mb-5">
                                    <p className="text-[11px] text-zinc-600 mb-2 uppercase tracking-wider">
                                        Build with it
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {template.buildWith.map((item) => (
                                            <span
                                                key={item}
                                                className="text-[11px] text-zinc-500"
                                            >
                                                {item}{template.buildWith.indexOf(item) < template.buildWith.length - 1 ? " ·" : ""}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Get button */}
                                {template.name === "General SaaS" ? (
                                    <a href="/templates/general-saas" className="mt-auto">
                                        <button className="w-full py-2.5 rounded-xl bg-white text-black text-[13px] font-medium hover:bg-zinc-200 transition-all duration-200 cursor-pointer">
                                            Get Now →
                                        </button>
                                    </a>
                                ) : (
                                                    <a href="/waitlist" className="mt-auto">
                                                        <button className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[13px] text-zinc-300 font-medium hover:bg-white/[0.08] transition-all duration-200 cursor-pointer">
                                                            Join waitlist
                                                        </button>
                                                    </a>
                                )}
                            </>
                        );

                                        const isGeneralSaas = template.name === "General SaaS";

                        if (i === 0) {
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                                    className="lg:col-span-2 group relative z-10 pt-8 mt-[-32px]"
                                >
                                    {/* Mascot peeking from behind */}
                                    <a 
                                        href="/mex"
                                        className="absolute right-6 top-[12px] w-[52px] h-[52px] z-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-[30px] group-hover:rotate-6 cursor-pointer hover:scale-105"
                                    >
                                        <Image src="/mex-mascot.svg" alt="MEX Mascot" fill className="object-contain drop-shadow-lg" />
                                    </a>

                                    {/* Folder Tab Overlaying Card Border */}
                                    <div 
                                        className="absolute left-[20px] top-[4px] h-[30px] px-3 flex items-center justify-center rounded-t-xl border-x-2 border-t-2 z-20 bg-[#111113] group-hover:bg-[#18181b] transition-colors duration-300"
                                        style={{ borderColor: "rgba(65, 105, 225, 0.6)" }}
                                    >
                                        <span className="text-[11px] font-mono tracking-wide text-zinc-300">
                                            Pre-configured with <a href="/mex" className="hover:opacity-80 transition-opacity" style={{ color: "#4169E1" }}>MEX</a>
                                        </span>
                                    </div>
                                    
                                    {/* Seamless border hider line */}
                                    <div className="absolute left-[22px] top-[30px] h-[4px] w-[182px] z-20 bg-[#111113] group-hover:bg-[#18181b] transition-colors duration-300" />

                                    {/* Main Card */}
                                    <div
                                        className="relative z-10 rounded-2xl p-6 transition-colors duration-300 flex flex-col h-full border-2 bg-[#111113] group-hover:bg-[#18181b]"
                                        style={{ borderColor: "rgba(65, 105, 225, 0.6)" }}
                                    >
                                        {cardInner}
                                    </div>
                                </motion.div>
                            );
                        }

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                                className={`${i < 3 ? "lg:col-span-2" : i === 3 ? "lg:col-span-3" : "lg:col-span-3"}`}
                            >
                                    <div className="relative rounded-2xl bg-zinc-900/80 border border-white/[0.06] p-6 pt-14 hover:bg-zinc-900 hover:border-white/[0.1] transition-all duration-300 flex flex-col h-full">
                                        {!isGeneralSaas && (
                                                <div className="absolute top-3 right-[-1px] z-20 pointer-events-none">
                                                    <div className="relative pl-5 pr-4 py-1.5 rounded-l-sm border border-r-0 border-white/[0.16] bg-zinc-800 shadow-[0_6px_18px_rgba(0,0,0,0.4)] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%,10%_50%)]">
                                                        <span className="text-[10px] uppercase tracking-[0.18em] text-zinc-200 font-semibold whitespace-nowrap">
                                                            Coming Soon
                                                        </span>
                                                    </div>
                                            </div>
                                        )}
                                    {cardInner}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* All Access Bundle Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: 0.2 }}
                    className="mt-12 rounded-2xl bg-white/[0.03] border border-emerald-500/20 p-8 md:p-10 relative overflow-hidden"
                >
                    {/* Subtle glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium uppercase tracking-wider">
                                    Best value
                                </span>
                            </div>
                            <h3 className="text-[24px] md:text-[28px] font-medium text-white mb-2">
                                All 5 Templates
                            </h3>
                            <p className="text-zinc-500 text-[15px] max-w-md">
                                Get everything. Lifetime updates. One payment.
                                Save ${totalValue - bundlePrice} compared to buying individually.
                            </p>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex items-baseline gap-3">
                                <span className="text-zinc-600 text-[22px] line-through">${totalValue}</span>
                                <span className="text-[40px] font-semibold text-emerald-400">${bundlePrice}</span>
                                <span className="text-zinc-500 text-[14px]">/lifetime</span>
                            </div>
                            <a href="/waitlist">
                                <button className="bg-white text-black font-medium text-[15px] px-8 py-3 rounded-full hover:bg-zinc-200 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                                    Join bundle waitlist →
                                </button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
