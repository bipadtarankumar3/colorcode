import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "WCAG 2.1 & 2.2 Color Contrast Ratio Checker — AA & AAA Compliance",
  description: "Check if your text and background color combinations meet official WCAG 2.1 and 2.2 Level AA and AAA accessibility guidelines. Instant pass/fail feedback and legibility score.",
  keywords: [
    "wcag contrast checker",
    "color contrast ratio",
    "accessibility contrast checker",
    "wcag aa compliance",
    "wcag aaa contrast",
    "web accessibility colors",
    "relative luminance calculator"
  ],
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/contrast-checker",
  },
  openGraph: {
    title: "WCAG Color Contrast Checker | Revoxera Color",
    description: "Verify text and background combinations against official WCAG 2.1 AA & AAA accessibility standards with real-time luminance calculation.",
    url: "https://colorcode.revoxera.com/tools/contrast-checker",
    siteName: "Revoxera Color",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "WCAG Color Contrast Checker" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WCAG Color Contrast Checker | Color Codes",
    description: "Verify text and background combinations against official WCAG 2.1 AA & AAA accessibility standards.",
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
        { "@type": "ListItem", "position": 3, "name": "WCAG Contrast Checker", "item": "https://colorcode.revoxera.com/tools/contrast-checker" }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "name": "WCAG Color Contrast Checker",
      "operatingSystem": "All modern browsers",
      "applicationCategory": "DesignApplication",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Calculate relative luminance contrast ratio between foreground and background colors according to WCAG 2.1 and 2.2 Level AA and AAA standards."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the minimum WCAG contrast ratio for body text?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WCAG 2.1 Level AA mandates a minimum contrast ratio of 4.5:1 for body text (smaller than 18pt or 14pt bold). For Level AAA compliance, the ratio must reach at least 7.0:1."
          }
        },
        {
          "@type": "Question",
          "name": "Does color contrast apply to icons, borders, and input fields?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Under WCAG 2.1 Success Criterion 1.4.11 (Non-text Contrast), user interface components such as form input borders, toggle switches, and graphical icons must achieve at least a 3.0:1 contrast ratio against adjacent backgrounds."
          }
        }
      ]
    }
  ]
};

export default function ContrastPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ColorBeastTool initialTool="contrast" />
    </>
  );
}
