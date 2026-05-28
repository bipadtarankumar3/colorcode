import { Header } from "@/components/Header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-purple-400/10 blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="w-full max-w-4xl px-6 md:px-10 py-20 space-y-12 relative z-10">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Privacy Policy</h1>
          <p className="text-lg opacity-40 font-medium">No Data Collection. Pure Privacy.</p>
        </div>

        <div className="bg-white/40 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-white/60 shadow-2xl space-y-8 text-slate-700 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">1. Local-First Philosophy</h2>
            <p>At Color Code, we believe your design data belongs to you. All color processing, image extraction, and palette generation are performed locally within your browser using JavaScript. No color data is ever sent to our servers.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">2. Information We Don&apos;t Collect</h2>
            <p>We do not collect personal information, cookies, or tracking data. We don&apos;t use analytics scripts that compromise your privacy or slow down your workflow.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">3. Local Storage</h2>
            <p>We use your browser&apos;s local storage solely to provide features like Color History. This data remains on your device and can be cleared at any time via the sidebar controls.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-black">4. Third-Party Links</h2>
            <p>While we may link to documentation or community resources (like GitHub or Figma), those sites have their own privacy policies which we encourage you to review.</p>
          </section>
        </div>
      </main>

      <footer className="w-full py-12 text-center opacity-30 text-[10px] font-black uppercase tracking-[0.3em]">
        © 2026 COLOR CODE. BUILT FOR PRIVACY.
      </footer>
    </div>
  );
}
