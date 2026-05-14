import "./globals.css";

export const metadata = {
  title: "Color Beast | Ultimate Color Suite",
  description: "Generate gradients, palettes, and reference Tailwind colors with a premium glassmorphic experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
