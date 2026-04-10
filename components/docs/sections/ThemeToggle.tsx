import { ThemeShowcase } from "@/components/docs/ThemeShowcase";
import { CodeBlock } from "@/components/docs/CodeBlock";

export function ThemeToggle() {
  return (
    <section id="theme-toggle" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">DaisyUI Themes</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          LaunchX includes six predefined themes. Set the active theme from the central config.
        </p>
      </div>

      <ThemeShowcase />

      <div className="space-y-12 mt-20">
        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">How it works</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            The theme system is built with DaisyUI and Tailwind CSS variables, so component tokens update consistently when the active theme changes.
          </p>
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h4 className="text-white font-medium mb-3 uppercase text-[12px] tracking-wider text-emerald-400">Apply a theme</h4>
            <p className="text-zinc-400 text-[14px] mb-4">Open <code className="text-emerald-300">src/config/config.ts</code> and update the theme property:</p>
            <CodeBlock filename="src/config/config.ts" language="typescript">{`export const config = {
  // ... other settings
  theme: "dark", // Switch to "dracula", "forest", etc.
  darkTheme: "dark"
};`}</CodeBlock>
          </div>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-white mb-4">Adding Custom Themes</h3>
          <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">
            You can add any DaisyUI theme (or your own custom one) by adding it to the <code className="text-white">tailwind.config.ts</code> daisyui plugin configuration.
          </p>
          <CodeBlock filename="tailwind.config.ts" language="typescript">{`daisyui: {
  themes: ["dark", "light", "dracula", "forest", "business", "synthwave"],
},`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
