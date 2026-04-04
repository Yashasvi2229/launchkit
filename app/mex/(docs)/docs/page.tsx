import Link from "next/link";
import { DocsSidebar } from "@/components/sections/mex/docs/DocsSidebar";
import { Mermaid } from "@/components/ui/mermaid";

export const metadata = {
  title: "Documentation — mex",
  description: "Complete guide and CLI reference for the mex persistent project memory tool.",
};

export default function DocsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 flex">
      <DocsSidebar />
      <main className="flex-1 py-12 lg:pl-16 w-full max-w-full lg:max-w-3xl min-w-0 overflow-x-hidden">
        <div className="mb-16">
          <h1 className="text-4xl font-space font-medium tracking-tight mb-4" style={{ color: "var(--mex-text)" }}>
            mex documentation
          </h1>
          <p className="text-[16px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
            A structured reference covering installation, navigation routing, CLI commands, and drift detection. Everything you need to prevent AI agent context loss.
          </p>
        </div>

        {/* Content sections to be populated later */}
        <div className="space-y-32">
          <section id="installation" className="scroll-mt-32">
            <h2 className="text-3xl font-space font-medium mb-8" style={{ color: "var(--mex-text)" }}>1. Installation</h2>
            
            <div className="space-y-16">
              <div id="prerequisites" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>Prerequisites</h3>
                <ul className="space-y-3 ms-6 list-disc marker:text-[var(--mex-border)]" style={{ color: "var(--mex-text-muted)" }}>
                  <li><strong style={{ color: "var(--mex-text)" }}>Node.js (v20 or later)</strong> — required for the CLI engine (drift detection, sync, scanner)</li>
                  <li><strong style={{ color: "var(--mex-text)" }}>Git</strong> — recommended for staleness detection</li>
                  <li><strong style={{ color: "var(--mex-text)" }}>An AI coding tool</strong> — Claude Code, Cursor, Windsurf, or GitHub Copilot. mex generates context files that these tools read automatically</li>
                </ul>
              </div>

              <div id="setup" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>Setup</h3>
                <p className="mb-4 text-[15px]" style={{ color: "var(--mex-text-muted)" }}>From your project root:</p>

                <div className="mb-8 rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: 'var(--mex-border)', background: 'var(--mex-bg-3)' }}>
                  <div className="flex items-center px-4 py-3 border-b bg-black/20" style={{ borderColor: 'var(--mex-border)' }}>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20 border border-amber-500/50" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                    </div>
                  </div>
                  <div className="p-5 font-mono text-[13px] md:text-[14px] leading-relaxed text-[#a1a1aa]">
                    <div><span className="text-emerald-400">npx</span> promexeus setup</div>
                  </div>
                </div>

                <p className="mb-5 font-medium" style={{ color: "var(--mex-text)" }}>The setup command does the following, in order:</p>
                <ol className="space-y-5 ms-6 list-decimal marker:font-mono marker:text-[var(--mex-primary)]" style={{ color: "var(--mex-text-muted)" }}>
                  <li className="pl-1">
                    <strong style={{ color: "var(--mex-text)" }}>Detects project state</strong><br/>
                    Scans for source files to determine if this is an existing codebase, a fresh project, or a partially populated scaffold.
                  </li>
                  <li className="pl-1">
                    <strong style={{ color: "var(--mex-text)" }}>Creates the .mex/ scaffold</strong><br/>
                    Copies all template files into <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)]">.mex/</code> in your project. If any files are already populated, they are skipped.
                  </li>
                  <li className="pl-1">
                    <strong style={{ color: "var(--mex-text)" }}>Copies tool config</strong><br/>
                    Asks which AI tool you use and copies the appropriate config file to your project root (<code className="font-mono text-[13px]">CLAUDE.md</code>, <code className="font-mono text-[13px]">.cursorrules</code>, <code className="font-mono text-[13px]">.windsurfrules</code>, or <code className="font-mono text-[13px]">.github/copilot-instructions.md</code>). You can select multiple tools. All config files contain the same content — they point the AI to read <code className="font-mono text-[13px] text-[var(--mex-primary)]">.mex/ROUTER.md</code> at the start of every session.
                  </li>
                  <li className="pl-1">
                    <strong style={{ color: "var(--mex-text)" }}>Pre-scans the codebase</strong><br/>
                    If source files exist, runs the built-in scanner to generate a structured brief of your codebase (entry points, dependencies, folder structure, tooling). This brief is fed to the AI so it doesn't have to explore the filesystem itself (~5-8k tokens vs ~50k).
                  </li>
                  <li className="pl-1">
                    <strong style={{ color: "var(--mex-text)" }}>Populates the scaffold</strong><br/>
                    If Claude Code is installed and was selected as the tool, it launches an interactive Claude session with a population prompt. Otherwise, it prints the prompt for you to paste into your AI tool. The AI reads your codebase (or the scanner brief) and fills every scaffold file — architecture, stack, conventions, decisions, setup, patterns.
                  </li>
                </ol>

                <div className="mt-8 p-4 rounded-xl border flex gap-3 text-[14px]" style={{ borderColor: 'rgba(65, 105, 225, 0.3)', background: 'rgba(65, 105, 225, 0.05)', color: 'var(--mex-text)' }}>
                  <div className="text-[var(--mex-primary)] font-bold text-lg leading-none">ℹ</div>
                  <div>Setup supports the <code className="font-mono text-[13px] text-[var(--mex-primary)]">--dry-run</code> flag to preview what would happen without making any changes.</div>
                </div>
              </div>

              <div id="using-mex" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>Using the mex command</h3>
                <p className="mb-4 text-[15px]" style={{ color: "var(--mex-text-muted)" }}>For ongoing use, install mex as a dev dependency:</p>

                <div className="mb-4 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--mex-border)', background: 'var(--mex-bg-3)' }}>
                  <div className="p-5 font-mono text-[13px] md:text-[14px] leading-relaxed text-[#a1a1aa] bg-black/20">
                    <div><span className="text-emerald-400">npm</span> install --save-dev promexeus</div>
                  </div>
                </div>
                <p className="text-[15px]" style={{ color: "var(--mex-text-muted)" }}>Then you can run <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border bg-[var(--mex-bg-3)] text-[var(--mex-primary)]" style={{ borderColor: 'var(--mex-border)' }}>mex check</code>, <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border bg-[var(--mex-bg-3)] text-[var(--mex-primary)]" style={{ borderColor: 'var(--mex-border)' }}>mex sync</code>, etc. from your project root. You can also add scripts to your <code className="font-mono text-[13px]">package.json</code>:</p>
                <div className="mt-4 mb-4 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--mex-border)', background: 'var(--mex-bg-3)' }}>
                  <div className="p-5 font-mono text-[13px] md:text-[14px] leading-relaxed text-[#a1a1aa] bg-black/20">
                    <div><span className="text-[#52525b]">{`"scripts": {`}</span></div>
                    <div><span className="text-[#52525b]">{"  "}</span><span className="text-emerald-400">{`"mex"`}</span>: <span className="text-amber-300">{`"mex check"`}</span>,</div>
                    <div><span className="text-[#52525b]">{"  "}</span><span className="text-emerald-400">{`"mex:sync"`}</span>: <span className="text-amber-300">{`"mex sync"`}</span></div>
                    <div><span className="text-[#52525b]">{`}`}</span></div>
                  </div>
                </div>
              </div>

              <div id="updating" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>Updating mex</h3>
                <p className="mb-4 text-[15px]" style={{ color: "var(--mex-text-muted)" }}>To update to the latest version:</p>

                <div className="mb-4 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--mex-border)', background: 'var(--mex-bg-3)' }}>
                  <div className="p-5 font-mono text-[13px] md:text-[14px] leading-relaxed text-[#a1a1aa] bg-black/20">
                    <div><span className="text-emerald-400">npm</span> update promexeus</div>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>This updates the CLI and drift detection engine. Your content files (<code className="font-mono text-[13px]">ROUTER.md</code>, <code className="font-mono text-[13px]">AGENTS.md</code>, context files, patterns) are <strong style={{ color: 'var(--mex-text)' }}>never touched</strong> — they live in your project's <code className="font-mono text-[13px]">.mex/</code> directory, not in the package.</p>
              </div>

              <div id="contributors" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>For contributors / forking</h3>
                <p className="mb-4 text-[15px]" style={{ color: "var(--mex-text-muted)" }}>If you're forking mex or working on the CLI itself:</p>
                
                <div className="mb-5 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--mex-border)', background: 'var(--mex-bg-3)' }}>
                  <div className="p-5 font-mono text-[13px] md:text-[14px] leading-relaxed text-[#a1a1aa] bg-black/20">
                    <div><span className="text-emerald-400">git clone</span> https://github.com/theDakshJaitly/mex.git</div>
                    <div><span className="text-emerald-400">cd</span> mex</div>
                    <div><span className="text-emerald-400">npm</span> install</div>
                    <div><span className="text-emerald-400">npm run</span> build        <span className="text-[#52525b] italic"># one-time build</span></div>
                    <div><span className="text-emerald-400">npm run</span> dev          <span className="text-[#52525b] italic"># watch mode — rebuilds on save</span></div>
                    <div><span className="text-emerald-400">npm</span> test             <span className="text-[#52525b] italic"># run test suite</span></div>
                    <div><span className="text-emerald-400">npm run</span> typecheck    <span className="text-[#52525b] italic"># TypeScript type checking</span></div>
                  </div>
                </div>
                <p className="text-[15px]" style={{ color: "var(--mex-text-muted)" }}>The CLI entry point is <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border bg-[var(--mex-bg-3)]" style={{ borderColor: 'var(--mex-border)' }}>src/cli.ts</code>. It builds to <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border bg-[var(--mex-bg-3)]" style={{ borderColor: 'var(--mex-border)' }}>dist/cli.js</code> via <code className="font-mono text-[13px]">tsup</code>.</p>
                <div className="mt-6 p-4 rounded-xl bg-[var(--mex-primary)]/5 border border-[var(--mex-primary)]/20">
                  <p className="text-[14px] text-[#a1a1aa] flex items-center gap-2">
                    <svg className="w-4 h-4 text-[var(--mex-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Ready to build? Check out the <Link href="/mex/contributing" className="text-[var(--mex-primary)] font-medium hover:underline border-b border-transparent hover:border-[var(--mex-primary)] transition-colors">Contributing Guide</Link> for good first issues and PR guidelines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works" className="scroll-mt-32">
            <h2 className="text-3xl font-space font-medium mb-8" style={{ color: "var(--mex-text)" }}>2. How It Works</h2>

            <div className="space-y-16">
              <div id="the-problem" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>The Problem</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  AI coding agents start every session with zero memory. They don't know what they built yesterday, what conventions were agreed on, or what's currently broken. Developers compensate by stuffing everything into a single config file (like <code className="font-mono text-[13px]">CLAUDE.md</code>), but that floods the context window, wastes tokens, and degrades the agent's attention. Meanwhile the project changes and nobody updates the docs — the agent's understanding drifts from reality.
                </p>
              </div>

              <div id="the-solution" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>The Solution</h3>
                <p className="mb-4 text-[15px] font-medium" style={{ color: "var(--mex-text)" }}>mex is two things:</p>
                <ol className="space-y-3 ms-6 list-decimal marker:font-mono marker:text-[var(--mex-primary)]" style={{ color: "var(--mex-text-muted)" }}>
                  <li className="pl-1">A <strong style={{ color: 'var(--mex-text)' }}>structured markdown scaffold</strong> — a set of navigable files that give AI agents persistent project knowledge</li>
                  <li className="pl-1">A <strong style={{ color: 'var(--mex-text)' }}>CLI</strong> — drift detection and targeted sync that keeps those files honest</li>
                </ol>
                <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  The scaffold lives in a <code className="font-mono text-[13px] px-1.5 py-0.5 rounded border bg-[var(--mex-bg-3)] text-[var(--mex-primary)]" style={{ borderColor: 'var(--mex-border)' }}>.mex/</code> directory inside your project. The agent doesn't load everything at once — it navigates to only what it needs for the current task, keeping token usage minimal.
                </p>
              </div>

              <div id="navigation-flow" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-6" style={{ color: "var(--mex-text)" }}>Navigation Flow</h3>
                <p className="mb-6 text-[15px]" style={{ color: "var(--mex-text-muted)" }}>Every session follows this path:</p>
                
                <div className="relative w-[calc(100%+1rem)] sm:w-[calc(100%+2rem)] xl:max-w-4xl xl:mx-auto mt-20 mb-12 isolate">
                  {/* Mascot Joke Box sitting robustly ON TOP via flex */}
                  <div className="flex justify-end pr-4 sm:pr-12 pointer-events-none drop-shadow-2xl opacity-95 relative z-20 mb-[-2px]">
                    <div className="flex flex-col items-end scale-100 origin-bottom">
                      <div className="bg-[#111] border border-[#333] rounded-2xl rounded-br-none p-4 max-w-[240px] shadow-2xl relative mb-2">
                        <p className="text-[13px] font-mono leading-tight text-[#a1a1aa]">
                          <span className="text-[var(--mex-primary)]">Agent:</span> Print map? Nah, I'll hallucinate one and delete prod.
                        </p>
                        <div className="absolute -bottom-[6px] right-6 w-3 h-3 bg-[#111] border-b border-r border-[#333] transform rotate-45" />
                      </div>
                      <img src="/mex-mascot.svg" alt="Mascot sitting on the flowchart box" className="w-[84px] object-contain drop-shadow-[0_0_15px_rgba(65,105,225,0.4)] relative right-3" />
                    </div>
                  </div>
                  
                  {/* Mermaid Graph Container */}
                  <div className="relative z-10 w-full bg-[#09090b] border rounded-xl overflow-x-auto p-4 sm:p-10 shadow-[0_0_40px_-15px_rgba(65,105,225,0.15)]" style={{ borderColor: 'var(--mex-border)' }}>
                    <Mermaid chart={`
                      flowchart TD
                        A([Session Starts]) --> B[Tool auto-loads config<br/><small>CLAUDE.md / .cursorrules</small>]
                        B --> C[Config says read<br/>.mex/ROUTER.md]
                        C --> D(ROUTER.md<br/>checks routing table)
                        D --> E{Task Type?}
                        E -->|Matching task| F[Load component context file]
                        E -->|Match pattern| G(patterns/INDEX.md)
                        F --> H[Agent working<br/>with full context and patterns]
                        G --> H
                        H --> I([GROW Step<br/>updates scaffold])
                    `} />
                  </div>
                </div>

                <p className="mt-8 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  The config file that your AI tool auto-loads (<code className="font-mono text-[12px]">CLAUDE.md</code>, <code className="font-mono text-[12px]">.cursorrules</code>, etc.) is intentionally tiny — roughly 120 tokens. Its only job is to point the agent to <code className="font-mono text-[12px] text-[var(--mex-primary)]">.mex/ROUTER.md</code>. All real context lives in the scaffold.
                </p>
              </div>

              <div id="scaffold-files" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-6" style={{ color: "var(--mex-text)" }}>The Scaffold Files</h3>
                
                <div className="space-y-10">
                  {/* AGENTS.md */}
                  <div>
                    <h4 className="text-lg font-space font-medium mb-2 flex items-center gap-2 text-white">
                      AGENTS.md <span className="text-[12px] font-sans font-normal px-2 py-0.5 rounded-full bg-white/10 text-[#a1a1aa] border border-white/10">Project Anchor</span>
                    </h4>
                    <p className="mb-4 text-[14px]" style={{ color: "var(--mex-text-muted)" }}>The always-loaded identity file. Contains:</p>
                    <ul className="space-y-2 ms-6 list-disc marker:text-[var(--mex-border)] text-[14px]" style={{ color: "var(--mex-text-muted)" }}>
                      <li><strong style={{ color: 'var(--mex-text)' }}>What This Is</strong> — one-sentence description of the project</li>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Non-Negotiables</strong> — hard rules the agent must never violate (3-7 items). Not preferences — rules. Things that cause real damage if broken</li>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Commands</strong> — exact commands to dev, test, lint, build</li>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Scaffold Growth</strong> — instruction to update the scaffold after every task</li>
                    </ul>
                    <p className="mt-4 text-[14px]" style={{ color: "var(--mex-text-muted)" }}>This file is kept deliberately small (target: under 150 tokens) so it can be loaded every session without cost concerns.</p>
                  </div>

                  {/* ROUTER.md */}
                  <div>
                    <h4 className="text-lg font-space font-medium mb-2 flex items-center gap-2 text-[var(--mex-primary)]">
                      ROUTER.md <span className="text-[12px] font-sans font-normal px-2 py-0.5 rounded-full bg-[var(--mex-primary)]/10 text-[var(--mex-primary)] border border-[var(--mex-primary)]/20">Session Bootstrap</span>
                    </h4>
                    <p className="mb-4 text-[14px]" style={{ color: "var(--mex-text-muted)" }}>The navigation hub. Read at the start of every session. Contains:</p>
                    <ul className="space-y-4 ms-6 list-disc marker:text-[var(--mex-border)] text-[14px]" style={{ color: "var(--mex-text-muted)" }}>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Current Project State</strong> — what's working, what's not built yet, known issues. This is the primary drift prevention mechanism — it re-grounds the agent every session</li>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Behavioural Contract</strong> — the 5-step loop the agent follows for every task (see below)</li>
                      <li>
                        <strong style={{ color: 'var(--mex-text)' }}>Routing Table</strong> — a lookup table that maps task types to the right context file:
                        
                        <div className="mt-4 overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--mex-border)' }}>
                          <table className="w-full text-left text-[13px] whitespace-nowrap bg-[var(--mex-bg-3)]">
                            <thead>
                              <tr className="bg-white/5 border-b" style={{ borderColor: 'var(--mex-border)' }}>
                                <th className="px-4 py-3 font-medium text-white">Task type</th>
                                <th className="px-4 py-3 font-medium text-white border-l" style={{ borderColor: 'var(--mex-border)' }}>Load</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y text-[#a1a1aa]" style={{ borderColor: 'var(--mex-border)' }}>
                              <tr><td className="px-4 py-3">Understanding how the system works</td><td className="px-4 py-3 font-mono text-[var(--mex-primary)] border-l" style={{ borderColor: 'var(--mex-border)' }}>context/architecture.md</td></tr>
                              <tr><td className="px-4 py-3">Working with a specific technology</td><td className="px-4 py-3 font-mono text-[var(--mex-primary)] border-l" style={{ borderColor: 'var(--mex-border)' }}>context/stack.md</td></tr>
                              <tr><td className="px-4 py-3">Writing or reviewing code</td><td className="px-4 py-3 font-mono text-[var(--mex-primary)] border-l" style={{ borderColor: 'var(--mex-border)' }}>context/conventions.md</td></tr>
                              <tr><td className="px-4 py-3">Making a design decision</td><td className="px-4 py-3 font-mono text-[var(--mex-primary)] border-l" style={{ borderColor: 'var(--mex-border)' }}>context/decisions.md</td></tr>
                              <tr><td className="px-4 py-3">Setting up or running the project</td><td className="px-4 py-3 font-mono text-[var(--mex-primary)] border-l" style={{ borderColor: 'var(--mex-border)' }}>context/setup.md</td></tr>
                              <tr><td className="px-4 py-3">Any specific task</td><td className="px-4 py-3 font-mono border-l text-emerald-400" style={{ borderColor: 'var(--mex-border)' }}>Check patterns/INDEX.md</td></tr>
                            </tbody>
                          </table>
                        </div>
                      </li>
                    </ul>
                  </div>


                  {/* context/ */}
                  <div>
                    <h4 className="text-lg font-space font-medium mb-2 flex items-center gap-2 text-white">
                      context/ <span className="text-[12px] font-sans font-normal px-2 py-0.5 rounded-full bg-white/10 text-[#a1a1aa] border border-white/10">Knowledge Files</span>
                    </h4>
                    <p className="mb-4 text-[14px]" style={{ color: "var(--mex-text-muted)" }}>Five files covering different dimensions of the project:</p>
                    
                    <div className="mb-5 overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--mex-border)' }}>
                      <table className="w-full text-left text-[13px] bg-[var(--mex-bg-3)]">
                        <thead>
                          <tr className="bg-white/5 border-b" style={{ borderColor: 'var(--mex-border)' }}>
                            <th className="px-4 py-3 font-medium text-white whitespace-nowrap">File</th>
                            <th className="px-4 py-3 font-medium text-white border-l" style={{ borderColor: 'var(--mex-border)' }}>What it contains</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y text-[#a1a1aa]" style={{ borderColor: 'var(--mex-border)' }}>
                          <tr><td className="px-4 py-3 font-mono text-white whitespace-nowrap">architecture.md</td><td className="px-4 py-3 border-l" style={{ borderColor: 'var(--mex-border)' }}>How the major pieces connect — system flow, component boundaries, external dependencies</td></tr>
                          <tr><td className="px-4 py-3 font-mono text-white whitespace-nowrap">stack.md</td><td className="px-4 py-3 border-l" style={{ borderColor: 'var(--mex-border)' }}>Technology choices and reasoning — language, framework, database, key libraries, and why each was chosen over alternatives</td></tr>
                          <tr><td className="px-4 py-3 font-mono text-white whitespace-nowrap">conventions.md</td><td className="px-4 py-3 border-l" style={{ borderColor: 'var(--mex-border)' }}>Naming conventions, code structure patterns, file organization rules</td></tr>
                          <tr><td className="px-4 py-3 font-mono text-white whitespace-nowrap">decisions.md</td><td className="px-4 py-3 border-l" style={{ borderColor: 'var(--mex-border)' }}>Append-only decision log — architectural choices with context and reasoning</td></tr>
                          <tr><td className="px-4 py-3 font-mono text-white whitespace-nowrap">setup.md</td><td className="px-4 py-3 border-l" style={{ borderColor: 'var(--mex-border)' }}>How to run the project locally — environment setup, dependencies, dev server, common issues</td></tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <p className="text-[14px] mb-2" style={{ color: "var(--mex-text-muted)" }}>Each context file has YAML frontmatter with:</p>
                    <ul className="space-y-1 ms-6 mb-4 list-disc marker:text-[var(--mex-primary)] text-[14px]" style={{ color: "var(--mex-text-muted)" }}>
                      <li><code className="font-mono text-[var(--mex-text)]">triggers</code> — keywords that indicate when this file should be loaded</li>
                      <li><code className="font-mono text-[var(--mex-text)]">edges</code> — pointers to related files</li>
                      <li><code className="font-mono text-[var(--mex-text)]">last_updated</code> — when the file was last modified</li>
                    </ul>
                    <p className="text-[14px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                      The agent only <strong style={{ color: "var(--mex-text)" }}>loads the context files relevant to the current task</strong>. A developer fixing a bug loads <code className="font-mono text-[12px]">architecture.md</code> and maybe a debug pattern. A developer setting up their environment loads <code className="font-mono text-[12px]">setup.md</code>. No wasted tokens.
                    </p>
                  </div>

                  {/* patterns/ */}
                  <div>
                    <h4 className="text-lg font-space font-medium mb-2 flex items-center gap-2 text-emerald-400">
                      patterns/ <span className="text-[12px] font-sans font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Task-Specific Guides</span>
                    </h4>
                    <p className="mb-4 text-[14px]" style={{ color: "var(--mex-text-muted)" }}>
                      Patterns are the accumulated wisdom of working on this project — the things you'd tell a teammate sitting next to you. Each pattern covers a repeatable task type and includes:
                    </p>
                    <ul className="space-y-1 ms-6 mb-4 list-disc marker:text-[var(--mex-border)] text-[14px]" style={{ color: "var(--mex-text-muted)" }}>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Context</strong> — what to load or know before starting</li>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Steps</strong> — the workflow, in order</li>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Gotchas</strong> — things that go wrong, what to watch out for</li>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Verify</strong> — checklist to run after completing the task</li>
                      <li><strong style={{ color: 'var(--mex-text)' }}>Debug</strong> — what to check when this task type breaks</li>
                    </ul>
                    <p className="text-[14px] mb-3" style={{ color: "var(--mex-text-muted)" }}>
                      <code className="font-mono text-[13px] text-[var(--mex-primary)]">patterns/INDEX.md</code> is the lookup table — the agent checks it before starting any task. If a matching pattern exists, it follows it.
                    </p>
                    <p className="text-[14px] mb-2 font-medium" style={{ color: "var(--mex-text)" }}>Patterns fall into four categories:</p>
                    <ol className="space-y-1 ms-6 list-decimal marker:text-[var(--mex-text-muted)] text-[14px]" style={{ color: "var(--mex-text-muted)" }}>
                      <li>Common tasks (add endpoint, add component)</li>
                      <li>Integration patterns (external dependencies with gotchas)</li>
                      <li>Debug/diagnosis (when something breaks at a boundary)</li>
                      <li>Deploy/release workflows</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div id="behavioural-contract" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>The Behavioural Contract</h3>
                <p className="mb-6 text-[15px]" style={{ color: "var(--mex-text-muted)" }}>Every task follows a 5-step loop defined in <code className="font-mono text-[13px] text-[var(--mex-primary)]">ROUTER.md</code>:</p>
                
                <ol className="space-y-5 ms-6 list-decimal font-medium marker:font-mono marker:text-[var(--mex-primary)]" style={{ color: "var(--mex-text)" }}>
                  <li className="pl-1">
                    CONTEXT <br/>
                    <span className="font-normal text-[14px]" style={{ color: "var(--mex-text-muted)" }}>Load the relevant context file(s) from the routing table. Check <code className="font-mono">patterns/INDEX.md</code> for a matching pattern. Narrate what's being loaded.</span>
                  </li>
                  <li className="pl-1">
                    BUILD <br/>
                    <span className="font-normal text-[14px]" style={{ color: "var(--mex-text-muted)" }}>Do the work. If a pattern exists, follow its steps. If deviating, state the deviation and why before writing code.</span>
                  </li>
                  <li className="pl-1">
                    VERIFY <br/>
                    <span className="font-normal text-[14px]" style={{ color: "var(--mex-text-muted)" }}>Load <code className="font-mono">context/conventions.md</code> and run the verify checklist item by item. Each item is stated explicitly with pass/fail — no summarizing.</span>
                  </li>
                  <li className="pl-1">
                    DEBUG <br/>
                    <span className="font-normal text-[14px]" style={{ color: "var(--mex-text-muted)" }}>If verification fails, check <code className="font-mono">patterns/INDEX.md</code> for a debug pattern. Follow it. Fix the issue and re-run VERIFY.</span>
                  </li>
                  <li className="pl-1">
                    GROW <br/>
                    <span className="font-normal text-[14px]" style={{ color: "var(--mex-text-muted)" }}>After completing the task:
                      <ul className="mt-2 space-y-1 ms-5 list-disc marker:text-[var(--mex-border)]">
                        <li>If no pattern exists for this task type, create one and add it to INDEX.md</li>
                        <li>If a pattern exists but was deviated from or a new gotcha was discovered, update it</li>
                        <li>If any context file is now out of date, update it surgically</li>
                        <li>Update "Current Project State" in ROUTER.md if the work was significant</li>
                      </ul>
                    </span>
                  </li>
                </ol>

                <div className="mt-6 p-5 rounded-xl border bg-gradient-to-br from-[rgba(65,105,225,0.05)] to-transparent" style={{ borderColor: 'var(--mex-border)' }}>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                    <strong style={{ color: "var(--mex-text)" }}>The GROW step is what makes the scaffold compound over time.</strong> Setup seeds the initial knowledge, but real patterns come from real work. Every task has the potential to leave the scaffold smarter than it was before.
                  </p>
                </div>
              </div>

              <div id="edge-system" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>Edge System</h3>
                <p className="mb-4 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  Every scaffold file can declare edges in its YAML frontmatter — pointers to related files with conditions for when to follow them. This creates a navigable web rather than a flat list of files:
                </p>
                
                <div className="mb-4 rounded-xl overflow-hidden border font-mono text-[13px]" style={{ borderColor: 'var(--mex-border)', background: 'var(--mex-bg-3)' }}>
                  <div className="p-4 leading-relaxed bg-[#0d0d12] text-[#d4d4d8]">
                    <div className="text-emerald-400">edges:</div>
                    <div className="pl-4"><span className="text-[#3f3f46]">-</span> <span className="text-blue-400">target:</span> context/stack.md</div>
                    <div className="pl-6"><span className="text-blue-400">condition:</span> when specific technology details are needed</div>
                    <div className="pl-4"><span className="text-[#3f3f46]">-</span> <span className="text-blue-400">target:</span> context/decisions.md</div>
                    <div className="pl-6"><span className="text-blue-400">condition:</span> when understanding why the architecture is structured this way</div>
                  </div>
                </div>

                <p className="text-[14px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  During setup, <code className="font-mono text-[12px]">Pass 3</code> wires all edges — ensuring every context file has at least 2 edges and every pattern has at least 1. Edges are bidirectional where it makes sense.
                </p>
              </div>

              <div id="domain-context" className="scroll-mt-32">
                <h3 className="text-xl font-space font-medium mb-4" style={{ color: "var(--mex-text)" }}>Domain-Specific Context Files</h3>
                <p className="mb-4 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  If a project has domains complex enough that cramming them into <code className="font-mono text-[13px]">architecture.md</code> would make it too long or too shallow, mex creates additional context files. For example:
                </p>
                
                <ul className="space-y-3 ms-6 mb-5 list-disc marker:text-[var(--mex-border)] text-[14px]" style={{ color: "var(--mex-text-muted)" }}>
                  <li>A project with a complex auth system gets <code className="font-mono text-[13px] text-[var(--mex-primary)]">context/auth.md</code></li>
                  <li>A data pipeline project gets <code className="font-mono text-[13px] text-[var(--mex-primary)]">context/ingestion.md</code></li>
                  <li>A project with Stripe gets <code className="font-mono text-[13px] text-[var(--mex-primary)]">context/payments.md</code></li>
                </ul>

                <p className="text-[14px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  These are created during setup when the AI determines a domain has enough depth to warrant its own file. They use the same YAML frontmatter format and get added to the routing table in <code className="font-mono text-[13px]">ROUTER.md</code>.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: CLI Commands */}
          <section id="cli-commands" className="scroll-mt-32 space-y-12 mb-32 relative">
            <div className="border-b pb-6" style={{ borderColor: "var(--mex-border)" }}>
              <h2 className="text-3xl font-space font-semibold mb-4 text-white">3. CLI Commands</h2>
              <p className="text-[16px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                All CLI commands run from your project root (not from inside <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)] border" style={{ borderColor: 'var(--mex-border)' }}>.mex/</code>). After installing with <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)] border text-[var(--mex-primary)]" style={{ borderColor: 'var(--mex-border)' }}>npm install --save-dev promexeus</code>, use <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)] border text-white" style={{ borderColor: 'var(--mex-border)' }}>mex &lt;command&gt;</code>. The CLI locates the scaffold by walking up to the git root and looking for a <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)] border" style={{ borderColor: 'var(--mex-border)' }}>.mex/</code> directory.
              </p>
            </div>

            {/* mex check */}
            <div id="cli-check" className="scroll-mt-32">
              <div className="flex items-center gap-4 border-b border-[#27272a] pb-3 mb-6 relative">
                <h3 className="text-2xl font-mono text-[var(--mex-primary)] font-medium">mex check</h3>
                {/* Mascot Joke Box - Positioned beautifully on the right of the header */}
                <div className="absolute right-0 -top-8 hidden md:flex flex-row items-end gap-3 scale-90 origin-right pointer-events-none opacity-80 mix-blend-screen">
                  <div className="bg-[#111] border border-[#333] rounded-2xl rounded-br-none p-3 max-w-[200px] shadow-2xl relative">
                    <p className="text-[12px] font-mono leading-tight text-[#a1a1aa]">
                      <span className="text-[var(--mex-primary)]">Agent:</span> Drift detected. Recommending total rewrite in Rust.
                    </p>
                    <div className="absolute -bottom-2 right-4 w-3 h-3 bg-[#111] border-b border-r border-[#333] transform rotate-45" />
                  </div>
                  <img src="/mex-mascot.svg" alt="Mascot" className="w-16 object-contain drop-shadow-[0_0_15px_rgba(65,105,225,0.3)] mb-1" />
                </div>
              </div>

              <p className="mb-4 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                Runs all 8 drift checkers against your scaffold files. Zero tokens, zero AI — purely deterministic analysis.
              </p>

              <p className="mb-6 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                <strong>Output:</strong> Lists every issue grouped by file, with severity icons (<span className="text-red-400">✗</span> error, <span className="text-yellow-400">⚠</span> warning, <span className="text-blue-400">ℹ</span> info) and a drift score out of 100.<br/>
                The score starts at 100 and deducts points per issue: <strong>-10</strong> per error, <strong>-3</strong> per warning, <strong>-1</strong> per info. Also reports total files checked.
              </p>

              <div className="bg-[var(--mex-bg-2)] border rounded-xl overflow-x-auto mb-6" style={{ borderColor: 'var(--mex-border)' }}>
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#09090b] text-[var(--mex-text-muted)] border-b" style={{ borderColor: 'var(--mex-border)' }}>
                    <tr>
                      <th className="px-5 py-3 font-mono font-medium whitespace-nowrap">Flag</th>
                      <th className="px-5 py-3 font-medium">What it does</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-[var(--mex-text)]">
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">--quiet</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>One-line summary only. Example: <code className="px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)] border break-all" style={{ borderColor: 'var(--mex-border)' }}>mex: drift score 92/100 (1 warning)</code></td>
                    </tr>
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">--json</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Full drift report as JSON — every issue with file, line number, severity, code, and message. Useful for CI pipelines or programmatic consumption.</td>
                    </tr>
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">--fix</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Runs the check, then automatically jumps into <code className="font-mono text-white">sync</code> if any errors are found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#111116] border border-[var(--mex-bg-3)] rounded-lg p-5">
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] mb-2">
                  <strong className="text-white font-medium">Exit code:</strong> Exits with code 1 if any errors are found, 0 otherwise. This makes it usable as a CI gate.
                </p>
                <p className="text-[14px] leading-relaxed text-[#a1a1aa]">
                  <strong className="text-white font-medium">Score color coding:</strong> <span className="text-emerald-400 font-medium">Green</span> for 80+, <span className="text-yellow-400 font-medium">Yellow</span> for 50-79, <span className="text-red-400 font-medium">Red</span> for below 50.
                </p>
              </div>
            </div>

            {/* mex sync */}
            <div id="cli-sync" className="scroll-mt-32">
              <h3 className="text-2xl font-mono text-[var(--mex-primary)] font-medium border-b border-[#27272a] pb-3 mb-6">mex sync</h3>
              <p className="mb-6 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                Detects drift, then builds targeted prompts for AI to fix <em>only</em> the broken scaffold files. Runs in a loop: <code className="font-mono text-[13px] text-white">check → fix → verify → repeat</code> until clean.
              </p>

              <h4 className="text-lg font-space font-medium mb-3 text-white">How it works:</h4>
              <ol className="space-y-3 mb-8 ms-6 list-decimal marker:font-mono marker:text-[var(--mex-primary)]" style={{ color: "var(--mex-text-muted)" }}>
                <li className="pl-1">Runs <code className="font-mono text-white">mex check</code> internally to find all issues</li>
                <li className="pl-1">Groups issues by file and shows which files need attention (error & warning counts)</li>
                <li className="pl-1">Asks you to choose a mode:
                  <ul className="list-disc ms-5 mt-2 space-y-2 marker:text-[#3f3f46]">
                    <li><strong>Interactive (default)</strong> — launches a Claude Code session with a combined prompt covering all broken files. You watch the agent fix them in real-time.</li>
                    <li><strong>Show prompts</strong> — prints the targeted prompt so you can paste it into any AI tool manually.</li>
                    <li><strong>Exit</strong> — stop and come back later.</li>
                  </ul>
                </li>
                <li className="pl-1 mt-3">After the AI fixes files, re-runs the drift check automatically</li>
                <li className="pl-1">Shows the score change (e.g., <code className="font-mono px-1.5 bg-[#111] border border-[#27272a] rounded">Drift score: 72 → 95/100 (+23)</code>)</li>
                <li className="pl-1">If issues remain, asks whether to run another cycle</li>
              </ol>

              <div className="border border-indigo-900/30 bg-indigo-900/10 rounded-xl p-5 mb-8">
                <p className="text-[14px] leading-relaxed text-indigo-100/70">
                  The sync prompt is precise — it includes the current file content, the specific issues found, filesystem context showing what actually exists (for missing path issues), and recent git diffs for referenced paths. The AI is instructed to fix <strong>only</strong> what's broken, not rewrite correct sections.
                </p>
              </div>

              <div className="bg-[var(--mex-bg-2)] border rounded-xl overflow-x-auto mb-6" style={{ borderColor: 'var(--mex-border)' }}>
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#09090b] text-[var(--mex-text-muted)] border-b" style={{ borderColor: 'var(--mex-border)' }}>
                    <tr>
                      <th className="px-5 py-3 font-mono font-medium whitespace-nowrap">Flag</th>
                      <th className="px-5 py-3 font-medium">What it does</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-[var(--mex-text)]">
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">--dry-run</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Shows the targeted prompt that would be sent to AI, without executing. Useful for reviewing what sync would do.</td>
                    </tr>
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">--warnings</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>By default, sync only fixes files that have errors. This flag includes warning-only files as well.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[14px] leading-relaxed text-[#a1a1aa] bg-[#111116] border border-[#27272a] rounded-lg p-4">
                <strong className="text-white font-medium">Filtering logic:</strong> By default, if a file has at least one error, <em>all</em> of its issues (errors and warnings) are included in the sync. Files with <em>only</em> warnings are skipped unless <code className="font-mono text-white">--warnings</code> is passed.
              </p>
            </div>

            {/* mex init */}
            <div id="cli-init" className="scroll-mt-32">
              <h3 className="text-2xl font-mono text-[var(--mex-primary)] font-medium border-b border-[#27272a] pb-3 mb-6">mex init</h3>
              <p className="mb-6 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                Scans the codebase and generates a structured brief for AI consumption. This is what <code className="font-mono text-white">mex setup</code> runs internally during first-time setup.
              </p>

              <p className="text-white font-medium mb-3">The scanner analyzes five dimensions of the project:</p>

              <div className="bg-[var(--mex-bg-2)] border rounded-xl overflow-x-auto mb-6" style={{ borderColor: 'var(--mex-border)' }}>
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#09090b] text-[var(--mex-text-muted)] border-b" style={{ borderColor: 'var(--mex-border)' }}>
                    <tr>
                      <th className="px-5 py-3 font-mono font-medium whitespace-nowrap">Scanner module</th>
                      <th className="px-5 py-3 font-medium">What it extracts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-[var(--mex-text)]">
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">manifest</td>
                      <td className="px-5 py-4" style={{ color: "var(--mex-text-muted)" }}>Dependencies, versions, scripts from <code className="font-mono text-white bg-[#111] border border-[#333] rounded px-1">package.json</code> (or equivalent)</td>
                    </tr>
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">entry-points</td>
                      <td className="px-5 py-4" style={{ color: "var(--mex-text-muted)" }}>Main entry files (e.g., <code className="font-mono">src/index.ts</code>, <code className="font-mono">app.py</code>)</td>
                    </tr>
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">folder-tree</td>
                      <td className="px-5 py-4" style={{ color: "var(--mex-text-muted)" }}>Directory structure, excluding <code className="font-mono">node_modules</code>, <code className="font-mono">.git</code>, <code className="font-mono">dist</code>, etc.</td>
                    </tr>
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">tooling</td>
                      <td className="px-5 py-4" style={{ color: "var(--mex-text-muted)" }}>Build tools, linters, formatters, CI config</td>
                    </tr>
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">readme</td>
                      <td className="px-5 py-4" style={{ color: "var(--mex-text-muted)" }}>Existing README content</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mb-6 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                Without <code className="font-mono text-white">--json</code>, it wraps the brief in a prompt instructing the AI how to use it to populate the scaffold.
              </p>

              <div className="bg-[var(--mex-bg-2)] border rounded-xl overflow-x-auto" style={{ borderColor: 'var(--mex-border)' }}>
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#09090b] text-[var(--mex-text-muted)] border-b" style={{ borderColor: 'var(--mex-border)' }}>
                    <tr>
                      <th className="px-5 py-3 font-mono font-medium whitespace-nowrap w-24">Flag</th>
                      <th className="px-5 py-3 font-medium">What it does</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-[var(--mex-text)]">
                    <tr className="hover:bg-[#09090b]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white max-w-fit">--json</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Outputs the raw scanner brief as JSON (no wrapper prompt). Useful for piping into other tools or debugging what the scanner found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* mex watch & mex commands */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* mex watch */}
              <div id="cli-watch" className="scroll-mt-32 border border-[#27272a] rounded-xl p-6 bg-[#09090b]/50">
                <h3 className="text-xl font-mono text-[var(--mex-primary)] font-medium mb-3">mex watch</h3>
                <p className="mb-5 text-[14px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  Installs a git post-commit hook that automatically runs <code className="font-mono text-white">mex check --quiet</code> after every commit.
                </p>
                
                <h4 className="text-[13px] font-space text-white uppercase tracking-wider mb-2">Behavior:</h4>
                <ul className="list-disc ms-5 mb-5 space-y-1 text-[14px] marker:text-[#3f3f46]" style={{ color: "var(--mex-text-muted)" }}>
                  <li><strong className="text-white font-medium">100/100 score:</strong> Stays silent (no output)</li>
                  <li><strong className="text-white font-medium">Issues found:</strong> Prints the one-line summary after commit</li>
                  <li>Appends gracefully if a hook already exists</li>
                  <li>Marked with <code className="font-mono text-xs"># mex-drift-check</code> comment</li>
                </ul>

                <h3 className="text-[16px] font-mono text-red-400 font-medium mb-2">mex watch --uninstall</h3>
                <ul className="list-disc ms-5 space-y-1 text-[14px] marker:text-[#3f3f46]" style={{ color: "var(--mex-text-muted)" }}>
                  <li>Only hook file? Deletes it.</li>
                  <li>Appended to existing hook? Removes exactly the mex block.</li>
                  <li>Not installed by mex? Warns and skips.</li>
                </ul>
              </div>

              {/* mex commands */}
              <div id="cli-commands-list" className="scroll-mt-32 border border-[#27272a] rounded-xl p-6 bg-[#09090b]/50">
                <h3 className="text-xl font-mono text-[var(--mex-primary)] font-medium mb-3">mex commands</h3>
                <p className="mb-4 text-[14px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  Quick-reference listing of all CLI commands and shell scripts with descriptions. Useful when you forget a flag or command name.
                </p>
                <div className="bg-[#111] rounded border border-[#333] p-4 flex items-center justify-center font-mono text-[13px] text-[#a1a1aa] h-32">
                  Prints all commands with flags <br/>& shell scripts with descriptions.
                </div>
              </div>
            </div>

            {/* Shell Scripts */}
            <div id="cli-shell" className="scroll-mt-32 mt-12 bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-800 opacity-20 blur-[100px] rounded-full pointer-events-none" />
              <h3 className="text-2xl font-space font-semibold mb-4 text-white">Shell Scripts (alternative)</h3>
              <p className="mb-6 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                If you installed via git clone, these bash scripts are also available. They run from your project root and support <code className="font-mono text-[13px] text-white">--help</code>.
              </p>

              <div className="bg-[#09090b] border rounded-xl overflow-x-auto mb-6" style={{ borderColor: 'var(--mex-border)' }}>
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#111] text-[var(--mex-text-muted)] border-b border-[#27272a]">
                    <tr>
                      <th className="px-5 py-3 font-mono font-medium whitespace-nowrap min-w-[200px]">Script</th>
                      <th className="px-5 py-3 font-medium">What it does</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-[var(--mex-text)]">
                    <tr className="hover:bg-[#111]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">bash .mex/setup.sh</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>First-time setup — same as <code className="font-mono text-white">npx promexeus setup</code> but as a bash script. Supports <code className="font-mono text-white">--dry-run</code></td>
                    </tr>
                    <tr className="hover:bg-[#111]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">bash .mex/sync.sh</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Interactive menu — choose between check, sync, or exporting the sync prompt.</td>
                    </tr>
                    <tr className="hover:bg-[#111]/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[13px] text-white">bash .mex/update.sh</td>
                      <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Pulls latest mex infrastructure from GitHub. For npm users, use <code className="font-mono text-white">npm update promexeus</code> instead.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

                  {/* SECTION 4: Drift Detection */}
            <section id="drift-detection" className="scroll-mt-32 space-y-12 mb-32 relative">
              <div className="border-b pb-6" style={{ borderColor: "var(--mex-border)" }}>
                <h2 className="text-3xl font-space font-semibold mb-4 text-white">4. Drift Detection</h2>
                
                <h3 id="what-is-drift" className="text-xl font-space font-medium mb-3 text-white mt-8 scroll-mt-32">What Is Drift</h3>
                <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--mex-text-muted)" }}>
                  Drift is when scaffold files say one thing but the codebase says another. A scaffold file claims <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)] border text-white" style={{ borderColor: 'var(--mex-border)' }}>src/utils/auth.ts</code> exists — but it was renamed to <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)] border text-white" style={{ borderColor: 'var(--mex-border)' }}>src/lib/auth.ts</code> last week. A context file says the project uses <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[var(--mex-bg-3)] border text-[var(--mex-primary)]" style={{ borderColor: 'var(--mex-border)' }}>npm run lint</code> — but that script was removed from package.json. Architecture docs reference a dependency at version 4 — but package.json has version 5.
                </p>
                <div className="border-l-2 border-red-500/50 pl-4 mb-6 py-1">
                  <p className="text-[15px] italic text-red-100/70 leading-relaxed">
                    Drift is inevitable. Code changes constantly. Documentation doesn't keep up. The longer drift goes unchecked, the more the agent's understanding diverges from reality — leading to wrong assumptions, broken suggestions, and wasted time.
                  </p>
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                  <strong className="text-white">mex detects drift deterministically.</strong> No AI, no tokens — just static analysis of your scaffold files against the actual codebase. Run <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[#111] border text-[var(--mex-primary)]" style={{ borderColor: '#333' }}>mex check</code> and you get a list of every claim in your scaffold that no longer holds true.
                </p>
              </div>

              {/* How It Works */}
              <div id="drift-how-it-works" className="scroll-mt-32">
                <h3 className="text-2xl font-mono text-[var(--mex-primary)] font-medium border-b border-[#27272a] pb-3 mb-6">How It Works</h3>
                <p className="mb-8 text-[15px]" style={{ color: "var(--mex-text-muted)" }}>The drift engine operates in three stages:</p>

                {/* 1. Claim Extraction */}
                <div id="drift-extraction" className="mb-12 scroll-mt-32">
                  <h4 className="text-xl font-space font-medium mb-4 text-white flex items-center gap-3">
                    <span className="bg-[#111] text-[var(--mex-primary)] border border-[#333] w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm">1</span> 
                    Claim Extraction
                  </h4>
                  <p className="mb-6 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                    The engine parses every markdown file in the scaffold (context files, pattern files, <code className="font-mono text-white text-[13px]">ROUTER.md</code>, <code className="font-mono text-white text-[13px]">AGENTS.md</code>) and extracts <em>claims</em> — things the scaffold asserts about the codebase:
                  </p>

                  <div className="bg-[var(--mex-bg-2)] border rounded-xl overflow-x-auto mb-6" style={{ borderColor: 'var(--mex-border)' }}>
                    <table className="w-full text-left text-[14px]">
                      <thead className="bg-[#09090b] text-[var(--mex-text-muted)] border-b" style={{ borderColor: 'var(--mex-border)' }}>
                        <tr>
                          <th className="px-5 py-3 font-mono font-medium whitespace-nowrap">Claim type</th>
                          <th className="px-5 py-3 font-medium">Extracted from</th>
                          <th className="px-5 py-3 font-medium">Example</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] text-[var(--mex-text)]">
                        <tr className="hover:bg-[#09090b]/50 transition-colors bg-[#111]/30">
                          <td className="px-5 py-4 font-mono text-[13px] text-emerald-400">path</td>
                          <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Inline code containing <code className="font-mono text-white">/</code> or a known file extension</td>
                          <td className="px-5 py-4 font-mono text-[13px] text-[#a1a1aa] bg-[#111]/50"><code className="px-1 py-0.5 rounded border border-[#333]">src/routes/api.ts</code></td>
                        </tr>
                        <tr className="hover:bg-[#09090b]/50 transition-colors">
                          <td className="px-5 py-4 font-mono text-[13px] text-blue-400">command</td>
                          <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Inline code or code blocks starting with npm/yarn/pnpm/make/etc.</td>
                          <td className="px-5 py-4 font-mono text-[13px] text-[#a1a1aa]"><code className="px-1 py-0.5 rounded border border-[#333]">npm run test</code></td>
                        </tr>
                        <tr className="hover:bg-[#09090b]/50 transition-colors bg-[#111]/30">
                          <td className="px-5 py-4 font-mono text-[13px] text-purple-400">dependency</td>
                          <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Bold text (<strong>**Name**</strong>) inside sections with headers matching "dependencies", "stack", "key libraries", etc.</td>
                          <td className="px-5 py-4 font-mono text-[13px] text-[#a1a1aa]"><strong>**Express**</strong></td>
                        </tr>
                        <tr className="hover:bg-[#09090b]/50 transition-colors">
                          <td className="px-5 py-4 font-mono text-[13px] text-orange-400">version</td>
                          <td className="px-5 py-4 leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>Bold text with a version number in a dependency section</td>
                          <td className="px-5 py-4 font-mono text-[13px] text-[#a1a1aa]"><strong>**React 18**</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6 mb-6">
                    <div className="bg-[#111116] border border-[#27272a] rounded-xl p-6">
                      <p className="text-[14px] text-white font-medium mb-3">The extractor is smart about what <em>isn't</em> a claim:</p>
                      <ul className="space-y-2 text-[13px] text-[#a1a1aa] list-disc ms-4 marker:text-[#3f3f46]">
                        <li>Template placeholders with <code className="font-mono text-xs text-white">&lt;&gt;</code>, <code className="font-mono text-xs text-white">[]</code>, <code className="font-mono text-xs text-white">&#123;&#125;</code> are skipped</li>
                        <li>URL routes like <code className="font-mono text-xs text-white">/api/users</code> (no file extension) are skipped</li>
                        <li>HTTP methods like <code className="font-mono text-xs text-white text-[var(--mex-primary)]">GET /api/bookmarks</code> are skipped</li>
                        <li>Code snippets containing <code className="font-mono text-xs text-white">=</code>, <code className="font-mono text-xs text-white">()</code>, <code className="font-mono text-xs text-white">;</code> are skipped</li>
                        <li>Wildcard patterns like <code className="font-mono text-xs text-white">*_streaming_client.py</code> are skipped</li>
                      </ul>
                    </div>
                    <div className="bg-orange-950/20 border border-orange-900/30 rounded-xl p-6">
                      <p className="text-[15px] text-orange-400 font-medium mb-3 flex items-center gap-2">
                        <span className="text-xl">⚠</span> Negation awareness
                      </p>
                      <p className="text-[13.5px] leading-relaxed text-orange-100/70">
                        Claims inside sections with headings like <code className="bg-orange-950 px-1 rounded border border-orange-900/50">"Not Built"</code>, <code className="bg-orange-950 px-1 rounded border border-orange-900/50">"Deliberately Not Using"</code>, <code className="bg-orange-950 px-1 rounded border border-orange-900/50">"Removed"</code>, or <code className="bg-orange-950 px-1 rounded border border-orange-900/50">"Deprecated"</code> are marked as <strong>negated</strong> and excluded from validation. This prevents false positives when the scaffold intentionally documents what doesn't exist.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Checker Execution */}
                <div id="drift-checkers" className="mb-12 scroll-mt-32">
                  <h4 className="text-xl font-space font-medium mb-8 text-white flex items-center gap-3">
                    <span className="bg-[#111] text-[var(--mex-primary)] border border-[#333] w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm">2</span> 
                    Checker Execution
                  </h4>
                  <p className="mb-8 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                    Eight checkers run against the extracted claims and scaffold files:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Path Checker */}
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 hover:border-[var(--mex-primary)]/50 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-white group-hover:text-[var(--mex-primary)] transition-colors">Path Checker</h5>
                        <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/30 text-red-500 border border-red-900/50">MISSING_PATH</code>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-[#a1a1aa] mb-4">
                        Validates every path claim points to a file on disk. Searches project root, scaffold root, and repo root (for <code className="text-white text-[12px]">.mex/</code> paths). Falls back to deep recursive search up to 5 directories.
                      </p>
                      <p className="text-[12.5px] text-[#71717a]"><strong className="text-red-400">Error</strong> for most paths. <strong className="text-yellow-400">Warning</strong> inside pattern files or if containing placeholders ("example", "foo").</p>
                    </div>

                    {/* Edge Checker */}
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 hover:border-[var(--mex-primary)]/50 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-white group-hover:text-[var(--mex-primary)] transition-colors">Edge Checker</h5>
                        <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/30 text-red-500 border border-red-900/50">DEAD_EDGE</code>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-[#a1a1aa] mb-4">
                        Validates that every target in YAML frontmatter <code className="text-white text-[12px]">edges</code> arrays points to an existing file in project or scaffold root.
                      </p>
                      <p className="text-[12.5px] text-[#71717a]"><strong className="text-red-400">Always Error</strong>. Dead edges break the navigation web.</p>
                    </div>

                    {/* Index Sync Checker */}
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 hover:border-[var(--mex-primary)]/50 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-white group-hover:text-[var(--mex-primary)] transition-colors">Index Sync Checker</h5>
                        <div className="flex flex-col gap-1 items-end">
                          <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-yellow-950/30 text-yellow-500 border border-yellow-900/50">INDEX_MISSING_ENTRY</code>
                          <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-yellow-950/30 text-yellow-500 border border-yellow-900/50">INDEX_ORPHAN_ENTRY</code>
                        </div>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-[#a1a1aa] mb-4">
                        Cross-references <code className="text-white text-[12px]">patterns/INDEX.md</code> with actual files to find unlisted patterns or orphaned references.
                      </p>
                      <p className="text-[12.5px] text-[#71717a]"><strong className="text-yellow-400">Always Warning</strong>.</p>
                    </div>

                    {/* Command Checker */}
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 hover:border-[var(--mex-primary)]/50 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-white group-hover:text-[var(--mex-primary)] transition-colors">Command Checker</h5>
                        <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/30 text-red-500 border border-red-900/50">DEAD_COMMAND</code>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-[#a1a1aa] mb-4">
                        Validates that <code className="text-white text-[12px]">npm</code>/<code className="text-white text-[12px]">yarn</code>/<code className="text-white text-[12px]">pnpm</code>/<code className="text-white text-[12px]">make</code> commands claimed in the scaffold actually exist in <code className="text-white text-[12px]">package.json</code> or <code className="text-white text-[12px]">Makefile</code>.
                      </p>
                      <p className="text-[12.5px] text-[#71717a]"><strong className="text-red-400">Always Error</strong>. Prevents hallucinated scripts.</p>
                    </div>

                    {/* Staleness Checker */}
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 hover:border-[var(--mex-primary)]/50 transition-colors md:col-span-2 group">
                      <div className="flex justify-between items-start mb-6">
                        <h5 className="font-medium text-white group-hover:text-[var(--mex-primary)] transition-colors text-lg">Staleness Checker</h5>
                        <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-950/30 text-orange-400 border border-orange-900/50">STALE_FILE</code>
                      </div>
                      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                        <p className="text-[14px] leading-relaxed text-[#a1a1aa] flex-1">
                          Uses git history to detect scaffold files that haven't been updated in a long time. Triggers depending on two metrics: elapsed days and elapsed commits.
                        </p>
                        <div className="bg-[#111] rounded-xl border border-[#27272a] overflow-hidden w-full lg:w-96 shadow-lg">
                          <table className="text-left text-[13px] w-full">
                            <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                              <tr>
                                <th className="px-4 py-3 font-medium">Metric</th>
                                <th className="px-4 py-3 font-medium text-yellow-500 text-right">Warning</th>
                                <th className="px-4 py-3 font-medium text-red-500 text-right">Error</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                              <tr className="hover:bg-[#1a1a1c]/50">
                                <td className="px-4 py-3 text-white">Days since change</td>
                                <td className="px-4 py-3 font-mono text-right">&gt; 30</td>
                                <td className="px-4 py-3 font-mono text-right">&gt; 90</td>
                              </tr>
                              <tr className="hover:bg-[#1a1a1c]/50">
                                <td className="px-4 py-3 text-white">Commits since change</td>
                                <td className="px-4 py-3 font-mono text-right">&gt; 50</td>
                                <td className="px-4 py-3 font-mono text-right">&gt; 200</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Dependency Checker */}
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 hover:border-[var(--mex-primary)]/50 transition-colors group">
                      <div className="flex flex-col items-start gap-2 mb-3">
                        <h5 className="font-medium text-white group-hover:text-[var(--mex-primary)] transition-colors">Dependency Checker</h5>
                        <div className="flex gap-2">
                          <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-yellow-950/30 text-yellow-500 border border-yellow-900/50 break-all">DEPENDENCY_MISSING</code>
                          <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-yellow-950/30 text-yellow-500 border border-yellow-900/50 break-all">VERSION_MISMATCH</code>
                        </div>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-[#a1a1aa] mb-4">
                        Checks if claimed dependencies exist in your manifest (e.g. <code className="text-white text-[12px]">package.json</code>) and validates exact version strings. Ignores known runtimes like Node, Python, Redis.
                      </p>
                      <p className="text-[12.5px] text-[#71717a]"><strong className="text-yellow-400">Always Warning</strong>.</p>
                    </div>

                    {/* Cross-File Checker */}
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 hover:border-[var(--mex-primary)]/50 transition-colors group">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-white group-hover:text-[var(--mex-primary)] transition-colors">Cross-File Checker</h5>
                        <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950/30 text-red-500 border border-red-900/50">CROSS_FILE_CONFLICT</code>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-[#a1a1aa] mb-4">
                        Detects contradictions across different scaffold files, such as version conflicts ("React 18" vs "React 17") and package manager conflicts.
                      </p>
                      <p className="text-[12.5px] text-[#71717a]"><strong className="text-red-400">Error</strong> for version mismatch, <strong className="text-yellow-400">Warning</strong> for package manager conflict.</p>
                    </div>

                    {/* Script Coverage Checker */}
                    <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 hover:border-[var(--mex-primary)]/50 transition-colors md:col-span-2 group">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-white group-hover:text-[var(--mex-primary)] transition-colors">Script Coverage Checker</h5>
                        <code className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-yellow-950/30 text-yellow-500 border border-yellow-900/50">UNDOCUMENTED_SCRIPT</code>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-[#a1a1aa] mb-4 max-w-3xl">
                        Checks the reverse direction: whether every script in <code className="text-white text-[12px]">package.json</code> is mentioned somewhere in the scaffold. Excludes lifecycle hooks (<code className="text-white text-[12px]">pretest</code>, <code className="text-white text-[12px]">postinstall</code>) and automatically skipped sub-scripts (<code className="text-white text-[12px]">dev:debug</code> ignored if <code className="text-white text-[12px]">dev</code> is documented).
                      </p>
                      <p className="text-[12.5px] text-[#71717a]"><strong className="text-yellow-400">Always Warning</strong>.</p>
                    </div>
                  </div>
                </div>

                {/* 3. Scoring */}
                <div id="drift-scoring" className="mb-20 scroll-mt-32">
                  <h4 className="text-xl font-space font-medium mb-6 text-white flex items-center gap-3">
                    <span className="bg-[#111] text-[var(--mex-primary)] border border-[#333] w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm">3</span> 
                    Scoring
                  </h4>
                  <p className="mb-8 text-[15px] leading-relaxed" style={{ color: "var(--mex-text-muted)" }}>
                    The drift score starts at 100 and deducts points per issue. The score is clamped between 0 and 100. A perfect score means the scaffold is fully in sync with the codebase.
                  </p>

                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
                    <div className="bg-[var(--mex-bg-2)] border rounded-xl overflow-hidden min-w-[300px] w-full lg:w-auto shadow-xl" style={{ borderColor: 'var(--mex-border)' }}>
                      <table className="w-full text-left text-[14px]">
                        <thead className="bg-[#09090b] text-[var(--mex-text-muted)] border-b" style={{ borderColor: 'var(--mex-border)' }}>
                          <tr>
                            <th className="px-5 py-4 font-medium">Severity</th>
                            <th className="px-5 py-4 font-medium text-right">Points deducted</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#27272a] text-[var(--mex-text)]">
                          <tr className="bg-[#111]/30">
                            <td className="px-5 py-4 text-red-400 font-medium flex items-center gap-2"><span className="text-[16px]">✗</span> Error</td>
                            <td className="px-5 py-4 text-right font-mono text-red-400">-10</td>
                          </tr>
                          <tr>
                            <td className="px-5 py-4 text-yellow-400 font-medium flex items-center gap-2"><span className="text-[16px]">⚠</span> Warning</td>
                            <td className="px-5 py-4 text-right font-mono text-yellow-400">-3</td>
                          </tr>
                          <tr className="bg-[#111]/30">
                            <td className="px-5 py-4 text-blue-400 font-medium flex items-center gap-2"><span className="text-[16px]">ℹ</span> Info</td>
                            <td className="px-5 py-4 text-right font-mono text-blue-400">-1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="flex-1 flex flex-col gap-3 w-full max-w-md mx-auto">
                      <div className="flex justify-between text-[13px] font-mono text-[#a1a1aa] px-1 mb-1">
                        <span>0</span>
                        <span>50</span>
                        <span>80</span>
                        <span>100</span>
                      </div>
                      <div className="h-3 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 rounded-full shadow-inner" />
                      <div className="flex justify-between text-[13px] font-medium mt-2">
                        <span className="text-red-400 w-1/3 text-left">Needs Sync</span>
                        <span className="text-yellow-400 w-1/3 text-center">Drifting</span>
                        <span className="text-emerald-400 w-1/3 text-right">Healthy</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* For Contributors */}
                <div id="drift-contributors" className="scroll-mt-32 mt-16 bg-[#09090b] border border-[#27272a] rounded-2xl p-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--mex-primary)] opacity-5 blur-[120px] rounded-full pointer-events-none" />
                  <h3 className="text-2xl font-space font-semibold mb-6 text-white border-b border-[#27272a] pb-4 inline-block">For Contributors</h3>
                  <p className="mb-8 text-[15px] leading-relaxed max-w-3xl" style={{ color: "var(--mex-text-muted)" }}>
                    The drift engine lives in <code className="font-mono text-[13px] text-[var(--mex-primary)] bg-[#111] border border-[#27272a] rounded px-1.5 py-0.5">src/drift/</code>. Key files:
                  </p>

                  <div className="bg-[#111] border rounded-xl overflow-x-auto mb-8 shadow-inner w-full" style={{ borderColor: 'var(--mex-border)' }}>
                    <table className="w-full text-left text-[14px] min-w-[500px]">
                      <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                        <tr>
                          <th className="px-6 py-4 font-mono font-medium whitespace-nowrap min-w-[150px]">File</th>
                          <th className="px-6 py-4 font-medium">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-6 py-4 font-mono text-[13px] text-white">index.ts</td>
                          <td className="px-6 py-4 leading-relaxed text-[#a1a1aa]">Orchestrator — finds scaffold files, runs all checkers, assembles report.</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-6 py-4 font-mono text-[13px] text-white">claims.ts</td>
                          <td className="px-6 py-4 leading-relaxed text-[#a1a1aa]">Markdown parser that extracts path, command, dependency, and version claims.</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-6 py-4 font-mono text-[13px] text-white">frontmatter.ts</td>
                          <td className="px-6 py-4 leading-relaxed text-[#a1a1aa]">Reads YAML frontmatter from scaffold files.</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-6 py-4 font-mono text-[13px] text-white">scoring.ts</td>
                          <td className="px-6 py-4 leading-relaxed text-[#a1a1aa]">Computes the 0-100 score from issue severities.</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-6 py-4 font-mono text-[13px] text-[var(--mex-primary)]">checkers/*.ts</td>
                          <td className="px-6 py-4 leading-relaxed text-[#a1a1aa]">One file per checker — each exports a function that returns <code className="text-[var(--mex-primary)] text-[12px] font-mono bg-[#000] px-1 py-0.5 rounded border border-[#333]">DriftIssue[]</code>.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-6 relative">
                    <p className="text-[14px] leading-relaxed text-indigo-200/80">
                      <strong className="text-white font-medium block mb-2 text-[15px]">Adding a new checker</strong> 
                      Create a new file in <code className="font-mono text-[12.5px] text-white">checkers/</code>, export a function matching the signature of existing checkers, and wire it into <code className="font-mono text-[12.5px] text-white">index.ts</code>. The function receives either claims or file paths and returns an array of <code className="font-mono text-[12.5px] text-[var(--mex-primary)]">DriftIssue</code> objects with a <code className="font-mono text-[12px]">code</code>, <code className="font-mono text-[12px]">severity</code>, <code className="font-mono text-[12px]">file</code>, <code className="font-mono text-[12px]">line</code>, and <code className="font-mono text-[12px]">message</code>.
                    </p>
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-[var(--mex-primary)]/5 border border-[var(--mex-primary)]/20 relative z-10 w-full">
                    <p className="text-[14px] text-[#a1a1aa] flex items-center gap-2">
                      <svg className="w-4 h-4 text-[var(--mex-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Ready to build? Check out the <Link href="/mex/contributing" className="text-[var(--mex-primary)] font-medium hover:underline border-b border-transparent hover:border-[var(--mex-primary)] transition-colors">Contributing Guide</Link> for good first issues and PR guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          {/* SECTION 5: Sync */}
          <section id="sync" className="scroll-mt-32 space-y-12 mb-32 relative">
            <div className="border-b pb-6" style={{ borderColor: "var(--mex-border)" }}>
              <h2 className="text-3xl font-space font-semibold mb-4 text-white">5. Sync</h2>
              
              <h3 id="what-sync-does" className="text-xl font-space font-medium mb-3 text-white mt-8 scroll-mt-32">What Sync Does</h3>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--mex-text-muted)" }}>
                Sync is the repair mechanism. When <code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[#111] border text-white" style={{ borderColor: '#333' }}>mex check</code> finds drift, sync builds targeted prompts that tell AI exactly what's broken and gives it the context to fix it — the current file content, the specific issues, what actually exists on disk, and recent git changes. The AI fixes <em>only</em> what's broken, not the entire scaffold.
              </p>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--mex-text-muted)" }}>
                There are two ways to run sync: the CLI command (<code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[#111] border text-[var(--mex-primary)]" style={{ borderColor: '#333' }}>mex sync</code>) and the interactive shell script (<code className="font-mono text-[13px] px-1.5 py-0.5 rounded bg-[#111] border text-white" style={{ borderColor: '#333' }}>bash .mex/sync.sh</code>). The shell script wraps the CLI with an additional full resync option.
              </p>
            </div>

            {/* CLI Sync */}
            <div id="sync-cli" className="scroll-mt-32">
              <h3 className="text-2xl font-mono text-[var(--mex-primary)] font-medium border-b border-[#27272a] pb-3 mb-6">CLI Sync (mex sync)</h3>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6">
                  <h4 className="text-lg font-space font-medium mb-4 text-white">The Sync Loop</h4>
                  <div className="flex flex-col gap-2 font-mono text-[13px] text-[#a1a1aa]">
                    <div className="bg-[#111] border border-[#333] rounded px-3 py-2 text-white">Run drift check</div>
                    <div className="text-center text-[#555]">↓</div>
                    <div className="bg-[#111] border border-[#333] rounded px-3 py-2 text-white">Group issues by file &rarr; show which files need attention</div>
                    <div className="text-center text-[#555]">↓</div>
                    <div className="bg-[#111] border border-[#333] rounded px-3 py-2 text-[var(--mex-primary)]">Ask user: Interactive / Show prompts / Exit</div>
                    <div className="text-center text-[#555]">↓</div>
                    <div className="bg-[#111] border border-[#333] rounded px-3 py-2 text-white">Build combined brief for all broken files</div>
                    <div className="text-center text-[#555]">↓</div>
                    <div className="bg-emerald-950/20 border border-emerald-900/30 rounded px-3 py-2 text-emerald-400">Launch Claude Code session (or print prompt)</div>
                    <div className="text-center text-[#555]">↓</div>
                    <div className="bg-[#111] border border-[#333] rounded px-3 py-2 text-white">Re-run drift check &rarr; show score delta</div>
                    <div className="text-center text-[#555]">↓</div>
                    <div className="bg-[#111] border border-[#333] rounded px-3 py-2 text-[#a1a1aa] italic">If issues remain &rarr; ask to run another cycle</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-space font-medium mb-4 text-white">Mode selection (first cycle only)</h4>
                  <ul className="space-y-4 text-[14px]">
                    <li className="bg-[#111]/50 border border-[#27272a] rounded-lg p-4">
                      <strong className="text-white block mb-1">1. Interactive (default)</strong>
                      <span style={{ color: "var(--mex-text-muted)" }}>Launches a live Claude Code session. The combined brief is passed as the prompt. Claude fixes all broken files while you watch. Requires Claude Code CLI installed.</span>
                    </li>
                    <li className="bg-[#111]/50 border border-[#27272a] rounded-lg p-4">
                      <strong className="text-white block mb-1">2. Show prompts</strong>
                      <span style={{ color: "var(--mex-text-muted)" }}>Prints the combined brief to stdout. You copy and paste it into whatever AI tool you're using.</span>
                    </li>
                    <li className="bg-[#111]/50 border border-[#27272a] rounded-lg p-4">
                      <strong className="text-white block mb-1">3. Exit</strong>
                      <span style={{ color: "var(--mex-text-muted)" }}>Stop and come back later.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-5 mt-6">
                <p className="text-[14px] leading-relaxed text-[#a1a1aa]">
                  After the AI makes fixes, sync automatically re-runs <code className="font-mono text-white text-[12px]">mex check</code> and shows the score change:
                  <br/><br/>
                  <code className="bg-[#000] text-emerald-400 border border-[#27272a] px-3 py-1.5 rounded font-mono text-[13px] inline-block">Drift score: 72 &rarr; 95/100 (+23)</code>
                  <br/><br/>
                  If errors remain, it asks whether to run another cycle. This continues until all errors are resolved or you choose to stop. If only warnings remain (and <code className="font-mono text-white text-[12px]">--warnings</code> wasn't passed), it stops and tells you how many warnings are left.
                </p>
              </div>
            </div>

            {/* How Briefs Are Built */}
            <div id="how-briefs-are-built" className="scroll-mt-32">
              <h3 className="text-xl font-space font-medium mb-4 text-white">How Briefs Are Built</h3>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--mex-text-muted)" }}>
                The brief builder constructs a precise, targeted prompt for each broken file. When multiple files have issues, they're combined into a single prompt with numbered sections. For each broken file, the brief includes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 hover:border-[var(--mex-primary)]/40 transition-colors">
                  <h4 className="text-md font-mono text-white mb-2 flex items-center gap-2">
                    <span className="text-[var(--mex-primary)]">01</span> File path
                  </h4>
                  <p className="text-[13px] text-[#a1a1aa]">Which scaffold file needs fixing.</p>
                </div>
                
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 hover:border-[var(--mex-primary)]/40 transition-colors">
                  <h4 className="text-md font-mono text-white mb-2 flex items-center gap-2">
                    <span className="text-[var(--mex-primary)]">02</span> Issues found
                  </h4>
                  <p className="text-[13px] text-[#a1a1aa] mb-2">Every issue with severity and code.</p>
                  <code className="text-[11px] font-mono text-red-400 bg-red-950/20 px-2 py-1 rounded border border-red-900/30 break-all">[error] MISSING_PATH: Referenced path does not exist: src/old/auth.ts</code>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 hover:border-[var(--mex-primary)]/40 transition-colors">
                  <h4 className="text-md font-mono text-white mb-2 flex items-center gap-2">
                    <span className="text-[var(--mex-primary)]">03</span> Current file content
                  </h4>
                  <p className="text-[13px] text-[#a1a1aa]">The full markdown content of the scaffold file, so the AI can see what needs changing.</p>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 hover:border-[var(--mex-primary)]/40 transition-colors">
                  <h4 className="text-md font-mono text-white mb-2 flex items-center gap-2">
                    <span className="text-[var(--mex-primary)]">04</span> Filesystem context
                  </h4>
                  <p className="text-[13px] text-[#a1a1aa]">For <code className="text-red-400 text-[11px] font-mono">MISSING_PATH</code> issues, lists what actually exists in the expected directory. If fewer than 20 files match the extension, lists all files with that extension. Gives AI enough context to find the correct current path.</p>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 md:col-span-2 hover:border-[var(--mex-primary)]/40 transition-colors">
                  <h4 className="text-md font-mono text-white mb-2 flex items-center gap-2">
                    <span className="text-[var(--mex-primary)]">05</span> Recent git changes
                  </h4>
                  <p className="text-[13px] text-[#a1a1aa]">For paths referenced by the broken file, includes the git diff from the last 5 commits (<code className="text-white font-mono text-[11px]">HEAD~5..HEAD</code>). This reveals renamed, moved, or deleted files to the AI.</p>
                </div>
              </div>

              <div className="border-l-2 border-[var(--mex-primary)] pl-4 mb-10 py-1">
                <p className="text-[14px] italic text-[var(--mex-text)] leading-relaxed">
                  The AI is instructed to: fix <strong>only</strong> what's necessary, not rewrite correct sections. When a referenced path no longer exists, find the correct current path from the filesystem context and update the reference.
                </p>
              </div>
            </div>

            {/* Interactive Shell Script */}
            <div id="interactive-shell-script" className="scroll-mt-32">
              <h3 className="text-2xl font-space font-medium mb-6 text-white border-b border-[#27272a] pb-3">Interactive Shell Script <span className="text-sm font-normal text-[#a1a1aa] ml-2">(bash .mex/sync.sh)</span></h3>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--mex-text-muted)" }}>
                The shell script provides a menu with four options:
              </p>

              <ol className="space-y-4 mb-8 text-[14px] text-[#a1a1aa]">
                <li className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-mono text-white shrink-0 mt-0.5">1</span>
                  <div>
                    <strong className="text-white block mb-1">Targeted sync (recommended)</strong>
                    Runs <code className="font-mono text-white text-[12px]">mex sync</code> under the hood. AI fixes only the flagged files.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[var(--mex-primary)]/20 border border-[var(--mex-primary)]/30 flex items-center justify-center font-mono text-[var(--mex-primary)] shrink-0 mt-0.5">2</span>
                  <div>
                    <strong className="text-[var(--mex-primary)] block mb-1 flex items-center gap-2">Full resync <span className="text-[10px] bg-[var(--mex-primary)] text-white px-1.5 py-0.5 rounded uppercase tracking-wider">Shell only</span></strong>
                    AI re-reads the entire codebase and updates all scaffold files. Used when drift is so extensive that targeted fixes aren't enough.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-mono text-white shrink-0 mt-0.5">3</span>
                  <div>
                    <strong className="text-white block mb-1">Show me the prompts</strong>
                    Runs <code className="font-mono text-white text-[12px]">mex sync --dry-run</code> and prints the targeted prompts for manual pasting.
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-mono text-white shrink-0 mt-0.5">4</span>
                  <div>
                    <strong className="text-white block mb-1">Exit</strong>
                    Fix it yourself.
                  </div>
                </li>
              </ol>

              <div className="bg-[#111116] border border-[#27272a] rounded-xl p-6 mb-8">
                <h4 className="text-[15px] font-space font-medium text-white mb-3">Inside a Full Resync</h4>
                <p className="text-[13px] text-[#a1a1aa] mb-4">
                  Full resync is a separate mode not available through the CLI directly. It sends a comprehensive prompt that instructs the AI to:
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[13px] text-[#a1a1aa] list-disc ms-4 marker:text-[#3f3f46]">
                  <li>Read all context files to understand current state</li>
                  <li>Explore what has changed since each file's <code className="text-white font-mono text-[11px]">last_updated</code> date</li>
                  <li>Compare scaffold content to codebase file by file</li>
                  <li>Make surgical, targeted edits — not rewrites</li>
                  <li>Preserve YAML frontmatter structure</li>
                  <li>Update <code className="text-white font-mono text-[11px]">last_updated</code> in frontmatter</li>
                  <li>Update <code className="text-white font-mono text-[11px]">ROUTER.md</code> "Current Project State"</li>
                  <li className="sm:col-span-2 text-white">In <code className="font-mono text-[11px]">context/decisions.md</code>: never delete existing decisions. If changed, mark old as superseded and add new above it.</li>
                </ul>
              </div>

              <p className="text-[14px] leading-relaxed text-[#a1a1aa] mb-10">
                If Claude Code CLI is installed, the full resync runs in the background with a spinner. Otherwise, it prints the prompt for manual pasting. The shell script supports <code className="font-mono text-white bg-[#111] px-1.5 py-0.5 rounded text-[12px]">--dry-run</code> to show what needs fixing without executing anything.
              </p>
            </div>

            {/* Filtering Logic */}
            <div id="sync-filtering-logic" className="scroll-mt-32">
              <h3 className="text-xl font-space font-medium mb-4 text-white">Filtering Logic</h3>
              <div className="bg-[var(--mex-bg-2)] border border-[#27272a] rounded-xl p-6 mb-12">
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] mb-4">
                  By default, sync <strong className="text-white">only targets files that have at least one error</strong>. If a file has errors, all of its issues (errors and warnings) are included in the brief — this gives the AI full context about everything wrong with that file. Files with only warnings are skipped.
                </p>
                <p className="text-[14px] leading-relaxed text-[#a1a1aa]">
                  Use <code className="font-mono text-white bg-[#000] border border-[#333] px-1.5 py-0.5 rounded text-[12px]">--warnings</code> to include warning-only files in the sync.
                </p>
              </div>
            </div>

            {/* For Contributors */}
            <div id="sync-contributors" className="scroll-mt-32 mt-16 bg-[#09090b] border border-[#27272a] rounded-2xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[var(--mex-primary)] opacity-5 blur-[120px] rounded-full pointer-events-none" />
              <h3 className="text-2xl font-space font-semibold mb-6 text-white border-b border-[#27272a] pb-4 inline-block">For Contributors</h3>
              <p className="mb-6 text-[15px] leading-relaxed max-w-3xl" style={{ color: "var(--mex-text-muted)" }}>
                The sync engine lives in <code className="font-mono text-[13px] text-[var(--mex-primary)] bg-[#111] border border-[#27272a] rounded px-1.5 py-0.5">src/sync/</code>. Key files:
              </p>

              <div className="bg-[#111] border rounded-xl overflow-x-auto mb-6 shadow-inner" style={{ borderColor: 'var(--mex-border)' }}>
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                    <tr>
                      <th className="px-6 py-4 font-mono font-medium whitespace-nowrap min-w-[200px]">File</th>
                      <th className="px-6 py-4 font-medium">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-[13px] text-white">index.ts</td>
                      <td className="px-6 py-4 leading-relaxed text-[#a1a1aa]">The sync loop — drift check, mode selection, Claude invocation, verify, repeat.</td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-[13px] text-white">brief-builder.ts</td>
                      <td className="px-6 py-4 leading-relaxed text-[#a1a1aa]">Constructs targeted prompts with file content, issues, filesystem context, and git diffs.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6 relative z-10">
                <div className="bg-[#111116] border border-[#27272a] rounded-xl p-5">
                  <h4 className="text-[14px] text-white font-medium mb-3 flex items-center gap-2">
                    <span className="text-[var(--mex-primary)]">#</span> Git Operations
                  </h4>
                  <p className="text-[13px] text-[#a1a1aa] mb-2 leading-relaxed">
                    The brief builder uses <code className="font-mono text-[11px] text-white">src/git.ts</code> and the <code className="font-mono text-[11px] text-white">simple-git</code> library:
                  </p>
                  <code className="block w-full bg-[#000] border border-[#333] p-2 rounded text-[11px] font-mono text-emerald-400 mb-2 overflow-x-auto">getGitDiff(paths, cwd)</code>
                  <p className="text-[12px] text-[#71717a]">Gets the diff for specific paths over the last 5 commits.</p>
                </div>
                
                <div className="bg-[#111116] border border-[#27272a] rounded-xl p-5">
                  <h4 className="text-[14px] text-white font-medium mb-3 flex items-center gap-2">
                    <span className="text-[var(--mex-primary)]">#</span> Claude Invocation
                  </h4>
                  <p className="text-[13px] text-[#a1a1aa] mb-2 leading-relaxed">
                    The Claude Code session is launched via:
                  </p>
                  <code className="block w-full bg-[#000] border border-[#333] p-2 rounded text-[11px] font-mono text-emerald-400 mb-2 overflow-x-auto">spawnSync("claude", [brief])</code>
                  <p className="text-[12px] text-[#71717a]">With <code className="text-white font-mono text-[10px]">stdio: "inherit"</code> (so the user sees the agent working) and a 5-minute timeout.</p>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-[var(--mex-primary)]/5 border border-[var(--mex-primary)]/20 relative z-10 w-full">
                <p className="text-[14px] text-[#a1a1aa] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--mex-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Ready to build? Check out the <Link href="/mex/contributing" className="text-[var(--mex-primary)] font-medium hover:underline border-b border-transparent hover:border-[var(--mex-primary)] transition-colors">Contributing Guide</Link> for good first issues and PR guidelines.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 6: Shell Scripts */}
          <section id="shell-scripts" className="scroll-mt-32 space-y-12 mb-32 relative">
            <div className="border-b pb-6" style={{ borderColor: "var(--mex-border)" }}>
              <h2 className="text-3xl font-space font-semibold mb-4 text-white">6. Shell Scripts (git clone only)</h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--mex-text-muted)" }}>
                If you installed via <code className="font-mono text-white text-[13px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded">git clone</code> instead of <code className="font-mono text-white text-[13px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded">npx promexeus setup</code>, these bash scripts are available. They require a bash-compatible shell (native on macOS/Linux, WSL or Git Bash on Windows). All support <code className="font-mono text-white text-[13px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded">--help</code>.
              </p>
            </div>

            {/* setup.sh */}
            <div id="setup-sh" className="scroll-mt-32">
              <div className="flex items-center gap-4 border-b border-[#27272a] pb-3 mb-6 relative">
                <h3 className="text-2xl font-mono text-[var(--mex-primary)] font-medium">bash .mex/setup.sh</h3>
              </div>

              <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--mex-text-muted)" }}>
                The bash alternative to <code className="font-mono text-white text-[13px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded">npx promexeus setup</code>. Same 6-step process:
              </p>

              <div className="space-y-6">
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--mex-primary)]" />
                  <h4 className="text-[15px] font-space font-medium text-white mb-2 ml-2">Step 1: Build CLI</h4>
                  <p className="text-[14px] text-[#a1a1aa] ml-2 leading-relaxed">
                    Checks for Node.js and builds the CLI engine (<code className="font-mono text-white text-[12px]">npm install + npm run build</code> inside <code className="font-mono text-white text-[12px]">.mex/</code>). If the <code className="font-mono text-white text-[12px]">mex</code> command is already available globally, it skips the build. If Node.js isn't installed, it continues without the CLI — the scaffold still works, you just won't have drift detection or sync commands.
                  </p>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--mex-primary)]" />
                  <h4 className="text-[15px] font-space font-medium text-white mb-3 ml-2">Step 2: Detect project state</h4>
                  <p className="text-[14px] text-[#a1a1aa] mb-4 ml-2 leading-relaxed">
                    Scans for source files (supports 25+ languages) to determine which mode to use:
                  </p>
                  <div className="ml-2 bg-[#111116] border border-[#27272a] rounded-lg overflow-x-auto">
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                        <tr>
                          <th className="px-5 py-3 font-medium whitespace-nowrap min-w-[100px]">State</th>
                          <th className="px-5 py-3 font-medium min-w-[200px]">Condition</th>
                          <th className="px-5 py-3 font-medium min-w-[200px]">Mode</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                        <tr className="hover:bg-[#1a1a1c]/70">
                          <td className="px-5 py-3 font-mono text-[12px] text-emerald-400">existing</td>
                          <td className="px-5 py-3 text-[#a1a1aa]">More than 3 source files found</td>
                          <td className="px-5 py-3 text-white">Populate scaffold from code analysis</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70">
                          <td className="px-5 py-3 font-mono text-[12px] text-blue-400">fresh</td>
                          <td className="px-5 py-3 text-[#a1a1aa]">3 or fewer source files</td>
                          <td className="px-5 py-3 text-white">Populate scaffold from user intent (asks questions)</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70">
                          <td className="px-5 py-3 font-mono text-[12px] text-yellow-400">partial</td>
                          <td className="px-5 py-3 text-[#a1a1aa]">Source files exist and scaffold is already partially filled</td>
                          <td className="px-5 py-3 text-white">Populate empty slots, skip what's already filled</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--mex-primary)]" />
                  <h4 className="text-[15px] font-space font-medium text-white mb-3 ml-2">Step 3: Tool config</h4>
                  <p className="text-[14px] text-[#a1a1aa] mb-4 ml-2 leading-relaxed">
                    Asks which AI tool you use and copies the appropriate config file to your project root. Supports selecting multiple tools at once. Config files are identical — they all point the agent to <code className="font-mono text-white text-[12px]">.mex/ROUTER.md</code>. If a config file already exists, it asks before overwriting.
                  </p>
                  <div className="ml-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-[#111116] border border-[#333] rounded px-4 py-3 text-center">
                      <div className="text-[13px] text-white font-medium mb-1">Claude Code</div>
                      <code className="text-[11px] font-mono text-[#a1a1aa]">CLAUDE.md</code>
                    </div>
                    <div className="bg-[#111116] border border-[#333] rounded px-4 py-3 text-center">
                      <div className="text-[13px] text-white font-medium mb-1">Cursor</div>
                      <code className="text-[11px] font-mono text-[#a1a1aa]">.cursorrules</code>
                    </div>
                    <div className="bg-[#111116] border border-[#333] rounded px-4 py-3 text-center">
                      <div className="text-[13px] text-white font-medium mb-1">Windsurf</div>
                      <code className="text-[11px] font-mono text-[#a1a1aa]">.windsurfrules</code>
                    </div>
                    <div className="bg-[#111116] border border-[#333] rounded px-4 py-3 text-center">
                      <div className="text-[13px] text-white font-medium mb-1">GitHub Copilot</div>
                      <code className="text-[10px] sm:text-[11px] font-mono text-[#a1a1aa] break-all">.github/copilot-instructions.md</code>
                    </div>
                  </div>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--mex-primary)]" />
                  <h4 className="text-[15px] font-space font-medium text-white mb-2 ml-2">Step 4: Pre-analyze codebase</h4>
                  <p className="text-[14px] text-[#a1a1aa] ml-2 leading-relaxed">
                    For existing/partial projects with the CLI available, runs <code className="font-mono text-white text-[12px]">mex init --json</code> with a loading spinner. The scanner brief (~5-8k tokens) replaces the need for the AI to explore the filesystem (~50k tokens). If the scanner fails, the AI falls back to direct filesystem exploration.
                  </p>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--mex-primary)]" />
                  <h4 className="text-[15px] font-space font-medium text-white mb-3 ml-2">Step 5: Build the setup prompt</h4>
                  <ul className="list-disc ms-8 text-[14px] text-[#a1a1aa] space-y-2 mb-4 leading-relaxed marker:text-[#3f3f46]">
                    <li><strong className="text-white">Existing projects (with brief):</strong> instructs the AI to reason from the scanner brief, populate all context files, generate 3-5 starter patterns, and wire frontmatter edges</li>
                    <li><strong className="text-white">Existing projects (without brief):</strong> same, but the AI explores the filesystem directly</li>
                    <li><strong className="text-white">Fresh projects:</strong> asks the user 7 questions one at a time (what does it do, hard rules, tech stack, stack rationale, component flow, day-one patterns, deliberate exclusions), then populates the scaffold from the answers</li>
                  </ul>
                  <p className="text-[14px] italic text-[#a1a1aa] ml-2 bg-[#111116] border border-[#27272a] px-3 py-2 rounded">
                    All prompts run 3 passes: populate context files &rarr; generate patterns &rarr; wire edges across all files.
                  </p>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[var(--mex-primary)]" />
                  <h4 className="text-[15px] font-space font-medium text-white mb-2 ml-2">Step 6: Run or print</h4>
                  <p className="text-[14px] text-[#a1a1aa] ml-2 leading-relaxed">
                    If Claude Code was selected and the CLI is installed, launches an interactive Claude session directly. Otherwise, prints the prompt between copy markers for manual pasting. After completion, shows available commands and suggests installing <code className="font-mono text-white text-[12px]">promexeus</code> as a dev dependency for ongoing use.
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-[#111116] border border-[#333] rounded-lg p-3 inline-block">
                <span className="text-[13px] font-mono text-[#a1a1aa]"><strong className="text-white">Flags:</strong> <code className="text-[var(--mex-primary)]">--dry-run</code> — shows what would happen without making any changes.</span>
              </div>
            </div>

            {/* sync.sh */}
            <div id="sync-sh" className="scroll-mt-32">
              <div className="flex items-center gap-4 border-b border-[#27272a] pb-3 mb-6 relative">
                <h3 className="text-2xl font-mono text-[var(--mex-primary)] font-medium">bash .mex/sync.sh</h3>
              </div>
              <p className="text-[15px] leading-relaxed mb-6" style={{ color: "var(--mex-text-muted)" }}>
                A wrapper around <code className="font-mono text-white text-[13px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded">mex sync</code> that adds a full resync option. Auto-builds the CLI if it hasn't been built yet.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-space font-medium mb-4 text-white">Flow</h4>
                  <ol className="space-y-4 text-[14px] text-[#a1a1aa]">
                    <li className="flex gap-4 items-start">
                      <span className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-mono text-[13px] text-white shrink-0">1</span>
                      <div className="leading-relaxed mt-1">Runs <code className="font-mono text-white text-[12px]">mex check --quiet</code> for the summary, then <code className="font-mono text-white text-[12px]">mex check --json</code> to count issues, then the full check for the detailed report.</div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-mono text-[13px] text-white shrink-0">2</span>
                      <div className="leading-relaxed mt-1">If no issues, exits with a success message.</div>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="w-8 h-8 rounded-full bg-[#111] border border-[#333] flex items-center justify-center font-mono text-[13px] text-white shrink-0">3</span>
                      <div className="leading-relaxed mt-1">Presents four options:</div>
                    </li>
                  </ol>
                  <div className="ml-12 mt-3 space-y-2">
                    <div className="bg-[#111116] border border-[#27272a] rounded p-3 text-[13px]">
                      <strong className="text-white block">Targeted sync (default)</strong>
                      <span className="text-[#a1a1aa]">Runs mex sync — AI fixes only the flagged files</span>
                    </div>
                    <div className="bg-[var(--mex-primary)]/10 border border-[var(--mex-primary)]/30 rounded p-3 text-[13px]">
                      <strong className="text-[var(--mex-primary)] block">Full resync</strong>
                      <span className="text-[#a1a1aa]">Sends a comprehensive prompt to re-read and update the entire scaffold</span>
                    </div>
                    <div className="bg-[#111116] border border-[#27272a] rounded p-3 text-[13px]">
                      <strong className="text-white block">Show me the prompts</strong>
                      <span className="text-[#a1a1aa]">Runs mex sync --dry-run for manual pasting</span>
                    </div>
                    <div className="bg-[#111116] border border-[#27272a] rounded p-3 text-[13px]">
                      <strong className="text-white block">Exit</strong>
                      <span className="text-[#a1a1aa]">Stop, fix it yourself</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#09090b] border border-indigo-900/30 rounded-xl p-6 shadow-lg shadow-indigo-900/5">
                  <h4 className="text-lg font-space font-medium mb-4 text-indigo-400">Full resync rules (enforced)</h4>
                  <ul className="space-y-3 text-[13px] text-[#a1a1aa] mb-6">
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span> Surgical, targeted edits — not full file rewrites</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span> Preserve YAML frontmatter structure — edit individual fields, never delete the whole block</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span> In <code className="font-mono text-[11px] text-white">decisions.md</code>: never delete existing decisions. Superseded decisions get marked as such, and the new decision is added above</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span> Update <code className="font-mono text-[11px] text-white">last_updated</code> in frontmatter for every changed file</li>
                    <li className="flex items-start gap-2"><span className="text-indigo-500 mt-1">•</span> Update <code className="font-mono text-[11px] text-white">ROUTER.md</code> "Current Project State" after all updates</li>
                  </ul>
                  <p className="text-[12px] italic text-[#71717a] border-t border-indigo-900/30 pt-4">
                    If the CLI isn't available, the script falls back to printing the full resync prompt for manual use.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 bg-[#111116] border border-[#333] rounded-lg p-3 inline-block">
                <span className="text-[13px] font-mono text-[#a1a1aa]"><strong className="text-white">Flags:</strong> <code className="text-[var(--mex-primary)]">--dry-run</code> — shows what needs fixing without executing.</span>
              </div>
            </div>

            {/* update.sh */}
            <div id="update-sh" className="scroll-mt-32">
              <div className="flex items-center gap-4 border-b border-[#27272a] pb-3 mb-6 relative">
                <h3 className="text-2xl font-mono text-[var(--mex-primary)] font-medium">bash .mex/update.sh</h3>
              </div>
              <p className="text-[15px] leading-relaxed mb-8" style={{ color: "var(--mex-text-muted)" }}>
                Updates mex infrastructure files from GitHub without touching your populated content.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-xl p-5">
                  <h4 className="text-[14px] font-medium text-emerald-400 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    What gets updated (safe to overwrite)
                  </h4>
                  <ul className="text-[13px] text-[#a1a1aa] space-y-2">
                    <li><strong className="text-white">Shell scripts:</strong> <code className="font-mono text-[11px]">setup.sh, update.sh, sync.sh, visualize.sh</code></li>
                    <li><strong className="text-white">Documentation:</strong> <code className="font-mono text-[11px]">SETUP.md, SYNC.md, LICENSE, patterns/README.md</code></li>
                    <li><strong className="text-white">Build config:</strong> <code className="font-mono text-[11px]">package.json, tsconfig.json, tsup.config.ts</code></li>
                    <li><strong className="text-white">Full directories:</strong> <code className="font-mono text-[11px]">.tool-configs/, src/, test/</code></li>
                  </ul>
                </div>

                <div className="bg-red-950/10 border border-red-900/30 rounded-xl p-5">
                  <h4 className="text-[14px] font-medium text-red-400 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    What is NEVER touched
                  </h4>
                  <ul className="text-[13px] text-[#a1a1aa] space-y-2">
                    <li><strong className="text-white">Core routing:</strong> <code className="font-mono text-[11px]">AGENTS.md, ROUTER.md</code></li>
                    <li><strong className="text-white">All context:</strong> Everything in <code className="font-mono text-[11px]">context/</code></li>
                    <li><strong className="text-white">Patterns:</strong> <code className="font-mono text-[11px]">patterns/INDEX.md</code> and user-created pattern files</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6">
                <h4 className="text-lg font-space font-medium mb-4 text-white">Process</h4>
                <ol className="text-[14px] text-[#a1a1aa] list-decimal ms-5 space-y-2 marker:font-mono marker:text-[var(--mex-primary)]">
                  <li className="pl-2">Clones the latest mex from GitHub into a temp directory (shallow clone)</li>
                  <li className="pl-2">Compares each infrastructure file — copies only files that changed or are new</li>
                  <li className="pl-2">Checks if upstream added new context file templates — if so, copies them (new template files won't overwrite existing populated files)</li>
                  <li className="pl-2">Detects if <code className="font-mono text-white text-[12px]">ROUTER.md</code> or <code className="font-mono text-white text-[12px]">AGENTS.md</code> have new sections upstream and warns you</li>
                  <li className="pl-2">If any CLI source files changed, automatically rebuilds the CLI (<code className="font-mono text-white text-[12px]">npm install + npm run build</code>)</li>
                  <li className="pl-2">Saves the latest commit hash to <code className="font-mono text-white text-[12px]">.mex-version</code> for future reference</li>
                  <li className="pl-2">Prints a summary of what was updated, added, and unchanged</li>
                </ol>
              </div>
            </div>

            {/* visualize.sh */}
            <div id="visualize-sh" className="scroll-mt-32">
              <div className="flex items-center gap-4 border-b border-[#27272a] pb-3 mb-6 relative">
                <h3 className="text-2xl font-mono text-purple-400 font-medium">bash .mex/visualize.sh</h3>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-center bg-[#111116] border border-[#27272a] rounded-xl p-6">
                <div className="flex-1">
                  <p className="text-[15px] leading-relaxed mb-4 text-[#d4d4d8]">
                    Launches a local web server (port 4444) with an interactive graph visualization of your scaffold. Shows all scaffold files as nodes and their frontmatter edges as connections.
                  </p>
                  <p className="text-[14px] leading-relaxed text-[#a1a1aa] mb-4">
                    Parses YAML frontmatter from all scaffold files, detects their completion status (populated, empty, partial), and renders an interactive force-directed graph in the browser. Auto-opens the browser on launch.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-purple-950/20 border border-purple-900/30 text-purple-300 px-3 py-1.5 rounded-lg text-[13px] font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Zero dependencies — uses embedded Python HTTP server
                  </div>
                </div>
                
                <div className="w-full md:w-64 h-48 bg-[#09090b] border border-[#333] rounded-lg flex items-center justify-center relative overflow-hidden group">
                  {/* Decorative faint graph lines just for aesthetics */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen group-hover:opacity-40 transition-opacity duration-700">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <line x1="30%" y1="30%" x2="70%" y2="50%" stroke="var(--mex-primary)" strokeWidth="1" />
                      <line x1="30%" y1="30%" x2="40%" y2="70%" stroke="var(--mex-primary)" strokeWidth="1" />
                      <line x1="70%" y1="50%" x2="80%" y2="80%" stroke="var(--mex-primary)" strokeWidth="1" />
                      <line x1="40%" y1="70%" x2="80%" y2="80%" stroke="var(--mex-primary)" strokeWidth="1" />
                      <circle cx="30%" cy="30%" r="4" fill="#a1a1aa" />
                      <circle cx="70%" cy="50%" r="6" fill="var(--mex-primary)" />
                      <circle cx="40%" cy="70%" r="4" fill="#a1a1aa" />
                      <circle cx="80%" cy="80%" r="5" fill="#a1a1aa" />
                    </svg>
                  </div>
                  <div className="text-[12px] font-mono text-[#a1a1aa] z-10 bg-[#000]/80 px-2 py-1 rounded backdrop-blur">Local Graph UI</div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: Multi-Tool Setup */}
          <section id="multi-tool-setup" className="scroll-mt-32 space-y-12 mb-32 relative">
            <div className="border-b pb-6" style={{ borderColor: "var(--mex-border)" }}>
              <h2 className="text-3xl font-space font-semibold mb-4 text-white">7. Multi-Tool Setup</h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--mex-text-muted)" }}>
                mex works with any AI coding tool that can read files from the project directory. The scaffold itself is tool-agnostic — it's just markdown files. What differs is how each tool discovers the entry point.
              </p>
            </div>

            {/* How It Works */}
            <div id="multi-tool-how-it-works" className="scroll-mt-32">
              <h3 className="text-xl font-space font-medium mb-4 text-white">How It Works</h3>
              <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[var(--mex-primary)] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] mb-4 relative z-10">
                  Each AI tool has a specific config file it auto-loads at the start of every session. mex uses this to bootstrap the navigation chain: the config file tells the agent to read <code className="font-mono text-white text-[12px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded">.mex/ROUTER.md</code>, which contains the routing table, project state, and behavioural contract.
                </p>
                <div className="bg-[#111116] border border-[#333] rounded-lg p-4 relative z-10">
                  <p className="text-[13px] text-[#d4d4d8] leading-relaxed italic">
                    All config files contain identical content — the same anchor text from <code className="font-mono text-white text-[11px]">.mex/AGENTS.md</code>: project identity, non-negotiables, commands, and the instruction to read ROUTER.md before doing anything.
                  </p>
                </div>
              </div>
            </div>

            {/* Supported Tools */}
            <div id="multi-tool-supported" className="scroll-mt-32">
              <h3 className="text-xl font-space font-medium mb-4 text-[var(--mex-primary)]">Supported Tools</h3>
              <div className="bg-[#111] border rounded-xl overflow-x-auto shadow-inner" style={{ borderColor: 'var(--mex-border)' }}>
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                    <tr>
                      <th className="px-6 py-4 font-medium whitespace-nowrap min-w-[150px]">Tool</th>
                      <th className="px-6 py-4 font-mono font-medium min-w-[200px]">Config file</th>
                      <th className="px-6 py-4 font-medium min-w-[200px]">Location</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-6 py-4 text-white font-medium flex items-center gap-2">Claude Code</td>
                      <td className="px-6 py-4 font-mono text-[13px] text-emerald-400">CLAUDE.md</td>
                      <td className="px-6 py-4 text-[#a1a1aa]">Project root</td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-6 py-4 text-white font-medium flex items-center gap-2">Cursor</td>
                      <td className="px-6 py-4 font-mono text-[13px] text-blue-400">.cursorrules</td>
                      <td className="px-6 py-4 text-[#a1a1aa]">Project root</td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-6 py-4 text-white font-medium flex items-center gap-2">Windsurf</td>
                      <td className="px-6 py-4 font-mono text-[13px] text-purple-400">.windsurfrules</td>
                      <td className="px-6 py-4 text-[#a1a1aa]">Project root</td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-6 py-4 text-white font-medium flex items-center gap-2">GitHub Copilot</td>
                      <td className="px-6 py-4 font-mono text-[13px] text-zinc-300">copilot-instructions.md</td>
                      <td className="px-6 py-4 text-[#a1a1aa]"><code className="font-mono text-white text-[11px] bg-[#000] px-1 rounded border border-[#333]">.github/</code> directory in project root</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Automatic Setup */}
            <div id="multi-tool-auto" className="scroll-mt-32">
              <h3 className="text-xl font-space font-medium mb-4 text-white">Automatic Setup</h3>
              <p className="text-[14px] leading-relaxed text-[#a1a1aa] mb-4">
                During <code className="font-mono text-white text-[12px] bg-[#111] px-1.5 py-0.5 rounded border border-[#333]">mex setup</code>, you're asked which tool you use:
              </p>
              
              <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-0 overflow-hidden mb-6 flex flex-col mx-auto max-w-2xl font-mono text-[13px] shadow-lg">
                <div className="bg-[#1a1a1c] border-b border-[#27272a] px-4 py-2 flex items-center gap-2 text-[#a1a1aa]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <span className="ml-2 text-[12px]">mex setup</span>
                </div>
                <div className="p-5 text-[#d4d4d8] leading-loose">
                  <div className="text-[var(--mex-primary)] mb-2">? Which AI tool do you use?</div>
                  <div className="pl-4 text-[#a1a1aa] hover:text-white transition-colors cursor-crosshair">1) Claude Code</div>
                  <div className="pl-4 text-[#a1a1aa] hover:text-white transition-colors cursor-crosshair">2) Cursor</div>
                  <div className="pl-4 text-[#a1a1aa] hover:text-white transition-colors cursor-crosshair">3) Windsurf</div>
                  <div className="pl-4 text-[#a1a1aa] hover:text-white transition-colors cursor-crosshair">4) GitHub Copilot</div>
                  <div className="pl-4 text-emerald-400 hover:text-emerald-300 transition-colors cursor-crosshair flex items-center gap-2">5) Multiple (select next) <span className="text-[#555] text-[10px]">◄ selected</span></div>
                  <div className="pl-4 text-[#a1a1aa] hover:text-white transition-colors cursor-crosshair">6) None / other (skip)</div>
                </div>
              </div>

              <div className="bg-[#111116] border border-[#27272a] rounded-xl p-5">
                <p className="text-[14px] leading-relaxed text-[#a1a1aa]">
                  Selecting option 5 lets you enter multiple tool numbers (e.g., <code className="text-white">1 2 4</code> for Claude Code + Cursor + Copilot). The script copies the correct config file for each selection to the right location. If a config file already exists at the destination, it asks before overwriting.
                </p>
              </div>
            </div>

            {/* Manual Setup */}
            <div id="multi-tool-manual" className="scroll-mt-32">
              <h3 className="text-xl font-space font-medium mb-4 text-white">Manual Setup</h3>
              <p className="text-[14px] leading-relaxed text-[#a1a1aa] mb-4">
                If you skipped tool config during setup or want to add another tool later, copy the file manually:
              </p>

              <div className="grid md:grid-cols-2 gap-4 auto-rows-fr">
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 hover:border-emerald-500/30 transition-colors group">
                  <div className="text-[12px] font-space font-medium text-emerald-500 mb-2">Claude Code</div>
                  <code className="text-[11px] font-mono text-[#a1a1aa] break-all group-hover:text-white transition-colors">cp .mex/.tool-configs/CLAUDE.md ./CLAUDE.md</code>
                </div>
                
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 hover:border-blue-500/30 transition-colors group">
                  <div className="text-[12px] font-space font-medium text-blue-500 mb-2">Cursor</div>
                  <code className="text-[11px] font-mono text-[#a1a1aa] break-all group-hover:text-white transition-colors">cp .mex/.tool-configs/.cursorrules ./.cursorrules</code>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 hover:border-purple-500/30 transition-colors group">
                  <div className="text-[12px] font-space font-medium text-purple-500 mb-2">Windsurf</div>
                  <code className="text-[11px] font-mono text-[#a1a1aa] break-all group-hover:text-white transition-colors">cp .mex/.tool-configs/.windsurfrules ./.windsurfrules</code>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 hover:border-zinc-300/30 transition-colors group">
                  <div className="text-[12px] font-space font-medium text-zinc-300 mb-2">GitHub Copilot</div>
                  <code className="text-[11px] font-mono text-[#a1a1aa] break-all group-hover:text-white transition-colors">mkdir -p .github && cp .mex/.tool-configs/copilot-instructions.md ./.github/copilot-instructions.md</code>
                </div>
              </div>
            </div>

            {/* Using a Tool Not Listed */}
            <div id="multi-tool-unlisted" className="scroll-mt-32">
              <h3 className="text-xl font-space font-medium mb-4 text-white">Using a Tool Not Listed</h3>
              <p className="text-[14px] leading-relaxed text-[#a1a1aa] mb-4">
                For any AI tool not listed above, there are two options:
              </p>

              <ol className="space-y-4 text-[14px] text-[#a1a1aa] mb-6">
                <li className="flex gap-4 items-start bg-[#111116] border border-[#27272a] p-5 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-[#1a1a1c] border border-[#333] flex items-center justify-center font-mono text-[12px] text-white shrink-0 mt-0.5">1</span>
                  <div className="leading-relaxed">
                    <strong className="text-white block mb-1">Has a config file / custom instructions support</strong>
                    Add the instruction <code className="text-[var(--mex-primary)] bg-[var(--mex-primary)]/10 border border-[var(--mex-primary)]/20 px-1 py-0.5 rounded italic">"Read .mex/ROUTER.md before starting any task"</code> to it.
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-[#111116] border border-[#27272a] p-5 rounded-xl">
                  <span className="w-6 h-6 rounded-full bg-[#1a1a1c] border border-[#333] flex items-center justify-center font-mono text-[12px] text-white shrink-0 mt-0.5">2</span>
                  <div className="leading-relaxed">
                    <strong className="text-white block mb-1">No config file support</strong>
                    Paste that instruction at the start of each session, or point the agent to <code className="font-mono text-white text-[12px]">.mex/AGENTS.md</code> directly.
                  </div>
                </li>
              </ol>

              <div className="border-l-2 border-[var(--mex-primary)] pl-4 py-1 mt-6">
                <p className="text-[14px] italic text-[var(--mex-text)]">
                  The scaffold works identically regardless of which tool you use. The config file is just the entry point.
                </p>
              </div>
            </div>

            {/* Keeping Config Files in Sync */}
            <div id="multi-tool-sync" className="scroll-mt-32 mt-12 pt-12 border-t border-[#27272a]">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <h3 className="text-xl font-space font-medium text-white m-0">Keeping Config Files in Sync</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-[15px] leading-relaxed text-[#a1a1aa] mb-4">
                    <code className="font-mono text-white text-[12px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded">.mex/AGENTS.md</code> is the <strong className="text-white font-medium">source of truth</strong>. The tool config files in your project root are copies. If you update <code className="font-mono text-white text-[12px]">AGENTS.md</code> (project name, non-negotiables, commands), update your root config file too so they stay in sync.
                  </p>
                  <p className="text-[14px] leading-relaxed text-[#a1a1aa]">
                    The <code className="font-mono text-white text-[12px]">mex check</code> drift detection includes tool config files in its scan — it checks paths, commands, and other claims in <code className="font-mono text-[11px] text-white">CLAUDE.md</code>, <code className="font-mono text-[11px] text-white">.cursorrules</code>, and <code className="font-mono text-[11px] text-white">.windsurfrules</code> the same way it checks scaffold files.
                  </p>
                </div>
                
                <div className="bg-[#09090b] border border-yellow-900/30 rounded-xl p-5 shadow-[0_0_30px_rgba(234,179,8,0.03)] flex flex-col items-center justify-center relative min-h-[160px]">
                  <div className="flex items-center justify-between w-full px-4 relative h-full">
                    <div className="bg-[#111] border border-[#333] px-3 py-2 rounded shadow text-[12px] font-mono text-white z-10 relative">
                      .mex/AGENTS.md
                      <div className="absolute -bottom-2 right-1/2 translate-x-1/2 text-[9px] text-yellow-500 uppercase tracking-widest bg-[#000] px-1 border border-yellow-900/30 rounded">Source</div>
                    </div>
                    
                    {/* Dashed animated line */}
                    <svg className="absolute top-1/2 left-0 w-full h-8 -translate-y-1/2 z-0">
                      <line x1="20%" y1="50%" x2="80%" y2="50%" stroke="rgba(234,179,8,0.5)" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>

                    <div className="flex flex-col gap-3 z-10 bg-[#09090b] py-2">
                       <span className="bg-[#111] border border-[#333] px-2 py-1.5 rounded shadow text-[11px] font-mono text-emerald-400">CLAUDE.md</span>
                       <span className="bg-[#111] border border-[#333] px-2 py-1.5 rounded shadow text-[11px] font-mono text-blue-400">.cursorrules</span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                    <span className="bg-[#1a1a1c] text-yellow-500 text-[10px] px-2 py-1 rounded-full border border-yellow-500/20 uppercase tracking-widest font-space flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Monitored by Drift Check
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: Scaffold Structure */}
          <section id="scaffold-structure" className="scroll-mt-32 space-y-16 mb-32">
            <div className="border-b pb-6" style={{ borderColor: "var(--mex-border)" }}>
              <h2 className="text-3xl font-space font-semibold mb-4 text-white">8. Scaffold Structure</h2>
              <p className="text-[15px] leading-relaxed mb-4" style={{ color: "var(--mex-text-muted)" }}>
                The scaffold lives inside a <code className="font-mono text-white text-[12px] px-1.5 py-0.5 bg-[#111] border border-[#333] rounded">.mex/</code> directory in your project root. It's a structured set of markdown files that give AI agents persistent project knowledge. Each file has a specific role, YAML frontmatter for metadata and navigation, and annotation comments that guide what content belongs there.
              </p>
            </div>

            {/* Directory Tree */}
            <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 overflow-x-auto font-mono text-[13px] leading-relaxed text-[#a1a1aa] shadow-lg">
              <div className="text-white mb-2 font-semibold">your-project/</div>
              <div className="flex"><span className="text-[#555] select-none mr-2">├──</span> <span className="text-emerald-400">CLAUDE.md</span><span className="ml-[60px] text-[#555]">← tool config (auto-loaded, points to .mex/)</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">├──</span> <span className="text-[var(--mex-primary)] font-bold">.mex/</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   ├──</span> <span className="text-yellow-500 font-medium">AGENTS.md</span><span className="ml-[60px] text-[#555]">← project identity, non-negotiables, commands</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   ├──</span> <span className="text-blue-400 font-medium">ROUTER.md</span><span className="ml-[60px] text-[#555]">← session bootstrap, routing table, behavioural contract</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   ├──</span> <span className="text-white font-medium">context/</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   │   ├──</span> <span className="text-[#d4d4d8]">architecture.md</span><span className="ml-[18px] text-[#555]">← how components connect and flow</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   │   ├──</span> <span className="text-[#d4d4d8]">stack.md</span><span className="ml-[66px] text-[#555]">← technology choices and reasoning</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   │   ├──</span> <span className="text-[#d4d4d8]">conventions.md</span><span className="ml-[26px] text-[#555]">← naming, structure, code patterns, verify checklist</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   │   ├──</span> <span className="text-[#d4d4d8]">decisions.md</span><span className="ml-[42px] text-[#555]">← append-only decision log</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   │   └──</span> <span className="text-[#d4d4d8]">setup.md</span><span className="ml-[66px] text-[#555]">← environment setup, commands, common issues</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   ├──</span> <span className="text-white font-medium">patterns/</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   │   ├──</span> <span className="text-[#888]">README.md</span><span className="ml-[58px] text-[#555]">← pattern format spec and category guide</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   │   ├──</span> <span className="text-[#d4d4d8]">INDEX.md</span><span className="ml-[66px] text-[#555]">← lookup table for all patterns</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   │   └──</span> <span className="text-[#d4d4d8]">*.md</span><span className="ml-[98px] text-[#555]">← task-specific guides (created during setup and GROW)</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   ├──</span> <span className="text-[#888]">SETUP.md</span><span className="ml-[66px] text-[#555]">← setup reference and prompts</span></div>
              <div className="flex"><span className="text-[#555] select-none mr-2">│   └──</span> <span className="text-[#888]">SYNC.md</span><span className="ml-[74px] text-[#555]">← sync reference and prompts</span></div>
            </div>

            {/* YAML Frontmatter */}
            <div id="scaffold-yaml" className="scroll-mt-32 space-y-6">
              <h3 className="text-2xl font-space font-medium text-white">YAML Frontmatter</h3>
              <p className="text-[15px] leading-relaxed text-[#a1a1aa]">
                Every scaffold file has YAML frontmatter at the top between <code className="text-white bg-[#111] px-1 py-0.5 rounded border border-[#333]">---</code> delimiters. This is what makes the scaffold navigable rather than just a flat pile of files.
              </p>

              <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-[#09090b] border border-[#27272a] rounded-xl p-4 font-mono text-[12px] leading-snug overflow-x-auto h-fit">
                  <div className="text-[#555]">---</div>
                  <div className="text-blue-400">name<span className="text-white">:</span> <span className="text-emerald-400">architecture</span></div>
                  <div className="text-blue-400">description<span className="text-white">:</span> <span className="text-emerald-400">How the major pieces...</span></div>
                  <div className="text-blue-400">triggers<span className="text-white">:</span></div>
                  <div className="text-white">  - <span className="text-yellow-400">"architecture"</span></div>
                  <div className="text-white">  - <span className="text-yellow-400">"system design"</span></div>
                  <div className="text-white">  - <span className="text-yellow-400">"how does X connect to Y"</span></div>
                  <div className="text-blue-400">edges<span className="text-white">:</span></div>
                  <div className="text-blue-400">  - target<span className="text-white">:</span> <span className="text-emerald-400">context/stack.md</span></div>
                  <div className="text-blue-400">    condition<span className="text-white">:</span> <span className="text-emerald-400">when specific...</span></div>
                  <div className="text-blue-400">  - target<span className="text-white">:</span> <span className="text-emerald-400">context/decisions.md</span></div>
                  <div className="text-blue-400">    condition<span className="text-white">:</span> <span className="text-emerald-400">when understanding why...</span></div>
                  <div className="text-blue-400">last_updated<span className="text-white">:</span> <span className="text-purple-400">2025-03-15</span></div>
                  <div className="text-[#555]">---</div>
                </div>
                
                <div className="lg:col-span-3 bg-[#111] border border-[#27272a] rounded-xl overflow-hidden shadow-inner h-fit">
                  <table className="w-full text-left text-[14px]">
                    <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                      <tr>
                        <th className="px-5 py-3 font-medium w-32">Field</th>
                        <th className="px-5 py-3 font-medium">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                      <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                        <td className="px-5 py-3 font-mono text-[13px] text-blue-400">name</td>
                        <td className="px-5 py-3 text-[13px] leading-relaxed">Identifier for the file</td>
                      </tr>
                      <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                        <td className="px-5 py-3 font-mono text-[13px] text-blue-400">description</td>
                        <td className="px-5 py-3 text-[13px] leading-relaxed">One-line summary — used by the agent to decide if this file is relevant</td>
                      </tr>
                      <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                        <td className="px-5 py-3 font-mono text-[13px] text-blue-400">triggers</td>
                        <td className="px-5 py-3 text-[13px] leading-relaxed">Keywords that indicate this file should be loaded. The agent matches the current task against these</td>
                      </tr>
                      <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                        <td className="px-5 py-3 font-mono text-[13px] text-blue-400 align-top">edges</td>
                        <td className="px-5 py-3 text-[13px] leading-relaxed">Pointers to related files with conditions. Creates a navigable web — <i className="text-[#a1a1aa]">"if you're here and need X, go there"</i></td>
                      </tr>
                      <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                        <td className="px-5 py-3 font-mono text-[13px] text-blue-400">last_updated</td>
                        <td className="px-5 py-3 text-[13px] leading-relaxed">When the file was last modified. Used by the staleness checker to prioritize updates</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[var(--mex-primary)]/10 border border-[var(--mex-primary)]/30 rounded-xl p-4 mt-6">
                <p className="text-[14px] leading-relaxed text-[var(--mex-primary)]">
                  Edges are what connect the scaffold into a graph rather than isolated documents. Every context file should have at least 2 edges, every pattern at least 1. Edges are bidirectional where it makes sense.
                </p>
              </div>
            </div>

            {/* AGENTS.md */}
            <div id="scaffold-agents" className="scroll-mt-32 space-y-6 pt-10 border-t border-[#27272a]">
              <div>
                <h3 className="text-2xl font-space font-medium text-yellow-500 mb-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                  </div>
                  AGENTS.md — Project Anchor
                </h3>
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] md:ml-11">
                  The identity file. Loaded every session. Kept deliberately small (target: under 150 tokens) so it never costs meaningful context.
                </p>
              </div>

              <div className="bg-[#111] border border-[#27272a] rounded-xl overflow-hidden md:ml-11">
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                    <tr>
                      <th className="px-5 py-3 font-medium w-1/4">Section</th>
                      <th className="px-5 py-3 font-medium">What goes here</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-5 py-3 font-medium text-white">What This Is</td>
                      <td className="px-5 py-3 text-[14px] text-[#a1a1aa]">One sentence. Factual description of what the software does. Not a tagline</td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-5 py-3 font-medium text-white align-top">Non-Negotiables</td>
                      <td className="px-5 py-3 text-[14px] text-[#a1a1aa]">3-7 hard rules the agent must never violate. Things that cause real damage if broken. Not preferences — rules</td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-5 py-3 font-medium text-white">Commands</td>
                      <td className="px-5 py-3 text-[14px] text-[#a1a1aa]">Exact commands to dev, test, lint, build. The actual commands from this codebase, not placeholders</td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-5 py-3 font-medium text-white">Scaffold Growth</td>
                      <td className="px-5 py-3 text-[14px] text-[#a1a1aa]">Instruction to update the scaffold after every task — create patterns, update context files</td>
                    </tr>
                    <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                      <td className="px-5 py-3 font-medium text-white">Navigation</td>
                      <td className="px-5 py-3 text-[14px] text-[#a1a1aa]">Points the agent to <code className="font-mono text-[12px] text-white bg-[#000] px-1 rounded border border-[#333]">ROUTER.md</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ROUTER.md */}
            <div id="scaffold-router" className="scroll-mt-32 space-y-6 pt-10 border-t border-[#27272a]">
              <div>
                <h3 className="text-2xl font-space font-medium text-blue-400 mb-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                  </div>
                  ROUTER.md — Session Bootstrap
                </h3>
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] md:ml-11">
                  The navigation hub. Read at the start of every session before any task.
                </p>
              </div>

              <div className="md:ml-11 space-y-8">
                <div>
                  <h4 className="text-white font-medium mb-2">1. Current Project State</h4>
                  <p className="text-[14px] text-[#a1a1aa] leading-relaxed mb-3">
                    Three subsections: Working, Not Yet Built, Known Issues. 3-7 items each. This is the primary drift prevention mechanism. It re-grounds the agent every session so it knows what actually exists right now.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-3">2. Routing Table</h4>
                  <p className="text-[14px] text-[#a1a1aa] leading-relaxed mb-4">
                    Maps task types to the right context file:
                  </p>
                  
                  <div className="bg-[#111] border border-[#27272a] rounded-xl overflow-hidden">
                    <table className="w-full text-left text-[14px]">
                      <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                        <tr>
                          <th className="px-5 py-3 font-medium w-1/2">Task type</th>
                          <th className="px-5 py-3 font-medium">Load</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-5 py-3 text-white">Understanding how the system works</td>
                          <td className="px-5 py-3 font-mono text-[13px] text-emerald-400">context/architecture.md</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-5 py-3 text-white">Working with a specific technology</td>
                          <td className="px-5 py-3 font-mono text-[13px] text-emerald-400">context/stack.md</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-5 py-3 text-white">Writing or reviewing code</td>
                          <td className="px-5 py-3 font-mono text-[13px] text-emerald-400">context/conventions.md</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-5 py-3 text-white">Making a design decision</td>
                          <td className="px-5 py-3 font-mono text-[13px] text-emerald-400">context/decisions.md</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-5 py-3 text-white">Setting up or running the project</td>
                          <td className="px-5 py-3 font-mono text-[13px] text-emerald-400">context/setup.md</td>
                        </tr>
                        <tr className="hover:bg-[#1a1a1c]/70 transition-colors">
                          <td className="px-5 py-3 text-white">Any specific task</td>
                          <td className="px-5 py-3 font-mono text-[13px] text-purple-400">Check patterns/INDEX.md</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[13px] text-[#a1a1aa] mt-3 italic">
                    When domain-specific context files are created (e.g., context/auth.md, context/payments.md), they get added as additional rows in this table.
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-medium mb-2">3. Behavioural Contract</h4>
                  <p className="text-[14px] text-[#a1a1aa] leading-relaxed">
                    The 5-step <code className="text-white text-[12px] px-1 bg-[#111] rounded border border-[#333]">CONTEXT → BUILD → VERIFY → DEBUG → GROW</code> loop that the agent follows for every task. See the "How It Works" section for the full breakdown.
                  </p>
                </div>
              </div>
            </div>

            {/* Context Files Overview */}
            <div id="scaffold-context" className="scroll-mt-32 space-y-6 pt-10 border-t border-[#27272a]">
              <div>
                <h3 className="text-2xl font-space font-medium text-emerald-400 mb-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                  </div>
                  Context Files
                </h3>
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] md:ml-11 mb-8">
                  Five core files covering different dimensions of the project. Each has annotation comments (<code className="text-[#888]">&lt;!-- HTML comments --&gt;</code>) that explain exactly what content belongs in each section, with minimum item counts and examples.
                </p>
              </div>

              <div className="md:ml-11 grid gap-8">
                {/* Architecture */}
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 overflow-hidden">
                  <h4 className="text-lg font-space text-white mb-2 font-mono">context/architecture.md</h4>
                  <p className="text-[14px] text-[#a1a1aa] mb-4">How the major pieces connect and flow. Focus is on flow, not technology — how does a request or action move through the system?</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px] border border-[#333] rounded overflow-hidden min-w-[600px]">
                      <thead className="bg-[#111] text-[#a1a1aa] border-b border-[#333]">
                        <tr><th className="px-4 py-2 w-1/4">Section</th><th className="px-4 py-2">Content</th><th className="px-4 py-2 w-1/3">Guidance</th></tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                        <tr><td className="px-4 py-2 font-medium text-white">System Overview</td><td className="px-4 py-2 text-[#a1a1aa]">How components connect. Text flow diagram or short prose</td><td className="px-4 py-2 text-[#888] italic">5-15 lines, readable in 30s</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">Key Components</td><td className="px-4 py-2 text-[#a1a1aa]">Major modules/services — name, what it does, what it depends on</td><td className="px-4 py-2 text-[#888] italic">Min 3, 1-2 lines each</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">External Dependencies</td><td className="px-4 py-2 text-[#a1a1aa]">Third-party services, APIs, databases — what it is, what it's used for, constraints</td><td className="px-4 py-2 text-[#888] italic">Min 3, 1-2 lines each</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">What Does NOT Exist Here</td><td className="px-4 py-2 text-[#a1a1aa]">Explicit boundaries — what is deliberately outside this system</td><td className="px-4 py-2 text-[#888] italic">Min 2, prevents agent from building things that belong elsewhere</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Stack */}
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 overflow-hidden">
                  <h4 className="text-lg font-space text-white mb-2 font-mono">context/stack.md</h4>
                  <p className="text-[14px] text-[#a1a1aa] mb-4">Technology choices and the reasoning behind them.</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px] border border-[#333] rounded overflow-hidden min-w-[600px]">
                      <thead className="bg-[#111] text-[#a1a1aa] border-b border-[#333]">
                        <tr><th className="px-4 py-2 w-1/4">Section</th><th className="px-4 py-2">Content</th><th className="px-4 py-2 w-1/3">Guidance</th></tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                        <tr><td className="px-4 py-2 font-medium text-white">Core Technologies</td><td className="px-4 py-2 text-[#a1a1aa]">Primary language, framework, runtime with versions</td><td className="px-4 py-2 text-[#888] italic">Min 3, 3-7 items</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white">Key Libraries</td><td className="px-4 py-2 text-[#a1a1aa]">Libraries central to how the project works. Include reason over alternatives</td><td className="px-4 py-2 text-[#888] italic">Min 3, 3-10 items</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">What We Deliberately Do NOT Use</td><td className="px-4 py-2 text-[#a1a1aa]">Technologies or patterns explicitly avoided, and why</td><td className="px-4 py-2 text-[#888] italic">Min 2, prevents unwanted dependencies</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white">Version Constraints</td><td className="px-4 py-2 text-[#a1a1aa]">Important version-specific things to know</td><td className="px-4 py-2 text-[#888] italic">Only fill if meaningful constraints exist</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Conventions */}
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-1 h-full bg-[var(--mex-primary)]" />
                  <h4 className="text-lg font-space text-[var(--mex-primary)] mb-2 font-mono">context/conventions.md</h4>
                  <p className="text-[14px] text-[#a1a1aa] mb-4">How code is written in this project. The most frequently loaded context file — the agent checks it during the <code className="text-[#d4d4d8] text-[12px] bg-[#1a1a1c] px-1 rounded border border-[#333]">VERIFY</code> step of every task.</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px] border border-[#333] rounded overflow-hidden mb-4 min-w-[600px]">
                      <thead className="bg-[#111] text-[#a1a1aa] border-b border-[#333]">
                        <tr><th className="px-4 py-2 w-1/4">Section</th><th className="px-4 py-2">Content</th><th className="px-4 py-2 w-1/3">Guidance</th></tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                        <tr><td className="px-4 py-2 font-medium text-white align-top">Naming</td><td className="px-4 py-2 text-[#a1a1aa]">How files, functions, variables, classes, database columns are named</td><td className="px-4 py-2 text-[#888] italic">Min 3, only conventions actually enforced</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">Structure</td><td className="px-4 py-2 text-[#a1a1aa]">How code is organized within files and across the codebase</td><td className="px-4 py-2 text-[#888] italic">Min 3, focus on what the agent is most likely to get wrong</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white">Patterns</td><td className="px-4 py-2 text-[#a1a1aa]">Recurring code patterns with concrete before/after examples</td><td className="px-4 py-2 text-[#888] italic">Min 2 patterns with examples</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">Verify Checklist</td><td className="px-4 py-2 text-[#a1a1aa]">Checklist the agent runs against any code it writes</td><td className="px-4 py-2 text-[#888] italic">Min 4 items, project-specific things most likely to go wrong</td></tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-[var(--mex-primary)]/10 text-[var(--mex-primary)] text-[13px] p-3 rounded italic border border-[var(--mex-primary)]/20">
                    The Verify Checklist is critical — it's what the agent runs item-by-item during the VERIFY step. Each item should be a concrete, checkable assertion about the code, not a vague principle.
                  </div>
                </div>

                {/* Decisions */}
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6">
                  <h4 className="text-lg font-space text-white mb-2 font-mono">context/decisions.md</h4>
                  <p className="text-[14px] text-[#a1a1aa] mb-4">Append-only decision log. The event clock of the project.</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-[13px] text-white mb-2 font-medium">Format for each entry:</h5>
                      <div className="bg-[#111] border border-[#333] p-3 rounded font-mono text-[11px] text-[#a1a1aa] leading-loose whitespace-nowrap overflow-x-auto">
                        <div className="text-white text-[13px] mb-1">### [Decision Title]</div>
                        <div><strong className="text-white">**Date:**</strong> YYYY-MM-DD</div>
                        <div><strong className="text-white">**Status:**</strong> Active | Superseded by [title]</div>
                        <div><strong className="text-white">**Decision:**</strong> What was decided, one sentence</div>
                        <div><strong className="text-white">**Reasoning:**</strong> Why this was chosen</div>
                        <div><strong className="text-white">**Alternatives considered:**</strong> What else...</div>
                        <div><strong className="text-white">**Consequences:**</strong> What this means...</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[13px] text-white mb-2 font-medium">Key rules:</h5>
                      <ul className="text-[13px] text-[#a1a1aa] space-y-2 list-disc pl-4">
                        <li>Never delete existing decisions</li>
                        <li>When a decision changes, mark the old entry as "Superseded by [new title]" and add the new decision above it</li>
                        <li>Only document decisions where "why" matters — non-obvious choices, important constraints, or reasoning that prevents future mistakes</li>
                        <li>Minimum 3 entries during initial population</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Setup */}
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 overflow-hidden">
                  <h4 className="text-lg font-space text-white mb-2 font-mono">context/setup.md</h4>
                  <p className="text-[14px] text-[#a1a1aa] mb-4">Everything needed to go from clone to running.</p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px] border border-[#333] rounded overflow-hidden min-w-[600px]">
                      <thead className="bg-[#111] text-[#a1a1aa] border-b border-[#333]">
                        <tr><th className="px-4 py-2 w-1/4">Section</th><th className="px-4 py-2">Content</th><th className="px-4 py-2 w-1/3">Guidance</th></tr>
                      </thead>
                      <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                        <tr><td className="px-4 py-2 font-medium text-white align-top">Prerequisites</td><td className="px-4 py-2 text-[#a1a1aa]">What must be installed first, with versions if they matter</td><td className="px-4 py-2 text-[#888] italic">Min 2</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">First-time Setup</td><td className="px-4 py-2 text-[#a1a1aa]">Exact steps from clone to running, in order</td><td className="px-4 py-2 text-[#888] italic">Min 3 steps, actual commands not placeholders</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">Environment Variables</td><td className="px-4 py-2 text-[#a1a1aa]">Required env vars and what they do. No actual values — this file is committed</td><td className="px-4 py-2 text-[#888] italic">List all required, then conditional, then optional</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">Common Commands</td><td className="px-4 py-2 text-[#a1a1aa]">Daily-use commands with more detail than AGENTS.md</td><td className="px-4 py-2 text-[#888] italic">Min 4</td></tr>
                        <tr><td className="px-4 py-2 font-medium text-white align-top">Common Issues</td><td className="px-4 py-2 text-[#a1a1aa]">Things that actually go wrong and how to fix them</td><td className="px-4 py-2 text-[#888] italic">Min 2, not hypothetical problems</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Domain-Specific Context Files */}
            <div id="scaffold-domain" className="scroll-mt-32 space-y-4 pt-6 md:ml-11">
              <h4 className="text-lg font-space font-medium text-white">Domain-Specific Context Files</h4>
              <p className="text-[14px] leading-relaxed text-[#a1a1aa]">
                If a project has domains complex enough that cramming them into <code className="text-white text-[12px] bg-[#111] border border-[#333] px-1 rounded">architecture.md</code> would make it too long or too shallow, additional context files are created in <code className="text-white text-[12px] bg-[#111] border border-[#333] px-1 rounded">context/</code>.
              </p>
              <ul className="text-[14px] font-mono text-emerald-400 space-y-2 list-none bg-[#111] border border-[#27272a] p-4 rounded-xl">
                <li className="flex flex-col md:flex-row md:items-center"><span>context/auth.md</span> <span className="text-[#888] text-[13px] font-sans md:ml-3">— complex auth systems</span></li>
                <li className="flex flex-col md:flex-row md:items-center"><span>context/ingestion.md</span> <span className="text-[#888] text-[13px] font-sans md:ml-3">— data pipeline projects</span></li>
                <li className="flex flex-col md:flex-row md:items-center"><span>context/payments.md</span> <span className="text-[#888] text-[13px] font-sans md:ml-3">— Stripe or payment integrations</span></li>
              </ul>
              <p className="text-[14px] leading-relaxed text-[#a1a1aa] italic">
                These use the same YAML frontmatter format (name, description, triggers, edges, last_updated) and get added as rows in ROUTER.md's routing table. Only created for domains that have real depth — not for simple integrations that fit in a few lines of architecture.md.
              </p>
            </div>

            {/* Patterns */}
            <div id="scaffold-patterns" className="scroll-mt-32 space-y-6 pt-10 border-t border-[#27272a]">
              <div>
                <h3 className="text-2xl font-space font-medium text-purple-400 mb-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-purple-400/10 border border-purple-400/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  Patterns
                </h3>
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] md:ml-11">
                  Patterns are task-specific guides — the accumulated wisdom of working on this project. They live in <code className="text-white text-[12px] bg-[#111] px-1 rounded border border-[#333]">patterns/</code> and are indexed by <code className="font-mono text-[12px] text-white bg-[#111] px-1.5 py-0.5 rounded border border-[#333]">patterns/INDEX.md</code>.
                </p>
              </div>

              <div className="md:ml-11 grid lg:grid-cols-2 gap-6">
                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5 flex flex-col">
                  <h4 className="text-white font-medium mb-4">Pattern Format — Single Task</h4>
                  <div className="font-mono text-[11px] text-[#a1a1aa] leading-loose whitespace-pre-wrap bg-[#111] p-4 rounded-xl border border-[#333] shadow-inner flex-grow">
                    <span className="text-[#555] block mb-2">{`---
name: add-endpoint
description: How to add a new API endpoint...
...
---`}</span>
                    <span className="text-white font-bold text-[13px] block mb-2"># Add Endpoint</span>

                    <span className="text-white font-bold block mt-3">## Context</span>
                    <span className="block mb-2">What to load or know before starting this task.</span>

                    <span className="text-white font-bold block mt-3">## Steps</span>
                    <span className="block mb-2">The workflow — what to do, in what order.</span>

                    <span className="text-white font-bold block mt-3">## Gotchas</span>
                    <span className="block mb-2">Things that go wrong. What to watch out for.</span>

                    <span className="text-white font-bold block mt-3">## Verify</span>
                    <span className="block mb-2">Checklist to run after completing this task.</span>

                    <span className="text-white font-bold block mt-3">## Debug</span>
                    <span className="block mb-2">What to check when this task type breaks.</span>

                    <span className="text-white font-bold block mt-3">## Update Scaffold</span>
                    <span className="block">{`- [ ] Update ROUTER.md "Current Project State"...
- [ ] Update any context files...`}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-5">
                    <h4 className="text-white font-medium mb-3">Pattern Categories</h4>
                    <ul className="text-[13px] text-[#a1a1aa] space-y-4 list-none pl-0">
                      <li className="flex gap-3 items-start"><span className="w-5 h-5 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">1</span> <div><strong className="text-white">Common task patterns</strong> — the repeatable tasks developers do most often. Derived from architecture and conventions.</div></li>
                      <li className="flex gap-3 items-start"><span className="w-5 h-5 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">2</span> <div><strong className="text-white">Integration patterns</strong> — how to work with external dependencies that have non-obvious gotchas. Every external dependency deserves one.</div></li>
                      <li className="flex gap-3 items-start"><span className="w-5 h-5 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">3</span> <div><strong className="text-white">Debug/diagnosis patterns</strong> — when something breaks at a component boundary, where to look.</div></li>
                      <li className="flex gap-3 items-start"><span className="w-5 h-5 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[10px] text-white shrink-0 mt-0.5">4</span> <div><strong className="text-white">Deploy/release patterns</strong> — only if deployment is non-trivial. Staging, rollbacks, migrations.</div></li>
                    </ul>
                  </div>

                  <div className="bg-purple-900/10 border border-purple-900/30 rounded-xl p-5 shadow-[0_0_20px_rgba(168,85,247,0.03)]">
                    <h4 className="text-purple-400 font-medium mb-3">How Patterns Grow</h4>
                    <p className="text-[13px] text-[#a1a1aa] mb-4">Setup seeds 3-5 starter patterns. The rest come from real work through the <code className="text-purple-400 bg-purple-900/20 px-1 rounded border border-purple-500/20">GROW</code> step:</p>
                    <ul className="text-[13px] text-[#d4d4d8] space-y-2 list-none pl-0 font-medium">
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" /> New task type <span className="opacity-40 text-xs">→</span> <span className="text-white">Agent creates pattern</span></li>
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" /> Existing pattern wrong <span className="opacity-40 text-xs">→</span> <span className="text-white">Agent updates it</span></li>
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" /> New gotcha revealed <span className="opacity-40 text-xs">→</span> <span className="text-white">Agent adds it</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Infrastructure Files */}
            <div id="scaffold-infrastructure" className="scroll-mt-32 space-y-6 pt-10 border-t border-[#27272a]">
              <div>
                <h3 className="text-2xl font-space font-medium text-[#c0caf5] mb-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#1a1b26] border border-[#292e42] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#c0caf5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  Infrastructure Files
                </h3>
                <p className="text-[14px] leading-relaxed text-[#a1a1aa] md:ml-11">
                  These files are owned by mex, not by your project content. They get updated by <code className="text-white text-[12px] bg-[#111] px-1 rounded border border-[#333]">update.sh</code>.
                </p>
              </div>

              <div className="md:ml-11 grid lg:grid-cols-2 gap-8">
                <div className="bg-[#111] border border-[#27272a] rounded-xl overflow-x-auto shadow-inner h-fit">
                  <table className="w-full text-left text-[13px] min-w-[500px]">
                    <thead className="bg-[#1a1a1c] text-[#a1a1aa] border-b border-[#27272a]">
                      <tr>
                        <th className="px-5 py-3 font-medium">File/Directory</th>
                        <th className="px-5 py-3 font-medium">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#27272a] text-[#d4d4d8]">
                      <tr className="hover:bg-[#1a1a1c]/50 transition-colors"><td className="px-5 py-3 font-mono text-[12px] text-[#c0caf5]">src/</td><td className="px-5 py-3 text-[#a1a1aa]">CLI source code (TypeScript)</td></tr>
                      <tr className="hover:bg-[#1a1a1c]/50 transition-colors"><td className="px-5 py-3 font-mono text-[12px] text-[#c0caf5]">test/</td><td className="px-5 py-3 text-[#a1a1aa]">Test suite</td></tr>
                      <tr className="hover:bg-[#1a1a1c]/50 transition-colors"><td className="px-5 py-3 font-mono text-[12px] text-[#c0caf5]">.tool-configs/</td><td className="px-5 py-3 text-[#a1a1aa]">Config file templates for each AI tool</td></tr>
                      <tr className="hover:bg-[#1a1a1c]/50 transition-colors"><td className="px-5 py-3 font-mono text-[12px] text-[#c0caf5]">setup.sh, sync.sh...</td><td className="px-5 py-3 text-[#a1a1aa]">Shell scripts</td></tr>
                      <tr className="hover:bg-[#1a1a1c]/50 transition-colors"><td className="px-5 py-3 font-mono text-[12px] text-[#c0caf5]">package.json...</td><td className="px-5 py-3 text-[#a1a1aa]">Build configuration</td></tr>
                      <tr className="hover:bg-[#1a1a1c]/50 transition-colors"><td className="px-5 py-3 font-mono text-[12px] text-[#c0caf5]">SETUP.md, SYNC.md</td><td className="px-5 py-3 text-[#a1a1aa]">Internal documentation for prompts</td></tr>
                      <tr className="hover:bg-[#1a1a1c]/50 transition-colors"><td className="px-5 py-3 font-mono text-[12px] text-[#c0caf5]">patterns/README.md</td><td className="px-5 py-3 text-[#a1a1aa]">Pattern format spec</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#09090b] border border-[#27272a] rounded-xl p-6 h-fit">
                  <h4 className="text-white font-medium mb-4">Content vs. Infrastructure</h4>
                  <p className="text-[14px] text-[#a1a1aa] mb-6">The distinction matters for <code className="text-[#c0caf5] text-[12px] bg-[#1a1b26] border border-[#292e42] px-1 rounded">update.sh</code>:</p>
                  
                  <div className="space-y-4">
                    <div className="border border-emerald-900/30 bg-emerald-900/5 p-4 rounded-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                        <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </div>
                      <h5 className="text-[12px] font-space font-semibold text-emerald-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        Content files <span className="text-emerald-500/50 normal-case tracking-normal font-normal">(never overwritten)</span>
                      </h5>
                      <ul className="text-[13px] text-[#a1a1aa] space-y-2 font-mono">
                        <li>• AGENTS.md, ROUTER.md</li>
                        <li>• Everything in context/</li>
                        <li>• patterns/INDEX.md and user patterns</li>
                      </ul>
                    </div>
                    
                    <div className="border border-yellow-900/30 bg-yellow-900/5 p-4 rounded-xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-100 transition-opacity">
                        <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                      </div>
                      <h5 className="text-[12px] font-space font-semibold text-yellow-500 mb-3 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                        Infrastructure files <span className="text-yellow-500/50 normal-case tracking-normal font-normal">(safe to overwrite)</span>
                      </h5>
                      <ul className="text-[13px] text-[#a1a1aa] space-y-2 font-mono">
                        <li>• Shell scripts, CLI source, build config</li>
                        <li>• test suite, tool config templates</li>
                        <li>• patterns/README.md</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
