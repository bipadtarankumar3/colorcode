"use client";

import { GlassCard } from "../ui/GlassCard";
import { Copy, RefreshCcw, Info, Check, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { getName } from "@/lib/ntc";
import { cn, selectColor } from "@/lib/utils";

export function ColorDetails() {
  const [color, setColor] = useState("#6366f1");
  const [hexInput, setHexInput] = useState("#6366f1");
  const [copiedKey, setCopiedKey] = useState(null);

  const handleHexInput = (val) => {
    setHexInput(val);
    const clean = val.startsWith("#") ? val : `#${val}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      setColor(clean.toLowerCase());
    }
  };

  const handlePickerChange = (val) => {
    setColor(val);
    setHexInput(val);
  };

  const conversions = useMemo(() => {
    const hex = color.toUpperCase();
    const r = parseInt(hex.slice(1, 3), 16) || 0;
    const g = parseInt(hex.slice(3, 5), 16) || 0;
    const b = parseInt(hex.slice(5, 7), 16) || 0;

    // RGB
    const rgb = `${r}, ${g}, ${b}`;
    const rgbCss = `rgb(${r}, ${g}, ${b})`;

    // HSL
    const rL = r / 255;
    const gL = g / 255;
    const bL = b / 255;
    const max = Math.max(rL, gL, bL), min = Math.min(rL, gL, bL);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rL: h = (gL - bL) / d + (gL < bL ? 6 : 0); break;
        case gL: h = (bL - rL) / d + 2; break;
        case bL: h = (rL - gL) / d + 4; break;
      }
      h /= 6;
    }
    const hsl = `${Math.round(h * 360)}°, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`;
    const hslCss = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    // HSV
    let v = max;
    let sV = max === 0 ? 0 : (max - min) / max;
    const hsv = `${Math.round(h * 360)}°, ${Math.round(sV * 100)}%, ${Math.round(v * 100)}%`;

    // CMYK
    let c = 1 - rL;
    let m = 1 - gL;
    let y = 1 - bL;
    let k = Math.min(c, m, y);
    if (k === 1) {
      c = m = y = 0;
    } else {
      c = (c - k) / (1 - k);
      m = (m - k) / (1 - k);
      y = (y - k) / (1 - k);
    }
    const cmyk = `${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%`;

    let colorName = "Custom Color";
    try {
      colorName = getName(hex);
    } catch {
      colorName = "Color";
    }

    return { 
      hex, 
      rgb, 
      rgbCss, 
      hsl, 
      hslCss, 
      hsv, 
      cmyk, 
      name: colorName 
    };
  }, [color]);

  const copyToClipboard = (val, key) => {
    navigator.clipboard.writeText(val);
    selectColor(color);
    setCopiedKey(key);
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.9 },
      colors: [color]
    });
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const randomize = () => {
    const randomHex = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    setColor(randomHex);
    setHexInput(randomHex);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Input & Swatch Preview */}
      <div className="lg:col-span-5 space-y-4">
        <GlassCard className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Info className="w-4 h-4 text-emerald-500" /> Color Identity
            </h3>
            <button 
              type="button"
              onClick={randomize}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
              title="Random Color"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Random
            </button>
          </div>

          {/* Interactive Color Box */}
          <div 
            className="h-44 sm:h-52 w-full rounded-2xl shadow-inner border border-black/10 relative overflow-hidden group cursor-pointer transition-colors duration-300 flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <input 
              type="color" 
              value={color}
              onChange={(e) => handlePickerChange(e.target.value)}
              className="absolute inset-0 w-[200%] h-[200%] -top-[50%] -left-[50%] opacity-0 cursor-pointer"
              title="Click to choose a color"
            />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs text-white px-3.5 py-2 rounded-xl text-xs font-bold pointer-events-none flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Click to Open Color Picker
            </div>
          </div>

          {/* Color Input Controls */}
          <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-black opacity-40 uppercase tracking-widest text-slate-500">HEX Input</span>
              <input 
                type="text" 
                value={hexInput}
                onChange={(e) => handleHexInput(e.target.value)}
                className="bg-transparent font-mono font-bold text-base outline-none uppercase text-slate-800 dark:text-slate-100 w-28"
              />
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black opacity-40 uppercase tracking-widest text-slate-500 block">Identified Name</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                {conversions.name}
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Conversions Output */}
      <div className="lg:col-span-7 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <ConversionCard 
            label="HEX" 
            value={conversions.hex} 
            onCopy={() => copyToClipboard(conversions.hex, 'hex')}
            isCopied={copiedKey === 'hex'}
          />
          <ConversionCard 
            label="RGB CSS" 
            value={conversions.rgbCss} 
            onCopy={() => copyToClipboard(conversions.rgbCss, 'rgb')}
            isCopied={copiedKey === 'rgb'}
          />
          <ConversionCard 
            label="HSL CSS" 
            value={conversions.hslCss} 
            onCopy={() => copyToClipboard(conversions.hslCss, 'hsl')}
            isCopied={copiedKey === 'hsl'}
          />
          <ConversionCard 
            label="HSV" 
            value={conversions.hsv} 
            onCopy={() => copyToClipboard(conversions.hsv, 'hsv')}
            isCopied={copiedKey === 'hsv'}
          />
          <ConversionCard 
            label="CMYK" 
            value={conversions.cmyk} 
            onCopy={() => copyToClipboard(conversions.cmyk, 'cmyk')}
            isCopied={copiedKey === 'cmyk'}
          />
          <ConversionCard 
            label="RGB Values" 
            value={conversions.rgb} 
            onCopy={() => copyToClipboard(conversions.rgb, 'rgbvals')}
            isCopied={copiedKey === 'rgbvals'}
          />
        </div>
      </div>
    </div>
  );
}

function ConversionCard({ label, value, onCopy, isCopied }) {
  return (
    <GlassCard 
      onClick={onCopy}
      className="p-4 bg-white/70 dark:bg-slate-900/70 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all group border border-slate-200/80 dark:border-slate-800"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
        {isCopied ? (
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Check className="w-3 h-3" /> Copied
          </span>
        ) : (
          <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
        )}
      </div>
      <p className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100 truncate">
        {value}
      </p>
    </GlassCard>
  );
}
