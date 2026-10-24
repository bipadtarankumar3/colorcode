"use client";

import { ShieldCheck, ChevronDown, Sparkles, BookOpen, User, HelpCircle, Menu, X, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // Initialize status
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Navbar Container */}
      <div 
        className={cn(
          "w-full h-16 flex items-center justify-center border-b transition-all duration-300 ease-in-out",
          isScrolled 
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-slate-200/80 dark:border-slate-800 shadow-sm" 
            : "bg-transparent border-transparent"
        )}
      >
        <div className="w-full max-w-7xl px-2 sm:px-3 md:px-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer z-50">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-black shadow-md border border-slate-800/80 group-hover:scale-105 transition-all flex items-center justify-center p-0.5">
              <img 
                src="/logo.png" 
                alt="Revoxera Logo" 
                className="w-full h-full object-cover rounded-[10px]" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black tracking-tight text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                COLOR CODE
              </span>
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider -mt-1 hidden sm:block uppercase">
                BY REVOXERA
              </span>
            </div>
          </Link>

          {/* Nav Items & Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {/* Tools Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <button className="flex items-center gap-1 text-xs font-black opacity-70 hover:opacity-100 transition-all tracking-widest uppercase cursor-pointer py-4 text-slate-700 dark:text-slate-200">
                  Tools <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl p-4 w-64 grid gap-1.5">
                    {tools.map((t) => (
                      <Link 
                        key={t.name}
                        href={t.href}
                        className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href="/guides" 
                className="flex items-center gap-1.5 text-xs font-black opacity-70 hover:opacity-100 transition-all tracking-widest uppercase text-slate-700 dark:text-slate-200"
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

            {/* Privacy Badge */}
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-3 py-2 rounded-full border border-emerald-500/20 shadow-sm z-50">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="tracking-widest hidden md:block">PRIVACY FOCUSED</span>
            </div>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all z-50 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-800 dark:text-slate-100" /> : <Menu className="w-5 h-5 text-slate-800 dark:text-slate-100" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 shadow-2xl p-6 z-40 max-h-[85vh] overflow-y-auto space-y-6"
          >
            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-4">
              
              {/* Tools Expandable Section */}
              <div className="border-b border-slate-100 dark:border-slate-900 pb-4 space-y-3">
                <button 
                  onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                  className="flex items-center justify-between w-full text-xs font-black tracking-widest uppercase opacity-80"
                >
                  <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-emerald-500" /> Tools</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform text-slate-400", isMobileToolsOpen && "rotate-180")} />
                </button>
                
                {isMobileToolsOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 pt-2">
                    {tools.map((t) => (
                      <Link 
                        key={t.name}
                        href={t.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Guides */}
              <Link 
                href="/guides" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-black tracking-widest uppercase border-b border-slate-100 dark:border-slate-900 pb-4 opacity-80"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                Guides
              </Link>

              {/* About */}
              <Link 
                href="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-black tracking-widest uppercase border-b border-slate-100 dark:border-slate-900 pb-4 opacity-80"
              >
                <User className="w-3.5 h-3.5 text-emerald-500" />
                About
              </Link>

              {/* Contact */}
              <Link 
                href="/contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-black tracking-widest uppercase opacity-80"
              >
                <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
