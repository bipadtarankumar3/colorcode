import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Image Color Palette Extractor — Extract HEX from Images Locally",
  description: "Extract dominant colors and full harmonic palettes from any image locally in your browser. Simple drag & drop, GDPR compliant, zero upload latency.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/color-extractor",
  },
};

export default function ExtractorPage() {
  return <ColorBeastTool initialTool="extractor" />;
}
