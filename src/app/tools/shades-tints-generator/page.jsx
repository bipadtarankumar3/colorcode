import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "HEX Shades & Tints Generator",
  description: "Generate incremental shades (adding black) and tints (adding white) for any HEX color value. Perfect for building smooth, uniform color weight spans.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/shades-tints-generator",
  },
};

export default function ShadesPage() {
  return <ColorBeastTool initialTool="shades" />;
}
