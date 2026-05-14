"use client";
/* eslint-disable @next/next/no-img-element */

import { GlassCard } from "../ui/GlassCard";
import { Upload, Copy, Image as ImageIcon, MousePointer2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import confetti from "canvas-confetti";

export function ImageExtractor() {
  const [image, setImage] = useState(null);
  const [colors, setColors] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);

  const extractColors = useCallback((imgElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    
    // Scale canvas to reasonable size for processing
    const maxWidth = 200;
    const scale = maxWidth / imgElement.width;
    canvas.width = maxWidth;
    canvas.height = imgElement.height * scale;
    
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    // Simple sampling logic (grid-based)
    const samples = [];
    const step = 20; // Sample every 20 pixels
    
    for (let i = 0; i < imageData.length; i += 4 * step) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      samples.push(hex);
    }
    
    // Count frequencies and take top 10 unique-ish colors
    const counts = {};
    samples.forEach(c => counts[c] = (counts[c] || 0) + 1);
    const sorted = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    
    setColors(sorted.slice(0, 10));
  }, []);

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

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: [hex]
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Upload & Preview */}
        <div className="md:col-span-8 space-y-6">
          <div 
            className={`h-[400px] w-full rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 relative overflow-hidden ${
              isDragging ? "border-blue-500 bg-blue-500/10" : "border-white/20 bg-white/5"
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
              <>
                <img src={image} className="absolute inset-0 w-full h-full object-contain" alt="Uploaded" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button 
                    onClick={() => { setImage(null); setColors([]); }}
                    className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold shadow-xl"
                   >
                     Remove
                   </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
                  <Upload className="w-8 h-8 opacity-40" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold opacity-80">Drop image here</p>
                  <p className="text-sm opacity-40">or click to browse from device</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            )}
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Results */}
        <div className="md:col-span-4 space-y-6">
          <GlassCard className="h-full flex flex-col gap-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-green-500" />
                Extracted Palette
              </h3>
              <p className="text-sm opacity-40">Dominant colors found in image.</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              {colors.length > 0 ? colors.map((color, i) => (
                <div 
                  key={i} 
                  className="group flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  onClick={() => copyColor(color)}
                >
                  <div 
                    className="w-12 h-12 rounded-xl shadow-lg border border-white/20"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1">
                    <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Hex Code</p>
                    <p className="font-mono text-sm font-bold opacity-80 uppercase">{color}</p>
                  </div>
                  <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )) : (
                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center gap-4 py-12">
                   <MousePointer2 className="w-12 h-12" />
                   <p className="text-sm font-medium">Upload an image to<br/>extract colors</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
