import { LucideIcon } from "lucide-react";

export function PrereqCard({ 
  title, 
  desc, 
  link, 
  icon: Icon,
  accent = "emerald" 
}: { 
  title: string; 
  desc: string; 
  link: string; 
  icon: LucideIcon;
  accent?: "emerald" | "blue" | "rose" | "violet" | "amber"
}) {
  const accentColors = {
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 group-hover:border-emerald-500/40",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/40",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20 group-hover:border-rose-500/40",
    violet: "text-violet-400 bg-violet-500/10 border-violet-500/20 group-hover:border-violet-500/40",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20 group-hover:border-amber-500/40",
  };

  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="p-6 rounded-[2rem] border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 group relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className={`absolute -right-16 -top-16 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${accentColors[accent].split(' ')[0].replace('text', 'bg')}`} />
      
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border ${accentColors[accent]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-white font-semibold text-[16px] mb-2">{title}</h3>
      <p className="text-zinc-500 text-[13px] leading-relaxed mb-4">{desc}</p>
      
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-600 group-hover:text-white transition-colors uppercase tracking-widest">
        Official Docs
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </div>
    </a>
  );
}
