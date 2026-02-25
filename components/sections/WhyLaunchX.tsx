"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useWaitlistSpots } from "@/hooks/use-waitlist-spots";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const comparisonRows = [
    {
        generic: "1.2M tokens consumed",
        launchx: "80K tokens consumed",
    },
    {
        generic: "$180 in Claude API costs",
        launchx: "$12 in Claude API costs",
    },
    {
        generic: "Hit Cursor rate limit by week 2",
        launchx: "Never hit limits",
    },
    {
        generic: "AI breaks patterns every 5th feature",
        launchx: "AI follows conventions 100%",
    },
    {
        generic: "3 weeks to ship, 2 weeks fixing",
        launchx: "Ship in 1 weekend",
    },
    {
        generic: "Code style drifts across files",
        launchx: "Production-ready patterns",
    },
    {
        generic: "No architectural context",
        launchx: "AI learns your codebase",
    },
];

const sliderStops = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const GENERIC_TEMPLATE_COST = 250;
const GENERIC_AI_COST = 50;
const GENERIC_TOOLS_COST = 40;
const GENERIC_WEEKS = 4;
const LAUNCHX_PRICE = 199;
const LAUNCHX_AI_COST = 15;
const LAUNCHX_TOOLS_COST = 20;
const LAUNCHX_WEEKENDS = 1;

export function WhyLaunchX() {
    const [projects, setProjects] = useState(3);
    const { spotsLeft } = useWaitlistSpots();

    const calc = useMemo(() => {
        const genericTemplate = GENERIC_TEMPLATE_COST;
        const genericAI = projects * GENERIC_AI_COST;
        const genericTools = projects * GENERIC_TOOLS_COST;
        const genericWeeks = projects * GENERIC_WEEKS;
        const genericTotal = genericTemplate + genericAI + genericTools;

        const launchxAI = projects * LAUNCHX_AI_COST;
        const launchxTools = projects * LAUNCHX_TOOLS_COST;
        const launchxTotal = LAUNCHX_PRICE + launchxAI + launchxTools;
        const launchxWeekends = projects * LAUNCHX_WEEKENDS;

        const savings = genericTotal - launchxTotal;
        const weeksSaved = genericWeeks - launchxWeekends;
        const roi = launchxTotal > 0 ? Math.round((savings / launchxTotal) * 100) : 0;

        return { genericTemplate, genericAI, genericTools, genericWeeks, genericTotal, launchxAI, launchxTools, launchxTotal, launchxWeekends, savings, weeksSaved, roi };
    }, [projects]);

    return (
        <section id="why-launchx" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
                {/* ── Block 1: Comparison Table ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-20 md:mb-28"
                >
                    <p className="text-[13px] font-mono text-emerald-400 mb-4 tracking-wide">
                        WHY LAUNCHX
                    </p>
                    <h2 className="text-[28px] md:text-[32px] font-medium tracking-tight text-white mb-4 leading-tight max-w-2xl">
                        Why LaunchX costs less than building from scratch
                    </h2>
                    <p className="text-zinc-400 text-[16px] leading-relaxed mb-10 max-w-xl">
                        Generic templates burn tokens because your AI has no context.
                        LaunchX gives it a complete understanding of your codebase — so
                        you ship faster, spend less on API costs, and never hit rate limits.
                    </p>

                    {/* Comparison Table */}
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        {/* Left — Generic Template */}
                        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 md:p-6">
                            <h3 className="text-[14px] font-medium text-zinc-400 mb-5 tracking-tight">
                                Generic Template + AI Coding
                            </h3>
                            <div className="space-y-3.5">
                                {comparisonRows.map((row, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3"
                                    >
                                        <X
                                            size={16}
                                            strokeWidth={2}
                                            className="text-red-400 mt-0.5 flex-shrink-0"
                                        />
                                        <span className="text-[13px] text-zinc-500 leading-relaxed">
                                            {row.generic}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right — LaunchX */}
                        <div className="rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/20 p-5 md:p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <h3 className="text-[14px] font-medium text-white tracking-tight">
                                    LaunchX
                                </h3>
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono font-medium">
                                    90% fewer tokens
                                </span>
                            </div>
                            <div className="space-y-3.5">
                                {comparisonRows.map((row, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-3"
                                    >
                                        <Check
                                            size={16}
                                            strokeWidth={2}
                                            className="text-emerald-400 mt-0.5 flex-shrink-0"
                                        />
                                        <span className="text-[13px] text-zinc-300 leading-relaxed">
                                            {row.launchx}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Block 2: The Math — Cost Breakdown ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-20 md:mb-28"
                >
                    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 md:p-10">
                        <p className="text-[13px] font-mono text-zinc-500 mb-6 tracking-wide">
                            THE MATH
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
                            {/* Generic Template costs */}
                            <div>
                                <h3 className="text-[14px] font-medium text-zinc-400 mb-5">
                                    Building with a generic template
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">
                                            Generic template
                                        </span>
                                        <span className="text-[14px] text-zinc-300 font-medium">
                                            $200 – $300
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">
                                            AI token costs
                                        </span>
                                        <span className="text-[14px] text-zinc-300 font-medium">
                                            $30 – $80
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">
                                            Other AI tools
                                        </span>
                                        <span className="text-[14px] text-zinc-300 font-medium">
                                            $30 – $50
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">
                                            Your time
                                        </span>
                                        <span className="text-[14px] text-zinc-300 font-medium">
                                            3 – 4 weeks
                                        </span>
                                    </div>
                                    <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-400 font-medium">
                                            Total
                                        </span>
                                        <span className="text-[16px] text-white font-medium">
                                            ~$340 per project
                                        </span>
                                    </div>
                                </div>

                                {/* Bar visualization */}
                                <div className="mt-4 h-3 rounded-full bg-red-400/20 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-red-400/60 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 1,
                                            ease,
                                            delay: 0.3,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* LaunchX costs */}
                            <div>
                                <h3 className="text-[14px] font-medium text-white mb-5">
                                    Building with LaunchX
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">
                                            One-time template
                                        </span>
                                        <span className="text-[14px] text-emerald-400 font-medium">
                                            $199
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">
                                            AI costs
                                        </span>
                                        <span className="text-[14px] text-emerald-400 font-medium">
                                            $10 – $15
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">
                                            Other AI tools
                                        </span>
                                        <span className="text-[14px] text-emerald-400 font-medium">
                                            $20
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">
                                            Your time
                                        </span>
                                        <span className="text-[14px] text-emerald-400 font-medium">
                                            1 weekend
                                        </span>
                                    </div>
                                    <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-400 font-medium">
                                            Total
                                        </span>
                                        <span className="text-[16px] text-emerald-400 font-medium">
                                            ~$234
                                        </span>
                                    </div>
                                </div>

                                {/* Bar visualization — much shorter */}
                                <div className="mt-4 h-3 rounded-full bg-emerald-400/10 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-emerald-400/60 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "55%" }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 1,
                                            ease,
                                            delay: 0.5,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bottom line */}
                        <div className="border-t border-white/[0.06] pt-6 text-center">
                            <p className="text-[16px] md:text-[18px] text-white font-medium">
                                You save:{" "}
                                <span className="text-emerald-400">
                                    ~$105
                                </span>{" "}
                                and{" "}
                                <span className="text-emerald-400">
                                    3 weeks
                                </span>{" "}
                                on your first project.
                            </p>
                            <p className="text-[13px] text-zinc-500 mt-2">
                                Even more on every project after — no repeat template cost.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ── Block 3: Interactive Savings Calculator ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                >
                    <h2 className="text-[28px] md:text-[32px] font-medium tracking-tight text-white mb-4 leading-tight text-center">
                        Calculate your savings
                    </h2>
                    <p className="text-zinc-500 text-[15px] text-center mb-12 max-w-lg mx-auto">
                        LaunchX pays for itself on project 1. After that, it&apos;s pure profit.
                    </p>

                    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 md:p-10">
                        {/* Slider */}
                        <div className="mb-10">
                            <p className="text-[14px] text-zinc-300 mb-6 text-center">
                                How many SaaS projects will you ship in the next 12 months?
                            </p>
                            <div className="max-w-md mx-auto">
                                <div className="px-[10px]">
                                    <input
                                        type="range"
                                        min={0}
                                        max={sliderStops.length - 1}
                                        value={sliderStops.indexOf(projects)}
                                        onChange={(e) => setProjects(sliderStops[parseInt(e.target.value)])}
                                        tabIndex={-1}
                                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-zinc-800 accent-emerald-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(52,211,153,0.4)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                                    />
                                </div>
                                <div className="flex justify-between mt-2 px-[10px]">
                                    {sliderStops.map((n) => (
                                        <button
                                            key={n}
                                            onClick={() => setProjects(n)}
                                            className={`text-[11px] font-mono transition-colors cursor-pointer w-5 text-center ${n === projects ? "text-emerald-400" : "text-zinc-600 hover:text-zinc-400"
                                                }`}
                                        >
                                            {n === 10 ? "10+" : n}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p className="text-center mt-5">
                                <span className="text-[14px] text-zinc-400">You selected: </span>
                                <span className="text-[14px] text-white font-medium">
                                    {projects === 10 ? "10+" : projects} project{projects !== 1 ? "s" : ""}
                                </span>
                            </p>
                        </div>

                        {/* Two-column comparison */}
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
                            {/* WITHOUT LaunchX */}
                            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5 md:p-6">
                                <h3 className="text-[14px] font-medium text-zinc-400 mb-5 tracking-tight">
                                    WITHOUT LaunchX
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">Generic template</span>
                                        <span className="text-[14px] text-zinc-300 font-medium">
                                            ${calc.genericTemplate.toLocaleString()} <span className="text-zinc-600 text-[11px]">(one-time)</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">AI token costs</span>
                                        <span className="text-[14px] text-zinc-300 font-medium">
                                            ${calc.genericAI.toLocaleString()} <span className="text-zinc-600 text-[11px]">({projects} x ${GENERIC_AI_COST})</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">Other AI tools</span>
                                        <span className="text-[14px] text-zinc-300 font-medium">
                                            ${calc.genericTools.toLocaleString()} <span className="text-zinc-600 text-[11px]">({projects} x ${GENERIC_TOOLS_COST})</span>
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">Time spent</span>
                                        <span className="text-[14px] text-zinc-300 font-medium">{calc.genericWeeks} weeks</span>
                                    </div>
                                    <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-400 font-medium">Total cost</span>
                                        <span className="text-[16px] text-red-400 font-medium">
                                            ${calc.genericTotal.toLocaleString()} <span className="text-zinc-500 text-[13px] font-normal">+ {calc.genericWeeks} weeks</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* WITH LaunchX */}
                            <div className="rounded-xl bg-emerald-500/[0.03] border border-emerald-500/20 p-5 md:p-6">
                                <h3 className="text-[14px] font-medium text-white mb-5 tracking-tight">
                                    WITH LaunchX
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">LaunchX template (one-time)</span>
                                        <span className="text-[14px] text-emerald-400 font-medium">${LAUNCHX_PRICE}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">AI token costs</span>
                                        <span className="text-[14px] text-emerald-400 font-medium">
                                            ${calc.launchxAI} <span className="text-zinc-600 text-[11px]">({projects} x ${LAUNCHX_AI_COST})</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">Other AI tools</span>
                                        <span className="text-[14px] text-emerald-400 font-medium">
                                            ${calc.launchxTools} <span className="text-zinc-600 text-[11px]">({projects} x ${LAUNCHX_TOOLS_COST})</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-500">Time spent</span>
                                        <span className="text-[14px] text-emerald-400 font-medium">{calc.launchxWeekends} weekend{calc.launchxWeekends !== 1 ? "s" : ""}</span>
                                    </div>
                                    <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
                                        <span className="text-[13px] text-zinc-400 font-medium">Total cost</span>
                                        <span className="text-[16px] text-emerald-400 font-medium">
                                            ${calc.launchxTotal.toLocaleString()} <span className="text-zinc-500 text-[13px] font-normal">+ {calc.launchxWeekends} weekend{calc.launchxWeekends !== 1 ? "s" : ""}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Big savings callout */}
                        <div className="rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 p-6 md:p-8 text-center">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-4">
                                <div className="text-center">
                                    <p className="text-[11px] font-mono text-zinc-500 mb-1 tracking-wide">YOU SAVE</p>
                                    <p className="text-[32px] md:text-[40px] font-medium text-emerald-400 leading-none">
                                        ${calc.savings.toLocaleString()}
                                    </p>
                                    <p className="text-[13px] text-zinc-400 mt-1">+ {calc.weeksSaved} weeks</p>
                                </div>
                                <div className="hidden sm:block w-px h-16 bg-white/[0.06]" />
                                <div className="text-center">
                                    <p className="text-[11px] font-mono text-zinc-500 mb-1 tracking-wide">ROI</p>
                                    <p className="text-[32px] md:text-[40px] font-medium text-white leading-none">
                                        {calc.roi}%
                                    </p>
                                    <p className="text-[13px] text-zinc-400 mt-1">&nbsp;</p>
                                </div>
                            </div>
                            <p className="text-[13px] text-zinc-400 mt-4">
                                Every project after the first is{" "}
                                <span className="text-emerald-400 font-medium">60% cheaper</span>.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="mt-8 text-center">
                            <a href="/waitlist">
                                <button className="bg-white text-black font-medium text-[15px] px-8 py-3.5 rounded-full hover:bg-zinc-200 transition-colors duration-200 cursor-pointer">
                                    Get LaunchX — $199 ({spotsLeft !== null ? spotsLeft : "–"} spots left)
                                </button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
