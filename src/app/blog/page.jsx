import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { BLOG_POSTS } from "../../lib/blogData";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Blog & Guides | Color Codes",
  description: "Practical guides and articles on color theory, digital accessibility, WCAG contrast standards, and modern CSS color spaces.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Articles & Guides
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Color & Web Design Blog
          </h1>
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
            Practical essays, color theory deep dives, and accessibility tutorials written by product designers and frontend engineers.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="space-y-6 pt-4 border-t border-gray-100">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-6 sm:p-8 rounded-xl border border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs transition-all space-y-3 group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  {post.readTime}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed">
                {post.summary}
              </p>

              <div className="pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 group-hover:text-rose-600 group-hover:translate-x-1 transition-all"
                >
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Tool Recommendation */}
        <div className="p-6 rounded-xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-900">Need to calculate values now?</h3>
            <p className="text-xs text-gray-500">
              Check out our client-side tools for palettes, gradients, and WCAG contrast.
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
          >
            Launch Color Picker
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
