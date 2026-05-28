import { Header } from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ShieldCheck, BookOpen, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Color Theory & Harmonic Palettes for UI Designers",
  description: "Learn the core fundamentals of color theory, monochromatic vs triadic harmonies, analogous palettes, and how to construct premium, harmonic visual design systems.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/guides/color-theory-basics",
  },
};

export default function ColorTheoryGuide() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-800 dark:text-slate-100">
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,#7c3aed,transparent_50%)]" />
        <div className="grid-bg opacity-30" />
      </div>

      <Header />

      <main className="w-full max-w-4xl mx-auto px-6 py-12 flex-grow space-y-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors uppercase"
        >
          <ArrowLeft size={16} /> Back to Tools
        </Link>

        <article className="space-y-6">
          <header className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-purple-200 bg-purple-50 text-purple-600 uppercase">
              UI/UX Design Systems
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Introduction to Color Theory & Harmonies
            </h1>
            <div className="flex items-center gap-4 text-xs opacity-50 font-bold uppercase">
              <span className="flex items-center gap-1"><BookOpen size={14} /> 5 Min Read</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={14} /> Published 2026</span>
            </div>
          </header>

          <div className="glass p-8 rounded-3xl border border-white/20 dark:border-white/10 space-y-6 leading-relaxed">
            <h2 className="text-xl font-bold uppercase text-purple-600">The Power of Color Harmonies</h2>
            <p>
              In digital visual design, selecting colors is more than an aesthetic preference. Harmonious palettes rely on geometry, mathematical relations on the color wheel, and color psychology to evoke positive emotions and highlight product hierarchy.
            </p>

            <h2 className="5 Core Harmony Types">5 Core Harmony Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/40 border border-white/20 dark:bg-slate-800/40">
                <h3 className="font-extrabold text-xs text-purple-700 dark:text-purple-400 uppercase">Complementary</h3>
                <p className="text-xs opacity-75 mt-1">Colors directly opposite each other on the color wheel. Delivers maximum contrast and vibrant focal points.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/40 border border-white/20 dark:bg-slate-800/40">
                <h3 className="font-extrabold text-xs text-purple-700 dark:text-purple-400 uppercase">Analogous</h3>
                <p className="text-xs opacity-75 mt-1">Three adjacent colors. Creates a serene, uniform, natural design language.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/40 border border-white/20 dark:bg-slate-800/40">
                <h3 className="font-extrabold text-xs text-purple-700 dark:text-purple-400 uppercase">Triadic</h3>
                <p className="text-xs opacity-75 mt-1">Three colors spaced evenly on the wheel. Offers vibrant, balanced color sets.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/40 border border-white/20 dark:bg-slate-800/40">
                <h3 className="font-extrabold text-xs text-purple-700 dark:text-purple-400 uppercase">Monochromatic</h3>
                <p className="text-xs opacity-75 mt-1">Variations in shade, tint, and saturation of a single base color. Ideal for clean layout consistency.</p>
              </div>
            </div>

            <h2 className="text-xl font-bold uppercase text-purple-600">Building a Design System Palette</h2>
            <p>
              When engineering design tokens, follow the **60-30-10 Rule**:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs opacity-80">
              <li>**60% dominant base**: Typically clean white, off-black, or neutral grey backgrounds.</li>
              <li>**30% secondary base**: Primary brand layout colors, borders, and main body text.</li>
              <li>**10% accent points**: Vibrant complementary colors used exclusively for primary action buttons (CTAs), warnings, or features.</li>
            </ul>

            <div className="pt-6 border-t border-black/5 flex flex-col items-center">
              <Link 
                href="/tools/palette-generator" 
                className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs tracking-widest uppercase transition-all shadow-[0_10px_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
              >
                Launch Palette Builder →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
