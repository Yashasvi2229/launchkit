"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Star } from "lucide-react";
import { CheckItem } from "./shared/CheckItem";

export function MexScaffold() {
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/theDakshJaitly/mex")
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => {
        // Keep the button usable even if the GitHub API request fails.
      });
  }, []);

  return (
    <section id="mex-integration" className="scroll-mt-20 rounded-3xl border border-blue-500/25 bg-gradient-to-b from-blue-950/40 via-blue-950/20 to-transparent p-8">
      <div className="mb-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <h2 className="text-[48px] font-bold text-white tracking-tighter mb-6 leading-none">
            Mex<span className="text-blue-500">.</span>
          </h2>
          <p className="text-zinc-400 text-[17px] leading-relaxed max-w-2xl">
            Mex is the context layer that keeps AI assistance aligned with your repository. It tracks structure, validates links, and flags documentation drift before it becomes an implementation issue.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <a
              href="/mex"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors"
            >
              Explore Mex
            </a>
            <a
              href="https://github.com/theDakshJaitly/mex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-blue-300 border border-blue-400/35 bg-blue-500/10 hover:border-blue-400/60 transition-colors"
            >
              <span>Star on GitHub</span>
              {starCount !== null ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-blue-400/30 bg-blue-500/15 text-[12px] font-mono">
                  <Star className="w-3 h-3" fill="currentColor" />
                  {starCount}
                </span>
              ) : (
                <Star className="w-3.5 h-3.5" />
              )}
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <motion.img
            src="/mex-mascot.svg"
            alt="mex mascot"
            className="w-24 md:w-28 lg:w-32 drop-shadow-2xl"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      <div className="space-y-16">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-[24px] font-bold text-white">The Scaffold Strategy</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
          </div>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
            LaunchX ships with a dedicated <code className="text-blue-400 bg-blue-500/5 px-1.5 py-0.5 rounded">.mex/</code> directory. Treat it as an operational index for AI context loading, not as user-facing product documentation.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "ROUTER.md", desc: "The session entry point. Maps user tasks to specific architecture files." },
              { label: "HANDOVER.md", desc: "Maintains cross-session state. Tells the AI what was finished and what's next." },
              { label: "CONVENTIONS.md", desc: "Enforces your library choices (DaisyUI, Supabase) and prevents legacy code patterns." }
            ].map(file => (
              <div key={file.label} className="p-6 rounded-2xl border border-white/[0.05] bg-zinc-900/40">
                <div className="text-blue-500 font-mono text-[13px] mb-3">{file.label}</div>
                <p className="text-zinc-500 text-[13px] leading-relaxed">{file.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-[24px] font-bold text-white">Deterministic Drift Detection</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
          </div>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-10">
            The <code className="text-blue-400">promexeus</code> engine runs deterministic checks to keep context files synchronized with implementation changes.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <CheckItem 
              title="Path Validation" 
              code="MISSING_PATH" 
              severity="error"
              description="Verifies that every file quoted in your docs actually exists on disk. Prevents AI from looking for deleted files."
            />
            <CheckItem 
              title="Graph Integrity" 
              code="DEAD_EDGE" 
              severity="error"
              description="Checks the internal links in .mex/ files. Ensures the AI can 'navigate' the documentation web without hits."
            />
            <CheckItem 
              title="Orphan Detection" 
              code="INDEX_ORPHAN" 
              severity="warning"
              description="Identifies pattern files that aren't linked in the main index, ensuring all context is reachable."
            />
            <CheckItem 
              title="Version Staleness" 
              code="STALE_PATH" 
              severity="warning"
              description="Signals if the codebase has changed significantly (via git log) since the context file was last updated."
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-[24px] font-bold text-white">CLI Core</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
          </div>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            Manage your agent memory via the terminal. The <code className="text-white bg-zinc-800 px-1.5 py-0.5 rounded">promexeus</code> CLI is baked into LaunchX.
          </p>
          <div className="space-y-8">
            <div className="p-8 rounded-[2rem] bg-[#0c0c0e] border border-white/[0.05] shadow-2xl">
              <h4 className="text-white font-semibold mb-2">Check Project Health</h4>
              <p className="text-zinc-500 text-[13px] mb-6">Scans the entire scaffold for drift and outputs a 'Drift Score' (0-100).</p>
              <CodeBlock language="bash" plain>{`npx promexeus check`}</CodeBlock>
            </div>
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20">
              <h4 className="text-blue-400 font-semibold mb-2">Targeted Context Sync</h4>
              <p className="text-blue-100/40 text-[13px] mb-6">Generates a focused prompt to update only the drifted scaffold segments.</p>
              <CodeBlock language="bash" plain>{`npx promexeus sync`}</CodeBlock>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/[0.05] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
          <h4 className="text-[18px] font-bold text-white mb-6">The Engineering Protocol</h4>
          <p className="text-zinc-400 text-[14px] leading-relaxed mb-8">
            Keep context healthy by following the BUILD {"->"} VERIFY {"->"} GROW loop.
          </p>
          <div className="space-y-4">
            {[
              { step: "01", title: "Build", text: "Write code using the context from the .mex scaffold." },
              { step: "02", title: "Verify", text: "Run tests and linting to ensure technical correctness." },
              { step: "03", title: "Grow", text: "Update the .mex files with any new patterns or decisions made during the build." }
            ].map(item => (
              <div key={item.step} className="flex gap-4 items-start p-4 rounded-xl border border-white/[0.03] bg-white/[0.01]">
                <span className="font-mono text-[12px] text-blue-500 mt-1">{item.step}</span>
                <div>
                  <h5 className="text-white font-medium text-[14px]">{item.title}</h5>
                  <p className="text-zinc-500 text-[12px]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
