import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Harmonic Color Palette Generator — Complementary, Triadic & Analogous",
  description: "Generate balanced harmonic color palettes based on mathematical color theory rules. Instant export to CSS variables, Tailwind config, and SVG swatches.",
  keywords: [
    "color palette generator",
    "harmonic color wheel",
    "complementary color palette",
    "triadic colors generator",
    "analogous color schemes",
    "ui design palettes"
  ],
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/palette-generator",
  },
  openGraph: {
    title: "Harmonic Color Palette Generator | Revoxera Color",
    description: "Generate complementary, split-complementary, triadic, analogous, and monochromatic color palettes instantly.",
    url: "https://colorcode.revoxera.com/tools/palette-generator",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Harmonic Palette Generator" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonic Color Palette Generator | Color Codes",
    description: "Build harmonious color palettes using complementary, analogous, triadic, and monochromatic rules.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://colorcode.revoxera.com" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://colorcode.revoxera.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Harmonic Palette Generator", "item": "https://colorcode.revoxera.com/tools/palette-generator" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "Harmonic Color Palette Generator",
      "operatingSystem": "All modern browsers",
      "applicationCategory": "DesignApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Calculate harmonic color palettes using geometric 360-degree color wheel mathematics."
    }
  ]
};

export default function PalettePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorBeastTool initialTool="palette" />
    </>
  );
}
