import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "HEX Shades & Tints Generator — 10-Step Scale Creator",
  description: "Generate 10-step lighter tints (adding white) and darker shades (adding black) for any HEX color value. Build Tailwind-compatible 50–950 design token scales instantly.",
  keywords: [
    "shades and tints generator",
    "color shades scale",
    "hex tints generator",
    "tailwind shade scale 50-950",
    "color ramp generator",
    "design system color generator"
  ],
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/shades-tints-generator",
  },
  openGraph: {
    title: "Shades & Tints Generator | Revoxera Color",
    description: "Generate 10-step lighter tints and darker shades for any base color with instant copy-to-clipboard.",
    url: "https://colorcode.revoxera.com/tools/shades-tints-generator",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Shades and Tints Generator" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HEX Shades & Tints Generator | Color Codes",
    description: "Generate incremental shades and tints for any HEX color value.",
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
        { "@type": "ListItem", "position": 3, "name": "Shades & Tints Generator", "item": "https://colorcode.revoxera.com/tools/shades-tints-generator" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "HEX Shades & Tints Generator",
      "operatingSystem": "All modern browsers",
      "applicationCategory": "DesignApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Generate incremental lighter tints and darker shades for any HEX color code."
    }
  ]
};

export default function ShadesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorBeastTool initialTool="shades" />
    </>
  );
}
