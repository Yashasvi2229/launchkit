"use client";

import { useState } from "react";
import Image from "next/image";
import { Palette } from "lucide-react";

const THEMES = [
  {
    id: "dark",
    name: "Dark Theme",
    image: "/docs/images/themes/dark theme.png",
    config: "dark"
  },
  {
    id: "light",
    name: "Light Theme",
    image: "/docs/images/themes/Light theme.png",
    config: "light"
  },
  {
    id: "dracula",
    name: "Dracula",
    image: "/docs/images/themes/Dracula theme.png",
    config: "dracula"
  },
  {
    id: "corporate",
    name: "Corporate",
    image: "/docs/images/themes/corporate theme.png",
    config: "corporate"
  },
  {
    id: "forest",
    name: "Forest",
    image: "/docs/images/themes/forest theme.png",
    config: "forest"
  },
  {
    id: "synthwave",
    name: "Synthwave",
    image: "/docs/images/themes/synthwave theme.png",
    config: "synthwave"
  }
];

export function ThemeShowcase() {
  const [index, setIndex] = useState(1);
  
  const currentTheme = THEMES[index];

  return (
    <div className="my-10 max-w-6xl mx-auto space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="border-b border-white/10 px-5 py-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-zinc-200 mr-2">
            <Palette className="w-4 h-4 text-emerald-400" />
            <span className="text-[12px] font-semibold uppercase tracking-wider">Theme Preview</span>
          </div>

          {THEMES.map((theme, i) => (
            <button
              key={theme.id}
              onClick={() => setIndex(i)}
              className={`px-3 py-1.5 rounded-full text-[12px] border transition-colors ${
                i === index
                  ? "border-emerald-500/40 text-emerald-300 bg-emerald-500/10"
                  : "border-white/10 text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>

        <div className="p-4 md:p-6">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20">
            <Image
              src={currentTheme.image}
              alt={currentTheme.name}
              width={1600}
              height={1200}
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="pt-3 text-[13px] text-zinc-400 flex flex-wrap gap-x-6 gap-y-1">
            <span>Selected: <strong className="text-zinc-200 font-medium">{currentTheme.name}</strong></span>
            <span>Config value: <code className="text-emerald-300">{currentTheme.config}</code></span>
          </div>
        </div>
      </div>
    </div>
  );
}
