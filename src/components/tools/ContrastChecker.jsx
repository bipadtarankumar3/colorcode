"use client";

import { GlassCard } from "../ui/GlassCard";
import { Eye, ShieldCheck, ShieldAlert, ArrowLeftRight, Check, Sparkles, Type } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "../../lib/utils";

const PAIR_PRESETS = [
  { name: "White on Indigo", fg: "#ffffff", bg: "#4f46e5" },
  { name: "Slate on White", fg: "#0f172a", bg: "#ffffff" },
  { name: "White on Emerald", fg: "#ffffff", bg: "#047857" },
  { name: "Gold on Navy", fg: "#fbbf24", bg: "#0f172a" },
  { name: "White on Dark", fg: "#f8fafc", bg: "#18181b" },
];

export function ContrastChecker() {
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#4f46e5");

  const contrastRatio = useMemo(() => {
    const getLuminance = (hex) => {
      const clean = hex.startsWith("#") ? hex : `#${hex}`;
      if (!/^#[0-9A-Fa-f]{6}$/.test(clean)) return 0.5;
      const r = parseInt(clean.slice(1, 3), 16) / 255;
      const g = parseInt(clean.slice(3, 5), 16) / 255;
      const b = parseInt(clean.slice(5, 7), 16) / 255;

      const [rL, gL, bL] = [r, g, b].map(val => 
        val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
      );

      return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
    };

    const l1 = getLuminance(fgColor);
    const l2 = getLuminance(bgColor);

    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return Math.round(ratio * 100) / 100;
  }, [fgColor, bgColor]);

  const scores = {
    aa: contrastRatio >= 4.5,
    aaa: contrastRatio >= 7.0,
    aaLarge: contrastRatio >= 3.0,
    aaaLarge: contrastRatio >= 4.5,
    uiElements: contrastRatio >= 3.0,
  };

  const swapColors = () => {
    const temp = fgColor;
    setFgColor(bgColor);
    setBgColor(temp);
  };

  return (
    <div className="space-y-6">
      {/* Quick Pair Presets */}
      <GlassCard className="p-3 bg-white/70 dark:bg-slate-900/70">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 whitespace-nowrap pl-2">
            Presets:
          </span>
          {PAIR_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => { setFgColor(p.fg); setBgColor(p.bg); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-300"
            >
              <span className="flex -space-x-1">
                <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: p.bg }} />
                <span className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: p.fg }} />
              </span>
              {p.name}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Configuration Column */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Eye className="w-4 h-4 text-emerald-500" /> Color Contrast Pair
              </h3>
              <button
                type="button"
                onClick={swapColors}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
                title="Swap Foreground & Background"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" /> Swap
              </button>
            </div>

            {/* Color Inputs */}
            <div className="space-y-4">
              {/* Background Color */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Background Color
                </label>
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-black/10 shrink-0 shadow-xs">
                    <input 
                      type="color" 
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer"
                    />
                  </div>
                  <input 
                    type="text" 
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="bg-transparent font-mono font-bold text-sm uppercase flex-1 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Foreground Color */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Foreground / Text Color
                </label>
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-black/10 shrink-0 shadow-xs">
                    <input 
                      type="color" 
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer"
                    />
                  </div>
                  <input 
                    type="text" 
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="bg-transparent font-mono font-bold text-sm uppercase flex-1 outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Compliance Scores */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                WCAG 2.1 Compliance Check
              </h4>
              <ComplianceItem label="Level AA Normal Text" pass={scores.aa} min="4.5:1" />
              <ComplianceItem label="Level AAA Normal Text" pass={scores.aaa} min="7.0:1" />
              <ComplianceItem label="Level AA Large Text (18pt+)" pass={scores.aaLarge} min="3.0:1" />
              <ComplianceItem label="Level AAA Large Text" pass={scores.aaaLarge} min="4.5:1" />
              <ComplianceItem label="UI Components & Icons" pass={scores.uiElements} min="3.0:1" />
            </div>
          </GlassCard>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="rounded-3xl p-6 sm:p-10 flex flex-col justify-between min-h-[380px] shadow-xl border-4 border-white dark:border-slate-800 transition-colors duration-300"
            style={{ backgroundColor: bgColor, color: fgColor }}
          >
            {/* Contrast Ratio Display */}
            <div className="flex items-center justify-between pb-6 border-b border-current/15">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Contrast Ratio</span>
                <div className="text-4xl sm:text-5xl font-black tracking-tight">{contrastRatio} : 1</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm",
                  scores.aa ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                )}>
                  {scores.aaa ? "AAA Enhanced" : scores.aa ? "AA Pass" : "Fail"}
                </span>
                <span className="text-[10px] font-bold opacity-60">WCAG 2.1 Standard</span>
              </div>
            </div>

            {/* Sample Typography Preview */}
            <div className="space-y-3 py-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                Accessible Design Builds Trust.
              </h2>
              <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-lg">
                High contrast ratios ensure your content remains effortlessly readable under harsh sunlight, for visually impaired users, and across all display devices.
              </p>
            </div>

            {/* UI Mockup Components */}
            <div className="pt-4 border-t border-current/15 flex flex-wrap items-center gap-3">
              <div 
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-current shadow-xs"
                style={{ backgroundColor: fgColor, color: bgColor }}
              >
                Inverted Button
              </div>
              <div 
                className="px-3 py-1 rounded-lg text-xs font-bold border border-current/30"
              >
                Secondary Tag
              </div>
              <span className="text-xs font-mono opacity-70">
                14pt text sample • 18pt bold
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceItem({ label, pass, min }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all",
      pass 
        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-400" 
        : "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
    )}>
      <div className="flex items-center gap-2">
        {pass ? <ShieldCheck className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
        <span>{label}</span>
      </div>
      <span className="text-[10px] font-mono opacity-60">Req: {min}</span>
    </div>
  );
}
