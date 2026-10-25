import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Heart, Zap, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Us | Color Codes",
  description: "Learn why we built Color Codes: a lightweight, privacy-focused, client-side color tool suite for designers and developers.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-12">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Color Picker
        </Link>

        {/* Page Header */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            About Color Codes
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Tools for design should be well designed themselves.
          </h1>
          <p className="text-base text-gray-600 leading-relaxed pt-2">
            Color Codes is a free, fast, and privacy-respecting color utility built for UI/UX designers, developers, and visual creators who care about craft.
          </p>
        </div>

        {/* Narrative / Mission */}
        <section className="space-y-6 text-sm sm:text-base text-gray-700 leading-relaxed border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900">Our Story</h2>
          <p>
            When we started building digital interfaces, we found ourselves visiting the same color picker sites dozens of times every week. But over the years, most legacy color tools became bloated — flooded with video auto-play ads, tracking pixels, sluggish scripts, and cumbersome interfaces.
          </p>
          <p>
            We built Color Codes with a simple ethos: create the cleanest, fastest color workbench on the web. A tool that loads instantly, stays out of your way, and gives you exact hex values, harmonic palettes, WCAG contrast scores, and CSS code in milliseconds.
          </p>
        </section>

        {/* Principles */}
        <section className="space-y-6 border-t border-gray-100 pt-8">
          <h2 className="text-xl font-bold text-gray-900">What We Stand For</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Zero Server Tracking
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your color palettes and uploaded images are processed entirely inside your browser sandbox using native JavaScript and HTML5 Canvas. Nothing is ever sent to our servers.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                <Zap className="w-4 h-4 text-amber-600" />
                Speed & Simplicity
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                No paywalls, no forced logins, and no intrusive interstitials. Just clean tools that work right away on desktop, tablet, and mobile.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                <Sparkles className="w-4 h-4 text-rose-600" />
                Modern Color Science
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Support for traditional RGB and Hex values alongside modern perceptual color spaces like OKLCH (CSS Color Module Level 4) for uniform perceived lightness.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
                <Heart className="w-4 h-4 text-purple-600" />
                Built for Inclusivity
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Accessibility shouldn't be an afterthought. We built automated WCAG 2.1 contrast calculations and an 8-mode color blindness simulator directly into the suite.
              </p>
            </div>
          </div>
        </section>

        {/* Studio / Colophon */}
        <section className="space-y-4 border-t border-gray-100 pt-8 text-sm text-gray-600 leading-relaxed">
          <h2 className="text-xl font-bold text-gray-900">Who We Are</h2>
          <p>
            Color Codes is crafted and maintained by Revoxera Studio, an independent team of frontend engineers and product designers. We use this tool ourselves every day while designing web apps, writing design systems, and authoring CSS.
          </p>
          <p>
            If you have ideas, feedback, or spot any discrepancies in color values, we'd love to hear from you. Please reach out via our{" "}
            <Link href="/contact" className="text-gray-900 font-medium underline underline-offset-2 hover:text-rose-600">
              contact page
            </Link>{" "}
            or email us at{" "}
            <a href="mailto:support@revoxera.com" className="text-gray-900 font-medium underline underline-offset-2 hover:text-rose-600">
              support@revoxera.com
            </a>.
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
}
