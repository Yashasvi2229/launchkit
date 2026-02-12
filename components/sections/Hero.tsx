"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
  PrismaticBurst,
  Button,
} from "@/components/ui";
import { LineShadowText } from "@/components/ui/line-shadow-text";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-black flex items-center"
    >
      {/* PrismaticBurst Background */}
      <div className="absolute inset-0 z-0">
        <PrismaticBurst
          intensity={2.5}
          speed={0.3}
          animationType="rotate3d"
          colors={["#606060", "#232323"]}
          distort={0}
          hoverDampness={0.15}
          rayCount={0}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pt-6 pb-20">
        {/* Logo / Branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          className="mb-8"
        >
          <span className="text-[15px] font-medium tracking-tight text-white">
            LaunchKit
          </span>
        </motion.div>

        {/* Rounded hero card */}
        <div className="rounded-3xl border border-white/[0.08] bg-black/40 backdrop-blur-sm p-6 md:p-12 lg:p-16">
          {/* Two-column grid: Left = copy + CTA, Right = terminal */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Left column */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <span className="inline-flex items-center gap-2 text-[13px] text-zinc-400 border border-white/10 rounded-full px-4 py-1.5 mb-6 md:mb-8">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  247 developers on the waitlist
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
                className="text-hero mb-4 md:mb-5"
              >
                1 command.
                <br />
                1 weekend.
                <br />
                <span className="font-mono text-zinc-500">
                  1 SaaS{" "}
                  <LineShadowText className="italic" shadowColor="#22c55e">
                    shipped.
                  </LineShadowText>
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
                className="text-[16px] text-zinc-400 max-w-md mb-6 md:mb-8 leading-relaxed"
              >
                AI-optimized Next.js templates that make vibe coding actually
                work. Your AI writes better code because it finally understands
                your architecture.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.3 }}
              >
                {/* Urgency — above the button */}
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <p className="text-[13px] text-zinc-400">
                    50% off for first 100 signups
                  </p>
                  <span className="text-zinc-700 text-[10px]">·</span>
                  <div className="flex items-center gap-1.5 text-[13px] text-emerald-400">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    8 spots left
                  </div>
                </div>

                {/* Button — prominent, solid */}
                <a href="/waitlist">
                  <button className="w-full sm:w-auto max-w-full bg-white text-black font-medium text-[16px] px-6 py-3 sm:px-10 sm:py-3.5 rounded-full hover:bg-zinc-200 transition-colors duration-200 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
                    Get early access →
                  </button>
                </a>
              </motion.div>
            </div>

            {/* Right column — Animated Terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
            >
              <Terminal className="w-full">
                <TypingAnimation>&gt; npx launchkit-setup</TypingAnimation>

                <AnimatedSpan className="text-zinc-400">
                  ◌ Initializing LaunchKit...
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500">
                  ✔ Clerk authentication configured
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500">
                  ✔ Supabase database connected
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500">
                  ✔ Stripe payments integrated
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500">
                  ✔ .cursorrules loaded (127 rules)
                </AnimatedSpan>

                <AnimatedSpan className="text-zinc-400">
                  ◌ Deploying to Vercel...
                </AnimatedSpan>

                <AnimatedSpan className="text-green-500 font-bold">
                  ✔ YOUR APP IS LIVE
                </AnimatedSpan>

                <TypingAnimation className="text-zinc-500">
                  Done in 4m 32s. Start building features.
                </TypingAnimation>
              </Terminal>

              {/* Value pills — directly below terminal */}
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[13px] text-zinc-300">
                  80% fewer AI tokens
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[13px] text-zinc-300">
                  5 production templates
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[13px] text-zinc-300">
                  200+ tested prompts
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[13px] text-zinc-300">
                  5 min to deploy
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
