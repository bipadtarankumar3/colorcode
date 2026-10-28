import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Tailwind CSS Color Reference & Map — 22 Families & 220+ Swatches",
  description: "Complete visual reference for all default Tailwind CSS v3 and v4 colors. Interactive swatches for Slate, Zinc, Neutral, Stone, Red, Emerald, Sky, Indigo, and Violet with 1-click HEX copy.",
  keywords: [
    "tailwind color reference",
    "tailwind css colors",
    "tailwind color palette",
    "tailwind hex codes",
    "tailwind 50 to 950 colors",
    "tailwind slate zinc stone colors"
  ],
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/tailwind-color-reference",
  },
  openGraph: {
    title: "Tailwind CSS Color Reference | Revoxera Color",
    description: "Complete visual reference for all default Tailwind CSS color swatches and hex configurations.",
    url: "https://colorcode.revoxera.com/tools/tailwind-color-reference",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Tailwind CSS Color Reference" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tailwind CSS Color Reference | Color Codes",
    description: "Complete visual reference for all default Tailwind CSS color swatches.",
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
        { "@type": "ListItem", "position": 3, "name": "Tailwind Color Reference", "item": "https://colorcode.revoxera.com/tools/tailwind-color-reference" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "Tailwind CSS Color Map & Reference",
      "operatingSystem": "All modern browsers",
      "applicationCategory": "DesignApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Interactive color chart and hex lookup table for Tailwind CSS default design tokens."
    }
  ]
};

export default function TailwindPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorBeastTool initialTool="tailwind" />
    </>
  );
}
