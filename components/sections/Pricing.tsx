"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-20 text-center md:text-left"
        >
          <h2 className="text-section mb-4">Simple, transparent pricing.</h2>
          <p className="text-zinc-500 max-w-lg text-[15px]">
            Pay once, build forever. No monthly fees or hidden costs.
            Get 50% off during our early access period.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Option 1: Single Template */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 hover:bg-white/[0.03] transition-all duration-300"
          >
            <h3 className="text-lg font-medium text-white mb-2">Single Template</h3>
            <p className="text-zinc-500 text-[13px] mb-6">
              Perfect if you just need one specific starter kit.
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-zinc-500 text-[15px]">from</span>
              <span className="text-zinc-600 line-through text-[20px]">$200</span>
              <span className="text-[42px] font-semibold text-emerald-400">$99</span>
              <span className="text-zinc-500 text-[14px]">/lifetime</span>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "One template of your choice",
                "Full source code ownership",
                "Lifetime updates",
                "Community access",
                "Commercial license",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-zinc-400">
                  <Check className="w-4 h-4 text-emerald-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <a href="/waitlist" className="block">
              <button className="w-full py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-[14px] text-zinc-300 font-medium hover:bg-white/[0.1] hover:border-white/[0.15] hover:text-white transition-all duration-200">
                Join waitlist
              </button>
            </a>
          </motion.div>

          {/* Option 2: All-Access Bundle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="rounded-2xl bg-white/[0.04] border border-emerald-500/30 p-8 shadow-[0_0_50px_-20px_rgba(16,185,129,0.15)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium uppercase tracking-wider">
                Best Value
              </span>
            </div>

            <h3 className="text-lg font-medium text-white mb-2">All-Access Bundle</h3>
            <p className="text-zinc-400 text-[13px] mb-6">
              Get everything we've built and will build.
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-zinc-600 line-through text-[22px]">$1,600</span>
              <span className="text-[48px] font-semibold text-emerald-400">$399</span>
              <span className="text-zinc-500 text-[14px]">/lifetime</span>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "All 5 current templates",
                "Future templates included free",
                "Prioritized for feature requests",
                "Priority email support",
                "Unlimited projects",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[14px] text-zinc-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-emerald-500" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <a href="/waitlist" className="block">
              <button className="w-full py-3 rounded-xl bg-white text-black text-[14px] font-medium hover:bg-zinc-200 transition-all duration-200">
                Get early access
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
