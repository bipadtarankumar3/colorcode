import { Header } from "../../../components/Header";
import Footer from "../../../components/Footer";
import { BookOpen, Clock, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "WCAG 2.1 Color Contrast Standards & ADA Compliance | Color Codes",
  description: "A complete guide to Web Content Accessibility Guidelines (WCAG) 2.1 color contrast ratios, AA vs AAA compliance levels, and how to design accessible UIs.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/guides/wcag-contrast-standards",
  },
};

export default function WcagGuide() {
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
            Web Accessibility
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Understanding WCAG 2.1 Color Contrast Standards
          </h1>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><BookOpen size={13} /> 6 Min Read</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={13} /> Updated for 2026</span>
          </div>
        </header>

        <article className="space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Why Color Contrast Matters</h2>
            <p>
              Digital accessibility is a fundamental requirement for modern software systems. Color contrast standards ensure that text elements are readable by everyone, including individuals with low vision, color blindness, or aging eyes. Meeting these requirements is a key pillar of ADA (Americans with Disabilities Act) and section 508 legal compliance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Compliance Levels: AA vs AAA</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                <h3 className="font-bold text-sm text-gray-900">Level AA (Standard)</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The minimum legal requirement for most commercial and public websites. Requires a ratio of <strong>4.5:1</strong> for standard text and <strong>3:1</strong> for large text (above 18pt or bold 14pt).
                </p>
              </div>

              <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                <h3 className="font-bold text-sm text-gray-900">Level AAA (Enhanced)</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  The gold standard for high-legibility systems (e.g. government, healthcare, or long-form reading). Requires <strong>7:1</strong> for standard text and <strong>4.5:1</strong> for large text.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900">Non-Text Contrast</h2>
            <p>
              WCAG 2.1 introduced rule 1.4.11 for Non-Text Contrast. Visual information required to identify user interface components (such as form field borders, tab indicators, or radio button outlines) must have at least a <strong>3:1</strong> contrast ratio against adjacent background colors.
            </p>
          </section>

          <div className="p-6 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-gray-900">Test Your Colors Now</h4>
              <p className="text-xs text-gray-600">
                Use our automated contrast checker to test your palette combinations with real-time pass/fail indicators.
              </p>
            </div>
            <Link
              href="/tools/contrast-checker"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors whitespace-nowrap"
            >
              Open Contrast Checker
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
