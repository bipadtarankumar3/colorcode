"use client";

import { GlassCard } from "../ui/GlassCard";
import { Layers, Copy, Sun, Moon, RefreshCw, Check } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { selectColor } from "@/lib/utils";

export function ShadesTints() {
  const [baseColor, setBaseColor] = useState("#6366f1");
  const [hexInput, setHexInput] = useState("#6366f1");
  const [copiedColor, setCopiedColor] = useState(null);

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

  const generateVariants = useMemo(() => {
    const hexToRgb = (hex) => {
      const clean = hex.startsWith("#") ? hex : `#${hex}`;
      if (!/^#[0-9A-Fa-f]{6}$/.test(clean)) return { r: 99, g: 102, b: 241 };
      const r = parseInt(clean.slice(1, 3), 16);
      const g = parseInt(clean.slice(3, 5), 16);
      const b = parseInt(clean.slice(5, 7), 16);
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
      // Tints (mix with pure white)
      tints.push(rgbToHex(
        rgb.r + (255 - rgb.r) * factor,
        rgb.g + (255 - rgb.g) * factor,
        rgb.b + (255 - rgb.b) * factor
      ));
      // Shades (mix with pure black)
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
    selectColor(hex);
    setCopiedColor(hex);
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.9 },
      colors: [hex]
    });
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const randomize = () => {
    const randomHex = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setBaseColor(randomHex);
    setHexInput(randomHex);
  };

  return (
    <div className="space-y-8">
      {/* Base Color Header Controls */}
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
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Base Source Color</span>
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
            <Layers className="w-4 h-4 text-emerald-500" /> Monochromatic Variants
          </div>
        </div>
      </GlassCard>

      {/* Grid: Tints and Shades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tints (Lighter) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                Tints (White Mix • 10 Steps)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Lightest → Dark</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {generateVariants.tints.map((color, i) => (
              <VariantCard 
                key={i} 
                color={color} 
                step={i + 1}
                isCopied={copiedColor === color}
                onCopy={() => copyColor(color)} 
              />
            ))}
          </div>
        </section>

        {/* Shades (Darker) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200">
                Shades (Black Mix • 10 Steps)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Mid → Darkest</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {generateVariants.shades.map((color, i) => (
              <VariantCard 
                key={i} 
                color={color} 
                step={i + 1}
                isCopied={copiedColor === color}
                onCopy={() => copyColor(color)} 
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function VariantCard({ color, step, onCopy, isCopied }) {
  return (
    <GlassCard 
      onClick={onCopy}
      className="p-1.5 cursor-pointer transition-all duration-300 hover:scale-[1.04] active:scale-95 group relative overflow-hidden bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800"
    >
      <div 
        className="h-20 w-full rounded-lg shadow-inner border border-black/5 flex items-center justify-center transition-all relative"
        style={{ backgroundColor: color }}
      >
        {isCopied ? (
          <div className="bg-black/40 backdrop-blur-xs text-white px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 animate-scale-in">
            <Check className="w-3 h-3" /> Done
          </div>
        ) : (
          <Copy className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-sm" />
        )}
      </div>
      <div className="p-1 text-center">
        <span className="font-mono text-[10px] font-bold uppercase text-slate-700 dark:text-slate-200 block truncate">
          {color}
        </span>
      </div>
    </GlassCard>
  );
}
