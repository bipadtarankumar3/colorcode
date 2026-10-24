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

const TOOL_SLUGS = {
  gradient: "/tools/gradient-generator",
  palette: "/tools/palette-generator",
  tailwind: "/tools/tailwind-color-reference",
  extractor: "/tools/color-extractor",
  contrast: "/tools/contrast-checker",
  details: "/tools/color-converter-details",
  shades: "/tools/shades-tints-generator",
  blindness: "/tools/color-blindness-simulator",
};

const TOOL_META = {
  gradient: { title: "Gradient Generator", desc: "Build multi-stop linear and radial gradients with CSS & Tailwind export." },
  palette: { title: "Harmonic Palette Generator", desc: "Craft balanced, analogous, triadic, and complementary palettes." },
  tailwind: { title: "Tailwind Color Reference", desc: "Inspect and copy complete Tailwind CSS color shades with exact hex codes." },
  extractor: { title: "Image Color Extractor", desc: "Extract dominant color swatches directly from images in your browser." },
  contrast: { title: "WCAG Contrast Checker", desc: "Test foreground and background color combinations for accessibility compliance." },
  details: { title: "Color Details & Converter", desc: "Convert between HEX, RGB, HSL, HSV, CMYK, and identify nearest named hues." },
  shades: { title: "Shades & Tints Generator", desc: "Generate precise 10-step lighter tints and darker shades for any base color." },
  blindness: { title: "Color Blindness Simulator", desc: "Simulate 8 visual deficiency modes to ensure accessible UI designs." },
};

export function ColorBeastTool({ initialTool = "gradient" }) {
  const [activeTool, setActiveTool] = useState(initialTool);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleToolSelect = (id) => {
    setActiveTool(id);
    if (typeof window !== "undefined" && TOOL_SLUGS[id]) {
      window.history.pushState(null, "", TOOL_SLUGS[id]);
    }
  };

  const tools = [
    { id: "gradient", name: "Gradient", icon: Zap },
    { id: "palette", name: "Palette", icon: Palette },
    { id: "tailwind", name: "Tailwind", icon: Box },
    { id: "extractor", name: "Extract", icon: Camera },
    { id: "contrast", name: "Contrast", icon: Eye },
    { id: "details", name: "Convert", icon: RotateCcw },
    { id: "shades", name: "Variants", icon: Layers },
    { id: "blindness", name: "Vision", icon: Accessibility },
  ];

  const currentMeta = TOOL_META[activeTool] || TOOL_META.gradient;

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative">
      {/* Premium Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        {/* Animated Mesh Gradient - Base */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#10b981,transparent_50%),radial-gradient(circle_at_0%_100%,#059669,transparent_50%),radial-gradient(circle_at_100%_100%,#34d399,transparent_50%)]" />
        
        {/* Modern Grid Layer */}
        <div className="grid-bg" />

        {/* Floating Blobs - Secondary Layer */}
        <div className="blob blob-1 w-[800px] h-[800px] top-[-20%] left-[-10%] bg-emerald-600/5" />
        <div className="blob blob-2 w-[600px] h-[600px] bottom-[-10%] right-[-10%] bg-teal-600/5" />
        <div className="blob blob-3 w-[400px] h-[400px] top-[30%] left-[60%] bg-green-600/5" />
        
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
      
      <main className="w-full max-w-7xl px-3 sm:px-4 md:px-6 py-6 md:py-8 space-y-6 md:space-y-10">
        
        {/* Tool Switcher Section - Direct Access */}
        <section className="space-y-6">
          <nav className="w-full overflow-x-auto no-scrollbar pb-2 flex justify-start sm:justify-center relative">
            <div className="flex bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-1.5 rounded-[2rem] border border-slate-200/80 dark:border-slate-800 shadow-sm min-w-max items-center mx-auto px-2 gap-1">
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolSelect(tool.id)}
                  className={cn(
                    "flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-[1.5rem] transition-all duration-300 font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer",
                    activeTool === tool.id 
                      ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <tool.icon className={cn(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300", 
                    activeTool === tool.id ? "text-emerald-600 dark:text-emerald-400 scale-110" : "text-slate-400"
                  )} />
                  {tool.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Active Tool Headline */}
          <div className="text-center max-w-xl mx-auto space-y-1 pt-2">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
              {currentMeta.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {currentMeta.desc}
            </p>
          </div>

          <div className="relative min-h-[400px] md:min-h-[550px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
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
