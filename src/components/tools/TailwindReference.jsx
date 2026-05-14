"use client";

import { GlassCard } from "../ui/GlassCard";
import { Search, Check } from "lucide-react";
import { useState } from "react";
import confetti from "canvas-confetti";

const COLORS = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function TailwindReference() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);

  const filteredColors = COLORS.filter(c => c.includes(search.toLowerCase()));

  const copyToClipboard = (color, shade) => {
    const text = `${color}-${shade}`;
    navigator.clipboard.writeText(text);
    setCopied(text);
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.9 },
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="relative group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 opacity-30 group-focus-within:opacity-100 transition-opacity" />
        <input 
          type="text" 
          placeholder="Search colors (e.g. emerald, rose)..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl py-5 pl-14 pr-6 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-lg font-medium shadow-2xl"
        />
      </div>

      <GlassCard className="p-0 overflow-hidden border-none shadow-2xl bg-white/30">
        <div className="h-[600px] overflow-y-auto custom-scrollbar p-8 space-y-12">
          {filteredColors.map(color => (
            <div key={color} className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black/40">{color}</h3>
                <div className="flex-1 h-[1px] bg-black/5" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3">
                {SHADES.map(shade => {
                  const colorKey = `${color}-${shade}`;
                  return (
                    <div 
                      key={shade} 
                      onClick={() => copyToClipboard(color, shade)}
                      className="group cursor-pointer space-y-2"
                    >
                      <div 
                        className="h-16 w-full rounded-xl shadow-lg border border-white/50 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-2xl relative flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: `var(--color-${color}-${shade})` }}
                      >
                        {copied === colorKey && (
                          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] font-black opacity-30">{shade}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          
          {filteredColors.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-30 space-y-4">
              <Search className="w-16 h-16" />
              <p className="text-xl font-bold">No colors found</p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
