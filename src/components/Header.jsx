"use client";

import { useState, useRef, useEffect } from "react";
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
  ChevronDown,
  Layout,
  ShieldCheck,
  Code2,
  Brush,
  Info,
  Mail,
  ArrowRight
} from "lucide-react";

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

  const mainNav = [
    { name: "Picker", href: "/", icon: Pipette },
    { name: "Gradients", href: "/tools/gradient-generator", icon: Zap },
    { name: "Palettes", href: "/tools/palette-generator", icon: Palette },
    { name: "Extractor", href: "/tools/color-extractor", icon: Camera },
    { name: "Contrast", href: "/tools/contrast-checker", icon: Eye },
    { name: "Chart", href: "/tools/shades-tints-generator", icon: Layers },
    { name: "Tailwind", href: "/tools/tailwind-color-reference", icon: Box },
    { name: "Vision", href: "/tools/color-blindness-simulator", icon: Accessibility },
    { name: "Blog", href: "/blog", icon: BookOpen },
  ];

  const toolsList = [
    { name: "Color Picker", desc: "Interactive 2D picker & codes", href: "/", icon: Pipette },
    { name: "CSS Gradient Generator", desc: "Linear and radial gradients", href: "/tools/gradient-generator", icon: Zap },
    { name: "Harmonic Palette Builder", desc: "Triadic, analogous, & tetradic", href: "/tools/palette-generator", icon: Palette },
    { name: "Image Color Extractor", desc: "Extract swatches from photos", href: "/tools/color-extractor", icon: Camera },
    { name: "WCAG Contrast Checker", desc: "Accessibility AA & AAA tests", href: "/tools/contrast-checker", icon: Eye },
    { name: "Shades & Tints Chart", desc: "10-step lighter/darker shades", href: "/tools/shades-tints-generator", icon: Layers },
    { name: "Tailwind Color Reference", desc: "Full Tailwind CSS color map", href: "/tools/tailwind-color-reference", icon: Box },
    { name: "Blindness Simulator", desc: "8 color deficiency modes", href: "/tools/color-blindness-simulator", icon: Accessibility },
  ];

  const servicesList = [
    { name: "UI/UX Design Systems", desc: "Scalable tokens, component libraries & figma kits", icon: Layout },
    { name: "Accessibility (WCAG) Audits", desc: "ADA & Section 508 accessibility compliance", icon: ShieldCheck },
    { name: "Digital Product Development", desc: "High-performance Next.js & React web apps", icon: Code2 },
    { name: "Brand & Color Consulting", desc: "Tailored brand palettes & color psychology", icon: Brush },
  ];

  const secondaryNav = [
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

        {/* Desktop Navigation with Icons and Green Accents */}
        <nav className="hidden xl:flex items-center space-x-1 py-1">
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

        {/* Medium Screen Nav */}
        <nav className="hidden md:flex xl:hidden items-center space-x-1">
          {mainNav.slice(0, 5).map((item) => {
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

        {/* Right Side Navigation with Services Dropdown */}
        <div className="hidden lg:flex items-center space-x-3 shrink-0">
          
          {/* Services & Tools Dropdown Menu */}
          <div className="relative" ref={servicesRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors border cursor-pointer ${
                servicesOpen
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-gray-50 text-gray-700 hover:text-gray-900 border-gray-200 hover:border-gray-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Services & Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Dropdown Panel */}
            {servicesOpen && (
              <div className="absolute right-0 top-full mt-2 w-[540px] bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="grid grid-cols-2 gap-6">
                  
                  {/* Left Column: All Color Tools */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                        Color Tools
                      </span>
                      <span className="text-[10px] text-gray-400">100% Free</span>
                    </div>

                    <div className="space-y-1">
                      {toolsList.map((tool) => {
                        const Icon = tool.icon;
                        return (
                          <Link
                            key={tool.name}
                            href={tool.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-emerald-50/60 transition-colors group"
                          >
                            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-gray-800 group-hover:text-emerald-800">
                                {tool.name}
                              </div>
                              <div className="text-[11px] text-gray-500 truncate">
                                {tool.desc}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Revoxera Studio Services */}
                  <div className="space-y-3 bg-gray-50/70 p-3.5 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="pb-1 border-b border-gray-200">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-900">
                          Revoxera Services
                        </span>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Professional design & engineering
                        </p>
                      </div>

                      <div className="space-y-2">
                        {servicesList.map((svc) => {
                          const Icon = svc.icon;
                          return (
                            <div key={svc.name} className="space-y-0.5">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                                <Icon className="w-3.5 h-3.5 text-emerald-600" />
                                {svc.name}
                              </div>
                              <p className="text-[11px] text-gray-500 leading-tight pl-5">
                                {svc.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <Link
                        href="/contact"
                        onClick={() => setServicesOpen(false)}
                        className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <span>Work With Revoxera</span>
                        <ArrowRight className="w-3 h-3" />
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
              className={`text-xs font-semibold transition-colors px-2 py-1.5 rounded-md ${
                pathname === item.href
                  ? "text-emerald-700 font-bold"
                  : "text-gray-500 hover:text-emerald-700"
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
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-hidden cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          {/* Color Tools Grid */}
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider px-2 py-1">
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
          </div>

          {/* Revoxera Services in Mobile */}
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-2">
            <div className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">
              Revoxera Studio Services
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Layout className="w-3.5 h-3.5 text-emerald-600" />
                <span>UI/UX Design Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>WCAG Accessibility Audits</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digital Product Engineering</span>
              </div>
            </div>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center mt-2 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
            >
              Contact Us for Services
            </Link>
          </div>

          {/* Secondary Pages */}
          <div className="flex gap-2 pt-1 border-t border-gray-100">
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
      )}
    </header>
  );
}
