import { Header } from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../../../lib/blogData";
import { ArrowLeft, Clock, Calendar, User, Share2 } from "lucide-react";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Color Codes Blog`,
    description: post.summary,
    alternates: {
      canonical: `https://colorcode.revoxera.com/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-10">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to All Articles
        </Link>

        {/* Article Header */}
        <header className="space-y-4 border-b border-gray-100 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 font-medium">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-400" />
              {post.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-gray-600 leading-relaxed font-normal pt-1">
            {post.summary}
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs text-gray-500">
            <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-[10px]">
              R
            </div>
            <span>Written by <strong className="text-gray-800 font-medium">Revoxera Design Team</strong></span>
          </div>
        </header>

        {/* Article Body Content */}
        <article className="prose prose-gray max-w-none text-gray-700 leading-relaxed text-sm sm:text-base space-y-6">
          {post.content.trim().split("\n\n").map((block, idx) => {
            const trimmed = block.trim();

            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-lg sm:text-xl font-bold text-gray-900 pt-4 pb-1">
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }

            if (trimmed.startsWith("```")) {
              const codeContent = trimmed.replace(/```[a-z]*\n?/g, "");
              return (
                <pre key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs overflow-x-auto text-gray-800">
                  <code>{codeContent}</code>
                </pre>
              );
            }

            if (trimmed.startsWith("- ")) {
              const items = trimmed.split("\n- ").map(i => i.replace(/^- /, ""));
              return (
                <ul key={idx} className="list-disc pl-5 space-y-2 text-gray-700">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} dangerouslySetInnerHTML={{
                      __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-900 font-mono">$1</code>')
                    }} />
                  ))}
                </ul>
              );
            }

            if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ")) {
              const items = trimmed.split(/\n(?=\d+\.\s)/).map(i => i.replace(/^\d+\.\s*/, ""));
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-3 text-gray-700">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} dangerouslySetInnerHTML={{
                      __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-900 font-mono">$1</code>')
                    }} />
                  ))}
                </ol>
              );
            }

            return (
              <p
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: trimmed
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-xs text-gray-900 font-mono">$1</code>')
                }}
              />
            );
          })}
        </article>

        {/* Interactive Tool CTA */}
        <section className="p-6 rounded-xl border border-gray-200 bg-gray-50 space-y-3 mt-12">
          <h4 className="text-sm font-bold text-gray-900">Put this into practice</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Test and generate harmonious palettes, inspect WCAG contrast ratios, and copy CSS code with our client-side tools.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/"
              className="px-3.5 py-1.5 bg-gray-900 text-white rounded-md text-xs font-semibold hover:bg-black transition-colors"
            >
              Open Color Picker
            </Link>
            <Link
              href="/tools/contrast-checker"
              className="px-3.5 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-md text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              Check WCAG Contrast
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
