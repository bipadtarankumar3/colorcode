"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Pipette, 
  Zap, 
  Palette, 
  Camera, 
  Eye, 
  Layers, 
  Box, 
  Accessibility, 
  BookOpen, 
  Menu, 
  X,
  Sparkles,
  Info,
  Mail
} from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const mainNav = [
    { name: "Picker", href: "/", icon: Pipette },
    { name: "Gradients", href: "/tools/gradient-generator", icon: Zap },
    { name: "Palettes", href: "/tools/palette-generator", icon: Palette },
    { name: "Extractor", href: "/tools/color-extractor", icon: Camera },
    { name: "Contrast", href: "/tools/contrast-checker", icon: Eye },
    { name: "Shades", href: "/tools/shades-tints-generator", icon: Layers },
    { name: "Tailwind", href: "/tools/tailwind-color-reference", icon: Box },
    { name: "Vision", href: "/tools/color-blindness-simulator", icon: Accessibility },
    { name: "Blog", href: "/blog", icon: BookOpen },
  ];

  const secondaryNav = [
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
        
        {/* Brand / Logo with fresh green touch */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 group-hover:bg-emerald-700 flex items-center justify-center text-white shadow-xs transition-colors">
            <Palette className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-gray-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
              Color Codes
            </span>
            <span className="text-[10px] font-semibold text-emerald-600 tracking-wider uppercase mt-0.5">
              Design Suite
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with Icons and Green Accents */}
        <nav className="hidden xl:flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? "text-emerald-800 bg-emerald-50 border border-emerald-200/90 shadow-2xs"
                    : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-gray-400 group-hover:text-emerald-600"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Medium Screen Nav (Drop some text, keep icons clean) */}
        <nav className="hidden md:flex xl:hidden items-center space-x-1">
          {mainNav.slice(0, 6).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? "text-emerald-800 bg-emerald-50 border border-emerald-200"
                    : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/50"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-600" : "text-gray-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Side Navigation */}
        <div className="hidden lg:flex items-center space-x-3 shrink-0">
          {secondaryNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-xs font-semibold transition-colors px-2 py-1.5 rounded-md ${
                pathname === item.href
                  ? "text-emerald-700 font-bold"
                  : "text-gray-500 hover:text-emerald-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/tools/palette-generator"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Palettes</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-hidden cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-100 bg-white px-4 pt-3 pb-6 space-y-2">
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider px-3 py-1">
            Color Tools
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {mainNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg ${
                    isActive
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-700"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-gray-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-100 my-2 pt-2">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1">
              Pages
            </div>
            <div className="flex gap-2 px-1">
              {secondaryNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
