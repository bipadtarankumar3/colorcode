"use client";

import { useState, useEffect } from "react";
import { History, X, Copy, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

export function ColorHistory({ isOpen, onClose }) {
  const [history, setHistory] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("color-history") || "[]");
    }
    return [];
  });

  useEffect(() => {
    // Listen for new colors
    const handleNewColor = (e) => {
      const color = e.detail;
      setHistory(prev => {
        const filtered = prev.filter(c => c !== color);
        const next = [color, ...filtered].slice(0, 50);
        localStorage.setItem("color-history", JSON.stringify(next));
        return next;
      });
    };

    window.addEventListener("color-selected", handleNewColor);
    return () => window.removeEventListener("color-selected", handleNewColor);
  }, []);

  const copyColor = (color) => {
    navigator.clipboard.writeText(color);
    confetti({
      particleCount: 20,
      spread: 30,
      origin: { y: 0.9 },
      colors: [color]
    });
  };

  const clearHistory = () => {
    localStorage.setItem("color-history", "[]");
    setHistory([]);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-80 z-[70] bg-white/80 backdrop-blur-3xl border-l border-white/40 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between border-b border-black/5">
            <h2 className="text-xl font-black flex items-center gap-2 uppercase tracking-tight">
              <History className="w-5 h-5 text-indigo-600" />
              History
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {history.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {history.map((color, i) => (
                  <div 
                    key={i}
                    onClick={() => copyColor(color)}
                    className="group relative h-24 rounded-2xl border border-white/60 shadow-sm cursor-pointer overflow-hidden transition-transform hover:scale-105 active:scale-95"
                    style={{ backgroundColor: color }}
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                      <Copy className="w-4 h-4 text-white" />
                      <span className="text-[10px] font-mono font-bold text-white uppercase">{color}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-20">
                <History className="w-12 h-12" />
                <p className="text-sm font-bold uppercase tracking-widest">No colors yet</p>
              </div>
            )}
          </div>

          {history.length > 0 && (
            <div className="p-6 border-t border-black/5">
              <button 
                onClick={clearHistory}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 rounded-2xl font-bold text-xs hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
