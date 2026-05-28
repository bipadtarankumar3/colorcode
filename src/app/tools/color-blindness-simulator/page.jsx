import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Real-time Color Blindness Vision Simulator",
  description: "Simulate color perception under 8 different vision deficiencies including Protanopia, Deuteranopia, Tritanopia, and Achromatopsia. Design accessible websites.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/color-blindness-simulator",
  },
};

export default function BlindnessPage() {
  return <ColorBeastTool initialTool="blindness" />;
}
