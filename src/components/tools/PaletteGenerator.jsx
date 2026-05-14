"use client";

import { GlassCard } from "../ui/GlassCard";
import { RefreshCw, Copy, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { cn, selectColor } from "@/lib/utils";

export function PaletteGenerator() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [harmony, setHarmony] = useState("analogous");

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
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
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
          hslToHex(base.h, base.s, base.l * 0.7),
          hslToHex(base.h, base.s * 0.8, base.l * 0.9),
          baseColor,
          hslToHex((base.h + 180) % 360, base.s, base.l),
          hslToHex((base.h + 180) % 360, base.s, base.l * 0.8),
        ];
        break;
      case "triadic":
        colors = [
          hslToHex((base.h + 120) % 360, base.s, base.l),
          hslToHex((base.h + 120) % 360, base.s * 0.8, base.l * 0.8),
          baseColor,
          hslToHex((base.h + 240) % 360, base.s * 0.8, base.l * 0.8),
          hslToHex((base.h + 240) % 360, base.s, base.l),
        ];
        break;
      case "monochromatic":
        colors = [
          hslToHex(base.h, base.s, Math.max(0, base.l - 40)),
          hslToHex(base.h, base.s, Math.max(0, base.l - 20)),
          baseColor,
          hslToHex(base.h, base.s, Math.min(100, base.l + 20)),
          hslToHex(base.h, base.s, Math.min(100, base.l + 40)),
        ];
        break;
    }
    return colors;
  }, [baseColor, harmony]);

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    selectColor(hex);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: [hex]
    });
  };

  const randomBase = () => {
    setBaseColor(`#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
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

        <div className="flex bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-lg overflow-x-auto no-scrollbar max-w-full">
          {["analogous", "complementary", "triadic", "monochromatic"].map((h) => (
            <button
              key={h}
              onClick={() => setHarmony(h)}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase transition-all whitespace-nowrap",
                harmony === h ? "bg-white text-black shadow-md" : "opacity-40 hover:opacity-100"
              )}
            >
              {h}
            </button>
          ))}
        </div>

        <button 
          onClick={randomBase}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:scale-105 transition-all shadow-xl font-bold text-sm w-full md:w-auto justify-center"
        >
          <RefreshCw className="w-4 h-4" />
          RANDOMIZE
        </button>
      </div>

      {/* Palette Display */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
        {palette.map((color, i) => (
          <div 
            key={i} 
            className={cn(
              "group relative flex flex-col gap-3",
              i === 4 ? "col-span-2 md:col-span-1" : ""
            )}
          >
            <GlassCard 
              className="p-2 cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 group/palette"
              onClick={() => copyColor(color)}
            >
              <div 
                className="h-32 md:h-64 w-full rounded-xl shadow-inner border border-black/5"
                style={{ backgroundColor: color }}
              />
              {color === baseColor && (
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-1.5 rounded-lg border border-white/30">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
            </GlassCard>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Color {i+1}</span>
              <span className="font-mono font-bold text-xs md:text-base uppercase">{color}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
