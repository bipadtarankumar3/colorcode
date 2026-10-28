"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sliders, 
  Layers, 
  Eye, 
  Palette, 
  FileCode, 
  Zap, 
  Info,
  HelpCircle,
  BookOpen,
  ArrowUpRight
} from "lucide-react";

// Tool data map with rich guides, tables, and FAQs
const TOOL_GUIDES = {
  contrast: {
    name: "WCAG Color Contrast Checker",
    category: "Accessibility & Compliance",
    breadcrumb: "WCAG Contrast Checker",
    canonical: "/tools/contrast-checker",
    badge: "WCAG 2.1 & 2.2 Compliant",
    intro: "Ensure your web applications and digital user interfaces meet official W3C Web Content Accessibility Guidelines (WCAG 2.1 and 2.2). Test foreground text and background color combinations for optimal legibility across desktop, tablet, and mobile screens.",
    sections: [
      {
        title: "Understanding WCAG Contrast Ratios: Level AA vs Level AAA",
        content: (
          <div className="space-y-4">
            <p>
              The Web Content Accessibility Guidelines (WCAG) define mathematical contrast ratios based on <strong>relative luminance</strong>. This ensures people with low vision, color vision deficiencies, or users in bright sunlight can easily read text on digital displays without straining.
            </p>
            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-emerald-50/60 border-b border-gray-200 text-gray-800 font-bold">
                  <tr>
                    <th className="py-2.5 px-3">WCAG Level</th>
                    <th className="py-2.5 px-3">Normal Text (&lt; 18pt)</th>
                    <th className="py-2.5 px-3">Large Text (&ge; 18pt or 14pt bold)</th>
                    <th className="py-2.5 px-3">UI Components & Icons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-mono text-xs text-gray-700">
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-3 font-sans font-bold text-emerald-800">Level AA (Standard)</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">4.5:1 minimum</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">3.0:1 minimum</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">3.0:1 minimum</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="py-2.5 px-3 font-sans font-bold text-purple-800">Level AAA (Enhanced)</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">7.0:1 minimum</td>
                    <td className="py-2.5 px-3 font-bold text-gray-900">4.5:1 minimum</td>
                    <td className="py-2.5 px-3 text-gray-500">Recommended 4.5:1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
      },
      {
        title: "The Math Behind Relative Luminance & Contrast Ratios",
        content: (
          <div className="space-y-3">
            <p>
              Under the W3C sRGB specification, relative luminance (<code>L</code>) normalizes human eye sensitivity to red, green, and blue light components:
            </p>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs sm:text-sm text-gray-800">
              L = 0.2126 &times; R<sub>lin</sub> + 0.7152 &times; G<sub>lin</sub> + 0.0722 &times; B<sub>lin</sub>
            </div>
            <p className="text-xs text-gray-600">
              Notice that green accounts for over 71% of perceived brightness! The final contrast ratio is calculated between the lighter color (<code>L1</code>) and darker color (<code>L2</code>):
            </p>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs sm:text-sm text-gray-800">
              Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)
            </div>
            <p className="text-xs text-gray-600">
              The addition of <code>0.05</code> accounts for ambient room light reflected off display glass, ensuring ratios remain realistic from <code>1:1</code> (identical colors) up to <code>21:1</code> (pure black on pure white).
            </p>
          </div>
        )
      },
      {
        title: "Common Accessibility Mistakes in Modern UI",
        content: (
          <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-gray-600">
            <li><strong>Low contrast placeholder text:</strong> Gray placeholders like <code>#9CA3AF</code> on white fail the 4.5:1 requirement. Use explicit floating labels instead.</li>
            <li><strong>Disabled buttons with unreadable labels:</strong> While WCAG exempts inactive UI elements, low-contrast disabled buttons confuse users who struggle to read why an action is blocked.</li>
            <li><strong>Text overlaid on photography:</strong> Dynamic hero images often wash out white text. Always apply a semi-transparent scrim or gradient overlay (e.g. <code>bg-black/50</code>).</li>
            <li><strong>Relying on color alone for errors:</strong> Never indicate form validation errors with red outlines alone. Pair color changes with icons and descriptive text.</li>
          </ul>
        )
      }
    ],
    faqs: [
      {
        q: "What is the minimum WCAG contrast ratio for body text?",
        a: "WCAG 2.1 Level AA mandates a minimum contrast ratio of 4.5:1 for body text (smaller than 18pt or 14pt bold). For Level AAA compliance, the ratio must reach at least 7.0:1."
      },
      {
        q: "Does color contrast apply to icons, borders, and input fields?",
        a: "Yes! Under WCAG 2.1 Success Criterion 1.4.11 (Non-text Contrast), user interface components such as form input borders, toggle switches, and graphical icons must achieve at least a 3.0:1 contrast ratio against adjacent backgrounds."
      },
      {
        q: "Why does green look brighter than blue at the same hex value?",
        a: "Human photoreceptor cone cells are significantly more sensitive to green wavelengths (~555nm). In the official luminance formula, green contributes 71.52% of perceived brightness, compared to only 7.22% from blue."
      },
      {
        q: "How can I fix a color combination that fails WCAG AA?",
        a: "You can adjust either the foreground or background tone. If your text is too light, decrease its lightness by 10-20% using our Shades & Tints tool, or darken your background until the ratio surpasses 4.5:1."
      },
      {
        q: "Is this contrast checker 100% client-side?",
        a: "Yes. All luminance formulas and accessibility audits run instantly inside your browser using mathematical functions. Zero data or color choices are ever transmitted to an external server."
      }
    ],
    relatedTools: [
      { title: "Color Blindness Simulator", href: "/tools/color-blindness-simulator", desc: "Simulate 8 vision deficiencies like Deuteranopia & Protanopia." },
      { title: "Shades & Tints Generator", href: "/tools/shades-tints-generator", desc: "Generate 10-step lighter and darker scales to dial in contrast." },
      { title: "HTML Color Picker", href: "/", desc: "Pick colors with live 2D canvas and instant HEX/RGB/OKLCH conversion." }
    ]
  },

  gradient: {
    name: "CSS Gradient Generator & Builder",
    category: "CSS Utilities & Styling",
    breadcrumb: "CSS Gradient Generator",
    canonical: "/tools/gradient-generator",
    badge: "Linear, Radial & Tailwind Ready",
    intro: "Create smooth multi-stop linear and radial gradients with interactive angle sliders, color stop controls, and instant code export for CSS, Tailwind CSS, and Figma.",
    sections: [
      {
        title: "How to Build Modern, High-Performance CSS Gradients",
        content: (
          <div className="space-y-4">
            <p>
              CSS gradients are rendered natively by browser GPU engines, producing crisp vector color blends with zero image download overhead. Modern web design utilizes subtle gradients to add depth, hierarchy, and tactile realism to buttons, cards, and hero banners.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <h4 className="font-bold text-gray-900">Linear Gradients</h4>
                <p className="text-gray-600">
                  Transitions colors smoothly along a straight directional vector defined by an angle (e.g. <code>135deg</code>) or directional keyword (e.g. <code>to right bottom</code>).
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <h4 className="font-bold text-gray-900">Radial Gradients</h4>
                <p className="text-gray-600">
                  Radiates outward from a central anchor point in circular or elliptical patterns. Ideal for spot-lighting cards, avatar rings, and ambient background glows.
                </p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "Preventing the 'Muddy Middle' Gray Zone in Gradients",
        content: (
          <div className="space-y-3">
            <p>
              When blending two complementary colors (like blue and orange) in standard RGB space, the midpoint frequently dips through an unappealing, desaturated grayish brown known as the "muddy middle".
            </p>
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-2 text-xs sm:text-sm">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Pro Designer Technique
              </div>
              <p className="text-gray-700">
                To keep gradients vibrant across the entire transition, add a <strong>transitional color stop</strong> at 50% that follows a curved path on the color wheel (e.g. adding magenta between blue and red, or turquoise between blue and lime green).
              </p>
            </div>
          </div>
        )
      },
      {
        title: "CSS Syntax Reference & Browser Compatibility",
        content: (
          <div className="space-y-2">
            <p className="text-xs sm:text-sm text-gray-600">
              Modern CSS gradients require no vendor prefixes (<code>-webkit-</code>) in any modern browser:
            </p>
            <div className="p-3 bg-gray-900 text-emerald-400 rounded-lg font-mono text-xs overflow-x-auto">
              background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
            </div>
          </div>
        )
      }
    ],
    faqs: [
      {
        q: "How do I use this gradient in Tailwind CSS?",
        a: "Tailwind CSS v3 and v4 support arbitrary gradient values. You can either copy our generated Tailwind class string (e.g. bg-gradient-to-r from-emerald-600 to-teal-400) or use arbitrary values like bg-[linear-gradient(135deg,#059669,#10b981)]."
      },
      {
        q: "What is the difference between linear and radial gradients?",
        a: "A linear gradient transitions colors along a straight directional line at a specified degree, while a radial gradient radiates outward from a center point in an expanding circle or ellipse."
      },
      {
        q: "Can I use CSS gradients as text colors?",
        a: "Yes! Use background-clip: text with a transparent text color: 'background: linear-gradient(...); -webkit-background-clip: text; color: transparent;' to create stunning gradient typography."
      },
      {
        q: "How many color stops can I add to a gradient?",
        a: "CSS supports unlimited color stops. Our generator allows multi-stop customization with individual stop positions from 0% to 100%."
      },
      {
        q: "Are CSS gradients lightweight compared to image backgrounds?",
        a: "Extremely. CSS gradients require zero kilobytes of image asset downloads, render instantly via GPU acceleration, and scale infinitely without pixelation on Retina 4K displays."
      }
    ],
    relatedTools: [
      { title: "HTML Color Picker", href: "/", desc: "Select and fine-tune your starting base colors." },
      { title: "Harmonic Palette Generator", href: "/tools/palette-generator", desc: "Build complementary and analogous palettes for gradient stops." },
      { title: "Tailwind Color Reference", href: "/tools/tailwind-color-reference", desc: "Browse curated Tailwind shades for seamless color stops." }
    ]
  },

  palette: {
    name: "Harmonic Color Palette Generator",
    category: "Design Systems & Color Harmony",
    breadcrumb: "Palette Generator",
    canonical: "/tools/palette-generator",
    badge: "5 Harmonic Formulas",
    intro: "Generate mathematically balanced color palettes using classic geometric color theory rules: complementary, analogous, triadic, split-complementary, and monochromatic.",
    sections: [
      {
        title: "The 5 Core Harmonic Color Schemes Explained",
        content: (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <h4 className="font-bold text-gray-900">Complementary (180° Opposite)</h4>
              <p className="text-gray-600">Directly opposing hues on the color wheel. Delivers maximum chromatic contrast, perfect for high-impact CTA buttons.</p>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <h4 className="font-bold text-gray-900">Analogous (±30° Adjacent)</h4>
              <p className="text-gray-600">Colors sitting side-by-side on the wheel. Produces calm, cohesive palettes found widely in nature and photography.</p>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <h4 className="font-bold text-gray-900">Triadic (120° Equidistant)</h4>
              <p className="text-gray-600">Three hues spaced symmetrically at 120°. Provides vibrant contrast while maintaining structural balance across UI surfaces.</p>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <h4 className="font-bold text-gray-900">Split-Complementary (150° / 210°)</h4>
              <p className="text-gray-600">Takes a base hue plus two tones adjacent to its complement. Delivers strong nuance with less visual tension than pure complements.</p>
            </div>
          </div>
        )
      },
      {
        title: "Applying the 60-30-10 Rule in UI/UX Product Design",
        content: (
          <div className="space-y-3 text-xs sm:text-sm text-gray-600">
            <p>
              A classic interior design rule that translates flawlessly to web applications:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-lg font-bold text-gray-900">60% Neutral</div>
                <p className="text-xs text-gray-600 mt-1">Dominant background, surfaces, and card backgrounds (white, slate, light gray).</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="text-lg font-bold text-emerald-900">30% Secondary</div>
                <p className="text-xs text-gray-600 mt-1">Headers, navigation bars, borders, and secondary buttons.</p>
              </div>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                <div className="text-lg font-bold text-rose-900">10% Accent</div>
                <p className="text-xs text-gray-600 mt-1">Primary Call-to-Action button, notifications, badges, and focus rings.</p>
              </div>
            </div>
          </div>
        )
      }
    ],
    faqs: [
      {
        q: "How do I choose the best harmony type for my app?",
        a: "For clean enterprise and SaaS apps, Monochromatic or Analogous palettes work best. For consumer apps, games, or landing pages requiring strong visual punch, Triadic and Complementary palettes provide energy and clarity."
      },
      {
        q: "Can I export the generated palette to CSS or Tailwind?",
        a: "Yes! You can instantly copy CSS custom properties, Tailwind configuration objects, or download an SVG swatch file."
      },
      {
        q: "What is perceptual uniformity in palette generation?",
        a: "Perceptual uniformity ensures that colors of the same mathematically assigned lightness actually look equally bright to the human eye, avoiding muddy or washed-out transitions."
      },
      {
        q: "How many colors should a design system palette contain?",
        a: "Most mature design systems feature 1 primary brand color, 1-2 secondary neutrals, 4 functional feedback colors (Success, Warning, Error, Info), and 10 shades for gray surfaces."
      },
      {
        q: "Does this palette builder save colors locally?",
        a: "Yes, your color history is stored safely in your browser's local storage so you never lose track of generated palettes."
      }
    ],
    relatedTools: [
      { title: "WCAG Contrast Checker", href: "/tools/contrast-checker", desc: "Audit your palette colors for accessibility compliance." },
      { title: "CSS Gradient Generator", href: "/tools/gradient-generator", desc: "Blend your generated palette into seamless gradients." },
      { title: "Shades & Tints Generator", href: "/tools/shades-tints-generator", desc: "Build 10-step lighter and darker scales for each palette color." }
    ]
  },

  extractor: {
    name: "Image Color Palette Extractor",
    category: "Image Processing & Sampling",
    breadcrumb: "Image Color Extractor",
    canonical: "/tools/color-extractor",
    badge: "100% Private Client-Side",
    intro: "Extract dominant color palettes, brand color schemes, and exact hexadecimal codes directly from any image or photo inside your browser sandbox. Zero file uploads, zero latency, 100% GDPR compliant.",
    sections: [
      {
        title: "How Browser-Based Color Extraction Works",
        content: (
          <div className="space-y-3 text-xs sm:text-sm text-gray-600">
            <p>
              When you drop an image into our extractor, the browser leverages the <strong>HTML5 Canvas 2D Rendering Context</strong> to read pixel buffer data (<code>getImageData</code>) directly into local RAM.
            </p>
            <p>
              Our quantization algorithm groups similar pixels into chromatic clusters, filtering out near-transparent or outlier pixels to identify the most visually dominant colors and accent highlights in the image.
            </p>
          </div>
        )
      },
      {
        title: "100% Privacy Guarantee: Zero Server Uploads",
        content: (
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Complete Client-Side Security
            </div>
            <p className="text-gray-700">
              Unlike cloud-based tools that send your proprietary graphics, confidential mockups, or personal photos to third-party servers, our tool processes 100% of the image data locally on your device. Your files never leave your computer.
            </p>
          </div>
        )
      }
    ],
    faqs: [
      {
        q: "What image formats are supported?",
        a: "We support PNG, JPEG, WebP, SVG, GIF, AVIF, and BMP formats up to high-resolution 4K dimensions."
      },
      {
        q: "Are my images uploaded to any server?",
        a: "No! All image rendering and pixel analysis take place strictly inside your local browser sandbox using HTML5 Canvas."
      },
      {
        q: "How many dominant colors does it extract?",
        a: "The tool extracts the top 6-8 dominant color swatches, ordered by visual prominence and frequency."
      },
      {
        q: "Can I pick exact individual pixels?",
        a: "Yes! Click anywhere on the image preview canvas to sample individual pixels with 10x magnification precision."
      },
      {
        q: "Can I export extracted palettes directly to CSS?",
        a: "Yes! Every swatch has a 1-click copy button for HEX, RGB, and CSS custom property declarations."
      }
    ],
    relatedTools: [
      { title: "HTML Color Picker", href: "/", desc: "Inspect and refine extracted colors with sliders." },
      { title: "CSS Gradient Generator", href: "/tools/gradient-generator", desc: "Turn extracted photo colors into a vibrant gradient." },
      { title: "WCAG Contrast Checker", href: "/tools/contrast-checker", desc: "Verify if extracted photo tones can be paired legibly." }
    ]
  },

  shades: {
    name: "HEX Shades & Tints Generator",
    category: "Design System Tokens",
    breadcrumb: "Shades & Tints",
    canonical: "/tools/shades-tints-generator",
    badge: "10-Step Scale Generator",
    intro: "Generate progressive lighter tints (adding white) and darker shades (adding black) for any base HEX color. Perfect for building Tailwind-style 50–950 design system token scales.",
    sections: [
      {
        title: "Tints vs Shades vs Tones: What Is the Difference?",
        content: (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200 space-y-1">
              <h4 className="font-bold text-blue-900">Tints (Add White)</h4>
              <p className="text-gray-600">Increases lightness while decreasing saturation. Creates soft pastel variations ideal for backgrounds and hover badges.</p>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
              <h4 className="font-bold text-gray-900">Shades (Add Black)</h4>
              <p className="text-gray-600">Decreases lightness toward pitch black. Produces rich, deep anchors suitable for active buttons, borders, and dark mode surfaces.</p>
            </div>
            <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200 space-y-1">
              <h4 className="font-bold text-amber-900">Tones (Add Gray)</h4>
              <p className="text-gray-600">Blends neutral gray into the hue, softening saturation without drastically changing perceived brightness.</p>
            </div>
          </div>
        )
      },
      {
        title: "Building a Production-Ready 50–950 Design Scale",
        content: (
          <div className="space-y-3 text-xs sm:text-sm text-gray-600">
            <p>
              Modern CSS frameworks like Tailwind CSS, Chakra UI, and Radix utilize 10-step scales (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950).
            </p>
            <p>
              Step 500 typically represents your primary brand button color, steps 50–100 serve as subtle background tints, while steps 800–900 provide high-contrast text and dark mode accents.
            </p>
          </div>
        )
      }
    ],
    faqs: [
      {
        q: "What is the mathematical step difference in each tint/shade?",
        a: "Our generator calculates 10 linear increments (10% steps) in RGB and OKLCH color spaces, blending toward pure white (#FFFFFF) for tints and pure black (#000000) for shades."
      },
      {
        q: "How do I map these shades to Tailwind CSS?",
        a: "Map step 50 to your lightest tint, step 500 to your base color, and step 900 to your deepest shade in your tailwind.config.js theme."
      },
      {
        q: "Can I copy the entire scale at once?",
        a: "Yes! Use the 'Copy All' button to export the entire 10-step scale as CSS variables or JSON tokens."
      },
      {
        q: "Why do some tints look washed out in standard RGB?",
        a: "RGB blending does not account for human eye sensitivity. For the highest fidelity tints without perceived hue shift, review our OKLCH guides."
      },
      {
        q: "Which shade step guarantees WCAG AA compliance against white?",
        a: "Usually steps 600, 700, 800, and 900 achieve the required 4.5:1 contrast against pure white backgrounds."
      }
    ],
    relatedTools: [
      { title: "Tailwind Color Reference", href: "/tools/tailwind-color-reference", desc: "Compare against Tailwind's official default color scales." },
      { title: "WCAG Contrast Checker", href: "/tools/contrast-checker", desc: "Test which shade steps pass AA and AAA standards." },
      { title: "HTML Color Picker", href: "/", desc: "Pick your starting base color." }
    ]
  },

  tailwind: {
    name: "Tailwind CSS Color Reference & Swatches",
    category: "Frameworks & Developer Tools",
    breadcrumb: "Tailwind Color Reference",
    canonical: "/tools/tailwind-color-reference",
    badge: "Tailwind v3 & v4 Ready",
    intro: "Complete, interactive visual reference for all 22 default Tailwind CSS color families and 220+ curated shades. Click any swatch for instant HEX and class name copying.",
    sections: [
      {
        title: "The Tailwind CSS Color Architecture",
        content: (
          <div className="space-y-3 text-xs sm:text-sm text-gray-600">
            <p>
              Tailwind CSS ships with 22 scientifically calibrated color families spanning neutral grays (Slate, Gray, Zinc, Neutral, Stone) and chromatic hues (Red, Orange, Amber, Yellow, Lime, Green, Emerald, Teal, Cyan, Sky, Blue, Indigo, Violet, Purple, Fuchsia, Pink, Rose).
            </p>
            <p>
              Each chromatic family features 11 numeric shades from 50 (lightest surface tint) to 950 (deepest dark mode shade).
            </p>
          </div>
        )
      },
      {
        title: "How to Extend Tailwind Colors in v3 vs v4",
        content: (
          <div className="space-y-3">
            <div className="p-3 bg-gray-900 text-emerald-400 rounded-lg font-mono text-xs overflow-x-auto">
              {`// Tailwind v3 (tailwind.config.js)
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#059669',
          600: '#047857',
        }
      }
    }
  }
}`}
            </div>
            <div className="p-3 bg-gray-900 text-purple-400 rounded-lg font-mono text-xs overflow-x-auto">
              {`/* Tailwind v4 (@theme block) */
@theme {
  --color-brand-500: #059669;
  --color-brand-600: #047857;
}`}
            </div>
          </div>
        )
      }
    ],
    faqs: [
      {
        q: "Which Tailwind neutral gray should I choose?",
        a: "Slate has a cool blue undertone (great for tech & SaaS). Zinc and Neutral are clean, modern neutral grays. Stone has a warm, earthy tone (ideal for lifestyle, food, and editorial sites)."
      },
      {
        q: "What is the difference between Tailwind v3 and v4 color configuration?",
        a: "Tailwind v3 uses JavaScript objects inside tailwind.config.js, while Tailwind v4 uses CSS native @theme directives and CSS custom properties."
      },
      {
        q: "Can I use these colors with vanilla CSS or other frameworks?",
        a: "Yes! Every swatch provides 1-click copying of standard HEX codes, RGB values, and CSS custom property syntax."
      },
      {
        q: "Which Tailwind shade is best for primary CTA buttons?",
        a: "Shade 600 is standard for primary buttons in light mode (e.g. bg-emerald-600 hover:bg-emerald-700), providing strong contrast against white text."
      },
      {
        q: "What is shade 950 used for?",
        a: "Shade 950 was introduced specifically for dark mode backgrounds, borders, and card surfaces to replace pure black #000000."
      }
    ],
    relatedTools: [
      { title: "Shades & Tints Generator", href: "/tools/shades-tints-generator", desc: "Generate custom 10-step scales for your own brand colors." },
      { title: "WCAG Contrast Checker", href: "/tools/contrast-checker", desc: "Audit Tailwind color pairings for accessibility." },
      { title: "HTML Color Picker", href: "/", desc: "Pick custom HEX colors with live preview." }
    ]
  },

  blindness: {
    name: "Color Blindness Vision Deficiency Simulator",
    category: "Accessibility & Inclusive UX",
    breadcrumb: "Color Blindness Simulator",
    canonical: "/tools/color-blindness-simulator",
    badge: "8 Deficiency Modes",
    intro: "Simulate color vision deficiencies including Protanopia, Deuteranopia, Tritanopia, and Achromatopsia in real-time. Verify that your UI components, charts, and alerts remain fully distinguishable for all users.",
    sections: [
      {
        title: "Demographics & Types of Color Vision Deficiency (CVD)",
        content: (
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-gray-600">
              Worldwide, approximately <strong>8% of men (1 in 12)</strong> and <strong>0.5% of women (1 in 200)</strong> live with some form of color vision deficiency. Designing accessible interfaces ensures millions of users can navigate your product without barrier.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-200 space-y-1">
                <h4 className="font-bold text-red-900">Protanopia (Red-Blind)</h4>
                <p className="text-gray-600">Missing L-cones. Red appears dark brown or olive, and red-green discrimination is severely impaired (~1% of males).</p>
              </div>
              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1">
                <h4 className="font-bold text-emerald-900">Deuteranopia (Green-Blind)</h4>
                <p className="text-gray-600">Missing M-cones. Most common form (~6% of males). Greens appear beige or yellow, confusing red and green states.</p>
              </div>
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200 space-y-1">
                <h4 className="font-bold text-blue-900">Tritanopia (Blue-Blind)</h4>
                <p className="text-gray-600">Missing S-cones. Rare deficiency (&lt;0.1%). Blues look greenish, and yellow looks pink or light gray.</p>
              </div>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                <h4 className="font-bold text-gray-900">Achromatopsia (Monochromacy)</h4>
                <p className="text-gray-600">Total absence of cone function. Vision is entirely in shades of gray, relying 100% on luminance contrast.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        title: "3 Golden Rules for Inclusive Accessible Design",
        content: (
          <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm text-gray-600">
            <li><strong>Never rely on color alone:</strong> Always pair status colors with icons (e.g. checkmark for success, exclamation mark for error) and descriptive text labels.</li>
            <li><strong>Avoid red/green status pairing:</strong> Red and green are virtually indistinguishable for individuals with Deuteranopia and Protanopia. Pair blue with orange or add distinct textures/shapes.</li>
            <li><strong>Verify in grayscale:</strong> If your chart or dashboard is readable in pure black and white (Achromatopsia mode), it will be readable for any form of color vision deficiency.</li>
          </ul>
        )
      }
    ],
    faqs: [
      {
        q: "How does this simulator calculate color shifts?",
        a: "Our simulator applies mathematically calibrated Brettel, Viénot, and Mollon matrix transformations that simulate cone excitation reduction in human retina cells."
      },
      {
        q: "What is the difference between Protanopia and Deuteranopia?",
        a: "Protanopia is red-blindness caused by missing long-wavelength (L) cones, while Deuteranopia is green-blindness caused by missing medium-wavelength (M) cones."
      },
      {
        q: "What are anomalous trichromacies (Protanomaly / Deuteranomaly)?",
        a: "In anomaly conditions, all three cone types are present, but one is shifted in spectral sensitivity. Colors appear muted rather than completely lost."
      },
      {
        q: "How should I design data visualization charts for CVD users?",
        a: "Use high luminance contrast between lines, add direct line labels instead of separate color legends, and introduce distinct dash patterns or data point markers (circles, triangles, squares)."
      },
      {
        q: "Does WCAG 2.1 require color blindness testing?",
        a: "Yes! WCAG Guideline 1.4.1 (Use of Color) specifies that color cannot be used as the only visual means of conveying information, indicating an action, or distinguishing an element."
      }
    ],
    relatedTools: [
      { title: "WCAG Contrast Checker", href: "/tools/contrast-checker", desc: "Audit text and background contrast ratios." },
      { title: "HTML Color Picker", href: "/", desc: "Pick and inspect base colors." },
      { title: "Harmonic Palette Generator", href: "/tools/palette-generator", desc: "Generate accessible palettes with high chromatic distinction." }
    ]
  },

  details: {
    name: "Advanced Color Details & Space Converter",
    category: "Color Science & Converters",
    breadcrumb: "Color Details & Converter",
    canonical: "/tools/color-converter-details",
    badge: "HEX, RGB, HSL, CMYK & OKLCH",
    intro: "Convert any color across all standard digital and print color models: Hexadecimal, RGB, RGBA, HSL, HSLA, CMYK, HSV, and CSS Color 4 OKLCH with detailed chromatic data.",
    sections: [
      {
        title: "Comparing Digital & Print Color Models",
        content: (
          <div className="space-y-3 text-xs sm:text-sm text-gray-600">
            <p>
              Different creative disciplines rely on distinct color coordinate models:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 block">RGB / HEX (Additive Light)</span>
                <p className="text-xs text-gray-600">Used for digital screens, mobile displays, and web design. Emits red, green, and blue light photons.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 block">CMYK (Subtractive Pigment)</span>
                <p className="text-xs text-gray-600">Used for professional 4-color offset printing. Uses Cyan, Magenta, Yellow, and Key (Black) inks.</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 block">HSL (Human Perceptual Cylinder)</span>
                <p className="text-xs text-gray-600">Intuitive coordinates for designers: Hue (0–360°), Saturation (0–100%), and Lightness (0–100%).</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-1">
                <span className="font-bold text-gray-900 block">OKLCH (CSS Color 4 Standard)</span>
                <p className="text-xs text-gray-600">Perceptually uniform color space delivering consistent human lightness and wider P3 display gamuts.</p>
              </div>
            </div>
          </div>
        )
      }
    ],
    faqs: [
      {
        q: "Why does CMYK look duller than RGB on screen?",
        a: "Subtractive printing inks (CMYK) have a smaller color gamut than light-emitting screens (RGB). Highly saturated neon greens and electrical blues cannot be reproduced with standard printing ink."
      },
      {
        q: "What is the difference between HSV and HSL?",
        a: "Both are cylindrical projections of RGB. In HSL, maximum lightness (100%) is always pure white. In HSV, maximum value (100%) can be a vivid saturated color or white depending on saturation."
      },
      {
        q: "How does OKLCH improve CSS gradients?",
        a: "Because OKLCH is perceptually uniform, gradient color stops transition with smooth linear perceived lightness, eliminating the dull gray dip found in standard sRGB blending."
      },
      {
        q: "How do I convert HEX to RGB in JavaScript?",
        a: "Parse two characters at a time using parseInt(hex.slice(1, 3), 16) for red, (3, 5) for green, and (5, 7) for blue."
      },
      {
        q: "Is this converter free to use?",
        a: "Yes! Color Codes is 100% free with no registration, no ads, and no download limits."
      }
    ],
    relatedTools: [
      { title: "HTML Color Picker", href: "/", desc: "Interactive 2D color picker and harmonic wheel." },
      { title: "WCAG Contrast Checker", href: "/tools/contrast-checker", desc: "Verify text and background contrast compliance." },
      { title: "Tailwind Color Reference", href: "/tools/tailwind-color-reference", desc: "Explore Tailwind default swatches." }
    ]
  }
};

export function ToolSeoContent({ toolKey = "contrast" }) {
  const guide = TOOL_GUIDES[toolKey] || TOOL_GUIDES.contrast;
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full space-y-10 pt-10 border-t border-gray-200 text-gray-800">
      
      {/* Visual Breadcrumb Navigation for SEO & Crawlers */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
        <Link href="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/services" className="hover:text-emerald-700 transition-colors">
          Tools
        </Link>
        <span>/</span>
        <span className="font-semibold text-gray-900" aria-current="page">
          {guide.breadcrumb}
        </span>
      </nav>

      {/* Guide Header */}
      <div className="space-y-3 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {guide.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            {guide.badge}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
          In-Depth Guide: {guide.name}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {guide.intro}
        </p>
      </div>

      {/* Guide Editorial Sections */}
      <div className="space-y-8 max-w-4xl">
        {guide.sections.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-5 bg-emerald-600 rounded-full" />
              {section.title}
            </h3>
            <div className="text-gray-700 leading-relaxed">
              {section.content}
            </div>
          </section>
        ))}
      </div>

      {/* Visible Interactive FAQ Accordion (Required for Google FAQ Rich Snippets!) */}
      <section className="space-y-4 pt-6 border-t border-gray-200 max-w-4xl">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            Frequently Asked Questions
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Common Questions About {guide.name}
          </h3>
          <p className="text-xs text-gray-500">
            Everything you need to know about formulas, accessibility standards, and production export.
          </p>
        </div>

        <div className="space-y-2 pt-2">
          {guide.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-all hover:border-gray-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-3.5 px-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-gray-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Tools Cross-Navigation Cards (Increases Time-on-Site & Pageviews) */}
      <section className="space-y-4 pt-6 border-t border-gray-200 max-w-4xl">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-emerald-600" />
            Explore Complementary Color Tools
          </h3>
          <Link href="/services" className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
            <span>View All Tools</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {guide.relatedTools.map((rel) => (
            <Link
              key={rel.href}
              href={rel.href}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group block space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {rel.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">
                {rel.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}

