"use client";

import { GlassCard } from "../ui/GlassCard";
import { RefreshCw, Copy, Sparkles, Check, Code, Download, Share2 } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { cn, selectColor } from "@/lib/utils";

export function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [hexInput, setHexInput] = useState("#6366f1");
  const [harmony, setHarmony] = useState("analogous");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [exportCopied, setExportCopied] = useState(false);

  const handleHexChange = (val) => {
    setHexInput(val);
    const clean = val.startsWith("#") ? val : `#${val}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      setBaseColor(clean.toLowerCase());
    }
  };

  const handlePickerChange = (val) => {
    setBaseColor(val);
    setHexInput(val);
  };

  const palette = useMemo(() => {
    const hexToHsl = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0;
      const l = (max + min) / 2;
      let s;
      if (max === min) h = s = 0;
      else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return { h: h * 360, s: s * 100, l: l * 100 };
    };

    const hslToHex = (h, s, l) => {
      l = Math.max(0, Math.min(100, l)) / 100;
      s = Math.max(0, Math.min(100, s)) / 100;
      const a = s * Math.min(l, 1 - l);
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, "0");
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    const base = hexToHsl(baseColor);
    let colors = [];

    switch (harmony) {
      case "analogous":
        colors = [
          hslToHex((base.h - 30 + 360) % 360, base.s, base.l),
          hslToHex((base.h - 15 + 360) % 360, base.s, base.l),
          baseColor,
          hslToHex((base.h + 15) % 360, base.s, base.l),
          hslToHex((base.h + 30) % 360, base.s, base.l),
        ];
        break;
      case "complementary":
        colors = [
          hslToHex(base.h, base.s, Math.max(15, base.l * 0.7)),
          hslToHex(base.h, base.s * 0.8, Math.min(90, base.l * 1.15)),
          baseColor,
          hslToHex((base.h + 180) % 360, base.s, base.l),
          hslToHex((base.h + 180) % 360, base.s, Math.max(15, base.l * 0.7)),
        ];
        break;
      case "triadic":
        colors = [
          hslToHex((base.h + 120) % 360, base.s, base.l),
          hslToHex((base.h + 120) % 360, base.s * 0.85, Math.min(85, base.l * 1.1)),
          baseColor,
          hslToHex((base.h + 240) % 360, base.s * 0.85, Math.min(85, base.l * 1.1)),
          hslToHex((base.h + 240) % 360, base.s, base.l),
        ];
        break;
      case "monochromatic":
        colors = [
          hslToHex(base.h, base.s, Math.max(15, base.l - 35)),
          hslToHex(base.h, base.s, Math.max(25, base.l - 18)),
          baseColor,
          hslToHex(base.h, base.s, Math.min(88, base.l + 18)),
          hslToHex(base.h, base.s, Math.min(95, base.l + 35)),
        ];
        break;
      default:
        colors = [baseColor, baseColor, baseColor, baseColor, baseColor];
    }
    return colors;
  }, [baseColor, harmony]);

  const copyColor = (hex, index) => {
    navigator.clipboard.writeText(hex);
    selectColor(hex);
    setCopiedIndex(index);
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.8 },
      colors: [hex]
    });
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const copyExportCss = () => {
    const css = `:root {\n${palette.map((c, i) => `  --color-step-${i + 1}: ${c};`).join("\n")}\n}`;
    navigator.clipboard.writeText(css);
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 2000);
  };

  const randomBase = () => {
    const randomHex = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setBaseColor(randomHex);
    setHexInput(randomHex);
  };

  return (
    <div className="space-y-8">
      {/* Control Toolbar */}
      <GlassCard className="p-4 sm:p-6 bg-white/70 dark:bg-slate-900/70">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Base Color Input Area */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-700 flex-shrink-0 cursor-pointer">
              <input 
                type="color" 
                value={baseColor}
                onChange={(e) => handlePickerChange(e.target.value)}
                className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer border-none"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Primary Base Color</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="font-mono font-bold text-lg uppercase bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-emerald-500 w-28 text-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={randomBase}
                  title="Generate Random Color"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Harmony Mode Pills */}
          <div className="flex items-center bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-x-auto no-scrollbar max-w-full">
            {["analogous", "complementary", "triadic", "monochromatic"].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHarmony(h)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap",
                  harmony === h 
                    ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                {h}
              </button>
            ))}
          </div>

          {/* Export & Action Buttons */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={copyExportCss}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
            >
              {exportCopied ? <Check className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
              {exportCopied ? "CSS Copied!" : "Export CSS"}
            </button>
            <button 
              type="button"
              onClick={randomBase}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 rounded-xl hover:scale-102 active:scale-95 transition-all shadow-md font-bold text-xs uppercase tracking-wider"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Randomize
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Palette Swatches Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-5">
        {palette.map((color, i) => {
          const isCopied = copiedIndex === i;
          const isBase = color.toLowerCase() === baseColor.toLowerCase();

          return (
            <div 
              key={i} 
              className={cn(
                "group relative flex flex-col gap-2.5",
                i === 4 ? "col-span-2 sm:col-span-1" : ""
              )}
            >
              <GlassCard 
                className="p-2 cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-95 group/palette relative overflow-hidden bg-white/70 dark:bg-slate-900/70"
                onClick={() => copyColor(color, i)}
              >
                <div 
                  className="h-36 sm:h-56 md:h-64 w-full rounded-xl shadow-inner border border-black/5 relative flex items-center justify-center transition-all"
                  style={{ backgroundColor: color }}
                >
                  {isCopied ? (
                    <div className="bg-black/40 backdrop-blur-xs text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold animate-scale-in">
                      <Check className="w-4 h-4" /> Copied!
                    </div>
                  ) : (
                    <div className="opacity-0 group-hover/palette:opacity-100 transition-opacity bg-black/30 backdrop-blur-xs text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold">
                      <Copy className="w-3.5 h-3.5" /> Copy Hex
                    </div>
                  )}

                  {isBase && (
                    <div className="absolute top-2.5 right-2.5 bg-white/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/40 flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span className="text-[9px] font-black uppercase text-white tracking-wider">Base</span>
                    </div>
                  )}
                </div>
              </GlassCard>

              {/* Color Info Card */}
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Step {i + 1}
                </span>
                <span className="font-mono font-bold text-xs sm:text-sm uppercase text-slate-800 dark:text-slate-100">
                  {color}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
