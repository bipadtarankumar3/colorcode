import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Advanced Color details Converter — HEX, RGB, HSL, CMYK",
  description: "Convert color formats between HEX, RGB, RGBA, HSL, HSLA, CMYK, and HSV. Get full statistics, details, and color definitions in-browser.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/color-converter-details",
  },
};

export default function DetailsPage() {
  return <ColorBeastTool initialTool="details" />;
}
