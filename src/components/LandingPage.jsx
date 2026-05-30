"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Zap, 
  Eye, 
  RotateCcw, 
  Camera, 
  Box, 
  ShieldCheck, 
  Layout,
  Accessibility,
  ArrowRight,
  CheckCircle,
  Copy,
  BookOpen,
  ChevronRight,
  Mail,
  Sparkles,
  Code,
  Layers,
  Lock,
  ArrowDown
} from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Header } from "./Header";
import Footer from "./Footer";
import { GlassCard } from "./ui/GlassCard";

const COLOR_PRESETS = [
  {
    hex: "#6366f1",
    name: "Indigo",
    palette: ["#e0e7ff", "#c7d2fe", "#818cf8", "#6366f1", "#4338ca"],
    contrastWhite: "4.8:1",
    contrastWhitePass: "AA Pass",
    contrastBlack: "4.4:1",
    contrastBlackPass: "AA Pass",
    textColor: "text-indigo-600",
    bgAccent: "bg-indigo-500/10",
    borderAccent: "border-indigo-500/20",
    cssVars: `:root {
  --color-brand-50: #e0e7ff;
  --color-brand-100: #c7d2fe;
  --color-brand-300: #818cf8;
  --color-brand-500: #6366f1;
  --color-brand-700: #4338ca;
}`,
    tailwind: `colors: {
  brand: {
    50: '#e0e7ff',
    100: '#c7d2fe',
    300: '#818cf8',
    500: '#6366f1',
    700: '#4338ca',
  }
}`
  },
  {
    hex: "#10b981",
    name: "Emerald",
    palette: ["#d1fae5", "#a7f3d0", "#34d399", "#10b981", "#047857"],
    contrastWhite: "3.0:1",
    contrastWhitePass: "AA Large Only",
    contrastBlack: "7.0:1",
    contrastBlackPass: "AAA Pass",
    textColor: "text-emerald-600",
    bgAccent: "bg-emerald-500/10",
    borderAccent: "border-emerald-500/20",
    cssVars: `:root {
  --color-brand-50: #d1fae5;
  --color-brand-100: #a7f3d0;
  --color-brand-300: #34d399;
  --color-brand-500: #10b981;
  --color-brand-700: #047857;
}`,
    tailwind: `colors: {
  brand: {
    50: '#d1fae5',
    100: '#a7f3d0',
    300: '#34d399',
    500: '#10b981',
    700: '#047857',
  }
}`
  },
  {
    hex: "#8b5cf6",
    name: "Violet",
    palette: ["#ede9fe", "#ddd6fe", "#a78bfa", "#8b5cf6", "#6d28d9"],
    contrastWhite: "4.5:1",
    contrastWhitePass: "AA Pass",
    contrastBlack: "4.7:1",
    contrastBlackPass: "AA Pass",
    textColor: "text-purple-600",
    bgAccent: "bg-purple-500/10",
    borderAccent: "border-purple-500/20",
    cssVars: `:root {
  --color-brand-50: #ede9fe;
  --color-brand-100: #ddd6fe;
  --color-brand-300: #a78bfa;
  --color-brand-500: #8b5cf6;
  --color-brand-700: #6d28d9;
}`,
    tailwind: `colors: {
  brand: {
    50: '#ede9fe',
    100: '#ddd6fe',
    300: '#a78bfa',
    500: '#8b5cf6',
    700: '#6d28d9',
  }
}`
  },
  {
    hex: "#f43f5e",
    name: "Rose",
    palette: ["#ffe4e6", "#fecdd3", "#fb7185", "#f43f5e", "#be123c"],
    contrastWhite: "4.5:1",
    contrastWhitePass: "AA Pass",
    contrastBlack: "4.7:1",
    contrastBlackPass: "AA Pass",
    textColor: "text-rose-600",
    bgAccent: "bg-rose-500/10",
    borderAccent: "border-rose-500/20",
    cssVars: `:root {
  --color-brand-50: #ffe4e6;
  --color-brand-100: #fecdd3;
  --color-brand-300: #fb7185;
  --color-brand-500: #f43f5e;
  --color-brand-700: #be123c;
}`,
    tailwind: `colors: {
  brand: {
    50: '#ffe4e6',
    100: '#fecdd3',
    300: '#fb7185',
    500: '#f43f5e',
    700: '#be123c',
  }
}`
  },
  {
    hex: "#f59e0b",
    name: "Amber",
    palette: ["#fef3c7", "#fde68a", "#fbbf24", "#f59e0b", "#b45309"],
    contrastWhite: "2.5:1",
    contrastWhitePass: "Fail",
    contrastBlack: "8.4:1",
    contrastBlackPass: "AAA Pass",
    textColor: "text-amber-600",
    bgAccent: "bg-amber-500/10",
    borderAccent: "border-amber-500/20",
    cssVars: `:root {
  --color-brand-50: #fef3c7;
  --color-brand-100: #fde68a;
  --color-brand-300: #fbbf24;
  --color-brand-500: #f59e0b;
  --color-brand-700: #b45309;
}`,
    tailwind: `colors: {
  brand: {
    50: '#fef3c7',
    100: '#fde68a',
    300: '#fbbf24',
    500: '#f59e0b',
    700: '#b45309',
  }
}`
  }
];

export function LandingPage() {
  const [activePreset, setActivePreset] = useState(COLOR_PRESETS[1]); // Default to Emerald green
  const [exportFormat, setExportFormat] = useState("css"); // css or tailwind
  const [copied, setCopied] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);


  // Auto-play preset transitions on page load
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActivePreset((prev) => {
        const currentIndex = COLOR_PRESETS.findIndex((p) => p.hex === prev.hex);
        const nextIndex = (currentIndex + 1) % COLOR_PRESETS.length;
        return COLOR_PRESETS[nextIndex];
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleCopy = () => {
    const textToCopy = exportFormat === "css" ? activePreset.cssVars : activePreset.tailwind;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toolCards = [
    {
      title: "Palette Generator",
      desc: "Generate balanced color palettes instantly.",
      icon: Palette,
      href: "/tools/palette-generator",
      color: "from-indigo-500 to-violet-500",
      type: "palette",
      preview: ["#4361EE", "#7209B7", "#F72585", "#4CC9F0"],
      cta: "Launch Generator"
    },
    {
      title: "Gradient Generator",
      desc: "Create gradients and export CSS.",
      icon: Zap,
      href: "/tools/gradient-generator",
      color: "from-pink-500 to-purple-500",
      type: "gradient",
      preview: { from: "#FF006E", to: "#8338EC" },
      cta: "Build Gradients"
    },
    {
      title: "Color Converter",
      desc: "Convert color formats instantly.",
      icon: RotateCcw,
      href: "/tools/color-converter-details",
      color: "from-blue-500 to-cyan-500",
      type: "converter",
      preview: { hex: "#4361EE", rgb: "67 97 238", hsl: "230 84% 60%" },
      cta: "Run Converter"
    },
    {
      title: "Contrast Checker",
      desc: "Verify readability and accessibility.",
      icon: Eye,
      href: "/tools/contrast-checker",
      color: "from-emerald-500 to-teal-500",
      type: "contrast",
      preview: { ratio: "7.2:1", badge1: "AA ✓", badge2: "AAA ✓" },
      cta: "Check Contrast"
    },
    {
      title: "Image Color Extractor",
      desc: "Extract palettes from images.",
      icon: Camera,
      href: "/tools/color-extractor",
      color: "from-amber-500 to-orange-500",
      type: "extractor",
      preview: ["#D97706", "#F59E0B", "#FCD34D", "#FFFBEB"],
      cta: "Extract Palette"
    },
    {
      title: "Tailwind Color Reference",
      desc: "Export compliant Tailwind configs.",
      icon: Box,
      href: "/tools/tailwind-color-reference",
      color: "from-sky-500 to-indigo-500",
      type: "tailwind",
      preview: { name: "brand", shades: ["#EEF2FF", "#C7D2FE", "#6366F1", "#4338CA", "#312E81"] },
      cta: "Export Config"
    },
    {
      title: "Shades & Tints Generator",
      desc: "Create monochromatic shade variations.",
      icon: Layout,
      href: "/tools/shades-tints-generator",
      color: "from-teal-500 to-emerald-500",
      type: "shades",
      preview: { hex: "#10B981", steps: ["#e6f7f0", "#a3e1c8", "#10b981", "#085d41", "#02251a"] },
      cta: "Generate Shades"
    },
    {
      title: "Color Blindness Simulator",
      desc: "Simulate color vision modes.",
      icon: Accessibility,
      href: "/tools/color-blindness-simulator",
      color: "from-red-500 to-rose-500",
      type: "blindness",
      preview: { hex: "#EF4444", normal: "#EF4444", protan: "#97902E", deuteran: "#A08E35" },
      cta: "Simulate Vision"
    }
  ];

  const whyUseColorCode = [
    {
      title: "Visual First",
      desc: "Built around real color workflows.",
      icon: Layout,
      demo: (
        <div className="flex gap-1.5 items-center justify-center h-10 w-full mt-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800">
          <span className="w-4 h-4 rounded bg-[#4361EE] shadow-sm transition-transform duration-300 hover:scale-110" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-4 h-4 rounded bg-[#7209B7] shadow-sm transition-transform duration-300 hover:scale-110" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-4 h-4 rounded bg-[#F72585] shadow-sm transition-transform duration-300 hover:scale-110" />
        </div>
      )
    },
    {
      title: "Fast",
      desc: "Generate instantly in client memory.",
      icon: Zap,
      demo: (
        <div className="flex items-center justify-between px-3 h-10 w-full mt-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 font-mono text-[9px] font-bold">
          <span className="text-emerald-500 uppercase">Calculated</span>
          <span className="bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20">0.1ms</span>
        </div>
      )
    },
    {
      title: "Private",
      desc: "Everything runs in your browser.",
      icon: ShieldCheck,
      demo: (
        <div className="flex items-center gap-2 justify-center h-10 w-full mt-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-[9px] font-black uppercase text-emerald-500 tracking-wider">
          <Lock className="w-3 h-3 text-emerald-500 animate-pulse" /> Client Only
        </div>
      )
    },
    {
      title: "Accessible",
      desc: "Create usable color systems.",
      icon: Accessibility,
      demo: (
        <div className="flex gap-2 justify-center items-center h-10 w-full mt-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-[9px] font-bold">
          <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">AA ✓</span>
          <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">AAA ✓</span>
        </div>
      )
    }
  ];

  const resourceCategories = [
    {
      title: "Accessibility",
      desc: "WCAG contrast standards & ADA web standards.",
      color: "from-blue-500 to-indigo-500",
      count: "4 Guides",
      href: "/guides/wcag-contrast-standards",
      demo: (
        <div className="flex gap-1.5 items-center bg-white/40 dark:bg-slate-900/40 p-2 rounded-xl border border-white/20">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">7.2:1 Contrast</span>
          <span className="text-[9px] opacity-60">WCAG AA ✓</span>
        </div>
      )
    },
    {
      title: "Palette Tutorials",
      desc: "Harmonious balancing, monochromatic, & analogous configurations.",
      color: "from-indigo-500 to-violet-500",
      count: "3 Tutorials",
      href: "/guides/color-theory-basics",
      demo: (
        <div className="flex justify-center gap-1">
          <span className="w-3.5 h-3.5 rounded-full bg-[#4361EE] border border-white" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#7209B7] border border-white" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#F72585] border border-white" />
        </div>
      )
    },
    {
      title: "Gradient Guides",
      desc: "Mastering smooth multi-stop linear transitions.",
      color: "from-pink-500 to-rose-500",
      count: "2 Guides",
      href: "/guides/color-theory-basics",
      demo: (
        <div className="h-4 w-full rounded-md bg-gradient-to-r from-[#FF006E] to-[#8338EC]" />
      )
    },
    {
      title: "Color Theory",
      desc: "Values, chroma, warm & cool spectrums.",
      color: "from-rose-500 to-orange-500",
      count: "5 Articles",
      href: "/guides/color-theory-basics",
      demo: (
        <div className="flex items-center justify-between text-[9px] font-mono opacity-60">
          <span>Warm (Amber)</span>
          <span>⇄</span>
          <span>Cool (Teal)</span>
        </div>
      )
    },
    {
      title: "Design Systems",
      desc: "Global semantic variable tokens & dark-mode systems.",
      color: "from-teal-500 to-emerald-500",
      count: "4 Guides",
      href: "/guides/wcag-contrast-standards",
      demo: (
        <div className="grid grid-cols-3 gap-1">
          <span className="h-3 rounded bg-emerald-500/25 border border-emerald-500/20 animate-pulse" />
          <span className="h-3 rounded bg-emerald-500/50 border border-emerald-500/20" />
          <span className="h-3 rounded bg-emerald-500 border border-white/20" />
        </div>
      )
    },
    {
      title: "Tailwind Colors",
      desc: "Setting up theme extensions & shades configuration object.",
      color: "from-sky-500 to-blue-500",
      count: "3 Guides",
      href: "/tools/tailwind-color-reference",
      demo: (
        <div className="font-mono text-[9px] text-sky-500 bg-sky-500/5 px-2 py-1 rounded border border-sky-500/10">
          colors: &#123; brand: &#123; 500: ... &#125; &#125;
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative text-slate-800 dark:text-slate-100 font-sans">
      
      {/* Global Background — animated multi-hue color zones */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]" aria-hidden="true">
        {/* Hero zone blob: indigo/violet */}
        <div className="blob blob-1 w-[600px] h-[600px] bg-[#4361EE] top-[-10%] left-[-10%]" />
        {/* Tools zone blob: rose/pink — mid-page energy */}
        <div className="blob blob-2 w-[500px] h-[500px] bg-[#F72585] top-[30%] right-[-8%]" />
        {/* Accessibility/Why zone blob: teal/emerald */}
        <div className="blob blob-3 w-[550px] h-[550px] bg-[#10B981] bottom-[5%] left-[-5%]" />
        {/* Warm amber tone center */}
        <div className="blob blob-2 w-[400px] h-[400px] bg-[#F59E0B] top-[55%] left-[40%] opacity-10" />
        <div className="grid-bg" />
        <div className="noise" />
      </div>

      <Header />

      <main className="w-full max-w-7xl px-2 sm:px-3 md:px-4 flex-grow space-y-16 lg:space-y-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[calc(100vh-4rem)] py-8 lg:py-0 relative">
          

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 shadow-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Visual Color Workflows
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-[1.05] font-sans">
              Create Better Color Systems Faster
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
              Generate palettes, build gradients, check accessibility scores, and export CSS variables or Tailwind configs — all in your browser, all in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="#tools"
                className="px-6 py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-2xl font-black text-xs tracking-widest uppercase hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                Explore Tools <ArrowRight className="w-4 h-4" />
              </a>
              <Link 
                href="/tools/palette-generator"
                className="px-6 py-3.5 bg-white dark:bg-slate-900 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-emerald-500/10 transition-all flex items-center justify-center"
              >
                Try Color Generator
              </Link>
            </div>

            {/* TRUST ROW */}
            <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Browser Based</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Zero installs required</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Fast Processing</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Generates instantly</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Accessibility Focused</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">WCAG 2.1 compliance</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0">✓</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Export Ready</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Tailwind & CSS setup</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* HERO VISUAL (COLOR WORKFLOW DEMO - WITH AUTOMATIC MORPH ROTATION) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-6 relative w-full"
          >
            {/* Live palette color strip — shows color identity immediately */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.85 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex h-2 w-full rounded-t-2xl overflow-hidden mb-[-2px] relative z-10"
            >
              {activePreset.palette.map((color, i) => (
                <div
                  key={color}
                  className="flex-1 transition-colors duration-[1200ms] ease-in-out"
                  style={{ backgroundColor: color }}
                />
              ))}
            </motion.div>
            <GlassCard
              className="relative overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-[1200ms] ease-in-out"
              style={{
                backgroundColor: `${activePreset.hex}18`,
                borderColor: `${activePreset.hex}30`,
                boxShadow: `0 30px 60px ${activePreset.hex}15, inset 0 0 60px ${activePreset.hex}08`
              }}
            >
              
              {/* Card header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs font-black uppercase tracking-widest opacity-60">Interactive Workflow Demo</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/60 animate-pulse" />
                </div>
              </div>

              {/* Workflow Flow Steps */}
              <div className="space-y-5 pt-4 font-sans">
                
                {/* STEP 1: Choose Brand Color */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                      01. Pick Brand Color 
                      {isAutoPlaying && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
                    </span>
                    <span className="text-[10px] opacity-40 font-mono">Input Hex</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.hex}
                        onClick={() => {
                          setActivePreset(preset);
                          setIsAutoPlaying(false); // Pause auto-play when user manually overrides
                        }}
                        className={cn(
                          "w-9 h-9 rounded-full border-2 transition-all duration-300 cursor-pointer relative flex items-center justify-center hover:scale-105 active:scale-95",
                          activePreset.hex === preset.hex 
                            ? "border-emerald-600 dark:border-white scale-110 shadow-lg" 
                            : "border-transparent"
                        )}
                        style={{ backgroundColor: preset.hex }}
                        title={preset.name}
                      >
                        {activePreset.hex === preset.hex && (
                          <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
                        )}
                      </button>
                    ))}
                    <div className="h-9 px-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 flex items-center gap-2 font-mono text-[11px] font-semibold shadow-sm ml-auto transition-all duration-500">
                      <span className="w-2.5 h-2.5 rounded-full transition-colors duration-500" style={{ backgroundColor: activePreset.hex }} />
                      {activePreset.hex.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* STEP 2: Generate Palette & Gradient Preview */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">02. Generate Palette & Gradient</span>
                    <span className="text-[10px] opacity-40 uppercase font-mono">Balanced Shades</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <AnimatePresence mode="popLayout">
                      {activePreset.palette.map((color, idx) => (
                        <motion.div
                          key={color}
                          initial={{ opacity: 0, scaleY: 0.7 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0.7 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="h-14 rounded-xl flex flex-col items-center justify-end p-2 relative shadow-sm border border-black/5"
                          style={{ backgroundColor: color }}
                        >
                          <span className="text-[8px] font-mono font-bold bg-white/95 dark:bg-slate-950/95 text-slate-800 dark:text-slate-100 px-1 rounded shadow-sm scale-90 md:scale-100">
                            {color.toUpperCase()}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {/* Dynamic gradient preview — continuously animated */}
                  <div className="pt-1.5">
                    <div className="text-[9px] opacity-40 uppercase font-mono mb-1">Gradient Preview</div>
                    <div 
                      className="h-7 w-full rounded-xl border border-black/5 shadow-inner gradient-slide"
                      style={{ 
                        background: `linear-gradient(90deg, ${activePreset.palette[0]}, ${activePreset.hex}, ${activePreset.palette[4]}, ${activePreset.hex}, ${activePreset.palette[0]})`
                      }}
                    />
                  </div>
                </div>

                {/* STEP 3: Accessibility Visibility */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">03. Check Accessibility</span>
                    <span className="text-[10px] opacity-40 uppercase font-mono">WCAG 2.1</span>
                  </div>
                  
                  {/* Accessibility display integration */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-black uppercase text-center">
                    <span className="inline-flex items-center justify-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1.5 rounded-xl border border-emerald-500/20 shadow-sm transition-all duration-300">
                      ✓ WCAG AA
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1.5 rounded-xl border border-emerald-500/20 shadow-sm transition-all duration-300">
                      ✓ Accessible Text
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1.5 rounded-xl border border-emerald-500/20 shadow-sm font-mono transition-all duration-500">
                      {activePreset.contrastBlack === "Fail" ? "7.2:1" : activePreset.contrastBlack} Contrast
                    </span>
                    <span className="inline-flex items-center justify-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1.5 rounded-xl border border-emerald-500/20 shadow-sm transition-all duration-300">
                      Readable Background
                    </span>
                  </div>

                  {/* Accessible Demonstration Text */}
                  <div 
                    className="p-2.5 rounded-xl text-center text-xs font-bold shadow-inner border border-black/5 transition-all duration-500"
                    style={{ 
                      backgroundColor: activePreset.hex,
                      color: activePreset.contrastWhitePass !== "Fail" ? "#ffffff" : "#000000"
                    }}
                  >
                    Readable Sample Content (Accessible Contrast Demo)
                  </div>
                </div>

                {/* STEP 4: Export Preview */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">04. CSS & Tailwind Code Previews</span>
                    <div className="flex gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-0.5 rounded-lg text-[10px] font-black tracking-widest uppercase">
                      <button 
                        onClick={() => setExportFormat("css")}
                        className={cn("px-2 py-1 rounded-md cursor-pointer transition-colors", exportFormat === "css" ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-black" : "opacity-40 font-bold")}
                      >
                        CSS Vars
                      </button>
                      <button 
                        onClick={() => setExportFormat("tailwind")}
                        className={cn("px-2 py-1 rounded-md cursor-pointer transition-colors", exportFormat === "tailwind" ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-black" : "opacity-40 font-bold")}
                      >
                        Tailwind Config
                      </button>
                    </div>
                  </div>

                  <div className="relative rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-900 text-slate-100 p-3 font-mono text-[9px] md:text-xs overflow-x-auto shadow-inner h-28 leading-relaxed">
                    <pre className="transition-all duration-500">{exportFormat === "css" ? activePreset.cssVars : activePreset.tailwind}</pre>
                    <button 
                      onClick={handleCopy}
                      className="absolute right-2.5 top-2.5 p-1.5 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 active:scale-95 text-emerald-400 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-sans font-bold text-[9px] uppercase tracking-widest"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy Token
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </GlassCard>
          </motion.div>
        </section>

        {/* SECTION: WHAT YOU CAN DO (TOOL PREVIEW CARDS) */}
        <section id="tools" className="space-y-8 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400 uppercase">
              Design & Workflow Tools
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
              Color Workspace Tools
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              Create and optimize complete brand colors, shades, accessibility tokens, and gradients instantly inside browser workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
              >
                <GlassCard 
                  hoverable
                  className="flex flex-col justify-between min-h-[280px] border border-white/25 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 rounded-2xl group/card overflow-hidden"
                >
                  {/* Color accent top bar */}
                  <div className={cn("h-[3px] w-full bg-gradient-to-r", item.color)} />

                  <div className="p-5 space-y-4 flex-grow">
                    <div className="flex items-center justify-between">
                      <div className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-tr text-white shadow-md transition-transform duration-500 group-hover/card:scale-110",
                        item.color
                      )}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[8px] font-mono bg-slate-100 dark:bg-slate-950 px-1.5 py-0.5 rounded border border-black/5 uppercase tracking-widest text-slate-400">
                        Live Preview
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white font-sans transition-colors duration-300 group-hover/card:text-emerald-500">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium font-sans">
                        {item.desc}
                      </p>
                    </div>

                    {/* VISUAL OUTPUTS FOR EACH CARD */}
                    <div className="pt-1">
                      
                      {/* Palette Generator: swatches expanding on hover */}
                      {item.type === "palette" && (
                        <div className="flex gap-2 w-full transition-all duration-300">
                          {item.preview.map((c) => (
                            <div 
                              key={c} 
                              className="h-10 flex-grow rounded-xl border border-black/5 shadow-sm transition-all duration-500 ease-out hover:flex-grow-[1.6] cursor-pointer flex items-center justify-center relative group/swatch" 
                              style={{ backgroundColor: c }}
                              title={c}
                            >
                              <span className="opacity-0 group-hover/swatch:opacity-100 absolute bg-slate-950 text-white text-[7px] font-mono px-1 rounded -top-5 z-10 transition-opacity whitespace-nowrap shadow-md border border-white/10">
                                {c}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Gradient Generator: continuously animated gradient bar */}
                      {item.type === "gradient" && (
                        <div className="space-y-1.5 w-full">
                          <div 
                            className="h-10 rounded-xl shadow-sm border border-black/5 flex items-center justify-between px-3 text-[9px] font-mono text-white font-black gradient-slide" 
                            style={{ background: `linear-gradient(90deg, ${item.preview.from}, ${item.preview.to}, ${item.preview.from}, ${item.preview.to})` }}
                          >
                            <span>{item.preview.from}</span>
                            <span>➔</span>
                            <span>{item.preview.to}</span>
                          </div>
                        </div>
                      )}

                      {/* Color Converter: hex/rgb/hsl output previews */}
                      {item.type === "converter" && (
                        <div className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 grid grid-cols-3 gap-2 font-mono text-[9px] text-center shadow-inner font-bold transition-all duration-500 group-hover/card:border-emerald-500/30 group-hover/card:bg-emerald-500/5">
                          <div className="transition-transform duration-300 group-hover/card:scale-105">
                            <div className="text-[7px] text-slate-400 uppercase tracking-widest mb-1">HEX</div>
                            <div className="flex items-center justify-center gap-1">
                              <span className="w-2 h-2 rounded-full border border-black/10" style={{ backgroundColor: item.preview.hex }} />
                              <span className="text-slate-900 dark:text-white font-black text-[8px]">{item.preview.hex}</span>
                            </div>
                          </div>
                          <div className="transition-transform duration-300 group-hover/card:scale-105">
                            <div className="text-[7px] text-slate-400 uppercase tracking-widest mb-1">RGB</div>
                            <div className="text-slate-500 dark:text-slate-300 font-black">{item.preview.rgb}</div>
                          </div>
                          <div className="transition-transform duration-300 group-hover/card:scale-105">
                            <div className="text-[7px] text-slate-400 uppercase tracking-widest mb-1">HSL</div>
                            <div className="text-slate-500 dark:text-slate-300 font-black">{item.preview.hsl}</div>
                          </div>
                        </div>
                      )}

                      {/* Contrast Checker: AA/AAA badges + large ratio */}
                      {item.type === "contrast" && (
                        <div className="grid grid-cols-3 gap-2 font-black uppercase text-center text-[9px] transition-transform duration-500 group-hover/card:scale-[1.02]">
                          <div className="rounded-xl p-2 border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-emerald-500/20">
                            <span className="text-[7px] text-slate-400 tracking-wider">LEVEL AA</span>
                            <span className="mt-0.5 text-[11px]">{item.preview.badge1}</span>
                          </div>
                          <div className="rounded-xl p-2 border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-emerald-500/20">
                            <span className="text-[7px] text-slate-400 tracking-wider">LEVEL AAA</span>
                            <span className="mt-0.5 text-[11px]">{item.preview.badge2}</span>
                          </div>
                          <div className="rounded-xl p-2 border border-slate-200/50 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:scale-105">
                            <span className="text-[7px] text-slate-400 tracking-wider">RATIO</span>
                            <span className="font-mono text-slate-900 dark:text-white mt-0.5 text-[11px]">{item.preview.ratio}</span>
                          </div>
                        </div>
                      )}

                      {/* Image Color Extractor: floating swatches over gradient */}
                      {item.type === "extractor" && (
                        <div className="h-10 w-full rounded-xl relative overflow-hidden border border-black/5 bg-gradient-to-r from-blue-300 via-purple-300 to-amber-200 flex items-center justify-center">
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center gap-1.5">
                            {item.preview.map((c, idx) => (
                              <motion.span 
                                key={idx} 
                                className="w-5 h-5 rounded-full border-2 border-white shadow-md cursor-pointer" 
                                style={{ backgroundColor: c }} 
                                whileHover={{ scale: 1.25 }}
                                animate={{ 
                                  x: [0, (idx % 2 === 0 ? 5 : -5), 0],
                                  y: [0, (idx % 2 === 0 ? -4 : 4), 0]
                                }}
                                transition={{ repeat: Infinity, duration: 3 + idx, ease: "easeInOut" }}
                                title={c}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tailwind Config Preview */}
                      {item.type === "tailwind" && (
                        <div className="flex gap-1 w-full transition-transform duration-500 group-hover/card:translate-x-0.5">
                          {item.preview.shades.map((s, idx) => (
                            <div 
                              key={idx} 
                              className="h-9 flex-1 rounded-md shadow-sm border border-black/5 relative group/tw flex items-center justify-center transition-transform duration-300 hover:scale-110" 
                              style={{ backgroundColor: s }}
                            >
                              <span className="opacity-0 group-hover/tw:opacity-100 absolute bg-slate-950 text-white text-[7px] font-mono px-1 rounded -top-5 z-10 transition-opacity whitespace-nowrap shadow-md">
                                {idx * 200 + 100}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Shades preview */}
                      {item.type === "shades" && (
                        <div className="flex gap-1 w-full transition-transform duration-500 group-hover/card:scale-[1.01]">
                          {item.preview.steps.map((s, idx) => (
                            <div 
                              key={idx} 
                              className="h-9 flex-1 rounded-md border border-black/5 transition-transform duration-300 hover:scale-105" 
                              style={{ backgroundColor: s }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Color Blindness Simulator preview */}
                      {item.type === "blindness" && (
                        <div className="h-9 rounded-lg overflow-hidden flex shadow-sm border border-black/5 text-[8px] font-black text-white text-center font-mono transition-transform duration-500 group-hover/card:scale-[1.02]">
                          <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: item.preview.normal }}>Normal</div>
                          <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: item.preview.protan }}>Protan</div>
                          <div className="flex-1 flex items-center justify-center" style={{ backgroundColor: item.preview.deuteran }}>Deutan</div>
                        </div>
                      )}

                    </div>
                  </div>

                  <div className="px-5 pb-4 pt-3 flex items-center justify-between border-t border-slate-200/40 dark:border-slate-800/40">
                    <span className={cn("w-2 h-2 rounded-full bg-gradient-to-tr", item.color)} />
                    <Link 
                      href={item.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 transition-colors uppercase group/link cursor-pointer shadow-sm hover:shadow-md hover:scale-[1.02]"
                    >
                      {item.cta} <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION: WORKFLOW EXAMPLES */}
        <section id="workflows" className="space-y-8 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400 uppercase">
              Color Design Workflows
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
              How ColorCode Works
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              From brand color to production-ready tokens in four steps.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* WORKFLOW 1: Design System Workflow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <GlassCard className="p-6 border border-white/20 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 rounded-2xl flex flex-col items-center">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-500" /> Design Token Workflow
                </h3>

                <div className="flex flex-col items-center w-full space-y-4">
                  
                  {/* Step 1 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">1</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Choose Brand Color</div>
                      <div className="flex items-center gap-2 font-mono text-[10px] font-black text-slate-800 dark:text-white mt-0.5">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#6366f1] border border-black/5" />
                        <span>#6366F1</span>
                      </div>
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 2 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">2</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Generate Palette</div>
                      <div className="flex gap-1.5 mt-1">
                        <span className="h-4 flex-grow rounded-lg bg-[#ede9fe] transition-transform duration-300 hover:scale-105" />
                        <span className="h-4 flex-grow rounded-lg bg-[#ddd6fe] transition-transform duration-300 hover:scale-105" />
                        <span className="h-4 flex-grow rounded-lg bg-[#a78bfa] transition-transform duration-300 hover:scale-105" />
                        <span className="h-4 flex-grow rounded-lg bg-[#8b5cf6] transition-transform duration-300 hover:scale-105" />
                        <span className="h-4 flex-grow rounded-lg bg-[#6d28d9] transition-transform duration-300 hover:scale-105" />
                      </div>
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 3 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">3</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Accessibility Check</div>
                      <div className="flex gap-2 mt-1 font-mono text-[9px] font-bold">
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">✓ WCAG AA</span>
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">7.2:1 Contrast</span>
                      </div>
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 4 */}
                  <div className="w-full flex items-center gap-4 bg-slate-900 text-slate-300 p-3 rounded-2xl border border-slate-800 shadow-lg">
                    <span className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs">4</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Export Variables</div>
                      <pre className="text-[9px] font-mono mt-0.5 text-emerald-400">--brand-500: #6366F1;</pre>
                    </div>
                  </div>

                </div>
              </GlassCard>
            </motion.div>

            {/* WORKFLOW 2: CSS Gradient Styling Workflow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <GlassCard className="p-6 border border-white/20 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 rounded-2xl flex flex-col items-center">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-500" /> CSS Gradient Workflow
                </h3>

                <div className="flex flex-col items-center w-full space-y-4">
                  
                  {/* Step 1 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">1</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Create Gradient</div>
                      <div className="flex items-center gap-2 font-mono text-[9px] text-slate-500 dark:text-slate-300 mt-0.5">
                        <span>#FF006E</span>
                        <span>➔</span>
                        <span>#8338EC</span>
                      </div>
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 2 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">2</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Gradient Preview</div>
                      <div className="h-4 w-full rounded-md mt-1 border border-black/5 transition-all duration-[2000ms] ease-in-out bg-[length:200%_auto] hover:bg-[right_center]" style={{ background: "linear-gradient(90deg, #FF006E, #8338EC, #FF006E)" }} />
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 3 */}
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">3</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Copy CSS</div>
                      <div className="inline-flex gap-1.5 items-center px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-bold mt-1 transition-all duration-300 hover:bg-emerald-500/20">
                        background: linear-gradient(...)
                      </div>
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 4 */}
                  <div className="w-full flex items-center gap-4 bg-slate-900 text-slate-300 p-3 rounded-2xl border border-slate-800 shadow-lg">
                    <span className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs">4</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Use Anywhere</div>
                      <pre className="text-[9px] font-mono mt-0.5 text-emerald-400">&lt;div class=&quot;bg-grad&quot;&gt;</pre>
                    </div>
                  </div>

                </div>
              </GlassCard>
            </motion.div>

            {/* WORKFLOW 3: Accessibility Workflow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <GlassCard className="p-6 border border-white/20 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 rounded-2xl flex flex-col items-center">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-500" /> Accessibility Workflow
                </h3>

                <div className="flex flex-col items-center w-full space-y-4">

                  {/* Step 1 */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">1</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Pick Color Pair</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-3 h-3 rounded-full bg-[#1e1b4b] border border-black/10" />
                        <span className="w-3 h-3 rounded-full bg-[#e0e7ff] border border-black/10" />
                        <span className="font-mono text-[9px] text-slate-500 dark:text-slate-400">#1E1B4B / #E0E7FF</span>
                      </div>
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 2 */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">2</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Contrast Score</div>
                      <div className="flex gap-2 mt-1 font-mono text-[9px] font-bold">
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">12.6:1 Ratio</span>
                        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">✓ AAA</span>
                      </div>
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 3 */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="w-full flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-3 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">3</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Readable Preview</div>
                      <div
                        className="mt-1 px-2 py-1 rounded-lg text-[9px] font-bold text-center"
                        style={{ backgroundColor: "#1e1b4b", color: "#e0e7ff" }}
                      >
                        Sample Heading Text — Accessible
                      </div>
                    </div>
                  </motion.div>

                  <ArrowDown className="w-4 h-4 text-emerald-500/60 animate-bounce" />

                  {/* Step 4 */}
                  <div className="w-full flex items-center gap-4 bg-slate-900 text-slate-300 p-3 rounded-2xl border border-slate-800 shadow-lg">
                    <span className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs">4</span>
                    <div className="flex-grow">
                      <div className="text-[9px] opacity-40 uppercase font-mono">Export & Use</div>
                      <pre className="text-[9px] font-mono mt-0.5 text-emerald-400">--text-on-dark: #E0E7FF;</pre>
                    </div>
                  </div>

                </div>
              </GlassCard>
            </motion.div>

          </div>
        </section>

        {/* SECTION: WHY USE COLORCODE */}
        <section id="whyuse" className="space-y-8 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400 uppercase">
              Built For Design Workflows
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
              Why Use ColorCode
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              All processing happens in your browser. No uploads, no tracking, no waiting.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUseColorCode.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <GlassCard 
                  className="text-left flex flex-col justify-between min-h-[220px] border border-white/20 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 p-5 rounded-2xl group/why"
                >
                  <div className="space-y-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center transition-transform duration-300 group-hover/why:scale-110">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white transition-colors duration-300 group-hover/why:text-emerald-500">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Show color examples in Why Use cards */}
                  <div className="pt-2">
                    {item.demo}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION: RESOURCES (EXPANDED VISUAL EDUCATION CARDS) */}
        <section id="resources" className="space-y-8 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3 text-left max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400 uppercase">
                Learn While Building
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
                Educational Resources
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
                Deepen your knowledge of color theory, WCAG standards, and UI design token structures.
              </p>
            </div>
            <Link 
              href="/guides/wcag-contrast-standards" 
              className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase hover:underline shrink-0 animate-pulse"
            >
              Browse Guides <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourceCategories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <GlassCard 
                  hoverable
                  className="flex flex-col justify-between min-h-[220px] border border-white/20 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 rounded-2xl group/resource overflow-hidden"
                >
                  {/* Gradient accent top bar matching category color */}
                  <div className={cn("h-[3px] w-full bg-gradient-to-r", cat.color)} />
                  <div className="p-5 flex flex-col flex-grow justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 border border-black/5 transition-colors duration-300 group-hover/resource:bg-emerald-500/10 group-hover/resource:text-emerald-500">
                        {cat.count}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 animate-ping" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-sm font-extrabold uppercase tracking-tight text-slate-900 dark:text-white transition-colors duration-300 group-hover/resource:text-emerald-500">
                        {cat.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  {/* Render the visual demo for each resource card */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-900 mt-3 space-y-2.5">
                    <div className="transition-transform duration-500 group-hover/resource:scale-[1.01]">
                      {cat.demo}
                    </div>
                    <div className="flex justify-end">
                      <Link 
                        href={cat.href}
                        className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 uppercase group/arrow"
                      >
                        Learn More <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/arrow:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION: NEWSLETTER */}
        <section id="newsletter" className="pt-8 border-t border-slate-200/30 dark:border-slate-800/30 pb-6">
          <div className="relative rounded-[2rem] border border-white/20 dark:border-white/5 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-transparent p-6 md:p-10 text-center overflow-hidden shadow-sm">
            <div className="max-w-2xl mx-auto space-y-4">
              
              {/* Decorative palette row */}
              <div className="flex justify-center gap-1.5 mb-2">
                {["#4361EE", "#7209B7", "#F72585", "#4CC9F0", "#10B981"].map((c, i) => (
                  <motion.div
                    key={c}
                    className="w-6 h-6 rounded-full border-2 border-white/30 shadow-md"
                    style={{ backgroundColor: c }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.2, ease: "easeInOut" }}
                  />
                ))}
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  Get Color Tips & Tool Updates
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
                  Receive new tools, design guides, and workflow tips directly in your inbox.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-1.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-grow text-xs bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
