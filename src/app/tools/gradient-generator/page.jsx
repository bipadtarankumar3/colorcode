import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "CSS Gradient Generator & Builder — Linear, Radial & Multi-Stop",
  description: "Create smooth multi-stop linear and radial CSS gradients with live angle controls. Copy ready-to-use CSS, Tailwind CSS classes, and SVG backgrounds instantly.",
  keywords: [
    "css gradient generator",
    "linear gradient css",
    "radial gradient generator",
    "tailwind gradient generator",
    "gradient background css",
    "multi stop gradient builder"
  ],
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/gradient-generator",
  },
  openGraph: {
    title: "CSS Gradient Generator | Revoxera Color",
    description: "Create beautiful, smooth, multi-color CSS gradients instantly. Export code as raw CSS, linear-gradient declarations, or Tailwind CSS classes.",
    url: "https://colorcode.revoxera.com/tools/gradient-generator",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "CSS Gradient Generator" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSS Gradient Generator | Color Codes",
    description: "Create smooth multi-stop linear and radial CSS gradients with live controls and instant export.",
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
        { "@type": "ListItem", "position": 3, "name": "CSS Gradient Generator", "item": "https://colorcode.revoxera.com/tools/gradient-generator" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "CSS Gradient Generator",
      "operatingSystem": "All modern browsers",
      "applicationCategory": "DesignApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Interactive CSS linear and radial gradient builder with multi-stop color controls and one-click Tailwind CSS and CSS3 export."
    }
  ]
};

export default function GradientPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorBeastTool initialTool="gradient" />
    </>
  );
}
