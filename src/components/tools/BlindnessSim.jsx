"use client";

import { GlassCard } from "../ui/GlassCard";
import { Accessibility, Eye, Sparkles, RefreshCw, Info } from "lucide-react";
import { useState } from "react";

const TYPES = [
  { id: "normal", name: "Normal Vision", stats: "Typical Trichromatic", desc: "Full spectrum perception across red, green, and blue cone receptors.", values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" },
  { id: "deuteranomaly", name: "Deuteranomaly", stats: "~5% of males", desc: "Green-weak vision. The most common color deficiency worldwide.", values: "0.8 0.2 0 0 0  0.258 0.742 0 0 0  0 0.142 0.858 0 0  0 0 0 1 0" },
  { id: "deuteranopia", name: "Deuteranopia", stats: "~1% of males", desc: "Complete green-blindness. Difficulty distinguishing greens from reds.", values: "0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0" },
  { id: "protanomaly", name: "Protanomaly", stats: "~1% of males", desc: "Red-weak vision. Reds appear less vivid and darker than normal.", values: "0.817 0.183 0 0 0  0.333 0.667 0 0 0  0 0.125 0.875 0 0  0 0 0 1 0" },
  { id: "protanopia", name: "Protanopia", stats: "~1% of males", desc: "Complete red-blindness. Reds appear dark gray or blackish.", values: "0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0" },
  { id: "tritanomaly", name: "Tritanomaly", stats: "< 0.01% of people", desc: "Blue-weak vision. Extremely rare genetic or acquired condition.", values: "0.967 0.033 0 0 0  0 0.733 0.267 0 0  0 0.183 0.817 0 0  0 0 0 1 0" },
  { id: "tritanopia", name: "Tritanopia", stats: "< 0.005% of people", desc: "Blue-blind vision. Blues appear greenish, yellows appear light gray or violet.", values: "0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0" },
  { id: "achromatopsia", name: "Achromatopsia", stats: "1 in 33,000", desc: "Total color blindness. Perception relies entirely on lightness and luminance.", values: "0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" },
  { id: "achromatomaly", name: "Achromatomaly", stats: "1 in 100,000", desc: "Substantial loss of color perception with faint monochromatic hue retention.", values: "0.618 0.320 0.062 0 0  0.163 0.775 0.062 0 0  0.163 0.320 0.516 0 0  0 0 0 1 0" },
];

export function BlindnessSim() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [hexInput, setHexInput] = useState("#6366f1");

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

  const randomize = () => {
    const randomHex = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setBaseColor(randomHex);
    setHexInput(randomHex);
  };

  return (
    <div className="space-y-8">
      {/* SVG Color Matrix Filters Definition */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          {TYPES.map(type => (
            <filter key={type.id} id={`filter-${type.id}`}>
              <feColorMatrix type="matrix" values={type.values} />
            </filter>
          ))}
        </defs>
      </svg>

      {/* Base Color Header Bar */}
      <GlassCard className="p-4 sm:p-6 bg-white/70 dark:bg-slate-900/70">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-slate-700 shrink-0">
              <input 
                type="color" 
                value={baseColor}
                onChange={(e) => handlePickerChange(e.target.value)}
                className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Sample Target Color</span>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="font-mono font-bold text-lg uppercase bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-emerald-500 w-28 text-slate-800 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={randomize}
                  title="Randomize"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest self-end sm:self-center">
            <Accessibility className="w-4 h-4 text-emerald-500" /> 8 Vision Simulator Modes
          </div>
        </div>
      </GlassCard>

      {/* 8-Mode Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TYPES.map((type) => (
          <GlassCard 
            key={type.id} 
            className="p-5 space-y-3.5 bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  {type.name}
                  {type.id === "normal" && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {type.stats}
                </span>
              </div>
            </div>
            
            {/* Swatch with Matrix Filter */}
            <div className="relative h-28 w-full rounded-2xl overflow-hidden shadow-inner border border-black/10 bg-slate-100 dark:bg-slate-800">
              <div 
                className="absolute inset-0"
                style={{ 
                  backgroundColor: baseColor,
                  filter: `url(#filter-${type.id})`
                }}
              />
              {/* Subtle geometric grid to test texture discrimination */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                style={{ 
                  backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 1.5px)',
                  backgroundSize: '12px 12px',
                  filter: `url(#filter-${type.id})`
                }}
              />
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[36px]">
              {type.desc}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Accessibility Guidance Card */}
      <GlassCard className="bg-emerald-500/5 border border-emerald-500/20 p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Why Color Vision Accessibility Matters
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Over 300 million people worldwide have color vision deficiency. When designing user interfaces, always pair color indicators (like green success or red error badges) with secondary visual cues such as icons, text labels, or distinct contrast differences.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
