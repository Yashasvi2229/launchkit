import { CodeBlock } from "@/components/docs/CodeBlock";
import { 
  Terminal,
  Play, 
  Code2,
  FileCode2
} from "lucide-react";

export function Installation() {
  const steps = [
    {
      title: "Clone & Initialise",
      desc: "Download the codebase and enter the project directory to begin.",
      code: "git clone [repo-url] my-startup\ncd my-startup",
      icon: Terminal,
      color: "text-emerald-400"
    },
    {
      title: "Install Dependencies",
      desc: "Install project dependencies from package-lock.json.",
      code: "npm install",
      icon: Code2,
      color: "text-blue-400"
    },
    {
      title: "Configure Environment",
      desc: "Create a local env file and add provider credentials.",
      code: "cp .env.example .env.local",
      icon: FileCode2,
      color: "text-amber-400"
    },
    {
      title: "Launch Engine",
      desc: "Start the development server on localhost:3000.",
      code: "npm run dev",
      icon: Play,
      color: "text-rose-400"
    }
  ];

  return (
    <section id="installation" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Local Setup & Installation</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          Use this sequence to bootstrap the template and verify a working local environment.
        </p>
      </div>

      <div className="space-y-16">
        {/* Speed Run / Timeline */}
        <div className="relative">
          <div className="absolute left-[23px] top-8 bottom-8 w-px bg-white/[0.08]" />
          
          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex gap-8 relative group">
                  <div className={`w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 z-10 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.02] ${step.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-[11px] font-mono text-zinc-600">0{idx + 1}</span>
                       <h3 className="text-white font-semibold text-[16px]">{step.title}</h3>
                    </div>
                    <p className="text-zinc-500 text-[14px] leading-relaxed mb-4 max-w-lg">
                      {step.desc}
                    </p>
                    <div className="rounded-xl overflow-hidden border border-white/[0.04] bg-zinc-950/50">
                      <CodeBlock language="bash" plain>{step.code}</CodeBlock>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
