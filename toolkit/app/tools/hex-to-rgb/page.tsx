import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import HexToRgbTool from "@/components/tools/HexToRgbTool";

export function generateMetadata() {
  return generateToolMetadata("hex-to-rgb");
}

export default function Page() {
  return (
    <ToolLayout slug="hex-to-rgb">
      <HexToRgbTool />
    </ToolLayout>
  );
}
