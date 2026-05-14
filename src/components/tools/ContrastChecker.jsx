"use client";

import { GlassCard } from "../ui/GlassCard";
import { Eye, ShieldCheck, ShieldAlert, Type } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "../../lib/utils";

export function ContrastChecker() {
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#6366f1");

  const contrastRatio = useMemo(() => {
    const getLuminance = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

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
    aaa: contrastRatio >= 7,
    aaLarge: contrastRatio >= 3,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Configuration */}
      <div className="lg:col-span-5 space-y-6">
        <GlassCard className="space-y-8">
          <div className="space-y-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-500" />
              A11y Validator
            </h3>
            <p className="text-sm opacity-40">Check contrast ratio for accessibility.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest opacity-40">Background Color</label>
              <div className="flex items-center gap-4 bg-black/5 p-3 rounded-2xl border border-white/10">
                <input 
                  type="color" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-none"
                />
                <input 
                  type="text" 
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="bg-transparent font-mono font-bold outline-none flex-1 uppercase"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest opacity-40">Foreground Color</label>
              <div className="flex items-center gap-4 bg-black/5 p-3 rounded-2xl border border-white/10">
                <input 
                  type="color" 
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-none"
                />
                <input 
                  type="text" 
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="bg-transparent font-mono font-bold outline-none flex-1 uppercase"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-black/5 space-y-4">
            <h4 className="text-sm font-bold opacity-60">WCAG 2.1 Compliance</h4>
            <div className="space-y-3">
              <ComplianceItem label="AA (Normal Text)" pass={scores.aa} min="4.5:1" />
              <ComplianceItem label="AAA (Normal Text)" pass={scores.aaa} min="7:1" />
              <ComplianceItem label="AA (Large Text)" pass={scores.aaLarge} min="3:1" />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Preview */}
      <div className="lg:col-span-7 space-y-6">
        <div 
          className="h-full min-h-[400px] rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center gap-8 shadow-2xl transition-colors duration-500"
          style={{ backgroundColor: bgColor, color: fgColor }}
        >
          <div className="space-y-4">
             <h2 className="text-5xl font-black tracking-tight">The quick brown fox</h2>
             <p className="text-xl opacity-80 max-w-md mx-auto">
               Jumps over the lazy dog. Design is not just what it looks like and feels like. Design is how it works.
             </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md px-10 py-6 rounded-3xl border border-white/20">
             <span className="block text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-1">Contrast Ratio</span>
             <span className="text-6xl font-black">{contrastRatio}:1</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceItem({ label, pass, min }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 rounded-xl border transition-all",
      pass ? "bg-green-500/5 border-green-500/20 text-green-700" : "bg-red-500/5 border-red-500/20 text-red-700"
    )}>
      <div className="flex items-center gap-2">
        {pass ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
        <span className="text-sm font-bold">{label}</span>
      </div>
      <span className="text-[10px] font-black opacity-60">{min}</span>
    </div>
  );
}
