import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f6f6f8] border-t border-gray-200 mt-20 pt-16 pb-16 text-gray-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Socials, Credit & About */}
          <div className="md:col-span-5 space-y-8">
            {/* Social Icons row */}
            <div className="flex items-center space-x-3 text-gray-500">
              <a
                href="https://x.com/revoxera"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://github.com/revoxera"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            {/* Credit block */}
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Credit
              </span>
              <div className="text-xl font-bold text-gray-900 tracking-tight">
                Revoxera
              </div>
              <p className="text-xs text-gray-500 pt-0.5">
                © 2015–{new Date().getFullYear()}{" "}
                <Link href="/privacy" className="hover:text-gray-900 underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                ·{" "}
                <Link href="/terms" className="hover:text-gray-900 underline underline-offset-2">
                  Terms
                </Link>
              </p>
            </div>

            {/* About note */}
            <div className="space-y-1.5 pt-2 max-w-md">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                About
              </span>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">
                We built Revoxera Color because we believe tools for design should be well designed themselves. If you like the site or have a suggestion,{" "}
                <Link href="/contact" className="text-gray-900 underline underline-offset-2 hover:text-rose-600">
                  drop us a line
                </Link>
                ; feedback is very much appreciated and always welcome!
              </p>
            </div>
          </div>

          {/* Right Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-2 md:pt-0">
            
            {/* Column 1: Contact */}
            <div className="space-y-3">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Contact
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="mailto:support@revoxera.com"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900 transition-colors">
                    Support Form
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/revoxera"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors"
                  >
                    Bug Reports
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Tools */}
            <div className="space-y-3">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Tools
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/" className="hover:text-gray-900 transition-colors">
                    Color Picker
                  </Link>
                </li>
                <li>
                  <Link href="/tools/gradient-generator" className="hover:text-gray-900 transition-colors">
                    Gradient Generator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/palette-generator" className="hover:text-gray-900 transition-colors">
                    Palette Builder
                  </Link>
                </li>
                <li>
                  <Link href="/tools/contrast-checker" className="hover:text-gray-900 transition-colors">
                    Contrast Checker
                  </Link>
                </li>
                <li>
                  <Link href="/tools/color-extractor" className="hover:text-gray-900 transition-colors">
                    Image Extractor
                  </Link>
                </li>
                <li>
                  <Link href="/tools/shades-tints-generator" className="hover:text-gray-900 transition-colors">
                    Color Chart
                  </Link>
                </li>
                <li>
                  <Link href="/tools/tailwind-color-reference" className="hover:text-gray-900 transition-colors">
                    Tailwind Colors
                  </Link>
                </li>
                <li>
                  <Link href="/tools/color-blindness-simulator" className="hover:text-gray-900 transition-colors">
                    Blindness Sim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-3">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Articles & Guides
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/blog" className="hover:text-gray-900 transition-colors font-medium">
                    All Blog Posts
                  </Link>
                </li>
                <li>
                  <Link href="/blog/color-theory-basics" className="hover:text-gray-900 transition-colors">
                    Color Theory Basics
                  </Link>
                </li>
                <li>
                  <Link href="/blog/wcag-contrast-standards" className="hover:text-gray-900 transition-colors">
                    WCAG Contrast
                  </Link>
                </li>
                <li>
                  <Link href="/blog/understanding-oklch-hex-rgb" className="hover:text-gray-900 transition-colors">
                    OKLCH & Color Spaces
                  </Link>
                </li>
                <li>
                  <Link href="/blog/creating-design-system-palettes" className="hover:text-gray-900 transition-colors">
                    Design System Palettes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Revoxera Apps */}
            <div className="space-y-3">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Revoxera Apps
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="https://sqlformatter.revoxera.com/formatter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-700 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>SQL Formatter</span>
                    <span className="text-[10px] text-gray-400">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://caseconverter.revoxera.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-700 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>Case Converter</span>
                    <span className="text-[10px] text-gray-400">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://ai-prompt.revoxera.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-700 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>AI Prompt Generator</span>
                    <span className="text-[10px] text-gray-400">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://json-formatter-mapper.revoxera.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-rose-700 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>JSON Formatter</span>
                    <span className="text-[10px] text-gray-400">↗</span>
                  </a>
                </li>
                <li className="pt-1">
                  <Link
                    href="/services"
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                  >
                    <span>All Services & Tools →</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
