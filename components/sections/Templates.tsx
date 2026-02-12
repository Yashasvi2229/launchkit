"use client";

import { motion } from "framer-motion";

import {
    Bot,
    Globe,
    Chrome,
    LayoutDashboard,
    Smartphone,
} from "lucide-react";
import { AvatarCircles } from "@/components/ui/avatar-circles";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const templates = [
    {
        icon: Bot,
        name: "AI Wrapper SaaS",
        price: 119,
        description: "Ship AI-powered tools with built-in billing and usage tracking.",
        stack: [
            { imageUrl: "https://cdn.simpleicons.org/nextdotjs/white", profileUrl: "" },
            { imageUrl: "https://cdn.simpleicons.org/clerk/6C47FF", profileUrl: "" },
            { imageUrl: "https://cdn.simpleicons.org/supabase/3ECF8E", profileUrl: "" },
            { imageUrl: "https://cdn.simpleicons.org/stripe/635BFF", profileUrl: "" },
            { imageUrl: "https://cdn.simpleicons.org/openai/white", profileUrl: "" },
        ],
        prebuilt: [
            "Token counting & credit system",
            "Subscription tiers (Free/Pro/Enterprise)",
            "Streaming responses UI",
            "API key management",
            "Usage dashboard & analytics",
        ],
        buildWith: ["Chat tools", "Image generators", "Writing assistants", "Code analyzers"],
    },
    {
        icon: Globe,
        name: "Landing Page + Waitlist",
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
        icon: LayoutDashboard,
        name: "SaaS Dashboard",
        price: 119,
        description: "Internal tools and admin panels with charts, tables, and role-based access.",
        stack: [
            { imageUrl: "https://cdn.simpleicons.org/nextdotjs/white", profileUrl: "" },
            { imageUrl: "https://cdn.simpleicons.org/stripe/635BFF", profileUrl: "" },
            { imageUrl: "https://cdn.simpleicons.org/tailwindcss/06B6D4", profileUrl: "" },
            { imageUrl: "https://cdn.simpleicons.org/auth0/white", profileUrl: "" }, // NextAuth often uses generic auth or Auth0 visual if outdated
            { imageUrl: "https://cdn.simpleicons.org/supabase/3ECF8E", profileUrl: "" },
        ],
        prebuilt: [
            "Charts & analytics views",
            "Sortable data tables",
            "Role-based access control",
            "Admin panel",
            "CSV export / import",
        ],
        buildWith: ["Internal tools", "Client dashboards", "Admin panels", "Reporting apps"],
    },
    {
        icon: Chrome,
        name: "Chrome Extension",
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
        price: 129,
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
    const totalValue = templates.reduce((sum, t) => sum + t.price, 0);
    const bundlePrice = 299;
    const earlyBundlePrice = Math.round(bundlePrice * 0.5);

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

                {/* Template cards — 3 top row, 2 bottom row centered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                    {templates.map((template, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                            className={`rounded-2xl bg-zinc-900/80 border border-white/[0.06] p-6 hover:bg-zinc-900 hover:border-white/[0.1] transition-all duration-300 flex flex-col ${i < 3
                                ? "lg:col-span-2"
                                : i === 3
                                    ? "lg:col-span-3"
                                    : "lg:col-span-3"
                                }`}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center">
                                    <template.icon size={18} strokeWidth={1.5} className="text-zinc-400" />
                                </div>
                                <div>
                                    <h3 className="text-[15px] font-medium text-white">{template.name}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-zinc-600 text-[13px] line-through">${template.price}</span>
                                        <span className="text-emerald-400 text-[13px] font-medium">
                                            ${Math.round(template.price * 0.5)}
                                        </span>
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
                                {template.prebuilt.map((item, j) => (
                                    <div key={j} className="flex items-start gap-2 text-[12px]">
                                        <span className="text-emerald-400 mt-0.5">✓</span>
                                        <span className="text-zinc-400">{item}</span>
                                    </div>
                                ))}
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
                            <a href="/waitlist" className="mt-auto">
                                <button className="w-full py-2.5 rounded-xl bg-white text-black text-[13px] font-medium hover:bg-zinc-200 transition-all duration-200 cursor-pointer">
                                    Get template →
                                </button>
                            </a>
                        </motion.div>
                    ))}
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
                                Save ${totalValue - earlyBundlePrice} compared to buying individually.
                            </p>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-3">
                            <div className="flex items-baseline gap-3">
                                <span className="text-zinc-600 text-[18px] line-through">${totalValue}</span>
                                <span className="text-[36px] font-medium text-white">${earlyBundlePrice}</span>
                            </div>
                            <a href="/waitlist">
                                <button className="bg-white text-black font-medium text-[15px] px-8 py-3 rounded-full hover:bg-zinc-200 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                                    Get early access →
                                </button>
                            </a>
                            <p className="text-[12px] text-zinc-600">50% off for first 100 signups</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
