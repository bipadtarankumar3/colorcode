"use client";

import { useState } from "react";
import { GitBranch, X as XIcon, Link2, Sparkles, ShieldCheck, Mail, Shield } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = {
  "Color Tools": [
    { label: "Gradient Generator", href: "/tools/gradient-generator" },
    { label: "Palette Builder", href: "/tools/palette-generator" },
    { label: "Contrast Checker", href: "/tools/contrast-checker" },
    { label: "Tailwind Color Map", href: "/tools/tailwind-color-reference" },
    { label: "Image Extractor", href: "/tools/color-extractor" },
  ],
  "Guides": [
    { label: "Accessibility Guides", href: "/guides/wcag-contrast-standards" },
    { label: "Palette Tutorials", href: "/guides/color-theory-basics" },
  ],
  "Resources": [
    { label: "WCAG Contrast Standards", href: "/guides/wcag-contrast-standards" },
    { label: "Color Theory Basics", href: "/guides/color-theory-basics" },
  ],
  "Company": [
    { label: "About Us", href: "/about" },
    { label: "Contact Support", href: "/contact" },
  ],
  "Legal": [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

const SOCIAL = [
  { icon: <XIcon className="w-4 h-4" />, href: "https://x.com/revoxera", label: "X (Twitter)" },
  { icon: <GitBranch className="w-4 h-4" />, href: "https://github.com/revoxera", label: "GitHub" },
  { icon: <Link2 className="w-4 h-4" />, href: "https://www.linkedin.com/in/revoxera-digital", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="w-full relative border-t border-white/5 pt-24 pb-12 px-6 bg-[#050508] overflow-hidden">
      {/* Radial overlay to blend background borders cleanly */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/95 via-transparent to-[#050508] pointer-events-none" />

      {/* Top glowing edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Brand, tagline & newsletter — left and right columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">

          {/* Col 1: Brand & Positioning (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0 bg-transparent">
                <img src="/logo.png" alt="Color Code Logo" className="w-full h-full object-cover invert dark:invert-0 hue-rotate-180 dark:hue-rotate-0 contrast-125 dark:contrast-100 saturate-150 dark:saturate-100 rounded-xl" />
              </div>
              <span className="font-sans font-black tracking-tighter text-sm text-white uppercase ml-1">Color Code</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm font-medium">
              Professional color tools built for modern design workflows.
            </p>

            {/* Contact cards */}
            <div className="space-y-2 mt-4">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mb-2 ml-1">
                Get in touch
              </p>

              <a
                href="mailto:support@revoxera.com"
                className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/2 px-3.5 py-3 transition-all duration-500 ease-out hover:translate-y-[-2px] hover:border-emerald-500/20 hover:bg-white/4 hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 transition-all duration-500 group-hover:bg-emerald-500/20">
                  <Mail size={13} className="text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-none text-white font-sans">support@revoxera.com</p>
                  <p className="mt-1 text-[11px] text-white/30 transition-colors group-hover:text-white/50 font-sans">24/7 email support</p>
                </div>
              </a>
            </div>
          </div>

          {/* Col 2: Get Updates On New Color Tools (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              Get Updates On New Color Tools
            </div>
            <p className="text-xs text-white/40 leading-relaxed font-medium">
              Receive new tools, design guides, and workflow tips.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="designer@domain.com"
                className="w-full text-xs bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white placeholder-white/25 focus:outline-none focus:border-emerald-500/50 font-sans"
                suppressHydrationWarning
              />
              <button
                className="w-full py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-black hover:bg-emerald-500/20 transition-all duration-200 cursor-pointer uppercase tracking-widest font-sans"
                suppressHydrationWarning
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Middle Divider */}
        <div className="h-px bg-white/10 my-10" />

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/50 hover:text-emerald-400 transition-colors duration-200 font-semibold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <p className="text-xs text-white/30 font-medium" suppressHydrationWarning>
            © {new Date().getFullYear()} ColorCode. Professional color tools and workflows for modern design.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Fast. Private. Built For Design Workflows.
            </span>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-white/20">
              <ShieldCheck size={11} className="text-emerald-400/30" />
              Privacy Focused
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-350"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
