"use client";

import { GlassCard } from "../ui/GlassCard";
import { Copy, Plus, Trash2, RotateCw, Layers } from "lucide-react";
import { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import { cn, selectColor } from "@/lib/utils";

export function GradientGenerator() {
  const [stops, setStops] = useState([
    { id: "1", color: "#f093fb", position: 0 },
    { id: "2", color: "#f5576c", position: 100 },
  ]);
  const [angle, setAngle] = useState(45);
  const [type, setType] = useState("linear");

  const gradientString = useMemo(() => {
    const stopString = stops
      .sort((a, b) => a.position - b.position)
      .map(s => `${s.color} ${s.position}%`)
      .join(", ");
    
    return type === "linear" 
      ? `linear-gradient(${angle}deg, ${stopString})`
      : `radial-gradient(circle, ${stopString})`;
  }, [stops, angle, type]);

  const addStop = () => {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`background: ${gradientString};`);
    stops.forEach(s => selectColor(s.color));
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: stops.map(s => s.color)
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-7 space-y-6">
        <div 
          className="h-80 md:h-96 w-full rounded-3xl shadow-2xl border-4 border-white relative group overflow-hidden transition-all duration-500"
          style={{ background: gradientString }}
        >
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
            <button 
              onClick={copyToClipboard}
              className="bg-white text-black px-8 py-3 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl"
            >
              <Copy className="w-5 h-5" />
              COPY CSS
            </button>
          </div>
        </div>
        
        <GlassCard className="p-4 bg-white/10">
          <code className="text-xs md:text-sm font-mono break-words whitespace-pre-wrap opacity-70">
            background: {gradientString};
          </code>
        </GlassCard>
      </div>

      <div className="md:col-span-5 space-y-6">
        <GlassCard className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h3 className="text-base md:text-lg font-black flex items-center gap-2 uppercase tracking-tight">
              <Layers className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" />
              Configuration
            </h3>
            <div className="flex bg-black/5 p-1 rounded-xl w-full lg:w-auto">
              <button 
                onClick={() => setType("linear")}
                className={cn(
                  "flex-1 lg:flex-none px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-black transition-all",
                  type === "linear" ? "bg-white text-emerald-600 shadow-md" : "opacity-40"
                )}
              >
                Linear
              </button>
              <button 
                onClick={() => setType("radial")}
                className={cn(
                  "flex-1 lg:flex-none px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-black transition-all",
                  type === "radial" ? "bg-white text-emerald-600 shadow-md" : "opacity-40"
                )}
              >
                Radial
              </button>
            </div>
          </div>

          {type === "linear" && (
            <div className="space-y-3">
              <div className="flex justify-between text-xs md:text-sm font-bold opacity-60">
                <label className="flex items-center gap-2">
                  <RotateCw className="w-4 h-4" />
                  Angle
                </label>
                <span>{angle}°</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full h-2 bg-black/5 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs md:text-sm font-bold opacity-60">Color Stops</label>
              <button 
                onClick={addStop}
                className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {stops.map((stop) => (
                <div key={stop.id} className="flex items-center gap-3 bg-black/5 p-3 rounded-2xl border border-white/10 group">
                  <input 
                    type="color" 
                    value={stop.color}
                    onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold opacity-40 uppercase">
                      <span>{stop.color}</span>
                      <span>{stop.position}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={stop.position}
                      onChange={(e) => updateStop(stop.id, { position: parseInt(e.target.value) })}
                      className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-gray-600"
                    />
                  </div>
                  <button 
                    onClick={() => removeStop(stop.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    disabled={stops.length <= 2}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
