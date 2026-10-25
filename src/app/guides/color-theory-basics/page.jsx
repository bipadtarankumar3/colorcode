import { Header } from "../../../components/Header";
import Footer from "../../../components/Footer";
import { BookOpen, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Color Theory & Harmonic Palettes for UI Designers | Color Codes",
  description: "Learn the core fundamentals of color theory, monochromatic vs triadic harmonies, analogous palettes, and how to construct harmonic visual design systems.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/guides/color-theory-basics",
  },
};

export default function ColorTheoryGuide() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-10">
        <Link 
          href="/guides" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Guides
        </Link>

        <header className="space-y-4 border-b border-gray-100 pb-8">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            UI/UX Design Systems
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Introduction to Color Theory & Harmonies
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><BookOpen size={13} /> 5 Min Read</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={13} /> Updated for 2026</span>
          </div>
        </header>

        <article className="space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">The Power of Color Harmonies</h2>
            <p>
              In digital visual design, selecting colors is more than an aesthetic preference. Harmonious palettes rely on geometry, mathematical relations on the color wheel, and color psychology to evoke positive emotions and highlight product hierarchy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">5 Core Harmony Types</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
                <h3 className="font-bold text-xs text-gray-900">Complementary</h3>
                <p className="text-xs text-gray-600">Colors directly opposite each other on the color wheel (180°). Delivers maximum contrast and vibrant focal points.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
                <h3 className="font-bold text-xs text-gray-900">Analogous</h3>
                <p className="text-xs text-gray-600">Adjacent colors on the wheel (±30°). Creates a serene, unified feeling common in nature and photography.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
                <h3 className="font-bold text-xs text-gray-900">Triadic</h3>
                <p className="text-xs text-gray-600">Three colors spaced evenly at 120° angles. Offers vibrant visual contrast while retaining visual stability.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
                <h3 className="font-bold text-xs text-gray-900">Tetradic (Double Complementary)</h3>
                <p className="text-xs text-gray-600">Four colors arranged into two complementary pairs. Rich and varied, ideal when one color dominates.</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1 sm:col-span-2">
                <h3 className="font-bold text-xs text-gray-900">Monochromatic</h3>
                <p className="text-xs text-gray-600">Variations in lightness and saturation of a single hue. Clean, sophisticated, and guaranteed to harmonize effortlessly.</p>
              </div>
            </div>
          </section>

          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-gray-900">Try Generating Harmonies</h4>
              <p className="text-xs text-gray-600">
                Use our interactive Palette Builder to generate and export custom color harmonies instantly.
              </p>
            </div>
            <Link
              href="/tools/palette-generator"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors whitespace-nowrap"
            >
              Open Palette Builder
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
