import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Advanced Color Details & Space Converter — HEX, RGB, HSL, CMYK & OKLCH",
  description: "Convert color formats between HEX, RGB, RGBA, HSL, HSLA, CMYK, and CSS Color 4 OKLCH. Complete color statistics, perceptual lightness values, and CSS export.",
  keywords: [
    "color converter details",
    "hex to cmyk",
    "rgb to oklch converter",
    "hsl to hex converter",
    "cmyk color converter",
    "css color converter online"
  ],
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/color-converter-details",
  },
  openGraph: {
    title: "Advanced Color Space Converter | Revoxera Color",
    description: "Convert color formats between HEX, RGB, RGBA, HSL, HSLA, CMYK, and HSV. Get full statistics, details, and color definitions in-browser.",
    url: "https://colorcode.revoxera.com/tools/color-converter-details",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Advanced Color Converter" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Color Space Converter | Color Codes",
    description: "Convert color formats between HEX, RGB, RGBA, HSL, HSLA, CMYK, and OKLCH in-browser.",
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
        { "@type": "ListItem", "position": 3, "name": "Color Converter Details", "item": "https://colorcode.revoxera.com/tools/color-converter-details" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "Advanced Color Details & Converter",
      "operatingSystem": "All modern browsers",
      "applicationCategory": "DesignApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Convert color formats across HEX, RGB, HSL, CMYK, HSV, and OKLCH color spaces."
    }
  ]
};

export default function DetailsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorBeastTool initialTool="details" />
    </>
  );
}
