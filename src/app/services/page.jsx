import Link from "next/link";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Database, 
  Type, 
  Wand2, 
  Braces, 
  Palette, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Layout, 
  ShieldCheck, 
  Code2, 
  Brush,
  CheckCircle2,
  Lock,
  Zap
} from "lucide-react";

export const metadata = {
  title: "Revoxera Developer Suite & Services | Free Web Tools & Design Agency",
  description: "Browse Revoxera's complete ecosystem of developer tools: SQL Formatter, Case Converter, AI Prompt Generator, JSON Formatter, and Color Codes, plus professional agency services.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/services",
  },
};

const revoxeraTools = [
  {
    name: "SQL Formatter & Beautifier",
    url: "https://sqlformatter.revoxera.com/formatter",
    badge: "Database Utility",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    icon: Database,
    iconBg: "bg-emerald-500 text-white",
    desc: "Format, beautify, indent, and validate complex SQL queries. Compatible with PostgreSQL, MySQL, SQLite, BigQuery, Snowflake, and MS SQL with one-click copy and syntax safety.",
    features: ["Standard & dialect indentation", "Keyword capitalization", "Instant syntax validation", "100% Client-side privacy"]
  },
  {
    name: "Smart Case Converter",
    url: "https://caseconverter.revoxera.com/",
    badge: "Code & Text Tool",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    icon: Type,
    iconBg: "bg-purple-500 text-white",
    desc: "Convert text and code variables instantly between camelCase, snake_case, PascalCase, kebab-case, CONSTANT_CASE, Sentence case, and Title Case with batch line processing.",
    features: ["All major programming cases", "Multi-line batch conversion", "Character & word counter", "Clean clipboard copy"]
  },
  {
    name: "AI Prompt Generator & Studio",
    url: "https://ai-prompt.revoxera.com/",
    badge: "AI Engineering",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    icon: Wand2,
    iconBg: "bg-amber-500 text-white",
    desc: "Engineer, structure, and refine high-converting prompts for ChatGPT, Claude, Gemini, and Midjourney. Generates role instructions, context, constraints, and few-shot examples.",
    features: ["Multi-model prompt templates", "Role & persona conditioning", "Tone & length fine-tuning", "Prompt library export"]
  },
  {
    name: "JSON Formatter & Data Mapper",
    url: "https://json-formatter-mapper.revoxera.com/",
    badge: "API & Data Tool",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
    icon: Braces,
    iconBg: "bg-rose-500 text-white",
    desc: "Validate, beautify, minify, and map complex nested JSON payloads. Features real-time syntax error markers, collapsible tree views, and JSON-to-interface data transformations.",
    features: ["Interactive collapsible tree", "Syntax error highlighting", "JSON Minifier & Beautifier", "Direct schema mapping"]
  },
  {
    name: "Color Codes Suite",
    url: "https://colorcode.revoxera.com/",
    badge: "Design & Color Tool",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
    icon: Palette,
    iconBg: "bg-teal-600 text-white",
    desc: "The definitive color toolkit: 2D color picker, OKLCH/HEX/RGB converters, live 360° color wheel, client-side photo color extractor with 10x loupe, and WCAG 2.1 contrast auditor.",
    features: ["2D picker & spectrum slider", "Client-side image extractor", "WCAG AA & AAA validator", "Tailwind & OKLCH export"]
  }
];

const studioServices = [
  {
    name: "UI/UX & Design Systems Engineering",
    desc: "We architect scalable design tokens, custom component libraries, and synchronized Figma UI kits that enable engineering teams to ship cohesive digital products at velocity.",
    icon: Layout,
    tags: ["Figma Kits", "Design Tokens", "Tailwind CSS", "React Components"]
  },
  {
    name: "Accessibility (WCAG 2.1) Auditing",
    desc: "Ensure your web platforms comply with WCAG 2.1 AA/AAA, ADA Title III, and Section 508 standards. Comprehensive manual and automated audits to eliminate legal and usability risks.",
    icon: ShieldCheck,
    tags: ["ADA Compliance", "Screen Reader Testing", "Contrast Audits", "Remediation Plans"]
  },
  {
    name: "High-Performance Web Engineering",
    desc: "From concept to deployment, we build ultra-fast, SEO-optimized web applications using Next.js, React, Node.js, and cloud-native infrastructure with sub-second page loads.",
    icon: Code2,
    tags: ["Next.js App Router", "Fullstack React", "SEO & Performance", "REST & GraphQL APIs"]
  },
  {
    name: "Brand Identity & Color Consulting",
    desc: "Tailored brand identity creation, color psychology analysis, and cross-platform chromatic guidelines engineered to make your software memorable, trustworthy, and visually striking.",
    icon: Brush,
    tags: ["Brand Palettes", "Color Psychology", "Design Guidelines", "Typography Scales"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
        
        {/* Page Hero */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Revoxera Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Developer Tools & Creative Services
          </h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
            A comprehensive suite of free, client-side web developer tools and professional digital product engineering services crafted by Revoxera Studio.
          </p>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 1: REVOXERA WEB & DEVELOPER TOOLS
        ───────────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 block">
                Free Online Utilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                Revoxera Developer Suite
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Client-Side Privacy — Zero Data Uploads</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {revoxeraTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={tool.name}
                  className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs hover:shadow-md hover:border-gray-300 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                        {tool.desc}
                      </p>
                    </div>

                    {/* Feature Bullets */}
                    <ul className="space-y-1.5 pt-2 border-t border-gray-100">
                      {tool.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Launch CTA */}
                  <div className="pt-2">
                    <a
                      href={tool.url}
                      target={tool.url.startsWith("http") && !tool.url.includes("colorcode.revoxera.com") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-2xs group-hover:bg-emerald-600"
                    >
                      <span>Launch {tool.name.split(" ")[0]} Tool</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 2: REVOXERA STUDIO SERVICES
        ───────────────────────────────────────────────────────────── */}
        <section className="space-y-8 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-gray-200">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-700 block">
                Agency & Consulting
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">
                Professional Design & Engineering Services
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-2xs transition-colors self-start sm:self-auto"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studioServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <div 
                  key={svc.name}
                  className="p-6 sm:p-8 bg-gray-50/70 border border-gray-200 rounded-2xl flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-2xs text-emerald-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {svc.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-200/70">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 3: CONTACT BANNER
        ───────────────────────────────────────────────────────────── */}
        <section className="p-8 sm:p-12 bg-gray-900 text-white rounded-3xl shadow-sm space-y-6 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold border border-white/10">
            <Zap className="w-3.5 h-3.5" />
            <span>Ready to Elevate Your Digital Products?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Let’s Build Something Exceptional Together
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Whether you need a dedicated design system, comprehensive WCAG accessibility audit, or custom developer utilities, Revoxera is ready to partner with you.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Get in Touch
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-xl border border-white/15 transition-colors cursor-pointer"
            >
              Learn More About Us
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
