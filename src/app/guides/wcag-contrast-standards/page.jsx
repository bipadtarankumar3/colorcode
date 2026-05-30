import { Header } from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ShieldCheck, BookOpen, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "WCAG 2.1 Color Contrast Standards & ADA Compliance",
  description: "A complete guide to Web Content Accessibility Guidelines (WCAG) 2.1 color contrast ratios, AA vs AAA compliance levels, and how to design accessible UIs.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/guides/wcag-contrast-standards",
  },
};

export default function WcagGuide() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-800 dark:text-slate-100">
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_0%,#3b82f6,transparent_50%)]" />
        <div className="grid-bg opacity-30" />
      </div>

      <Header />

      <main className="w-full max-w-4xl mx-auto px-6 py-12 flex-grow space-y-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-emerald-600 hover:text-emerald-800 transition-colors uppercase"
        >
          <ArrowLeft size={16} /> Back to Tools
        </Link>

        <article className="space-y-6">
          <header className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 uppercase">
              Web Accessibility
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
              Understanding WCAG 2.1 Color Contrast Standards
            </h1>
            <div className="flex items-center gap-4 text-xs opacity-50 font-bold uppercase">
              <span className="flex items-center gap-1"><BookOpen size={14} /> 6 Min Read</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={14} /> Published 2026</span>
            </div>
          </header>

          <div className="glass p-8 rounded-3xl border border-white/20 dark:border-white/10 space-y-6 leading-relaxed">
            <h2 className="text-xl font-bold uppercase text-emerald-600">Why Color Contrast Matters</h2>
            <p>
              Digital accessibility is a fundamental requirement for modern software systems. Color contrast standards ensure that text elements are readable by everyone, including individuals with low vision, color blindness, or aging eyes. Meeting these requirements is a key pillar of ADA (Americans with Disabilities Act) and section 508 legal compliance.
            </p>

            <h2 className="text-xl font-bold uppercase text-emerald-600">Compliance Levels: AA vs AAA</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-white/40 border border-white/30 dark:bg-slate-800/40 space-y-2">
                <h3 className="font-extrabold text-sm text-emerald-700 dark:text-emerald-400 uppercase">Level AA (Standard)</h3>
                <p className="text-xs opacity-75">
                  The minimum legal requirement for most commercial and public websites. Requires a ratio of **4.5:1** for standard text and **3:1** for large text (above 18pt or bold 14pt).
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white/40 border border-white/30 dark:bg-slate-800/40 space-y-2">
                <h3 className="font-extrabold text-sm text-emerald-700 dark:text-emerald-400 uppercase">Level AAA (Enhanced)</h3>
                <p className="text-xs opacity-75">
                  The gold standard for accessibility, frequently required for government, educational, or highly inclusive systems. Requires **7:1** for standard text and **4.5:1** for large text.
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold uppercase text-emerald-600">Exceptions to the Rules</h2>
            <p>
              Not all design elements require contrast ratios. Excluded items include:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-xs opacity-80">
              <li>Logos, company wordmarks, or product brands.</li>
              <li>Decorative elements or text that is purely graphical.</li>
              <li>Disabled buttons or form components that are inactive.</li>
            </ul>

            <h2 className="text-xl font-bold uppercase text-emerald-600">How to Fix Contrast Issues</h2>
            <p>
              If your current combination fails, you can resolve it by:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2 text-xs opacity-80">
              <li>Slightly darkening your text color if using a light background.</li>
              <li>Lightening your text color if using a dark background.</li>
              <li>Increasing the font weight or size to shift into the &quot;Large Text&quot; category which has lower ratio thresholds.</li>
            </ol>

            <div className="pt-6 border-t border-black/5 flex flex-col items-center">
              <Link 
                href="/tools/contrast-checker" 
                className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs tracking-widest uppercase transition-all shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
              >
                Launch Contrast Checker →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
