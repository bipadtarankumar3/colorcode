"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X,
  Sparkles,
  ChevronDown,
  Layout,
  ShieldCheck,
  Code2,
  Brush,
  ArrowRight,
  ExternalLink,
  Database,
  Type,
  Wand2,
  Braces
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// COLORFUL SVG ICONS FOR HEADER NAVIGATION
// ─────────────────────────────────────────────────────────────

function PickerSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path 
        d="M19 11L13 5a2 2 0 0 0-2.8 0L3.5 11.7a2 2 0 0 0 0 2.8l2 2a2 2 0 0 0 2.8 0L15 10" 
        stroke="#059669" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M14 9l5 5" 
        stroke="#10b981" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <circle 
        cx="4.5" 
        cy="19.5" 
        r="2" 
        fill="#34d399" 
        stroke="#059669" 
        strokeWidth="1.5" 
      />
    </svg>
  );
}

function GradientsSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <polygon 
        points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" 
        fill="url(#navGrad)" 
        stroke="#7c3aed" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

function PalettesSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 2C6.48 2 2 6.48 2 12c0 4.4 2.87 8.1 6.84 9.5.5.08.66-.23.66-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3" 
        stroke="#d97706" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      <path 
        d="M12 2a10 10 0 0 1 10 10c0 2.2-1.8 4-4 4h-1.5c-.8 0-1.5.7-1.5 1.5 0 .4.15.7.4 1 .2.3.4.6.4 1 0 1.4-1.1 2.5-2.5 2.5" 
        stroke="#d97706" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      <circle cx="7.5" cy="10" r="1.6" fill="#ef4444" />
      <circle cx="12" cy="7" r="1.6" fill="#f59e0b" />
      <circle cx="16.5" cy="10" r="1.6" fill="#3b82f6" />
      <circle cx="15.5" cy="15" r="1.6" fill="#10b981" />
    </svg>
  );
}

function ExtractorSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect 
        x="3" 
        y="6" 
        width="18" 
        height="15" 
        rx="3.5" 
        stroke="#e11d48" 
        strokeWidth="2" 
      />
      <path 
        d="M8.5 6l1.5-2.5h4l1.5 2.5" 
        stroke="#e11d48" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="13.5" 
        r="3.5" 
        stroke="#f43f5e" 
        strokeWidth="2" 
        fill="#ffe4e6" 
      />
      <circle cx="17.5" cy="9.5" r="1.2" fill="#e11d48" />
    </svg>
  );
}

function ContrastSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle 
        cx="12" 
        cy="12" 
        r="9" 
        stroke="#2563eb" 
        strokeWidth="2" 
      />
      <path 
        d="M12 3a9 9 0 0 1 0 18V3z" 
        fill="#3b82f6" 
      />
      <circle cx="12" cy="8" r="2" fill="#ffffff" />
      <circle cx="12" cy="16" r="2" fill="#1e3a8a" />
    </svg>
  );
}

function ChartSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path 
        d="M3 13l9-5 9 5-9 5-9-5z" 
        stroke="#4f46e5" 
        strokeWidth="2" 
        fill="#e0e7ff" 
        strokeLinejoin="round" 
      />
      <path 
        d="M3 17l9 5 9-5" 
        stroke="#6366f1" 
        strokeWidth="2" 
        strokeLinejoin="round" 
      />
      <path 
        d="M3 9l9-5 9 5" 
        stroke="#818cf8" 
        strokeWidth="2" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

function TailwindSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path 
        d="M12 6C9 6 7.5 7.5 7.5 10.5C8.25 9.4 9.2 8.8 10.3 8.8C11.9 8.8 12.8 10 13.5 11.3C14.7 13.2 16.1 15 19.5 15C22.5 15 24 13.5 24 10.5C23.3 11.6 22.3 12.2 21.2 12.2C19.6 12.2 18.8 11 18 9.8C16.8 7.8 15.4 6 12 6ZM4.5 15C1.5 15 0 16.5 0 19.5C0.8 18.4 1.7 17.8 2.8 17.8C4.4 17.8 5.3 19 6 20.3C7.2 22.2 8.6 24 12 24C15 24 16.5 22.5 16.5 19.5C15.8 20.6 14.8 21.2 13.7 21.2C12.1 21.2 11.3 20 10.5 18.8C9.3 16.8 7.9 15 4.5 15Z" 
        fill="#06b6d4" 
      />
    </svg>
  );
}

function VisionSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path 
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" 
        stroke="#d97706" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle 
        cx="12" 
        cy="12" 
        r="3.5" 
        stroke="#f59e0b" 
        strokeWidth="2" 
        fill="#fef3c7" 
      />
      <circle cx="12" cy="12" r="1.5" fill="#92400e" />
    </svg>
  );
}

function BlogSvg({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path 
        d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" 
        stroke="#dc2626" 
        strokeWidth="2" 
      />
      <path 
        d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" 
        stroke="#dc2626" 
        strokeWidth="2" 
        fill="#fee2e2" 
      />
      <line x1="9" y1="7" x2="16" y2="7" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9" y1="11" x2="14" y2="11" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const pathname = usePathname();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Main Nav with vibrant SVG components
  const mainNav = [
    { name: "Picker", href: "/", icon: PickerSvg },
    { name: "Gradients", href: "/tools/gradient-generator", icon: GradientsSvg },
    { name: "Palettes", href: "/tools/palette-generator", icon: PalettesSvg },
    { name: "Extractor", href: "/tools/color-extractor", icon: ExtractorSvg },
    { name: "Contrast", href: "/tools/contrast-checker", icon: ContrastSvg },
    { name: "Chart", href: "/tools/shades-tints-generator", icon: ChartSvg },
    { name: "Tailwind", href: "/tools/tailwind-color-reference", icon: TailwindSvg },
    { name: "Vision", href: "/tools/color-blindness-simulator", icon: VisionSvg },
    { name: "Blog", href: "/blog", icon: BlogSvg },
  ];

  // Revoxera Web Tools List (Requested links)
  const revoxeraToolsList = [
    { 
      name: "SQL Formatter", 
      desc: "Format & beautify SQL queries", 
      href: "https://sqlformatter.revoxera.com/formatter", 
      icon: Database,
      badge: "Popular",
      colorClass: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
    },
    { 
      name: "Case Converter", 
      desc: "camelCase, snake_case & kebab", 
      href: "https://caseconverter.revoxera.com/", 
      icon: Type,
      badge: "Utility",
      colorClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
    },
    { 
      name: "AI Prompt Generator", 
      desc: "Craft & engineer powerful AI prompts", 
      href: "https://ai-prompt.revoxera.com/", 
      icon: Wand2,
      badge: "AI Tool",
      colorClass: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white"
    },
    { 
      name: "JSON Formatter & Mapper", 
      desc: "Beautify & map JSON structures", 
      href: "https://json-formatter-mapper.revoxera.com/", 
      icon: Braces,
      badge: "Dev Tool",
      colorClass: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
    },
  ];

  const colorToolsList = [
    { name: "Color Picker", desc: "Interactive 2D picker & codes", href: "/", icon: PickerSvg },
    { name: "Gradient Generator", desc: "Linear and radial CSS gradients", href: "/tools/gradient-generator", icon: GradientsSvg },
    { name: "Harmonic Palettes", desc: "Triadic, analogous, & tetradic", href: "/tools/palette-generator", icon: PalettesSvg },
    { name: "Image Color Extractor", desc: "10x loupe & photo swatches", href: "/tools/color-extractor", icon: ExtractorSvg },
    { name: "WCAG Contrast Checker", desc: "Accessibility AA & AAA tests", href: "/tools/contrast-checker", icon: ContrastSvg },
    { name: "Shades & Tints Chart", desc: "10-step lighter/darker shades", href: "/tools/shades-tints-generator", icon: ChartSvg },
    { name: "Tailwind Color Matrix", desc: "Tailwind CSS v4 token map", href: "/tools/tailwind-color-reference", icon: TailwindSvg },
    { name: "Blindness Simulator", desc: "8 color deficiency modes", href: "/tools/color-blindness-simulator", icon: VisionSvg },
  ];

  const servicesList = [
    { name: "UI/UX Design Systems", desc: "Scalable tokens, component libraries & Figma kits", icon: Layout },
    { name: "Accessibility (WCAG) Audits", desc: "ADA & Section 508 accessibility compliance", icon: ShieldCheck },
    { name: "Digital Product Development", desc: "High-performance Next.js & React web apps", icon: Code2 },
    { name: "Brand & Color Consulting", desc: "Tailored brand palettes & color psychology", icon: Brush },
  ];

  const secondaryNav = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-2xs">
      {/* Full-width container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Revoxera Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-black border border-gray-200 shadow-xs flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
            <img 
              src="/logo.png" 
              alt="Revoxera Logo" 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base text-gray-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
              Color Codes
            </span>
            <span className="text-[9px] font-bold text-emerald-600 tracking-wider uppercase mt-1">
              BY REVOXERA
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with Colorful SVG Icons */}
        <nav className="hidden xl:flex items-center space-x-1 py-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg transition-all group ${
                  isActive
                    ? "text-emerald-800 bg-emerald-50 border border-emerald-200/90 shadow-2xs"
                    : "text-gray-900 hover:text-emerald-700 hover:bg-emerald-50/70"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0 group-hover:scale-115 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Medium Screen Nav */}
        <nav className="hidden md:flex xl:hidden items-center space-x-1">
          {mainNav.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all group ${
                  isActive
                    ? "text-emerald-800 bg-emerald-50 border border-emerald-200"
                    : "text-gray-900 hover:text-emerald-700 hover:bg-emerald-50/70"
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Navigation with Services & Tools Mega Dropdown */}
        <div className="hidden lg:flex items-center space-x-3 shrink-0">
          
          {/* Services & Tools Dropdown Menu */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors border cursor-pointer ${
                servicesOpen
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-white text-gray-900 hover:text-emerald-700 border-gray-300 hover:border-emerald-300 hover:bg-emerald-50/40 shadow-2xs"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Services & Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Dropdown Panel with 3 Columns */}
            {servicesOpen && (
              <div className="absolute right-0 top-full mt-2 w-[720px] bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="grid grid-cols-12 gap-6">
                  
                  {/* Column 1: Color Codes Suite (5 cols) */}
                  <div className="col-span-5 space-y-3 border-r border-gray-100 pr-4">
                    <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800">
                        Color Tools
                      </span>
                      <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                        100% Free
                      </span>
                    </div>

                    <div className="space-y-1">
                      {colorToolsList.slice(0, 6).map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50/60 transition-colors group"
                          >
                            <div className="w-6 h-6 rounded-md bg-gray-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-gray-900 group-hover:text-emerald-800">
                                {tool.name}
                              </div>
                              <div className="text-[10px] text-gray-600 truncate">
                                {tool.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 2: Revoxera Web Tools (Requested external apps) (4 cols) */}
                  <div className="col-span-4 space-y-3 border-r border-gray-100 pr-4">
                    <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-800">
                        Revoxera Apps
                      </span>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                        Live Tools
                      </span>
                    </div>

                    <div className="space-y-1">
                      {revoxeraToolsList.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <a
                            key={tool.name}
                            href={tool.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setServicesOpen(false)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-purple-50/50 transition-colors group"
                          >
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${tool.colorClass}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-900 group-hover:text-purple-900">
                                  {tool.name}
                                </span>
                                <ExternalLink className="w-2.5 h-2.5 text-gray-400 group-hover:text-purple-600" />
                              </div>
                              <div className="text-[10px] text-gray-600 truncate">
                                {tool.desc}
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group"
                      >
                        <span>View All Revoxera Tools</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Column 3: Revoxera Studio Services (3 cols) */}
                  <div className="col-span-3 space-y-3 flex flex-col justify-between bg-gray-50/70 p-3 rounded-xl border border-gray-100">
                    <div className="space-y-2.5">
                      <div className="pb-1 border-b border-gray-200">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-900">
                          Studio Services
                        </span>
                        <p className="text-[10px] text-gray-600 mt-0.5">
                          Professional Agency
                        </p>
                      </div>

                      <div className="space-y-2">
                        {servicesList.slice(0, 3).map((svc) => {
                          const Icon = svc.icon;
                          return (
                            <div key={svc.name} className="space-y-0.5">
                              <div className="flex items-center gap-1 text-[11px] font-bold text-gray-900">
                                <Icon className="w-3 h-3 text-emerald-600" />
                                <span>{svc.name}</span>
                              </div>
                              <p className="text-[10px] text-gray-600 leading-tight pl-4 line-clamp-1">
                                {svc.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 space-y-1.5">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="w-full py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs text-center"
                      >
                        <span>All Services & Tools</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setServicesOpen(false)}
                        className="w-full py-1 px-2 text-center text-[10px] font-bold text-gray-700 hover:text-emerald-700 block"
                      >
                        Hire Revoxera
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Secondary Nav links */}
          {secondaryNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-xs font-bold transition-colors px-2.5 py-1.5 rounded-lg ${
                pathname === item.href
                  ? "text-emerald-700 font-extrabold bg-emerald-50"
                  : "text-gray-900 hover:text-emerald-700 hover:bg-gray-100"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Quick Palette CTA */}
          <Link
            href="/tools/palette-generator"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Palettes</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
          className="lg:hidden p-2 rounded-lg text-gray-800 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-hidden cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-gray-800" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          
          {/* Color Tools Grid */}
          <div>
            <div className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider px-2 py-1">
              Color Tools
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {mainNav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg ${
                      isActive
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "text-gray-900 hover:bg-emerald-50/70 hover:text-emerald-700"
                    }`}
                  >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Revoxera Web Tools (External Links) */}
          <div className="pt-2 border-t border-gray-100">
            <div className="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
              <span>Revoxera Web Apps</span>
              <span className="text-[9px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">Free</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
              {revoxeraToolsList.map((tool) => {
                const Icon = tool.icon;
                return (
                  <a
                    key={tool.name}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg text-gray-900 hover:bg-purple-50 hover:text-purple-800 transition-colors border border-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-purple-600" />
                      <span>{tool.name}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-gray-400" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Secondary Mobile Links */}
          <div className="pt-2 border-t border-gray-100 space-y-1">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              Services & Tools Directory
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              About Revoxera
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-xs font-bold text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              Contact Support
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
