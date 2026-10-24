"use client";
/* eslint-disable @next/next/no-img-element */

import { GlassCard } from "../ui/GlassCard";
import { Upload, Copy, Image as ImageIcon, Sparkles, Check, Download } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import confetti from "canvas-confetti";
import { selectColor } from "@/lib/utils";

const SAMPLE_IMAGES = [
  {
    name: "Sunset Gradient",
    // Clean abstract SVG data URL
    url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><defs><linearGradient id='g1' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23ff512f'/><stop offset='50%' stop-color='%23f093fb'/><stop offset='100%' stop-color='%236366f1'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g1)'/><circle cx='100' cy='120' r='60' fill='%23fef08a' opacity='0.8'/><circle cx='300' cy='200' r='75' fill='%2338bdf8' opacity='0.7'/></svg>"
  },
  {
    name: "Emerald Forest",
    url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><defs><linearGradient id='g2' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23064e3b'/><stop offset='50%' stop-color='%2310b981'/><stop offset='100%' stop-color='%23a7f3d0'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g2)'/><rect x='50' y='50' width='140' height='180' rx='20' fill='%23022c22' opacity='0.6'/><circle cx='280' cy='150' r='60' fill='%23facc15' opacity='0.85'/></svg>"
  },
  {
    name: "Neon Cyberpunk",
    url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><defs><linearGradient id='g3' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%230f172a'/><stop offset='50%' stop-color='%23831843'/><stop offset='100%' stop-color='%230284c7'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g3)'/><polygon points='200,40 320,240 80,240' fill='%23ec4899' opacity='0.8'/><circle cx='200' cy='160' r='45' fill='%2306b6d4' opacity='0.85'/></svg>"
  }
];

export function ImageExtractor() {
  const [image, setImage] = useState(SAMPLE_IMAGES[0].url);
  const [colors, setColors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedColor, setCopiedColor] = useState(null);
  const [allCopied, setAllCopied] = useState(false);
  const canvasRef = useRef(null);

  const extractColors = useCallback((imgElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    // Scale canvas
    const maxWidth = 160;
    const scale = maxWidth / (imgElement.naturalWidth || imgElement.width || 400);
    canvas.width = maxWidth;
    canvas.height = Math.max(1, Math.round((imgElement.naturalHeight || imgElement.height || 300) * scale));
    
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    const samples = [];
    const step = 8;
    
    for (let i = 0; i < imageData.length; i += 4 * step) {
      const alpha = imageData[i + 3];
      if (alpha < 128) continue;
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      // Quantize slightly (round to nearest multiple of 8)
      const qR = Math.round(r / 12) * 12;
      const qG = Math.round(g / 12) * 12;
      const qB = Math.round(b / 12) * 12;
      const hex = `#${((1 << 24) + (qR << 16) + (qG << 8) + qB).toString(16).slice(1)}`;
      samples.push(hex);
    }
    
    const counts = {};
    samples.forEach(c => counts[c] = (counts[c] || 0) + 1);
    const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    
    setColors(sorted.slice(0, 10));
  }, []);

  // Run extract on initial mount with sample image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => extractColors(img);
    img.src = SAMPLE_IMAGES[0].url;
  }, [extractColors]);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(event.target.result);
        extractColors(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const loadSample = (sample) => {
    setImage(sample.url);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => extractColors(img);
    img.src = sample.url;
  };

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    selectColor(hex);
    setCopiedColor(hex);
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.8 },
      colors: [hex]
    });
    setTimeout(() => setCopiedColor(null), 1800);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(JSON.stringify(colors, null, 2));
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {/* Preset Samples */}
      <GlassCard className="p-3 bg-white/70 dark:bg-slate-900/70">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 whitespace-nowrap pl-2">
            Try Sample:
          </span>
          {SAMPLE_IMAGES.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => loadSample(s)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-700 dark:text-slate-300"
            >
              {s.name}
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload & Image Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div 
            className={`min-h-[320px] sm:min-h-[380px] w-full rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 relative overflow-hidden ${
              isDragging ? "border-emerald-500 bg-emerald-500/10" : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50"
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const img = new Image();
                  img.onload = () => {
                    setImage(ev.target.result);
                    extractColors(img);
                  };
                  img.src = ev.target.result;
                };
                reader.readAsDataURL(file);
              }
            }}
          >
            {image ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img 
                  src={image} 
                  alt="Extracted asset" 
                  className="max-h-[320px] rounded-2xl object-contain shadow-lg"
                />
                <label className="absolute bottom-3 right-3 bg-white/90 dark:bg-slate-900/90 hover:bg-white text-slate-800 dark:text-slate-100 px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                  <Upload className="w-3.5 h-3.5" /> Change Image
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Drag and drop your image here</h4>
                  <p className="text-xs text-slate-400">PNG, JPG, WebP, or SVG</p>
                </div>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md">
                  <Upload className="w-4 h-4" /> Browse File
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Extracted Swatches Column */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard className="p-5 sm:p-6 bg-white/70 dark:bg-slate-900/70 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> Dominant Colors
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">Client-side extract</span>
              </div>
              {colors.length > 0 && (
                <button
                  type="button"
                  onClick={copyAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
                >
                  {allCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {allCopied ? "Copied Array" : "Copy All"}
                </button>
              )}
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
              {colors.map((color, i) => {
                const isCopied = copiedColor === color;
                return (
                  <button
                    key={color + i}
                    type="button"
                    onClick={() => copyColor(color)}
                    className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:scale-[1.02] active:scale-95 transition-all text-left cursor-pointer group"
                  >
                    <span 
                      className="w-9 h-9 rounded-lg shadow-sm border border-black/10 shrink-0" 
                      style={{ backgroundColor: color }}
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider block">
                        Color {i + 1}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-100 uppercase truncate block">
                        {color}
                      </span>
                    </div>
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mr-1 animate-scale-in" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-300 group-hover:text-emerald-500 shrink-0 mr-1 transition-colors" />
                    )}
                  </button>
                );
              })}
            </div>

            {colors.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-8">
                Upload an image or pick a sample above to extract colors
              </p>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
