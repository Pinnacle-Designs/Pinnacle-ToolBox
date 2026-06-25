import { generateToolMetadata } from "@/lib/seo";
import ToolLayout from "@/components/ToolLayout";
import ColorPickerTool from "@/components/tools/ColorPickerTool";

export function generateMetadata() {
  return generateToolMetadata("color-picker");
}

export default function Page() {
  return (
    <ToolLayout slug="color-picker">
      <ColorPickerTool />
    </ToolLayout>
  );
}
