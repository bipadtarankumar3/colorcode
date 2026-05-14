"use client";

import { GlassCard } from "../ui/GlassCard";
import { Accessibility, Eye, Sparkles } from "lucide-react";
import { useState } from "react";

const TYPES = [
  { id: "normal", name: "Normal Vision", values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" },
  { id: "protanopia", name: "Protanopia", values: "0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0" },
  { id: "protanomaly", name: "Protanomaly", values: "0.817 0.183 0 0 0  0.333 0.667 0 0 0  0 0.125 0.875 0 0  0 0 0 1 0" },
  { id: "deuteranopia", name: "Deuteranopia", values: "0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0" },
  { id: "deuteranomaly", name: "Deuteranomaly", values: "0.8 0.2 0 0 0  0.258 0.742 0 0 0  0 0.142 0.858 0 0  0 0 0 1 0" },
  { id: "tritanopia", name: "Tritanopia", values: "0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0" },
  { id: "tritanomaly", name: "Tritanomaly", values: "0.967 0.033 0 0 0  0 0.733 0.267 0 0  0 0.183 0.817 0 0  0 0 0 1 0" },
  { id: "achromatopsia", name: "Achromatopsia", values: "0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" },
  { id: "achromatomaly", name: "Achromatomaly", values: "0.618 0.320 0.062 0 0  0.163 0.775 0.062 0 0  0.163 0.320 0.516 0 0  0 0 0 1 0" },
];

export function BlindnessSim() {
  const [baseColor, setBaseColor] = useState("#6366f1");

  return (
    <div className="space-y-12">
      {/* SVG Filters Definition */}
      <svg className="hidden">
        <defs>
          {TYPES.map(type => (
            <filter key={type.id} id={`filter-${type.id}`}>
              <feColorMatrix type="matrix" values={type.values} />
            </filter>
          ))}
        </defs>
      </svg>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-4">
            <input 
              type="color" 
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-xl"
            />
            <div>
              <h2 className="text-2xl font-bold tracking-tight uppercase">Simulate Vision</h2>
              <p className="opacity-50 font-mono text-sm uppercase">{baseColor}</p>
            </div>
         </div>
         <GlassCard className="py-2 px-6 bg-white/20 border-white/30">
            <span className="text-sm font-bold opacity-60">Accessibility Suite</span>
         </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TYPES.map((type) => (
          <GlassCard key={type.id} className="p-4 space-y-4 group overflow-hidden">
             <div className="flex justify-between items-center px-1">
                <h3 className="text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">{type.name}</h3>
                {type.id === "normal" && <Sparkles className="w-4 h-4 text-yellow-500" />}
             </div>
             
             <div className="relative h-32 w-full rounded-xl overflow-hidden shadow-inner border border-black/5 bg-white/40">
                <div 
                  className="absolute inset-0"
                  style={{ 
                    backgroundColor: baseColor,
                    filter: `url(#filter-${type.id})`
                  }}
                />
                {/* Decorative Pattern to show vision impact more clearly */}
                <div 
                  className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
                  style={{ 
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '10px 10px',
                    filter: `url(#filter-${type.id})`
                  }}
                />
             </div>

             <div className="flex gap-2">
                {[1, 2, 3].map(i => (
                   <div 
                    key={i}
                    className="h-2 flex-1 rounded-full opacity-20"
                    style={{ 
                      backgroundColor: baseColor,
                      filter: `url(#filter-${type.id})`
                    }}
                   />
                ))}
             </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-blue-500/5 border-blue-500/20 p-6 flex items-start gap-4">
         <Accessibility className="w-6 h-6 text-blue-600 mt-1" />
         <div className="space-y-1">
            <h4 className="text-sm font-bold text-blue-900">Why this matters?</h4>
            <p className="text-xs text-blue-700/70 leading-relaxed max-w-2xl">
              Approximately 1 in 12 men and 1 in 200 women are affected by color blindness. 
              Always ensure your primary brand colors remain distinguishable across these simulations to maintain a truly accessible design.
            </p>
         </div>
      </GlassCard>
    </div>
  );
}
