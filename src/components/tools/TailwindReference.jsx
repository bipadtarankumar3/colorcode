"use client";

import { GlassCard } from "../ui/GlassCard";
import { Search, Check, Copy, SlidersHorizontal, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { TAILWIND_COLOR_PALETTES, COLOR_GROUPS } from "@/lib/tailwindColors";
import { cn, selectColor } from "@/lib/utils";

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export function TailwindReference() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState("All");
  const [copyFormat, setCopyFormat] = useState("class"); // "class" or "hex"
  const [copiedKey, setCopiedKey] = useState(null);

  const filteredColorNames = useMemo(() => {
    let list = COLOR_GROUPS[activeGroup] || COLOR_GROUPS.All;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = Object.keys(TAILWIND_COLOR_PALETTES).filter(colorName => {
        if (colorName.toLowerCase().includes(q)) return true;
        // Search inside hex codes
        const shades = TAILWIND_COLOR_PALETTES[colorName];
        return Object.values(shades).some(hex => hex.toLowerCase().includes(q));
      });
    }
    return list;
  }, [activeGroup, search]);

  const copyToClipboard = (colorName, shade, hex) => {
    const textToCopy = copyFormat === "class" ? `bg-${colorName}-${shade}` : hex;
    navigator.clipboard.writeText(textToCopy);
    selectColor(hex);
    setCopiedKey(`${colorName}-${shade}`);
    confetti({
      particleCount: 24,
      spread: 35,
      origin: { y: 0.85 },
      colors: [hex]
    });
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <GlassCard className="p-4 sm:p-6 space-y-4 bg-white/70 dark:bg-slate-900/70">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search palette (e.g. emerald, sky, #10b981)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Copy Format Toggle */}
          <div className="flex items-center gap-2 self-end md:self-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Copy As:</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setCopyFormat("class")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                  copyFormat === "class"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                Tailwind Class
              </button>
              <button
                onClick={() => setCopyFormat("hex")}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                  copyFormat === "hex"
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                HEX Code
              </button>
            </div>
          </div>
        </div>

        {/* Group Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {Object.keys(COLOR_GROUPS).map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(group)}
              className={cn(
                "px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all",
                activeGroup === group
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              {group}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Colors List */}
      <GlassCard className="p-4 sm:p-6 bg-white/70 dark:bg-slate-900/70 space-y-8">
        {filteredColorNames.map((colorName) => {
          const shadesMap = TAILWIND_COLOR_PALETTES[colorName];
          if (!shadesMap) return null;

          return (
            <div key={colorName} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-sm border border-black/10"
                    style={{ backgroundColor: shadesMap[500] }}
                  />
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                    {colorName}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                  500: {shadesMap[500]}
                </span>
              </div>

              {/* Swatches Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
                {SHADES.map((shade) => {
                  const hex = shadesMap[shade];
                  const key = `${colorName}-${shade}`;
                  const isCopied = copiedKey === key;
                  const isLight = shade < 500;

                  return (
                    <button
                      key={shade}
                      type="button"
                      onClick={() => copyToClipboard(colorName, shade, hex)}
                      title={`Click to copy ${copyFormat === "class" ? `bg-${colorName}-${shade}` : hex}`}
                      className="group flex flex-col rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-95 transition-all text-left cursor-pointer"
                    >
                      {/* Color block */}
                      <div
                        className="h-14 sm:h-16 w-full relative flex items-center justify-center transition-all"
                        style={{ backgroundColor: hex }}
                      >
                        {isCopied ? (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white">
                            <Check className="w-4 h-4 animate-scale-in" />
                          </div>
                        ) : (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Copy className={cn("w-3.5 h-3.5", isLight ? "text-slate-900" : "text-white")} />
                          </div>
                        )}
                      </div>

                      {/* Info footer */}
                      <div className="p-1.5 bg-slate-50 dark:bg-slate-800/80 flex flex-col text-[10px]">
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {shade}
                        </span>
                        <span className="font-mono text-[9px] text-slate-400 uppercase truncate">
                          {hex}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredColorNames.length === 0 && (
          <div className="py-16 text-center space-y-3">
            <Search className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-700 dark:text-slate-200">No matching colors found</h4>
            <p className="text-xs text-slate-400">Try searching for a different shade or color family</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
