import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata = {
  title: {
    default: "HTML Color Codes | Hex, RGB, HSL & OKLCH Color Tools & Generator",
    template: "%s | Color Codes by Revoxera",
  },
  description: "Free online HTML color picker, hex color codes, RGB, HSL, and OKLCH converters. Explore dynamic color wheels, WCAG contrast checkers, image color extractors, and design system charts.",
  keywords: [
    "html color codes",
    "hex color codes",
    "color picker",
    "rgb to hex",
    "hsl color picker",
    "oklch color converter",
    "wcag contrast checker",
    "color wheel online",
    "extract color from image",
    "tailwind colors",
    "color blindness simulator",
    "css color names",
    "design system palettes"
  ],
  authors: [{ name: "Revoxera Studio", url: "https://colorcode.revoxera.com" }],
  creator: "Revoxera Studio",
  publisher: "Revoxera Studio",
  metadataBase: new URL("https://colorcode.revoxera.com"),
  alternates: {
    canonical: "https://colorcode.revoxera.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "HTML Color Codes & Hex Tools | Color Code by Revoxera",
    description: "The complete, high-performance color suite: 2D Color Picker, Harmonic Color Wheel, Image Palette Extractor, and WCAG Contrast Checker.",
    url: "https://colorcode.revoxera.com",
    siteName: "Color Codes by Revoxera",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Color Codes Suite by Revoxera",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML Color Codes & Hex Tools | Color Code by Revoxera",
    description: "The complete color suite: 2D Picker, Dynamic Wheel, Image Extractor, and WCAG Contrast Checker.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Revoxera Studio",
  "url": "https://colorcode.revoxera.com",
  "logo": "https://colorcode.revoxera.com/logo.png",
  "description": "Professional design systems, accessibility compliance, and developer utilities engineering.",
  "sameAs": [
    "https://github.com/revoxera",
    "https://twitter.com/revoxera"
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Color Codes",
  "operatingSystem": "All modern browsers (Chrome, Safari, Firefox, Edge)",
  "applicationCategory": "DesignApplication",
  "applicationSubCategory": "Developer & Graphic Design Utilities",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "Professional suite of client-side color tools: 2D picker, OKLCH converter, image palette extractor, WCAG accessibility contrast auditor, and chromatic deficiency simulator.",
  "featureList": [
    "2D Saturation & Brightness Color Picker with live EyeDropper",
    "Dynamic 360-degree Harmonic Color Wheel with live UI preview",
    "Client-side Image Color Extractor with 10x pixel magnification loupe",
    "WCAG 2.1 AA and AAA Contrast Ratio Auditor",
    "Perceptually uniform OKLCH, HEX, RGB, and HSL converter",
    "10-Step Shades and Tints chart generator",
    "Complete Tailwind CSS v4 and Material You design tokens",
    "8-mode Color Blindness Deficiency Simulator",
    "Searchable 148 W3C Standard CSS Named Colors Directory"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://colorcode.revoxera.com",
  "name": "Color Codes by Revoxera",
  "description": "The definitive online color toolbox for developers, UI/UX designers, and digital artists.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://colorcode.revoxera.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Build Accessible Color Palettes for Web Applications",
  "description": "Step-by-step workflow to choose brand colors, generate harmonic variations, and guarantee WCAG AA/AAA compliance.",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Select or Pick a Base Color",
      "text": "Use the 2D Color Picker or EyeDropper API to sample your primary brand hue in HEX, RGB, or modern OKLCH format."
    },
    {
      "@type": "HowToStep",
      "name": "Generate Harmonic Palettes",
      "text": "Navigate to the Color Wheel tool to compute triadic, complementary, or analogous combinations with geometric precision."
    },
    {
      "@type": "HowToStep",
      "name": "Audit WCAG Contrast Compliance",
      "text": "Verify that your foreground text and background combinations achieve at least 4.5:1 for regular text (AA) or 7:1 (AAA)."
    },
    {
      "@type": "HowToStep",
      "name": "Export Code Tokens",
      "text": "Export the generated colors directly as CSS Custom Properties, Tailwind CSS configuration tokens, or SVG swatches."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between HEX, RGB, HSL, and OKLCH color spaces?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "HEX and RGB represent colors using red, green, and blue light channels (0-255). HSL represents hue, saturation, and lightness in a cylinder, but lacks perceptual uniformity (yellow appears much brighter than blue at 50% lightness). OKLCH is a modern, perceptually uniform color space where lightness matches human eye perception, preventing muddy gradient blending and unpredictable contrast."
      }
    },
    {
      "@type": "Question",
      "name": "What are the WCAG 2.1 color contrast requirements for AA and AAA compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WCAG 2.1 requires a minimum contrast ratio of 4.5:1 for normal body text and 3:1 for large text (18pt or 14pt bold) to meet Level AA. For Level AAA enhanced compliance, normal text must meet 7:1 and large text must achieve 4.5:1."
      }
    },
    {
      "@type": "Question",
      "name": "Does Color Code upload my photos to an external server when extracting colors?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The Image Color Extractor runs entirely in your local browser using HTML5 Canvas and Web APIs. Your images and extracted pixel data never leave your computer."
      }
    },
    {
      "@type": "Question",
      "name": "What are the standard color harmonies used in web design?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Key color harmonies include: Complementary (two colors directly opposite at 180° on the color wheel), Analogous (adjacent colors spaced 30° apart), Triadic (three colors equally spaced at 120°), Split-Complementary (a base color plus two colors adjacent to its complement at 150° and 210°), and Tetradic (four colors in two complementary pairs at 90° intervals)."
      }
    },
    {
      "@type": "Question",
      "name": "How does the Color Blindness Simulator calculate color deficiency filters?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our simulator applies scientifically calibrated Brettel and Machado matrix transformations to simulate Protanopia (red-blind), Deuteranopia (green-blind), Tritanopia (blue-blind), and total Achromatopsia, enabling designers to verify visual accessibility before publishing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I export colors to Tailwind CSS or CSS Custom Properties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every tool on Color Code includes instant copy buttons for CSS variables (--color-primary: #hex), Tailwind class names, JSON token dictionaries, and SVG palettes."
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Documentation" />
        
        {/* JSON-LD Schemas for Search Engines & AI Agents */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
