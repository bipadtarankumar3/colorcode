"use client";

import { GlassCard } from "../ui/GlassCard";
import { Copy, RefreshCcw, Info, Check } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";

export function ColorDetails() {
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState(null);

  const conversions = useMemo(() => {
    const hex = color.toUpperCase();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // RGB
    const rgb = `${r}, ${g}, ${b}`;

    // HSL
    const rL = r / 255;
    const gL = g / 255;
    const bL = b / 255;
    const max = Math.max(rL, gL, bL), min = Math.min(rL, gL, bL);
    let h, s, l = (max + min) / 2;
    if (max === min) h = s = 0;
    else {
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

    return { hex, rgb, hsl, cmyk };
  }, [color]);

  const copyToClipboard = (val, type) => {
    navigator.clipboard.writeText(val);
    setCopied(type);
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.9 },
    });
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Input & Preview */}
      <div className="lg:col-span-5 space-y-6">
        <GlassCard className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Color Identity
            </h3>
            <p className="text-sm opacity-40">Inspect and convert any color.</p>
          </div>

          <div 
            className="h-48 w-full rounded-2xl shadow-inner border border-white/40 flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <input 
              type="color" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-16 h-16 rounded-full cursor-pointer border-4 border-white shadow-2xl opacity-0"
            />
            <div 
              className="w-20 h-20 rounded-full border-4 border-white shadow-2xl pointer-events-none flex items-center justify-center bg-white/20 backdrop-blur-md"
              style={{ backgroundColor: color }}
            >
               <RefreshCcw className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-4">
             <div className="bg-black/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                   <span className="text-[10px] font-black opacity-30 uppercase tracking-widest">Base Color</span>
                   <input 
                    type="text" 
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="bg-transparent font-mono font-bold text-lg outline-none uppercase"
                   />
                </div>
                <button 
                  onClick={() => setColor(`#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`)}
                  className="p-2 bg-black/5 hover:bg-black/10 rounded-xl transition-colors"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
             </div>
          </div>
        </GlassCard>
      </div>

      {/* Conversions */}
      <div className="lg:col-span-7 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ConversionCard 
            label="HEX" 
            value={conversions.hex} 
            onCopy={() => copyToClipboard(conversions.hex, 'hex')}
            isCopied={copied === 'hex'}
          />
          <ConversionCard 
            label="RGB" 
            value={conversions.rgb} 
            onCopy={() => copyToClipboard(conversions.rgb, 'rgb')}
            isCopied={copied === 'rgb'}
          />
          <ConversionCard 
            label="HSL" 
            value={conversions.hsl} 
            onCopy={() => copyToClipboard(conversions.hsl, 'hsl')}
            isCopied={copied === 'hsl'}
          />
          <ConversionCard 
            label="CMYK" 
            value={conversions.cmyk} 
            onCopy={() => copyToClipboard(conversions.cmyk, 'cmyk')}
            isCopied={copied === 'cmyk'}
          />
        </div>

        <GlassCard className="p-8 bg-black/5 border-dashed flex flex-col items-center justify-center text-center gap-4">
           <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Info className="w-6 h-6 opacity-40" />
           </div>
           <div className="space-y-1">
              <h4 className="text-sm font-bold opacity-60">Design Note</h4>
              <p className="text-xs opacity-40 leading-relaxed max-w-xs">
                This color is best used for highlights and primary CTAs in your current glassmorphic theme.
              </p>
           </div>
        </GlassCard>
      </div>
    </div>
  );
}

function ConversionCard({ label, value, onCopy, isCopied }) {
  return (
    <GlassCard className="flex flex-col gap-3 group hoverable">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">{label}</span>
        {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 opacity-0 group-hover:opacity-40" />}
      </div>
      <div 
        className="font-mono text-xl font-bold truncate cursor-pointer"
        onClick={onCopy}
      >
        {value}
      </div>
    </GlassCard>
  );
}
