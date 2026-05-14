"use client";

import { ShieldCheck, ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";

export function Header() {
  return (
    <header className="w-full sticky top-0 z-50">
      <div className="w-full h-16 glass flex items-center justify-center shadow-xl border-b border-white/20 bg-white/40">
        <div className="w-full max-w-6xl px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
            {/* Demo Logo SVG */}
            <div className="relative w-9 h-9 md:w-11 md:h-11 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-xl blur-[2px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full drop-shadow-2xl"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="24" fill="url(#logo-grad)" />
                <path 
                  d="M30 70C30 70 35 40 50 40C65 40 70 70 70 70" 
                  stroke="white" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                />
                <circle cx="50" cy="55" r="12" fill="white" fillOpacity="0.2" />
                <path 
                  d="M45 25L55 35M55 25L45 35" 
                  stroke="white" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                />
                <defs>
                  <linearGradient id="logo-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4F46E5" />
                    <stop offset="1" stopColor="#9333EA" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black tracking-tighter uppercase text-black/80">
                Color Beast
              </span>
              <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-40">Pro Suite</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 bg-indigo-500/10 px-3 md:px-4 py-2 rounded-full border border-indigo-500/20 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="tracking-widest hidden sm:block">DEMO VERSION</span>
            </div>
            
            <nav className="flex items-center gap-6">
              <a 
                href="#" 
                className="group flex items-center gap-1.5 text-xs font-black opacity-40 hover:opacity-100 transition-all tracking-widest"
              >
                DOCS
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
