"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Box, 
  Zap, 
  Camera, 
  Eye, 
  RotateCcw, 
  Layers, 
  Accessibility,
  ShieldCheck,
  Layout,
  Search,
  ChevronRight,
  History
} from "lucide-react";
import { cn } from "../lib/utils";
import dynamic from "next/dynamic";
import { Header } from "./Header";
import { ColorHistory } from "./ColorHistory";
import Footer from "./Footer";

const GradientGenerator = dynamic(() => import("./tools/GradientGenerator").then(mod => mod.GradientGenerator), { ssr: false });
const PaletteGenerator = dynamic(() => import("./tools/PaletteGenerator").then(mod => mod.PaletteGenerator), { ssr: false });
const TailwindReference = dynamic(() => import("./tools/TailwindReference").then(mod => mod.TailwindReference), { ssr: false });
const ImageExtractor = dynamic(() => import("./tools/ImageExtractor").then(mod => mod.ImageExtractor), { ssr: false });
const ContrastChecker = dynamic(() => import("./tools/ContrastChecker").then(mod => mod.ContrastChecker), { ssr: false });
const ColorDetails = dynamic(() => import("./tools/ColorDetails").then(mod => mod.ColorDetails), { ssr: false });
const ShadesTints = dynamic(() => import("./tools/ShadesTints").then(mod => mod.ShadesTints), { ssr: false });
const BlindnessSim = dynamic(() => import("./tools/BlindnessSim").then(mod => mod.BlindnessSim), { ssr: false });

const STATIC_BUBBLES = [
  { id: 1, left: '5%', width: '32px', height: '32px', delay: '0s', duration: '12s', opacity: 0.2 },
  { id: 2, left: '15%', width: '18px', height: '18px', delay: '2s', duration: '18s', opacity: 0.1 },
  { id: 3, left: '25%', width: '45px', height: '45px', delay: '5s', duration: '15s', opacity: 0.3 },
  { id: 4, left: '35%', width: '22px', height: '22px', delay: '1s', duration: '20s', opacity: 0.15 },
  { id: 5, left: '45%', width: '38px', height: '38px', delay: '8s', duration: '14s', opacity: 0.25 },
  { id: 6, left: '55%', width: '12px', height: '12px', delay: '3s', duration: '25s', opacity: 0.1 },
  { id: 7, left: '65%', width: '50px', height: '50px', delay: '6s', duration: '11s', opacity: 0.35 },
  { id: 8, left: '75%', width: '28px', height: '28px', delay: '4s', duration: '17s', opacity: 0.2 },
  { id: 9, left: '85%', width: '40px', height: '40px', delay: '9s', duration: '13s', opacity: 0.15 },
  { id: 10, left: '95%', width: '20px', height: '20px', delay: '7s', duration: '19s', opacity: 0.25 },
];

export function ColorBeastTool({ initialTool = "gradient" }) {
  const [activeTool, setActiveTool] = useState(initialTool);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const tools = [
    { id: "gradient", name: "Gradient", icon: Zap },
    { id: "palette", name: "Palette", icon: Palette },
    { id: "tailwind", name: "Tailwind", icon: Box },
    { id: "extractor", name: "Extract", icon: Camera },
    { id: "contrast", name: "A11y", icon: Eye },
    { id: "details", name: "Convert", icon: RotateCcw },
    { id: "shades", name: "Variants", icon: Layers },
    { id: "blindness", name: "Vision", icon: Accessibility },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      {/* Premium Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        {/* Animated Mesh Gradient - Base */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#3b82f6,transparent_50%),radial-gradient(circle_at_0%_100%,#8b5cf6,transparent_50%),radial-gradient(circle_at_100%_100%,#ec4899,transparent_50%)]" />
        
        {/* Modern Grid Layer */}
        <div className="grid-bg" />

        {/* Floating Blobs - Secondary Layer */}
        <div className="blob blob-1 w-[800px] h-[800px] top-[-20%] left-[-10%] bg-blue-600/10" />
        <div className="blob blob-2 w-[600px] h-[600px] bottom-[-10%] right-[-10%] bg-purple-600/10" />
        <div className="blob blob-3 w-[400px] h-[400px] top-[30%] left-[60%] bg-pink-600/10" />
        
        {/* Glassmorphic Floating Bubbles */}
        {STATIC_BUBBLES.map((b) => (
          <div 
            key={b.id}
            className="bubble"
            style={{ 
              left: b.left,
              width: b.width,
              height: b.height,
              animationDelay: b.delay,
              animationDuration: b.duration,
              opacity: b.opacity
            }}
          />
        ))}
        
        {/* Noise Texture */}
        <div className="noise" />
      </div>

      <Header />
      
      <main className="w-full max-w-6xl px-4 md:px-8 py-4 md:py-6 space-y-4 md:space-y-12">
        
        {/* Tool Switcher Section - Direct Access */}
        <section className="space-y-2 md:space-y-8">
          <nav className="w-full overflow-x-auto no-scrollbar pb-4 flex justify-start relative">
            <div className="flex bg-white/50 backdrop-blur-3xl p-1.5 rounded-[2rem] border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:shadow-[0_20px_50px_rgba(0,0,0,0.1)] min-w-max items-center mx-auto px-2">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={cn(
                    "flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3.5 rounded-[1.5rem] transition-all duration-500 font-bold text-[10px] md:text-sm whitespace-nowrap cursor-pointer",
                    activeTool === tool.id 
                      ? "bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)] scale-105" 
                      : "opacity-40 hover:opacity-100 hover:bg-white/50"
                  )}
                >
                  <tool.icon className={cn(
                    "w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-500", 
                    activeTool === tool.id ? "text-white" : "text-indigo-600"
                  )} />
                  {tool.name}
                </button>
              ))}
              
              {/* Scroll Hint Arrow for Tablet/Mobile */}
              <div className="md:hidden flex items-center justify-center ml-2 opacity-40 animate-pulse">
                <ChevronRight className="w-4 h-4 text-indigo-600" />
              </div>
            </div>
          </nav>

          <div className="relative min-h-[400px] md:min-h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {activeTool === "gradient" && <GradientGenerator />}
                {activeTool === "palette" && <PaletteGenerator />}
                {activeTool === "tailwind" && <TailwindReference />}
                {activeTool === "extractor" && <ImageExtractor />}
                {activeTool === "contrast" && <ContrastChecker />}
                {activeTool === "details" && <ColorDetails />}
                {activeTool === "shades" && <ShadesTints />}
                {activeTool === "blindness" && <BlindnessSim />}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Footer Details - Minimal & SEO Friendly */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-black/5">
           <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Privacy First
              </h3>
              <p className="text-xs opacity-40 leading-relaxed">All processing is done locally in your browser. No data is sent to our servers.</p>
           </div>
           <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Design Systems
              </h3>
              <p className="text-xs opacity-40 leading-relaxed">Built for professionals managing complex color systems and accessibility.</p>
           </div>
           <div className="space-y-2">
              <h3 className="text-sm font-black uppercase tracking-widest opacity-60 flex items-center gap-2">
                <Search className="w-4 h-4" />
                SEO Optimized
              </h3>
              <p className="text-xs opacity-40 leading-relaxed">Lightweight architecture ensures maximum speed and search engine visibility.</p>
           </div>
        </section>
      </main>

      <Footer />
      {/* Floating History Button */}
      <button 
        suppressHydrationWarning
        onClick={() => setIsHistoryOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group cursor-pointer"
      >
        <History className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Sidebars */}
      <ColorHistory isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </div>
  );
}
