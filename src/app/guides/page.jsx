import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import { BookOpen, Eye, Palette, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { BLOG_POSTS } from "../../lib/blogData";

export const metadata = {
  title: "Design & Accessibility Guides | Revoxera Color",
  description: "Comprehensive guides on color theory, harmonic palettes, WCAG 2.1 accessibility standards, and design system color tokens.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/guides",
  },
  openGraph: {
    title: "Design & Accessibility Guides | Color Codes",
    description: "Comprehensive guides on color theory, harmonic palettes, WCAG 2.1 accessibility standards, and design system color tokens.",
    url: "https://colorcode.revoxera.com/guides",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Color Guides" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design & Accessibility Guides | Color Codes",
    description: "Comprehensive guides on color theory, harmonic palettes, WCAG 2.1 accessibility standards, and design system color tokens.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://colorcode.revoxera.com" },
    { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://colorcode.revoxera.com/guides" }
  ]
};

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-12">
        {/* Page Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            Guides & Documentation
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Color Guides & Best Practices
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            Everything you need to master digital color spaces, contrast compliance, and harmonic design systems for modern web apps.
          </p>
        </div>

        {/* Guides List */}
        <div className="space-y-6 pt-4 border-t border-gray-100">
          {BLOG_POSTS.map((guide) => (
            <div
              key={guide.slug}
              className="p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all space-y-3 group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
                  {guide.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  {guide.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                <Link href={`/blog/${guide.slug}`}>
                  {guide.title}
                </Link>
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {guide.summary}
              </p>

              <div className="pt-2">
                <Link
                  href={`/blog/${guide.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Reference Rules */}
        <section className="space-y-4 pt-8 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Quick Rules of Thumb</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
              <h3 className="font-semibold text-xs text-gray-900">The 60-30-10 Rule</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                60% dominant neutral background, 30% structural secondary color, and 10% vivid accent color for key call-to-actions.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
              <h3 className="font-semibold text-xs text-gray-900">4.5:1 Minimum Contrast</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Always maintain at least 4.5:1 contrast ratio for normal body text against backgrounds to pass WCAG AA standards.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
              <h3 className="font-semibold text-xs text-gray-900">Color Blindness Awareness</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Approximately 8% of men and 0.5% of women experience color vision deficiency. Never rely solely on color to convey critical error or status information.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-1">
              <h3 className="font-semibold text-xs text-gray-900">Semantic Color Tokens</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Define functional tokens like brand-primary, surface-neutral, and status-danger instead of hardcoding raw hex values in components.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
