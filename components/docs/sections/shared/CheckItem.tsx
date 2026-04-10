export function CheckItem({ title, code, description, severity }: { title: string; code: string; description: string; severity: 'error' | 'warning' }) {
  return (
    <div className="p-5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors uppercase text-[13px] tracking-wider">{title}</h4>
        <div className={`px-2 py-0.5 rounded font-mono text-[10px] border ${
          severity === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
        }`}>
          {code}
        </div>
      </div>
      <p className="text-zinc-500 text-[13px] leading-relaxed group-hover:text-zinc-400 transition-colors">
        {description}
      </p>
    </div>
  );
}
