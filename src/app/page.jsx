"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Box, Zap } from "lucide-react";
import { cn } from "../lib/utils";
import { GradientGenerator } from "../components/tools/GradientGenerator";
import { PaletteGenerator } from "../components/tools/PaletteGenerator";
import { TailwindReference } from "../components/tools/TailwindReference";
import { useEffect } from "react";

export default function Home() {
  const [activeTool, setActiveTool] = useState("gradient");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tools = [
    { id: "gradient", name: "Gradient Gen", icon: Zap, color: "from-blue-500 to-cyan-400" },
    { id: "palette", name: "Palette Gen", icon: Palette, color: "from-purple-500 to-pink-400" },
    { id: "tailwind", name: "Tailwind Ref", icon: Box, color: "from-orange-500 to-amber-400" },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 flex flex-col items-center">
      <div className="w-full max-w-6xl space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              COLOR BEAST
            </h1>
            <p className="text-lg opacity-50 font-medium">The ultimate weapon for visual designers.</p>
          </div>
          
          <nav className="flex bg-white/30 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20 shadow-xl">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm",
                  activeTool === tool.id 
                    ? "bg-white shadow-lg text-black scale-105" 
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <tool.icon className={cn("w-4 h-4", activeTool === tool.id && "text-purple-600")} />
                {tool.name}
              </button>
            ))}
          </nav>
        </header>

        {/* Content Area */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {activeTool === "gradient" && <GradientGenerator />}
              {activeTool === "palette" && <PaletteGenerator />}
              {activeTool === "tailwind" && <TailwindReference />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40 text-sm font-medium">
          <p>© 2026 Color Beast Lab. Built for speed.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Documentation</a>
            <a href="#" className="hover:underline">GitHub</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
