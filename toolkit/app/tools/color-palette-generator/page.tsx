import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ColorPaletteGeneratorTool from "@/components/tools/ColorPaletteGeneratorTool";

export function generateMetadata() {
  return generateToolMetadata("color-palette-generator");
}

export default function Page() {
  return (
    <ToolLayout slug="color-palette-generator">
      <ColorPaletteGeneratorTool />
    </ToolLayout>
  );
}
