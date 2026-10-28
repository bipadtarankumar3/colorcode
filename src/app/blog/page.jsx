import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { BLOG_POSTS } from "../../lib/blogData";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Blog & Educational Guides | Revoxera Color",
  description: "Practical guides and articles on color theory, digital accessibility, WCAG contrast standards, and modern CSS color spaces.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/blog",
  },
  openGraph: {
    title: "Color & Web Design Blog | Revoxera Color",
    description: "Practical guides on color theory, digital accessibility, WCAG contrast standards, and modern CSS color spaces.",
    url: "https://colorcode.revoxera.com/blog",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Color Codes Blog" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color & Web Design Blog | Color Codes",
    description: "Practical guides on color theory, digital accessibility, WCAG contrast standards, and modern CSS color spaces.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://colorcode.revoxera.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://colorcode.revoxera.com/blog" }
  ]
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-grow space-y-12">
        
        {/* Header */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            Articles & Guides
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
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
              className="p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all space-y-3 group"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-100">
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

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
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
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all"
                >
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
