import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-100 selection:text-emerald-900 relative overflow-hidden flex flex-col items-center w-full">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-emerald-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-teal-400/10 blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="w-full max-w-4xl px-4 sm:px-6 md:px-10 py-16 space-y-12 relative z-10 flex-grow">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Privacy Policy</h1>
          <p className="text-lg opacity-40 font-medium">No Data Collection. Pure Privacy.</p>
        </div>

        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl p-6 md:p-12 rounded-[2.5rem] border border-white/60 dark:border-white/10 shadow-2xl space-y-8 text-slate-700 dark:text-slate-350 leading-relaxed font-sans font-medium">
          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">1. Local-First Philosophy</h2>
            <p>At Color Code, we believe your design data belongs to you. All color processing, image extraction, and palette generation are performed locally within your browser using JavaScript. No color data is ever sent to our servers.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">2. Information We Don&apos;t Collect</h2>
            <p>We do not collect personal information, cookies, or tracking data. We don&apos;t use analytics scripts that compromise your privacy or slow down your workflow.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">3. Local Storage</h2>
            <p>We use your browser&apos;s local storage solely to provide features like Color History. This data remains on your device and can be cleared at any time via the sidebar controls.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-black uppercase tracking-widest text-slate-900 dark:text-white">4. Third-Party Links</h2>
            <p>While we may link to documentation or community resources (like GitHub or Figma), those sites have their own privacy policies which we encourage you to review.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
