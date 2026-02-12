"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 relative">
      {/* Subtle top gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="max-w-2xl mx-auto px-6 md:px-12 lg:px-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-heading mb-4">Ready to ship faster?</h2>
          <p className="text-zinc-500 mb-10 text-[16px] leading-relaxed">
            Join{" "}
            <span className="text-white font-medium">247 developers</span>{" "}
            getting early access and 50% off at launch.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <a href="/waitlist">
            <Button variant="primary" className="text-[15px] px-10 py-3 rounded-full mb-4">
              Join the waitlist
            </Button>
          </a>
          <div className="flex items-center gap-2 text-[13px] text-zinc-600">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            8 early-bird spots remaining
          </div>
        </motion.div>
      </div>
    </section>
  );
}
