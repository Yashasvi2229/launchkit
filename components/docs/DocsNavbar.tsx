import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export function DocsNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors text-[13px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            LaunchX
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <Link href="/docs" className="flex items-center gap-2 text-white text-[14px] font-medium">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Documentation
          </Link>
        </div>

        <Link
          href="/templates/general-saas"
          className="text-[12px] px-3 py-1.5 rounded-md border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-all duration-200 font-medium"
        >
          Get the Template →
        </Link>
      </div>
    </header>
  );
}
