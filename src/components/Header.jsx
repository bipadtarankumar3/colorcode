"use client";

import { ShieldCheck, ChevronDown, Sparkles, BookOpen, User, HelpCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    { name: "Gradient Generator", href: "/tools/gradient-generator" },
    { name: "Palette Builder", href: "/tools/palette-generator" },
    { name: "Tailwind Color Reference", href: "/tools/tailwind-color-reference" },
    { name: "Image Color Extractor", href: "/tools/color-extractor" },
    { name: "WCAG Contrast Checker", href: "/tools/contrast-checker" },
    { name: "Color Details Converter", href: "/tools/color-converter-details" },
    { name: "Shades & Tints Generator", href: "/tools/shades-tints-generator" },
    { name: "Blindness Simulator", href: "/tools/color-blindness-simulator" },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="w-full h-16 glass flex items-center justify-center shadow-xl border-b border-white/20 bg-white/40">
        <div className="w-full max-w-6xl px-6 md:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 md:gap-4 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <img src="/logo.png" alt="Color Code Logo" className="w-full h-full object-cover invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0 contrast-125 dark:contrast-100 saturate-150 dark:saturate-100 rounded-xl" />
            </div>
            <span className="font-sans font-black tracking-tighter text-sm hidden md:block text-slate-800 dark:text-slate-100">COLOR CODE</span>
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden md:flex items-center gap-6">
              {/* Tools Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <button className="flex items-center gap-1 text-xs font-black opacity-60 hover:opacity-100 transition-all tracking-widest uppercase cursor-pointer py-4">
                  Tools <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white/95 dark:bg-slate-900/95 border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl p-4 w-64 grid gap-2 backdrop-blur-xl">
                    {tools.map((t) => (
                      <Link 
                        key={t.name}
                        href={t.href}
                        className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href="/guides/wcag-contrast-standards" 
                className="flex items-center gap-1.5 text-xs font-black opacity-60 hover:opacity-100 transition-all tracking-widest uppercase"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Guides
              </Link>
              <Link 
                href="/about" 
                className="flex items-center gap-1.5 text-xs font-black opacity-60 hover:opacity-100 transition-all tracking-widest uppercase"
              >
                <User className="w-3.5 h-3.5" />
                About
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center gap-1.5 text-xs font-black opacity-60 hover:opacity-100 transition-all tracking-widest uppercase"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 bg-indigo-500/10 px-3 md:px-4 py-2 rounded-full border border-indigo-500/20 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="tracking-widest hidden sm:block">DEMO VERSION</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
