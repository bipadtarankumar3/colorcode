import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | Color Code Support",
  description: "Get in touch with the Color Code support and developer team for feature requests, bug reports, or general feedback.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/contact",
  },
};

export default function ContactPage() {
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

        <section className="space-y-6">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wider border border-emerald-200 bg-emerald-50 text-emerald-600 uppercase">
            Support Channels
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            Contact Support
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="mailto:support@revoxera.com"
              className="glass p-8 rounded-3xl border border-white/20 dark:border-white/10 space-y-4 hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold uppercase text-slate-900 dark:text-white">Email Support</h2>
              <p className="text-xs opacity-75">Send your queries, feature recommendations, or enterprise licensing requests directly to our team.</p>
              <span className="text-sm font-black text-emerald-600">support@revoxera.com</span>
            </a>

            <a 
              href="https://github.com/revoxera"
              target="_blank"
              rel="noopener noreferrer"
              className="glass p-8 rounded-3xl border border-white/20 dark:border-white/10 space-y-4 hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold uppercase text-slate-900 dark:text-white">GitHub Issues</h2>
              <p className="text-xs opacity-75">Spotted a bug or WCAG parsing discrepancy? Log a public ticket in our repository issues page.</p>
              <span className="text-sm font-black text-emerald-600">github.com/revoxera</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
