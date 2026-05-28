import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Professional CSS Gradient Generator & Builder",
  description: "Create beautiful, smooth, multi-color CSS gradients instantly. Export code as raw CSS, linear-gradient declarations, or Tailwind CSS classes. Free & client-side tool.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/gradient-generator",
  },
};

export default function GradientPage() {
  return <ColorBeastTool initialTool="gradient" />;
}
