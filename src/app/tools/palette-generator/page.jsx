import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "AI & Harmonic Color Palette Generator",
  description: "Generate complementary, split-complementary, triadic, analogous, and monochromatic color palettes instantly. Perfect for design systems and UI styling.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/palette-generator",
  },
};

export default function PalettePage() {
  return <ColorBeastTool initialTool="palette" />;
}
