import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "WCAG 2.1 Color Contrast Ratio Checker",
  description: "Check if your font size and color combinations meet WCAG AA and AAA accessibility guidelines. Instant pass/fail feedback for text readability.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/contrast-checker",
  },
};

export default function ContrastPage() {
  return <ColorBeastTool initialTool="contrast" />;
}
