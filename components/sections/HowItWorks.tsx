"use client";

import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const steps = [
    {
        number: "01",
        title: "Pick a template",
        description:
            "Choose from 5 production-ready kits: AI Wrapper, Chrome Extension, Landing Page, Mobile App, or Dashboard.",
    },
    {
        number: "02",
        title: "Run the setup",
        description:
            "npx launchx-setup auto-configures env variables, connects Clerk, Supabase, and Stripe.",
    },
    {
        number: "03",
        title: "Ship it",
        description:
            "Deploy to Vercel in one click. Your AI assistant already knows your entire codebase.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease }}
                    className="mb-20"
                >
                    <h2 className="text-section mb-4">How it works</h2>
                    <p className="text-zinc-500 max-w-md text-[15px]">
                        From zero to deployed in three steps.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
                    {/* Connecting line — desktop only */}
                    <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-px bg-white/[0.06]" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                            className="relative"
                        >
                            {/* Step number */}
                            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-6">
                                <span className="font-mono text-[13px] text-zinc-500">
                                    {step.number}
                                </span>
                            </div>

                            <h3 className="text-lg font-medium tracking-tight mb-2 text-white">
                                {step.title}
                            </h3>
                            <p className="text-[14px] text-zinc-500 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
