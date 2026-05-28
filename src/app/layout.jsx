import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: {
    default: "Color Code | Ultimate Professional Color Utility Suite",
    template: "%s | Color Code",
  },
  description: "Color Code is the #1 tool for visual designers. Generate gradients, harmonic palettes, extract colors from images, check WCAG contrast, and simulate color blindness. Built for high-performance design systems.",
  keywords: ["color generator", "gradient builder", "palette generator", "contrast checker", "tailwind colors", "color blindness simulator", "design tools", "color converter"],
  authors: [{ name: "Color Code Lab" }],
  metadataBase: new URL("https://colorcode.revoxera.com"),
  alternates: {
    canonical: "https://colorcode.revoxera.com/",
  },
  openGraph: {
    title: "Color Code | Ultimate Color Utility",
    description: "The most powerful color tool for modern designers.",
    url: "https://colorcode.revoxera.com",
    siteName: "Color Code",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Color Code Color Suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Code | Ultimate Color Utility",
    description: "The most powerful color tool for modern designers.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Color Code",
  "operatingSystem": "Windows, macOS, Linux, Android, iOS",
  "applicationCategory": "DesignApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Professional developer and designer suite to generate gradients, extract colors from images, build palettes, check WCAG color contrast, and simulate color blindness in real-time.",
  "featureList": [
    "Gradient Generator with tailwind class export",
    "Harmonic Palette Generator",
    "Tailwind Color Reference map",
    "Client-side Image Color Extractor",
    "WCAG 2.1 Contrast Ratio Checker",
    "Color Details & Spaces Converter",
    "Shades & Tints Generator",
    "8-Mode Color Blindness Simulator"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://colorcode.revoxera.com",
  "name": "Color Code",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://colorcode.revoxera.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Generate Harmonious Color Palettes",
  "description": "Follow these simple steps to build beautiful, accessible color systems using Color Code.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Generate or Select a Base Color",
      "text": "Start by generating a random hex code or enter your primary brand color in the Color Details tab."
    },
    {
      "@type": "HowToStep",
      "name": "Extract Palettes and Harmonies",
      "text": "Navigate to the Palette tab to automatically generate complementary, split-complementary, triadic, tetradic, or analogous variations."
    },
    {
      "@type": "HowToStep",
      "name": "Verify Accessibility Ratios",
      "text": "Test your foreground and background colors in the A11y Contrast Checker to guarantee compliance with WCAG AA and AAA standards."
    },
    {
      "@type": "HowToStep",
      "name": "Export Code Tokens",
      "text": "Export your generated values as CSS custom properties, HEX arrays, or Tailwind config tokens."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is WCAG color contrast compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WCAG (Web Content Accessibility Guidelines) outlines requirements for text readability. Standard text requires a contrast ratio of at least 4.5:1 (AA) or 7:1 (AAA), while large text requires 3:1 (AA) or 4.5:1 (AAA)."
      }
    },
    {
      "@type": "Question",
      "name": "How does the color blindness simulator work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Color Blindness Simulator applies digital filters to render colors exactly as they are perceived by individuals with Protanopia, Deuteranopia, Tritanopia, and other conditions."
      }
    },
    {
      "@type": "Question",
      "name": "Are my images uploaded to any server when using the image extractor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely not. The Image Color Extractor processes your image files entirely inside your local browser using canvas elements. No upload requests are ever sent."
      }
    },
    {
      "@type": "Question",
      "name": "Can I export Tailwind CSS custom configurations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our Tailwind color reference tool maps tailwind hex systems directly and enables instant copy-pasting of config extensions."
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <GoogleAnalytics gaId="G-2Y0DSV87D7" />
      </body>
    </html>
  );
}
