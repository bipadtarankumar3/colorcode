import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import { BookOpen, ShieldCheck, Palette, Layers, ArrowRight, Eye, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Design & Accessibility Guides | Color Code",
  description: "Comprehensive guides on color theory, harmonic palettes, WCAG 2.1 accessibility standards, and design system color tokens.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/guides",
  },
};

const GUIDES = [
  {
    title: "Understanding WCAG 2.1 Color Contrast Standards",
    category: "Accessibility & Compliance",
    desc: "Master Web Content Accessibility Guidelines (WCAG) 2.1 contrast ratios, AA vs AAA compliance levels, and legal requirements for digital accessibility.",
    readTime: "6 min read",
    href: "/guides/wcag-contrast-standards",
    badge: "WCAG 2.1",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    gradient: "from-emerald-500 to-teal-600",
    icon: Eye,
  },
  {
    title: "Introduction to Color Theory & Harmonies",
    category: "Design Systems",
    desc: "A practical guide to color wheels, complementary, analogous, triadic, and monochromatic harmonies for modern digital product interfaces.",
    readTime: "5 min read",
    href: "/guides/color-theory-basics",
    badge: "Color Theory",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    gradient: "from-indigo-500 to-violet-600",
    icon: Palette,
  },
];

const QUICK_TIPS = [
  {
    title: "60-30-10 Rule",
    desc: "60% dominant neutral background, 30% structural secondary color, and 10% vivid accent color for key call-to-actions.",
  },
  {
    title: "4.5:1 Minimum Contrast",
    desc: "Always maintain at least 4.5:1 contrast ratio for normal body text against backgrounds to pass WCAG AA standards.",
  },
  {
    title: "Color Blindness Check",
    desc: "Approximately 8% of men and 0.5% of women have color vision deficiency. Never rely solely on color to convey status.",
  },
  {
    title: "Semantic Color Tokens",
    desc: "Define functional tokens like brand-primary, surface-neutral, and status-danger instead of hardcoding raw hex values in components.",
  },
];

export default function GuidesIndexPage() {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-800 dark:text-slate-100">
      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_50%_0%,#4361EE,transparent_50%)]" />
        <div className="grid-bg opacity-30" />
      </div>

      <Header />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 flex-grow space-y-12">
        {/* Header Section */}
        <section className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 shadow-sm uppercase">
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Designer & Developer Guides
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            Color Mastery & Best Practices
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Learn color harmony math, accessibility guidelines, contrast ratios, and how to build scalable design systems.
          </p>
        </section>

        {/* Featured Guides Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GUIDES.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.title}
                href={guide.href}
                className="group relative rounded-3xl p-6 sm:p-8 bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between backdrop-blur-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${guide.badgeColor}`}>
                      {guide.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">{guide.readTime}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${guide.gradient} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {guide.title}
                      </h2>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">
                        {guide.category}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {guide.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-6 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Quick Design Rules Section */}
        <section className="rounded-3xl p-6 sm:p-8 bg-slate-900 text-white space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
            <Sparkles className="w-4 h-4" /> Quick Reference
          </div>
          <h2 className="text-2xl font-black tracking-tight uppercase">Core Principles for UI Color Design</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {QUICK_TIPS.map((tip, idx) => (
              <div key={tip.title} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400">0{idx + 1}.</span>
                <h3 className="text-sm font-bold text-white">{tip.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
