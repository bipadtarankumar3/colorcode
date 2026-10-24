"use client";

import { GlassCard } from "../ui/GlassCard";
import { Copy, Plus, Trash2, RotateCw, Layers, Sparkles, Check, Code } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { cn, selectColor } from "@/lib/utils";

const GRADIENT_PRESETS = [
  { name: "Sunset Blaze", type: "linear", angle: 45, stops: [{ id: "1", color: "#ff512f", position: 0 }, { id: "2", color: "#dd2476", position: 100 }] },
  { name: "Hyper Violet", type: "linear", angle: 135, stops: [{ id: "1", color: "#8b5cf6", position: 0 }, { id: "2", color: "#ec4899", position: 100 }] },
  { name: "Neon Horizon", type: "linear", angle: 90, stops: [{ id: "1", color: "#00f2fe", position: 0 }, { id: "2", color: "#4facfe", position: 100 }] },
  { name: "Emerald Glow", type: "linear", angle: 60, stops: [{ id: "1", color: "#34d399", position: 0 }, { id: "2", color: "#059669", position: 100 }] },
  { name: "Cosmic Twilight", type: "linear", angle: 120, stops: [{ id: "1", color: "#6a11cb", position: 0 }, { id: "2", color: "#2575fc", position: 100 }] },
  { name: "Ocean Mint", type: "linear", angle: 45, stops: [{ id: "1", color: "#2af598", position: 0 }, { id: "2", color: "#009efd", position: 100 }] },
  { name: "Velvet Berry", type: "linear", angle: 160, stops: [{ id: "1", color: "#f857a6", position: 0 }, { id: "2", color: "#ff5858", position: 100 }] },
  { name: "Golden Amber", type: "linear", angle: 45, stops: [{ id: "1", color: "#f59e0b", position: 0 }, { id: "2", color: "#ef4444", position: 100 }] },
];

export function GradientGenerator() {
  const [stops, setStops] = useState([
    { id: "1", color: "#8b5cf6", position: 0 },
    { id: "2", color: "#ec4899", position: 100 },
  ]);
  const [angle, setAngle] = useState(45);
  const [type, setType] = useState("linear");
  const [copiedType, setCopiedType] = useState(null);

  const gradientString = useMemo(() => {
    const stopString = [...stops]
      .sort((a, b) => a.position - b.position)
      .map(s => `${s.color} ${s.position}%`)
      .join(", ");
    
    return type === "linear" 
      ? `linear-gradient(${angle}deg, ${stopString})`
      : `radial-gradient(circle, ${stopString})`;
  }, [stops, angle, type]);

  const addStop = () => {
    if (stops.length >= 6) return;
    const newId = Math.random().toString(36).substr(2, 9);
    setStops([...stops, { id: newId, color: "#ffffff", position: 50 }]);
  };

  const removeStop = (id) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStop = (id, updates) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const copyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientString};`);
    stops.forEach(s => selectColor(s.color));
    setCopiedType("css");
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: stops.map(s => s.color)
    });
    setTimeout(() => setCopiedType(null), 2000);
  };

  const randomize = () => {
    const randomHex = () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    const randomAngle = [0, 45, 90, 135, 180, 225, 270][Math.floor(Math.random() * 7)];
    setAngle(randomAngle);
    setStops([
      { id: "1", color: randomHex(), position: 0 },
      { id: "2", color: randomHex(), position: 100 },
    ]);
  };

  const applyPreset = (preset) => {
    setType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops);
  };

  return (
    <div className="space-y-6">
      {/* Preset Pills */}
      <GlassCard className="p-3 bg-white/70 dark:bg-slate-900/70">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 whitespace-nowrap pl-2">
            Presets:
          </span>
          {GRADIENT_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-300"
            >
              <span 
                className="w-3 h-3 rounded-full border border-black/10" 
                style={{ background: `linear-gradient(45deg, ${p.stops[0].color}, ${p.stops[1].color})` }}
              />
              {p.name}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Preview Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className="h-72 sm:h-96 w-full rounded-3xl shadow-xl border-4 border-white dark:border-slate-800 relative group overflow-hidden transition-all duration-300"
            style={{ background: gradientString }}
          >
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
              <button 
                type="button"
                onClick={copyCss}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-7 py-3 rounded-2xl font-bold flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-transform shadow-xl text-sm uppercase tracking-wider"
              >
                {copiedType === "css" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copiedType === "css" ? "Copied!" : "Copy CSS Code"}
              </button>
            </div>
          </div>
          
          <GlassCard className="p-4 bg-white/70 dark:bg-slate-900/70 flex items-center justify-between gap-4">
            <code className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all select-all">
              background: {gradientString};
            </code>
            <button
              type="button"
              onClick={copyCss}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
              title="Copy CSS"
            >
              {copiedType === "css" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </GlassCard>
        </div>

        {/* Configuration Panel */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 space-y-5">
            {/* Header with Type & Random */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Layers className="w-4 h-4 text-emerald-500" /> Controls
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={randomize}
                  title="Randomize gradient"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button 
                    type="button"
                    onClick={() => setType("linear")}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                      type === "linear" ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-slate-400"
                    )}
                  >
                    Linear
                  </button>
                  <button 
                    type="button"
                    onClick={() => setType("radial")}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                      type === "radial" ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm" : "text-slate-400"
                    )}
                  >
                    Radial
                  </button>
                </div>
              </div>
            </div>

            {/* Angle Slider (if linear) */}
            {type === "linear" && (
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span className="uppercase tracking-wider">Direction Angle</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{angle}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                  {[0, 45, 90, 135, 180, 270].map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => setAngle(deg)}
                      className={cn(
                        "px-1.5 py-0.5 rounded font-mono hover:text-slate-700 dark:hover:text-slate-200",
                        angle === deg ? "text-emerald-500 font-bold" : ""
                      )}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Stops */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Color Stops ({stops.length}/6)
                </span>
                {stops.length < 6 && (
                  <button 
                    type="button"
                    onClick={addStop}
                    className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Stop
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                {stops.map((stop, index) => (
                  <div 
                    key={stop.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {/* Color Input */}
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-black/10 shrink-0">
                      <input 
                        type="color" 
                        value={stop.color}
                        onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                        className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer"
                      />
                    </div>

                    <input 
                      type="text" 
                      value={stop.color}
                      onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                      className="font-mono text-xs uppercase font-bold bg-transparent w-20 outline-none text-slate-800 dark:text-slate-200"
                    />

                    {/* Position Slider */}
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={stop.position}
                      onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })}
                      className="flex-1 accent-emerald-500 cursor-pointer h-1.5"
                    />
                    <span className="font-mono text-[10px] text-slate-400 w-8 text-right">
                      {stop.position}%
                    </span>

                    {/* Delete Stop */}
                    {stops.length > 2 && (
                      <button 
                        type="button"
                        onClick={() => removeStop(stop.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remove stop"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Export CTA */}
            <button
              type="button"
              onClick={copyCss}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Copy className="w-4 h-4" /> Copy Gradient CSS
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
