"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "./Header";
import Footer from "./Footer";
import { HtmlColorPicker } from "./HtmlColorPicker";
import { 
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock
} from "lucide-react";
import Link from "next/link";
import { ToolSeoContent } from "./seo/ToolSeoContent";

const GradientGenerator = dynamic(() => import("./tools/GradientGenerator").then(mod => mod.GradientGenerator), { ssr: false });
const PaletteGenerator = dynamic(() => import("./tools/PaletteGenerator").then(mod => mod.PaletteGenerator), { ssr: false });
const TailwindReference = dynamic(() => import("./tools/TailwindReference").then(mod => mod.TailwindReference), { ssr: false });
const ImageExtractor = dynamic(() => import("./tools/ImageExtractor").then(mod => mod.ImageExtractor), { ssr: false });
const ContrastChecker = dynamic(() => import("./tools/ContrastChecker").then(mod => mod.ContrastChecker), { ssr: false });
const ColorDetails = dynamic(() => import("./tools/ColorDetails").then(mod => mod.ColorDetails), { ssr: false });
const ShadesTints = dynamic(() => import("./tools/ShadesTints").then(mod => mod.ShadesTints), { ssr: false });
const BlindnessSim = dynamic(() => import("./tools/BlindnessSim").then(mod => mod.BlindnessSim), { ssr: false });

const TOOL_META = {
  picker: { 
    title: "HTML Color Codes & Picker", 
    desc: "Generate hex, RGB, HSL, and OKLCH color codes with live harmonic palettes, contrast check, and CSS export." 
  },
  gradient: { 
    title: "CSS Gradient Generator", 
    desc: "Create smooth multi-stop linear and radial gradients with custom angles and instant CSS code export." 
  },
  palette: { 
    title: "Harmonic Palette Generator", 
    desc: "Build harmonious color palettes using complementary, analogous, triadic, and monochromatic rules." 
  },
  contrast: { 
    title: "WCAG Contrast Checker", 
    desc: "Verify text and background combinations against official WCAG 2.1 AA and AAA legibility standards." 
  },
  extractor: { 
    title: "Image Color Extractor", 
    desc: "Extract dominant color palettes and exact hex codes directly from any photo inside your browser sandbox." 
  },
  shades: { 
    title: "Color Chart: Shades & Tints", 
    desc: "Generate 10-step lighter tints and darker shades for any base color with instant copy-to-clipboard." 
  },
  tailwind: { 
    title: "Tailwind CSS Color Reference", 
    desc: "Complete visual reference for all default Tailwind CSS color swatches and hex configurations." 
  },
  blindness: { 
    title: "Color Blindness Simulator", 
    desc: "Simulate 8 color vision deficiency modes to design accessible, inclusive web interfaces." 
  },
};

export function ColorBeastTool({ initialTool = "picker" }) {
  const currentMeta = TOOL_META[initialTool] || TOOL_META.picker;

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-gray-900">
      {/* Single Unified Header with Icons & Green Highlights */}
      <Header />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-12 flex-grow space-y-10">
        
        {/* Dynamic Tool Content without any double menu! */}
        {initialTool === "picker" && <HtmlColorPicker />}

        {initialTool !== "picker" && (
          <div className="space-y-6">
            <div className="text-left space-y-1">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Design Tool
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                {currentMeta.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
                {currentMeta.desc}
              </p>
            </div>

            <div className="pt-2">
              {initialTool === "gradient" && <GradientGenerator />}
              {initialTool === "palette" && <PaletteGenerator />}
              {initialTool === "contrast" && <ContrastChecker />}
              {initialTool === "extractor" && <ImageExtractor />}
              {initialTool === "shades" && <ShadesTints />}
              {initialTool === "tailwind" && <TailwindReference />}
              {initialTool === "blindness" && <BlindnessSim />}
              {initialTool === "details" && <ColorDetails />}
            </div>
          </div>
        )}

        {/* Feature Highlights with fresh green touches */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 border-t border-gray-100">
          <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Lock className="w-4 h-4 text-emerald-600" />
              100% Client-Side Privacy
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every color conversion and image extraction executes locally in your browser. No user files, color choices, or palette data are ever uploaded or tracked.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <Zap className="w-4 h-4 text-emerald-600" />
              Fast & Free For Everyone
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              No registration, no paywalls, and no intrusive ads. Built as a fast, clean utility for modern web designers and frontend engineers.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Standards Compliant
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Compliant with W3C WCAG 2.1 contrast guidelines and modern CSS Color Module Level 4 specifications (including native OKLCH values).
            </p>
          </div>
        </section>

        {/* Rich SEO Content & In-Depth Tool Documentation */}
        {initialTool !== "picker" && <ToolSeoContent toolKey={initialTool} />}

      </main>

      <Footer />
    </div>
  );
}
