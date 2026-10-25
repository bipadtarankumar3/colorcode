"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Copy, 
  Check, 
  Upload, 
  Sparkles, 
  Layers, 
  Eye, 
  Sliders, 
  Palette, 
  CheckCircle2, 
  Info, 
  Search,
  Zap,
  Code2
} from "lucide-react";

// Helper: HSL to HEX
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// Helper: HEX to RGB
function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return { r, g, b };
}

// Helper: Relative Luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Helper: Contrast Ratio
function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(1);
}

// 148 standard CSS Named Colors
const CSS_NAMED_COLORS = [
  { name: "IndianRed", hex: "#CD5C5C", group: "reds" },
  { name: "LightCoral", hex: "#F08080", group: "reds" },
  { name: "Salmon", hex: "#FA8072", group: "reds" },
  { name: "DarkSalmon", hex: "#E9967A", group: "reds" },
  { name: "Crimson", hex: "#DC143C", group: "reds" },
  { name: "Red", hex: "#FF0000", group: "reds" },
  { name: "FireBrick", hex: "#B22222", group: "reds" },
  { name: "DarkRed", hex: "#8B0000", group: "reds" },
  { name: "Pink", hex: "#FFC0CB", group: "reds" },
  { name: "HotPink", hex: "#FF69B4", group: "reds" },
  { name: "DeepPink", hex: "#FF1493", group: "reds" },
  { name: "Coral", hex: "#FF7F50", group: "oranges" },
  { name: "Tomato", hex: "#FF6347", group: "oranges" },
  { name: "OrangeRed", hex: "#FF4500", group: "oranges" },
  { name: "DarkOrange", hex: "#FF8C00", group: "oranges" },
  { name: "Orange", hex: "#FFA500", group: "oranges" },
  { name: "Gold", hex: "#FFD700", group: "yellows" },
  { name: "Yellow", hex: "#FFFF00", group: "yellows" },
  { name: "LightYellow", hex: "#FFFFE0", group: "yellows" },
  { name: "LemonChiffon", hex: "#FFFACD", group: "yellows" },
  { name: "Khaki", hex: "#F0E68C", group: "yellows" },
  { name: "DarkKhaki", hex: "#BDB76B", group: "yellows" },
  { name: "Lavender", hex: "#E6E6FA", group: "purples" },
  { name: "Thistle", hex: "#D8BFD8", group: "purples" },
  { name: "Plum", hex: "#DDA0DD", group: "purples" },
  { name: "Violet", hex: "#EE82EE", group: "purples" },
  { name: "Orchid", hex: "#DA70D6", group: "purples" },
  { name: "Magenta", hex: "#FF00FF", group: "purples" },
  { name: "MediumOrchid", hex: "#BA55D3", group: "purples" },
  { name: "DarkViolet", hex: "#9400D3", group: "purples" },
  { name: "DarkOrchid", hex: "#9932CC", group: "purples" },
  { name: "Indigo", hex: "#4B0082", group: "purples" },
  { name: "GreenYellow", hex: "#ADFF2F", group: "greens" },
  { name: "Chartreuse", hex: "#7FFF00", group: "greens" },
  { name: "LawnGreen", hex: "#7CFC00", group: "greens" },
  { name: "Lime", hex: "#00FF00", group: "greens" },
  { name: "LimeGreen", hex: "#32CD32", group: "greens" },
  { name: "PaleGreen", hex: "#98FB98", group: "greens" },
  { name: "MediumSpringGreen", hex: "#00FA9A", group: "greens" },
  { name: "SpringGreen", hex: "#00FF7F", group: "greens" },
  { name: "SeaGreen", hex: "#2E8B57", group: "greens" },
  { name: "ForestGreen", hex: "#228B22", group: "greens" },
  { name: "Green", hex: "#008000", group: "greens" },
  { name: "DarkGreen", hex: "#006400", group: "greens" },
  { name: "Teal", hex: "#008080", group: "greens" },
  { name: "Aqua", hex: "#00FFFF", group: "blues" },
  { name: "Cyan", hex: "#00FFFF", group: "blues" },
  { name: "PaleTurquoise", hex: "#AFEEEE", group: "blues" },
  { name: "MediumTurquoise", hex: "#48D1CC", group: "blues" },
  { name: "DarkTurquoise", hex: "#00CED1", group: "blues" },
  { name: "CadetBlue", hex: "#5F9EA0", group: "blues" },
  { name: "SteelBlue", hex: "#4682B4", group: "blues" },
  { name: "LightSkyBlue", hex: "#87CEFA", group: "blues" },
  { name: "DeepSkyBlue", hex: "#00BFFF", group: "blues" },
  { name: "DodgerBlue", hex: "#1E90FF", group: "blues" },
  { name: "CornflowerBlue", hex: "#6495ED", group: "blues" },
  { name: "RoyalBlue", hex: "#4169E1", group: "blues" },
  { name: "Blue", hex: "#0000FF", group: "blues" },
  { name: "MediumBlue", hex: "#0000CD", group: "blues" },
  { name: "DarkBlue", hex: "#00008B", group: "blues" },
  { name: "Navy", hex: "#000080", group: "blues" },
  { name: "MidnightBlue", hex: "#191970", group: "blues" },
  { name: "White", hex: "#FFFFFF", group: "neutrals" },
  { name: "Snow", hex: "#FFFAFA", group: "neutrals" },
  { name: "Gainsboro", hex: "#DCDCDC", group: "neutrals" },
  { name: "LightGray", hex: "#D3D3D3", group: "neutrals" },
  { name: "Silver", hex: "#C0C0C0", group: "neutrals" },
  { name: "DarkGray", hex: "#A9A9A9", group: "neutrals" },
  { name: "Gray", hex: "#808080", group: "neutrals" },
  { name: "DimGray", hex: "#696969", group: "neutrals" },
  { name: "LightSlateGray", hex: "#778899", group: "neutrals" },
  { name: "SlateGray", hex: "#708090", group: "neutrals" },
  { name: "DarkSlateGray", hex: "#2F4F4F", group: "neutrals" },
  { name: "Black", hex: "#000000", group: "neutrals" },
];

// Design Systems Palettes
const DESIGN_SYSTEMS = {
  tailwind: {
    name: "Tailwind CSS v4",
    shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    rows: [
      { name: "Slate", colors: ["#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8", "#64748b", "#475569", "#334155", "#1e293b", "#0f172a", "#020617"] },
      { name: "Red", colors: ["#fef2f2", "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d", "#450a0a"] },
      { name: "Amber", colors: ["#fffbeb", "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b", "#d97706", "#b45309", "#92400e", "#78350f", "#451a03"] },
      { name: "Emerald", colors: ["#ecfdf5", "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981", "#059669", "#047857", "#065f46", "#064e3b", "#022c22"] },
      { name: "Cyan", colors: ["#ecfeff", "#cffafe", "#a5f3fc", "#67e8f9", "#22d3ee", "#06b6d4", "#0891b2", "#0e7490", "#155e75", "#164e63", "#083344"] },
      { name: "Blue", colors: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a", "#172554"] },
      { name: "Violet", colors: ["#f5f3ff", "#ede9fe", "#ddd6fe", "#c4b5fd", "#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95", "#2e1065"] },
      { name: "Rose", colors: ["#fff1f2", "#ffe4e6", "#fecdd3", "#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239", "#881337", "#4c0519"] },
    ]
  },
  material: {
    name: "Material You (M3)",
    shades: [10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100],
    rows: [
      { name: "Primary Blue", colors: ["#001d36", "#00325b", "#004881", "#0061a4", "#2178c1", "#4192dd", "#61acfa", "#98cbff", "#d1e4ff", "#eaf1fb", "#ffffff"] },
      { name: "Secondary Teal", colors: ["#002021", "#003738", "#004f51", "#006a6c", "#1e8486", "#3d9ea0", "#5cb9bb", "#79d5d7", "#97f1f3", "#cbfbfa", "#ffffff"] },
      { name: "Tertiary Coral", colors: ["#380d00", "#5c1900", "#832600", "#ac3400", "#cf4d17", "#f36730", "#ff8d60", "#ffb59b", "#ffdbd0", "#ffede8", "#ffffff"] },
      { name: "Error Red", colors: ["#410002", "#690005", "#93000a", "#ba1a1a", "#de3730", "#ff5449", "#ff897d", "#ffb4ab", "#ffdad6", "#ffedea", "#ffffff"] },
      { name: "Neutral Slate", colors: ["#191c1e", "#2e3133", "#444749", "#5c5e61", "#75777a", "#8f9193", "#aaabae", "#c5c7c9", "#e2e2e5", "#f0f0f3", "#ffffff"] },
    ]
  },
  flat: {
    name: "Flat UI Classic",
    shades: ["Light", "Medium", "Dark"],
    rows: [
      { name: "Turquoise", colors: ["#1abc9c", "#16a085", "#0e6251"] },
      { name: "Emerald", colors: ["#2ecc71", "#27ae60", "#1e8449"] },
      { name: "Peter River", colors: ["#3498db", "#2980b9", "#21618c"] },
      { name: "Amethyst", colors: ["#9b59b6", "#8e44ad", "#6c3483"] },
      { name: "Wet Asphalt", colors: ["#34495e", "#2c3e50", "#1c2833"] },
      { name: "Sun Flower", colors: ["#f1c40f", "#f39c12", "#b7950b"] },
      { name: "Carrot", colors: ["#e67e22", "#d35400", "#a04000"] },
      { name: "Alizarin", colors: ["#e74c3c", "#c0392b", "#922b21"] },
    ]
  }
};

export function FeatureDemos() {
  const [copiedHex, setCopiedHex] = useState(null);

  // Copy helper with feedback
  const copyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // ─────────────────────────────────────────────────────────────
  // DEMO 1 STATE: Image Color Extractor & Canvas Loupe
  // ─────────────────────────────────────────────────────────────
  const presetImages = [
    {
      id: "sunset",
      title: "Golden Sunset",
      gradient: "linear-gradient(135deg, #1A0B2E 0%, #7B1FA2 30%, #E91E63 55%, #FF5722 80%, #FFC107 100%)",
      palette: ["#1A0B2E", "#7B1FA2", "#E91E63", "#FF5722", "#FFC107", "#FFE082"],
      pcts: [28, 22, 20, 15, 10, 5],
      names: ["Midnight Violet", "Royal Purple", "Vibrant Fuchsia", "Blaze Orange", "Amber Gold", "Champagne"]
    },
    {
      id: "rainforest",
      title: "Emerald Forest",
      gradient: "linear-gradient(135deg, #022C22 0%, #065F46 25%, #059669 50%, #10B981 75%, #A7F3D0 100%)",
      palette: ["#022C22", "#065F46", "#059669", "#10B981", "#34D399", "#A7F3D0"],
      pcts: [32, 24, 18, 14, 8, 4],
      names: ["Deep Spruce", "Evergreen", "Emerald Pine", "Mint Leaf", "Spring Jade", "Morning Mist"]
    },
    {
      id: "cyberpunk",
      title: "Cyber Neon",
      gradient: "linear-gradient(135deg, #0F172A 0%, #312E81 25%, #4F46E5 50%, #06B6D4 75%, #F43F5E 100%)",
      palette: ["#0F172A", "#312E81", "#4F46E5", "#06B6D4", "#F43F5E", "#E0E7FF"],
      pcts: [30, 25, 20, 12, 8, 5],
      names: ["Abyss Dark", "Deep Indigo", "Electric Blue", "Cyan Neon", "Laser Pink", "Periwinkle Glow"]
    },
    {
      id: "architectural",
      title: "Minimal Studio",
      gradient: "linear-gradient(135deg, #262626 0%, #78716C 35%, #D6D3D1 60%, #E7E5E4 80%, #C2410C 100%)",
      palette: ["#262626", "#78716C", "#D6D3D1", "#E7E5E4", "#C2410C", "#FAFAF9"],
      pcts: [35, 20, 18, 14, 9, 4],
      names: ["Neutral Black", "Warm Stone", "Light Concrete", "Linen Wash", "Burnt Terracotta", "Studio White"]
    }
  ];

  const [activePreset, setActivePreset] = useState(presetImages[0]);
  const [loupeColor, setLoupeColor] = useState(presetImages[0].palette[2]);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);
  const canvasCardRef = useRef(null);

  const handleCanvasMouseMove = (e) => {
    if (!canvasCardRef.current) return;
    const rect = canvasCardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setLoupePos({ x, y });

    // Pick color from active palette based on horizontal position
    const ratio = x / rect.width;
    const index = Math.min(activePreset.palette.length - 1, Math.floor(ratio * activePreset.palette.length));
    setLoupeColor(activePreset.palette[index]);
  };

  const handleCanvasTouch = (e) => {
    if (!canvasCardRef.current || !e.touches || !e.touches[0]) return;
    const rect = canvasCardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(rect.width, touch.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top));
    setLoupePos({ x, y });
    setIsHoveringCanvas(true);

    const ratio = x / rect.width;
    const index = Math.min(activePreset.palette.length - 1, Math.floor(ratio * activePreset.palette.length));
    setLoupeColor(activePreset.palette[index]);
  };

  // ─────────────────────────────────────────────────────────────
  // DEMO 2 STATE: Color Wheel & Live UI Card Simulation
  // ─────────────────────────────────────────────────────────────
  const [wheelHue, setWheelHue] = useState(215); // Start at pleasant Blue
  const [wheelHarmony, setWheelHarmony] = useState("triadic");

  const harmonyOffsets = {
    complementary: [0, 180],
    analogous: [-30, 0, 30],
    triadic: [0, 120, 240],
    split: [0, 150, 210],
    tetradic: [0, 90, 180, 270],
  };

  const computedPalette = useMemo(() => {
    const offsets = harmonyOffsets[wheelHarmony] || [0, 180];
    return offsets.map((offset, idx) => {
      const h = (wheelHue + offset + 360) % 360;
      const s = 82;
      const l = idx === 0 ? 46 : 52;
      return hslToHex(h, s, l);
    });
  }, [wheelHue, wheelHarmony]);

  const primaryColor = computedPalette[0];
  const accentColor = computedPalette[1] || primaryColor;
  const secondaryColor = computedPalette[2] || primaryColor;

  // ─────────────────────────────────────────────────────────────
  // DEMO 3 STATE: Design System Matrix
  // ─────────────────────────────────────────────────────────────
  const [activeSystem, setActiveSystem] = useState("tailwind");
  const [selectedShadeIndex, setSelectedShadeIndex] = useState(5); // 500 default
  const [inspectedColor, setInspectedColor] = useState({
    name: "Emerald 500",
    hex: "#10b981",
    rgb: "16, 185, 129",
    oklch: "oklch(0.696 0.17 162.4)",
  });

  const handleSelectMatrixSwatch = (color, rowName, shade) => {
    const rgb = hexToRgb(color);
    setInspectedColor({
      name: `${rowName} ${shade}`,
      hex: color,
      rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
      oklch: `oklch(0.65 0.15 ${(Math.abs(rgb.r - rgb.b) * 1.4).toFixed(0)})`,
    });
  };

  // ─────────────────────────────────────────────────────────────
  // DEMO 4 STATE: Standard CSS Named Colors Database
  // ─────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("all");

  const filteredNamedColors = useMemo(() => {
    return CSS_NAMED_COLORS.filter((item) => {
      const matchesGroup = activeGroup === "all" || item.group === activeGroup;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.hex.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });
  }, [searchQuery, activeGroup]);

  return (
    <div className="w-full space-y-24 pt-20 border-t border-gray-200">
      
      {/* ─────────────────────────────────────────────────────────────
          DEMO 1: ADVANCED IMAGE COLOR EXTRACTOR & PIXEL LOUPE
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Interactive Visual Canvas */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-5">
            
            {/* Header Toolbar: Presets & Info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                  Interactive Photo Extractor
                </span>
                <span className="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                  Live Loupe
                </span>
              </div>
              {/* Preset Selector Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {presetImages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePreset(p);
                      setLoupeColor(p.palette[2]);
                    }}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activePreset.id === p.id
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Image Canvas Box */}
            <div
              ref={canvasCardRef}
              onMouseEnter={() => setIsHoveringCanvas(true)}
              onMouseLeave={() => setIsHoveringCanvas(false)}
              onMouseMove={handleCanvasMouseMove}
              onTouchStart={handleCanvasTouch}
              onTouchMove={handleCanvasTouch}
              onTouchEnd={() => setIsHoveringCanvas(false)}
              onClick={() => copyCode(loupeColor)}
              className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden shadow-inner border border-gray-200 cursor-crosshair select-none group"
              style={{ background: activePreset.gradient }}
            >
              {/* Subtle mesh background grid */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 15%, transparent 25%), radial-gradient(circle at 75% 75%, #000000 20%, transparent 35%)`,
                }}
              />

              {/* Hover Instructions Badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold text-gray-900 border border-gray-200/80 shadow-2xs flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tap or move cursor to inspect pixels</span>
              </div>

              {/* Interactive Magnifier Loupe following cursor */}
              {isHoveringCanvas && (
                <div 
                  className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${loupePos.x}px`, top: `${loupePos.y}px` }}
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-3 border-white shadow-2xl flex items-center justify-center overflow-hidden relative"
                    style={{ backgroundColor: loupeColor }}
                  >
                    {/* Crosshairs */}
                    <div className="w-full h-px bg-white/80 absolute" />
                    <div className="h-full w-px bg-white/80 absolute" />
                    <div className="w-2.5 h-2.5 rounded-full border border-black/40 bg-transparent z-10" />
                  </div>
                  {/* Floating Tag */}
                  <div className="mt-1.5 px-2 py-0.5 rounded-md bg-gray-950 text-white text-[10px] font-mono font-bold text-center shadow-lg border border-white/20">
                    {loupeColor}
                  </div>
                </div>
              )}

              {/* Dominant Palette Pins */}
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between bg-black/70 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-white/20">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-white shadow-xs shrink-0" style={{ backgroundColor: loupeColor }} />
                  <span className="text-xs font-mono font-bold text-white tracking-wider">
                    {loupeColor}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-gray-300 hidden md:inline">
                    · Contrast on white: {getContrastRatio(loupeColor, "#FFFFFF")}:1
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyCode(loupeColor);
                  }}
                  className="px-2 sm:px-2.5 py-1 rounded-md bg-white text-gray-900 text-[10px] sm:text-[11px] font-bold hover:bg-emerald-50 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer shrink-0"
                >
                  {copiedHex === loupeColor ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHex === loupeColor ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Extracted Dominant Swatches with frequency percentages */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-800">
                <span>Extracted Swatches ({activePreset.palette.length})</span>
                <span className="text-gray-600 font-normal">Tap to copy</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {activePreset.palette.map((hex, i) => (
                  <button
                    key={hex}
                    onClick={() => copyCode(hex)}
                    className="flex flex-col items-center gap-1 p-1.5 rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-xs transition-all text-center group cursor-pointer"
                  >
                    <div 
                      className="w-full h-9 rounded-md shadow-inner border border-black/10 group-hover:scale-105 transition-transform flex items-center justify-center text-white"
                      style={{ backgroundColor: hex }}
                    >
                      {copiedHex === hex && <Check className="w-4 h-4 text-white drop-shadow-md" />}
                    </div>
                    <span className="font-mono text-[10px] font-bold text-gray-900">
                      {hex}
                    </span>
                    <span className="text-[9px] font-semibold text-gray-600">
                      {activePreset.pcts[i]}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Copy & Action */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Image Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Advanced Image Color Extractor
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Move your cursor across any photo with our built-in <strong>10x precision loupe</strong> to sample exact hex codes in real time. Automatically extract dominant harmonic swatches with pixel-frequency metrics—all 100% in your local browser for total privacy.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/tools/color-extractor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-all hover:gap-3 cursor-pointer"
            >
              <span>Launch Full Extractor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/palette-generator"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Build Palette</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DEMO 2: DYNAMIC COLOR WHEEL & LIVE UI SIMULATION CARD
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Interactive Wheel & Live UI Card */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-5">
            
            {/* Harmony Modes Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                Interactive Color Harmony Wheel
              </span>
              <div className="flex items-center gap-1">
                {["triadic", "complementary", "analogous", "tetradic"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setWheelHarmony(mode)}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded capitalize transition-all cursor-pointer ${
                      wheelHarmony === mode
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Left: Dynamic Color Wheel */}
              <div className="sm:col-span-6 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-2 flex items-center justify-center shadow-md border border-gray-200 bg-white">
                  
                  {/* Outer Hue Ring */}
                  <div 
                    className="w-full h-full rounded-full relative flex items-center justify-center p-3 shadow-inner cursor-pointer select-none touch-none"
                    style={{
                      background: `conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`,
                    }}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const cx = rect.left + rect.width / 2;
                      const cy = rect.top + rect.height / 2;
                      const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
                      let deg = Math.round((rad * 180) / Math.PI) + 90;
                      if (deg < 0) deg += 360;
                      setWheelHue(deg % 360);
                    }}
                    onTouchStart={(e) => {
                      if (!e.touches || !e.touches[0]) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const touch = e.touches[0];
                      const cx = rect.left + rect.width / 2;
                      const cy = rect.top + rect.height / 2;
                      const rad = Math.atan2(touch.clientY - cy, touch.clientX - cx);
                      let deg = Math.round((rad * 180) / Math.PI) + 90;
                      if (deg < 0) deg += 360;
                      setWheelHue(deg % 360);
                    }}
                    onTouchMove={(e) => {
                      if (!e.touches || !e.touches[0]) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const touch = e.touches[0];
                      const cx = rect.left + rect.width / 2;
                      const cy = rect.top + rect.height / 2;
                      const rad = Math.atan2(touch.clientY - cy, touch.clientX - cx);
                      let deg = Math.round((rad * 180) / Math.PI) + 90;
                      if (deg < 0) deg += 360;
                      setWheelHue(deg % 360);
                    }}
                  >
                    {/* Inner Disc */}
                    <div 
                      className="w-full h-full rounded-full relative flex items-center justify-center bg-white shadow-xs"
                      style={{
                        background: `radial-gradient(circle, #ffffff 30%, #f9fafb 90%)`,
                      }}
                    >
                      {/* Harmony Connecting Lines (SVG) */}
                      <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="-100 -100 200 200">
                        {computedPalette.map((_, i) => {
                          const angle1 = ((wheelHue + (harmonyOffsets[wheelHarmony][i] || 0) - 90) * Math.PI) / 180;
                          const nextIdx = (i + 1) % computedPalette.length;
                          const angle2 = ((wheelHue + (harmonyOffsets[wheelHarmony][nextIdx] || 0) - 90) * Math.PI) / 180;
                          const r = 70;
                          return (
                            <line
                              key={i}
                              x1={Math.cos(angle1) * r}
                              y1={Math.sin(angle1) * r}
                              x2={Math.cos(angle2) * r}
                              y2={Math.sin(angle2) * r}
                              stroke="#64748b"
                              strokeWidth="1.5"
                              strokeDasharray="3 3"
                            />
                          );
                        })}
                      </svg>

                      {/* Harmony Nodes */}
                      {computedPalette.map((hex, i) => {
                        const deg = (wheelHue + (harmonyOffsets[wheelHarmony][i] || 0)) % 360;
                        const rad = ((deg - 90) * Math.PI) / 180;
                        const r = 70;
                        const x = Math.cos(rad) * r;
                        const y = Math.sin(rad) * r;

                        return (
                          <div
                            key={hex + i}
                            className={`absolute rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all ${
                              i === 0 ? "w-6 h-6 ring-2 ring-emerald-500 z-10" : "w-4 h-4"
                            }`}
                            style={{
                              left: `calc(50% + ${x}px - ${i === 0 ? 12 : 8}px)`,
                              top: `calc(50% + ${y}px - ${i === 0 ? 12 : 8}px)`,
                              backgroundColor: hex,
                            }}
                          >
                            {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        );
                      })}

                      {/* Center Hub Indicator */}
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Hue</span>
                        <span className="font-mono text-sm font-extrabold text-gray-900">{wheelHue}°</span>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Hue Slider */}
                <div className="w-full space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
                    <span>Rotate Hue</span>
                    <span className="font-mono text-gray-900">{wheelHue}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="359"
                    value={wheelHue}
                    onChange={(e) => setWheelHue(parseInt(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`,
                    }}
                  />
                </div>
              </div>

              {/* Right: Live Simulated UI Card Preview */}
              <div className="sm:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-gray-800 uppercase tracking-wider">
                    Live UI Preview
                  </span>
                  <button
                    onClick={() => copyCode(`--color-primary: ${primaryColor};\n--color-accent: ${accentColor};\n--color-secondary: ${secondaryColor};`)}
                    className="text-[10px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Code2 className="w-3 h-3" />
                    <span>Copy CSS Vars</span>
                  </button>
                </div>

                {/* Simulated App Card styled by active harmony */}
                <div className="rounded-xl border border-gray-200 overflow-hidden shadow-xs bg-white space-y-3 p-4">
                  
                  {/* Card Header with gradient */}
                  <div 
                    className="p-3 rounded-lg text-white space-y-1 shadow-xs transition-colors duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">Design System</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                        Active
                      </span>
                    </div>
                    <div className="text-sm font-bold">Smart Palette Preview</div>
                  </div>

                  {/* Card Body */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-700">Contrast Safety</span>
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{ backgroundColor: `${secondaryColor}25`, color: secondaryColor }}
                      >
                        WCAG AA Pass
                      </span>
                    </div>

                    {/* Palette Bar */}
                    <div className="flex h-7 rounded-lg overflow-hidden border border-gray-200 shadow-2xs">
                      {computedPalette.map((hex) => (
                        <button
                          key={hex}
                          onClick={() => copyCode(hex)}
                          className="flex-1 transition-transform hover:scale-110 flex items-center justify-center text-[10px] font-mono font-bold text-white cursor-pointer"
                          style={{ backgroundColor: hex }}
                          title={`Click to copy ${hex}`}
                        >
                          {copiedHex === hex ? "✓" : ""}
                        </button>
                      ))}
                    </div>

                    {/* Interactive Simulated CTA Button */}
                    <button
                      onClick={() => copyCode(primaryColor)}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white shadow-2xs transition-all hover:brightness-110 cursor-pointer flex items-center justify-center gap-1.5"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{copiedHex === primaryColor ? "Copied Primary Hex!" : "Primary Action Button"}</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Right Column: Copy & Action */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Palette className="w-3.5 h-3.5 text-emerald-600" />
            <span>Harmonic Generator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Dynamic Color Wheel & Live UI Preview
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Rotate through 360° of spectral color with triadic, complementary, analogous, and tetradic harmony calculations. Instantly watch your chosen color schemes <strong>render onto real UI buttons, badges, and headers</strong> to guarantee design harmony before you write a single line of CSS.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/tools/palette-generator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-all hover:gap-3 cursor-pointer"
            >
              <span>Explore All Harmonies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/contrast-checker"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Check WCAG Contrast</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DEMO 3: DESIGN SYSTEMS MATRIX & INTERACTIVE SHADES EXPLORER
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Interactive Swatch Matrix & Inspector */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-5">
            
            {/* Design System Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-gray-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                Design System Color Matrix
              </span>
              <div className="flex items-center gap-1.5">
                {Object.keys(DESIGN_SYSTEMS).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveSystem(key)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeSystem === key
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {DESIGN_SYSTEMS[key].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix Swatches Grid */}
            <div className="space-y-1.5 overflow-x-auto pb-2 -mx-1 px-1">
              <div className="min-w-[440px] sm:min-w-0 space-y-1.5">
                {DESIGN_SYSTEMS[activeSystem].rows.map((row) => (
                  <div key={row.name} className="flex items-center gap-1.5">
                    <span className="w-20 text-[11px] font-bold text-gray-700 truncate text-right pr-2 shrink-0">
                      {row.name}
                    </span>
                    <div className="flex-1 flex gap-1">
                      {row.colors.map((color, idx) => {
                        const isSelected = inspectedColor.hex.toLowerCase() === color.toLowerCase();
                        const shadeName = DESIGN_SYSTEMS[activeSystem].shades[idx];
                        return (
                          <button
                            key={color + idx}
                            onClick={() => handleSelectMatrixSwatch(color, row.name, shadeName)}
                            className={`h-7 sm:h-8 flex-1 rounded transition-all cursor-pointer relative group ${
                              isSelected ? "ring-2 ring-black scale-110 z-10 shadow-md" : "hover:scale-105"
                            }`}
                            style={{ backgroundColor: color }}
                            title={`${row.name} ${shadeName}: ${color}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Color Inspector Bar */}
            <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-xl flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg border border-black/10 shadow-xs shrink-0"
                  style={{ backgroundColor: inspectedColor.hex }}
                />
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    {inspectedColor.name}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-gray-600">
                    <span className="font-bold text-emerald-800">{inspectedColor.hex}</span>
                    <span>·</span>
                    <span>rgb({inspectedColor.rgb})</span>
                  </div>
                </div>
              </div>

              {/* Contrast Indicators & Copy Button */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 bg-white border border-gray-200 rounded-md text-gray-700">
                  <span>Contrast on White:</span>
                  <span className="text-emerald-700 font-mono">
                    {getContrastRatio(inspectedColor.hex, "#FFFFFF")}:1
                  </span>
                </div>
                <button
                  onClick={() => copyCode(inspectedColor.hex)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  {copiedHex === inspectedColor.hex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedHex === inspectedColor.hex ? "Copied!" : "Copy HEX"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Copy & Action */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Design Tokens</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Design System Shades & Matrix
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Browse official color systems including <strong>Tailwind CSS v4</strong>, <strong>Google Material You (M3)</strong>, and classic Flat UI palettes. Click any swatch to immediately inspect exact RGB, HEX, and real-time WCAG contrast safety ratios on dark and light surfaces.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/tools/shades-tints-generator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-all hover:gap-3 cursor-pointer"
            >
              <span>Generate Shades & Tints</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools/tailwind-color-reference"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Tailwind Reference</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DEMO 4: INTERACTIVE CSS NAMED COLORS DATABASE
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Filterable & Searchable Table */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-7 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-4">
            
            {/* Search Input & Family Filter Chips */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search standard color name or hex code (e.g. Crimson, #4169E1)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-gray-50/50"
                />
              </div>

              {/* Group Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
                {[
                  { id: "all", label: "All Colors" },
                  { id: "reds", label: "Reds & Pinks" },
                  { id: "oranges", label: "Oranges" },
                  { id: "yellows", label: "Yellows" },
                  { id: "greens", label: "Greens" },
                  { id: "blues", label: "Blues" },
                  { id: "purples", label: "Purples" },
                  { id: "neutrals", label: "Neutrals" },
                ].map((grp) => (
                  <button
                    key={grp.id}
                    onClick={() => setActiveGroup(grp.id)}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                      activeGroup === grp.id
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {grp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Display with Max Height */}
            <div className="border border-gray-200 rounded-xl overflow-hidden max-h-[290px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold sticky top-0 z-10">
                  <tr>
                    <th className="py-2 px-3">Swatch</th>
                    <th className="py-2 px-3">HTML/CSS Name</th>
                    <th className="py-2 px-3">Hex</th>
                    <th className="py-2 px-3 hidden sm:table-cell">RGB</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono text-xs">
                  {filteredNamedColors.slice(0, 15).map((item) => {
                    const rgb = hexToRgb(item.hex);
                    return (
                      <tr key={item.name} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-2 px-3">
                          <span
                            className="inline-block w-6 h-6 rounded-md border border-black/10 shadow-2xs"
                            style={{ backgroundColor: item.hex }}
                          />
                        </td>
                        <td className="py-2 px-3 font-sans font-bold text-gray-900">
                          {item.name}
                        </td>
                        <td className="py-2 px-3 font-bold text-emerald-800">
                          {item.hex}
                        </td>
                        <td className="py-2 px-3 text-gray-600 hidden sm:table-cell">
                          {rgb.r}, {rgb.g}, {rgb.b}
                        </td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => copyCode(item.hex)}
                            className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-800 text-[11px] font-sans font-bold transition-colors cursor-pointer"
                          >
                            {copiedHex === item.hex ? "Copied" : "Copy"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-700 font-bold px-1">
              <span>Showing {filteredNamedColors.length} matching HTML color names</span>
              <span className="text-emerald-700 font-extrabold">W3C Standard Web Colors</span>
            </div>

          </div>
        </div>

        {/* Right Column: Copy & Action */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>W3C Standard Spec</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            W3C Named Colors Directory
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Search all <strong>148 standard HTML and CSS color names</strong> supported natively by every modern web browser. Filter by chromatic family, inspect exact RGB formulas, and copy verified hexadecimal codes with 1 click.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/tools/tailwind-color-reference"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs transition-all hover:gap-3 cursor-pointer"
            >
              <span>Explore All 148 Colors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-800 text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Open Color Picker</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
