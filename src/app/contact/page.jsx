"use client";

import { useState } from "react";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Check, Send } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("feedback");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-10">
        
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
            Contact Us
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            We’d love to hear from you.
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            Have a suggestion, spotted a bug, or want to say hello? Drop us a note below or email us directly at{" "}
            <a href="mailto:support@revoxera.com" className="text-gray-900 font-semibold underline underline-offset-2 hover:text-rose-600">
              support@revoxera.com
            </a>.
          </p>
        </div>

        {/* Contact Form & Direct Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-4 border-t border-gray-100">
          
          {/* Form (8 cols) */}
          <div className="md:col-span-8">
            {submitted ? (
              <div className="p-8 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto sm:mx-0">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Thank you for reaching out!</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We've received your message. Our team reads every note and we will reply to <span className="font-semibold text-gray-900">{email}</span> within 24 to 48 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="mt-4 text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 block">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-hidden focus:border-gray-500 cursor-pointer"
                  >
                    <option value="feedback">General Feedback & Suggestions</option>
                    <option value="bug">Bug Report / Value Inaccuracy</option>
                    <option value="feature">Request a New Color Tool</option>
                    <option value="partnership">Partnership & Inquiries</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700 block">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-gray-500 focus:ring-1 focus:ring-gray-500 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2.5 px-5 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Direct channels (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-gray-200/80 text-gray-800 flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-gray-900">Direct Email</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  For quick inquiries or partnership opportunities:
                </p>
                <a
                  href="mailto:support@revoxera.com"
                  className="text-xs font-semibold text-gray-900 hover:text-rose-600 block pt-1"
                >
                  support@revoxera.com
                </a>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-gray-200/80 text-gray-800 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm text-gray-900">GitHub Issues</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Found a WCAG calculation error or browser glitch?
                </p>
                <a
                  href="https://github.com/revoxera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-gray-900 hover:text-rose-600 block pt-1"
                >
                  github.com/revoxera
                </a>
              </div>
            </div>

            <div className="text-xs text-gray-500 leading-relaxed px-1">
              <strong>Response Time:</strong> We are a compact, independent team. We review submissions on weekdays and answer within 24–48 hours.
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
