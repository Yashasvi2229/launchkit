"use client";

import { motion } from "framer-motion";
import { Accordion } from "@/components/ui";

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const faqItems = [
  {
    question: "How is this different from other boilerplates?",
    answer:
      "Most boilerplates are just code. LaunchKit includes .cursorrules that teach AI your entire architecture — cutting token usage by 80%. Plus one-command setup and living updates that keep templates current.",
  },
  {
    question: "Will this work with my Cursor subscription?",
    answer:
      "Yes. It makes your subscription 10x more valuable. Use 50 requests for setup instead of 500. That leaves 450 for actual features. Your monthly limit goes much further.",
  },
  {
    question: "Can I use this for client projects?",
    answer:
      "Absolutely. Unlimited projects, no per-project fees. Build as many client projects as you want with one purchase.",
  },
  {
    question: "What if I'm already halfway through a project?",
    answer:
      "We include migration guides to adopt LaunchKit patterns into existing projects. Gradually improve your codebase without starting over.",
  },
  {
    question: "When does this launch?",
    answer:
      "Late February 2026. Join the waitlist to lock in the 50% discount and get notified the moment we go live.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "Basic React and Next.js knowledge helps. If you can use Cursor, you can use LaunchKit. The AI handles the heavy lifting.",
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
