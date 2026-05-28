import { Header } from "@/components/Header";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-400/10 blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="w-full max-w-4xl px-6 md:px-10 py-20 space-y-12 relative z-10">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Terms & Conditions</h1>
          <p className="text-lg opacity-40 font-medium">Last updated: May 2026</p>
        </div>

        <div className="bg-white/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-2xl space-y-8 text-slate-700 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">1. Acceptance of Terms</h2>
            <p>By accessing and using Color Code, you agree to be bound by these Terms and Conditions. Our suite of color tools is designed for professional designers and developers.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">2. Use of Service</h2>
            <p>Color Code provides color conversion, palette generation, and accessibility checking tools. All processing happens locally in your browser to ensure privacy and speed.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">3. Intellectual Property</h2>
            <p>The branding, design, and custom code of Color Code are the property of our team. You may use the generated palettes and CSS code for any personal or commercial projects without attribution.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">4. Disclaimer</h2>
            <p>While we strive for 100% accuracy in color conversions and accessibility simulations, we recommend final verification for mission-critical production environments.</p>
          </section>
        </div>
      </main>

      <footer className="w-full py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-[0.3em]">
        © 2026 COLOR CODE. FRONTIER DESIGN SUITE.
      </footer>
    </div>
  );
}
