import { ColorBeastTool } from "../../../components/ColorBeastTool";

export const metadata = {
  title: "Interactive Tailwind CSS Color Map & Reference Table",
  description: "Explore the full default Tailwind CSS color palette. Instant copy HEX/RGB values and copy Tailwind configuration classes. Built for developer productivity.",
  alternates: {
    canonical: "https://colorcode.revoxera.com/tools/tailwind-color-reference",
  },
};

export default function TailwindPage() {
  return <ColorBeastTool initialTool="tailwind" />;
}
