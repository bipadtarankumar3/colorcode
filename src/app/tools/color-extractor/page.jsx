import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Image Color Extractor — Extract HEX & RGB Palettes Locally",
  description: "Extract dominant color palettes and exact hexadecimal codes from any photo or screenshot inside your local browser. 100% private, zero server uploads, instant palette export.",
  keywords: [
    "image color extractor",
    "extract hex from image",
    "image palette generator",
    "photo color picker",
    "get colors from picture",
    "client-side color extraction"
  ],
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/color-extractor",
  },
  openGraph: {
    title: "Image Color Extractor | Revoxera Color",
    description: "Extract dominant color palettes and exact hex codes directly from any photo inside your browser sandbox.",
    url: "https://colorcode.revoxera.com/tools/color-extractor",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Image Color Extractor" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Color Extractor | Color Codes",
    description: "Extract dominant color palettes from any photo inside your browser sandbox.",
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
        { "@type": "ListItem", "position": 3, "name": "Image Color Extractor", "item": "https://colorcode.revoxera.com/tools/color-extractor" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "Image Color Palette Extractor",
      "operatingSystem": "All modern browsers",
      "applicationCategory": "DesignApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Extract dominant color palettes from images using client-side HTML5 Canvas pixel quantization."
    }
  ]
};

export default function ExtractorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorBeastTool initialTool="extractor" />
    </>
  );
}
