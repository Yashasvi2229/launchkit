import { PrereqCard } from "./shared/PrereqCard";
import { 
  Monitor, 
  Database, 
  Lock, 
  CreditCard, 
  Layers, 
  Cpu, 
  Code2
} from "lucide-react";

export function Prerequisites() {
  const skills = [
    { name: "Next.js 14+", icon: Layers, desc: "App Router & Server Components" },
    { name: "TypeScript", icon: Code2, desc: "Type-safe development flow" },
    { name: "Tailwind CSS", icon: Cpu, desc: "Modern utility-first styling" },
    { name: "PostgreSQL", icon: Database, desc: "Relational data management" },
  ];

  return (
    <section id="prerequisites" className="scroll-mt-20">
      <div className="mb-12">
        <h2 className="text-[32px] font-semibold text-white tracking-tight mb-4 text-center lg:text-left">Prerequisites</h2>
        <p className="text-zinc-400 text-[16px] leading-relaxed max-w-xl">
          Verify these tools and accounts before starting local development.
        </p>
      </div>

      <div className="space-y-20">
        {/* Core Accounts */}
        <div>
          <h3 className="text-[18px] font-semibold text-white mb-6 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            External Services
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <PrereqCard 
               title="Node.js 18+" 
               desc="Ensure you're using an LTS version (18 or 20) for the build engine." 
               link="https://nodejs.org" 
               icon={Monitor}
               accent="emerald"
            />
            <PrereqCard 
               title="Supabase" 
               desc="Required for Postgres database, Auth logic, and Storage buckets." 
               link="https://supabase.com" 
               icon={Database}
               accent="blue"
            />
            <PrereqCard 
               title="Clerk" 
               desc="Identity management provider for handling social auth and sessions." 
               link="https://clerk.com" 
               icon={Lock}
               accent="rose"
            />
            <PrereqCard 
               title="Stripe" 
               desc="Payment processor for handling recurring billing and subscriptions." 
               link="https://stripe.com" 
               icon={CreditCard}
               accent="violet"
            />
          </div>
        </div>

        {/* Required Knowledge / Skill Grid */}
        <div className="relative p-8 rounded-[3rem] border border-white/[0.06] bg-white/[0.01] overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
          
          <div className="mb-8">
            <h3 className="text-white font-semibold mb-2">Technical Proficiency</h3>
            <p className="text-zinc-500 text-[14px]">These technologies appear throughout the template and docs.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.name} className="flex flex-col gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center transition-all group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20">
                    <Icon className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-white text-[14px] font-medium mb-1">{skill.name}</h4>
                    <p className="text-zinc-600 text-[12px] leading-relaxed group-hover:text-zinc-400 transition-colors">{skill.desc}</p>
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
