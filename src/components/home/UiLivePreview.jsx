"use client";

import { useState, useMemo } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Copy, 
  Moon, 
  Sun, 
  TrendingUp, 
  ShieldCheck, 
  Bell, 
  Sliders, 
  Layers, 
  Heart,
  Eye,
  CheckCircle2
} from "lucide-react";

export function UiLivePreview({ hex = "#059669", colorName = "Emerald", colorMood = "Natural & Refreshing" }) {
  const [isDarkPreview, setIsDarkPreview] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [liked, setLiked] = useState(false);
  const [inputValue, setInputValue] = useState("hello@revoxera.com");

  // Determine if foreground text on the primary color should be white or black
  const isDarkBaseColor = useMemo(() => {
    const clean = hex.replace("#", "");
    if (clean.length !== 6) return true;
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    // Relative luminance
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    const lum = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    return lum < 0.45;
  }, [hex]);

  const textColorOnHex = isDarkBaseColor ? "#ffffff" : "#0f172a";

  const copyCode = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <section className="space-y-4 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-0.5">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-emerald-600" />
            Live Component Playground
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Preview {hex} in Real-World UI Elements
          </h2>
          <p className="text-xs text-gray-500">
            See how your chosen color looks immediately across actual buttons, cards, badges, and input controls.
          </p>
        </div>

        {/* Dark / Light Mode Preview Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-gray-500">Preview Background:</span>
          <button
            onClick={() => setIsDarkPreview(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              !isDarkPreview
                ? "bg-white text-gray-900 border border-gray-300 shadow-2xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            Light
          </button>
          <button
            onClick={() => setIsDarkPreview(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isDarkPreview
                ? "bg-gray-900 text-white shadow-2xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-purple-400" />
            Dark
          </button>
        </div>
      </div>

      {/* Interactive Mock Interface Canvas */}
      <div
        className={`rounded-2xl border transition-all duration-300 p-5 sm:p-7 shadow-xs space-y-6 ${
          isDarkPreview
            ? "bg-slate-950 border-slate-800 text-slate-100"
            : "bg-slate-50/80 border-gray-200 text-gray-900"
        }`}
      >
        {/* Top Bar of the Mock Component */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-200/50 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full shadow-2xs border border-black/10 shrink-0"
              style={{ backgroundColor: hex }}
            />
            <span className="text-xs font-bold tracking-tight">
              Design Token: <span className="font-mono">{colorName}</span> ({hex})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-colors"
              style={{
                backgroundColor: `${hex}15`,
                color: hex,
                borderColor: `${hex}30`
              }}
            >
              ● {colorMood.split("&")[0].trim()}
            </span>

            <button
              onClick={() => setLiked(!liked)}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 text-gray-500 transition-colors cursor-pointer"
              title="Like this color"
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  liked ? "fill-rose-500 text-rose-500 scale-110" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4 Interactive UI Showcase Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Interactive Buttons & CTA States */}
          <div
            className={`p-5 rounded-xl border space-y-3 shadow-2xs transition-all ${
              isDarkPreview ? "bg-slate-900/90 border-slate-800" : "bg-white border-gray-200"
            }`}
          >
            <div className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              1. Buttons & CTA States
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Primary Button */}
              <button
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 active:scale-[0.98]"
                style={{
                  backgroundColor: hex,
                  color: textColorOnHex
                }}
              >
                <span>Primary Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Secondary Soft Tint Button */}
              <button
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 cursor-pointer hover:opacity-85"
                style={{
                  backgroundColor: `${hex}18`,
                  color: hex,
                  borderColor: `${hex}35`
                }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Soft Secondary</span>
              </button>

              {/* Outline Button */}
              <button
                className="w-full py-2 px-4 rounded-xl font-semibold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800"
                style={{ borderColor: hex, color: hex }}
              >
                Outline Variant
              </button>
            </div>
          </div>

          {/* Card 2: Interactive Metric & Glass Card */}
          <div
            className={`p-5 rounded-xl border space-y-3 shadow-2xs transition-all ${
              isDarkPreview ? "bg-slate-900/90 border-slate-800" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                2. Analytics Card
              </span>
              <span
                className="p-1 rounded-md text-[10px] font-bold"
                style={{ backgroundColor: `${hex}20`, color: hex }}
              >
                +28.4%
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black tracking-tight" style={{ color: hex }}>
                $128,450
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Monthly Recurring Revenue
              </p>
            </div>

            {/* Custom Dynamic Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500">
                <span>Monthly Target</span>
                <span style={{ color: hex }}>84%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: "84%", backgroundColor: hex }}
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
              <TrendingUp className="w-3.5 h-3.5" style={{ color: hex }} />
              <span>Outperforming last quarter</span>
            </div>
          </div>

          {/* Card 3: Form Controls & Notification Banner */}
          <div
            className={`p-5 rounded-xl border space-y-3 shadow-2xs transition-all ${
              isDarkPreview ? "bg-slate-900/90 border-slate-800" : "bg-white border-gray-200"
            }`}
          >
            <div className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              3. Inputs & Notifications
            </div>

            {/* Notification Banner */}
            <div
              className="p-2.5 rounded-lg border text-xs font-medium flex items-center gap-2"
              style={{
                backgroundColor: `${hex}12`,
                borderColor: `${hex}30`,
                color: isDarkPreview ? "#ffffff" : "#1f2937"
              }}
            >
              <Bell className="w-3.5 h-3.5 shrink-0" style={{ color: hex }} />
              <span className="truncate">New palette applied to your design system!</span>
            </div>

            {/* Input with custom focus glow */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-500 dark:text-slate-400 block">
                Interactive Form Input
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border transition-all bg-transparent focus:outline-hidden"
                style={{
                  borderColor: hex,
                  boxShadow: `0 0 0 3px ${hex}25`
                }}
              />
            </div>

            {/* Badges Pill Row */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-bold"
                style={{ backgroundColor: hex, color: textColorOnHex }}
              >
                Active Badge
              </span>
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-bold border"
                style={{
                  backgroundColor: `${hex}15`,
                  color: hex,
                  borderColor: `${hex}35`
                }}
              >
                Pro Feature
              </span>
              <span
                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300"
              >
                Default
              </span>
            </div>

          </div>

        </div>

        {/* Copy Ready Code Snippets for this active color */}
        <div className="pt-2 border-t border-gray-200/50 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-mono text-gray-600 dark:text-slate-400">
            <span>Tailwind class:</span>
            <code className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-bold">
              bg-[{hex}] text-[{textColorOnHex}]
            </code>
          </div>

          <button
            onClick={() => copyCode(`bg-[${hex}] text-[${textColorOnHex}]`, "tailwind_class")}
            className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-900 text-gray-700 dark:text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            {copiedKey === "tailwind_class" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Tailwind CSS</span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}

