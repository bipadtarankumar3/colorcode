import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Color Blindness Vision Simulator — Protanopia, Deuteranopia & Tritanopia",
  description: "Simulate color perception under 8 different vision deficiencies in real-time. Test how your web UI, charts, and palettes appear to people with red-green and blue-yellow color blindness.",
  keywords: [
    "color blindness simulator",
    "protanopia simulator",
    "deuteranopia color test",
    "tritanopia vision check",
    "color vision deficiency tool",
    "accessible ui color test",
    "achromatopsia simulator"
  ],
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/color-blindness-simulator",
  },
  openGraph: {
    title: "Color Blindness Vision Simulator | Revoxera Color",
    description: "Simulate 8 color vision deficiency modes to design accessible, inclusive web interfaces.",
    url: "https://colorcode.revoxera.com/tools/color-blindness-simulator",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Color Blindness Simulator" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Blindness Vision Simulator | Color Codes",
    description: "Simulate 8 color vision deficiency modes to design accessible, inclusive web interfaces.",
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
        { "@type": "ListItem", "position": 3, "name": "Color Blindness Simulator", "item": "https://colorcode.revoxera.com/tools/color-blindness-simulator" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "Color Blindness Vision Simulator",
      "operatingSystem": "All modern browsers",
      "applicationCategory": "DesignApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Simulate 8 color vision deficiency modes using mathematical retina cone response transformations."
    }
  ]
};

export default function BlindnessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorBeastTool initialTool="blindness" />
    </>
  );
}
