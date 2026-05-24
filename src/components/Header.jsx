"use client";

import { ShieldCheck, ExternalLink } from "lucide-react";
import { cn } from "../lib/utils";
import Link from "next/link";

export function Header() {
  return (
    <header className="w-full sticky top-0 z-50">
      <div className="w-full h-16 glass flex items-center justify-center shadow-xl border-b border-white/20 bg-white/40">
        <div className="w-full max-w-6xl px-6 md:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group cursor-pointer">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <img src="/logo.png" alt="Color Beast Logo" className="w-full h-full object-cover invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0 contrast-125 dark:contrast-100 saturate-150 dark:saturate-100 rounded-xl" />
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 bg-indigo-500/10 px-3 md:px-4 py-2 rounded-full border border-indigo-500/20 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="tracking-widest hidden sm:block">DEMO VERSION</span>
            </div>
            
            <nav className="flex items-center gap-6">
              <a 
                href="https://tools.orbytara.com/services" 
                className="group flex items-center gap-1.5 text-xs font-black opacity-40 hover:opacity-100 transition-all tracking-widest"
              >
                SERVICES
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
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
