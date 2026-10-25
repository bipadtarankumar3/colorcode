"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, RefreshCw, Download, Image as ImageIcon } from "lucide-react";

export function FeatureDemos() {
  const [wheelHue, setWheelHue] = useState(25);
  const [wheelHarmony, setWheelHarmony] = useState("analogous");
  const [copiedHex, setCopiedHex] = useState(null);

  const copyCode = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const sampleNames = [
    { name: "IndianRed", hex: "CD5C5C", rgb: "205, 92, 92", hsl: "0, 53, 58" },
    { name: "LightCoral", hex: "F08080", rgb: "240, 128, 128", hsl: "0, 79, 72" },
    { name: "Salmon", hex: "FA8072", rgb: "250, 128, 114", hsl: "6, 93, 71" },
    { name: "DarkSalmon", hex: "E9967A", rgb: "233, 150, 122", hsl: "15, 72, 70" },
    { name: "LightSalmon", hex: "FFA07A", rgb: "255, 160, 122", hsl: "17, 100, 74" },
    { name: "EmeraldGreen", hex: "059669", rgb: "5, 150, 105", hsl: "161, 94, 30" },
    { name: "RoyalBlue", hex: "4169E1", rgb: "65, 105, 225", hsl: "225, 73, 57" },
  ];

  // Demo grid matrix colors for Color Chart
  const chartMatrix = [
    ["#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350", "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c"],
    ["#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726", "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100"],
    ["#fffde7", "#fff9c4", "#fff59d", "#fff176", "#ffee58", "#ffeb3b", "#fdd835", "#fbc02d", "#f9a825", "#f57f17"],
    ["#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a", "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"],
    ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da", "#00bcd4", "#00acc1", "#0097a7", "#00838f", "#006064"],
    ["#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5", "#2196f3", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1"],
    ["#ede7f6", "#d1c4e9", "#b39ddb", "#9575cd", "#7e57c2", "#673ab7", "#5e35b1", "#512da8", "#4527a0", "#311b92"],
    ["#fce4ec", "#f8bbd0", "#f48fb1", "#f06292", "#ec407a", "#e91e63", "#d81b60", "#c2185b", "#ad1457", "#880e4f"],
    ["#eceff1", "#cfd8dc", "#b0bec5", "#90a4ae", "#78909c", "#607d8b", "#546e7a", "#455a64", "#37474f", "#263238"],
  ];

  return (
    <div className="w-full space-y-20 pt-16 border-t border-gray-200">
      
      {/* ─────────────────────────────────────────────────────────────
          DEMO 1: IMAGE COLOR PICKER
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Visual Mockup */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-6">
            
            {/* Visual Image Card with Pin Points */}
            <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden shadow-inner border border-gray-200 flex items-center justify-center bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400">
              {/* Geometric pattern texture */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, #fff 10%, transparent 20%), radial-gradient(circle at 80% 70%, #000 15%, transparent 30%)`,
                }}
              />

              {/* Photo Upload Icon Tag */}
              <div className="absolute top-4 left-4 p-2.5 rounded-xl bg-white shadow-md border border-gray-200">
                <ImageIcon className="w-5 h-5 text-gray-700" />
              </div>

              {/* Sample Pin Rings */}
              <div className="absolute top-8 right-16 w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="absolute top-20 left-28 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="absolute bottom-24 right-32 w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="absolute bottom-12 left-36 w-8 h-8 rounded-full border-3 border-black bg-rose-600 shadow-xl flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white" />
              </div>

              {/* Copy Floating Pill */}
              <button 
                onClick={() => copyCode("#F54927")}
                className="absolute bottom-16 right-8 px-4 py-2 bg-gray-950/90 text-white rounded-lg text-xs font-bold shadow-xl border border-white/20 flex items-center gap-1.5 hover:bg-black transition-all cursor-pointer"
              >
                {copiedHex === "#F54927" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>

            {/* Extracted Swatch Bar */}
            <div className="flex h-12 rounded-xl overflow-hidden border border-gray-200 shadow-xs">
              <div className="flex-1 bg-[#FFD100] flex items-center justify-center" />
              <div className="flex-1 bg-[#FF9000] flex items-center justify-center" />
              <div className="flex-1 bg-[#FF4500] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="flex-1 bg-[#D60036] flex items-center justify-center" />
              <div className="flex-1 bg-[#90002A] flex items-center justify-center" />
            </div>

          </div>
        </div>

        {/* Right Column: Copy & Action */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Image Color Picker
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Transform your photos into a palette of inspiration! Upload an image, click to capture exact color values, and instantly generate complementary palettes that bring your designs together.
          </p>
          <div className="pt-2">
            <Link
              href="/tools/color-extractor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f05a28] hover:bg-[#d94819] text-white text-sm font-bold shadow-sm transition-all hover:gap-3 cursor-pointer"
            >
              <span>Extract colors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DEMO 2: COLOR WHEEL
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Visual Mockup */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 bg-white border border-gray-200 rounded-2xl shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-6">
            
            {/* Left: Interactive Circular Color Wheel */}
            <div className="sm:col-span-6 flex flex-col items-center justify-between space-y-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 flex items-center justify-center shadow-md border border-gray-200 bg-white">
                {/* Outer Hue Ring */}
                <div 
                  className="w-full h-full rounded-full relative flex items-center justify-center p-3 shadow-inner"
                  style={{
                    background: `conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`,
                  }}
                >
                  {/* Inner Lightness/Saturation Disc */}
                  <div 
                    className="w-full h-full rounded-full relative flex items-center justify-center"
                    style={{
                      background: `radial-gradient(circle, #ffffff 10%, transparent 80%)`,
                    }}
                  >
                    {/* Harmony Pointer Markers */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-3 border-white bg-[#F54927] shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div className="absolute top-8 left-10 w-4 h-4 rounded-full border-2 border-white shadow-xs" />
                    <div className="absolute top-8 right-10 w-4 h-4 rounded-full border-2 border-white shadow-xs" />
                  </div>
                </div>
              </div>

              {/* Input field below wheel */}
              <div className="w-full flex items-center justify-between border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#F54927]" />
                  <span className="font-mono font-bold text-gray-800"># F54927</span>
                </div>
                <button 
                  onClick={() => copyCode("#F54927")}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Buttons */}
              <div className="w-full grid grid-cols-2 gap-2">
                <Link
                  href="/tools/palette-generator"
                  className="py-2 text-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-semibold"
                >
                  Random palette
                </Link>
                <Link
                  href="/tools/palette-generator"
                  className="py-2 text-center rounded-lg bg-gray-900 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Export colors
                </Link>
              </div>
            </div>

            {/* Right: Harmony Selector & 3 Vertical Swatch Blocks */}
            <div className="sm:col-span-6 flex flex-col space-y-3">
              <div className="border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 bg-white flex items-center justify-between">
                <span>Analogous</span>
                <span className="text-gray-400">▾</span>
              </div>

              <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-gray-200 shadow-inner min-h-[220px]">
                <div className="flex-1 bg-[#F5276C] flex items-center justify-center text-white font-mono font-bold text-sm tracking-wider">
                  F5276C
                </div>
                <div className="flex-1 bg-[#F54927] flex items-center justify-center text-white font-mono font-bold text-sm tracking-wider">
                  F54927
                </div>
                <div className="flex-1 bg-[#F5B027] flex items-center justify-center text-gray-900 font-mono font-bold text-sm tracking-wider">
                  F5B027
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Copy & Action */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Color Wheel
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Discover a vibrant spectrum with our interactive color wheel. Adjust hue and lightness to explore harmonious combinations that spark creativity and enhance your design projects.
          </p>
          <div className="pt-2">
            <Link
              href="/tools/palette-generator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f05a28] hover:bg-[#d94819] text-white text-sm font-bold shadow-sm transition-all hover:gap-3 cursor-pointer"
            >
              <span>Find a harmony</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DEMO 3: COLOR CHART
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Visual Mockup */}
        <div className="lg:col-span-7">
          <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-xs">
            {/* Matrix of colors */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-xs">
              <div className="grid grid-cols-10 gap-0">
                {chartMatrix.flat().map((c, i) => (
                  <button
                    key={i}
                    onClick={() => copyCode(c)}
                    className="h-7 sm:h-9 w-full hover:scale-125 hover:z-10 transition-transform cursor-pointer relative group"
                    style={{ backgroundColor: c }}
                    title={`Click to copy ${c}`}
                  />
                ))}
              </div>
            </div>
            {copiedHex && (
              <div className="text-center text-xs font-mono font-semibold text-emerald-700 pt-3">
                Copied {copiedHex} to clipboard!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Copy & Action */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Color Chart
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Looking for some already great color combinations? Our color chart features Tailwind CSS, flat design, Google's Material design and the classic web safe color palette, all with Hex color codes.
          </p>
          <div className="pt-2">
            <Link
              href="/tools/shades-tints-generator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f05a28] hover:bg-[#d94819] text-white text-sm font-bold shadow-sm transition-all hover:gap-3 cursor-pointer"
            >
              <span>View the charts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          DEMO 4: HTML COLOR NAMES
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Clean Table */}
        <div className="lg:col-span-7">
          <div className="p-4 sm:p-6 bg-white border border-gray-200 rounded-2xl shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 font-semibold">
                  <th className="pb-3 px-2">Color</th>
                  <th className="pb-3 px-2">Name</th>
                  <th className="pb-3 px-2">Hex code</th>
                  <th className="pb-3 px-2">RGB code</th>
                  <th className="pb-3 px-2">HSL code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono text-xs">
                {sampleNames.map((item) => (
                  <tr key={item.name} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-2.5 px-2">
                      <span
                        className="inline-block w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: `#${item.hex}` }}
                      />
                    </td>
                    <td className="py-2.5 px-2 font-sans font-semibold text-gray-900">
                      {item.name}
                    </td>
                    <td className="py-2.5 px-2 font-bold text-gray-700">
                      <button
                        onClick={() => copyCode(`#${item.hex}`)}
                        className="hover:text-emerald-700 cursor-pointer"
                        title="Click to copy"
                      >
                        {item.hex}
                      </button>
                    </td>
                    <td className="py-2.5 px-2 text-gray-600">
                      {item.rgb}
                    </td>
                    <td className="py-2.5 px-2 text-gray-600">
                      {item.hsl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Copy & Action */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Color Names
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Can't remember all 140 HTML color names? We've got you covered, check out our guide for a quick reference of all the HTML color names grouped by color (plus a few extra fun lists).
          </p>
          <div className="pt-2">
            <Link
              href="/tools/tailwind-color-reference"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f05a28] hover:bg-[#d94819] text-white text-sm font-bold shadow-sm transition-all hover:gap-3 cursor-pointer"
            >
              <span>Browse the list</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
