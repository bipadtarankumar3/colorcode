import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Color Codes",
  description: "Privacy policy for Color Codes: 100% client-side execution, zero tracking, and no server data storage.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <header className="space-y-2 border-b border-gray-100 pb-6">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Legal & Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">
            Last updated: October 2026
          </p>
        </header>

        <div className="space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">1. Client-Side Processing</h2>
            <p>
              At Color Codes, we believe your design workflows and assets belong solely to you. All color conversions, image color extractions, and palette simulations execute locally within your browser sandbox using native client-side JavaScript. No images or palette data are ever transmitted to or stored on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">2. Information We Do Not Collect</h2>
            <p>
              We do not require account registration, usernames, or passwords. We do not sell user data, nor do we employ cross-site marketing trackers or invasive profiling cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">3. Local Storage</h2>
            <p>
              When using features like local color history, values are persisted solely in your browser's private <code className="text-xs bg-gray-100 px-1 py-0.5 rounded font-mono">localStorage</code>. This data never leaves your device and can be cleared through your browser settings at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">4. Contacting Us</h2>
            <p>
              If you have any questions or feedback regarding our privacy standards, you can contact us directly at{" "}
              <a href="mailto:support@revoxera.com" className="text-gray-900 font-medium underline underline-offset-2 hover:text-rose-600">
                support@revoxera.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
