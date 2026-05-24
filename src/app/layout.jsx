import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';


export const metadata = {
  title: "Color Beast | The Ultimate Professional Color Utility Suite",
  description: "Color Beast is the #1 tool for visual designers. Generate gradients, harmonic palettes, extract colors from images, check WCAG contrast, and simulate color blindness. Built for high-performance design systems.",
  keywords: ["color generator", "gradient builder", "palette generator", "contrast checker", "tailwind colors", "color blindness simulator", "design tools"],
  authors: [{ name: "Color Beast Lab" }],
  openGraph: {
    title: "Color Beast | Ultimate Color Utility",
    description: "The most powerful color tool for modern designers.",
    url: "https://colorbeast.io",
    siteName: "Color Beast",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Color Beast | Ultimate Color Utility",
    description: "The most powerful color tool for modern designers.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      
      <body className="antialiased">
        {children}
        <GoogleAnalytics gaId="G-MQEWLCWPRN" />
      </body>
    </html>
  );
}
