"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Sliders, 
  ShieldCheck, 
  Code2, 
  BookOpen,
  ArrowUpRight
} from "lucide-react";

const HOME_FAQS = [
  {
    q: "What is the difference between HEX, RGB, HSL, and OKLCH color spaces?",
    a: "HEX and RGB represent colors using additive red, green, and blue light channels (0–255). HSL represents hue, saturation, and lightness in a cylindrical coordinate system, but lacks perceptual uniformity (yellow appears much brighter than blue at 50% lightness). OKLCH is the modern CSS Color Module Level 4 standard where lightness matches true human eye perception, preventing muddy gradient blending and unpredictable contrast shifts."
  },
  {
    q: "What are the WCAG 2.1 color contrast requirements for AA and AAA compliance?",
    a: "WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal body text (<18pt or <14pt bold) and 3:1 for large text and interactive UI components (like input borders and icons) to meet Level AA. For Level AAA enhanced compliance, normal text must meet at least 7:1 and large text must reach 4.5:1."
  },
  {
    q: "Does Color Code upload my photos to an external server when extracting colors?",
    a: "No! The Image Color Extractor runs entirely in your local browser sandbox using HTML5 Canvas and native Web APIs. Your images, personal photos, and extracted pixel data never leave your computer and are never sent over the internet."
  },
  {
    q: "What are the standard color harmonies used in web design?",
    a: "The foundational color harmonies include: Complementary (two hues 180° opposite on the color wheel), Analogous (adjacent colors spaced ±30° apart), Triadic (three colors evenly spaced at 120°), Split-Complementary (a base color plus two colors adjacent to its complement at 150° and 210°), and Monochromatic (variations of a single hue in saturation and lightness)."
  },
  {
    q: "How does the Color Blindness Simulator calculate color deficiency filters?",
    a: "Our simulator applies scientifically calibrated Brettel, Viénot, and Machado matrix transformations to simulate Protanopia (red-blind), Deuteranopia (green-blind), Tritanopia (blue-blind), and total Achromatopsia, enabling UI designers to verify visual accessibility before publishing."
  },
  {
    q: "How do I export colors to Tailwind CSS or CSS Custom Properties?",
    a: "Every tool on Color Code includes instant copy buttons for standard CSS variables (--color-brand: #hex;), Tailwind CSS arbitrary classes, full tailwind.config.js objects, Tailwind v4 @theme directives, and downloadable SVG color palettes."
  }
];

const WORKFLOW_STEPS = [
  {
    number: "01",
    title: "Select or Sample Base Color",
    desc: "Use the 2D Color Picker, fine-tune HSV sliders, or activate the native browser EyeDropper tool to sample your core brand color.",
    tip: "Tip: Start with your primary interactive CTA hue."
  },
  {
    number: "02",
    title: "Generate Harmonic Palettes",
    desc: "Use the built-in color wheel to calculate complementary, triadic, or analogous variations with geometric precision.",
    tip: "Tip: Keep accents to ~10% of total UI surface area."
  },
  {
    number: "03",
    title: "Audit WCAG Contrast",
    desc: "Test foreground text against light and dark backgrounds to ensure compliance with the 4.5:1 AA contrast threshold.",
    tip: "Tip: Verify both normal text and input borders."
  },
  {
    number: "04",
    title: "Export Code Tokens",
    desc: "Export ready-to-paste CSS custom properties, Tailwind CSS configuration objects, or SVG swatches directly into your codebase.",
    tip: "Tip: One-click export for CSS, Tailwind, and SVG."
  }
];

export function HomeFaqAndGuides() {
  const [openFaq, setOpenFaq] = useState(0); // First one open by default

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-12 pt-8 border-t border-gray-200">
      
      {/* 4-Step Visual Workflow Section (Matches HowTo Schema) */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Standard Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            How to Build Accessible Color Systems in 4 Steps
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
            Follow this recommended product design process to ensure your web app palettes are aesthetic, cohesive, and fully WCAG accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.number}
              className="p-5 rounded-2xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-emerald-600 font-mono">
                  {step.number}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
              </div>
              <h3 className="font-bold text-sm text-gray-900">
                {step.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {step.desc}
              </p>
              <div className="pt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 px-2 py-1 rounded-md border border-emerald-100">
                {step.tip}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Color Space Comparison Matrix Table */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Technical Comparison
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
            Color Spaces Compared: HEX vs RGB vs HSL vs OKLCH
          </h2>
          <p className="text-xs text-gray-500">
            Understand when to use each color format in modern frontend development and design systems.
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-800 font-bold">
              <tr>
                <th className="py-3 px-3.5">Format</th>
                <th className="py-3 px-3.5">CSS Syntax Example</th>
                <th className="py-3 px-3.5">Perceptually Uniform?</th>
                <th className="py-3 px-3.5">Wide Gamut (P3)?</th>
                <th className="py-3 px-3.5">Best Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-sans text-gray-700">
              <tr className="hover:bg-gray-50/50">
                <td className="py-3 px-3.5 font-bold text-gray-900">HEX</td>
                <td className="py-3 px-3.5 font-mono text-emerald-800">#059669</td>
                <td className="py-3 px-3.5 text-rose-600 font-semibold">✕ No</td>
                <td className="py-3 px-3.5 text-rose-600 font-semibold">✕ sRGB only</td>
                <td className="py-3 px-3.5">Static CSS, Figma, design token constants</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-3 px-3.5 font-bold text-gray-900">RGB / RGBA</td>
                <td className="py-3 px-3.5 font-mono text-emerald-800">rgba(5, 150, 105, 0.9)</td>
                <td className="py-3 px-3.5 text-rose-600 font-semibold">✕ No</td>
                <td className="py-3 px-3.5 text-rose-600 font-semibold">✕ sRGB only</td>
                <td className="py-3 px-3.5">Canvas 2D API, WebGL, CSS opacity overlays</td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="py-3 px-3.5 font-bold text-gray-900">HSL</td>
                <td className="py-3 px-3.5 font-mono text-emerald-800">hsl(160, 93%, 30%)</td>
                <td className="py-3 px-3.5 text-rose-600 font-semibold">✕ No</td>
                <td className="py-3 px-3.5 text-rose-600 font-semibold">✕ sRGB only</td>
                <td className="py-3 px-3.5">UI adjustments, dynamic hue rotations</td>
              </tr>
              <tr className="hover:bg-emerald-50/30">
                <td className="py-3 px-3.5 font-bold text-emerald-900 flex items-center gap-1">
                  <span>OKLCH</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">New</span>
                </td>
                <td className="py-3 px-3.5 font-mono text-emerald-800">oklch(0.58 0.14 163)</td>
                <td className="py-3 px-3.5 text-emerald-700 font-bold">✓ Yes (Exact)</td>
                <td className="py-3 px-3.5 text-emerald-700 font-bold">✓ Yes (Display P3)</td>
                <td className="py-3 px-3.5 font-semibold text-gray-900">Modern CSS 4, smooth gradients, accessible design tokens</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Visible Interactive FAQ Accordion (Complies 100% with Google FAQ Schema) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Frequently Asked Questions About HTML Color Codes
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Everything you need to know about web colors, WCAG contrast standards, and client-side extraction.
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all hover:border-gray-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-4 sm:px-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Internal Linking & Quick Guides Section */}
      <section className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-base text-emerald-950">
            Want to learn more about color theory & accessibility?
          </h3>
          <p className="text-xs text-emerald-800">
            Read our in-depth design engineering guides on WCAG contrast, color wheel mathematics, and OKLCH color spaces.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Browse Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

    </div>
  );
}

