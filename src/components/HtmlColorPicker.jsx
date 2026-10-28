"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  Share2, 
  ChevronDown, 
  Sparkles,
  Pipette,
  Sliders,
  CheckCircle,
  AlertTriangle,
  Bookmark,
  ShieldCheck,
  FileCode,
  Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { getName } from "@/lib/ntc";
import { FeatureDemos } from "./FeatureDemos";
import { UiLivePreview } from "./home/UiLivePreview";
import { HomeFaqAndGuides } from "./home/HomeFaqAndGuides";

// Color math helpers
function hsvToRgb(h, s, v) {
  s = s / 100;
  v = v / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h <= 360) { r = c; g = 0; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHsv(r, g, b) {
  const rN = r / 255, gN = g / 255, bN = b / 255;
  const max = Math.max(rN, gN, bN), min = Math.min(rN, gN, bN);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;

  if (max !== min) {
    switch (max) {
      case rN: h = (gN - bN) / d + (gN < bN ? 6 : 0); break;
      case gN: h = (bN - rN) / d + 2; break;
      case bN: h = (rN - gN) / d + 4; break;
    }
    h = h * 60;
  }
  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
}

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, "0");
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return { r: 5, g: 150, b: 105 }; // Default emerald
  return {
    r: parseInt(clean.slice(0, 2), 16) || 0,
    g: parseInt(clean.slice(2, 4), 16) || 0,
    b: parseInt(clean.slice(4, 6), 16) || 0,
  };
}

function rgbToHsl(r, g, b) {
  const rL = r / 255, gL = g / 255, bL = b / 255;
  const max = Math.max(rL, gL, bL), min = Math.min(rL, gL, bL);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rL: h = (gL - bL) / d + (gL < bL ? 6 : 0); break;
      case gL: h = (bL - rL) / d + 2; break;
      case bL: h = (rL - gL) / d + 4; break;
    }
    h = h * 60;
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToOklch(r, g, b) {
  const f = (x) => (x > 0.04045 ? Math.pow((x + 0.055) / 1.055, 2.4) : x / 12.92);
  const lr = f(r / 255), lg = f(g / 255), lb = f(b / 255);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const b_val = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.sqrt(a * a + b_val * b_val);
  let h = Math.atan2(b_val, a) * (180 / Math.PI);
  if (h < 0) h += 360;
  return {
    l: (Math.round(L * 100) / 100).toFixed(2),
    c: (Math.round(C * 100) / 100).toFixed(2),
    h: Math.round(h),
  };
}

function getRelativeLuminance(r, g, b) {
  const [rL, gL, bL] = [r, g, b].map((val) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;
}

const TRENDING_PALETTES = [
  // Modern UI
  { name: "Emerald SaaS", category: "Modern UI", colors: ["#064e3b", "#047857", "#10b981", "#6ee7b7", "#ecfdf5"] },
  { name: "Nordic Slate", category: "Modern UI", colors: ["#0f172a", "#334155", "#64748b", "#cbd5e1", "#f8fafc"] },
  { name: "Indigo Modern", category: "Modern UI", colors: ["#312e81", "#4338ca", "#6366f1", "#a5b4fc", "#eef2ff"] },
  // Pastel & Soft
  { name: "Pastel Macaron", category: "Pastel", colors: ["#fbcfe8", "#fde68a", "#a7f3d0", "#bae6fd", "#ddd6fe"] },
  { name: "Matcha Latte", category: "Pastel", colors: ["#283618", "#606c38", "#dda15e", "#bc6c25", "#fefae0"] },
  { name: "Lavender Mist", category: "Pastel", colors: ["#4c1d95", "#7c3aed", "#a78bfa", "#ddd6fe", "#f5f3ff"] },
  // Cyberpunk & Neon
  { name: "Cyber Sunset", category: "Cyberpunk", colors: ["#2e0249", "#570a57", "#a91079", "#f806cc", "#ff99fe"] },
  { name: "Neon Matrix", category: "Cyberpunk", colors: ["#052e16", "#14532d", "#16a34a", "#4ade80", "#bbf7d0"] },
  { name: "Electric Blue", category: "Cyberpunk", colors: ["#03071e", "#023e8a", "#0077b6", "#00b4d8", "#90e0ef"] },
  // Earthy & Retro
  { name: "Warm Terracotta", category: "Earthy", colors: ["#4a150e", "#7c2d12", "#c2410c", "#fb923c", "#ffedd5"] },
  { name: "Autumn Leaves", category: "Earthy", colors: ["#78350f", "#b45309", "#d97706", "#f59e0b", "#fef3c7"] },
  { name: "Forest Moss", category: "Earthy", colors: ["#143601", "#245501", "#538d22", "#73a942", "#aad576"] },
  // Dark Mode Accents
  { name: "Obsidian Purple", category: "Dark Mode", colors: ["#09090b", "#18181b", "#3f3f46", "#a855f7", "#e9d5ff"] },
  { name: "Midnight Rose", category: "Dark Mode", colors: ["#020617", "#0f172a", "#1e293b", "#f43f5e", "#ffe4e6"] },
  { name: "Ocean Depths", category: "Dark Mode", colors: ["#082f49", "#0369a1", "#0ea5e9", "#7dd3fc", "#f0f9ff"] },
];

export function HtmlColorPicker() {
  // Base state in HSV (defaulting to a beautiful fresh emerald #059669)
  const [hue, setHue] = useState(160);
  const [sat, setSat] = useState(97);
  const [val, setVal] = useState(59);

  const [hexInput, setHexInput] = useState("059669");
  const [harmony, setHarmony] = useState("analogous");
  const [copiedKey, setCopiedKey] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [hasEyeDropper, setHasEyeDropper] = useState(false);
  const [paletteCategory, setPaletteCategory] = useState("All");

  const pickerRef = useRef(null);
  const isDraggingPicker = useRef(false);
  const hueSliderRef = useRef(null);
  const isDraggingHue = useRef(false);

  // Check for native browser EyeDropper API
  useEffect(() => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      setHasEyeDropper(true);
    }
  }, []);

  // Derive RGB and Hex from HSV
  const rgb = useMemo(() => hsvToRgb(hue, sat, val), [hue, sat, val]);
  const hex = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb]);
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);
  const oklch = useMemo(() => rgbToOklch(rgb.r, rgb.g, rgb.b), [rgb]);

  // Color name & psychology tag
  const colorName = useMemo(() => {
    try {
      return getName(hex);
    } catch {
      return "Color";
    }
  }, [hex]);

  const colorMood = useMemo(() => {
    const h = hsl.h;
    if (hsl.s < 12) return "Neutral, Balanced & Sophisticated";
    if (h >= 345 || h < 15) return "Passionate, Bold & High-Energy";
    if (h >= 15 && h < 45) return "Warm, Confident & Friendly";
    if (h >= 45 && h < 70) return "Optimistic, Bright & Clear";
    if (h >= 70 && h < 170) return "Natural, Refreshing & Harmonious";
    if (h >= 170 && h < 210) return "Clean, Modern & Invigorating";
    if (h >= 210 && h < 265) return "Trustworthy, Reliable & Serene";
    if (h >= 265 && h < 315) return "Creative, Luxurious & Imaginative";
    return "Playful, Vibrant & Expressive";
  }, [hsl]);

  // WCAG Accessibility calculation
  const accessibilityScores = useMemo(() => {
    const lum = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
    const lumWhite = 1.0;
    const lumBlack = 0.0;

    const ratioOnWhite = (Math.max(lum, lumWhite) + 0.05) / (Math.min(lum, lumWhite) + 0.05);
    const ratioOnBlack = (Math.max(lum, lumBlack) + 0.05) / (Math.min(lum, lumBlack) + 0.05);

    return {
      whiteRatio: (Math.round(ratioOnWhite * 10) / 10).toFixed(1),
      blackRatio: (Math.round(ratioOnBlack * 10) / 10).toFixed(1),
      whiteAA: ratioOnWhite >= 4.5,
      whiteAAA: ratioOnWhite >= 7.0,
      blackAA: ratioOnBlack >= 4.5,
      blackAAA: ratioOnBlack >= 7.0,
    };
  }, [rgb]);

  // Sync hex input with color changes
  useEffect(() => {
    setHexInput(hex.replace("#", ""));
  }, [hex]);

  // 18-step tints & shades gradient strip
  const shadeStrip = useMemo(() => {
    const list = [];
    // 9 tints
    for (let step = 92; step >= 10; step -= 10) {
      const tintVal = Math.min(100, Math.round(val + (100 - val) * (step / 100)));
      const tintSat = Math.max(5, Math.round(sat * (1 - (step / 120))));
      const c = hsvToRgb(hue, tintSat, tintVal);
      list.push(rgbToHex(c.r, c.g, c.b));
    }
    list.push(hex);
    // 8 shades
    for (let step = 12; step <= 85; step += 10) {
      const shadeVal = Math.max(8, Math.round(val * (1 - (step / 100))));
      const c = hsvToRgb(hue, sat, shadeVal);
      list.push(rgbToHex(c.r, c.g, c.b));
    }
    return list;
  }, [hue, sat, val, hex]);

  // Calculate harmony palette
  const harmonyPalette = useMemo(() => {
    if (harmony === "none") return [hex];
    const baseH = hue;
    let angles = [];

    switch (harmony) {
      case "complementary":
        angles = [baseH, (baseH + 180) % 360];
        break;
      case "analogous":
        angles = [(baseH - 30 + 360) % 360, (baseH - 15 + 360) % 360, baseH, (baseH + 15) % 360, (baseH + 30) % 360];
        break;
      case "triadic":
        angles = [baseH, (baseH + 120) % 360, (baseH + 240) % 360];
        break;
      case "tetradic":
        angles = [baseH, (baseH + 90) % 360, (baseH + 180) % 360, (baseH + 270) % 360];
        break;
      case "split":
        angles = [baseH, (baseH + 150) % 360, (baseH + 210) % 360];
        break;
      case "monochromatic": {
        const v1 = Math.min(95, val + 28);
        const v2 = Math.max(15, val - 28);
        const c1 = hsvToRgb(hue, Math.max(15, sat - 25), v1);
        const c2 = hsvToRgb(hue, sat, val);
        const c3 = hsvToRgb(hue, Math.min(100, sat + 15), v2);
        return [rgbToHex(c1.r, c1.g, c1.b), rgbToHex(c2.r, c2.g, c2.b), rgbToHex(c3.r, c3.g, c3.b)];
      }
      default:
        angles = [baseH];
    }

    return angles.map((a) => {
      const c = hsvToRgb(a, sat, val);
      return rgbToHex(c.r, c.g, c.b);
    });
  }, [harmony, hue, sat, val, hex]);

  // Handle Hex typed manually
  const handleHexInputChange = (e) => {
    const valStr = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
    setHexInput(valStr);
    if (valStr.length === 6) {
      const parsedRgb = hexToRgb(valStr);
      const parsedHsv = rgbToHsv(parsedRgb.r, parsedRgb.g, parsedRgb.b);
      setHue(parsedHsv.h);
      setSat(parsedHsv.s);
      setVal(parsedHsv.v);
    }
  };

  // Select a shade or palette color directly
  const handleSelectColor = (selectedHex) => {
    const parsedRgb = hexToRgb(selectedHex);
    const parsedHsv = rgbToHsv(parsedRgb.r, parsedRgb.g, parsedRgb.b);
    setHue(parsedHsv.h);
    setSat(parsedHsv.s);
    setVal(parsedHsv.v);
  };

  // Copy with tooltip state
  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Real Native EyeDropper API picker
  const handleNativeEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          handleSelectColor(result.sRGBHex);
        }
      } catch (e) {
        // User cancelled picker, do nothing
      }
    }
  };

  // Dragging saturation/brightness
  const updatePickerFromEvent = useCallback((e) => {
    if (!pickerRef.current) return;
    const rect = pickerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

    const newSat = Math.round((x / rect.width) * 100);
    const newVal = Math.round((1 - y / rect.height) * 100);

    setSat(newSat);
    setVal(newVal);
  }, []);

  // Dragging hue slider
  const updateHueFromEvent = useCallback((e) => {
    if (!hueSliderRef.current) return;
    const rect = hueSliderRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const newHue = Math.round((x / rect.width) * 360);
    setHue(Math.min(360, Math.max(0, newHue)));
  }, []);

  // Global mouse / touch listeners for smooth dragging
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isDraggingPicker.current) {
        updatePickerFromEvent(e);
      } else if (isDraggingHue.current) {
        updateHueFromEvent(e);
      }
    };

    const handlePointerUp = () => {
      isDraggingPicker.current = false;
      isDraggingHue.current = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [updatePickerFromEvent, updateHueFromEvent]);

  // Random palette generator
  const generateRandomColor = useCallback(() => {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSat = Math.floor(Math.random() * 55) + 40; // 40 - 95%
    const randomVal = Math.floor(Math.random() * 50) + 45; // 45 - 95%
    setHue(randomHue);
    setSat(randomSat);
    setVal(randomVal);
  }, []);

  // Global Keyboard Shortcuts (Space for random, C for copy)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      if (e.code === "Space") {
        e.preventDefault();
        generateRandomColor();
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        copyToClipboard(hex, "keyboard_hex");
      } else if (e.key === "e" || e.key === "E") {
        e.preventDefault();
        setShowExportModal(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generateRandomColor, hex]);

  const filteredPalettes = useMemo(() => {
    if (paletteCategory === "All") return TRENDING_PALETTES;
    return TRENDING_PALETTES.filter((p) => p.category === paletteCategory);
  }, [paletteCategory]);

  // Download SVG Palette File
  const handleDownloadSvg = () => {
    const colors = harmonyPalette.length > 1 ? harmonyPalette : [hex];
    const width = 800;
    const height = 240;
    const swatchWidth = width / colors.length;

    let rects = "";
    colors.forEach((c, idx) => {
      rects += `
        <rect x="${idx * swatchWidth}" y="0" width="${swatchWidth}" height="${height}" fill="${c}" />
        <text x="${idx * swatchWidth + swatchWidth / 2}" y="${height - 24}" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.8))">${c}</text>
      `;
    });

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        ${rects}
      </svg>
    `;

    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `color-palette-${hex.replace("#", "")}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Determine if text on preview color should be light or dark
  const isDarkColor = useMemo(() => {
    const lum = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return lum < 0.55;
  }, [rgb]);

  return (
    <div className="w-full space-y-8">
      {/* Hero Header with Green Accent Tag */}
      <div className="text-left space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Interactive Color Workbench
        </div>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            HTML Color Codes
          </h1>
          <div className="text-xs text-gray-500 font-medium">
            Shortcuts: <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono font-semibold">Space</kbd> Random · <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono font-semibold">C</kbd> Copy · <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono font-semibold">E</kbd> Export
          </div>
        </div>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl leading-relaxed">
          Get HTML color codes, Hex color codes, RGB, HSL and OKLCH values with our color pickers, color wheel, color chart and HTML color names. Let's go!
        </p>
      </div>

      {/* Main Tool Container */}
      <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl shadow-xs overflow-hidden">
        
        {/* Top Values Bar with EyeDropper & Green Accents */}
        <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm bg-gray-50/40">
          
          {/* Swatch, EyeDropper & Values */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-5">
            {/* Swatch Pill & EyeDropper */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full border border-black/15 shadow-2xs shrink-0 transition-colors"
                style={{ backgroundColor: hex }}
              />
              {hasEyeDropper && (
                <button
                  onClick={handleNativeEyeDropper}
                  className="p-1 rounded-md text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                  title="Pick any color from your screen (EyeDropper)"
                >
                  <Pipette className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Hex */}
            <button
              onClick={() => copyToClipboard(hex, "hex")}
              className="flex items-center gap-1 text-gray-700 hover:text-emerald-700 font-mono text-xs cursor-pointer group"
              title="Click to copy HEX"
            >
              <span className="text-gray-400 font-sans font-semibold text-[11px]">Hex</span>
              <span className="font-bold text-gray-900 group-hover:text-emerald-700">{hex}</span>
              {copiedKey === "hex" || copiedKey === "keyboard_hex" ? (
                <Check className="w-3 h-3 text-emerald-600" />
              ) : (
                <Copy className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />
              )}
            </button>

            {/* RGB */}
            <button
              onClick={() => copyToClipboard(`${rgb.r}, ${rgb.g}, ${rgb.b}`, "rgb")}
              className="flex items-center gap-1 text-gray-700 hover:text-emerald-700 font-mono text-xs cursor-pointer group"
              title="Click to copy RGB"
            >
              <span className="text-gray-400 font-sans font-semibold text-[11px]">RGB</span>
              <span className="font-medium">{rgb.r}, {rgb.g}, {rgb.b}</span>
              {copiedKey === "rgb" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />}
            </button>

            {/* HSL */}
            <button
              onClick={() => copyToClipboard(`${hsl.h}, ${hsl.s}%, ${hsl.l}%`, "hsl")}
              className="flex items-center gap-1 text-gray-700 hover:text-emerald-700 font-mono text-xs cursor-pointer group hidden sm:flex"
              title="Click to copy HSL"
            >
              <span className="text-gray-400 font-sans font-semibold text-[11px]">HSL</span>
              <span className="font-medium">{hsl.h}, {hsl.s}%, {hsl.l}%</span>
              {copiedKey === "hsl" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />}
            </button>

            {/* OKLCH */}
            <button
              onClick={() => copyToClipboard(`${oklch.l}, ${oklch.c}, ${oklch.h}`, "oklch")}
              className="flex items-center gap-1 text-gray-700 hover:text-emerald-700 font-mono text-xs cursor-pointer group hidden md:flex"
              title="Click to copy OKLCH"
            >
              <span className="text-emerald-600 font-sans font-bold text-[11px]">OKLCH</span>
              <span className="font-medium">{oklch.l}, {oklch.c}, {oklch.h}</span>
              {copiedKey === "oklch" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />}
            </button>
          </div>

          {/* Right: Shade Strip & Export button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Interactive Shade Strip */}
            <div className="flex items-center rounded-sm overflow-hidden border border-gray-200">
              {shadeStrip.map((shadeHex, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectColor(shadeHex)}
                  title={`Select ${shadeHex}`}
                  className="w-3 sm:w-4 h-6 transition-transform hover:scale-125 hover:z-10 cursor-pointer"
                  style={{ backgroundColor: shadeHex }}
                />
              ))}
            </div>

            {/* Export & Share Action */}
            <button
              onClick={() => setShowExportModal(true)}
              className="p-1.5 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 transition-colors cursor-pointer"
              title="Export color formats"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Workspace: Left = 2D Surface, Right = Preview, Name & Accessibility */}
        <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column (7 cols): 2D Canvas + Hue Bar + Input */}
          <div className="md:col-span-7 space-y-4">
            
            {/* 2D Saturation / Brightness Canvas */}
            <div
              ref={pickerRef}
              onMouseDown={(e) => {
                isDraggingPicker.current = true;
                updatePickerFromEvent(e);
              }}
              onTouchStart={(e) => {
                isDraggingPicker.current = true;
                updatePickerFromEvent(e);
              }}
              className="relative w-full h-56 sm:h-72 rounded-xl cursor-crosshair overflow-hidden select-none border border-gray-200 shadow-inner"
              style={{
                backgroundColor: `hsl(${hue}, 100%, 50%)`,
                backgroundImage: `
                  linear-gradient(to top, #000000, transparent),
                  linear-gradient(to right, #ffffff, transparent)
                `,
              }}
            >
              {/* Circular Target Selector */}
              <div
                className="absolute w-5 h-5 rounded-full border-2 border-white shadow-[0_0_2px_rgba(0,0,0,0.8)] -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform"
                style={{
                  left: `${sat}%`,
                  top: `${100 - val}%`,
                  backgroundColor: hex,
                }}
              />
            </div>

            {/* Hue Rainbow Slider Bar */}
            <div className="space-y-1.5 pt-1">
              <div
                ref={hueSliderRef}
                onMouseDown={(e) => {
                  isDraggingHue.current = true;
                  updateHueFromEvent(e);
                }}
                onTouchStart={(e) => {
                  isDraggingHue.current = true;
                  updateHueFromEvent(e);
                }}
                className="relative w-full h-4 sm:h-5 rounded-full cursor-pointer select-none border border-gray-200 shadow-2xs"
                style={{
                  background: `linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)`,
                }}
              >
                {/* Thumb Indicator */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-emerald-600 shadow-xs -translate-x-1/2 pointer-events-none"
                  style={{ left: `${(hue / 360) * 100}%` }}
                />
              </div>
            </div>

            {/* Bottom Input Row: Hex Input + Name Tag + Copy */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 bg-white focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 shadow-2xs">
                <span
                  className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-gray-400 font-mono text-sm font-medium">#</span>
                <input
                  type="text"
                  value={hexInput}
                  onChange={handleHexInputChange}
                  maxLength={6}
                  className="w-20 font-mono text-sm font-bold uppercase text-gray-900 focus:outline-hidden"
                  placeholder="059669"
                />
                <button
                  onClick={() => copyToClipboard(hex, "hex_input")}
                  className="text-gray-400 hover:text-emerald-700 ml-1 p-0.5 cursor-pointer"
                  title="Copy Hex"
                >
                  {copiedKey === "hex_input" ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Real-time Color Name Badge */}
              <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                <span className="text-gray-400 text-[11px] font-semibold">Named:</span>
                <span className="font-bold text-gray-900">{colorName}</span>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Live Preview, Harmonies & Real Accessibility Badge */}
          <div className="md:col-span-5 space-y-4 flex flex-col h-full">
            
            {/* Harmony Dropdown with Green Outline */}
            <div className="relative">
              <select
                value={harmony}
                onChange={(e) => setHarmony(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 appearance-none focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 cursor-pointer shadow-2xs"
              >
                <option value="none">No Harmony (Single Color)</option>
                <option value="complementary">Complementary (180°)</option>
                <option value="analogous">Analogous (±30° Harmony)</option>
                <option value="triadic">Triadic (120° Balance)</option>
                <option value="tetradic">Tetradic (90° Quad)</option>
                <option value="split">Split Complementary (150°)</option>
                <option value="monochromatic">Monochromatic (Tone Steps)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Large Color Preview Box */}
            <div
              className="w-full h-40 sm:h-48 rounded-xl flex flex-col items-center justify-center border border-black/5 shadow-inner transition-colors duration-200 select-none p-4"
              style={{ backgroundColor: hex }}
            >
              <span
                className={`font-mono text-2xl sm:text-3xl font-extrabold tracking-wider ${
                  isDarkColor ? "text-white" : "text-gray-900"
                }`}
              >
                {hex.replace("#", "")}
              </span>
              <span
                className={`text-xs font-medium tracking-wide mt-1 opacity-80 ${
                  isDarkColor ? "text-white/80" : "text-gray-800"
                }`}
              >
                {colorName}
              </span>
            </div>

            {/* Live Accessibility & Legibility Meter */}
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  WCAG Contrast
                </span>
                <span className="text-gray-500 font-normal">Score</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-gray-500 font-medium">On White</span>
                  <span className={`font-mono font-bold ${accessibilityScores.whiteAA ? "text-emerald-700" : "text-amber-700"}`}>
                    {accessibilityScores.whiteRatio}:1 {accessibilityScores.whiteAA ? "AA ✓" : "Fail"}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-gray-500 font-medium">On Black</span>
                  <span className={`font-mono font-bold ${accessibilityScores.blackAA ? "text-emerald-700" : "text-amber-700"}`}>
                    {accessibilityScores.blackRatio}:1 {accessibilityScores.blackAA ? "AA ✓" : "Fail"}
                  </span>
                </div>
              </div>
            </div>

            {/* If a harmony is chosen: show harmony swatches */}
            {harmony !== "none" && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  {harmony} Palette
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {harmonyPalette.map((col, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectColor(col)}
                      className="group flex flex-col items-center gap-1 cursor-pointer"
                      title={`Select ${col}`}
                    >
                      <div
                        className="w-full h-8 rounded-md border border-gray-200 shadow-2xs group-hover:scale-105 group-hover:border-emerald-500 transition-all"
                        style={{ backgroundColor: col }}
                      />
                      <span className="text-[10px] font-mono text-gray-500 group-hover:text-emerald-700 font-semibold">
                        {col.replace("#", "")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons: Random palette & Export colors */}
            <div className="grid grid-cols-2 gap-3 pt-2 mt-auto">
              <button
                onClick={generateRandomColor}
                className="py-2.5 px-3 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
                Random
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Export Colors
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Live Component UI Playground */}
      <UiLivePreview hex={hex} colorName={colorName} colorMood={colorMood} />

      {/* Trending & Curated Palettes Feature Section */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-emerald-600" />
              Popular Curated Palettes
            </h2>
            <p className="text-xs text-gray-500">
              Click any color swatch to load it into the workbench immediately.
            </p>
          </div>

          {/* Palette Mood Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {["All", "Modern UI", "Pastel", "Cyberpunk", "Earthy", "Dark Mode"].map((cat) => (
              <button
                key={cat}
                onClick={() => setPaletteCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  paletteCategory === cat
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {filteredPalettes.map((pal) => (
            <div
              key={pal.name}
              className="p-3 bg-white border border-gray-200 rounded-xl space-y-2 hover:border-emerald-300 hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between text-xs font-bold text-gray-800">
                <span className="truncate">{pal.name}</span>
                <span className="text-[10px] text-gray-400 font-normal">{pal.category}</span>
              </div>
              <div className="flex h-6 rounded-md overflow-hidden border border-gray-200">
                {pal.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleSelectColor(c)}
                    className="flex-1 h-full hover:opacity-85 transition-opacity cursor-pointer"
                    style={{ backgroundColor: c }}
                    title={`Select ${c}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Export Modal with SVG download & CSS tokens */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-gray-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: hex }} />
                <h3 className="text-base font-bold text-gray-900">Export Color Palette</h3>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-[11px] font-sans font-semibold text-gray-500">HEX Code</span>
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="font-bold">{hex}</span>
                  <button
                    onClick={() => copyToClipboard(hex, "modal_hex")}
                    className="text-emerald-700 hover:text-emerald-800 font-sans text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "modal_hex" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-sans font-semibold text-gray-500">CSS Custom Property</span>
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <span>--color-primary: {hex};</span>
                  <button
                    onClick={() => copyToClipboard(`--color-primary: ${hex};`, "modal_css")}
                    className="text-emerald-700 hover:text-emerald-800 font-sans text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "modal_css" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-sans font-semibold text-gray-500">Tailwind Config (CSS / JS)</span>
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <span>primary: '{hex}',</span>
                  <button
                    onClick={() => copyToClipboard(`primary: '${hex}',`, "modal_tw")}
                    className="text-emerald-700 hover:text-emerald-800 font-sans text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "modal_tw" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-sans font-semibold text-gray-500">Modern CSS OKLCH</span>
                <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                  <span>oklch({oklch.l} {oklch.c} {oklch.h})</span>
                  <button
                    onClick={() => copyToClipboard(`oklch(${oklch.l} ${oklch.c} ${oklch.h})`, "modal_oklch")}
                    className="text-emerald-700 hover:text-emerald-800 font-sans text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === "modal_oklch" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions in Modal */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDownloadSvg}
                className="py-2.5 px-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                Download SVG
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="py-2.5 px-3 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Cards: Explore All Tools */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Explore All Color Tools
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            100% Free · Client-Side
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/tools/gradient-generator"
            className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              CSS Gradients
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Multi-stop linear and radial gradient builder.
            </p>
          </Link>

          <Link
            href="/tools/palette-generator"
            className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              Palette Builder
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Generate analogous, triadic, and complementary palettes.
            </p>
          </Link>

          <Link
            href="/tools/contrast-checker"
            className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              Contrast Checker
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Verify WCAG 2.1 AA and AAA accessibility contrast.
            </p>
          </Link>

          <Link
            href="/tools/color-extractor"
            className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              Image Extractor
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Extract dominant palette swatches directly from photos.
            </p>
          </Link>

          <Link
            href="/tools/shades-tints-generator"
            className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              Color Chart
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              10-step lighter tints and darker shades chart.
            </p>
          </Link>

          <Link
            href="/tools/tailwind-color-reference"
            className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              Tailwind Map
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Complete reference for Tailwind CSS default colors.
            </p>
          </Link>

          <Link
            href="/tools/color-blindness-simulator"
            className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              Blindness Sim
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Simulate 8 color vision deficiency modes.
            </p>
          </Link>

          <Link
            href="/blog"
            className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
              Color Guides
            </div>
            <p className="text-[11px] text-gray-500 mt-1 leading-snug">
              Deep dive articles on color theory & accessibility.
            </p>
          </Link>
        </div>
      </section>

      {/* Interactive Tool Demos & Feature Highlights */}
      <FeatureDemos />

      {/* Comprehensive Guides, Workflow, Comparison Table & Visible Interactive FAQs */}
      <HomeFaqAndGuides />
    </div>
  );
}
