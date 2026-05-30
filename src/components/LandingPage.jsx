"use client";

import { useState } from "react";
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
  Sparkles
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
  const [activePreset, setActivePreset] = useState(COLOR_PRESETS[0]);
  const [exportFormat, setExportFormat] = useState("css"); // css or tailwind
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = exportFormat === "css" ? activePreset.cssVars : activePreset.tailwind;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatYouCanDo = [
    {
      title: "Generate Color Palettes",
      desc: "Create balanced palettes quickly.",
      icon: Palette,
      href: "/tools/palette-generator",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Build Gradients",
      desc: "Create and export gradients.",
      icon: Zap,
      href: "/tools/gradient-generator",
      color: "from-blue-500 to-emerald-500",
    },
    {
      title: "Accessibility Testing",
      desc: "Check contrast and readability.",
      icon: Eye,
      href: "/tools/contrast-checker",
      color: "from-emerald-500 to-purple-500",
    },
    {
      title: "Convert Formats",
      desc: "HEX, RGB, HSL and more.",
      icon: RotateCcw,
      href: "/tools/color-converter-details",
      color: "from-teal-500 to-emerald-500",
    },
    {
      title: "Extract Colors",
      desc: "Generate palettes from images.",
      icon: Camera,
      href: "/tools/color-extractor",
      color: "from-emerald-500 to-amber-500",
    },
    {
      title: "Export Anywhere",
      desc: "Use colors in Tailwind, CSS, design systems.",
      icon: Box,
      href: "/tools/tailwind-color-reference",
      color: "from-amber-500 to-emerald-500",
    }
  ];

  const whyUseColorCode = [
    {
      title: "Visual First",
      desc: "Built around real design workflows.",
      icon: Layout,
    },
    {
      title: "Fast",
      desc: "Generate results instantly.",
      icon: Zap,
    },
    {
      title: "Private",
      desc: "Runs inside your browser.",
      icon: ShieldCheck,
    },
    {
      title: "Accessible",
      desc: "Create color systems that work.",
      icon: Accessibility,
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center relative text-slate-800 dark:text-slate-100">
      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_-20%,#10b981,transparent_50%),radial-gradient(circle_at_0%_100%,#059669,transparent_50%),radial-gradient(circle_at_100%_100%,#34d399,transparent_50%)]" />
        <div className="grid-bg" />
        <div className="blob blob-1 w-[800px] h-[800px] top-[-20%] left-[-10%] bg-emerald-600/5" />
        <div className="blob blob-2 w-[600px] h-[600px] bottom-[-10%] right-[-10%] bg-teal-600/5" />
        <div className="blob blob-3 w-[400px] h-[400px] top-[30%] left-[60%] bg-green-600/5" />
        <div className="noise" />
      </div>

      <Header />

      <main className="w-full max-w-7xl px-2 sm:px-3 md:px-4 flex-grow space-y-16 lg:space-y-20">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[calc(100vh-4rem)] py-8 lg:py-0">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 shadow-sm uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Built for modern design workflows
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase leading-[1.05] font-sans">
              Professional Color Tools For Designers & Developers
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-medium">
              Generate palettes, gradients, accessibility reports, conversions, and color systems faster.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href="#tools"
                className="px-6 py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-2xl font-black text-xs tracking-widest uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Browser Based
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Fast Processing
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Accessibility Focused
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  Export Ready
                </div>
              </div>
            </div>
          </div>

          {/* HERO VISUAL (COLOR WORKFLOW DEMO) */}
          <div className="lg:col-span-6 relative w-full">
            <GlassCard className="relative overflow-hidden border border-white/20 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.08)] bg-white/40 dark:bg-slate-950/40">
              
              {/* Card header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/50 dark:border-slate-800/50">
                <span className="text-xs font-black uppercase tracking-widest opacity-60">Interactive Workflow Demo</span>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                </div>
              </div>

              {/* Workflow Flow Steps */}
              <div className="space-y-5 pt-4 font-sans">
                
                {/* STEP 1: Choose Brand Color */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">01. Pick Brand Color</span>
                    <span className="text-[10px] opacity-40 font-mono">Input Hex</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.hex}
                        onClick={() => setActivePreset(preset)}
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
                    <div className="h-9 px-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 flex items-center gap-2 font-mono text-[11px] font-semibold shadow-sm ml-auto">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activePreset.hex }} />
                      {activePreset.hex.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* STEP 2: Generate Palette */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">02. Generate Palette</span>
                    <span className="text-[10px] opacity-40 uppercase font-mono">Analogous & Shades</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    <AnimatePresence mode="popLayout">
                      {activePreset.palette.map((color, idx) => (
                        <motion.div
                          key={color}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                          className="h-12 rounded-xl flex flex-col items-center justify-end p-2 relative shadow-sm border border-black/5"
                          style={{ backgroundColor: color }}
                        >
                          <span className="text-[8px] font-mono font-bold bg-white/95 dark:bg-slate-950/95 text-slate-800 dark:text-slate-100 px-1 rounded shadow-sm scale-90 md:scale-100">
                            {color.toUpperCase()}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* STEP 3: Check Accessibility */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">03. Contrast (A11y)</span>
                    <span className="text-[10px] opacity-40 uppercase font-mono">WCAG 2.1 Compliance</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Against White */}
                    <div className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 flex items-center justify-between shadow-sm">
                      <div className="space-y-0.5">
                        <p className="text-[9px] opacity-50 font-bold uppercase tracking-wider">Against White</p>
                        <p className="text-xs font-black font-mono">{activePreset.contrastWhite}</p>
                      </div>
                      <span className={cn(
                        "text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border",
                        activePreset.contrastWhite === "Fail" 
                          ? "bg-red-500/10 border-red-500/20 text-red-500" 
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                      )}>
                        {activePreset.contrastWhitePass}
                      </span>
                    </div>

                    {/* Against Black */}
                    <div className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 flex items-center justify-between shadow-sm">
                      <div className="space-y-0.5">
                        <p className="text-[9px] opacity-50 font-bold uppercase tracking-wider">Against Black</p>
                        <p className="text-xs font-black font-mono">{activePreset.contrastBlack}</p>
                      </div>
                      <span className={cn(
                        "text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full border",
                        activePreset.contrastBlackPass === "Fail"
                          ? "bg-red-500/10 border-red-500/20 text-red-500"
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                      )}>
                        {activePreset.contrastBlackPass}
                      </span>
                    </div>
                  </div>
                </div>

                {/* STEP 4: Export Preview */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">04. Export Ready</span>
                    <div className="flex gap-2 bg-slate-200/50 dark:bg-slate-800/50 p-0.5 rounded-lg text-[10px] font-black tracking-widest uppercase">
                      <button 
                        onClick={() => setExportFormat("css")}
                        className={cn("px-2 py-1 rounded-md cursor-pointer transition-colors", exportFormat === "css" ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-black" : "opacity-40 font-bold")}
                      >
                        CSS
                      </button>
                      <button 
                        onClick={() => setExportFormat("tailwind")}
                        className={cn("px-2 py-1 rounded-md cursor-pointer transition-colors", exportFormat === "tailwind" ? "bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm font-black" : "opacity-40 font-bold")}
                      >
                        Tailwind
                      </button>
                    </div>
                  </div>

                  <div className="relative rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-900 text-slate-100 p-3 font-mono text-[9px] md:text-xs overflow-x-auto shadow-inner h-28 leading-relaxed">
                    <pre>{exportFormat === "css" ? activePreset.cssVars : activePreset.tailwind}</pre>
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
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </GlassCard>
          </div>
        </section>

        {/* SECTION: WHAT YOU CAN DO */}
        <section id="tools" className="space-y-8 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400 uppercase">
              Design Toolkit
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
              What You Can Do
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              Create balanced visual systems with client-side utility calculators built around real-world design requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whatYouCanDo.map((item, idx) => (
              <GlassCard 
                key={item.title}
                hoverable
                className="flex flex-col justify-between h-56 border border-white/25 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 hover:scale-[1.01] transition-all p-5"
              >
                <div className="space-y-3">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-tr text-white shadow-md",
                    item.color
                  )}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-black uppercase tracking-tight text-slate-900 dark:text-white font-sans">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-200/40 dark:border-slate-800/40">
                  <span className="text-[9px] font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">Web Tool</span>
                  <Link 
                    href={item.href}
                    className="inline-flex items-center gap-1 text-xs font-black tracking-widest text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 transition-colors uppercase group/link"
                  >
                    Launch Tool <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* SECTION: WHY USE COLORCODE */}
        <section className="space-y-8 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-indigo-900/50 dark:bg-emerald-950/30 dark:text-emerald-400 uppercase">
              Engineered Differently
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
              Why Use ColorCode
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              We skip the cloud processing, the complex dashboard configurations, and focus entirely on high-performance design workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUseColorCode.map((item) => (
              <GlassCard 
                key={item.title}
                className="text-left space-y-3 border border-white/20 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 p-5 rounded-2xl"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center">
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* SECTION: WORKFLOW EXAMPLES */}
        <section className="space-y-8 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400 uppercase">
              Production Workflows
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
              Workflow Examples
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
              See how ColorCode transforms arbitrary inputs into complete, production-ready color systems in seconds.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Visual connected flowchart */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-3 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 bg-white/20 dark:bg-slate-950/20 backdrop-blur-3xl overflow-hidden shadow-sm">
              
              {/* Workflow Flow Item 1 */}
              <div className="flex-1 w-full flex flex-col items-center text-center space-y-2 z-10">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center">1</span>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-white">Pick Brand Color</h4>
                <div className="w-full max-w-[140px] p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 text-center shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-[#6366f1] mx-auto mb-1.5 border shadow-sm" />
                  <span className="font-mono text-[10px] font-bold">#6366F1</span>
                </div>
              </div>

              {/* Divider Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center opacity-40 shrink-0 mx-1">
                <ArrowRight className="w-5 h-5 text-emerald-500 animate-pulse" />
              </div>

              {/* Workflow Flow Item 2 */}
              <div className="flex-1 w-full flex flex-col items-center text-center space-y-2 z-10">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center">2</span>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-white">Generate Palette</h4>
                <div className="w-full max-w-[140px] p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                  <div className="flex gap-1 justify-center mb-1.5">
                    <span className="w-2.5 h-5 rounded bg-[#e0e7ff] border border-black/5" />
                    <span className="w-2.5 h-5 rounded bg-[#c7d2fe] border border-black/5" />
                    <span className="w-2.5 h-5 rounded bg-[#818cf8] border border-black/5" />
                    <span className="w-2.5 h-5 rounded bg-[#6366f1] border border-black/5" />
                    <span className="w-2.5 h-5 rounded bg-[#4338ca] border border-black/5" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">5 Swatches</span>
                </div>
              </div>

              {/* Divider Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center opacity-40 shrink-0 mx-1">
                <ArrowRight className="w-5 h-5 text-emerald-500 animate-pulse" />
              </div>

              {/* Workflow Flow Item 3 */}
              <div className="flex-1 w-full flex flex-col items-center text-center space-y-2 z-10">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center">3</span>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-white">Accessibility Score</h4>
                <div className="w-full max-w-[140px] p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col items-center justify-center space-y-0.5">
                  <span className="text-xs font-black text-emerald-500 font-mono">4.8:1</span>
                  <span className="text-[7px] font-black uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">AA PASS</span>
                </div>
              </div>

              {/* Divider Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center opacity-40 shrink-0 mx-1">
                <ArrowRight className="w-5 h-5 text-emerald-500 animate-pulse" />
              </div>

              {/* Workflow Flow Item 4 */}
              <div className="flex-1 w-full flex flex-col items-center text-center space-y-2 z-10">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center">4</span>
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-white">Export CSS/Tailwind</h4>
                <div className="w-full max-w-[140px] p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 text-slate-100 shadow-sm flex flex-col justify-center text-left font-mono text-[7px] overflow-hidden leading-tight h-[44px] relative">
                  <div>:root &#123;</div>
                  <div className="pl-2">--brand: #6366f1;</div>
                  <div>&#125;</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION: RESOURCES */}
        <section className="space-y-8 pt-8 border-t border-slate-200/30 dark:border-slate-800/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3 text-left max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-purple-900/50 dark:bg-emerald-950/30 dark:text-emerald-400 uppercase">
                Learn While Building
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase text-slate-900 dark:text-white">
                Resources & Guides
              </h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-medium">
                Deepen your knowledge of color theory, WCAG standards, and UI design token structures.
              </p>
            </div>
            <Link 
              href="/guides/wcag-contrast-standards" 
              className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 uppercase hover:underline shrink-0 animate-pulse"
            >
              Browse All Guides <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Guide Card 1 */}
            <GlassCard className="flex flex-col md:flex-row gap-5 p-6 border border-white/20 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="space-y-3 flex-grow">
                <div className="space-y-1">
                  <span className="text-[9px] font-black tracking-widest uppercase opacity-40">Accessibility Guide</span>
                  <h3 className="text-lg font-extrabold uppercase tracking-tight text-slate-900 dark:text-white">
                    WCAG 2.1 Color Contrast Standards
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Learn how contrast ratios are calculated and how to meet ADA, Section 508, and Level AA/AAA requirements.
                  </p>
                </div>
                <Link 
                  href="/guides/wcag-contrast-standards"
                  className="inline-flex items-center gap-1 text-xs font-black tracking-widest text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 uppercase"
                >
                  Read Article →
                </Link>
              </div>
            </GlassCard>

            {/* Guide Card 2 */}
            <GlassCard className="flex flex-col md:flex-row gap-5 p-6 border border-white/20 dark:border-white/5 bg-white/20 dark:bg-slate-950/20 rounded-2xl hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div className="space-y-3 flex-grow">
                <div className="space-y-1">
                  <span className="text-[9px] font-black tracking-widest uppercase opacity-40">Palette Tutorial</span>
                  <h3 className="text-lg font-extrabold uppercase tracking-tight text-slate-900 dark:text-white">
                    Color Theory & Harmonies for UI
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    An introduction to monochromatic, triadic, and analogous harmonies, and how to balance design system tokens.
                  </p>
                </div>
                <Link 
                  href="/guides/color-theory-basics"
                  className="inline-flex items-center gap-1 text-xs font-black tracking-widest text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-200 uppercase"
                >
                  Read Article →
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* SECTION: NEWSLETTER */}
        <section className="pt-8 border-t border-slate-200/30 dark:border-slate-800/30 pb-6">
          <div className="relative rounded-[2rem] border border-white/20 dark:border-white/5 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-transparent p-6 md:p-10 text-center overflow-hidden shadow-sm">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <Mail className="w-5 h-5" />
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
                  placeholder="designer@domain.com"
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
