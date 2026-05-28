import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import { ArrowLeft, Sparkles, Shield, Heart } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | Color Code Lab",
  description: "Learn more about the mission, values, and client-side technology stack behind Color Code.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/about",
  },
};

export default function AboutPage() {
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
          className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors uppercase"
        >
          <ArrowLeft size={16} /> Back to Tools
        </Link>

        <section className="space-y-6">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-indigo-200 bg-indigo-50 text-indigo-600 uppercase">
            Our Story
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            About Color Code
          </h1>
          
          <div className="glass p-8 rounded-3xl border border-white/20 dark:border-white/10 space-y-6 leading-relaxed">
            <p>
              Color Code is a next-generation utility suite built specifically for UI/UX designers, developers, and digital accessibility experts.
            </p>
            <p>
              Many web color tools require server processing, display intrusive pop-up ads, or compromise privacy by tracking uploaded user files. Color Code runs entirely client-side, executing color modifications, contrast checks, and image conversions locally inside your browser sandbox.
            </p>

            <h2 className="text-xl font-bold uppercase text-indigo-600 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Strict Local Privacy
            </h2>
            <p className="text-sm opacity-80">
              We do not track or save your images or color configurations. All scripts execute in your local JavaScript environment, ensuring full HIPAA and GDPR compatibility.
            </p>

            <h2 className="text-xl font-bold uppercase text-indigo-600 flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> Premium UI/UX Design
            </h2>
            <p className="text-sm opacity-80">
              We believe developer and designer tools should be beautiful, fluid, and highly interactive. Experience instant results, smooth animations, and precise hex details.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
