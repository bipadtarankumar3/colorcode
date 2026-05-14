"use client";

import { GlassCard } from "../ui/GlassCard";
import { RefreshCw, Copy, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";

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
            <p className="opacity-50 font-mono text-sm">{baseColor}</p>
          </div>
        </div>

        <div className="flex bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-lg">
          {["analogous", "complementary", "triadic", "monochromatic"].map((h) => (
            <button
              key={h}
              onClick={() => setHarmony(h)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${harmony === h ? "bg-white text-black shadow-md" : "opacity-40 hover:opacity-100"}`}
            >
              {h}
            </button>
          ))}
        </div>

        <button 
          onClick={randomBase}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:scale-105 transition-all shadow-xl font-bold text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          RANDOMIZE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {palette.map((color, i) => (
          <GlassCard key={i} className="p-3 group relative overflow-hidden" hoverable>
            <div 
              className="h-48 w-full rounded-xl shadow-inner border border-black/5 mb-4 transition-transform group-hover:scale-[1.02]"
              style={{ backgroundColor: color }}
            />
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <span className="block text-[10px] font-bold opacity-30 uppercase tracking-widest">Hex Code</span>
                <span className="font-mono text-sm font-bold opacity-80 uppercase">{color}</span>
              </div>
              <button 
                onClick={() => copyColor(color)}
                className="p-2.5 bg-black/5 hover:bg-black/10 rounded-xl transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {i === 2 && (
              <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md p-1 rounded-lg border border-white/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
