export const metadata = {
  title: "Changelog — mex",
};

export default function ChangelogPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
      <div className="mb-12 border-b border-[var(--mex-border)] pb-8">
        <h1 className="text-4xl font-space font-semibold tracking-tight mb-4 text-white">
          Changelog
        </h1>
        <p className="text-[16px] leading-relaxed text-[#a1a1aa]">
          Track what's new, what's changed, and what's fixed in each release.
        </p>
      </div>

      <div className="space-y-12">
        {/* v0.2.0 */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-xl relative overflow-hidden group hover:border-[#333] transition-colors">
          <div className="flex items-center justify-between border-b border-[#27272a] p-5 pb-4 bg-[#0a0a0c]">
            <div className="flex items-center gap-4">
              <span className="bg-[var(--mex-primary)] text-white text-[13px] font-space font-medium px-2.5 py-1 rounded-md shadow-[0_0_10px_rgba(65,105,225,0.3)]">v0.2.0</span>
              <span className="text-[#888] text-[13px] tracking-wide uppercase font-space">April 5, 2026</span>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div>
              <h4 className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-space font-semibold text-emerald-500 uppercase tracking-wider">Added</span>
              </h4>
              <ul className="space-y-3 text-[15px] text-[#d4d4d8] ml-1">
                <li className="flex gap-3 items-start"><span className="text-[#555] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-white bg-[#111] px-1 py-0.5 rounded border border-[#333] text-[13px] font-mono">mex setup</code> command — npx-first install: <code className="text-[var(--mex-primary)] bg-[var(--mex-primary)]/10 px-1 py-0.5 rounded border border-[var(--mex-primary)]/20 text-[13px] font-mono">npx promexeus setup</code></span></li>
                <li className="flex gap-3 items-start"><span className="text-[#555] mt-1 text-xs">●</span><span className="leading-relaxed">Bundled scaffold templates in npm package — no git clone needed</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#555] mt-1 text-xs">●</span><span className="leading-relaxed">Project state detection: fresh, existing, or partial scaffold</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#555] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-[#a1a1aa] text-[12px] font-mono border border-[#27272a] rounded px-1 bg-[#111]">--dry-run</code> flag for setup command</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#555] mt-1 text-xs">●</span><span className="leading-relaxed">Published to npm as <code className="text-[var(--mex-primary)] text-[13px] font-mono">promexeus</code></span></li>
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-[12px] font-space font-semibold text-blue-400 uppercase tracking-wider">Changed</span>
              </h4>
              <ul className="space-y-3 text-[15px] text-[#d4d4d8] ml-1">
                <li className="flex gap-3 items-start"><span className="text-[#555] mt-1 text-xs">●</span><span className="leading-relaxed">Package renamed from <code className="text-[#a1a1aa] text-[12px] font-mono">mex</code> to <code className="text-[#a1a1aa] text-[12px] font-mono">promexeus</code> for npm availability</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#555] mt-1 text-xs">●</span><span className="leading-relaxed">Sync now combines all drift issues into a single Claude session instead of launching one session per file — fewer tokens, no repeated session restarts</span></li>
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                <span className="text-[12px] font-space font-semibold text-yellow-500 uppercase tracking-wider">Fixed</span>
              </h4>
              <ul className="space-y-3 text-[15px] text-[#d4d4d8] ml-1">
                <li className="flex gap-3 items-start"><span className="text-[#555] mt-1 text-xs">●</span><span className="leading-relaxed">False positive <code className="text-yellow-500 bg-yellow-500/10 px-1 py-0.5 rounded border border-yellow-500/20 text-[13px] font-mono">DEPENDENCY_MISSING</code> warnings for versioned dependencies with semver prefixes (^, ~, &gt;=)</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* v0.1.0 */}
        <div className="bg-[#09090b] border border-[#27272a] rounded-xl relative overflow-hidden group hover:border-[#333] transition-colors">
          <div className="flex items-center justify-between border-b border-[#27272a] p-5 pb-4 bg-[#0a0a0c]">
            <div className="flex items-center gap-4">
              <span className="bg-[#111] border border-[#333] text-white text-[13px] font-space font-medium px-2.5 py-1 rounded-md">v0.1.0</span>
              <span className="text-[#888] text-[13px] tracking-wide uppercase font-space">March 21, 2026</span>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            <div>
              <h4 className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-space font-semibold text-emerald-500 uppercase tracking-wider">Added</span>
              </h4>
              <ul className="space-y-3 text-[15px] text-[#d4d4d8] ml-1">
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed">Initial release of <span className="font-space text-white">mex</span></span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed">Structured markdown scaffold with navigable context files, patterns, and routing</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed">8 drift checkers: path, edges, index-sync, staleness, command, dependency, cross-file, script-coverage</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-white bg-[#111] px-1 py-0.5 rounded border border-[#333] text-[13px] font-mono">mex check</code> <span className="text-[#a1a1aa] mx-1">—</span> drift detection with <code className="text-[#a1a1aa] text-[12px] font-mono border border-[#27272a] rounded px-1 bg-[#111]">--quiet</code>, <code className="text-[#a1a1aa] text-[12px] font-mono border border-[#27272a] rounded px-1 bg-[#111]">--json</code>, and <code className="text-[#a1a1aa] text-[12px] font-mono border border-[#27272a] rounded px-1 bg-[#111]">--fix</code> flags</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-white bg-[#111] px-1 py-0.5 rounded border border-[#333] text-[13px] font-mono">mex sync</code> <span className="text-[#a1a1aa] mx-1">—</span> targeted AI sync with interactive and prompt modes, dry-run support</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-white bg-[#111] px-1 py-0.5 rounded border border-[#333] text-[13px] font-mono">mex init</code> <span className="text-[#a1a1aa] mx-1">—</span> codebase pre-scanner that generates a structured brief for AI</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-white bg-[#111] px-1 py-0.5 rounded border border-[#333] text-[13px] font-mono">mex watch</code> <span className="text-[#a1a1aa] mx-1">—</span> post-commit hook for automatic drift checking</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-purple-400 text-[13px] font-mono border border-purple-400/20 rounded px-1 bg-purple-400/10">setup.sh</code> <span className="text-[#a1a1aa] mx-1">—</span> first-time scaffold population with project state detection</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-purple-400 text-[13px] font-mono border border-purple-400/20 rounded px-1 bg-purple-400/10">sync.sh</code> <span className="text-[#a1a1aa] mx-1">—</span> interactive sync menu with targeted and full resync options</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-purple-400 text-[13px] font-mono border border-purple-400/20 rounded px-1 bg-purple-400/10">update.sh</code> <span className="text-[#a1a1aa] mx-1">—</span> pull latest mex infrastructure without touching content</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed"><code className="text-purple-400 text-[13px] font-mono border border-purple-400/20 rounded px-1 bg-purple-400/10">visualize.sh</code> <span className="text-[#a1a1aa] mx-1">—</span> interactive scaffold graph visualization</span></li>
                <li className="flex gap-3 items-start"><span className="text-[#333] mt-1 text-xs">●</span><span className="leading-relaxed">Multi-tool support: Claude Code, Cursor, Windsurf, GitHub Copilot</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
