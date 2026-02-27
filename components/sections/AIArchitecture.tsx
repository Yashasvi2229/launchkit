"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const layers = [
    {
        id: 1,
        badge: "01",
        title: "Always knows your stack",
        description:
            "Your AI knows your stack and conventions on every request. .cursorrules and .windsurfrules give it permanent memory — zero setup, zero token waste.",
        stats: "~150 lines, <300 tokens, always in context",
    },
    {
        id: 2,
        badge: "02",
        title: "Loads context when it matters",
        description:
            "When you work on payments, auth, or database tasks, the AI loads exactly the context it needs. Self-directing domain files give it photographic memory of your architecture.",
        stats: "6 domain files, <5k tokens each, loaded per session",
    },
    {
        id: 3,
        badge: "03",
        title: "Never repeats the same mistake twice",
        description:
            "Every pattern has a Build, Verify, Debug prompt entry. The AI checks the library, loads the right conventions, and writes consistent code — no guessing, no hallucinations.",
        stats: "Multiple prompts, 12 categories, token-efficient",
    },
];

export function AIArchitecture() {
    const [activeLayer, setActiveLayer] = useState<number | null>(null);

    const rc = (id: number) => activeLayer === id ? "#34d399" : "#a1a1aa";
    const tc = (id: number) => activeLayer === id ? "#34d399" : "#e4e4e7";
    const sc = (id: number) => activeLayer === id ? "#34d399" : "#a1a1aa";
    const ro = (id: number) => activeLayer === id ? 1 : activeLayer !== null ? 0.12 : 0.8;
    const to2 = (id: number) => activeLayer === id ? 1 : activeLayer !== null ? 0.1 : 0.85;
    const so = (id: number) => activeLayer === id ? 1 : activeLayer !== null ? 0.08 : 0.65;

    const t = "opacity 0.35s, fill 0.35s, stroke 0.35s, strokeWidth 0.35s, fillOpacity 0.35s";

    return (
        <section id="ai-architecture" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

                {/* Cinematic Top Section */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="max-w-3xl mx-auto text-center mb-16 md:mb-24"
                >
                    <p className="text-[13px] font-mono text-emerald-400 mb-6 tracking-wide uppercase">
                        The Context Wall
                    </p>
                    <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight text-white mb-6 leading-tight">
                        Other templates give your AI code to read.<br />
                        <span className="text-emerald-400">LaunchX gives it memory.</span>
                    </h2>
                    <div className="text-zinc-400 text-[16px] leading-relaxed space-y-4">
                        <p>
                            Every vibe coder hits the same wall. Week 1 is magic — the AI writes perfect code.
                            Week 2 it starts breaking patterns. Week 3 you're spending more time fixing AI mistakes
                            than shipping features.
                        </p>
                        <p>
                            The problem isn't your prompts. It's that your AI has no memory of how your codebase works.
                        </p>
                    </div>
                </motion.div>

                {/* Architecture Split */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: 0.1 }}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                >
                    {/* Left Column — Text */}
                    <div>

                        <div className="space-y-0">
                            {layers.map((layer, i) => (
                                <div
                                    key={layer.id}
                                    className={`py-5 cursor-default transition-all duration-300 ${i < layers.length - 1 ? "border-b border-white/[0.08]" : ""} ${activeLayer === layer.id ? "opacity-100" : activeLayer !== null ? "opacity-50" : "opacity-100"}`}
                                    onMouseEnter={() => setActiveLayer(layer.id)}
                                    onMouseLeave={() => setActiveLayer(null)}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-mono font-medium">
                                            {layer.badge}
                                        </span>
                                        <h3 className="text-[15px] font-medium text-white">
                                            {layer.title}
                                        </h3>
                                    </div>
                                    <p className="text-[13px] text-zinc-500 leading-relaxed mb-2">
                                        {layer.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-[12px] text-zinc-600">
                                        {layer.stats}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column — Concentric Circles Diagram */}
                    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 md:p-6">
                        <svg
                            viewBox="0 0 600 660"
                            className="w-full"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* ═══════════ LAYER 3 — OUTER CIRCLE ═══════════ */}
                            <circle
                                cx="300" cy="260" r="240"
                                fill="none"
                                stroke={rc(3)}
                                strokeWidth={activeLayer === 3 ? 3 : 2}
                                opacity={ro(3)}
                                style={{ transition: t }}
                            />
                            {/* 3 — number + title at top of ring */}
                            <text
                                x="300" y="48"
                                fill={tc(3)}
                                fontSize="24" fontFamily="monospace" textAnchor="middle" fontWeight="700"
                                opacity={to2(3)}
                                style={{ transition: t }}
                            >
                                3
                            </text>
                            <text
                                x="300" y="76"
                                fill={tc(3)}
                                fontSize="18" fontFamily="monospace" textAnchor="middle" fontWeight="600"
                                opacity={to2(3)}
                                style={{ transition: t }}
                            >
                                Loaded per Task
                            </text>
                            {/* 3 — left content (in outer ring zone, above middle circle) */}
                            <text
                                x="110" y="110"
                                fill={sc(3)}
                                fontSize="12" fontFamily="monospace" textAnchor="start"
                                opacity={so(3)}
                                style={{ transition: t }}
                            >
                                – Patterns
                            </text>
                            <text
                                x="110" y="130"
                                fill={sc(3)}
                                fontSize="12" fontFamily="monospace" textAnchor="start"
                                opacity={so(3)}
                                style={{ transition: t }}
                            >
                                & Executions
                            </text>
                            {/* 3 — right content */}
                            <text
                                x="420" y="100"
                                fill={sc(3)}
                                fontSize="12" fontFamily="monospace" textAnchor="start"
                                opacity={so(3)}
                                style={{ transition: t }}
                            >
                                – PROMPTS.md
                            </text>
                            <text
                                x="435" y="120"
                                fill={sc(3)}
                                fontSize="11" fontFamily="monospace" textAnchor="start"
                                opacity={so(3)}
                                style={{ transition: t }}
                            >
                                (Index)
                            </text>
                            <text
                                x="420" y="140"
                                fill={sc(3)}
                                fontSize="12" fontFamily="monospace" textAnchor="start"
                                opacity={so(3)}
                                style={{ transition: t }}
                            >
                                & category files
                            </text>

                            {/* ═══════════ LAYER 2 — MIDDLE CIRCLE ═══════════ */}
                            <circle
                                cx="300" cy="260" r="150"
                                fill="none"
                                stroke={rc(2)}
                                strokeWidth={activeLayer === 2 ? 3 : 2}
                                opacity={ro(2)}
                                style={{ transition: t }}
                            />
                            {/* 2 — number + title at top of ring */}
                            <text
                                x="300" y="135"
                                fill={tc(2)}
                                fontSize="22" fontFamily="monospace" textAnchor="middle" fontWeight="700"
                                opacity={to2(2)}
                                style={{ transition: t }}
                            >
                                2
                            </text>
                            <text
                                x="300" y="160"
                                fill={tc(2)}
                                fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="600"
                                opacity={to2(2)}
                                style={{ transition: t }}
                            >
                                Loaded per Session
                            </text>
                            {/* 2 — content below inner circle (still inside ring 2) */}
                            <text
                                x="300" y="370"
                                fill={sc(2)}
                                fontSize="14" fontFamily="monospace" textAnchor="middle"
                                opacity={so(2)}
                                style={{ transition: t }}
                            >
                                – HANDOVER.md (the map)
                            </text>
                            <text
                                x="300" y="393"
                                fill={sc(2)}
                                fontSize="14" fontFamily="monospace" textAnchor="middle"
                                opacity={so(2)}
                                style={{ transition: t }}
                            >
                                {'& Domain Docs'}
                            </text>

                            {/* ═══════════ LAYER 1 — INNER CIRCLE ═══════════ */}
                            <circle
                                cx="300" cy="260" r="72"
                                fill="none"
                                stroke={rc(1)}
                                strokeWidth={activeLayer === 1 ? 3 : 2}
                                opacity={ro(1)}
                                style={{ transition: t }}
                            />
                            {/* 1 — title */}
                            <text
                                x="300" y="244"
                                fill={tc(1)}
                                fontSize="16" fontFamily="monospace" textAnchor="middle" fontWeight="700"
                                opacity={activeLayer === 1 ? 1 : activeLayer !== null ? 0.1 : 0.9}
                                style={{ transition: t }}
                            >
                                1 · Always
                            </text>
                            {/* 1 — content */}
                            <text
                                x="300" y="270"
                                fill={sc(1)}
                                fontSize="13" fontFamily="monospace" textAnchor="middle"
                                opacity={activeLayer === 1 ? 1 : activeLayer !== null ? 0.08 : 0.7}
                                style={{ transition: t }}
                            >
                                .cursorrules
                            </text>
                            <text
                                x="300" y="288"
                                fill={sc(1)}
                                fontSize="12" fontFamily="monospace" textAnchor="middle"
                                opacity={activeLayer === 1 ? 1 : activeLayer !== null ? 0.08 : 0.7}
                                style={{ transition: t }}
                            >
                                type files
                            </text>

                            {/* ═══════════ SUPPORTING LAYER ═══════════ */}
                            <line
                                x1="300" y1="503" x2="300" y2="530"
                                stroke="#71717a" strokeWidth="1.5" strokeDasharray="2 4"
                                opacity={activeLayer !== null ? 0.12 : 0.5}
                                style={{ transition: "opacity 0.35s" }}
                            />
                            <rect
                                x="80" y="535" width="440" height="105" rx="16"
                                fill="none"
                                stroke={activeLayer === null ? "#52525b" : "#27272a"}
                                strokeWidth="1.5"
                                opacity={activeLayer !== null ? 0.12 : 0.5}
                                style={{ transition: "opacity 0.35s, stroke 0.35s" }}
                            />
                            <text
                                x="300" y="562"
                                fill={activeLayer === null ? "#a1a1aa" : "#3f3f46"}
                                fontSize="15" fontFamily="monospace" textAnchor="middle" fontWeight="600"
                                opacity={activeLayer !== null ? 0.12 : 0.7}
                                style={{ transition: "opacity 0.35s, fill 0.35s" }}
                            >
                                Supporting Layer
                            </text>
                            {/* Skills pill */}
                            <rect
                                x="100" y="575" width="180" height="48" rx="24"
                                fill="none"
                                stroke={activeLayer === null ? "#71717a" : "#27272a"}
                                strokeWidth="1.5"
                                opacity={activeLayer !== null ? 0.1 : 0.5}
                                style={{ transition: "opacity 0.35s, stroke 0.35s" }}
                            />
                            <text
                                x="190" y="596"
                                fill={activeLayer === null ? "#e4e4e7" : "#3f3f46"}
                                fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="600"
                                opacity={activeLayer !== null ? 0.1 : 0.75}
                                style={{ transition: "opacity 0.35s, fill 0.35s" }}
                            >
                                SKILLS
                            </text>
                            <text
                                x="190" y="614"
                                fill={activeLayer === null ? "#71717a" : "#3f3f46"}
                                fontSize="11" fontFamily="monospace" textAnchor="middle"
                                opacity={activeLayer !== null ? 0.1 : 0.5}
                                style={{ transition: "opacity 0.35s, fill 0.35s" }}
                            >
                                (Role Personas)
                            </text>
                            {/* Security pill */}
                            <rect
                                x="320" y="575" width="180" height="48" rx="24"
                                fill="none"
                                stroke={activeLayer === null ? "#71717a" : "#27272a"}
                                strokeWidth="1.5"
                                opacity={activeLayer !== null ? 0.1 : 0.5}
                                style={{ transition: "opacity 0.35s, stroke 0.35s" }}
                            />
                            <text
                                x="410" y="596"
                                fill={activeLayer === null ? "#e4e4e7" : "#3f3f46"}
                                fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="600"
                                opacity={activeLayer !== null ? 0.1 : 0.75}
                                style={{ transition: "opacity 0.35s, fill 0.35s" }}
                            >
                                Security Files
                            </text>
                            <text
                                x="410" y="614"
                                fill={activeLayer === null ? "#71717a" : "#3f3f46"}
                                fontSize="11" fontFamily="monospace" textAnchor="middle"
                                opacity={activeLayer !== null ? 0.1 : 0.5}
                                style={{ transition: "opacity 0.35s, fill 0.35s" }}
                            >
                                (threat models)
                            </text>
                        </svg>
                    </div>
                </motion.div>

                {/* Terminal / Chat Interface Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease, delay: 0.2 }}
                    className="mt-20 md:mt-32 max-w-4xl mx-auto"
                >
                    <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden shadow-2xl">
                        {/* Fake Browser/Terminal Header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.01]">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                            </div>
                        </div>

                        {/* Chat Body */}
                        <div className="p-6 md:p-8 space-y-6">
                            {/* User Message */}
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-[13px] font-medium text-zinc-300">You</p>
                                    <div className="text-[14px] text-zinc-300">
                                        Update the user profile component to save the new avatar URL to the database.
                                    </div>
                                    <div className="mt-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[13px] text-red-400/90 relative inline-block">
                                        <div className="absolute -top-2.5 left-3 px-1.5 bg-[#0a0a0a] text-[9px] font-mono tracking-wider text-red-500 uppercase">Without LaunchX</div>
                                        "Sure, I will import <code>@supabase/supabase-js</code> directly into the React component and run an update query."
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/[0.04]" />

                            {/* AI Message */}
                            <div className="flex gap-4">
                                <div className="relative w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-emerald-500/10 border border-emerald-500/20">
                                    <span className="text-emerald-400 text-[14px] font-mono">X</span>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <p className="text-[13px] font-medium text-emerald-400">With LaunchX</p>
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-[12px] font-mono text-zinc-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polyline points="20 6 9 17 4 12" /></svg>
                                                Reading .cursorrules...
                                            </div>
                                            <div className="flex items-center gap-2 text-[12px] font-mono text-zinc-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polyline points="20 6 9 17 4 12" /></svg>
                                                Loading /docs/database.md...
                                            </div>
                                        </div>
                                        <div className="text-[14px] text-zinc-300">
                                            I'll create a new Server Action for this update. According to your <code className="text-emerald-400 bg-emerald-500/10 px-1 rounded">.cursorrules</code>, we never run mutations directly from client components. Instead, we use the pre-configured Supabase Server Client.
                                        </div>

                                        <div className="mt-2 text-[13px] text-zinc-500">
                                            Writing to <code>actions/user.ts</code>...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div >
        </section >
    );
}
