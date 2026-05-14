"use client";

import { GlassCard } from "../ui/GlassCard";
import { Layers, Copy, Sun, Moon } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";

export function ShadesTints() {
  const [baseColor, setBaseColor] = useState("#6366f1");

  const generateVariants = useMemo(() => {
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgbToHex = (r, g, b) => {
      return `#${[r, g, b].map(x => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, '0')).join('')}`;
    };

    const rgb = hexToRgb(baseColor);
    const tints = [];
    const shades = [];

    for (let i = 1; i <= 10; i++) {
      const factor = i / 11;
      // Tints (mix with white)
      tints.push(rgbToHex(
        rgb.r + (255 - rgb.r) * factor,
        rgb.g + (255 - rgb.g) * factor,
        rgb.b + (255 - rgb.b) * factor
      ));
      // Shades (mix with black)
      shades.push(rgbToHex(
        rgb.r * (1 - factor),
        rgb.g * (1 - factor),
        rgb.b * (1 - factor)
      ));
    }

    return { tints: tints.reverse(), shades };
  }, [baseColor]);

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.9 },
      colors: [hex]
    });
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
         <div className="flex items-center gap-4">
            <input 
              type="color" 
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-xl"
            />
            <div>
              <h2 className="text-2xl font-bold tracking-tight uppercase">Base Color</h2>
              <p className="opacity-50 font-mono text-sm uppercase">{baseColor}</p>
            </div>
         </div>
         <GlassCard className="py-2 px-6 bg-white/20 border-white/30">
            <span className="text-sm font-bold opacity-60">Variants Lab</span>
         </GlassCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tints */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 opacity-50 px-2">
              <Sun className="w-4 h-4" />
              <h3 className="text-xs font-black uppercase tracking-widest">Tints (Lighter)</h3>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {generateVariants.tints.map((color, i) => (
                <VariantCard key={i} color={color} onCopy={() => copyColor(color)} />
              ))}
           </div>
        </section>

        {/* Shades */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 opacity-50 px-2">
              <Moon className="w-4 h-4" />
              <h3 className="text-xs font-black uppercase tracking-widest">Shades (Darker)</h3>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {generateVariants.shades.map((color, i) => (
                <VariantCard key={i} color={color} onCopy={() => copyColor(color)} />
              ))}
           </div>
        </section>
      </div>
    </div>
  );
}

function VariantCard({ color, onCopy }) {
  return (
    <GlassCard 
      className="p-2 space-y-2 cursor-pointer group"
      hoverable
      onClick={onCopy}
    >
      <div 
        className="h-20 w-full rounded-xl border border-black/5"
        style={{ backgroundColor: color }}
      />
      <div className="text-[10px] font-mono font-bold text-center opacity-40 uppercase group-hover:opacity-100 transition-opacity">
        {color}
      </div>
    </GlassCard>
  );
}
