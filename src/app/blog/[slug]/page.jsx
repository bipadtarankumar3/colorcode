import { Header } from "../../../components/Header";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "../../../lib/blogData";
import { ArrowLeft, Clock, Calendar, ArrowRight, BookOpen, Sparkles } from "lucide-react";

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
    openGraph: {
      title: `${post.title} | Revoxera Color`,
      description: post.summary,
      url: `https://colorcode.revoxera.com/blog/${slug}`,
      siteName: "Revoxera Color",
      images: [{ url: "/logo.png", width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.date,
      authors: ["Revoxera Design Team"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: ["/logo.png"],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://colorcode.revoxera.com" },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://colorcode.revoxera.com/blog" },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://colorcode.revoxera.com/blog/${slug}` }
        ]
      },
      {
        "@type": "Article",
        "headline": post.title,
        "description": post.summary,
        "datePublished": post.date,
        "author": {
          "@type": "Organization",
          "name": "Revoxera Design Team",
          "url": "https://colorcode.revoxera.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Revoxera Studio",
          "logo": {
            "@type": "ImageObject",
            "url": "https://colorcode.revoxera.com/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://colorcode.revoxera.com/blog/${slug}`
        }
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-10">
        
        {/* Breadcrumbs & Back Link */}
        <div className="flex items-center justify-between gap-4 text-xs text-gray-500">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Articles
          </Link>

          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-emerald-700">Blog</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold truncate max-w-[200px]">{post.category}</span>
          </nav>
        </div>

        {/* Article Header */}
        <header className="space-y-4 border-b border-gray-100 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
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

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-base text-gray-600 leading-relaxed font-normal pt-1">
            {post.summary}
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs text-gray-500">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
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
        <section className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-3 mt-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Put this theory into practice
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Test and generate harmonious palettes, inspect WCAG contrast ratios, and copy CSS code with our client-side tools.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
            >
              Open Color Picker
            </Link>
            <Link
              href="/tools/contrast-checker"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
            >
              Check WCAG Contrast
            </Link>
            <Link
              href="/tools/palette-generator"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
            >
              Palette Builder
            </Link>
          </div>
        </section>

        {/* Related Guides to Boost Dwell Time */}
        <section className="space-y-4 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Related Guides & Articles
            </h3>
            <Link href="/blog" className="text-xs font-bold text-emerald-700 hover:text-emerald-800">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all group block space-y-1.5"
              >
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {other.category}
                </span>
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {other.title}
                </h4>
                <div className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {other.readTime}
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
