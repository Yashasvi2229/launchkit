"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const faqItems = [
  {
    question: "How is this different from other boilerplates?",
    answer:
      "Most templates just give you code. LaunchX gives your AI memory. We built a 3-layer skill graph into the codebase that teaches Cursor, Windsurf, or Copilot exactly how your architecture works, so it stops breaking patterns in Week 3.",
  },
  {
    question: "Wait, does this consume a ton of my premium AI requests?",
    answer:
      "Actually, it saves them. LaunchX uses a self-directing 'Session Bootstrap' (HANDOVER.md). Instead of dumping 50 files into context, the AI only loads the specific domain files it needs (e.g., just the payments logic). You use fewer tokens and get correct code on the first try.",
  },
  {
    question: "Is this just a bundle of prompts?",
    answer:
      "No. You get 5 complete, production-ready SaaS templates, plus the invisible 'AI Layer' — the .cursorrules, the domain context maps, and a library of 200+ established patterns that ensure your AI writes secure, consistent code.",
  },
  {
    question: "I already know how to code, is this for me?",
    answer:
      "If you're tired of explaining the same rate-limiting rules or component schemas to your AI over and over, yes. LaunchX acts as your architectural enforcer, so you can spend your time engineering features instead of reviewing AI typos.",
  },
  {
    question: "Can I use this for client projects?",
    answer:
      "Absolutely. Unlimited projects, no per-project fees. Deliver robust, AI-maintainable codebases to your clients.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <h2 className="text-section mb-4">Frequently asked questions</h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          <Accordion items={faqItems} />
        </motion.div>
      </div>
    </section>
  );
}
